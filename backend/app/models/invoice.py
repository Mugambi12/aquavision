from ..extensions.database import db
from .base import BaseMixin

"""
class Invoice(db.Model, BaseMixin):
    __tablename__ = 'invoice_entries'

    user_id = int, nullable=False
    house_section = str, nullable=False
    house_number = str, nullable=False
    previous_reading = float, nullable=False
    current_reading = float, nullable=False
    consumption = float, nullable=False
    unit_price = float, nullable=False
    service_fee = float, nullable=False
    total_amount = float, nullable=False
    payment_status = str, nullable=False
"""

class Invoice(db.Model, BaseMixin):
    __tablename__ = 'invoice_entries'

    user_id = db.Column(db.Integer, nullable=False)
    house_section = db.Column(db.String, nullable=True)
    house_number = db.Column(db.String, nullable=True)
    previous_reading = db.Column(db.Float, nullable=False)
    current_reading = db.Column(db.Float, nullable=False)
    consumption = db.Column(db.Float, nullable=False)
    unit_price = db.Column(db.Float, nullable=False)
    service_fee = db.Column(db.Float, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    payment_status = db.Column(db.String, nullable=False)

    # Help me with a method to get the latest invoice for a user by user_id
    @classmethod
    def get_latest_invoice(cls, user_id):
        return cls.query.filter_by(user_id=user_id).order_by(cls.created_at.desc()).first()
    
    @classmethod
    def get_unpaid_invoices(cls):
        return cls.query.filter_by(payment_status='unpaid').all()