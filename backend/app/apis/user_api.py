from flask import request, abort
from flask_restx import Namespace, Resource
from werkzeug.security import generate_password_hash

from ..models.users import User
from ..models.invoice import Invoice
from ..models.revenue import Revenue
from ..models.expense import Expense
from ..models.settings import Settings
from ..schemas.users_serializer import user_serializer, house_section_serializer, user_data_serializer

api = Namespace('users', description='User related operations')

@api.route('/users-data')
class UserProfileListResource(Resource):
    @api.marshal_with(user_data_serializer)
    def get(self):
        try:
            # Fetch all records from the database
            users = User.get_all()
            invoices = Invoice.get_all()
            revenues = Revenue.get_all()
            expenses = Expense.get_all()

            # Map user IDs to their related data
            user_data = {user._id: {'invoices': [], 'revenues': [], 'expenses': []} for user in users}
            for invoice in invoices:
                user_data[invoice.user_id]['invoices'].append(invoice)
            for revenue in revenues:
                user_data[revenue.user_id]['revenues'].append(revenue)
            for expense in expenses:
                user_data[expense.user_id]['expenses'].append(expense)
                
            # Attach data and calculate totals for each user
            for user in users:
                user.invoices = user_data[user._id]['invoices']
                user.revenues = user_data[user._id]['revenues']
                user.expenses = user_data[user._id]['expenses']
                
                user.total_water_consumption = sum(invoice.consumption for invoice in user.invoices)
                user.total_invoice_amount = sum(invoice.total_amount for invoice in user.invoices)
                user.total_revenue_amount = sum(revenue.amount for revenue in user.revenues)
                user.total_expense_amount = sum(expense.amount for expense in user.expenses)

                # Remove password from the response
                user.password = None
            
            return users, 200

        except Exception as e:
            api.abort(500, f"An error occurred while fetching user profiles: {str(e)}")

@api.route('/house-sections')
class HouseSectionResource(Resource):
    @api.marshal_with(house_section_serializer)
    def get(self):
        settings = Settings.get_all()
        last_setting = settings[-1]

        print('This is the last setting:', last_setting)

        return last_setting, 200

@api.route('/users-list')
class UserListResource(Resource):
    @api.marshal_with(user_serializer)
    def get(self):
        users = User.get_all()
        filtered_users = [user for user in users if user.house_section == 'Osupuko']
        for user in filtered_users:
            user.password = None
        return filtered_users, 200
    
@api.route('/create-user')
class UserCreateResource(Resource):
    @api.expect(user_serializer)
    @api.marshal_with(user_serializer)
    def post(self):
        data = request.get_json()

        if User.get_by(phone_number=data.get('phone_number')):
            abort(400, 'User with this phone number already exists')

        hashed_password = generate_password_hash(data.get('password'))
        new_user = User(**data)
        new_user.password = hashed_password
        #new_user.save()
        return new_user, 201
    

@api.route('/update-user')
class UserUpdateResource(Resource):
    @api.expect(user_serializer)
    @api.marshal_with(user_serializer)
    def put(self):
        data = request.get_json()
        _id = data.get('id')
        user = User.get_by_id(_id)
        if not user:
            abort(404, 'User not found')

        updated_user = {
            'full_name': data.get('fullName'),
            'email': data.get('email'),
            'phone_number': data.get('phoneNumber'),
            'house_section': data.get('houseSection'),
            'house_number': data.get('houseNumber'),
            'is_active': data.get('isActive'),
            'is_admin': data.get('isAdmin')
        }

        print('This is the updated user:', updated_user)
        user.update(**updated_user)
        return user, 200

@api.route('/delete-user/<int:_id>')
class UserDeleteResource(Resource):
    def delete(self, _id):
        user = User.get_by_id(_id)
        if not user:
            abort(404, 'User not found')
        user.delete()
        return {'message': 'User deleted'}, 200
