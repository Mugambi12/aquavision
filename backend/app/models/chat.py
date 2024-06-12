from ..extensions.database import db
from .base import BaseMixin

"""
class Chat(db.Model, BaseMixin):
    __tablename__ = 'chats'

    type = str, nullable=False
    participants = list, nullable=False
    messages = list, nullable=False
"""

class Chat(db.Model, BaseMixin):
    __tablename__ = 'chats'

    type = db.Column(db.String, nullable=False)
    participants = db.Column(db.JSON, nullable=False)
    messages = db.Column(db.JSON, nullable=False)