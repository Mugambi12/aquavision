from flask import request, abort
from flask_restx import Namespace, Resource
from ..models.revenue import Revenue
from ..schemas.revenue_serializer import revenue_serializer

api = Namespace('payments', description='Payment related operations')

@api.route('/get')
class PaymentListResource(Resource):
    @api.marshal_with(revenue_serializer)
    def get(self):
        return Revenue.get_all()

@api.route('/post')
class PaymentCreateResource(Resource):
    @api.expect(revenue_serializer)
    @api.marshal_with(revenue_serializer)
    def post(self):
        data = request.get_json()

        print('data', data)

        # Perform necessary validation here

        new_payment = Revenue(**data)
        new_payment.save()
        return new_payment, 201
    

@api.route('/<int:_id>')
class PaymentDetailResource(Resource):
    @api.marshal_with(revenue_serializer)
    def get(self, _id):
        payment = Revenue.get_by_id(_id)
        if not payment:
            abort(404, 'Payment not found')
        return payment

    @api.expect(revenue_serializer)
    @api.marshal_with(revenue_serializer)
    def put(self, _id):
        data = request.get_json()
        payment = Revenue.get_by_id(_id)
        if not payment:
            abort(404, 'Payment not found')
        payment.update(**data)
        return payment

    def delete(self, _id):
        payment = Revenue.get_by_id(_id)
        if not payment:
            abort(404, 'Payment not found')
        payment.delete()
        return {'message': 'Payment deleted'}, 200