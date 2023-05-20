# pylint: skip-file
import asyncio
import os, sys
from dotenv import load_dotenv
from event import Events
import events
sys.path.insert(1, os.path.join(sys.path[0], 'api'))
import socketio
from utils.answer import Answer
from middleware import Middleware
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
            console.log(f"- [DockerClient] >> Could not connect to Docker instance {e}")


    def app():
        load_dotenv(".env" if not IS_PRODUCTION else ".env.production", override=True)
        env_vars_needed = [
            "NEXTAUTH_URL",
            "NEXTAUTH_SECRET",
            "DATABASE_URL",
            "API_PORT",
            "SIO_LOGIN",
            "SIO_SECRET"
        ]

        missing_env_var = [env_var for env_var in env_vars_needed if not env_var in os.environ]
        if len(missing_env_var)>0:
            raise Exception("Missing environment variables : ", missing_env_var, ". Not booting the SocketIO server. Please restart")
        

        sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins=[os.environ.get("NEXTAUTH_URL")])
        app = socketio.ASGIApp(sio)

        app.system = System()
        app.system.docker_connect()



        def getDockerAPI(url):
            return app.system.docker.api._result(app.system.docker.api._get (app.system.docker.api._url("/"+url)), True)
        def postDockerAPI(url):
            return app.system.docker.api._raise_for_status(app.system.docker.api._post(app.system.docker.api._url("/" + url)))
        
        Events.init(sio, app, getDockerAPI,postDockerAPI, RoomsActive)


        @sio.event
        async def connect(sid, environ, auth=None):
            if auth is None : raise ConnectionRefusedError('Please provide credentials')
            if auth.get("login", False)==os.environ.get("SIO_LOGIN", None) and auth.get("password", False)==os.environ.get("SIO_SECRET", None):
                console.info("SocketIO", f"New authenticated user connected (#{sid})")
            else: raise ConnectionRefusedError('Authentication failed')
                

        return app, sio
    

app,sio = System.app()
loop = asyncio.new_event_loop()




async def start_uvicorn():
    config = uvicorn.config.Config(app, host='0.0.0.0', port=int(os.environ.get("API_PORT")))
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
            if event.is_set(): return
            await sio.emit(f"{mode}/{name}", el)
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
        await sio.sleep(5.0)









async def main(loop):
    await asyncio.wait([
        asyncio.create_task(start_uvicorn()),
        asyncio.create_task(start_background_task()),
    ], return_when=asyncio.FIRST_COMPLETED)


if __name__ == '__main__':
    asyncio_setup()
    asyncio.run(main(loop))