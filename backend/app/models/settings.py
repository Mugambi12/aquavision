from ..extensions.database import db
from .base import BaseMixin

"""
class Settings(db.Model, BaseMixin):
    __tablename__ = 'settings'

    company_logo = str, nullable=True
    company_name = str, nullable=False
    company_address = str, nullable=False
    company_email = str, nullable=False
    contact_number = str, nullable=False
    company_website_url = str, nullable=False
    company_description = str, nullable=False
    services = dict, nullable=False
    payments = list, nullable=False
    mailConfig = dict, nullable=False
    socialAccounts = dict, nullable=False
"""

class Settings(db.Model, BaseMixin):
    __tablename__ = 'settings'
    
    company_logo = db.Column(db.String, nullable=True)
    company_name = db.Column(db.String, nullable=False)
    company_address = db.Column(db.String, nullable=False)
    company_email = db.Column(db.String, nullable=False)
    contact_number = db.Column(db.String, nullable=False)
    company_website_url = db.Column(db.String, nullable=False)
    company_description = db.Column(db.String, nullable=False)
    services = db.Column(db.JSON, nullable=False)
    payments = db.Column(db.JSON, nullable=False)
    mailConfig = db.Column(db.JSON, nullable=False)
    socialAccounts = db.Column(db.JSON, nullable=False)