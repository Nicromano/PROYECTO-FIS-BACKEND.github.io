
var pool = require('../../database/DBmanager');
const generate = require('../../helper/genarateString');
const User = require('./usuario');
class Jugador  {

    id;
    nombre;

    constructor() {
        this.id = '';
        this.nombre = '';
    }

    getId() {
        return this.id;
    }

    getNombre() {
        return this.nombre;
    }
    setId(id) {
        this.id = id;
    }
    setNombre(nombre) {
        this.nombre = nombre
    }

    async realizaActividad(data) {

        let id_tabla, estadistica, result;
        do {
            id_tabla = generate.getString(10);
            result = await pool.query('SELECT ID FROM USUARIO_SELECCION WHERE ID = ? ', [id_tabla]);
        } while (result.length == 1);
        do {
            estadistica = generate.getString(10);
            result = await pool.query('SELECT ID FROM ESTADISTICAS WHERE ID = ? ', [estadistica]);
        } while (result.length == 1);

        let datos = {
            ID: id_tabla,
            JUGADOR: data.JUGADOR,
            ACTIVIDAD: data.ACTIVIDAD,
            SELECCION: data.ELECCION,
            ESTADISTICAS: estadistica
        }

        try {
            const consult = await pool.query('INSERT INTO USUARIO_SELECCION SET ?', [datos]);

            const estatistic = await pool.query('SELECT BIEN, MAL FROM ESTADISTICAS WHERE ID = ?', [estadistica]);
            console.log(estatistic);
            if (estatistic[0].BIEN == 0) {
                return {
                    res: 'INCORRECT'
                }
            } else {
                return {
                    res: 'CORRECT'
                }
            }
        } catch (error) {
            return {
                res: error
            }
        }
    }
    realizarTutorial() {

    }
    
}

module.exports = Jugador;