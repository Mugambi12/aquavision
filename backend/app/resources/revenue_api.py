from flask import request, abort
from flask_restx import Namespace, Resource
from datetime import datetime
from ..models.revenue import Revenue
from ..models.users import User
from ..models.invoice import Invoice
from ..schemas.revenue_serializer import revenue_serializer
from ..schemas.users_serializer import user_serializer
from ..schemas.invoice_serializer import invoice_serializer
import logging

api = Namespace('payments', description='Payment related operations')

@api.route('/get/unpaid-invoices')
class PaymentUnpaidInvoicesListResource(Resource):
    @api.marshal_with(invoice_serializer, as_list=True)
    def get(self):
        try:            
            invoices = Invoice.query.all()
            unpaid_invoices = []

            # Filter out unpaid invoices
            for invoice in invoices:
                if invoice.payment_status != 'paid':
                    unpaid_invoices.append(invoice)

            response_data = []

            # Build response data for unpaid invoices
            for invoice in unpaid_invoices:
                invoice_data = {
                    '_id': invoice._id,
                    'user_id': invoice.user_id,
                    'house_section': invoice.house_section,
                    'house_number': invoice.house_number,
                    'total_amount': invoice.total_amount
                }
                response_data.append(invoice_data)
            
            return response_data, 200
        except Exception as e:
            logging.error(e)
            return {'message': 'An error occurred while fetching unpaid invoices'}, 500        

@api.route('/get/users')
class PaymentUsersListResource(Resource):
    @api.marshal_with(user_serializer)
    def get(self):
        users = User.get_all()
        
        for user in users:
            user.password = None

        return users, 200
    
@api.route('/get/revenue')
class PaymentListResource(Resource):
    @api.marshal_with(revenue_serializer)
    def get(self):
        users = User.get_all()
        user_map = {user._id: user for user in users}

        payments = Revenue.get_all()

        payment_data = []

        for payment in payments:
            if payment.user_id in user_map:
                user = user_map[payment.user_id]
                payment_data.append({
                    '_id': payment._id,
                    'source': payment.source,
                    'user_id': payment.user_id,
                    'full_name': user.full_name,
                    'house_section': user.house_section,
                    'house_number': user.house_number,
                    'invoice_id': payment.invoice_id,
                    'amount': payment.amount,
                    'payment_method': payment.payment_method,
                    'payment_status': payment.payment_status,
                    'transaction_id': payment.transaction_id,
                    'phone_number': payment.phone_number,
                    'payment_date': payment.payment_date,
                    'created_at': payment.created_at,
                    'updated_at': payment.updated_at,
                    'deleted_at': payment.deleted_at
                })

        payment_data.reverse()

        return payment_data, 200

@api.route('/post')
class PaymentCreateResource(Resource):
    @api.expect(revenue_serializer)
    @api.marshal_with(revenue_serializer)
    def post(self):
        data = request.get_json()

        payment_date_str = data['payment_date']
        payment_date = datetime.strptime(payment_date_str, '%Y-%m-%d')

        new_payment = Revenue(
            source='Cash',
            user_id=data['user_id'],
            invoice_id=data['invoice_id'],
            amount=data['amount'],
            payment_date=payment_date,
            transaction_id=data['transaction_id'],
            payment_method=data['payment_method'].title(),
            payment_status=data['payment_status'].title(),
            phone_number=data['phone_number']
        )
        new_payment.save()
        return new_payment, 201
    
@api.route('/update/<int:_id>')
class PaymentUpdateResource(Resource):
    @api.expect(revenue_serializer)
    @api.marshal_with(revenue_serializer)
    def put(self, _id):
        data = request.get_json()
        payment = Revenue.get_by_id(_id)
        if not payment:
            abort(404, 'Payment not found')
        payment.update(**data)
        return payment, 200
    
@api.route('/refund/<int:_id>')
class PaymentRefundResource(Resource):
    @api.expect(revenue_serializer)
    @api.marshal_with(revenue_serializer)
    def put(self, _id):
        data = request.get_json()
        payment = Revenue.get_by_id(_id)
        if not payment:
            abort(404, 'Payment not found')
        payment.update(**data)
        return payment, 200
    
@api.route('/delete/<int:_id>')
class PaymentDeleteResource(Resource):
    def delete(self, _id):
        payment = Revenue.get_by_id(_id)
        if not payment:
            abort(404, 'Payment not found')
        payment.delete()
        return {'message': 'Payment deleted'}, 200