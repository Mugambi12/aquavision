from flask_restx import fields
from ..extensions.rest_api import api


# Serializer definition
invoice_serializer = api.model(
    'Invoice', {
        '_id': fields.String(),
        'company_name': fields.String(),
        'user_id': fields.Integer(),
        'house_section': fields.String(),
        'house_number': fields.String(),
        'full_name': fields.String(),
        'previous_reading': fields.Float(),
        'current_reading': fields.Float(),
        'consumption': fields.Float(),
        'unit_price': fields.Float(),
        'service_fee': fields.Float(),
        'total_amount': fields.Float(),
        'paid_amount': fields.Float(),
        'balance': fields.Float(),
        'payment_status': fields.String(),
        'payment_status_text': fields.String(),
        'created_at': fields.DateTime(),
        'updated_at': fields.DateTime(),
        'deleted_at': fields.DateTime(),
    }
)

active_houses_serializer = api.model(
  'User', {
    'house_section': fields.String(),
    'house_number': fields.String()
  }
)

unpaid_invoices_serializer = api.model(
    'Invoice', {
        '_id': fields.String(),
        'full_name': fields.String(),
        'user_id': fields.Integer(),
        'house_section': fields.String(),
        'house_number': fields.String(),
        'total_amount': fields.Float()
    }
)