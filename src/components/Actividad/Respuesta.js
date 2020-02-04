

const pool = require('../../database/DBmanager')

class Respuesta {
    id;
    respuesta;

    constructor() {
        this.id = '';
        this.respuesta = '';
    }

    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id
    }

    setRespuesta(res) {
        this.respuesta = res
    }
    getRespuesta() {
        return this.respuesta;
    }

    async regristrarRespuesta() {

        let respuesta = {
            ID: this.getId(),
            RESPUESTA: this.getRespuesta()
        }
        try {
            const agregar = await pool.query('INSERT INTO RESPUESTA SET ?', [respuesta])
        } catch (error) {
            console.log(error)
        }
    }
    async actualizarRespuesta() {
        try {
            const actualizar = await pool.query('UPDATE RESPUESTA SET ? WHERE ID = ?', [{ RESPUESTA: this.getRespuesta() }, this.getId()])
        } catch (error) {

        }
    }
    async eliminarRespuesta(){
        try {
            const eliminar = await pool.query('DELETE FROM RESPUESTA WHERE ID = ?', [this.getId()])
        } catch (error) {
            
        }
    }
    async consultarNumero(){
        try {
            const consultar = await pool.query('SELECT ID FROM RESPUESTA WHERE ID = ?', [this.getId()])
            return consultar    
        } catch (error) {
            console.log(error)
        }

        
    }
}