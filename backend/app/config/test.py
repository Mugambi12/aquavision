from decouple import config
from .default import Config

class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///test.sqlite3"
    SQLALCHEMY_ECHO = False
    DEBUG = False
    PORT = 6500
    TESTING = True


    #FLASK_ENV = 'test'
    #FLASK_APP = 'run.py'
    #JWT_SECRET_KEY = config('JWT_SECRET_KEY')
    #JWT_BLACKLIST_ENABLED = config('JWT_BLACKLIST_ENABLED', cast=bool)
    #JWT_BLACKLIST_TOKEN_CHECKS = config('JWT_BLACKLIST_TOKEN_CHECKS')
    #JWT_ACCESS_TOKEN_EXPIRES = config('JWT_ACCESS_TOKEN_EXPIRES', cast=int)
    #JWT_REFRESH_TOKEN_EXPIRES = config('JWT_REFRESH_TOKEN_EXPIRES', cast=int)
    #JWT_TOKEN_LOCATION = config('JWT_TOKEN_LOCATION')
    #JWT_COOKIE_SECURE = config('JWT_COOKIE_SECURE', cast=bool)
    #JWT_COOKIE_CSRF_PROTECT = config('JWT_COOKIE_CSRF_PROTECT', cast=bool)
    #JWT_CSRF_CHECK_FORM = config('JWT_CSRF_CHECK_FORM', cast=bool)
    #JWT_CSRF_METHODS = config('JWT_CSRF_METHODS')
    #JWT_ACCESS_COOKIE_PATH = config('JWT_ACCESS_COOKIE_PATH')
    #JWT_REFRESH_COOKIE_PATH = config('JWT_REFRESH_COOKIE_PATH')
    #JWT_COOKIE_SAMESITE = config('JWT_COOKIE_SAMESITE')
    #JWT_COOKIE_DOMAIN = config('JWT_COOKIE_DOMAIN')
    #JWT_COOKIE_HTTPONLY = config('JWT_COOKIE_HTTPONLY', cast=bool)
    #JWT_COOKIE_NAME = config('JWT_COOKIE_NAME')
    #JWT_ACCESS_CSRF_HEADER_NAME = config('JWT_ACCESS_CSRF_HEADER_NAME')
    #JWT_REFRESH_CSRF_HEADER_NAME = config('JWT_REFRESH_CSRF_HEADER_NAME')
    #JWT_CSRF_HEADER_NAME = config('JWT_CSRF_HEADER_NAME')
    #JWT_CSRF_IN_COOKIES = config('JWT_CSRF_IN_COOKIES', cast=bool)
    #JWT_CSRF_METHODS = config('JWT_CSRF_METHODS')
    #JWT_CSRF_CHECK_FORM = config('JWT_CSRF_CHECK_FORM', cast=bool)
    #JWT_CSRF_ACCESS_FORM_FIELD_NAME = config('JWT_CSRF_ACCESS_FORM_FIELD_NAME')
    #JWT_CSRF_REFRESH_FORM_FIELD_NAME = config('JWT_CSRF_REFRESH_FORM_FIELD_NAME')
    #JWT_CSRF_HEADER_NAME = config('JWT_CSRF_HEADER_NAME')
    #JWT_CSRF_ACCESS_HEADER = config('JWT_CSRF_ACCESS_HEADER')
    #JWT_CSRF_REFRESH_HEADER = config('JWT_CSRF_REFRESH_HEADER')
    #JWT_CSRF_ACCESS_FORM_FIELD_NAME = config('JWT_CSRF_ACCESS_FORM_FIELD_NAME')
