from flask import Flask
from flask_restx import Api, Resource
from app.config.development import DevelopmentConfig


app = Flask(__name__)

app.config.from_object(DevelopmentConfig)

api = Api(app, doc='/docs')


@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}
    

if __name__ == '__main__':
    app.run()