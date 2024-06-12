from decouple import config
import os
from .default import Config

BASE_DIR = os.path.dirname(os.path.realpath(__file__))
class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, 'db.sqlite3')
    SQLALCHEMY_ECHO = True
    DEBUG = True