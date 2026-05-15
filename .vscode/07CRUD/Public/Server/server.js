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
