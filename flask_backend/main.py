from flask import Flask
from flask_restx import Api
from flask_cors import CORS
from flask_backend.extensions import db, migrate, jwt
from models import *
from views.auth import auth_ns
from views.users import user_ns


def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)

    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    api = Api(app, doc='/docs', version='2.0', title='Aqua Vision API', description='Aqua Vision API',)

    api.add_namespace(auth_ns)
    api.add_namespace(user_ns)

    @app.shell_context_processor
    def make_shell_context():
        return {
            'db': db,
            'User': User
        }

    return app
