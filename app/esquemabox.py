instruccions=[
    "SET FOREIGN_KEY_CHECKS=0;",
    "SET FOREiGN_KEY_CHECKS=1;",
    # "DROP TABLE compras;",
    # "DROP TABLE transaccion;",
    # "DROP TABLE productos;",
    # "DROP TABLE usuarios;",
 
    """
        CREATE TABLE IF NOT EXISTS usuarios(
            id INT PRIMARY KEY AUTO_INCREMENT, 
            nombre varchar(40) NOT NULL,
            apellido varchar(40) NOT NULL,
            ubicacion varchar(150) NOT NULL,
            user VARCHAR(70) UNIQUE NOT NULL,
            password VARCHAR(200) NOT NULL 
        );
 
    """,
    """

        CREATE TABLE IF NOT EXISTS productos(
        
            id INT PRIMARY KEY AUTO_INCREMENT,
            producto VARCHAR(200) NOT NULL,
            precio DECIMAL(6,2) NOT NULL, 
            cantidad INT NOT NULL,
            imgNombre varchar(200) NOT NULL

        );


    """,
    """
        CREATE TABLE IF NOT EXISTS carrito(
            
            id INT PRIMARY KEY AUTO_INCREMENT,
            id_producto INT NOT NULL,
            nombre_producto varchar(200),
            precio_producto FLOAT NOT NULL,
            producto_imagen varchar(200),
            cantidad_productos INT NOT NULL,
            comprado_por INT NOT NULL,
            FOREIGN KEY (id_producto) REFERENCES productos(id),
            FOREIGN KEY (comprado_por) REFERENCES usuarios(id)

        );

    """,

    """

        CREATE TABLE IF NOT EXISTS transaccion(
        
            id INT PRIMARY KEY AUTO_INCREMENT,
            email_transaccion VARCHAR(50),
            numero_tarjeta VARCHAR(25),
            fecha_vencimiento VARCHAR(7),
            numero_reverso INT NOT NULL,
            usuario_tarjeta varchar(50),
            cheack BOOLEAN NOT NULL,
            transaccion_hecha_por INT NOT NULL,
            FOREIGN KEY (transaccion_hecha_por) REFERENCES usuarios(id)

        );


    """,

    """

        CREATE TABLE IF NOT EXISTS compras(
        
            id INT PRIMARY KEY AUTO_INCREMENT,
            id_producto INT NOT NULL,
            nombre_producto varchar(200) NOT NULL,
            precio_producto FLOAT NOT NULL,
            cantidad_producto INT NOT NULL,
            producto_comprado_por INT NOT NULL,
            FOREIGN KEY (id_producto) REFERENCES productos(id),
            FOREIGN KEY (producto_comprado_por) REFERENCES usuarios(id)

        );

    """
]