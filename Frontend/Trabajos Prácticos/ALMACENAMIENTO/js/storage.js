function iniciar(){
    var boton = document.getElementById("grabar");
    boton.addEventListener('click', nuevoItem);
    mostrar();
}

function nuevoItem(){
    var clave = document.getElementById('clave').value;
    var valor = document.getElementById('texto').value;
    sessionStorage.setItem(clave, valor);
    document.getElementById('clave').value = '';
    document.getElementById('texto').value = '';
    mostrar(clave);
}

/*function mostrar(clave){
    var cajadatos = document.getElementById('cajadatos');
    var valor = sessionStorage.getItem(clave);
    cajadatos.innerHTML = '<div>' + clave + '-' + valor + '</div>'
    var clave = document.getElementById('clave');
    clave.innerHTML = '';

    var texto = document.getElementById('texto');
    texto.innerHTML = '';
}*/

function mostrar(){
    var cajadatos = document.getElementById('cajadatos');
    cajadatos.innerHTML='';
    if(sessionStorage.length > 0){
        cajadatos.innerHTML = '<div><input type="button" onclick="eliminarTodo()" value="eliminar todo"></div>';
    }

    for (var i=0; i < sessionStorage.length; i++){
        var clave = sessionStorage.key(i);
        var valor = sessionStorage.getItem(clave);
        cajadatos.innerHTML += '<div>' + clave + '-' + valor
        + '<br><input type="button" onclick="eliminar(\''
        + clave + '\')" value="Eliminar"></div>';
    }
}

function eliminar(clave){
    if(confirm('Seguro desea eliminar?')){
        sessionStorage.removeItem(clave);
        mostrar();
    }
}

function eliminarTodo(){
    if(confirm('Seguro desea eliminar todo?')){
        sessionStorage.clear();
        mostrar();
    }
}

addEventListener('load', iniciar);