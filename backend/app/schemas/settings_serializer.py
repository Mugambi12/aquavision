# settings_serializer.py

from flask_restx import fields
from ..extensions.rest_api import api

settings_serializer = api.model(
    'Settings', {
        '_id': fields.Integer(readonly=True, description='The unique identifier of a setting'),
        'company_logo': fields.String(required=True, description='Company logo URL'),
        'company_name': fields.String(required=True, description='Company name'),
        'company_address': fields.String(required=True, description='Company address'),
        'company_email': fields.String(required=True, description='Company email'),
        'contact_number': fields.String(required=True, description='Contact number'),
        'company_website_url': fields.String(required=True, description='Company website URL'),
        'company_description': fields.String(description='Company description'),
        'services': fields.Raw(description='List of services offered'),
        'payments': fields.Raw(description='Payment methods'),
        'mailConfig': fields.Raw(description='Mail configuration'),
        'socialAccounts': fields.Raw(description='Social media accounts'),
        'created_at': fields.DateTime(readonly=True, description='Creation timestamp'),
        'updated_at': fields.DateTime(readonly=True, description='Last update timestamp'),
        'deleted_at': fields.DateTime(description='Deletion timestamp')
    }
)