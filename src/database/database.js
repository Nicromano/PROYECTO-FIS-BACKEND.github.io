const { administrador, jugador } = require('../key');
const { promisify } = require('util');

const mysql = require('mysql');

const pool = mysql.createPool(administrador);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('La conexion se ha perdido');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('No existe conexion en la base de datos');
        }

    }
    if (connection) {
        connection.release();
    }
    console.log('EL DBMS se ha conectado a la BD:', administrador.database);
    return;
});

pool.query = promisify(pool.query);
module.exports = pool;