# File: run.py

# Run in development mode using flask server
from core import create_app, db

app = create_app()

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(port=app.config['PORT'], host=app.config['HOST'])

#from core import create_app, db
#from waitress import serve
#
#app = create_app()
#
#with app.app_context():
#    db.create_all()
#
#if __name__ == '__main__':
#    serve(app, port=app.config['PORT'], host=app.config['HOST'])
