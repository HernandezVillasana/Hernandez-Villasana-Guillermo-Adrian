//aqui necesitamos crear el orden ara que el controlodaros ibtenga la peticion, sepa la ruta para poderls tender y de shi se conecte a la base de datos para obtener la informacion y procesarla y enviar una respuesta
const express = require('express');
const router = express.Router();
//este rouyter se va a encargar de manejar las rutas de los usuarios, es decir, las peticiones que se van a hacer para obtener, crear, actualizar o eliminar usuarios
const bd = require('../DB/databases');
//por cada accion debo de programarb los elemtos corresponcientes del usuario
//funcion para validar user y pass
function validarUsuario(usuario) {
    const errors = [];
    if (!usuario.nombre || typeof usuario.nombre !== 'string' || usuario.nombre.trim().length < 2) {
        errors.push('El nombre es obligatorio y debe ser una cadena de texto con al menos 2 caracteres.');
    }
    if(!data.email || typeof usuario.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.email)) {
        errors.push('El email es obligatorio y debe ser un correo electrónico válido.');
    }
    else{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(usuario.email)) {
            errors.push('El email es obligatorio y debe ser un correo electrónico válido.');
        }
    }
    return errors;
}
//vamos a mostar todos los usuairods 
router.get('/', async (req, res) => {
    try {
        const [usuarios] = await bd.execute ('SELECT id, nombre, email, created_at, updated_at FROM usuarios order by id ASC   ');
        res.json({
            status: 'success',
            data: usuarios,
            count: usuarios.length,
            
            

        });
    } catch (error) {
        console.log('Error al obtener los usuarios:', error.message);
        res.status(500).json({  
            status: 'error',
            message: 'Error interno del servidor'
        });
        
    }   
    
});

//vamos a mostrar un usuario por id
module.exports = router;
