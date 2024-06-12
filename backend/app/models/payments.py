from ..extensions.database import db
from .base import BaseMixin

"""
class Payments(db.Model, BaseMixin):
    __tablename__ = 'payments'

    user_id = int, nullable=False
    invoice_id = int, nullable=False
    payment_date = datetime, nullable=False
    amount = float, nullable=False
    payment_method = str, nullable=False
    payment_status = str, nullable=False
"""

class Payments(db.Model, BaseMixin):
    __tablename__ = 'payments'

    user_id = db.Column(db.Integer, nullable=False)
    invoice_id = db.Column(db.Integer, nullable=False)
    payment_date = db.Column(db.DateTime, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    payment_method = db.Column(db.String, nullable=False)
    payment_status = db.Column(db.String, nullable=False)