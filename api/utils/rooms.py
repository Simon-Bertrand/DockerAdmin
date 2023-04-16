global roomsActive
roomsActive = {}
from flask_socketio import SocketIO, send, emit, join_room, leave_room, rooms
class RoomsActive:
    def add_to_room(room):
        if not room in roomsActive.keys():
            roomsActive[room] = 0
        roomsActive[room] +=1
        join_room(room)

    def remove_to_room(room):
        if room in roomsActive.keys():
            roomsActive[room] -= 1
            leave_room(room)
            if roomsActive[room] <= 0:
                del roomsActive[room]
       
    def get_room_count(room):
        if room in roomsActive.keys():
            return roomsActive[room]
        return -1

    def room_empty_or(room, func_empty, func_any):
        if roomsActive.get(room,-1)>0: func_any()
        else: func_empty()

