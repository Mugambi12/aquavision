from flask import request, abort
from flask_restx import Namespace, Resource
from ..models.payment import Payment
from ..schemas.payment_serializer import payment_serializer

api = Namespace('payments', description='Payment related operations')

@api.route('/')
class PaymentResource(Resource):
    @api.marshal_with(payment_serializer)
    def get(self):
        return Payment.get_all()

    @api.expect(payment_serializer)
    @api.marshal_with(payment_serializer)
    def post(self):
        data = request.get_json()

        print('data', data)

        # Perform necessary validation here

        new_payment = Payment(**data)
        new_payment.save()
        return new_payment, 201
    

@api.route('/<int:_id>')
class PaymentDetailResource(Resource):
    @api.marshal_with(payment_serializer)
    def get(self, _id):
        payment = Payment.get_by_id(_id)
        if not payment:
            abort(404, 'Payment not found')
        return payment

    @api.expect(payment_serializer)
    @api.marshal_with(payment_serializer)
    def put(self, _id):
        data = request.get_json()
        payment = Payment.get_by_id(_id)
        if not payment:
            abort(404, 'Payment not found')
        payment.update(**data)
        return payment

    def delete(self, _id):
        payment = Payment.get_by_id(_id)
        if not payment:
            abort(404, 'Payment not found')
        payment.delete()
        return {'message': 'Payment deleted'}, 200