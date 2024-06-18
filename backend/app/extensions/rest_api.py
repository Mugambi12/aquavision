from flask_restx import Api

api = Api(
    doc='/docs',
    title='Aqua Vision API',
    version='2.0',
    description='API Documentation for Aqua Vision, providing endpoints for login, users, sticky notes, invoices, payments, expenses, chats, and settings operations.',
    base_url='/'
)