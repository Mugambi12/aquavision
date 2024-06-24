# invoice_service.py

from ..models.invoice import Invoice
from ..models.users import User
from ..models.settings import Settings

class InvoiceService:
    @staticmethod
    def get_invoice_list():
        users = User.get_all()
        invoices = Invoice.get_all()
        settings = Settings.get_all()

        if not users or not invoices or not settings:
            return None
        
        latest_settings = settings[-1]
        response_data = []

        for invoice in invoices:
            user = next((u for u in users if u._id == invoice.user_id), None)
            if not user:
                continue

            invoice_data = InvoiceService._build_invoice_response(invoice, user, latest_settings)
            response_data.append(invoice_data)

        response_data.reverse()
        return response_data

    @staticmethod
    def create_invoice(data):
        user = User.query.filter_by(house_section=data['house_section'], house_number=data['house_number'], is_active=True).first()
        if not user:
            raise ValueError(f'User not found with house section {data["house_section"]} and house number {data["house_number"]}')

        new_invoice_data = InvoiceService._prepare_invoice_data(data, user._id)
        new_invoice_obj = Invoice(**new_invoice_data)
        new_invoice_obj.save()

        if new_invoice_data['total_amount'] > 0:
            user.balance += new_invoice_data['total_amount']
            user.save()

        return new_invoice_obj

    @staticmethod
    def delete_invoice(invoice_id):
        invoice = Invoice.get_by_id(invoice_id)
        if not invoice:
            raise ValueError('Invoice not found')

        if invoice.payment_status == 'paid':
            raise ValueError('Cannot delete a paid invoice')

        user = User.get_by_id(invoice.user_id)
        if not user:
            raise ValueError('User not found')

        user.balance -= invoice.total_amount
        user.save()

        invoice.delete()
        return True

    @staticmethod
    def pay_invoice(invoice_id):
        invoice = Invoice.get_by_id(invoice_id)
        if not invoice:
            raise ValueError('Invoice not found')

        user = User.get_by_id(invoice.user_id)
        if not user:
            raise ValueError('User not found')

        InvoiceService._validate_payment(user, invoice)
        user.balance -= invoice.total_amount
        user.save()

        invoice.payment_status = 'paid'
        invoice.save()
        return invoice

    @staticmethod
    def _build_invoice_response(invoice, user, settings):
        return {
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

    @staticmethod
    def _prepare_invoice_data(data, user_id):
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

    @staticmethod
    def _validate_payment(user, invoice):
        if user.balance < invoice.total_amount:
            raise ValueError('Insufficient balance')
