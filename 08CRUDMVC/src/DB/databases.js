const myasql = require('mysql2/promise');
const pool = myasql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'M3m4z002',
    database: 'practicaCrud',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
//la ex´portamos para usarla en otros archivos
module.exports = pool.promise();