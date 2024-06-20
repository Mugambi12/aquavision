from flask import request, abort
from flask_restx import Namespace, Resource, fields
from ..models.users import User
from ..models.invoice import Invoice
from ..models.settings import Settings
from ..schemas.invoice_serializer import invoice_serializer, active_houses_serializer
import logging

api = Namespace('invoices', description='Invoice related operations')

@api.route('/active-houses')
class ActiveHousesResource(Resource):
    @api.marshal_with(active_houses_serializer)
    def get(self):
        try:
            users = User.get_all()
            if not users:
                abort(404, "No users found")

            active_houses = {}

            for user in users:
                if user.is_active:
                    house_section = user.house_section
                    house_number = int(user.house_number)
                    
                    if house_section not in active_houses:
                        active_houses[house_section] = []
                    
                    active_houses[house_section].append(house_number)

            # Transform the dictionary into the desired list format
            result = [
                {
                    'house_section': section,
                    'house_number': sorted(numbers)
                }
                for section, numbers in active_houses.items()
            ]

            return result, 200
        
        except Exception as e:
            logging.error(f"An error occurred: {e}")
            abort(500, "An internal error occurred")

@api.route('/invoice-list')
class InvoiceListResource(Resource):
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

            latest_settings = settings[-1]
            response_data = []

            for invoice in invoices:
                user = next((u for u in users if u._id == invoice.user_id), None)
                if not user:
                    continue

                invoice_data = self._build_invoice_response(invoice, user, latest_settings)
                response_data.append(invoice_data)

            response_data.reverse()

            return response_data, 200

        except Exception as e:
            logging.error(f"An error occurred: {e}")
            abort(500, "An internal error occurred")

    def _build_invoice_response(self, invoice, user, settings):
        invoice_data = {
            '_id': invoice._id,
            'company_name': settings.company_name,
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
        return invoice_data

@api.route('/post')
class InvoiceCreateResource(Resource):
    @api.expect(invoice_serializer)
    @api.marshal_with(invoice_serializer, code=201)
    def post(self):
        try:
            data = request.get_json()
            self._validate_fields(data)
            
            user = self._get_user(data['house_section'], data['house_number'])
            if not user:
                abort(404, f'User not found with house section {data["house_section"]} and house number {data["house_number"]}')
                
            new_invoice = self._prepare_invoice_data(data, user._id)
            
            new_invoice_obj = self._save_invoice(new_invoice)
            
            if new_invoice['total_amount'] > 0:
                user.balance += new_invoice['total_amount']
                user.save()

            return new_invoice_obj, 201

        except KeyError as e:
            abort(400, f"Missing required field: {str(e)}")
        except ValueError as e:
            abort(400, f"Invalid value: {str(e)}")
        except Exception as e:
            logging.error(f"An error occurred: {e}")
            abort(500, "An internal error occurred")

    def _validate_fields(self, data):
        required_fields = ['house_section', 'house_number', 'current_reading']
        for field in required_fields:
            if field not in data:
                raise KeyError(field)

    def _get_user(self, house_section, house_number):
        return User.query.filter_by(house_section=house_section, house_number=house_number, is_active=True).first()

    def _prepare_invoice_data(self, data, user_id):
        new_invoice = {
            'house_section': data['house_section'],
            'house_number': data['house_number'],
            'current_reading': float(data['current_reading']),
            'user_id': user_id
        }

        settings = Settings.get_all()
        if not settings:
            raise ValueError("Settings not found")
        
        latest_settings = settings[-1]
        services = latest_settings.services
        unit_price = float(services['unit_price'])
        service_fee = float(services['service_fee'])

        latest_invoice = Invoice.get_latest_invoice(new_invoice['user_id'])
        previous_reading = latest_invoice.current_reading if latest_invoice else 0

        if previous_reading > new_invoice['current_reading']:
            consumption = 0
            total_amount = 0
            payment_status = 'paid'
        else:
            consumption = new_invoice['current_reading'] - previous_reading
            total_amount = consumption * unit_price + service_fee
            payment_status = data.get('payment_status', 'unpaid')

        new_invoice.update({
            'unit_price': unit_price,
            'service_fee': service_fee,
            'total_amount': total_amount,
            'previous_reading': previous_reading,
            'consumption': consumption,
            'payment_status': payment_status
        })

        return new_invoice

    def _save_invoice(self, new_invoice):
        new_invoice_obj = Invoice(**new_invoice)
        new_invoice_obj.save()
        return new_invoice_obj


@api.route('/delete/<int:_id>')
class InvoiceDeleteResource(Resource):
    def delete(self, _id):
        try:
            invoice = Invoice.get_by_id(_id)
            if not invoice:
                abort(404, 'Invoice not found')

            if invoice.payment_status == 'paid':
                logging.warning(f"Cannot delete a paid invoice with ID: {_id}")
                return {'message': 'Cannot delete a paid invoice'}, 400

            user = User.get_by_id(invoice.user_id)
            if not user:
                abort(404, 'User not found')

            user.balance -= invoice.total_amount
            user.save()

            invoice.delete()
            return {'message': 'Invoice deleted'}, 200

        except Exception as e:
            logging.error(f"An error occurred: {e}")
            abort(500, "An internal error occurred")



@api.route('/pay/<int:_id>')
class InvoicePaymentResource(Resource):
    @api.marshal_with(invoice_serializer)
    def put(self, _id):
        try:
            invoice = Invoice.get_by_id(_id)
            if not invoice:
                abort(404, 'Invoice not found')

            user = User.get_by_id(invoice.user_id)
            if not user:
                abort(404, 'User not found')

            self._validate_payment(user, invoice)

            self._process_payment(user, invoice)

            return invoice, 200

        except ValueError as e:
            abort(400, str(e))
        except Exception as e:
            logging.error(f"An error occurred: {e}")
            abort(500, "An internal error occurred")

    def _validate_payment(self, user, invoice):
        if user.balance < invoice.total_amount:
            raise ValueError('Insufficient balance')

    def _process_payment(self, user, invoice):
        user.balance -= invoice.total_amount
        user.save()

        invoice.payment_status = 'paid'
        invoice.save()
   