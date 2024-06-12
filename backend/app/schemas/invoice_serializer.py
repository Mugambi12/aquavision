from flask_restx import fields
from ..extensions.rest_api import api

invoice_serializer = api.model(
  'Invoice', {
    '_id': fields.String(),
    'user_id': fields.Integer(),
    'previous_reading': fields.Float(),
    'current_reading': fields.Float(),
    'consumption': fields.Float(),
    'unit_price': fields.Float(),
    'service_fee': fields.Float(),
    'total_amount': fields.Float(),
    'payment_status': fields.String(),
    'created_at': fields.DateTime(),
    'updated_at': fields.DateTime(),
    'deleted_at': fields.DateTime()
  }
)