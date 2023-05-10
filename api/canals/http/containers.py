from flask import current_app, request
from utils.console import console

from utils.answer import Answer
from marshmallow import Schema, fields



# class ContainerStateSchema(Schema):
#     Status = fields.String()
#     Running = fields.Boolean()
#     Paused = fields.Boolean()
#     Restarting = fields.Boolean()
#     OOMKilled = fields.Boolean()
#     Dead = fields.Boolean()
#     Pid = fields.Integer()
#     ExitCode = fields.Integer()
#     Error = fields.String()
#     StartedAt = fields.String()
#     FinishedAt = fields.String()

# class ContainerConfigSchema(Schema):
#     Labels = fields.Raw()
#     Env = fields.Raw()
#     Image = fields.String()

# class ContainerNetworkSettingsSchema(Schema):
#     Ports= fields.Raw()
#     Networks=fields.Raw()

# class ContainerHostConfigSchema(Schema):
#     Binds = fields.List(fields.String)
#     NetworkMode = fields.String()
#     CpuCount = fields.Integer()
#     CpuPercent = fields.Integer()

# class ContainerSchema(Schema):
#     Id = fields.String()
#     Created = fields.String()
#     Args = fields.List(fields.String())
#     State = fields.Nested(ContainerStateSchema)
#     Image = fields.String()
#     Name = fields.String()
#     RestartCount = fields.String()
#     Driver = fields.String()
#     MountLabel = fields.String()
#     Config = fields.Nested(ContainerConfigSchema)
#     NetworkSettings = fields.Nested(ContainerNetworkSettingsSchema)
#     HostConfig = fields.Nested(ContainerHostConfigSchema)

from urllib.parse import  parse_qs
import docker


class Routes:
    @staticmethod
    def init(app):
        @app.route('/<path:path>', methods=["GET", "POST"])
        def catch_all(path):
            if path == path.lstrip("/"):
                console.log(request.method)
                try :        
                    if request.method=="POST":
                        app.system.docker.api._raise_for_status(app.system.docker.api._post(app.system.docker.api._url("/" + path.lstrip("/") +"?"+request.query_string.decode())))
                        return Answer.SUCCEED(
                            {},
                            path
                        )
                    if request.method=="GET":
                        return Answer.SUCCEED(
                            app.system.docker.api._result(app.system.docker.api._get (app.system.docker.api._url("/" + path.lstrip("/") +"?"+request.query_string.decode())), True),
                            path
                        )
                except docker.errors.NotFound as e: 
                    return Answer.E404("Page not found")
                except Exception as e: 
                    return Answer.BAD_SERVER_OUTPUT("Unknown server side error")
            else: return Answer.E404(path)


        # @app.route('/containers')
        # def containers(): 
        #     return Answer.SUCCEED(
        #         list(map(lambda x:x.attrs, current_app.system.docker.containers.list(all=True))),
        #         "Succesfully received the containers",
        #         payload_schema = ContainerSchema(many=True)
        #     )
    
        # @app.route('/containers/<string:name_or_id>')
        # def container(name_or_id): 
        #     return Answer.SUCCEED(
        #         current_app.system.docker.containers.get(name_or_id).attrs,
        #         "Succesfully received the container",
        #         payload_schema = ContainerSchema()
        # )


        # @app.route('/containers/<string:name_or_id>/<string:action>')
        # def container_action(name_or_id, action): 

        #     console.log(action)
            
        #     return Answer.SUCCEED(
        #         current_app.system.docker.containers.get(name_or_id).attrs,
        #         "Succesfully received the container",
        #         payload_schema = ContainerSchema()
        #     )


