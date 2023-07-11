import mysql.connector

from flask import g,current_app
import click

from flask.cli import with_appcontext



from .esquemabox import instruccions

def get_datab():

    if 'db' not in g:

        g.db = mysql.connector.connect(
            
            host=current_app.config['DATABASE_HOST'],  
            user=current_app.config['DATABASE_USER'],
            password=current_app.config['DATABASE_PASSWORD'],
            database=current_app.config['DATABASE']

        )
        g.cur = g.db.cursor(dictionary=True,buffered=True)
    
    return g.db, g.cur


def close_db(e=None):

    db = g.pop('db',None)

    if db is not None:
        db.close()


def init_data():

    db, c = get_datab()

    for i in instruccions:
        c.execute(i)
    
    db.commit()


@click.command('init-dbox')
@with_appcontext
def init_command():
    init_data()
    click.echo('Database connected.')

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_command) 