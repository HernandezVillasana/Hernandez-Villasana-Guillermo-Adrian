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
        const respuesta = await FetchAPI('/api/usuarios');
        cargarUsuarios.style.display = 'none';
        if (respuesta.data.length === 0) {
         cargarUsuarios.textContent = 'No hay usuarios registrados';
         cargarUsuarios.style.display = 'block';
      
        } else {
            tableUsuarios.style.display = 'table';
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${u.id}</td>
                <td>${respuesta.data[0].nombre}</td>
                <td>${respuesta.data[0].email}</td>
            `;
            tbodyUsuarios.appendChild(fila);
        }
    }
    catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}