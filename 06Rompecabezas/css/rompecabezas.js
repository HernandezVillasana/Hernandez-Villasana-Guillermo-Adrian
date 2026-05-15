var instrucciones = [
    "Utiliza las flechas de naavegacion para mover las pirzas del rompecabezas",
    "para Ordenar las piezas guiate por la imagen del objetivo",
];
//para guaradr moviemientos necesitamos un arreglo
var movimientos = [];
// tengo que saber cuales son las posciones del rompezacabezas originasl 
var rompe =[
    [1,2,3],
    [4,5,6],
    [7,8,9] 
];
//necesito otra variable para saber cual es el orden correcto del rompecabezas
var rompeCorrecta =[
    [1,2,3],
    [4,5,6],
    [7,8,9]
];
//necesito una variable para saber cual es la posicion vacia del rompecabezas
var Filavacia = [2,2];
var ColumnaVacia = [2,2];
//necesito una funcion que se encargue de mostrar la lista de instrucciones
function mostrarInstrucciones(instrucciones){
    for(var i = 0; i < instrucciones.length; i++){
       mostrarInstruccionesLista(instrucciones[i], "lista-instrucciones");
    }
}
function mostrarInstruccionesLista(instruccion, idLista ){
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);

}