from flask import request, abort, jsonify
from datetime import datetime
from flask_restx import Namespace, Resource
from ..models.expense import Expense
from ..schemas.expense_serializer import expense_serializer

api = Namespace('expenses', description='Expense related operations')

@api.route('/get')
class ExpenseListResource(Resource):
    @api.marshal_with(expense_serializer)
    def get(self):
        expenses = Expense.get_all()
        return expenses, 200

@api.route('/get/highest')
class HighestExpenseResource(Resource):
    def get(self):
        expenses = Expense.get_all()

        if not expenses:
            return {'message': 'No expenses found'}, 404

        expense_totals = {}
        expense_counts = {}

        for expense in expenses:
            if expense.type in expense_totals:
                expense_totals[expense.type] += expense.amount
                expense_counts[expense.type] += 1
            else:
                expense_totals[expense.type] = expense.amount
                expense_counts[expense.type] = 1

        highest_expenses = []
        for expense_type, total_amount in expense_totals.items():
            count = expense_counts[expense_type]
            average = total_amount / count
            highest_expenses.append({
                'type': expense_type,
                'amount': total_amount,
                'average': average
            })

        highest_expenses = sorted(highest_expenses, key=lambda x: x['amount'], reverse=True)

        return highest_expenses, 200

@api.route('/create')
class ExpenseCreateResource(Resource):
    @api.expect(expense_serializer)
    @api.marshal_with(expense_serializer)
    def post(self):
        data = request.get_json()

        date_str = data.get('date')
        date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()

        new_expense = {
            'type': data.get('type'),
            'date': date_obj,
            'vendor': data.get('vendor').title(),
            'amount': data.get('amount'),
            'description': data.get('description').title(),
            'approval_status': data.get('approval_status'),
            'payment_method': data.get('payment_method').title(),
            'payment_status': data.get('payment_status'),
            'transaction_id': data.get('transaction_id')
        }

        print('This is the new expense:', new_expense)

        new_expense = Expense(**new_expense)
        new_expense.save()

        return {'message': 'Expense created successfully'}, 201
    

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