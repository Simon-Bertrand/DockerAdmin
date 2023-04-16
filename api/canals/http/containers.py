from flask import current_app
from utils.console import console

from utils.answer import Answer
from marshmallow import Schema, fields



class ContainerStateSchema(Schema):
    Status = fields.String()
    Running = fields.Boolean()
    Paused = fields.Boolean()
    Restarting = fields.Boolean()
    OOMKilled = fields.Boolean()
    Dead = fields.Boolean()
    Pid = fields.Integer()
    ExitCode = fields.Integer()
    Error = fields.String()
    StartedAt = fields.String()
    FinishedAt = fields.String()

class ContainerConfigSchema(Schema):
    Labels = fields.Raw()
    Env = fields.Raw()
    Image = fields.String()

class ContainerNetworkSettingsSchema(Schema):
    Ports= fields.Raw()
    Networks=fields.Raw()

class ContainerHostConfigSchema(Schema):
    Binds = fields.List(fields.String)
    NetworkMode = fields.String()
    CpuCount = fields.Integer()
    CpuPercent = fields.Integer()

class ContainerSchema(Schema):
    Id = fields.String()
    Created = fields.String()
    Args = fields.List(fields.String())
    State = fields.Nested(ContainerStateSchema)
    Image = fields.String()
    Name = fields.String()
    RestartCount = fields.String()
    Driver = fields.String()
    MountLabel = fields.String()
    Config = fields.Nested(ContainerConfigSchema)
    NetworkSettings = fields.Nested(ContainerNetworkSettingsSchema)
    HostConfig = fields.Nested(ContainerHostConfigSchema)



class ContainersRoute:
    def init(app):
        @app.route('/containers')
        def containers(): return Answer.SUCCEED(
                list(map(lambda x:x.attrs, current_app.system.docker.containers.list(all=True))),
                "Succesfully received the containers",
                payload_schema = ContainerSchema(many=True)
            )
    
        @app.route('/containers/<name_or_id>')
        def container(name_or_id): return Answer.SUCCEED(
                current_app.docker.containers.get(name_or_id).attrs,
                "Succesfully received the container",
                payload_schema = ContainerSchema()
        )


