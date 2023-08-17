

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