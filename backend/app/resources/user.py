from flask import request, abort
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
            abort(400, 'User with this email already exists')
        if User.get_by(phone_number=data.get('phone_number')):
            abort(400, 'User with this phone number already exists')

        new_user = User(**data)
        new_user.save()
        return new_user, 201

@api.route('/<int:_id>')
class UserDetailResource(Resource):
    @api.marshal_with(user_serializer)
    def get(self, _id):
        user = User.get_by_id(_id)
        if not user:
            abort(404, 'User not found')
        return user

    @api.expect(user_serializer)
    @api.marshal_with(user_serializer)
    def put(self, _id):
        data = request.get_json()
        user = User.get_by_id(_id)
        if not user:
            abort(404, 'User not found')
        user.update(**data)
        return user

    def delete(self, _id):
        user = User.get_by_id(_id)
        if not user:
            abort(404, 'User not found')
        user.delete()
        return {'message': 'User deleted'}, 200
