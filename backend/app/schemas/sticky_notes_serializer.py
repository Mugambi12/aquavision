from flask_restx import fields
from ..extensions.rest_api import api

sticky_notes_serializer = api.model(
  'StickyNotes', {
    '_id': fields.String(),
    'user_id': fields.String(),
    'content': fields.String(),
    'created_at': fields.DateTime(),
    'updated_at': fields.DateTime(),
    'deleted_at': fields.DateTime()
  }
)