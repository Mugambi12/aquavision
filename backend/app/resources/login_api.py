from flask import request, abort
from flask_restx import Namespace, Resource
from werkzeug.security import check_password_hash

from ..models.users import User
from ..schemas.login_serializer import register_serializer, login_serializer

api = Namespace('login', description='Login related operations')

@api.route('/')
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
