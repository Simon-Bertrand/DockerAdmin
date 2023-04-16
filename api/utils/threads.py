import threading
from utils.console import console
from threading import Event, Lock, Thread

class ThreadUtils:
    @staticmethod
    def start_if_not_exists(thread):
        if len(list(filter(lambda x:x.name == thread.name, threading.enumerate())))==0:
            console.log("Success fully started the thread : ", thread.name)
            thread.start()
        else:console.log("not starting the thread because already exists")

    def get_threads_names():
        return list(map(lambda x:x.name, threading.enumerate()))
    

    
class ServerThread(Thread):
    def __init__(self, id, func, event=None, stream=None):
        super(ServerThread, self).__init__(name=id)
        self.event = event if not event is None else Event()
        self.func = func

    def run(self): return self.func(signal = self.event)
    
    def stop(self): self.event.set()