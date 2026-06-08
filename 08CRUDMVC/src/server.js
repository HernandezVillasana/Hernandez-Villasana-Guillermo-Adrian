const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
//para poder aplicar el MVC necesitamos un intermediario que se va a encargar de recibir las peticiones y enviar las respuestas, este intermediario es el route, las envia a un controlador y el controlador se encarga de procesar la informacion y enviar una respuesta, el route se encarga de definir las rutas y los controladores que se van a encargar de cada ruta
app.use(cors());
//las peticiones las vamos a recibir en formato json, por lo que necesitamos un middleware para poder parsear el body de las peticiones, express.json() es un middleware que se encarga de parsear el body de las peticiones y convertirlo en un objeto json, para poder acceder a los datos de la peticion desde el controlador
app.use(express.json());
//se debe de tener una ruta personalizada para cada tipo de peticion next a la cual se va enntder el tipo de peticion o respuesta

app.use((req, res, next) => {
    console.log(`${new Date().toLocaleTimeString()} ${req.method} ${req.url}`);
    next();
});
//debemos definir las rutas de los archivos 
app.use(express.static(path.join(__dirname, '..', 'public')));
//vamos a manejar las rutas de los recursos que se van a obtener por medio de las peticiones o respuestas
//pueden existir rutas como /api/usuarios, /api/productos, etc, cada una de estas rutas va a tener un controlador que se va a encargar de procesar la informacion y enviar una respuesta
//router.get('/')
//router.get('/usuarios')
//router.post('/')
//router.get('/:id')

const usuariosRouter = require('./Routers/usuarios');
app.use('/api/usuarios', usuariosRouter);
//const productosRouter = require('./Routers/productos');
//const comprasRouter = require('./Routers/compras');
//app.use('/api/productos', productosRouter);
//app.use('/api/compras', comprasRouter);
//vamos a documentar cada endpoint 
app.get('/api', (req, res) => {
    res.json({
        status: 'success',
        message: 'Bienvenido a la API',
        endpoints: {
            usuarios: {
                listar: 'GET/api/usuarios',
                obtener: 'GET/api/usuarios/:id',
                CREAR: 'POST/api/usuarios',
                ACTUALIZAR: 'PUT/api/usuarios/:id',
                ELIMINAR: 'DELETE/api/usuarios/:id'
            },
      
            productos: {
                listar: 'GET/api/productos',
                obtener: 'GET/api/productos/:id',
                CREAR: 'POST/api/productos',
                ACTUALIZAR: 'PUT/api/productos/:id',
                ELIMINAR: 'DELETE/api/productos/:id'
            },
           
            compras: {
                listar: 'GET/api/compras',
                obtener: 'GET/api/compras/:id',
                CREAR: 'POST/api/compras',
                ACTUALIZAR: 'PUT/api/compras/:id',
                ELIMINAR: 'DELETE/api/compras/:id'
            },
        }
    });
});
//vamos a crear una funcion para rutas inexistentes.


app.use((err, req, res, next) => {
    console.log('error no manejado', err.message);
    res.status(500).json({
        status: 'error',
        message: 'Error interno del servidor'
    });
});
app.get('/test', (req, res) => {
    res.json({ ok: true });
});
app.listen(PORT, () => {
    console.log('Servidor inicializado ');
});


const pilotosRouter = require('./Routers/pilotos');
const campeonesRouter = require('./Routers/campeones');
const escuderiasRouter = require('./Routers/escuderias');

app.use('/api/pilotos', pilotosRouter);
app.use('/api/campeones', campeonesRouter);
app.use('/api/escuderias', escuderiasRouter);

// documentación API
app.get('/api', (req, res) => {
   
});

// 404 AL FINAL
app.use('/api', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Ruta no encontrada'
    });
});
