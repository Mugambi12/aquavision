from flask_restx import fields
from ..extensions.rest_api import api

settings_serializer = api.model(
  'Settings', {
    '_id': fields.Integer(),
    'company_logo': fields.String(),
    'company_name': fields.String(),
    'company_address': fields.String(),
    'company_email': fields.String(),
    'contact_number': fields.String(),
    'company_website_url': fields.String(),
    'company_description': fields.String(),
    'services': fields.Raw(),
    'payments': fields.Raw(),
    'mailConfig': fields.Raw(),
    'socialAccounts': fields.Raw(),
    'created_at': fields.DateTime(),
    'updated_at': fields.DateTime(),
    'deleted_at': fields.DateTime()
  }
)