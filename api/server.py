import json
from flask_socketio import SocketIO
import time
from canals.http.ping import PingRoute
from utils.answer import Answer
from middleware import Middleware
from canals.http.containers import ContainersRoute
from canals.ws import SocketIOImplementation
from utils.rooms import RoomsActive
from utils.threads import ServerThread, ThreadUtils
from utils.console import console
from flask import Flask
import docker
import threading


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

    def run():
        app = Flask(__name__)
        socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")
        app.system = System()
        app.system.docker_connect()
    
        Middleware.init(app)
        ContainersRoute.init(app)
        SocketIOImplementation.init_events(app, socketio, RoomsActive)
        PingRoute.init(app)

        socketio.run(app, debug=True, allow_unsafe_werkzeug=True , use_reloader=False)


if __name__ == '__main__':
    System.run()




  