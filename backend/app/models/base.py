from ..extensions.database import db

"""
class BaseMixin:
    __tablename__ = None

    id = int, primary_key
    created_at = datetime, nullable=False
    updated_at = datetime, nullable=False
    deleted_at = datetime, nullable=True

    def save(self):

    def delete(self):

    def update(self, **kwargs):

    @classmethod
    def get_all(cls):

    @classmethod
    def get_by_id(cls, id):

    @classmethod
    def get_by(cls, **kwargs):
"""

class BaseMixin:
    __tablename__ = None

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    deleted_at = db.Column(db.DateTime, nullable=True)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
        db.session.commit()

    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get(id)

    @classmethod
    def get_by(cls, **kwargs):
        return cls.query.filter_by(**kwargs).first()