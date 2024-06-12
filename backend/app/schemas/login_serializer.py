from flask_restx import fields
from ..extensions.rest_api import api

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