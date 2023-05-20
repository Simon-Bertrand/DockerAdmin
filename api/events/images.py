        
from utils.answer import Answer




class ImagesEvents:
    @staticmethod
    def init(middleware, sio, app, getDockerAPI,postDockerAPI, RoomsActive):


        @sio.on('images')
        @middleware.wrap
        async def images(sid):
            return Answer.SUCCEED(
                getDockerAPI("images/json"),
                "Received images"
            )
        
        
        @sio.on('images_search')
        @middleware.wrap
        async def images_search(sid, search):
            return Answer.SUCCEED(
                getDockerAPI(f"images/search?term={search}&limit=5"),
                "Received searched images"
            )