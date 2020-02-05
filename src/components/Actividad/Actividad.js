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

    async actualizarActividad(datos, id) {


        try {
            const consult = await pool.query('SELECT TEMA, NUMEROS, RESPUESTA FROM ACTIVIDAD WHERE ID = ?', [id]);

            let data_actividad = {
                nombre: datos.nombre,
                nivel: datos.nivel
            }
            await pool.query('UPDATE ACTIVIDAD SET ? WHERE ID = ?', [data_actividad, id])

            console.log(consult[0]);
            await pool.query('UPDATE TEMA SET ? WHERE ID = ?', [{ tema: datos.tema }, consult[0].TEMA]);

            let data_numeros = {
                numero1: datos.Alternativa1,
                numero2: datos.Alternativa2,
                numero3: datos.Alternativa3,
                numero4: datos.Alternativa4
            }
            await pool.query('UPDATE NUMEROS SET ? WHERE ID = ?', [data_numeros, consult[0].NUMEROS]);
            await pool.query('UPDATE RESPUESTA SET ? WHERE ID = ?', [{respuesta: datos.respuesta}, consult[0].RESPUESTA]);
            return {
                res: 'UPDATE_ACTIVITY'
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
            const ids = await pool.query('SELECT TEMA, NUMEROS, RESPUESTA FROM ACTIVIDAD WHERE ID = ? ', [id]);
            console.log(ids[0], ids[0].TEMA);
            await pool.query('DELETE FROM USUARIO_SELECCION WHERE ACTIVIDAD = ?', [id]);
            await pool.query('DELETE FROM ACTIVIDAD WHERE ID = ?', [id]);
            await pool.query('DELETE FROM TEMA WHERE ID = ?', [ids[0].TEMA]);
            await pool.query('DELETE FROM NUMEROS WHERE ID = ?', [ids[0].NUMEROS]);
            await pool.query('DELETE FROM RESPUESTA WHERE ID = ?', [ids[0].RESPUESTA]);

            return {
                res: 'DELETE_COMPLETE'
            }
        } catch (error) {
            return {
                res: error
            }
        }

    }

    async consultarActividad(id){
        try {
            return await pool.query('SELECT ID FROM ACTIVIDAD WHERE ID = ? ', [id]);
        } catch (error) {
            console.log(error)
        }
    }
    async agregarActividad(actividad) {

        let result, id, numeros, tema, respuesta;
        do {
            id = generate.getString(10);
            result = await pool.query('SELECT ID FROM ACTIVIDAD WHERE ID = ? ', [id]);
        } while (result.length == 1);
         /*do {
            tema = generate.getString(10);
            result = await pool.query('SELECT ID FROM ACTIVIDAD WHERE TEMA = ? ', [tema]);
        } while (result.length == 1);
        do {
            numeros = generate.getString(10);
            result = await pool.query('SELECT ID FROM ACTIVIDAD WHERE NUMEROS = ? ', [numeros]);
        } while (result.length == 1);
        do {
            respuesta = generate.getString(10);
            result = await pool.query('SELECT ID FROM ACTIVIDAD WHERE RESPUESTA = ? ', [respuesta]);
        } while (result.length == 1); */

        //hacer los insert 
        const actividad_send = {
            id: id,
            nombre: actividad.nombre,
            nivel: actividad.nivel,
            tema: tema,
            numeros: numeros,
            respuesta: respuesta,
            administrador: this.getId()
        };
        const tema_send = {
            id: tema,
            tema: actividad.tema
        }
        const numeros_send = {
            id: numeros,
            numero1: actividad.Alternativa1,
            numero2: actividad.Alternativa2,
            numero3: actividad.Alternativa3,
            numero4: actividad.Alternativa4,
        }
        const respueta_send = {
            id: respuesta,
            respuesta: actividad.respuesta
        }
        switch (actividad.respuesta) {
            case '1':
                actividad.respuesta = actividad.Alternativa1;
                break;
            case '2':
                actividad.respuesta = actividad.Alternativa2;
                break;
            case '3':
                actividad.respuesta = actividad.Alternativa3;
                break;
            case '4':
                actividad.respuesta = actividad.Alternativa4;
                break;
        }

        try {
            const send_tema = await pool.query('INSERT INTO TEMA SET ?', [tema_send])
            const send_numeros = await pool.query('INSERT INTO NUMEROS SET ?', [numeros_send])
            const send_respueta = await pool.query('INSERT INTO RESPUESTA SET ?', [respueta_send])
            const send_activity = await pool.query('INSERT INTO ACTIVIDAD SET ? ', [actividad_send]);

        } catch (err) {
            console.log(err);
            return {
                res: err
            };
        }

        return {
            res: 'OK'
        };
    }
}

module.exports = Actividad;