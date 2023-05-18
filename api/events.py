from middleware import Middleware
from utils.answer import Answer
from utils.console import console



class Events:
    @staticmethod
    def init(sio, app, getDockerAPI,postDockerAPI, RoomsActive):

        middleware = Middleware(app)

        @sio.on('ping')
        @middleware.wrap
        async def info(sid):
            return Answer.SUCCEED(
                {"system":True},
                "Pong"
            )

        @sio.on('info')
        @middleware.wrap
        async def info(sid):
            return Answer.SUCCEED(
                            getDockerAPI("info"),
                            "Received infos"
                        )
        
        @sio.on('containers')
        @middleware.wrap
        async def containers(sid):
            return Answer.SUCCEED(
                            getDockerAPI("containers/json?all=True"),
                            "Received containers"
                        )
        
        @sio.on('container')
        @middleware.wrap
        async def container(sid, name):
            return Answer.SUCCEED(
                            getDockerAPI(f"containers/{name}/json"),
                            "Received containers"
                        )
        
        @sio.on('containers_actions')
        @middleware.wrap
        async def container_actions(sid, name, action):
            console.log('containers_actions', sid, name, action)
            allowed_actions = ["start","pause","restart", "unpause", "stop"]
            if not action in allowed_actions: 
                return Answer.FAILED(
                    "Unallowed action"
                )
            try:
                postDockerAPI(f"containers/{name}/{action}")
                return Answer.SUCCEED(
                            {},
                                "Successfully executed the container action"
                            )
            except Exception as err:
                return Answer.FAILED( "Failed to execute the container action")

        
        @sio.on('subscribe')
        @middleware.wrap
        async def subscribe(sid, mode, name):
            console.log("subscribed to ", f"{mode}{name}")
            RoomsActive.add_to_room(f"{mode}{name}")
            return Answer.SUCCEED(
                            {"test":"test" },
                            "Received subscribe"
                        )
        
        @sio.on('unsubscribe')
        @middleware.wrap
        async def unsubscribe(sid, mode, name):
            console.log("unsubscribed to ", f"{mode}{name}")
            RoomsActive.remove_to_room(f"{mode}{name}")
            return Answer.SUCCEED(
                            {"test":"test" },
                            "Received subscribe"
                        )
        