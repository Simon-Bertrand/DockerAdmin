

from utils.console import console
from utils.answer import Answer


class PingRoute:
    def init(app):
        @app.route('/ping')
        def ping(): 
            try:
                app.system.docker.ping()
                return Answer.SUCCEED({}, "Succesfully received ping" )
            except Exception as e: 
                console.log(str(e))
                return Answer.DOCKER_CLIENT_UNAVAILABLE({}, "Fail to receive the ping" )


