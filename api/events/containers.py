


from utils.answer import Answer


class ContainersEvents:
    @staticmethod
    def init(middleware, sio, app, getDockerAPI,postDockerAPI, RoomsActive):
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
            RoomsActive.add_to_room(f"{mode}{name}")
            return Answer.SUCCEED(
                            {},
                            f"Successfully subscribed to {mode}->{name}"
                        )

        @sio.on('unsubscribe')
        @middleware.wrap
        async def unsubscribe(sid, mode, name):
            RoomsActive.remove_to_room(f"{mode}{name}")
            return Answer.SUCCEED(
                            {},
                            f"Successfully unsubscribed to {mode}->{name}"
                        )