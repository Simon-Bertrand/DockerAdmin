
from dataclasses import dataclass
from enum import IntEnum
from marshmallow import Schema, fields



class AnswerStatus(IntEnum):
    DOCKER_CLIENT_UNAVAILABLE = 0
    SUCCEED = 1
    FAILED = 2
    UNAUTHORIZED = 3
    EMPTY = 4


class AnswerSchema(Schema):
    message = fields.Str(required = False)
    payload = fields.Raw(required = False)
    state = fields.Integer(required = True)


@dataclass
class Answer:
    message: str
    payload: any
    state: int

    def __post__init__(self):
        if not(isinstance(self.payload, (dict, list)) and len(self.payload.keys())>0) :
            raise ValueError("Invalid arguments type for Answer object")
        if not(isinstance(self.message, str) and self.message.replace(" ", "")!= "") : 
            raise ValueError("Invalid arguments type for Answer object")
  

    def to_dict(self):
        return {
                "message" : self.message,
                "payload" : self.payload,
                "state" : self.state
            }

    def make_object(data : dict, message : str, answer_status : AnswerStatus, payload_schema = None):
        return Answer(**{
                "message" : message,
                "payload" : data if payload_schema is None else payload_schema.dump(data),
                "state" : answer_status
            })
    
    
    def DOCKER_CLIENT_UNAVAILABLE():
        return Answer.make_object({}, "Failed to connect to the docker client", AnswerStatus.DOCKER_CLIENT_UNAVAILABLE)
    
    
    def FAILED(message : str, **kwargs):
        return Answer.make_object({},message, AnswerStatus.FAILED, **kwargs)
    
    def SUCCEED(data : dict, message : str, **kwargs):
        return Answer.make_object(data,message, AnswerStatus.SUCCEED, **kwargs)

    def E404(message : str, **kwargs):
        return Answer.make_object({}, message, AnswerStatus.FAILED, **kwargs)

