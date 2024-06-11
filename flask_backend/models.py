from flask_backend.extensions import db

class BaseMixin:
    id = db.Column(db.Integer, primary_key=True)
    deleted = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        #self.deleted = True
        db.session.delete(self)
        db.session.commit()

    def update(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
        db.session.commit()

class User(db.Model, BaseMixin):
    __tablename__ = 'users'

    mobile_number = db.Column(db.String(20), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(120))
    house_section = db.Column(db.String(50))
    house_number = db.Column(db.String(20))
    profile_image = db.Column(db.String(255))
    is_active = db.Column(db.Boolean, default=True)
    is_admin = db.Column(db.Boolean, default=False)
    balance = db.Column(db.Float, default=0)
    last_login = db.Column(db.DateTime)
    last_logout = db.Column(db.DateTime)
