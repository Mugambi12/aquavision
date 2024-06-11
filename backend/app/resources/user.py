from flask import request
from flask_restx import Namespace, Resource
from ..models.users import User
from ..schemas.users_serializer import user_serializer

api = Namespace('users', description='User related operations')

@api.route('/')
class UserResource(Resource):
    @api.marshal_with(user_serializer)
    def get(self):
        return User.get_all()

    @api.expect(user_serializer)
    @api.marshal_with(user_serializer)
    def post(self):
        data = request.get_json()

        # Perform necessary validation here
        if User.get_by(email=data.get('email')):
            return {'message': 'User with this email already exists'}, 400
        if User.get_by(phone_number=data.get('phone_number')):
            return {'message': 'User with this phone number already exists'}, 400

        new_user = User(**data)
        new_user.save()
        return new_user, 201

@api.route('/<int:id>')
class UserDetailResource(Resource):
    @api.marshal_with(user_serializer)
    def get(self, id):
        user = User.get_by_id(id)
        if not user:
            return {'message': 'User not found'}, 404
        return user

    @api.expect(user_serializer)
    @api.marshal_with(user_serializer)
    def put(self, id):
        data = request.get_json()
        user = User.get_by_id(id)
        if not user:
            return {'message': 'User not found'}, 404
        user.update(**data)
        return user

    def delete(self, id):
        user = User.get_by_id(id)
        if not user:
            return {'message': 'User not found'}, 404
        user.delete()
        return {'message': 'User deleted'}, 200
