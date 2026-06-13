const formUsuario = document.getElementById('form-usuario');
const inputID = document.getElementById('input-id');
const inputNombre = document.getElementById('input-Nombre');
const fecha = document.getElementById('input-fecha');
const Nota = document.getElementById('input-Nota');
const formTitulo = document.getElementById('form-titulo');


const btnGuardar = document.getElementById('btn-guardar');

const btnCancelar = document.getElementById('btn-cancelar');
const tbodyUsuarios = document.getElementById('tbody-usuarios');
const tableUsuarios = document.getElementById('table-usuarios');
const mensajeCargar = document.getElementById('mensaje-cargar');
const mensajeVacío = document.getElementById('mensaje-vacio');
const notificacionDiv = document.getElementById('notificacion');
//para errores
const errorNombre = document.getElementById('error-nombre');
const errorFecha = document.getElementById('error-fecha');
const errorNota = document.getElementById('error-nota');
// vamos a crear una API para poder hacer las operaciones de CRUD y para eso necesitamos un servidor que pueda manejar las peticiones HTTP, para eso vamos a usar el modulo http de node.js y tambien necesitaremos un modulo para manejar las rutas y otro para manejar los archivos estaticos, para eso vamos a usar el modulo url y el modulo fs respectivamente
const API_URL = 'http://localhost:3000/api/usuarios'; // URL de la API para usuarios
// por defecto recordemos que el metodo GET se utiliza para obtener datos, el metodo POST se utiliza para crear nuevos datos, el metodo PUT se utiliza para actualizar datos existentes y el metodo DELETE se utiliza para eliminar datos, entonces vamos a crear funciones para cada uno de estos metodos y asi poder hacer las operaciones de CRUD en nuestra aplicacion
// vamos a crear una funcion para obtener todos los usuarios de la API y mostrarlos en la tabla, esta funcion se va a llamar cada vez que se cargue la pagina y cada vez que se haga una operacion de CRUD para actualizar la tabla con los datos mas recientes
async function cargarUsuarios() {
    try {
        //vamos a utilizar el metodo fetch para hacer la peticion a la API, el metodo fetch devuelve una promesa que se resuelve con la respuesta de la API, entonces vamos a esperar a que se resuelva la promesa y luego vamos a convertir la respuesta a formato JSON para poder trabajar con los datos
        const response = await fetch(API_URL);
        // si responde ok nos da un estado de 200 a 299, entonces vamos a verificar si la respuesta es ok antes de convertirla a JSON, si no es ok vamos a lanzar un error con el mensaje de la respuesta
        if (!response.ok) {
            throw new Error(`Error al cargar usuarios: ${response.status} ${response.statusText}`);
        }
        const usuarios = await response.json();
        mostrarUsuarios(usuarios);
    renderizarTabla(usuarios);
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        mensajeCargar.textContent = 'Error al cargar usuarios';
    }
}