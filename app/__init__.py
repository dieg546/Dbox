from flask import Flask,redirect,url_for
import os

def create_app():
 
    app=Flask(__name__)
 
    app.config.from_mapping(

        SECRET_KEY=os.getenv('SECRET_KEY'),
        DATABASE_HOST=os.getenv('FLASK_DATABASE_HOST'),
        DATABASE_USER=os.getenv('FLASK_DATABASE_USER'),
        DATABASE_PASSWORD=os.getenv('FLASK_DATABASE_PASSWORD'), 
        DATABASE=os.getenv('FLASK_DATABASE')
    )

    from . import db
    db.init_app(app) 

    from . import principal, DBox, Admin
    app.register_blueprint(principal.Blue0)
    app.register_blueprint(DBox.Blue1)
    app.register_blueprint(Admin.BlueAdmin)
 
    @app.route('/')
    def inicio():
        return redirect(url_for('InicioDBox.principal'))

    return app