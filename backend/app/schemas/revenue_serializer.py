from flask_restx import fields
from ..extensions.rest_api import api

revenue_serializer = api.model(
  'Revenue', {
    '_id': fields.String(),
    'source': fields.String(),
    'user_id': fields.Integer(),
    'full_name': fields.String(),
    'house_section': fields.String(),
    'house_number': fields.String(),
    'invoice_id': fields.Integer(),
    'amount': fields.Float(),
    'payment_method': fields.String(),
    'payment_status': fields.String(),
    'transaction_id': fields.String(),
    'phone_number': fields.String(),
    'payment_date': fields.Date(),
    'created_at': fields.DateTime(),
    'updated_at': fields.DateTime(),
    'deleted_at': fields.DateTime(),
  }
)