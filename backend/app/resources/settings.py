from flask import request, abort
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
    

@api.route('/<int:_id>')
class SettingsDetailResource(Resource):
    @api.marshal_with(settings_serializer)
    def get(self, _id):
        settings = Settings.get_by_id(_id)
        if not settings:
            abort (404, 'Settings not found')
        return settings

    @api.expect(settings_serializer)
    @api.marshal_with(settings_serializer)
    def put(self, _id):
        data = request.get_json()
        settings = Settings.get_by_id(_id)
        if not settings:
            abort(404, 'Settings not found')
        settings.update(**data)
        return settings

    def delete(self, _id):
        settings = Settings.get_by_id(_id)
        if not settings:
            abort(404, 'Settings not found')
        settings.delete()
        return {'message': 'Settings deleted'}, 200