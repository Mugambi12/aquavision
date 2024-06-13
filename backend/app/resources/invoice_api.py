from flask import request, abort
from flask_restx import Namespace, Resource, fields
from ..models.users import User
from ..models.invoice import Invoice
from ..models.settings import Settings
from ..schemas.invoice_serializer import invoice_serializer
from datetime import datetime
import logging

api = Namespace('invoices', description='Invoice related operations')

@api.route('/')
class InvoiceResource(Resource):
    @api.marshal_with(invoice_serializer)
    def get(self):
        try:
            users = User.get_all()
            if not users:
                abort(404, "No users found")

            invoices = Invoice.get_all()
            if not invoices:
                abort(404, "No invoices found")

            settings = Settings.get_all()
            if not settings:
                abort(404, "No settings found")

            company_info = settings[-1]
            response_data = []

            for invoice in invoices:
                user = next((u for u in users if u._id == invoice.user_id), None)
                if not user:
                    continue

                invoice_data = {
                    '_id': invoice._id,
                    'company_name': company_info.company_name,
                    'user_id': invoice.user_id,
                    'full_name': user.full_name,
                    'previous_reading': invoice.previous_reading,
                    'current_reading': invoice.current_reading,
                    'consumption': invoice.consumption,
                    'unit_price': invoice.unit_price,
                    'service_fee': invoice.service_fee,
                    'total_amount': invoice.total_amount,
                    'paid_amount': user.balance,
                    'balance': user.balance,
                    'payment_status': invoice.payment_status.lower(),
                    'payment_status_text': invoice.payment_status.upper(),
                    'created_at': invoice.created_at,
                }
                response_data.append(invoice_data)

            return response_data, 200

        except Exception as e:
            logging.error(f"An error occurred: {e}")
            abort(500, "An internal error occurred")



    @api.expect(invoice_serializer)
    @api.marshal_with(invoice_serializer)
    def post(self):
        data = request.get_json()

        # Perform necessary validation here

        new_invoice = Invoice(**data)
        new_invoice.save()
        return new_invoice, 201


@api.route('/<int:_id>')
class InvoiceDetailResource(Resource):
    @api.marshal_with(invoice_serializer)
    def get(self, _id):
        invoice = Invoice.get_by_id(_id)
        if not invoice:
            abort(404, 'Invoice not found')
        return invoice

    @api.expect(invoice_serializer)
    @api.marshal_with(invoice_serializer)
    def put(self, _id):
        data = request.get_json()
        invoice = Invoice.get_by_id(_id)
        if not invoice:
            abort(404, 'Invoice not found')
        invoice.update(**data)
        return invoice

    def delete(self, _id):
        invoice = Invoice.get_by_id(_id)
        if not invoice:
            abort(404, 'Invoice not found')
        invoice.delete()
        return {'message': 'Invoice deleted'}, 200