from flask import request, abort
from flask_restx import Namespace, Resource
from werkzeug.security import generate_password_hash

from ..models.users import User
from ..models.invoice import Invoice
from ..models.revenue import Revenue
from ..models.expense import Expense
from ..models.settings import Settings
from ..schemas.users_serializer import user_serializer, house_section_serializer, user_profile_serializer

api = Namespace('users', description='User related operations')

@api.route('/personal-profile')
class UserProfileListResource(Resource):
    @api.marshal_with(user_profile_serializer)
    def get(self):
        try:
            users = User.get_all()
            invoices = Invoice.get_all()
            revenues = Revenue.get_all()
            
            # Create a dictionary to map user IDs to their invoices and revenues
            user_invoices = {user._id: [] for user in users}
            user_revenues = {user._id: [] for user in users}
            
            for invoice in invoices:
                user_invoices[invoice.user_id].append(invoice)
                
            for revenue in revenues:
                user_revenues[revenue.user_id].append(revenue)
                
            # Attach invoices and revenues to each user
            for user in users:
                user.invoices = user_invoices[user._id]
                user.revenues = user_revenues[user._id]
            
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

@api.route('/get')
class UserListResource(Resource):
    @api.marshal_with(user_serializer)
    def get(self):
        users = User.get_all()
        filtered_users = [user for user in users if user.house_section == 'Osupuko']
        for user in filtered_users:
            user.password = None
        return filtered_users, 200
    
@api.route('/post')
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
        new_user.save()
        return new_user, 201

@api.route('/delete/<int:_id>')
class UserDeleteResource(Resource):
    def delete(self, _id):
        user = User.get_by_id(_id)
        if not user:
            abort(404, 'User not found')
        user.delete()
        return {'message': 'User deleted'}, 200
