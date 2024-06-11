#from flask import request
#from flask_restx import Resource, Namespace, fields
#from werkzeug.security import generate_password_hash
#from app.models.user import User
#
#user_ns = Namespace('users', description='User Operations')
#
## Model for User Serializer
#user_model = user_ns.model(
#    'User', {
#        'id': fields.String,
#        'name': fields.String,
#        'username': fields.String,
#        'email': fields.String,
#        'password': fields.String,
#        'address': fields.String,
#        'contact_info': fields.String,
#        'role': fields.String,
#        'is_active': fields.Boolean,
#        'deleted': fields.Boolean,
#        'created_at': fields.DateTime,
#        'updated_at': fields.DateTime
#    }
#)
#
#@user_ns.route('/')
#class UserResource(Resource):
#
#    @user_ns.marshal_with(user_model)
#    def get(self):
#        """Get all users"""
#        users = User.objects(deleted=False)
#        for user in users:
#            user.password = '********'
#        return users, 200
#
#    @user_ns.expect(user_model)
#    @user_ns.marshal_with(user_model)
#    def post(self):
#        """Create a new user"""
#        data = request.get_json()
#        hashed_password = generate_password_hash(data['password'])
#        data['password'] = hashed_password
#        new_user = User(**data)
#        new_user.save()
#        return new_user, 201
#
#
#@user_ns.route('/<string:id>')
#class UserResourceById(Resource):
#
#    @user_ns.marshal_with(user_model)
#    def get(self, id):
#        """Get a user by id"""
#        user = User.objects.get_or_404(id=id, deleted=False)
#        user.password = '********'
#        return user, 200
#
#    @user_ns.expect(user_model)
#    @user_ns.marshal_with(user_model)
#    def put(self, id):
#        """Update a user by id"""
#        user_to_update = User.objects.get_or_404(id=id, deleted=False)
#        data = request.get_json()
#
#        if 'password' in data and data['password'] != '********':
#            hashed_password = generate_password_hash(data['password'])
#            data['password'] = hashed_password
#        else:
#            data.pop('password', None)
#
#        user_to_update.update(**data)
#        user_to_update.reload()
#
#        return user_to_update, 200
#
#    def delete(self, id):
#        """Delete a user by id"""
#        user_to_delete = User.objects.get_or_404(id=id, deleted=False)
#        user_to_delete.update(deleted=True)
#        return {'message': 'User deleted successfully'}, 200
