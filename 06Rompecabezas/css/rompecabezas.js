// Arreglo que contiene todas las instrucciones para el juego
var instrucciones = [
    "Utiliza las flechas de navegación para mover las piezas.", 
    "Para ordenar las piezas guíate por la imagen objetivo."
];

// Variable para guardar el historial de movimientos
var movimientos = [];

// Matriz que representa las posiciones del rompecabezas en tiempo real
var rompe = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Matriz que representa el rompecabezas ordenado (condición de victoria)
var rompeCorrecta = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Coordenadas iniciales de la pieza vacía (el número 9)
var filaVacia = 2;
var columnaVacia = 2;

// Códigos de las flechas del teclado
var codigosDireccion = {
    IZQUIERDA : 37,
    ARRIBA : 38,
    DERECHA : 39,
    ABAJO : 40
};

// Muestra las instrucciones recorriendo el arreglo
function mostrarInstrucciones(instrucciones) {
    for (var i = 0; i < instrucciones.length; i++) {
        mostrarInstruccionLista(instrucciones[i], "lista-instrucciones");
    }
}

// Inserta cada instrucción como un elemento <li> en el HTML
function mostrarInstruccionLista(instruccion, idLista) {
    var ul = document.getElementById(idLista);
    if (ul) {
        var li = document.createElement("li");
        li.textContent = instruccion;
        ul.appendChild(li);
    }
}

// Guarda la dirección del movimiento en el historial
function agregarUltimoMovimiento(direccion) {
    movimientos.push(direccion);
}

// Compara la matriz actual con la matriz correcta
function checarSiGano() {
    for (var i = 0; i < rompe.length; i++) {
        for (var j = 0; j < rompe[i].length; j++) {
            if (rompe[i][j] !== rompeCorrecta[i][j]) {
                return false;
            }
        }
    }
    return true;
}

// Muestra el mensaje de victoria convencional
function mostrarCartelGanador() {
    alert("¡Felicidades! Has resuelto el rompecabezas con éxito.");
}

// Intercambia los valores numéricos dentro de la matriz lógica
function intercambiarPosicionesRompe(filaPos1, columnaPos1, filaPos2, columnaPos2) {
    var pos1 = rompe[filaPos1][columnaPos1];
    var pos2 = rompe[filaPos2][columnaPos2];
    
    rompe[filaPos1][columnaPos1] = pos2;
    rompe[filaPos2][columnaPos2] = pos1;
}

// Actualiza las coordenadas de la pieza vacía
function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}

// Valida que el movimiento no se salga de los límites del tablero (3x3)
function posicionValida(fila, columna) {
    return (fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2);
}

// Coordina el intercambio lógico en la matriz y el intercambio visual en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
    var pieza1 = rompe[fila1][columna1];
    var pieza2 = rompe[fila2][columna2];

    intercambiarPosicionesRompe(fila1, columna1, fila2, columna2);
    intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);
}

// Intercambia la posición de dos elementos en el HTML usando un nodo temporal
function intercambiarPosicionesDOM(idpieza1, idpieza2) {
    var elementoPieza1 = document.getElementById(idpieza1);
    var elementoPieza2 = document.getElementById(idpieza2);

    if (elementoPieza1 && elementoPieza2) {
        var padre = elementoPieza1.parentNode;

        // Creamos un elemento fantasma temporal para guardar la posición de la pieza 1
        var contenedorTemporal = document.createElement("div");
        padre.insertBefore(contenedorTemporal, elementoPieza1);

        // Movemos la pieza 1 justo antes de la pieza 2
        padre.insertBefore(elementoPieza1, elementoPieza2);

        // Movemos la pieza 2 al lugar original de la pieza 1 (donde está el fantasma)
        padre.insertBefore(elementoPieza2, contenedorTemporal);

        // Eliminamos el elemento fantasma
        padre.removeChild(contenedorTemporal);
    }
}

// Calcula las nuevas coordenadas según la flecha presionada
function moverEnDireccion(direccion) {
    var nuevaFilaPiezaVacia = filaVacia;
    var nuevaColumnaPiezaVacia = columnaVacia;

    if (direccion === codigosDireccion.ABAJO) {
        nuevaFilaPiezaVacia = filaVacia + 1;
    } else if (direccion === codigosDireccion.ARRIBA) {
        nuevaFilaPiezaVacia = filaVacia - 1;
    } else if (direccion === codigosDireccion.DERECHA) {
        nuevaColumnaPiezaVacia = columnaVacia + 1;
    } else if (direccion === codigosDireccion.IZQUIERDA) {
        nuevaColumnaPiezaVacia = columnaVacia - 1;
    }

    // Si la nueva posición está dentro del tablero, realizamos el movimiento
    if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        agregarUltimoMovimiento(direccion);
    }
}

// Actualiza el indicador visual del último movimiento realizado
function actualizarUltimoMovimiento(direccion) {
    var ultimoMov = document.getElementById('flecha');
    if (ultimoMov) {
        switch(direccion) {
            case codigosDireccion.ARRIBA:
                ultimoMov.textContent = '↑';
                break;
            case codigosDireccion.ABAJO:
                ultimoMov.textContent = '↓';
                break;
            case codigosDireccion.IZQUIERDA:
                ultimoMov.textContent = '←';
                break;
            case codigosDireccion.DERECHA:
                ultimoMov.textContent = '→';
                break;
        }
    }
}

// Mezcla el tablero de forma aleatoria antes de empezar
function mezclarPiezas(veces) {
    if (veces <= 0) {
        // Activamos el teclado cuando el tablero termina de mezclarse por completo
        capturarTeclas();
        return;
    }
    
    var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA, codigosDireccion.IZQUIERDA, codigosDireccion.DERECHA];
    var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];

    moverEnDireccion(direccion);

    setTimeout(function() {
        mezclarPiezas(veces - 1);
    }, 100);
}

// Escucha los eventos del teclado del jugador
function capturarTeclas() {
    document.body.onkeydown = function(evento) {
        var tecla = evento.which || evento.keyCode;
        
        if (tecla === codigosDireccion.ARRIBA || tecla === codigosDireccion.ABAJO || 
            tecla === codigosDireccion.IZQUIERDA || tecla === codigosDireccion.DERECHA) {
            
            moverEnDireccion(tecla);
            actualizarUltimoMovimiento(tecla);
            
            // Verificamos si con este movimiento el jugador ganó
            if (checarSiGano()) {
                setTimeout(function() {
                    mostrarCartelGanador();
                }, 300);
            }
            
            // Evita que la página web se desplace con las flechas
            evento.preventDefault();
        }
    };
}

// Función de arranque del juego
function iniciar() {
    mostrarInstrucciones(instrucciones);
    mezclarPiezas(30); // Mezcla el tablero 30 veces
}

// Ejecutamos el juego al cargar el script
iniciar();