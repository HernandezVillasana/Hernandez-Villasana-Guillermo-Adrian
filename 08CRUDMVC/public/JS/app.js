/*
Vamos atener unsa estructura mrdiante la cual implementamos el modelo vista controlqdor, en donde a partir del uso de una API podemos consumir los elemtos por oa¿parte del front para obtener sus datos como peticion o como respuest adel back
*/
const apiMetodo = document.getElementById('api-metodo');
const apiURL = document.getElementById('api-url');
const apiCodigo = document.getElementById('api-codigo');
const notificacionDIV = document.getElementById('notificacion');
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
            </tr>
        `;
    });
}