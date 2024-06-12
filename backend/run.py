# run.py
from app import create_app
## i want to set port from config file

app = create_app()

if __name__ == '__main__':
    app.run(port=app.config['PORT'], debug=app.config['DEBUG'])
