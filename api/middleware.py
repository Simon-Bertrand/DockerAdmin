

from utils.console import console
from utils.answer import Answer
import os

IS_PRODUCTION = os.environ.get("NODE_ENV") == "production"
class Middleware:
    def __init__(self, app):
        self.app = app


    def before_request(self):
        try : 
            self.app.system.docker.ping()
            if not self.app.system.docker_connected: self.app.system.docker_connected=True
        except: 
            if self.app.system.docker_connected: self.app.system.docker_connected=False
            self.app.system.docker_connect()


    def after_request(self, answer): 
        if not isinstance(answer, Answer) : 
            return Answer.FAILED("Middleware Error : Returned object is not a Answer instance" if not IS_PRODUCTION else "Middleware Error : Wrong object returned by the route")
        return answer

    
    def wrap(self, func): 
        async def wrapper(sid, *args, **kwargs):
            async def wrap_func(*args, **kwargs): 
                console.info("SocketIO", f"Received query for service <{func.__name__}> by (#{sid})")
                self.before_request()
                if not self.app.system.docker_connected: return Answer.DOCKER_CLIENT_UNAVAILABLE().to_dict()
                try:
                    return self.after_request(await func(*args, **kwargs)).to_dict()
                except Exception as e: 
                    return Answer.FAILED(str(e) if not IS_PRODUCTION else "Internal Error : An exception occured").to_dict()
            res = await wrap_func(sid, *args, **kwargs)
            console.info("SocketIO", f"Sent response for service <{func.__name__}> : {str(res['state'])} to (#{sid})")
            return res
        return wrapper