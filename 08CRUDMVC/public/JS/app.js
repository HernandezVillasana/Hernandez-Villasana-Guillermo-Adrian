/*
Vamos atener unsa estructura mrdiante la cual implementamos el modelo vista controlqdor, en donde a partir del uso de una API podemos consumir los elemtos por oa¿parte del front para obtener sus datos como peticion o como respuest adel back
*/
console.log("APP CARGADA");
const apiMetodo = document.getElementById('api-metodo');
const apiURL = document.getElementById('api-url');
const apiCodigo = document.getElementById('api-codigo');
const notificacionDIV = document.getElementById('notificacion');
// Datos base
const F1_PILOTOS = {
  "Max Verstappen": {
    equipo: "Red Bull",
    pais: "Países Bajos",
    numero: 1
  },
  "Sergio Pérez": {
    equipo: "Red Bull",
    pais: "México",
    numero: 11
  },
  "Lewis Hamilton": {
    equipo: "Ferrari",
    pais: "Reino Unido",
    numero: 44
  },
  "Charles Leclerc": {
    equipo: "Ferrari",
    pais: "Mónaco",
    numero: 16
  },
  "Carlos Sainz": {
    equipo: "Williams",
    pais: "España",
    numero: 55
  },
  "Lando Norris": {
    equipo: "McLaren",
    pais: "Reino Unido",
    numero: 4
  },
  "Oscar Piastri": {
    equipo: "McLaren",
    pais: "Australia",
    numero: 81
  },
  "George Russell": {
    equipo: "Mercedes",
    pais: "Reino Unido",
    numero: 63
  },
  "Lewis Hamilton (Mercedes)": {
    equipo: "Mercedes",
    pais: "Reino Unido",
    numero: 44
  },
  "Fernando Alonso": {
    equipo: "Aston Martin",
    pais: "España",
    numero: 14
  },
  "Lance Stroll": {
    equipo: "Aston Martin",
    pais: "Canadá",
    numero: 18
  },
  "Pierre Gasly": {
    equipo: "Alpine",
    pais: "Francia",
    numero: 10
  },
  "Esteban Ocon": {
    equipo: "Haas",
    pais: "Francia",
    numero: 31
  },
  "Nico Hülkenberg": {
    equipo: "Haas",
    pais: "Alemania",
    numero: 27
  },
  "Yuki Tsunoda": {
    equipo: "Red Bull (RB / Racing Bulls)",
    pais: "Japón",
    numero: 22
  },
  "Alexander Albon": {
    equipo: "Williams",
    pais: "Tailandia",
    numero: 23
  },
  "Valtteri Bottas": {
    equipo: "Kick Sauber",
    pais: "Finlandia",
    numero: 77
  },
  "Zhou Guanyu": {
    equipo: "Kick Sauber",
    pais: "China",
    numero: 24
  }
};
const CAMPEONES = {
  2010: { piloto: "Sebastian Vettel", escuderia: "Red Bull", puntos: 256 },
  2011: { piloto: "Sebastian Vettel", escuderia: "Red Bull", puntos: 392 },
  2012: { piloto: "Sebastian Vettel", escuderia: "Red Bull", puntos: 281 },
  2013: { piloto: "Sebastian Vettel", escuderia: "Red Bull", puntos: 397 },
  2014: { piloto: "Lewis Hamilton", escuderia: "Mercedes", puntos: 384 },
  2015: { piloto: "Lewis Hamilton", escuderia: "Mercedes", puntos: 381 },
  2016: { piloto: "Nico Rosberg", escuderia: "Mercedes", puntos: 385 },
  2017: { piloto: "Lewis Hamilton", escuderia: "Mercedes", puntos: 363 },
  2018: { piloto: "Lewis Hamilton", escuderia: "Mercedes", puntos: 408 },
  2019: { piloto: "Lewis Hamilton", escuderia: "Mercedes", puntos: 413 },
  2020: { piloto: "Lewis Hamilton", escuderia: "Mercedes", puntos: 347 },
  2021: { piloto: "Max Verstappen", escuderia: "Red Bull", puntos: 395 },
  2022: { piloto: "Max Verstappen", escuderia: "Red Bull", puntos: 454 },
  2023: { piloto: "Max Verstappen", escuderia: "Red Bull", puntos: 575 },
  2024: { piloto: "Max Verstappen", escuderia: "Red Bull", puntos: 575 },
  2025: { piloto: "Max Verstappen", escuderia: "Red Bull", puntos: 0 }
};
const ESCUDERIAS = {
  "Red Bull": {
    pais: "Austria",
    motor: "Honda/RBPT",
    titulos: 6
  },
  "Mercedes": {
    pais: "Alemania",
    motor: "Mercedes",
    titulos: 8
  },
  "Ferrari": {
    pais: "Italia",
    motor: "Ferrari",
    titulos: 16
  },
  "McLaren": {
    pais: "Reino Unido",
    motor: "Mercedes",
    titulos: 8
  },
  "Alpine": {
    pais: "Francia",
    motor: "Renault",
    titulos: 2
  },
  "Williams": {
    pais: "Reino Unido",
    motor: "Mercedes",
    titulos: 9
  },
  "Haas": {
    pais: "Estados Unidos",
    motor: "Ferrari",
    titulos: 0
  }
};
// Arrays generados automáticamente
const PILOTOS = Object.keys(F1_PILOTOS);

const EQUIPOS = [...new Set(
    Object.values(F1_PILOTOS).map(p => p.equipo)
)];

const PAISES = [...new Set(
    Object.values(F1_PILOTOS).map(p => p.pais)
)];
function cargarSelectsPilotos() {

    const nombre = document.getElementById('piloto-nombre');
    const equipo = document.getElementById('piloto-equipo');
    const pais = document.getElementById('piloto-pais');

    // limpiar
    nombre.innerHTML = '';
    equipo.innerHTML = '';
    pais.innerHTML = '';

    // pilotos
    PILOTOS.forEach(p => {
        nombre.innerHTML += `<option value="${p}">${p}</option>`;
    });

    // equipos
    EQUIPOS.forEach(e => {
        equipo.innerHTML += `<option value="${e}">${e}</option>`;
    });

    // países
    PAISES.forEach(p => {
        pais.innerHTML += `<option value="${p}">${p}</option>`;
    });
}
//vamos a crear la api fetch para poder conectarnos
async function FetchAPI(url, opciones = {}) {
    const method = opciones.method || 'GET';
    apiMetodo.textContent = method;
    apiMetodo.className = `badge badge-${method.toLowerCase()}`;
    apiURL.textContent = url;
    apiCodigo.textContent = 'Cargando...';
    apiCodigo.className = 'badge badge-secondary';
    try {
        const response = await fetch(url, opciones);
        apiCodigo.textContent = `${response.status}`;
        apiCodigo.className = `badge badge-${response.ok ? 'badge-success' : 'badge-danger'}`;
        
    const datos = await response.json();
    if (!response.ok) {
        throw new Error(datos.message || 'Error en la solicitud');
    }
    return datos;
}

catch (error) {
    if ( apiCodigo.textContent === 'Cargando...') {
        apiCodigo.textContent = 'Error';
        apiCodigo.className = 'badge badge-danger';
    }
    throw error;
}
}
function mostrarError(msg) {
    document.getElementById("mensaje-error").textContent = msg;
}

 

//Todos los datos del formulario de usuarios
const formUsuarios = document.getElementById('form-usuarios');
const inputUsuarioId = document.getElementById('usuario-id');
const inputUsuarioNombre = document.getElementById('usuario-nombre');
const inputUsuarioEmail = document.getElementById('usuario-email');
const TituloUsuarios = document.getElementById('form-titulo-usuarios');
const btnGuardarUsuario = document.getElementById('btn-guardar-usuario');
const btnCancelarUsuario = document.getElementById('btn-cancelar-usuario');
const tbodyUsuarios = document.getElementById('tbody-usuarios');
const tableUsuarios = document.getElementById('table-usuarios');
const cargaUsuarios = document.getElementById('carga-usuarios');
const contadorUsuarios = document.getElementById('contador-usuarios');
const errorUsuarios = document.getElementById('error-usuarios');
const errorUsuarioEmail = document.getElementById('error-usuario-email');

//vamos a crear una funcion para mostrar los usuarios
async function cargarUsuarios() {
    try {
        const respuesta = await FetchAPI('/api/usuarios')

        errorUsuarios.style.display = 'none';
        tbodyUsuarios.innerHTML = '';

        if (!respuesta.data || respuesta.data.length === 0) {
            errorUsuarios.textContent = 'No hay usuarios registrados';
            errorUsuarios.style.display = 'block';
            tableUsuarios.style.display = 'none';
            return;
        }

        tableUsuarios.style.display = 'table';

        respuesta.data.forEach(u => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${u.id}</td>
                <td>${u.nombre}</td>
                <td>${u.email}</td>
                <td>
                    <button onclick="editarUsuario(${u.id})">Editar</button>
                    <button onclick="eliminarUsuario(${u.id})">Eliminar</button>
                </td>
            `;

            tbodyUsuarios.appendChild(fila);
        });

        contadorUsuarios.textContent = respuesta.data.length;

    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        errorUsuarios.textContent = 'Error al cargar usuarios';
        errorUsuarios.style.display = 'block';
    }
}
function cambiarSeccion(seccion) {
    document.querySelectorAll('.seccion').forEach(s => {
        s.style.display = 'none';
    });

    document.getElementById(`seccion-${seccion}`).style.display = 'block';

    if (seccion === 'pilotos') cargarPilotos();
    if (seccion === 'campeones') cargarCampeones();
    if (seccion === 'escuderias') cargarEscuderias();
}
async function cargarPilotos() {
   
    const res = await FetchAPI('/api/pilotos');

    const tbody = document.getElementById('tbody-pilotos');
    tbody.innerHTML = '';

    res.data.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.nombre}</td>
                <td>${p.equipo}</td>
                <td>${p.pais}</td>
                <td>${p.numero}</td>
                <td>
    <button onclick="eliminarPiloto(${p.id})">Eliminar</button>
</td>
            </tr>
        `;
    });
}
async function cargarCampeones() {
    const res = await FetchAPI('/api/campeones');

    const tbody = document.getElementById('tbody-campeones');
    tbody.innerHTML = '';

    res.data.forEach(c => {
        tbody.innerHTML += `
            <tr>
                <td>${c.id}</td>
                <td>${c.anio}</td>
                <td>${c.piloto}</td>
                <td>${c.escuderia}</td>
                <td>${c.puntos}</td>
                <td>
  <button onclick="eliminarCampeon(${c.id})">Eliminar</button>
</td>
            </tr>
        `;
    });
}
async function cargarEscuderias() {
    const res = await FetchAPI('/api/escuderias');

    const tbody = document.getElementById('tbody-escuderias');
    tbody.innerHTML = '';

    res.data.forEach(e => {
        tbody.innerHTML += `
            <tr>
                <td>${e.id}</td>
                <td>${e.nombre}</td>
                <td>${e.pais}</td>
                <td>${e.motor}</td>
                <td>${e.titulos}</td>
                <td>
    <button onclick="eliminarEscuderia(${e.id})">Eliminar</button>
</td>
            </tr>
        `;
    });
}
async function guardarEscuderia() {

    const nombre = document.getElementById('escuderia-nombre').value;
    const pais = document.getElementById('escuderia-pais').value;
    const motor = document.getElementById('escuderia-motor').value;
    const titulos = Number(document.getElementById('escuderia-titulos').value);

    const real = ESCUDERIAS[nombre];

    if (!real) {
        alert("Escudería no registrada en sistema");
        return;
    }

    if (real.motor !== motor) {
        alert(`Error: ${nombre} usa motor ${real.motor}`);
        return;
    }

    if (real.titulos !== titulos) {
        alert(`Error: ${nombre} tiene ${real.titulos} títulos`);
        return;
    }

    const datos = {
        nombre,
        pais,
        motor,
        titulos
    };

    await FetchAPI('/api/escuderias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });

    cargarEscuderias();
}

async function editarEscuderia(id) {

    const res = await FetchAPI('/api/escuderias');
    const escuderia = res.data.find(e => e.id == id);

    document.getElementById('escuderia-id').value = escuderia.id;
    document.getElementById('escuderia-nombre').value = escuderia.nombre;
    document.getElementById('escuderia-pais').value = escuderia.pais;
    document.getElementById('escuderia-motor').value = escuderia.motor;
    document.getElementById('escuderia-titulos').value = escuderia.titulos;
}
async function guardarCampeon() {

    const anio = Number(document.getElementById('campeon-anio').value);
    const piloto = document.getElementById('campeon-piloto').value;
    const escuderia = document.getElementById('campeon-escuderia').value;
    const puntos = Number(document.getElementById('campeon-puntos').value);

    const real = CAMPEONES[anio];

    console.log("INPUT:", { anio, piloto, escuderia, puntos });
    console.log("REAL:", real);

    if (!real) {
        console.log("ERROR: año no existe");
        alert("Año fuera de rango");
        return;
    }

    if (real.piloto !== piloto) {
        console.log("ERROR: piloto no coincide");
        alert(`Error: en ${anio} el campeón fue ${real.piloto}`);
        return;
    }

    if (real.escuderia !== escuderia) {
        console.log("ERROR: escudería no coincide");
        alert(`Error: en ${anio} la escudería fue ${real.escuderia}`);
        return;
    }

    if (real.puntos !== puntos) {
        console.log("ERROR: puntos no coinciden");
        alert(`Error: puntos correctos ${real.puntos}`);
        return;
    }

    await FetchAPI('/api/campeones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anio, piloto, escuderia, puntos })
    });
const norm = (t) => t.trim().toLowerCase();
    cargarCampeones();
}
async function editarCampeon(id) {

    const res = await FetchAPI('/api/campeones');
    const campeon = res.data.find(c => c.id == id);

    document.getElementById('campeon-id').value = campeon.id;
    document.getElementById('campeon-anio').value = campeon.anio;
    document.getElementById('campeon-piloto').value = campeon.piloto;
    document.getElementById('campeon-escuderia').value = campeon.escuderia;
    document.getElementById('campeon-puntos').value = campeon.puntos;
}
async function editarPiloto(id) {

    const res = await FetchAPI('/api/pilotos');

    const piloto = res.data.find(p => p.id == id);

    document.getElementById('piloto-id').value = piloto.id;
    document.getElementById('piloto-nombre').value = piloto.nombre;
    document.getElementById('piloto-equipo').value = piloto.equipo;
    document.getElementById('piloto-pais').value = piloto.pais;
    document.getElementById('piloto-numero').value = piloto.numero;
}

async function guardarPiloto() {

    const nombre = document.getElementById('piloto-nombre').value;
    const equipo = document.getElementById('piloto-equipo').value;
    const pais = document.getElementById('piloto-pais').value;
    const numero = Number(document.getElementById('piloto-numero').value);

    const real = F1_PILOTOS[nombre];

    if (!real) {
        alert("Piloto inválido");
        return;
    }

    if (real.equipo !== equipo) {
        alert(`Error: ${nombre} no pertenece a ${equipo}`);
        return;
    }

    if (real.pais !== pais) {
        alert(`Error: ${nombre} no es de ${pais}`);
        return;
    }

    if (real.numero !== numero) {
        alert(`Error: número incorrecto (debería ser ${real.numero})`);
        return;
    }

    await FetchAPI('/api/pilotos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre,
            equipo,
            pais,
            numero
        })
    });

    cargarPilotos();
}
async function eliminarCampeon(id) {
    const confirmacion = confirm('¿Seguro que quieres eliminar este campeón?');

    if (!confirmacion) return;

    try {
        await FetchAPI(`/api/campeones/${id}`, {
            method: 'DELETE'
        });

        await cargarCampeones();

    } catch (error) {
        console.error('Error al eliminar:', error);
    }
}
async function eliminarPiloto(id) {
    const confirmacion = confirm('¿Seguro que quieres eliminar este piloto?');
    if (!confirmacion) return;

    await FetchAPI(`/api/pilotos/${id}`, {
        method: 'DELETE'
    });

    cargarPilotos();
}
async function eliminarEscuderia(id) {
    const confirmacion = confirm('¿Seguro que quieres eliminar esta escudería?');
    if (!confirmacion) return;

    await FetchAPI(`/api/escuderias/${id}`, {
        method: 'DELETE'
    });

    cargarEscuderias();
}
cargarSelectsPilotos();

    const btnGuardarPiloto = document.getElementById("btn-guardar-piloto");

if (btnGuardarPiloto) {
    btnGuardarPiloto.addEventListener("click", guardarPiloto);
}


    window.guardarPiloto = guardarPiloto;