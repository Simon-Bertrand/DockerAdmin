import os, sys

sys.path.insert(1, os.path.join(sys.path[0], 'api'))
print("Sys path", sys.path)

import gevent
from gevent import monkey
monkey.patch_all()

import json
from flask_socketio import SocketIO
import time
from canals.http.ping import PingRoute
from utils.answer import Answer
from middleware import Middleware
from canals.http.containers import Routes
from canals.ws import SocketIOImplementation


from utils.rooms import RoomsActive
from utils.threads import ServerThread, ThreadUtils
from utils.console import console
from flask import Flask
import docker
import threading




IS_PRODUCTION = os.environ.get("NODE_ENV") == "production"
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
        app = Flask(__name__)
        socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000" if IS_PRODUCTION else "*", async_mode="gevent")

        app.system = System()
        app.system.docker_connect()
    
        Middleware.init(app)
        Routes.init(app)
        SocketIOImplementation.init_events(app, socketio, RoomsActive)
        PingRoute.init(app)

        return app, socketio


app,socketio = System.app()

if __name__ == "__main__":
    socketio.run(
        app,
        debug = not IS_PRODUCTION,
        use_reloader = not IS_PRODUCTION,
        host = '0.0.0.0',
        port = 5000,
        #**({"allow_unsafe_werkzeug" : True} if not IS_PRODUCTION else {})
        )