from utils.answer import Answer


class SystemEvents:
    @staticmethod
    def init(middleware, sio, app, getDockerAPI,postDockerAPI, RoomsActive):
        @sio.on('ping')
        @middleware.wrap
        async def ping(sid):
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

