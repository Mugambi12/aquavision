# api.py

from flask import request, abort, jsonify
from flask_restx import Namespace, Resource, fields, marshal
from werkzeug.exceptions import BadRequest, InternalServerError
from ..models.settings import Settings
from ..schemas.settings_serializer import settings_serializer

api = Namespace('settings', description='Settings related operations')

@api.route('/get-settings')
class GetSettingsResource(Resource):
    @api.marshal_with(settings_serializer)
    def get(self):
        try:
            settings = Settings.get_all()
            if not settings:
                abort(404, "No settings found")

            last_setting = settings[-1]
            return last_setting, 200

        except Exception as e:
            api.logger.error(f"Error retrieving settings: {str(e)}")
            raise InternalServerError("An error occurred while retrieving the settings")

@api.route('/update-settings')
class UpdateSettingsResource(Resource):
    @api.expect(settings_serializer, validate=True)
    @api.marshal_with(settings_serializer)
    def post(self):
        try:
            data = request.get_json()
            if not data:
                raise BadRequest("Invalid or missing JSON payload")

            # Remove fields _id, created_at, updated_at, deleted_at if they exist
            fields_to_remove = ['_id', 'created_at', 'updated_at', 'deleted_at']
            for field in fields_to_remove:
                data.pop(field, None)

            new_settings = Settings(**data)
            new_settings.save()
            return jsonify({'message': 'Settings created successfully'}), 201

        except BadRequest as e:
            api.logger.error(f"Bad request: {str(e)}")
            raise e

        except Exception as e:
            api.logger.error(f"Error updating settings: {str(e)}")
            raise InternalServerError("An error occurred while updating the settings")
