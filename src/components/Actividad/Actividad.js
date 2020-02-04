const pool = require('../../database/DBmanager')
const timeago = require('../../helper/timeago');
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

    async actividadesRealizadas(idJugador) {
        try {
            const actividadesRealizadas = await pool.query('SELECT U.ACTIVIDAD, NOMBRE, NIVEL, FECHA, BIEN FROM USUARIO_SELECCION U JOIN ESTADISTICAS E ON U.ESTADISTICAS = E.ID  JOIN ACTIVIDAD A ON U.ACTIVIDAD = A.ID WHERE JUGADOR = ? ', [idJugador]);

            var act = []; 
            actividadesRealizadas.forEach(element => {
                act.push({
                    ACTIVIDAD: element.ACTIVIDAD,
                    NOMBRE: element.NOMBRE,
                    NIVEL: element.NIVEL,
                    BIEN: element.BIEN, 
                    FECHA: timeago.convertTime(element.FECHA)
                } 
                )
            });
           /*  const act = */
            return act;
        } catch (error) {
            return {
                res: error
            }
        }
    }
}

module.exports = Actividad;