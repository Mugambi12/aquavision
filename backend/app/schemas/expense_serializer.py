from flask_restx import fields
from ..extensions.rest_api import api

expense_serializer = api.model(
  'Expense', {
    '_id': fields.String(),
    'date': fields.String(),
    'vendor': fields.String(),
    'amount': fields.Float(),
    'description': fields.String(),
    'status': fields.String(),
    'payment_method': fields.String(),
    'payment_status': fields.String(),
    'transaction_id': fields.String(),
    'created_at': fields.DateTime(),
    'updated_at': fields.DateTime(),
    'deleted_at': fields.DateTime()
  }
)