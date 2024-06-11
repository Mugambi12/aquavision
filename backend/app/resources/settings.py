from flask import request
from flask_restx import Namespace, Resource
from ..models.settings import Settings
from ..schemas.settings_serializer import settings_serializer

api = Namespace('settings', description='Settings related operations')

@api.route('/')
class SettingsResource(Resource):
    @api.marshal_with(settings_serializer)
    def get(self):
        return Settings.get_all()

    @api.expect(settings_serializer)
    @api.marshal_with(settings_serializer)
    def post(self):
        data = request.get_json()

        # Perform necessary validation here

        new_settings = Settings(**data)
        new_settings.save()
        return new_settings, 201
    
    
@api.route('/<int:id>')
class SettingsDetailResource(Resource):
    @api.marshal_with(settings_serializer)
    def get(self, id):
        settings = Settings.get_by_id(id)
        if not settings:
            return {'message': 'Settings not found'}, 404
        return settings

    @api.expect(settings_serializer)
    @api.marshal_with(settings_serializer)
    def put(self, id):
        data = request.get_json()
        settings = Settings.get_by_id(id)
        if not settings:
            return {'message': 'Settings not found'}, 404
        settings.update(**data)
        return settings

    def delete(self, id):
        settings = Settings.get_by_id(id)
        if not settings:
            return {'message': 'Settings not found'}, 404
        settings.delete()
        return {'message': 'Settings deleted'}, 200