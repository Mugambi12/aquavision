from ..extensions.database import db
from .base import BaseMixin

"""
class Expense(db.Model, BaseMixin):
    __tablename__ = 'expense'

    type = str, nullable=False
    vendor = str, nullable=False
    amount = float, nullable=False
    description = str, nullable=True
    status = str, nullable=False
    payment_method = str, nullable=False
    payment_status = str, nullable=False
    transaction_id = str, nullable=True
"""

class Expense(db.Model, BaseMixin):
    __tablename__ = 'expense'

    type = db.Column(db.String, nullable=False)
    vendor = db.Column(db.String, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String, nullable=True)
    status = db.Column(db.String, nullable=False)
    payment_method = db.Column(db.String, nullable=False)
    payment_status = db.Column(db.String, nullable=False)
    transaction_id = db.Column(db.String, nullable=True)