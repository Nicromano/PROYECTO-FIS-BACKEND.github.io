
const pool = require('../../database/DBmanager');
class Tema {

    id;
    tema;
    constructor() {
        this.id = '';
        this.tema = '';
    }

    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }

    setTema(tema) {
        this.tema = tema;
    }
    getTema() {
        return this.tema
    }
    async eliminarTema() {

        try {
            const eliminaTema = await pool.query('DELETE FROM TEMA WHERE ID = ?', [this.getId()]);

        } catch (error) {
            console.log(error)
        }
    }
    async agregarTema() {
        try {
            const agregar = await pool.query('INSERT INTO ACTIVIDAD SET ?', [{
                ID: this.getId(),
                TEMA: this.getTema()
            }])

        } catch (error) {
            console.log(error)
        }
    }
    async actualizarTema() {
        let tema_send = {
            TEMA: this.getTema()
        }
        try {

            const actualiza = await pool.query('UPDATE TEMA SET ? WHERE ID = ?', [tema_send, this.getId()])
        } catch (error) {
            console.log(error)
        }
    }

    consultarTema(){
        try {
            const consultar = await pool.query('SELECT ID FROM TEMA WHERE ID = ?', [this.getId()])
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Tema;