

import math
import re
import json
import shlex
import subprocess
import threading

from utils.threads import ServerThread, ThreadUtils

conversion_table = {
    "B": 1,
    "KiB" : 2**10,
    "MiB" : 2**20, 
    "GiB" : 2**30,
    "TiB" : 2**40,
    "PiB" : 2**50,
    "kB" : 10**3,
    "MB" : 10**6,
    "GB" : 10**9,
    "TB" : 10**12,
    "PB" : 10**15
}


class DockerCliStats:
    def convert_value(x):
        res = re.findall('([0-9.]+)([a-zA-Z]*)', x)[0]
        return math.floor(float(res[0])* conversion_table[res[1]])

    def parse(x):
        def map_parse(y):
            return {
                **{k:DockerCliStats.convert_value(v.replace(" ", ""))  for v,k in zip(y['BlockIO'].split('/'), ("blockio_input","blockio_output"))},
                **{k:DockerCliStats.convert_value(v.replace(" ", ""))  for v,k in zip(y['MemUsage'].split('/'), ("memusage_usage","memusage_total"))},
                **{k:DockerCliStats.convert_value(v.replace(" ", ""))  for v,k in zip(y['NetIO'].split('/'), ("netio_input","netio_output"))},
                "name" : y["Name"]
            }
        return list(map(map_parse,x))
        




class DockerCli:
    def stream_process(cmd, container, value, parser=None, signal = None):
        lock = threading.Lock()
        def generator():
            buffer = []
            process = subprocess.Popen(shlex.split("docker "+ cmd + ' '+ container +  ' --format "{{ json . }}"'), stdout=subprocess.PIPE)
            for c in iter(lambda: process.stdout.readline(), b""):
                line = c.decode()
                if line.startswith('[2J[H'):
                    if len(buffer) !=0 : yield buffer
                    buffer = []
                    line = line.replace('[2J[H', "")
                
                buffer += [json.loads(line)] if len(line) !=0 else []

        def thread_work(signal = None):  
            for el in ((parser(el) for el in generator()) if parser is not None else generator()):
                if signal.is_set() : break
                lock.acquire()
                value[0] = el
                lock.release()

        thread = ServerThread(id="cli~#"+container, func=thread_work, event=signal)

        ThreadUtils.start_if_not_exists(thread)
