var pool = require('../../database/DBmanager');

class Administrador{

    id;
    nombre;

    constructor(id, nombre){
        this.id = id;
        this.nombre = nombre;
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