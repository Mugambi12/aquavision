from ..extensions.database import db
from .base import BaseMixin

"""
class User(db.Model, BaseMixin):
    __tablename__ = 'users'
    
    username = str, unique, nullable=False
    email = str, unique, nullable=True
    phone_number = str, unique, nullable=False
    password = str, nullable=False
    house_section = str, nullable=False
    house_number = str, nullable=False
    profile_image = str, nullable=True
    is_active = bool, nullable=False
    is_admin = bool, nullable=False
    balance = float, nullable=False
    last_login = datetime, nullable=False
    last_logout = datetime, nullable=False
"""

class User(db.Model, BaseMixin):
    __tablename__ = 'users'

    email = db.Column(db.String, unique=True, nullable=True)
    phone_number = db.Column(db.String, unique=True, nullable=False)
    full_name = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    house_section = db.Column(db.String, nullable=False)
    house_number = db.Column(db.String, nullable=False)
    profile_image = db.Column(db.String, nullable=True)
    is_active = db.Column(db.Boolean, nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False)
    balance = db.Column(db.Float, nullable=False)
    last_login = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    last_logout = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())