from flask import(
    Blueprint, redirect, render_template, session, url_for, g, flash, request
)

import os
from werkzeug.utils import secure_filename
from app.db import get_datab
from app.principal import user_logged, admin_logged 
 
BlueAdmin = Blueprint('Admin',__name__,url_prefix='/DBox/Administration')

def ActualizarImagen(imagen):

    CarpetaBase = os.path.dirname(__file__)
    Archivo = secure_filename(imagen.filename)  
    # print('HEEEEEEY: ',Archivo) 
    Subir = os.path.join(CarpetaBase,'static/imagenes/imagenesProductos',Archivo)
    imagen.save(Subir)
    
    return Archivo.replace('.jpg','')

@BlueAdmin.route('/AgregarProducto',methods=['GET','POST'])
@user_logged
@admin_logged
def Agregar():
     
    if request.method =='POST': 

        db , cur =get_datab()

        NombreProducto = request.form["NombreProducto"]
        PrecioProducto = request.form['PrecioProducto']
        CantidadProducto = request.form['CantidadProducto']
        ImagenNombre = request.files['archivo']
 
        cur.execute(
            "INSERT INTO productos(producto,precio,cantidad,imgNombre) "
            "VALUES(%s,%s,%s,%s)",
            (NombreProducto,PrecioProducto,CantidadProducto,ActualizarImagen(ImagenNombre))
        )

        db.commit()

        
    return render_template('/Administration/AgregarProducto.html')

@BlueAdmin.route('/VisualizarProductos/',methods=['GET','POST'])
@user_logged
@admin_logged
def Visualizar_productos():

    ProductosAdmin=[]

    if request.method=='POST':

        db, cur= get_datab()

        Buscar = request.form['buscador']

        BuscadorFinal = "%" + Buscar + "%"

        cur.execute(
            "SELECT imgNombre,producto,precio,cantidad,id FROM productos WHERE producto LIKE %s",
            (BuscadorFinal,)
        )
  
        ProductosAdmin=cur.fetchall()

     

    return render_template('/Administration/ProductosAdmin.html',ProductosAdmin=ProductosAdmin)

    

@BlueAdmin.route('/ModificarProducto/<int:id>',methods=['GET','POST'])
@user_logged
@admin_logged
def ModificarProducto(id):

    db , cur = get_datab()

    cur.execute(
        "SELECT imgNombre,producto,precio,cantidad,id FROM productos "
        "WHERE id = %s",
        (id,)
    )

    ProductoElegido=cur.fetchone() 

    if request.method=='POST':

        NombreModificado = request.form['NombreModificado']
        PrecioModificado = request.form['PrecioModificado']
        CantidadModificada = request.form['CantidadModificado']
        ImagenModificada = request.files['ImagenModificada']

        cur.execute(
            "UPDATE productos SET producto=%s,precio=%s,cantidad=%s,imgNombre=%s "
            "WHERE id=%s",
            (NombreModificado,PrecioModificado,CantidadModificada,ActualizarImagen(ImagenModificada),id)
        )

        db.commit()

        return redirect(url_for('DBox.main')) 
 

    return render_template('Administration/ModificarProducto.html',ProductoElegido=ProductoElegido)
