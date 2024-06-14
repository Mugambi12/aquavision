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
                    'house_section': invoice.house_section,
                    'house_number': invoice.house_number,
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
                
            response_data.reverse()

            return response_data, 200

        except Exception as e:
            logging.error(f"An error occurred: {e}")
            abort(500, "An internal error occurred")

    @api.expect(invoice_serializer)
    @api.marshal_with(invoice_serializer)
    def post(self):
        data = request.get_json()

        print("This is the data from client", data)

        # Validate required fields
        required_fields = ['house_section', 'house_number', 'current_reading']
        for field in required_fields:
            if field not in data:
                abort(400, f"'{field}' is a required field")

        new_invoice = {
            'house_section': data['house_section'],
            'house_number': data['house_number'],
            'current_reading': float(data['current_reading'])  # Ensure it's a float
        }
        print("This is the new invoice", new_invoice)

        new_invoice['user_id'] = 1  # Assuming a user_id is being assigned for now

        # Get settings from database
        settings = Settings.get_all()
        if not settings:
            abort(404, "No settings found")

        # Ensure settings and services are not empty
        latest_setting = settings[-1]
        if not hasattr(latest_setting, 'services') or not latest_setting.services:
            abort(404, "No services found in the settings")

        services = latest_setting.services
        unit_price = float(services['unit_price'])
        service_fee = float(services['service_fee'])

        # Ensure previous_reading is present and calculate consumption
        previous_reading = float(data.get('previous_reading', 0))

        consumption = new_invoice['current_reading'] - previous_reading

        # Calculate total amount
        new_invoice['unit_price'] = unit_price
        new_invoice['service_fee'] = service_fee
        new_invoice['total_amount'] = consumption * unit_price + service_fee

        new_invoice['previous_reading'] = previous_reading
        new_invoice['consumption'] = consumption
        new_invoice['payment_status'] = data.get('payment_status', 'unpaid')

        print("This is the final invoice", new_invoice)

        # Save the invoice to the database
        new_invoice_obj = Invoice(**new_invoice)
        new_invoice_obj.save()

        return new_invoice_obj, 201




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
    
@api.route('/<int:_id>/pay')
class InvoicePaymentResource(Resource):
    @api.marshal_with(invoice_serializer)
    def post(self, _id):
        data = request.get_json()

        invoice = Invoice.get_by_id(_id)
        if not invoice:
            abort(404, 'Invoice not found')

        user = User.get_by_id(invoice.user_id)
        if not user:
            abort(404, 'User not found')

        if user.balance < invoice.total_amount:
            abort(400, 'Insufficient balance')

        user.balance -= invoice.total_amount
        user.save()

        invoice.payment_status = 'paid'
        invoice.save()

        return invoice, 200