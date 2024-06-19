# app/config.py

from datetime import timedelta
from decouple import config
import os

BASE_DIR = os.path.dirname(os.path.realpath(__file__))

class Config:
    SECRET_KEY = config('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CSRF_SESSION_KEY = config('CSRF_SESSION_KEY')
    PORT = config('PORT', default=5000, cast=int)
    HOST = config('HOST', default='localhost')

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, 'dev.sqlite3')
    SQLALCHEMY_ECHO = True
    SESSION_COOKIE_SECURE = False
    PERMANENT_SESSION_LIFETIME = timedelta(hours=1.5)

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = config('SQLALCHEMY_DATABASE_URI')
    DEBUG = False
    SQLALCHEMY_ECHO = config('SQLALCHEMY_ECHO', cast=bool)
    SESSION_COOKIE_SECURE = config('SESSION_COOKIE_SECURE', cast=bool)
    PERMANENT_SESSION_LIFETIME = timedelta(hours=1.5)

class TestConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, 'test.sqlite3')
    SQLALCHEMY_ECHO = False
    SESSION_COOKIE_SECURE = False
    PERMANENT_SESSION_LIFETIME = timedelta(hours=1.5)

class MailConfig:
    MAIL_SERVER = config('MAIL_SERVER', default='smtp.gmail.com')
    MAIL_PORT = config('MAIL_PORT', default=465, cast=int)
    MAIL_USERNAME = config('MAIL_USERNAME')
    MAIL_PASSWORD = config('MAIL_PASSWORD')
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
