

from utils.console import console
from utils.answer import HTTPResponse, Answer


class Middleware:
    def init(app):
        @app.before_request
        def before_request():
            try : 
                app.system.docker.ping()
                if not app.system.docker_connected: app.system.docker_connected=True
            except: 
                if app.system.docker_connected: app.system.docker_connected=False
                app.system.docker_connect()
                if not app.system.docker_connected: return Answer.DOCKER_CLIENT_UNAVAILABLE()

        @app.after_request
        def after_request(httpResponse): 
            if isinstance(httpResponse, HTTPResponse): return httpResponse.send()
            else:
                return Answer.BAD_SERVER_OUTPUT("The output value sended by the server is invalid : " + str( type(httpResponse))).send()
        
