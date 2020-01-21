
var pool = require('../../database/DBmanager');

const User =  require('./usuario');
class Jugador extends User{

    id;
    nombre;

    constructor(id, nombre){
        this.id = id;
        this.nombre = nombre;


        pool.query()
    }

    getId(){
        return this.id;
    }

    getNombre(){
        return this.nombre;
    }
    setId(id){
        this.id = id;
    }
    setNombre(nombre){
        this.nombre = nombre
    }
}