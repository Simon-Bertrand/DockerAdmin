# pylint: skip-file
import asyncio
import os, sys
sys.path.insert(1, os.path.join(sys.path[0], 'api'))
print("Sys path", sys.path)

import json, socketio

import time
from canals.http.ping import PingRoute
from utils.answer import Answer
from middleware import Middleware
from canals.http.containers import Routes
from canals.ws import SocketIOImplementation

from utils.threads import ServerThread, ThreadUtils
from utils.console import console
import docker, threading, uvicorn
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor
from uvicorn.loops.asyncio import asyncio_setup

IS_PRODUCTION = os.environ.get("NODE_ENV") == "production"




global roomsActive
roomsActive = {}
class RoomsActive:
    def add_to_room(room):
        if not room in roomsActive.keys():
            roomsActive[room] = 0
        roomsActive[room] +=1
   

    def remove_to_room(room):
        if room in roomsActive.keys():
            roomsActive[room] -= 1
            if roomsActive[room] <= 0:
                del roomsActive[room]
       
    def get_room_count(room):
        if room in roomsActive.keys():
            return roomsActive[room]
        return -1

    def room_empty_or(room, func_empty, func_any):
        if roomsActive.get(room,-1)>0: func_any()
        else: func_empty()














class System:
    def __init__(self) -> None:
        self.docker_connected = False
        
    def docker_connect(self):
        try:
            self.docker = docker.from_env()
            self.docker_connected = True
        except Exception as e:
            self.docker = None
            console.log(f"Could not connect to Docker instance {e}")

    def background_run(self):
        def init(signal = None):
            while True:
                console.log("Current thread : ", threading.current_thread(), "list : ", list(filter(lambda x: not x.name.startswith("Thread"), threading.enumerate())))
                time.sleep(5)

        self.thread = ServerThread(id="event", func=init)
        ThreadUtils.start_if_not_exists(self.thread)

    def app():
        sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins=["http://localhost:3000"])
        app = socketio.ASGIApp(sio)

        app.system = System()
        app.system.docker_connect()

        def getDockerAPI(url):
            return app.system.docker.api._result(app.system.docker.api._get (app.system.docker.api._url("/"+url)), True)
        def postDockerAPI(url):
            return app.system.docker.api._raise_for_status(app.system.docker.api._post(app.system.docker.api._url("/" + url)))
        
        app.system.get = getDockerAPI
        app.system.post = postDockerAPI
        # # Middleware.init(app)
        # Routes.init(app)
        # SocketIOImplementation.init_events(app, socketio, RoomsActive)
        # PingRoute.init(app)


        @sio.on('info')
        def info(sid):
            return Answer.SUCCEED(
                            app.system.get("info"),
                            "Received infos"
                        )
        
        @sio.on('containers')
        def containers(sid):
            console.log(app.system.get("containers/json?all=True"))
            return Answer.SUCCEED(
                            app.system.get("containers/json?all=True"),
                            "Received containers"
                        )
        
        @sio.on('container')
        def container(sid, name):
            return Answer.SUCCEED(
                            app.system.get(f"containers/{name}/json"),
                            "Received containers"
                        )
        
        @sio.on('subscribe')
        async def subscribe(sid, mode, name):
            console.log("subscribe args:", mode, name)

           
       
            async def task(mode, name):
                match mode:
                    case "logs" :
                        await sio.emit(f"{mode}{name}", app.system.docker.containers.get(name).logs(stream=False, tail=10))
                        iterator = app.system.docker.containers.get(name).logs(stream=True, tail=0)
                    case "stats":
                        iterator = app.system.docker.containers.get(name).stats(stream=True, decode=True)
                    case others :
                        iterator = []
                for el in iterator:
                    await sio.emit(f"{mode}{name}", el)
                    console.log(f"Emitted {mode}{name} with data : {el}" )

         
            RoomsActive.add_to_room(f"{mode}{name}")
            # thread = threading.Thread(target=task, args=(mode, name))
            # thread.start()
            # await task(mode, name)
            # sio.start_background_task(task, mode, name)
            # Pools[mode].spawn(task, mode, name, iterator)
            return Answer.SUCCEED(
                            {"test":"test" },
                            "Received subscribe"
                        )
        
        @sio.on('unsubscribe')
        def unsubscribe(sid, mode, name):
            console.log("unsubscribe args:", mode, name)
            RoomsActive.remove_to_room(f"{mode}{name}")
            return {"test":"unsubscribed"}

        return app, sio
    



app,sio = System.app()


loop = asyncio.new_event_loop()




    # uvicorn.run(app, host='localhost', port=5000, proxy_headers=True, log_level="critical")
    # pywsgi.WSGIServer(
    #     ('localhost', 5000), app, handler_class=WebSocketHandler
    #     ).serve_forever()
    # socketio.run(
    #     app,
    #     debug = not IS_PRODUCTION,
    #     use_reloader = not IS_PRODUCTION,
    #     host = '0.0.0.0',
    #     port = 5000,
    #     #**({"allow_unsafe_werkzeug" : True} if not IS_PRODUCTION else {})
    #     )


async def start_uvicorn():
    config = uvicorn.config.Config(app, host='0.0.0.0', port=5000)
    server = uvicorn.server.Server(config)
    await server.serve()

async def start_background_task():

    def iterator_getter(mode, name):
        return {
            "stats":app.system.docker.containers.get(name).stats(stream=True),
            "logs":app.system.docker.containers.get(name).logs(stream=True, tail=0)
        }.get(mode, [])


    async def task_to_exe(mode, name, event):
        console.log("Running task  :", mode, name)
        for el in iterator_getter(mode, name):
            if event.is_set():break
            await sio.emit(f"{mode}/{name}", el)
            console.log(f"Emitted {mode}/{name} with data : {str(el)[:20]}" )

    futures = []

    while True:
        rooms  = list(roomsActive.keys())
        
            # running_tasks_to_stop = filter(lambda x:not x.done() and x.get_name() not in rooms, tasks)
            # for task in running_tasks_to_stop:
            #     task.cancel()
            # console.log("Running tasks to stop : ", list(running_tasks_to_stop))
            #tasks = list(filter(lambda x:not x.done() and x.get_name() in rooms, tasks))


        running_tasksnames = map(lambda x:x['name'], futures)
        missing_rooms = filter(lambda room:room not in running_tasksnames, rooms)

        to_cancel_tasks = filter(lambda future:future['name'] not in rooms, futures)
        for task in to_cancel_tasks:
            console.log("cancelled task", task)
            console.log("isset",  task['event'].is_set())
            task['event'].set()
        
        for room in missing_rooms:
        #     # task = asyncio.create_task(task_to_exe(*room.split("/")), name=room)
        #     # task.add_done_callback(tasks.discard)
            
        #     # tasks.append(
        #     #     task
        #     # )
        
            # execute a function in event loop using executor
            # thread = ServerThread(id=room, func=lambda signal: asyncio.run(task_to_exe(*room.split("/"))))
            # ThreadUtils.start_if_not_exists(thread)
            # thread = threading.Thread(target=lambda: asyncio.run(task_to_exe(*room.split("/"))), room=room)
            # threads.append(thread)
            # thread.run()
            # if room not in threads:
            loop = asyncio.get_running_loop()
            event=asyncio.Event()
            futures.append({
                "future":loop.run_in_executor(None, lambda: asyncio.run(task_to_exe(*room.split("/"), event))), 
                "name": room,
                "event" :event
            })
                # threads.append(room)

  


        await sio.sleep(2.0)
        console.log("rooms ", rooms)
        console.log("futures ", futures)
        console.log("threads ", list(threading.enumerate()))
      







async def main(loop):
    await asyncio.wait([
        asyncio.create_task(start_uvicorn()),
        asyncio.create_task(start_background_task()),
    ], return_when=asyncio.FIRST_COMPLETED)


if __name__ == '__main__':
    asyncio_setup()
    asyncio.run(main(loop))