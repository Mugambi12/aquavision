from flask_restx import fields
from ..extensions.rest_api import api

"""
class Chat(db.Model, BaseMixin):
    __tablename__ = 'chats'

    type = str, nullable=False
    participants = list, nullable=False
    messages = list, nullable=False
"""

chat_serializer = api.model(
  'Chat', {
    '_id': fields.Integer(),
    'type': fields.String(),
    'participants': fields.Raw(),
    'messages': fields.Raw(),
    'created_at': fields.DateTime(),
    'updated_at': fields.DateTime(),
    'deleted_at': fields.DateTime()
  }
)