from flask import Blueprint, render_template, url_for, redirect, request, flash, g

from app.db import get_datab
from app.principal import user_logged
 
 
Blue1 = Blueprint("DBox", __name__, url_prefix="/DBox")


def Actualizar_CantidadProductos():
 
    db, cur = get_datab()

    cur.execute(
        "SELECT SUM(cantidad_productos) AS total_carrito FROM carrito "
        "WHERE comprado_por=%s",
        (g.user_logged['id'],)
    )

    Total_productos = cur.fetchone()

    if Total_productos['total_carrito']!= None:

        cur.execute(
            "UPDATE usuarios SET productos_carrito=%s WHERE id=%s",
            (Total_productos['total_carrito'],g.user_logged['id'])
        )

    else:

        cur.execute(
            "UPDATE usuarios SET productos_carrito=%s WHERE id=%s",
            (0,g.user_logged['id'])
        )

    db.commit()


def MisProductos():
    Acumulado = 0
    CantidadProductos = 0
    db, cur = get_datab()

    cur.execute(
        "SELECT carrito.id,id_producto,producto_imagen,nombre_producto,precio_producto,cantidad,cantidad_productos from carrito"
        " INNER JOIN productos ON carrito.id_producto=productos.id"
        " where comprado_por=%s",
        (g.user_logged["id"],),
    )

    productosCarrito = cur.fetchall()

    for producto in productosCarrito:
        CantidadProductos += producto.get("cantidad_productos")

        Acumulado += producto.get("precio_producto") * producto.get(
            "cantidad_productos"
        )

    return productosCarrito, Acumulado, CantidadProductos


def MisDatos():
    db, cur = get_datab()

    cur.execute(
        "SELECT * FROM transaccion WHERE transaccion_hecha_por=%s",
        (g.user_logged["id"],),
    )

    Data = cur.fetchone()

    return Data


@Blue1.route("/", methods=["GET", "POST"])
@user_logged
def main():
    

    return render_template("main/indexmain.html")


@Blue1.route("/Buscar", methods=["GET", "POST"])
@user_logged
def buscar(): 
    Diccionario = {}
    if request.method == "POST":
        Producto = request.form["buscador"]

        if Producto == "" or Producto == " ":
            Diccionario = []
        else:
            ProductoFinal = "%" + Producto + "%"
            db, cur = get_datab()

            cur.execute(
                "SELECT id,imgNombre,producto,precio,cantidad FROM productos "
                "WHERE producto LIKE %s",
                (ProductoFinal,),
            )

            Diccionario = cur.fetchall()

    return render_template("main/buscador.html", Diccionario=Diccionario)


@Blue1.route("/Buscar/<int:id>", methods=["GET", "POST"])
@user_logged
def buscar_id(id):
    db, cur = get_datab()

    cur.execute("SELECT * FROM productos WHERE id=%s", (id,))

    productos = cur.fetchone()


    return render_template("main/producto.html", productos=productos)


@Blue1.route("/Comprar/<int:id>", methods=["GET", "POST"])
@user_logged
def Compra(id):
    pass


@Blue1.route("/AgregarCarrito/<int:id>", methods=["GET", "POST"])
@user_logged
def AgregarCarrito(id):
    CantidadSelecta = int(request.form.get("selected"))

    db, cur = get_datab()

    cur.execute("SELECT * FROM productos WHERE id=%s", (id,))

    producto = cur.fetchone()

    cur.execute(
        "SELECT id,SUM(cantidad_productos) AS cantidad_producto FROM carrito WHERE id_producto=%s and comprado_por=%s",
        (id, g.user_logged["id"]),
    )

    CantidadProducto = cur.fetchone() 

    if CantidadProducto['cantidad_producto'] is None:

        cur.execute(
            "INSERT INTO carrito(id_producto,nombre_producto,precio_producto,producto_imagen,cantidad_productos,comprado_por)"
            " VALUES(%s,%s,%s,%s,%s,%s)",
            (
                id,
                producto["producto"],
                producto["precio"],
                producto["imgNombre"],
                CantidadSelecta,
                g.user_logged["id"],
            ),
        )

        db.commit()
        Actualizar_CantidadProductos()
        flash("Añadido al carrito.".format(CantidadSelecta))

    elif CantidadProducto is not None:

        if (CantidadProducto['cantidad_producto']+CantidadSelecta)>producto['cantidad']:

            flash("Excediste el limite de productos",category='error')

        else:
            cur.execute(
                "UPDATE carrito SET cantidad_productos=%s "
                "WHERE id_producto=%s and comprado_por=%s",
                (int(CantidadProducto['cantidad_producto'])+CantidadSelecta,id,g.user_logged['id'])
            )

            db.commit()
            Actualizar_CantidadProductos()
            flash("Añadido al carrito {} productos.".format(CantidadSelecta)) 

    return redirect(url_for("DBox.buscar_id", id=id))


@Blue1.route("/carrito", methods=["GET", "POST"])
@user_logged
def carrito():
    
    ProductosDB, AcumuladoPrecio, TotalProductos = MisProductos()

    return render_template(
        "main/carrito.html",
        productosCarrito=ProductosDB,
        Acumulado=AcumuladoPrecio,
        CantidadProductos=TotalProductos
    )


@Blue1.route("/ActualizarCarro/", methods=["GET", "POST"])
@user_logged
def Actualizar():
    db, cur = get_datab()

    ListaCantidadProducto = (request.form.get("lista")).split(",")
    ListaCarritoId = (request.form.get("lista_producto")).split(",")
    i = 0

    for productoId in ListaCarritoId:
        cur.execute(
            "UPDATE carrito SET cantidad_productos=%s "
            "WHERE id=%s and comprado_por=%s",
            (int(ListaCantidadProducto[i]), int(productoId), g.user_logged["id"]),
        )

        i += 1

        db.commit()
        Actualizar_CantidadProductos()

    return redirect(url_for("DBox.carrito"))


@Blue1.route("/EliminarProducto/<int:id>", methods=["GET", "POST"])
@user_logged
def EliminarCarrito(id):
    db, cur = get_datab()

    cur.execute(
        "DELETE FROM carrito WHERE id=%s AND comprado_por=%s", (id, g.user_logged["id"])
    )

    db.commit()
    Actualizar_CantidadProductos()
    
    return redirect(url_for("DBox.carrito"))


@Blue1.route("/ProcesarPago", methods=["GET", "POST"])
def Pago():
    ProductosDB, AcumuladoPrecio, TotalProductos = MisProductos()

    if ProductosDB == []:
        return redirect(url_for("DBox.main"))

    if request.method == "POST":
        db, cur = get_datab()

        Email = request.form["email-datos"]
        NumeroTarjeta = request.form["tarjeta-datos"]
        Caducidad = request.form["caducidad-datos"]
        Reverso = request.form["reverso-datos"]
        UsuarioTarjeta = request.form["usuario-datos"]
        Check = True if request.form.get("checked") == "on" else False

        cur.execute(
            "SELECT id FROM transaccion where transaccion_hecha_por=%s",
            (g.user_logged["id"],),
        )

        result = cur.fetchone()

        if Check:
            if result is None:
                cur.execute(
                    "INSERT INTO transaccion(email_transaccion,numero_tarjeta,fecha_vencimiento,numero_reverso,usuario_tarjeta,cheack,transaccion_hecha_por) "
                    "VALUES(%s,%s,%s,%s,%s,%s,%s)",
                    (
                        Email,
                        NumeroTarjeta,
                        Caducidad,
                        Reverso,
                        UsuarioTarjeta,
                        Check,
                        g.user_logged["id"],
                    ),
                )

                db.commit()

        else:
            if result is not None:
                cur.execute(
                    "DELETE FROM transaccion WHERE transaccion_hecha_por=%s",
                    (g.user_logged["id"],),
                )

                db.commit()

        for producto in ProductosDB:
            cur.execute(
                "INSERT INTO compras (id_producto,nombre_producto,precio_producto,cantidad_producto,producto_comprado_por) "
                "VALUES(%s,%s,%s,%s,%s)",
                (
                    producto["id_producto"],
                    producto["nombre_producto"],
                    producto["precio_producto"],
                    producto["cantidad_productos"],
                    g.user_logged["id"],
                ),
            )

            db.commit()

            cur.execute(
                "DELETE FROM carrito WHERE id_producto=%s and comprado_por=%s",
                (producto["id_producto"], g.user_logged["id"]),
            )

            db.commit()

        return redirect(url_for("DBox.main"))

    return render_template(
        "main/Pago.html",
        productosCarrito=ProductosDB,
        Acumulado=AcumuladoPrecio,
        CantidadProductos=TotalProductos,
        Data=MisDatos(),
    )
