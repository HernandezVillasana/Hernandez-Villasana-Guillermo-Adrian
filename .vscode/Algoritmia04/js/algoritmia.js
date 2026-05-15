function problema1(){

    var p1_input = document.querySelector('#p1-input').value;
  
    var p1_array = p1_input.split(' ').reverse();
    
    var p1_res = '';

    p1_array.forEach(function (palabra, i){
       
        if(i != 0 || i != p1_array.length) p1_res += ' ';
        p1_res += palabra; 
    });
    
    document.querySelector('#p1-output').textContent = p1_res;
}





function problema2(){

    var p2_x1 = document.querySelector('#p2-x1').value;
    var p2_x2 = document.querySelector('#p2-x2').value;
    var p2_x3 = document.querySelector('#p2-x3').value;
    var p2_x4 = document.querySelector('#p2-x4').value;
    var p2_x5 = document.querySelector('#p2-x5').value;

    var p2_y1 = document.querySelector('#p2-y1').value;
    var p2_y2 = document.querySelector('#p2-y2').value;
    var p2_y3 = document.querySelector('#p2-y3').value;
    var p2_y4 = document.querySelector('#p2-y4').value;
    var p2_y5 = document.querySelector('#p2-y5').value;



    var v1 = [p2_x1, p2_x2, p2_x3, p2_x4, p2_x5];
    var v2 = [p2_y1, p2_y2, p2_y3, p2_y4, p2_y5];

    v1 = v1.sort(function (a, b){
        return b-a;
    });

    v2 = v2.sort(function (a, b){
        return b-a;
    });


    v2 = v2.reverse();

    var p2_producto = 0;

    for(var i = 0; i < v1.length; i++){
        p2_producto += v1[i] * v2[i];
    }

    document.querySelector('#p2-output').textContent =
    'Producto Escalar Minimo : '+ p2_producto;

}
function problema3() {
    const texto = document.getElementById("p3-input").value.trim();
    
    if (!texto) {
        document.getElementById("p3-output").textContent = "Ingresa datos válidos";
        return;
    }

    const palabras = texto.split(",");
    let maxPalabra = "";
    let maxCantidad = -1;

    for (let palabra of palabras) {
        const limpia = palabra.trim().toLowerCase();
        if (!limpia) continue;

        const cantidad = new Set(limpia).size;

        if (cantidad > maxCantidad) {
            maxCantidad = cantidad;
            maxPalabra = palabra.trim();
        }
    }

    if (maxCantidad === -1) {
        document.getElementById("p3-output").textContent = "No se encontraron palabras válidas";
        return;
    }

    document.getElementById("p3-output").textContent = 
        `Palabra con más letras diferentes: ${maxPalabra} (${maxCantidad})`;
}