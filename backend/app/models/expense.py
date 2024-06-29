from ..extensions.database import db
from .base import BaseMixin

"""
class Expense(db.Model, BaseMixin):
    __tablename__ = 'expense'

    user_id = int, nullable=False
    type = str, nullable=False
    date = date, nullable=False
    vendor = str, nullable=False
    amount = float, nullable=False
    description = str, nullable=True
    approval_status = str, nullable=False
    payment_method = str, nullable=False
    payment_status = str, nullable=False
    transaction_id = str, nullable=True
"""

class Expense(db.Model, BaseMixin):
    __tablename__ = 'expense'

    user_id = db.Column(db.Integer, nullable=False)
    type = db.Column(db.String, nullable=False)
    date = db.Column(db.Date, nullable=False)
    vendor = db.Column(db.String, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String, nullable=True)
    approval_status = db.Column(db.String, nullable=False)
    payment_method = db.Column(db.String, nullable=False)
    payment_status = db.Column(db.String, nullable=False)
    transaction_id = db.Column(db.String, nullable=True)