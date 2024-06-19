from flask import request, abort
from flask_restx import Namespace, Resource
from werkzeug.security import generate_password_hash

from ..models.users import User
from ..models.settings import Settings
from ..schemas.users_serializer import user_serializer, house_section_serializer

api = Namespace('users', description='User related operations')


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
        for user in users:
            user.password = None
        return users, 200
    
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

@api.route('/<int:_id>')
class UserDetailResource(Resource):
    @api.marshal_with(user_serializer)
    def get(self, _id):
        user = User.get_by_id(_id)
        user.password = None
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
        hashed_password = generate_password_hash(data.get('password'))
        user.update(**data)
        user.password = hashed_password
        return user

    def delete(self, _id):
        user = User.get_by_id(_id)
        if not user:
            abort(404, 'User not found')
        user.delete()
        return {'message': 'User deleted'}, 200
