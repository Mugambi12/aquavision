from ..extensions.database import db
from .base import BaseMixin

"""
class ResetToken(db.Model, BaseMixin):
    __tablename__ = 'reset_tokens'
    
    user_id = str, nullable=False
    token = str, nullable=False
    expiry = datetime, nullable=False
"""

class ResetToken(db.Model, BaseMixin):
    __tablename__ = 'reset_tokens'

    user_id = db.Column(db.String, nullable=False)
    token = db.Column(db.String, nullable=False)
    expiry = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp() + db.func.interval(30, 'minutes'))