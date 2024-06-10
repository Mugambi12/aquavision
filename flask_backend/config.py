from decouple import config
import os

BASE_DIR = os.path.dirname(os.path.realpath(__file__))

class Config:
    SECRET_KEY = config('SECRET_KEY')
    SQLACHEMY_TRACK_MODIFICATIONS = config('SQLACHEMY_TRACK_MODIFICATIONS', cast=bool)

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'developer.db')
    SQLALCHEMY_ECHO = True

class ProductionConfig(Config):
    pass

class StagingConfig(Config):
    pass

class TestingConfig(Config):
    pass
