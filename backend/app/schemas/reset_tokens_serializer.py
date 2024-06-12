from flask_restx import fields
from ..extensions.rest_api import api

reset_tokens_serializer = api.model(
  'ResetToken', {
    '_id': fields.String(),
    'user_id': fields.String(),
    'token': fields.String(),
    'expiry': fields.DateTime(),
    'created_at': fields.DateTime(),
    'updated_at': fields.DateTime(),
    'deleted_at': fields.DateTime()
  }
)