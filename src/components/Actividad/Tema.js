
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

        const eliminaTema = await pool.query('DELETE FROM TEMA WHERE ID = ?', [this.getId()]);
    }
}

module.exports = Tema;