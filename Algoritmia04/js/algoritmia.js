function problema1() {
    const texto = document.getElementById("p1-input").value.trim();
    
    if (!texto) {
        document.getElementById("p1-output").textContent = "Ingresa datos válidos";
        return;
    }

    const palabras = texto.split(/\s+/);
    const resultado = palabras.reverse().join(" ");
    
    document.getElementById("p1-output").textContent = resultado;
}

function problema2() {
    const v1 = document.getElementById("p2-v1").value.trim().split(/\s+/).map(Number);
    const v2 = document.getElementById("p2-v2").value.trim().split(/\s+/).map(Number);

    if (v1.length !== v2.length || v1.some(isNaN) || v2.some(isNaN)) {
        document.getElementById("p2-output").textContent = 
            "Vectores inválidos o de diferente tamaño";
        return;
    }

    // Ordenar v1 ascendente y v2 descendente para mínimo producto escalar
    v1.sort((a, b) => a - b);
    v2.sort((a, b) => b - a);

    let producto = 0;
    for (let i = 0; i < v1.length; i++) {
        producto += v1[i] * v2[i];
    }

    document.getElementById("p2-output").textContent = 
        `Producto escalar mínimo: ${producto}`;
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