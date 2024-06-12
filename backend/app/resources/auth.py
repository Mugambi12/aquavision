from flask import request, abort
from flask_restx import Namespace, Resource
from werkzeug.security import generate_password_hash, check_password_hash
from ..models.users import User
from ..schemas.auth_serializer import register_serializer, login_serializer

api = Namespace('auth', description='Auth related operations')

@api.route('/register')
class RegisterResource(Resource):
    @api.expect(register_serializer)
    @api.marshal_with(register_serializer)
    def post(self):
        data = request.get_json()

        # Perform necessary validation here
        phone_number = data.get('phone_number')
        if User.get_by(phone_number):
            abort(400, 'User with this phone number already exists')
        
        new_user = User(
            password=generate_password_hash(data.get('password')),
            **data
        )

        new_user.save()
        return new_user, 201
    

@api.route('/login')
class LoginResource(Resource):
    @api.expect(login_serializer)
    @api.marshal_with(register_serializer)
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = User.get_by_email(email)
        if not user or not user.check_password(password):
            abort(401, 'Invalid credentials')
        return user, 200
    
@api.route('/logout')
class LogoutResource(Resource):
    def post(self):
        pass