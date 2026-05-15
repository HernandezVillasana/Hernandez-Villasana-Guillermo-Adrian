//primero se necesita generar un servidor para la aplicacion y ahi mismp montar nuestro bd
//modulos necesarios para el servidor
const http = require('http');
//modulo para leer los archivos del sistema
const fs = require('fs');
//el modulo para la ruta a identifiar el archivo que se esta solicitando
const path = require('path');
//modulo para extraer parametros de la url
const url = require('url');
// este modulo lo tenenmos que descarhgar con el comando npm intsall mysql2
const mysql = require('mysql2'); 
// configurar el servidor 
const PORT = process.env.PORT || 3000;
// VAMOS A CONECTARNOS A LA BD
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'M3m4z002',
    database: 'pnt_prectica1',
    waitForConnection: true,
    connectionLimit: 10, //maximo de conexiones simultaneas
    queueLimit: 0 // sin limite de espera para conexiones
});
//DEBEMOS CONFIGURAR LOS TIPOS DE CONTENIDO QUE VAMOS A SERVIR
const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
     '.ico': 'image/x-icon'
}
//esta funcion se encarga de mleer los archivos en la carpeta public y servirlos al cliente
function servirArchivoEstatico(filePath, res) {
let filePath = req .url === '/' ? 'index.html' : req.url == '/' ? 'index.html' : req.url;
    const fullpath = path.join(__dirname, 'public', filePath);
    const ext = path.extname(fullpath);
  const mimeType = mimeTypes[ext];
  if (mimeType) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    
  
    res.end('File not found');
    return;
  }
  //leemos el archivo cuando si existe 
  fs.readFile(fullpath, (error, contenido) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Error reading file');
      return;
    }
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(contenido);
  });
}
//debo de crear una promesa
const db = pool.promise();
//permite crear codigo asincrono con async await que tendra un tiempo de esperar para conectarse, procesarse y sar una respuesta
//debemos de atender cada una de las peticiones que venga por parte de la carpeta de public 
function leerBodys(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        //nosotros vamos a tener un evebnto que se dispara cada vez que llega un pedazo de los datos
        req.on('data', (chunk) => {
            body += chunk.toString();
        if (body.length > 1e6) {
            //si el cuerpo es demasiado grande, se rechaza la promesa para evitar ataques de denegacion de servicio
            req.connection.destroy();
            reject(new Error('Request body too large'));
        }
    });
        //cuando se termina de recibir todo el cuerpo de la peticion, se resuelve la promesa con el cuerpo completo
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(new Error('Invalid JSON in request body'));
            }
        });
        req.on('error', reject);
    });
}
//este elemento nos sirve para dae respuestas 
function enviarJSON(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data));
}
// recibir todas las peticiones por oparte cdñ geet o post y dependiendo de la ruta que se solicite se ejecuta una funcion diferente
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;
     console.log(`[$ {new Date().toLocaleString()}] ${method} ${pathname}`);
 servirArchivoEstatico(req,res);
    
        }
    

);
//iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ` + PORT);
    console.log('Para salir presiona crtl + c');
});