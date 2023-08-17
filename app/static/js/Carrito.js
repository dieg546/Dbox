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