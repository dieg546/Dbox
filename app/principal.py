from flask import(
    Blueprint, render_template, url_for, redirect, request, flash, session,g
)

from werkzeug.security import check_password_hash, generate_password_hash

from app.db import get_datab

import functools 
 
Blue0 = Blueprint('InicioDBox', __name__, url_prefix='/InicioDB')
 

@Blue0.route('/', methods=['GET', 'POST'])
def principal():
 
    if g.user_logged is not None: 
        return redirect(url_for('DBox.main'))

    return render_template('/InicioUsuario/principal.html') 


@Blue0.route('/register', methods=['GET', 'POST'])
def register():

    if g.user_logged is not None:
        return redirect(url_for('DBox.main'))

    if request.method == 'POST':
 
        Nombre = request.form['nombre']
        Apellido = request.form['apellido']
        Ubicacion = request.form['ubicacion']
        user = request.form['user']
        password = request.form['password']
        db, cur = get_datab()

        error = None

        cur.execute(
            'SELECT id FROM usuarios WHERE user = %s',
            (user,)
        )

        if not Nombre:
            error='Falto escribir tu Nombre.'
        if not Apellido:
            error='Falto escribir tu Apellido.'
        if not Ubicacion:
            error='Falto escribir tu Ubicación.'
        if not user:
            error = 'Escribe un nombre de Usuario.'
        if not password:
            error = 'Escribe una Contraseña.'
        elif cur.fetchone() is not None:
            error = 'El usuario {} ya se encuentra registrado'.format(user)

        if error is None:

            cur.execute(
                'INSERT INTO usuarios (nombre,apellido,ubicacion,user,password) values(%s,%s,%s,%s,%s)',
                (Nombre,Apellido,Ubicacion,user, generate_password_hash(password))
            )

            db.commit()

            return redirect(url_for('InicioDBox.login'))

        flash(error)

    return render_template('/InicioUsuario/register.html')


@Blue0.route('/login', methods=['GET', 'POST'])
def login():

    if g.user_logged is not None:
        return redirect(url_for('DBox.main'))

    if request.method == 'POST':

        user = request.form['user']
        password = request.form['password']
        error = None

        db, cur = get_datab()

        cur.execute(
            'SELECT * FROM usuarios WHERE user=%s',
            (user,)
        )

        user_session=cur.fetchone()

        if user_session is None:
            error='Usuario o contraseña invalido'
        elif check_password_hash(user_session['password'],password)==False:
            error='Usuario o contraseña invalido'
        
        if error is None:

            session.clear()
            session['user_id'] = user_session['id']
            
            return redirect(url_for('DBox.main'))
            

        flash(error)
        

    return render_template('/InicioUsuario/login.html')


@Blue0.route('/logout',methods=['GET','POST'])
def logout():
    
    session.clear()
    # print('POR AQUI' ,g.user_logged)
    g.user_logged=None
    return redirect(url_for('InicioDBox.principal'))


@Blue0.before_app_request
def exists_user():

    user = session.get('user_id')

    if user is None:

        g.user_logged=None

    if user is not None:

        db, cur= get_datab()

        cur.execute(
            'SELECT * FROM usuarios WHERE id=%s', 
            (user,)
        )

        g.user_logged=cur.fetchone()

def user_logged(view):
    @functools.wraps(view)
    def funcion_envuelta(**kwargs):

        if g.user_logged is None:
            return redirect(url_for('InicioDBox.login'))
        
        return view(**kwargs)
        
    return funcion_envuelta


def admin_logged(view):
    @functools.wraps(view)

    def funcion_envuelta_admin(**kwargs):

        if g.user_logged['id']!=1:

            return redirect(url_for('DBox.main'))

        return view(**kwargs)

    return funcion_envuelta_admin
