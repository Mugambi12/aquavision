# main
from flask import Flask
from flask_restx import Resource

from .config.development import DevelopmentConfig
from .extensions.database import db
from .extensions.rest_api import api
from .extensions.migrate import migrate
from .extensions.cors_extension import cors

from .resources.login_api import api as login_api
from .resources.user_api import api as user_api
from .resources.sticky_note_api import api as sticky_note_api
from .resources.invoice_api import api as invoice_api
from .resources.revenue_api import api as payment_api
from .resources.expense_api import api as expense_api
from .resources.chats_api import api as chats_api
from .resources.settings_api import api as settings_api

from .utils.shell_context import make_shell_context

def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    db.init_app(app)
    api.init_app(app)
    cors.init_app(app)
    migrate.init_app(app, db)
    
    api.add_namespace(login_api, path='/auth')
    api.add_namespace(user_api, path='/users')
    api.add_namespace(sticky_note_api, path='/sticky_notes')
    api.add_namespace(invoice_api, path='/invoices')
    api.add_namespace(payment_api, path='/payments')
    api.add_namespace(expense_api, path='/expenses')
    api.add_namespace(chats_api, path='/chats')
    api.add_namespace(settings_api, path='/settings')

    @api.route('/hello')
    class HelloAPI(Resource):
        def get(self):
            return {'hello': 'Welcome to aqua vision api'}

    app.shell_context_processor(make_shell_context)

    with app.app_context():
        db.create_all()

    return app
