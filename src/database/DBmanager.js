const { root} = require('../key');
const { promisify } = require('util');
const mysql = require('mysql');
const pool = mysql.createPool(root);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('La conexion se ha perdido');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('No existe conexion en la base de datos');
        }
        if(err.code === 'ER_NOT_SUPPORTED_AUTH_MODE'){
            console.log('Client does not support authentication protocol requested by server');
        }

    }
    if (connection) {
        connection.release();
    }
    console.log('EL DBMS se ha conectado a la BD:', root.database);
    console.log('Usuario:', root.user);
    return;
});

pool.query = promisify(pool.query);
module.exports = pool;