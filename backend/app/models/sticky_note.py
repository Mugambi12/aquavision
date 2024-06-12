from ..extensions.database import db
from .base import BaseMixin

"""
class StickyNote(db.Model, BaseMixin):
    __tablename__ = 'sticky_notes'

    user_id = str, nullable=False
    content = str, nullable=False
"""

class StickyNote(db.Model, BaseMixin):
    __tablename__ = 'sticky_notes'

    user_id = db.Column(db.String, nullable=False)
    content = db.Column(db.Text, nullable=False)