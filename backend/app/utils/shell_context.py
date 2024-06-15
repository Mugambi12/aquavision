from ..extensions.database import db
from ..models.users import User
from ..models.invoice import Invoice
from ..models.revenue import Revenue
from ..models.expense import Expense
from ..models.chats import Chat
from ..models.settings import Settings

def make_shell_context():
    return {
        'db': db,
        'User': User,
        'Invoice': Invoice,
        'Revenue': Revenue,
        'Expense': Expense,
        'Chats': Chat,
        'Settings': Settings
    }
