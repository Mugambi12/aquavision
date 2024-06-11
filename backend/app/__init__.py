#from flask import Flask
#from flask_mongoengine import MongoEngine
#from flask_restx import Api
#from app.config.default import Config
#
#db = MongoEngine()
#
#def create_app(config_class=Config):
#    app = Flask(__name__)
#    app.config.from_object(config_class)
#    db.init_app(app)
#
#    from app.resources.user import user_ns
#    api = Api(app)
#    api.add_namespace(user_ns)
#
#    return app
