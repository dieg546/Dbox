// alert('Hola, this is a task :3')

var SelectorPadre = document.getElementsByClassName('Selector')
// console.log('Padre? ',SelectorPadre)
var Suma = 0
var lista = []
var lista_Aux = []

// console.log('HEY ',SelectorPadre)

for (var i = 0; i < SelectorPadre.length; i++) {

    var Options = SelectorPadre[i]

    Options.addEventListener('change', function (event) {

        var Selectores = document.getElementsByClassName('Selector')

        for (var i2 = 0; i2 < Selectores.length; i2++) {

            console.log('HEY LISTEN ',Selectores[i2].selectedIndex+1)
            lista.push(parseInt(Selectores[i2].selectedIndex + 1))
            Suma += (parseInt(Selectores[i2].selectedIndex) + 1)
            // ActualizarCarro()           
        }

        console.log(lista)
        ActualizarCarro(lista)
        document.getElementById('holi').innerHTML = lista
        document.getElementById('Final').innerHTML = Suma
        Suma = 0
        lista = []
    })

}

function ActualizarCarro(lista) {

    // console.log(lista)
    var Form = document.getElementById('ActualizarForm')
    var task = document.getElementsByClassName('carritoTask')

    for (var i = 0; i < task.length; i++) {

        console.log('OVER HERE: ', task[i].textContent)
        lista_Aux.push(task[i].textContent)
    }


    document.getElementById('Milista').value = lista
    // console.log('EPAAAAAA ',document.getElementById('Milista').value)
    document.getElementById('MiProducto').value = lista_Aux
    console.log('EPAAAAAA ', document.getElementById('MiProducto').value)
    lista_Aux = []
    // document.getElementById('ListaCarrito').innerHTML=lista
    Form.submit()

}


var email = document.getElementById('email-dato')


function EmailValido() {

    var emailValido = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

    if (emailValido.test(email.value)) {

        return true
    } else {
        return false
    }

}


if (email != null) {

    email.addEventListener('focus', function (event) {

        document.getElementById('email-error').innerHTML = ''
        email.style.borderColor = '#ccc'

    })

    email.addEventListener('focusout', function (event) {


        if (EmailValido()) {

            
            // console.log('EPA')
            document.getElementById('email-error').innerHTML = ''
            email.style.borderColor = '#ccc'
        } else {
            
            email.style.borderColor = 'red'
            document.getElementById('email-error').innerHTML = 'Ingresa un email correcto.'
        }

        // console.log('HEY')

    })

    var Tarjeta = document.getElementById('NumeroTarjeta')

    var Fecha = document.getElementById('FechaExpiracion')
    var task = ""

    Tarjeta.addEventListener('keypress', function (event) {


        Tarjeta.value = event.target.value.replace(/\s/g, "") 
            .replace(/([0-9]{4})/g, "$1 ").trim()

    })

    Fecha.addEventListener('keypress', function (event) {

        // .replace(/\s/g,"").replace(/([0-9]{2})/g,"$1"

        Fecha.value = event.target.value
        task = Fecha.value

        if (Fecha.value.length == 2) {

            task += " / "
            // console.log('EPA ',task)
            Fecha.value = task

        }

    })

    var TarjetaValida = document.getElementById('NumeroTarjeta')

    TarjetaValida.addEventListener('focus', function (event) {

        // document.getElementById('tarjeta-error').innerHTML = ''
        TarjetaValida.style.borderColor = '#ccc'

    })

    TarjetaValida.addEventListener('focusout', function (event) {

        if (ValidacionTarjeta()) {

            
            TarjetaValida.style.borderColor = '#ccc'
            document.getElementById('tarjeta-error').innerHTML = ''
            // console.log('TarjetaFine')
        } else {
            
            TarjetaValida.style.borderColor = 'red'
            document.getElementById('tarjeta-error').innerHTML = 'Numero de tarjeta no valido'

        }

    })

    var FechaExp = document.getElementById('FechaExpiracion')

    FechaExp.addEventListener('focus', function (event) {

        document.getElementById('tarjeta-error').innerHTML = ''
        FechaExp.style.borderColor = '#ccc'
    
    })
    
    FechaExp.addEventListener('focusout', function (event) {
    
        if (ValidacionFecha()) {
            num3 = 1
            FechaExp.style.borderColor = '#ccc'
            document.getElementById('tarjeta-error').innerHTML = ''
    
        } else {
            num3 = 0
            FechaExp.style.borderColor = 'red'
            document.getElementById('tarjeta-error').innerHTML = 'Fecha de tarjeta no valida'
    
        }
    
    })

    var ReversoTarjeta = document.getElementById('ReversoTarjeta')

    ReversoTarjeta.addEventListener('focus', function (event) {

        ReversoTarjeta.style.borderColor = '#ccc'
        document.getElementById('tarjeta-error').innerHTML = ''
    
    })
    
    ReversoTarjeta.addEventListener('focusout', function (event) {
    
        if (ValidacionReverso()) {
            
            ReversoTarjeta.style.borderColor = '#ccc'
            document.getElementById('tarjeta-error').innerHTML = ''
    
        } else {
            
            ReversoTarjeta.style.borderColor = 'red'
            document.getElementById('tarjeta-error').innerHTML = 'Reverso de tarjeta no valido'
    
        }
    
    })

    var UsuarioTarjeta = document.getElementById('usuarioTarjeta')

    UsuarioTarjeta.addEventListener('focus', function (event) {

        ReversoTarjeta.style.borderColor = '#ccc'
        document.getElementById('usuario-error').innerHTML = ''
    
    })
    
    UsuarioTarjeta.addEventListener('focusout', function (event) {
    
        // var CaracterValido = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]*$/
    
        // var task = event.target.value.trim()
    
        if (ValidacionUsuarioTarjeta()) {
            
            UsuarioTarjeta.style.borderColor = '#ccc'
            document.getElementById('usuario-error').innerHTML = ''
    
        } else {
            
            UsuarioTarjeta.style.borderColor = 'red'
            document.getElementById('usuario-error').innerHTML = 'Nombre de usuario no valido, solo letras son permitidas.'
    
        }
    
        // console.log('AQUI: ',task.length)
    
    })

    var BotonSubmit = document.getElementById('Boton-Compra')

    BotonSubmit.addEventListener('click', function (event) {

        if ((EmailValido() && ValidacionTarjeta() && ValidacionFecha() && ValidacionReverso() && ValidacionUsuarioTarjeta() && ValidacionUsuarioTarjeta()) == true) {
    
            // console.log('Todo bien, todo bien')
            FormPago.submit()
        }
    
    
    })


}




// ---------------------------Limitar inputs a numericos----------------------------



// console.log( Tarjeta)


function IsNumber(evt) {

    var char = String.fromCharCode(evt.which)
    if (!/[0-9]/.test(char)) {
        evt.preventDefault()
    }

}

function ValidacionTarjeta() {


    if (TarjetaValida.value.length == 19) {

        return true
    } else {
        return false
    }

}


function ValidacionFecha() {

    if (FechaExp.value.length == 7) {

        return true
    } else {
        return false
    }

}

function ValidacionReverso() {

    if (ReversoTarjeta.value.length >= 3) {

        return true
    } else {
        return false
    }

}

function ValidacionUsuarioTarjeta() {

    var CaracterValido = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]*$/

    var task = UsuarioTarjeta.value.trim()

    if ((CaracterValido.test(UsuarioTarjeta.value)) && (task.length >= 1)) {

        return true

    } else {

        return false

    }
 
}

// var FormPago = document.getElementById('Form-Pago')



// ------------------------------------Nombre de imagen -------------------------------

var Imagen = document.getElementById('archivo')

if (Imagen!=null){

    var NombreProducto = document.getElementById('NombreProducto-AgregarProducto')
    var PrecioProductoAdmin = document.getElementById('InputPrecio-AgregarProducto')
    var Cantidad = document.getElementById('InputCantidad-AgregarProducto')
    var BotonProducto = document.getElementById('Boton-AgregarProducto')
    var FormProductos = document.getElementById('Form-AgregarProducto')

    NombreProducto.addEventListener('focus',function(event){

        NombreProducto.style.borderColor='#007bff'

    })

    NombreProducto.addEventListener('focusout',NombreValido)


    PrecioProductoAdmin.addEventListener('focus',function(event){

        PrecioProductoAdmin.style.borderColor='#007bff'

    })

    // PrecioProductoAdmin.addEventListener('keypress',PrecioValidAdmin)

    PrecioProductoAdmin.addEventListener('focusout',PrecioAdmin)

    Cantidad.addEventListener('focus',function(event){

        Cantidad.style.borderColor='#007bff'

    })

    Cantidad.addEventListener('focusout', CantidadValida)

    Imagen.addEventListener('change',function(event){
        // console.log('EPA')
        // console.log(event.files[0].name)

        var files = event.target.files;

        console.log(files.length)

        if (files.length==0){

            ImagenValida()

        }else{
            
            valor=document.getElementById('textoImagen').innerHTML=files[0].name 
            document.getElementById('textoImagen').innerHTML=files[0].name
            console.log('EL VALOR ',valor) 
            document.getElementById('ImagenTexto-AgregarProducto').value=valor
            console.log(document.getElementById('ImagenTexto-AgregarProducto').innerHTML)
            // console.log(document.getElementById('textoImagen').innerHTML)
            ImagenValida()
        }

        // document.getElementById('textoImagen').innerHTML=files[0].name

        

        // console.log(files[0].name)

    })

    BotonProducto.addEventListener('click',function(event){

        if((NombreValido() && PrecioAdmin() && CantidadValida() && ImagenValida())==true){

            FormProductos.submit()

        }

    })
    

}


function NombreValido(){

    console.log('HEY')

    if(NombreProducto.value.length>=5){

        console.log('Valido ',NombreProducto.value)
        NombreProducto.style.borderColor='#ccc'
        document.getElementById('NombreNoValido-AgregarProducto').innerHTML=''
        return true

    }else{

        console.log('Nope')
        NombreProducto.style.borderColor='red'
        document.getElementById('NombreNoValido-AgregarProducto').innerHTML='Nombre no permitido'
        document.getElementById('NombreNoValido-AgregarProducto').style.color='red'
        return false
    }

}

// function PrecioValidAdmin(){

//     console.log(PrecioProductoAdmin.value.replace(/^(0+)/g, ''))

// }

function PrecioAdmin(){

    // console.log(parseInt(PrecioProductoAdmin.value))

    if(PrecioProductoAdmin.value==''){

        console.log('Nope')
        PrecioProductoAdmin.style.borderColor='red'
        document.getElementById('PrecioNoValido-AgregarProducto').innerHTML='Precio no valido'
        document.getElementById('PrecioNoValido-AgregarProducto').style.color='red'
        return false

    }else{

        if(parseInt(PrecioProductoAdmin.value)>0){

            console.log('Valido ',PrecioProductoAdmin.value)
            PrecioProductoAdmin.style.borderColor='#ccc'
            document.getElementById('PrecioNoValido-AgregarProducto').innerHTML=''
            PrecioProductoAdmin.value=parseInt(PrecioProductoAdmin.value)
            return true

        }else{

            PrecioProductoAdmin.style.borderColor='red'
            document.getElementById('PrecioNoValido-AgregarProducto').innerHTML='Precio no valido'
            document.getElementById('PrecioNoValido-AgregarProducto').style.color='red'
            return false

        }

    }

    // PrecioProductoAdmin.value=parseInt(PrecioProductoAdmin.value)

}

function CantidadValida(){

    if(Cantidad.value == '00' || Cantidad.value == '0' || Cantidad.value == ''){

        Cantidad.style.borderColor='red'
        document.getElementById('CantidadNoValida-AgregarProducto').innerHTML='Cantidad no permitida'
        document.getElementById('CantidadNoValida-AgregarProducto').style.color='red'
        return false
    }else{

        Cantidad.style.borderColor='#ccc'
        document.getElementById('CantidadNoValida-AgregarProducto').innerHTML=''
        Cantidad.value=parseInt(Cantidad.value)
        return true
    }


}


function ImagenValida(){

    var ImagenDiv = document.getElementById('textoImagen')

    
    if(ImagenDiv.innerHTML==''){

        return false

    }else{

        return true
        

    }


}
// ------------------------Opcion para resetear Página------------------------------


window.addEventListener( "pageshow", function ( event ) {
    console.log('HEY, reinicio')
    var historyTraversal = event.persisted ||
                           ( typeof window.performance != "undefined" &&
                                window.performance.navigation.type === 2 );
    if ( historyTraversal ) {
      // Handle page restore.
      window.location.reload();
    }
  }); 