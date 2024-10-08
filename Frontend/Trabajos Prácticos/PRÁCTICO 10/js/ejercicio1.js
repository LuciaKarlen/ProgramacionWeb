function iniciar(){
    var boton=document.getElementById("grabar");
    boton.addEventListener('click',agregarElemento);
    mostrar();
} 


function agregarElemento() {
    var nombre = document.getElementById("first_name").value;
    var apellido = document.getElementById("last_name").value;
    var dni = document.getElementById("dni").value;
    sessionStorage.setItem(nombre,apellido,dni);
    document.getElementById("first_name").value='';
    document.getElementById("last_name").value='';
    document.getElementById("dni").value='';
    document.getElementById("password").value='';
    document.getElementById("email").value='';
    document.getElementById("cp").value='';
    document.getElementById("direccion").value='';
    mostrar();
}

function mostrar(){
    var cajadatos=document.getElementById("cajadatos");
    cajadatos.innerHTML='';
    if(sessionStorage.length>0){
        cajadatos.innerHTML='<div> <input type="button" onclick="eliminartodo()" value="Eliminar todo"> </div>'
    }
    for (var i=0; i < sessionStorage.length; i++){
        var clave= sessionStorage.key(i);
        var valor=sessionStorage.getItem(clave);
        cajadatos.innerHTML+='<div>' + clave + '-' + valor + '<br> <input type="button" onclick="eliminar(\''+ clave + '\')" value="Eliminar"></div>'
    }
}

function eliminar(clave){
    if(confirm('seguro deseas eliminar?')){
        sessionStorage.removeItem(clave);
        mostrar();
    }
}

function eliminartodo(){
    if(confirm('seguro deseas eliminar?')){
        sessionStorage.clear();
        mostrar();
    }
}