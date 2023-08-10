var ImagenModificada = document.getElementById("ImagenModificada")

ImagenModificada.addEventListener('change',function(event){

    document.getElementById("TextoImg-Modificada").innerHTML=event.target.files[0].name

    var imagenPreModificada = document.getElementById('ImagenPre-Modificada')

    var ImagenUrl = new FileReader();

    ImagenUrl.onload = function(e){

        imagenPreModificada.src = e.target.result;

    }
    ImagenUrl.readAsDataURL(event.target.files[0])
        

})

var TextoModificado = document.getElementById("input-NombreProducto")

function ValidarTexto(){

    if(TextoModificado.value.length>5){
        TextoModificado.style.borderColor='#918e8e'
        return true
    }else{

        TextoModificado.style.borderColor='red'
        return false

    }

}

TextoModificado.addEventListener('focusout',ValidarTexto)

var PrecioModificado = document.getElementById("input-PrecioProducto")

function ValidarPrecio(){

    if (parseFloat(PrecioModificado.value)>0){

        PrecioModificado.value=parseFloat(PrecioModificado.value)
        PrecioModificado.style.borderColor='#918e8e'
        return true

    }else{

        PrecioModificado.style.borderColor='red'
        return false
    }

}

PrecioModificado.addEventListener('focusout',ValidarPrecio)

var CantidadModificada = document.getElementById("input-CantidadProducto")

function ValidarCantidad(){


    if(CantidadModificada.value.length>=1 && CantidadModificada.value){

        CantidadModificada.style.borderColor='#918e8e'
        return true

    } 
    else{

        CantidadModificada.style.borderColor='red'
        return false
    } 

}

CantidadModificada.addEventListener('focusout',ValidarCantidad)


var EnviarCambios = document.getElementById("Boton-ModificarProducto")
var FormModificar = document.getElementById("Form-ModificarProducto")

EnviarCambios.addEventListener('click',function(e){

    if(ValidarTexto() && ValidarPrecio() && ValidarCantidad()){

        FormModificar.submit()

    }

})


console.log("Estamos en admin, esto puede ser una pequeña mejora.")