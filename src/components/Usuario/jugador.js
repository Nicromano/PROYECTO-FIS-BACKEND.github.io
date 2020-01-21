
var pool = require('../../database/DBmanager');

const User = require('./usuario');
class Jugador extends User {

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

    realizarActividad() {

    }
    realizarTutorial() {

    }
    obtenerJugador() {
        return this;
    }
}