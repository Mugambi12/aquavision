from flask_restx import fields
from ..extensions.rest_api import api

payment_serializer = api.model(
  'Payment', {
    '_id': fields.String(),
    'user_id': fields.Integer(),
    'invoice_id': fields.Integer(),
    'payment_date': fields.DateTime(),
    'amount': fields.Float(),
    'payment_method': fields.String(),
    'payment_status': fields.String(),
    'created_at': fields.DateTime(),
    'updated_at': fields.DateTime(),
    'deleted_at': fields.DateTime()
  }
)