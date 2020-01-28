const pool = require('../../database/DBmanager')

class Actividad {
    id;
    nivel;
    nombre;
    constructor() {
        this.id = '';
        this.nivel = '';
        this.nombre = '';
    }
    obtenerId() {
        return this.id;
    }
    obtenerNombre() {
        return this.nombre;
    }
    obtenerNivel() {
        return this.nivel;
    }
    setId(id) {
        this.id = id;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    setNivel(nivel) {
        this.nivel = nivel;
    }

   async obtenerActividades(id) {
        //Si el parametro envia es -1 consulta todas las actividades, caso contrario consulta la actividad efectudada por el id
        if (id == -1) {
            return await pool.query('SELECT * FROM ACTIVIDAD');
        }
        return await pool.query('SELECT NOMBRE, NIVEL, T.TEMA, NUMERO1, NUMERO2, NUMERO3, NUMERO4, R.RESPUESTA  FROM ACTIVIDAD A JOIN TEMA T ON A.TEMA = T.ID JOIN NUMEROS N ON N.ID = A.NUMEROS JOIN RESPUESTA R ON R.ID = A.RESPUESTA WHERE A.ID = ?', [id]);

    }

}

module.exports = Actividad;