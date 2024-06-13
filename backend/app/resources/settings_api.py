from flask import request, abort, jsonify
from flask_restx import Namespace, Resource
from ..models.settings import Settings
from ..schemas.settings_serializer import settings_serializer

api = Namespace('settings', description='Settings related operations')

@api.route('/')
class SettingsResource(Resource):
    @api.marshal_with(settings_serializer)
    def get(self):
        settings = Settings.get_all()
        if not settings:
            abort(404, "No settings found")

        last_setting = settings[-1]

        return last_setting, 200

    @api.expect(settings_serializer)
    @api.marshal_with(settings_serializer)
    def post(self):
        data = request.get_json()

        # Remove fields _id, created_at, updated_at, deleted_at if they exist
        data.pop('_id', None)
        data.pop('created_at', None)
        data.pop('updated_at', None)
        data.pop('deleted_at', None)

        new_settings = Settings(**data)
        new_settings.save()
        return jsonify({'message': 'Settings created successfully'}), 201
    

#@api.route('/<int:_id>')
#class SettingsDetailResource(Resource):
#    @api.marshal_with(settings_serializer)
#    def get(self, _id):
#        settings = Settings.get_by_id(_id)
#        if not settings:
#            abort (404, 'Settings not found')
#        return settings
#
#    @api.expect(settings_serializer)
#    @api.marshal_with(settings_serializer)
#    def put(self, _id):
#        data = request.get_json()
#        settings = Settings.get_by_id(_id)
#        if not settings:
#            abort(404, 'Settings not found')
#        settings.update(**data)
#        return settings
#
#    def delete(self, _id):
#        settings = Settings.get_by_id(_id)
#        if not settings:
#            abort(404, 'Settings not found')
#        settings.delete()
#        return {'message': 'Settings deleted'}, 200