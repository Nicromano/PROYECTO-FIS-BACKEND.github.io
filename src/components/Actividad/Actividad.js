const pool =require('../../database/DBmanager')

class Actividad {
    id;
    nivel;
    nombre;
    constructor(){
        this.id='';
        this.nivel = '';
        this.nombre = '';
    }
    obtenerId(){
        return this.id;
    }
    obtenerNombre(){
        return this.nombre;
    }
    obtenerNivel(){
        return this.nivel;
    }
    setId(id){
        this.id = id;
    }
    setNombre(nombre){
        this.nombre = nombre;
    }
    setNivel(nivel){
        this.nivel = nivel;
    }

     async obtenerActividades(){
        return pool.query('SELECT * FROM ACTIVIDAD');
    }
}

module.exports = Actividad;