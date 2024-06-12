from flask_restx import fields
from ..extensions.rest_api import api

"""
class Register(db.Model, BaseMixin):
    __tablename__ = 'registers'

    email = str, nullable=False
    phone_number = str, nullable=False
    full_name = str, nullable=False
    password = str, nullable=False
    house_section = str, nullable=False
    house_number = str, nullable=False
    profile_image = str, nullable=True
    is_admin = bool, nullable=False
    created_at = datetime, nullable=False
    updated_at = datetime, nullable=False
    deleted_at = datetime
"""

register_serializer = api.model(
  'Register', {
    'email': fields.String(),
    'phone_number': fields.String(),
    'full_name': fields.String(),
    'password': fields.String(),
    'house_section': fields.String(),
    'house_number': fields.String(),
    'profile_image': fields.String(),
    'is_admin': fields.Boolean(),
    'created_at': fields.DateTime(),
    'updated_at': fields.DateTime(),
    'deleted_at': fields.DateTime()
  }
)

"""
class Login(db.Model, BaseMixin):
    __tablename__ = 'logins'

    'phone_number': fields.String(),
    password = str, nullable=False
"""

login_serializer = api.model(
  'Login', {
    'phone_number': fields.String(),
    'password': fields.String()
  }
)