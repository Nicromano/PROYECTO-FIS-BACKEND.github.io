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
        return await pool.query('SELECT NOMBRE, NIVEL, TEMA, NUMEROS1, NUMEROS2, NUMEROS3, NUMEROS4, RESPUESTA  FROM ACTIVIDAD WHERE ID = ?', [id]);


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

    async actualizarActividad(datos, id) {
        try {
            const consult = this.consultarActividad(id)
            if (consult.length == 0) {

                return {
                    res: 'NOT_EXIST'
                }
            } else {
                let data_actividad = {
                    nombre: datos.nombre,
                    nivel: datos.nivel,
                    tema: datos.tema,
                    numeros1: datos.Alternativa1,
                    numeros2: datos.Alternativa2,
                    numeros3: datos.Alternativa3,
                    numeros4: datos.Alternativa4,
                    respuesta: datos.respuesta
                }
                const update = await pool.query('UPDATE ACTIVIDAD SET ? WHERE ID = ?', [data_actividad, id])
                return {
                    res: 'UPDATE_ACTIVITY'
                }
            }

        } catch (error) {
            console.log(error);
            return {
                res: error
            }
        }
    }
    async eliminarActividad(id) {

        try {
            const result = this.consultarActividad(id);
            if (result.length == 0) {
                return {
                    res: 'NO_EXIST'
                }
            } else {
                await pool.query('DELETE FROM USUARIO_SELECCION WHERE ACTIVIDAD = ?', [id]);
                await pool.query('DELETE FROM ACTIVIDAD WHERE ID = ?', [id]);
                return {
                    res: 'DELETE_COMPLETE'
                }
            }
        } catch (error) {
            return {
                res: error
            }
        }
    }
    async realizaActividad(data) {

        const realizada = await pool.query('SELECT ID, ESTADISTICAS FROM USUARIO_SELECCION WHERE JUGADOR = ? AND ACTIVIDAD = ?',
            [data.JUGADOR, data.ACTIVIDAD])
        if (realizada.length > 0) {
            await pool.query('UPDATE USUARIO_SELECCION SET ? WHERE ID = ?', [
                { SELECCION: data.ELECCION }, realizada[0].ID
            ]);

            const resultado = await pool.query('SELECT BIEN FROM ESTADISTICAS WHERE ID = ?', [realizada[0].ESTADISTICAS]);

            if (resultado[0].BIEN == 0) {
                return {
                    res: 'INCORRECT'
                }
            } else {
                return {
                    res: 'CORRECT'
                }
            }

        } else {
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

                const estatistic = await pool.query('SELECT BIEN FROM ESTADISTICAS WHERE ID = ?', [estadistica]);
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
    }
    async actividadesCreadas(id){
        let sql = "SELECT ID, NOMBRE, NIEVL FROM ACTIVIDAD WHERE ID = ?"

        try {
            const result = await pool.query(sql, [id])
            return {
                res: result
            }
        } catch (error) {
            return {
                res: error
            }
        }
    }

    async consultarActividad(id) {
        try {
            return await pool.query('SELECT ID FROM ACTIVIDAD WHERE ID = ? ', [id]);
        } catch (error) {
            console.log(error)
        }
    }
    async agregarActividad(actividad) {

        let result, id;
        do {
            id = generate.getString(10);
            result = this.consultarActividad(id)
        } while (result.length == 1);

        //hacer los insert 
        const actividad_send = {
            ID: id,
            NOMBRE: actividad.nombre,
            NIVEL: actividad.nivel,
            TEMA: actividad.tema,
            NUMEROS1: actividad.Alternativa1,
            NUMEROS2: actividad.Alternativa2,
            NUMEROS3: actividad.Alternativa3,
            NUMEROS4: actividad.Alternativa4,
            RESPUESTA: actividad.respuesta,
            ADMINISTRADOR: actividad.idAdministrador 
        };

        try {
            const send_activity = await pool.query('INSERT INTO ACTIVIDAD SET ? ', [actividad_send]);

        } catch (err) {
            console.log(err);
            return {
                res: 'ERROR_ACTIVIDAD'
            };
        }
        return {
            res: 'OK'
        };
    }
}

module.exports = Actividad;