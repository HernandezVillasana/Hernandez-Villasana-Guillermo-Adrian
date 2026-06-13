const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pnt_prectica1'
});

app.get('/api/usuarios', (req, res) => {
    res.send('Servidor funcionando');
});

app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
});