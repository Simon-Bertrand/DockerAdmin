from events.images import ImagesEvents
from events.swarm import SwarmEvents
from events.system import SystemEvents
from events.containers import ContainersEvents
from middleware import Middleware
from utils.answer import Answer
from utils.console import console

class Events:
    @staticmethod
    def init(sio, app, getDockerAPI,postDockerAPI, RoomsActive):
        middleware = Middleware(app)
        ContainersEvents.init(middleware,sio, app, getDockerAPI,postDockerAPI, RoomsActive)
        ImagesEvents.init(middleware,sio, app, getDockerAPI,postDockerAPI, RoomsActive)
        SwarmEvents.init(middleware,sio, app, getDockerAPI,postDockerAPI, RoomsActive)
        SystemEvents.init(middleware,sio, app, getDockerAPI,postDockerAPI, RoomsActive)


        