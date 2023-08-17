// alert('Hola, this is a task :3')

// ------------------------------------Nombre de imagen -------------------------------

var Imagen = document.getElementById('archivo')

function ImagenValida() {

    var ImagenDiv = document.getElementById('textoImagen')

    if (ImagenDiv.innerHTML == '') return false
    else return true

}

Imagen.addEventListener('change', function (event) {
    
    document.getElementById("textoImagen").innerHTML=event.target.files[0].name
    document.getElementById('Contenedor-ImagenPre').style.display = 'block'
    document.getElementById('Contenedor-AgregarProductoId').style.height = '790px'

    var imagenPre = document.getElementById('ImagenPre')

    var ImagenUrl = new FileReader();

    ImagenUrl.onload = function (e) {

        imagenPre.src = e.target.result;

    }
    ImagenUrl.readAsDataURL(event.target.files[0])

    
})

var NombreProducto = document.getElementById('NombreProducto-AgregarProducto')

function NombreValido() {

    if (NombreProducto.value.length >= 5) {

        NombreProducto.style.borderColor = '#ccc'
        document.getElementById('NombreNoValido-AgregarProducto').innerHTML = ''
        return true

    } else {

        NombreProducto.style.borderColor = 'red'
        document.getElementById('NombreNoValido-AgregarProducto').innerHTML = 'Nombre no permitido'
        document.getElementById('NombreNoValido-AgregarProducto').style.color = 'red'
        return false
    }

}

NombreProducto.addEventListener('focus', function (event) {

    NombreProducto.style.borderColor = '#007bff'

})

NombreProducto.addEventListener('focusout', NombreValido)


var PrecioProductoAdmin = document.getElementById('InputPrecio-AgregarProducto')

function PrecioAdmin() {

    // console.log(parseInt(PrecioProductoAdmin.value))

    if (PrecioProductoAdmin.value == '') {

        //console.log('Nope')
        PrecioProductoAdmin.style.borderColor = 'red'
        document.getElementById('PrecioNoValido-AgregarProducto').innerHTML = 'Precio no valido'
        document.getElementById('PrecioNoValido-AgregarProducto').style.color = 'red'
        return false

    } else {

        if (parseInt(PrecioProductoAdmin.value) > 0) {

            //console.log('Valido ', PrecioProductoAdmin.value)
            PrecioProductoAdmin.style.borderColor = '#ccc'
            document.getElementById('PrecioNoValido-AgregarProducto').innerHTML = ''
            PrecioProductoAdmin.value = parseInt(PrecioProductoAdmin.value)
            return true

        } else {

            PrecioProductoAdmin.style.borderColor = 'red'
            document.getElementById('PrecioNoValido-AgregarProducto').innerHTML = 'Precio no valido'
            document.getElementById('PrecioNoValido-AgregarProducto').style.color = 'red'
            return false

        }

    }

    // PrecioProductoAdmin.value=parseInt(PrecioProductoAdmin.value)

}

PrecioProductoAdmin.addEventListener('focus', function (event) {

    PrecioProductoAdmin.style.borderColor = '#007bff'

})

// PrecioProductoAdmin.addEventListener('keypress',PrecioValidAdmin)

PrecioProductoAdmin.addEventListener('focusout', PrecioAdmin)

var Cantidad = document.getElementById('InputCantidad-AgregarProducto')

function CantidadValida() {

    if (Cantidad.value == '00' || Cantidad.value == '0' || Cantidad.value == '') {

        Cantidad.style.borderColor = 'red'
        document.getElementById('CantidadNoValida-AgregarProducto').innerHTML = 'Cantidad no permitida'
        document.getElementById('CantidadNoValida-AgregarProducto').style.color = 'red'
        return false
    } else {

        Cantidad.style.borderColor = '#ccc'
        document.getElementById('CantidadNoValida-AgregarProducto').innerHTML = ''
        Cantidad.value = parseInt(Cantidad.value)
        return true
    }


}

Cantidad.addEventListener('focus', function (event) {

    Cantidad.style.borderColor = '#007bff'

})

Cantidad.addEventListener('focusout', CantidadValida)

var BotonProducto = document.getElementById('Boton-AgregarProducto')
var FormProductos = document.getElementById('Form-AgregarProducto')

BotonProducto.addEventListener('click', function (event) {

    if ((NombreValido() && PrecioAdmin() && CantidadValida() && ImagenValida()) == true) {

        FormProductos.submit()

    }else{

        NombreValido()
        PrecioAdmin() 
        CantidadValida()

    }

})






