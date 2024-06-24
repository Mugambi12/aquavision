from flask import request, abort
from flask_restx import Namespace, Resource
from werkzeug.security import check_password_hash

from ..models.users import User
from ..schemas.auth_serializer import login_serializer, forgot_password_serializer

api = Namespace('login', description='Login related operations')

@api.route('/login')
class LoginResource(Resource):
    @api.expect(login_serializer)
    @api.marshal_with(login_serializer)
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


@api.route('/forgot-password')
class ForgotPasswordResource(Resource):
    @api.expect(forgot_password_serializer)
    @api.marshal_with(forgot_password_serializer, code=201)
    def post(self):
        data = request.get_json()
        print('This is the data', data)
        email = data.email
        user = User.get_by_email(email)
        if not user:
            abort(404, 'User not found')
        return {'message': 'Password reset link sent to your email'}, 200