from flask import Flask, request, jsonify
from flask_restx import Api, Resource, fields
from config import DevelopmentConfig
from modals import User, Post


app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
api = Api(app, doc='/api/docs', version='1.0', title='Aqua Vision API', description='Aqua Vision API',)


@api.route('/predict')
class Predict(Resource):
    def post(self):
        return jsonify({"message": "Hello, World!"})


if __name__ == '__main__':
    app.run(debug=True)
