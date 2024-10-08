function iniciar(){
    var boton=document.getElementById("grabar");
    boton.addEventListener('click',agregarElemento);
    mostrar();
} 


function agregarElemento() {
    var nombre = document.getElementById("first_name").value;
    var apellido = document.getElementById("last_name").value;
    var legajo = document.getElementById("legajo").value;
    localStorage.setItem(nombre,apellido,legajo);
    document.getElementById("first_name").value='';
    document.getElementById("last_name").value='';
    document.getElementById("legajo").value='';
    document.getElementById("fnacimiento").value='';
    document.getElementById("dni").value='';
    mostrar();
}

function mostrar(){
    var cajadatos=document.getElementById("cajadatos");
    cajadatos.innerHTML='';
    if(localStorage.length>0){
        cajadatos.innerHTML='<div> <input type="button" onclick="eliminartodo()" value="Eliminar todo"> </div>'
    }
    for (var i=0; i < localStorage.length; i++){
        var clave= localStorage.key(i);
        var valor=localStorage.getItem(clave);
        cajadatos.innerHTML+='<>'
        cajadatos.innerHTML+='<ul class="collection with-header"> <li class="collection-header"> <h4>' + clave + '-' + valor + '</h4>' + '<br> <input type="button" onclick="eliminar(\''+ clave + '\')" value="Eliminar" </li>></ul>'
    }
}

function eliminar(clave){
    if(confirm('seguro deseas eliminar?')){
        localStorage.removeItem(clave);
        mostrar();
    }
}

function eliminartodo(){
    if(confirm('seguro deseas eliminar?')){
        localStorage.clear();
        mostrar();
    }
}