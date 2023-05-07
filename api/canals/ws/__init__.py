
import threading
from flask import copy_current_request_context
from flask_socketio import emit
from marshmallow import Schema, fields
from utils.docker.dockercli import DockerCli, DockerCliStats, ServerThread, ThreadUtils

from utils.console import console


class StatsSchema(Schema):
    id = fields.String()
    cpu_stats =  fields.Raw()
    precpu_stats= fields.Raw()
    num_procs =  fields.Integer()
    blockio_input= fields.Integer()
    blockio_output= fields.Integer()
    memusage_usage= fields.Integer()
    memusage_total= fields.Integer()
    netio_output= fields.Integer()
    netio_input= fields.Integer()
    name = fields.String()




class SocketIOImplementation:
    def init_events(app, socketio, RoomsActive) : 
        @socketio.on('connect')
        def test_connect(auth):
            emit('logs', {'data': 'Connected'})

        @socketio.on('subscribe_logs')
        def subscribe_logs(container_name):
            
            try: app.system.docker.containers.get(container_name)
            except Exception as e: console.log(f"Couldnt subscribe container name ({container_name}) is unknown"); return None

            RoomsActive.add_to_room("logs~#"+container_name)

            @copy_current_request_context
            def execute(signal = None):
                for el in app.system.docker.containers.get(container_name).logs(stream=True, tail=50):
                    if signal.is_set(): console.log("StoppedLogs stream"); return
                    emit("logs", el.decode(), to="logs~#"+container_name)
        
            thread = ServerThread(id="logs~#"+container_name, func=execute)
            ThreadUtils.start_if_not_exists(thread)
    

        @socketio.on('unsubscribe_logs')
        def unsubscribe_logs(container_name):
            RoomsActive.remove_to_room("logs~#"+container_name)
            def stop_threads():
                for thread in filter(lambda x:x.name =="logs~#"+container_name, threading.enumerate()):
                    thread.stop()
                    thread.join()
                    console.log("Success fully stopped the thread : ", "logs~#"+container_name)

            RoomsActive.room_empty_or("logs~#"+container_name, stop_threads, lambda : None)


        @socketio.on('subscribe_stats')
        def subscribe_stats(container_name):

            try: app.system.docker.containers.get(container_name)
            except Exception as e: console.log("Couldnt subscribe container name is unknown", e); return None


            RoomsActive.add_to_room("stats~#"+container_name)

            SKIP = 2
            @copy_current_request_context
            def execute(signal=None):
                i=0
                val=[None]
                DockerCli.stream_process("stats", container_name, val, DockerCliStats.parse, signal=signal)
                console.log("Execute thread")
                console.log("Execute thread", app.system.docker.containers.get(container_name))
                console.log("Execute thread", app.system.docker.containers.get(container_name).stats())


                for el in app.system.docker.containers.get(container_name).stats(stream=True, decode=True):
                    console.log(el)
                    if signal.is_set() : return None
                    if i ==0 :
                        if val[0] is not None:
                            emit("stats", StatsSchema().dump({**el, **val[0][0] }), to="stats~#"+container_name)
                    i+=1
                    if i >=SKIP: i=0

            thread = ServerThread(id="stats~#"+container_name, func=execute)
            ThreadUtils.start_if_not_exists(thread)



        @socketio.on('unsubscribe_stats')
        def unsubscribe_stats(container_name):
            RoomsActive.remove_to_room("stats~#"+container_name)

            def stop_threads():
                for thread in filter(lambda x:x.name == "stats~#"+container_name, threading.enumerate()):
                    thread.stop()
                    thread.join()
                    console.log("Success fully stopped the thread : ", "stats~#"+container_name)

            RoomsActive.room_empty_or("stats~#"+container_name, stop_threads, lambda : None)



        @socketio.on('disconnect')
        def test_disconnect():
            pass
