# main
from flask import Flask
from flask_restx import Resource

from .config.development import DevelopmentConfig
from .extensions.database import db
from .extensions.api import api

from .models.users import User
from .models.settings import Settings

from .resources.user import api as user_api
from .resources.settings import api as settings_api

def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    db.init_app(app)
    api.init_app(app, doc='/doc', title='API', version='1.0', description='API Documentation')
    
    api.add_namespace(user_api, path='/users')
    api.add_namespace(settings_api, path='/settings')

    @api.route('/hello')
    class HelloWorld(Resource):
        def get(self):
            return {'hello': 'world'}

    @app.shell_context_processor
    def make_shell_context():
        return {
            'db': db,
            'User': User,
            'Settings': Settings
        }

    with app.app_context():
        db.create_all()

    return app
