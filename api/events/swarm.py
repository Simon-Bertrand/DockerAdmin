        
from utils.answer import Answer

import docker.errors as DockerErrors

class SwarmEvents:
    @staticmethod
    def init(middleware, sio, app, getDockerAPI,postDockerAPI, RoomsActive):
         
        @sio.on('swarm')
        @middleware.wrap
        async def swarm(sid):
            return Answer.SUCCEED(
                                getDockerAPI("swarm"),
                                "Received swarm"
                            )

