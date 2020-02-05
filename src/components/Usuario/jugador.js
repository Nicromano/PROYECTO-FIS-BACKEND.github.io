
var pool = require('../../database/DBmanager');
const generate = require('../../helper/genarateString');
const User = require('./usuario');
class Jugador {

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

    
    realizarTutorial() {

    }

}

module.exports = Jugador;