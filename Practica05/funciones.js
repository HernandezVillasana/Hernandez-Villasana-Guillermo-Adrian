//Todod sera  programadobajo el esquema ES6
/* 
Para javascript ya conocemos el concepto e variable  

var  
Se sustituye porlas nuevas variables let y const
let --> es una variable de tipo "protegida", ya que que solo funciona dentro de un fragmento de codigo
const --> si es constante 
*/

//if(true){
   //var x = "x"; 
    //console.log(x);


//var x = "y";
//console.log(x);
//}
//para declarar en js las funciones hay una forma mas efectiva para declarar y a partir de una funcion flecha 
//una funcion flecha en JS a diferencia de una funcion normal, no genera su propio contecto (this) necesita ser declarada antes de seer usada y no necesita un return 
//function cosa (Strimg hola) {  String cosa; this.cosa = hola; }
/*
 function sumarnumeros(n1, n2) {
    return n1 + n2;
}
const sumarDosNumeros = (n1, n2) => n1 + n2; //funcion flecha
console.log(`La suma de 2 + 3 es ${sumarnumeros(2,3)} ` );
console.log(`La suma de 5 + 3 es ${sumarDosNumeros(5,3)} ` );
//para armar una funcion flecha debemos entender su estructura:
*/
// "Cadena" (el tipo de variable, nombre de la funcion y los argumentos) => operacion a realizar
const razaDePerros = [
    "Gran danes",
    "Pitbull",
    "Doverman",
    //"Chichuahua",
    "San bernardo",
    "Xoloscuinlce",
];
/*
for(let i = 0; i < razaDePerros.length; i++){
    console.log(razaDePerros[i]);
}
for(const raza of razaDePerros){
    console.log(raza);
}   
for(const indice in razaDePerros){
    console.log(razaDePerros[indice]);  
}

// forEach , Iterar sobre el elemtno de arreglo que devuelven nada
razaDePerros.forEach((raza) => console.log(raza)); //si no se necesita el indice ni el arreglo original, no es necesario declararlos
Por ejemplo necesutamos una funcion para buscar la raza chihuahua si no existe agregarla

// funcion map esta funcion itera sobre los elementos del arreglo y regresa un arreglo diferente con el que podemos hacer lo que queramos sin necesidad de moduificar el arreglo original
const razaDePerrosEnMayusculas = razaDePerros.map((raza, indice, arregloOriginal) => console.log(raza.toUpperCase)());
*/
if(razaDePerros.find((raza) => raza === "Chichuahua")){
    console.log("La raza si se ecncontro y es Chichuahua");
    console.log(razaDePerros);
}else{
    razaDePerros.push("Chichuahua");
    console.log("Se agreago chihuaahua a la lista de razas");
    console.log(razaDePerros);
}
