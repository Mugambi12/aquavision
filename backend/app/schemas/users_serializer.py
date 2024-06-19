from flask_restx import fields
from ..extensions.rest_api import api

user_serializer = api.model(
  'User', {
    '_id': fields.Integer(),
    'full_name': fields.String(),
    'email': fields.String(),
    'phone_number': fields.String(),
    'password': fields.String(),
    'house_section': fields.String(),
    'house_number': fields.String(),
    'profile_image': fields.String(),
    'is_active': fields.Boolean(),
    'is_admin': fields.Boolean(),
    'balance': fields.Float(),
    'last_login': fields.DateTime(),
    'last_logout': fields.DateTime(),
    'created_at': fields.DateTime(),
    'updated_at': fields.DateTime(),
    'deleted_at': fields.DateTime()
  }
)

house_section_serializer = api.model(
  'HouseSection', {
    '_id': fields.Integer(),
    'services': fields.Raw(),
  }
)