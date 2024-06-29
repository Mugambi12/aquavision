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

# Serializer definitions
user_data_serializer = api.model('User', {
    '_id': fields.Integer,
    'full_name': fields.String,
    'email': fields.String,
    'phone_number': fields.String,
    'house_section': fields.String,
    'house_number': fields.String,
    'profile_image': fields.String,
    'is_active': fields.Boolean,
    'is_admin': fields.Boolean,
    'balance': fields.Float,
    'last_login': fields.DateTime,
    'last_logout': fields.DateTime,
    'total_water_consumption': fields.Float,
    'total_invoice_amount': fields.Float,
    'total_revenue_amount': fields.Float,
    'total_expense_amount': fields.Float,
    'created_at': fields.DateTime,
    'invoices': fields.List(fields.Nested(api.model('Invoice', {
        '_id': fields.String,
        'user_id': fields.Integer,
        'house_section': fields.String,
        'house_number': fields.String,
        'previous_reading': fields.Float,
        'current_reading': fields.Float,
        'consumption': fields.Float,
        'unit_price': fields.Float,
        'service_fee': fields.Float,
        'total_amount': fields.Float,
        'payment_status': fields.String,
        'created_at': fields.DateTime,
    }))),
    'revenues': fields.List(fields.Nested(api.model('Revenue', {
        '_id': fields.String,
        'source': fields.String,
        'user_id': fields.Integer,
        'invoice_id': fields.Integer,
        'payment_date': fields.DateTime,
        'amount': fields.Float,
        'payment_method': fields.String,
        'payment_status': fields.String,
        'transaction_id': fields.String,
        'phone_number': fields.String,
        'created_at': fields.DateTime,
    }))),
    'expenses': fields.List(fields.Nested(api.model('Expense', {
        '_id': fields.String,
        'user_id': fields.Integer,
        'type': fields.String,
        'date': fields.DateTime,
        'vendor': fields.String,
        'amount': fields.Float,
        'description': fields.String,
        'approval_status': fields.String,
        'payment_method': fields.String,
        'payment_status': fields.String,
        'transaction_id': fields.String,
        'created_at': fields.DateTime,
    }))),
})
