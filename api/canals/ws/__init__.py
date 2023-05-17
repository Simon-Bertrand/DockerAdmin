
import threading
from flask import copy_current_request_context
from marshmallow import Schema, fields

from utils.console import console
import gevent


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
            console.log("connected client")
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
            # @copy_current_request_context
            # def execute(queue, signal=None):
            #     i=0
            #     for el in app.system.docker.containers.get(container_name).stats(decode=True):
            
            #         if i ==0 :
            #             socketio.emit("logs", "Emmited stats", namespace='/test')
            #             queue.put(el)
            #             console.log("Stats thread running...", queue)

            #             socketio.emit("stats", {"test":"test"}, namespace='/test') #to="stats~#"+container_name)
            #         i+=1
            #         if i >=SKIP: i=0

            # gevent.spawn(execute, data)
            # Lancez la fonction de consommation de données avec gevent.spawn()
          
             # ThreadUtils.start_if_not_exists(thread)
            # thread = ServerThread(id="stats~#"+container_name, func=execute)
            # def consume_data(data_queue):
            #     while True:
            #         data = data_queue.get() # Récupère les données de la file d'attente
            #         socketio.emit('logs', data, namespace='/test', broadcast=True) # Émet les données sur le canal 'logs'

            emit("logs", "Starting thread") 
  
            i=0
            for el in app.system.docker.containers.get(container_name).stats(stream=True, decode=True):
                if i ==0 :
                    eventlet.spawn(lambda x:emit("logs", "Emit received message") )
                    console.log("Ping from thread")
                      #to="stats~#"+container_name)
                i+=1
                if i >=SKIP: i=0

            emit("logs", "Finishing thread") 
    
            console.log("Stats thread running3...")
    



        @socketio.on('unsubscribe_stats')
        def unsubscribe_stats(container_name):
            console.log("Received unsubscribe_stats")

            RoomsActive.remove_to_room("stats~#"+container_name)

            def stop_threads():
                for thread in filter(lambda x:x.name == "stats~#"+container_name, threading.enumerate()):
                    thread.stop()
                    thread.join()
                    console.log("Success fully stopped the thread : ", "stats~#"+container_name)

            RoomsActive.room_empty_or("stats~#"+container_name, stop_threads, lambda : None)



        @socketio.on('disconnect')
        def test_disconnect():
            console.log("Disconnected from socketio server")
