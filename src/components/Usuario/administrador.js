var pool = require('../../database/DBmanager');

class Administrador{

    id;
    nombre;

    constructor(){
        this.id = '';
        this.nombre = '';
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

    actualizarActividad(){

    }
    obtenerAdministrador(){
        return this;
    }


}