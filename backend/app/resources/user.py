# resources/user.py
from flask_restx import Namespace, Resource
from ..models.users import User
from ..schemas.users_serializer import user_serializer

api = Namespace('users', description='User related operations')

@api.route('/')
class UserResource(Resource):
    @api.marshal_with(user_serializer)
    def get(self):
        return User.get_all()

    def post(self):
        pass

@api.route('/<int:id>')
class UserDetailResource(Resource):
    @api.marshal_with(user_serializer)
    def get(self, id):
        return User.get_by_id(id)

    def put(self, id):
        pass

    def delete(self, id):
        pass
