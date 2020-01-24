const pool = require('../../database/DBmanager');
const generate = require('../../helper/genarateString');
class Administrador {

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

    actualizarActividad() {

    }
    eliminarActividad() {

    }
    async agregarActividad(actividad) {

        let result, id, numeros, tema, respuesta;
        do {
            id = generate.getString(10);
            result = await pool.query('SELECT ID FROM ACTIVIDAD WHERE ID = ? ', [id]);
        } while (result.length == 1);
        do {
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
        } while (result.length == 1);

        //hacer los insert 
        const actividad_send = {
            id: id,
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
    obtenerAdministrador() {
        return this;
    }


}

module.exports = Administrador;