from flask import request, abort
from flask_restx import Namespace, Resource
from ..models.expense import Expense
from ..schemas.expense_serializer import expense_serializer

api = Namespace('expenses', description='Expense related operations')

@api.route('/get')
class ExpenseListResource(Resource):
    @api.marshal_with(expense_serializer)
    def get(self):
        expenses = Expense.get_all()
        # Append date in data by using created_at attribute in expenses in the format of 'YYYY-MM-DD'
        for expense in expenses:
            expense.date = expense.created_at.strftime('%Y-%m-%d')

        return expenses, 200

@api.route('/create')
class ExpenseCreateResource(Resource):
    @api.expect(expense_serializer)
    @api.marshal_with(expense_serializer)
    def post(self):
        data = request.get_json()

        print('data', data)

        # Perform necessary validation here

        new_expense = Expense(**data)
        new_expense.save()
        return new_expense, 201

@api.route('/get/<int:_id>')
class ExpenseResource(Resource):
    @api.marshal_with(expense_serializer)
    def get(self, _id):
        expense = Expense.get_by_id(_id)
        if not expense:
            abort(404, 'Expense not found')
        return expense

@api.route('/update/<int:_id>')
class ExpenseUpdateResource(Resource):
    @api.expect(expense_serializer)
    @api.marshal_with(expense_serializer)
    def put(self, _id):
        data = request.get_json()
        expense = Expense.get_by_id(_id)
        if not expense:
            abort(404, 'Expense not found')
        expense.update(**data)
        return expense

@api.route('/delete/<int:_id>')
class ExpenseDeleteResource(Resource):
    def delete(self, _id):
        expense = Expense.get_by_id(_id)
        if not expense:
            abort(404, 'Expense not found')
        expense.delete()
        return {'message': 'Expense deleted'}, 200