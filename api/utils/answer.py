
from enum import IntEnum
from http import HTTPStatus
from marshmallow import Schema, fields
from flask import Response, jsonify, make_response


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




class Answer:
    def __init__(self, state : AnswerStatus, payload : dict = {}, message : str = "" ):
        if isinstance(payload, dict) and len(payload.keys()) :self.payload = payload
        if isinstance(payload, list) and len(payload) : self.payload = payload
        if isinstance(message, str) and message.replace(" ", "")!= "" : self.message = message
        self.state = state

    def to_http(self, http_status : HTTPStatus): return HTTPResponse(self, http_status)

    def make_object(data : dict, message : str, answer_status : AnswerStatus, payload_schema = None):
        return Answer(**{
                "message" : message,
                "payload" : data if payload_schema is None else payload_schema.dump(data),
                "state" : answer_status
            })
    
    
    def DOCKER_CLIENT_UNAVAILABLE():
        return Answer.make_object({}, "Failed to connect to the docker client", AnswerStatus.DOCKER_CLIENT_UNAVAILABLE).to_http(HTTPStatus.SERVICE_UNAVAILABLE)
    
    def BAD_SERVER_OUTPUT(message : str, **kwargs):
        return Answer.make_object({},message, AnswerStatus.FAILED, **kwargs).to_http(HTTPStatus.INTERNAL_SERVER_ERROR)

    def SUCCEED(data : dict, message : str, **kwargs):
        return Answer.make_object(data,message, AnswerStatus.SUCCEED, **kwargs).to_http(HTTPStatus.OK)


class HTTPResponse(Response):
    def __init__(self, answer : Answer, http_status : HTTPStatus):
        self.answer = answer
        self.http_status = http_status

    def send(self):
        return make_response(
            jsonify(AnswerSchema().dump(self.answer)),
            self.http_status
        )