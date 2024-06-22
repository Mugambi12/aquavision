from flask import request, abort
from flask_restx import Namespace, Resource
from datetime import datetime

from ..models.chats import Chat
from ..schemas.chat_serializer import chat_serializer

api = Namespace('chats', description='Chat related operations')

@api.route('/get-chats')
class ChatsGetResource(Resource):
    @api.marshal_with(chat_serializer)
    def get(self):
        chats = Chat.get_all()

        for chat in chats:
            for message in chat.messages:
                iso_timestamp = message['timestamp']
                dt = datetime.fromisoformat(iso_timestamp.replace('Z', '+00:00'))
                formatted_timestamp = dt.strftime('%I:%M %p')
                message['timestamp'] = formatted_timestamp

        return chats, 200


@api.route('/send-chats')
class ChatCreateResource(Resource):
    @api.expect(chat_serializer)
    @api.marshal_with(chat_serializer)
    def post(self):
        data = request.get_json()

        print("This is the message data from the frontend:: ", data)

        # Perform necessary validation here
        # if Chat.get_by(type=data.get('type')):
        #     abort(400, 'Chat with this type already exists')

        #new_chat = Chat(**data)
        #new_chat.save()
        #return new_chat, 201
        return 201


#@api.route('/<int:_id>')
#class ChatDetailResource(Resource):
#    @api.marshal_with(chat_serializer)
#    def get(self, _id):
#        chat = Chat.get_by_id(_id)
#        if not chat:
#            abort(404, 'Chat not found')
#        return chat
#
#    @api.expect(chat_serializer)
#    @api.marshal_with(chat_serializer)
#    def put(self, _id):
#        data = request.get_json()
#        chat = Chat.get_by_id(_id)
#        if not chat:
#            abort(404, 'Chat not found')
#        chat.update(**data)
#        return chat
#
#    def delete(self, _id):
#        chat = Chat.get_by_id(_id)
#        if not chat:
#            abort(404, 'Chat not found')
#        chat.delete()
#        return {'message': 'Chat deleted'}, 200