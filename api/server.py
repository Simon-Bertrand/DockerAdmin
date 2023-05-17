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
# from utils.docker.dockercli import DockerCli, DockerCliStats

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
        



        @sio.on('info')
        def info(sid):
            return Answer.SUCCEED(
                            getDockerAPI("info"),
                            "Received infos"
                        )
        
        @sio.on('containers')
        def containers(sid):
            return Answer.SUCCEED(
                            getDockerAPI("containers/json?all=True"),
                            "Received containers"
                        )
        
        @sio.on('container')
        def container(sid, name):
            return Answer.SUCCEED(
                            getDockerAPI(f"containers/{name}/json"),
                            "Received containers"
                        )
        
        @sio.on('subscribe')
        async def subscribe(sid, mode, name):
            console.log("subscribed to ", f"{mode}{name}")
            RoomsActive.add_to_room(f"{mode}{name}")
            return Answer.SUCCEED(
                            {"test":"test" },
                            "Received subscribe"
                        )
        
        @sio.on('unsubscribe')
        def unsubscribe(sid, mode, name):
            console.log("unsubscribed to ", f"{mode}{name}")
            RoomsActive.remove_to_room(f"{mode}{name}")
            return Answer.SUCCEED(
                            {"test":"test" },
                            "Received subscribe"
                        )

        return app, sio
    

app,sio = System.app()
loop = asyncio.new_event_loop()




async def start_uvicorn():
    config = uvicorn.config.Config(app, host='0.0.0.0', port=5000)
    server = uvicorn.server.Server(config)
    await server.serve()



async def start_background_task():

    def iterator_getter(mode, name, event):
        return {
            "stats":app.system.docker.containers.get(name).stats(stream=True),
            "logs":app.system.docker.containers.get(name).logs(stream=True, tail=0)
        }.get(mode, [])


    async def task_to_exe(mode, name, event):
        
        for el in iterator_getter(mode, name,event):
            console.log("Running task  :", mode, name, "- Event ", event.is_set())
            if event.is_set():
                return
            await sio.emit(f"{mode}/{name}", el)
            console.log(f"Emitted {mode}/{name} with data : {str(el)[:20]}" )

    futures = []

    while True:
        rooms  = list(roomsActive.keys())
        to_cancel_tasks = filter(lambda future:future['name'] not in rooms, futures)
        running_tasksnames = map(lambda x:x['name'], futures)
        missing_rooms = filter(lambda room:room not in running_tasksnames, rooms)
        for task in to_cancel_tasks:
            task['event'].set()
            task['future'].cancel()
        for room in missing_rooms:
            loop_ = asyncio.get_running_loop()
            event=threading.Event()
            futures.append({
                "future":loop_.run_in_executor(None, lambda: asyncio.run(task_to_exe(*room.split("/"), event))), 
                "name": room,
                "event" :event
            })
        futures = list(filter(lambda x:not x['event'].is_set() and not x['future'].cancelled(),futures))
        await sio.sleep(2.0)








async def main(loop):
    await asyncio.wait([
        asyncio.create_task(start_uvicorn()),
        asyncio.create_task(start_background_task()),
    ], return_when=asyncio.FIRST_COMPLETED)


if __name__ == '__main__':
    asyncio_setup()
    asyncio.run(main(loop))