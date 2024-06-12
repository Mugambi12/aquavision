from flask import request, abort
from flask_restx import Namespace, Resource
from ..models.expense import Expense
from ..schemas.expense_serializer import expense_serializer

api = Namespace('expenses', description='Expense related operations')

@api.route('/')
class ExpenseResource(Resource):
    @api.marshal_with(expense_serializer)
    def get(self):
        return Expense.get_all()

    @api.expect(expense_serializer)
    @api.marshal_with(expense_serializer)
    def post(self):
        data = request.get_json()

        print('data', data)

        # Perform necessary validation here

        new_expense = Expense(**data)
        new_expense.save()
        return new_expense, 201
  

@api.route('/<int:_id>')
class ExpenseDetailResource(Resource):
    @api.marshal_with(expense_serializer)
    def get(self, _id):
        expense = Expense.get_by_id(_id)
        if not expense:
            abort(404, 'Expense not found')
        return expense

    @api.expect(expense_serializer)
    @api.marshal_with(expense_serializer)
    def put(self, _id):
        data = request.get_json()
        expense = Expense.get_by_id(_id)
        if not expense:
            abort(404, 'Expense not found')
        expense.update(**data)
        return expense

    def delete(self, _id):
        expense = Expense.get_by_id(_id)
        if not expense:
            abort(404, 'Expense not found')
        expense.delete()
        return {'message': 'Expense deleted'}, 200