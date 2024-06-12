from flask import request, abort
from flask_restx import Namespace, Resource
from ..models.invoice import Invoice
from ..schemas.invoice_serializer import invoice_serializer

api = Namespace('invoices', description='Invoice related operations')

@api.route('/')
class InvoiceResource(Resource):
    @api.marshal_with(invoice_serializer)
    def get(self):
        return Invoice.get_all()

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