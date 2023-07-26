from flask import(
    Blueprint, redirect, render_template, session, url_for, g, flash, request
)

import os
from werkzeug.utils import secure_filename
from app.db import get_datab
from app.principal import user_logged, admin_logged
 
BlueAdmin = Blueprint('Admin',__name__,url_prefix='/DBox/Administration')

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
 
        CarpetaBase = os.path.dirname(__file__)
        Archivo = secure_filename(ImagenNombre.filename)  
        # print('HEEEEEEY: ',Archivo) 
        Subir = os.path.join(CarpetaBase,'static/imagenes/imagenesProductos',Archivo)
        ImagenNombre.save(Subir)

        cur.execute(
            "INSERT INTO productos(producto,precio,cantidad,imgNombre) "
            "VALUES(%s,%s,%s,%s)",
            (NombreProducto,PrecioProducto,CantidadProducto,Archivo.replace('.jpg',''))
        )

        db.commit()

        # print() 

        # print(NombreProducto)
        # print(PrecioProducto)     
        # print(CantidadProducto) 
        # print(ImagenNombre) 

        


    return render_template('/Administration/AgregarProducto.html')

@BlueAdmin.route('/VisualizarProductos/',methods=['GET','POST'])
@user_logged
@admin_logged
def Visualizar_productos():

    return render_template('/Administration/ProductosAdmin.html')

    pass