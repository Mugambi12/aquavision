from ..extensions.database import db
from ..models.users import User
from ..models.invoice import Invoice
from ..models.payment import Payment
from ..models.expense import Expense
from ..models.chats import Chat
from ..models.settings import Settings

def make_shell_context():
    return {
        'db': db,
        'User': User,
        'Invoice': Invoice,
        'Payment': Payment,
        'Expense': Expense,
        'Chats': Chat,
        'Settings': Settings
    }
