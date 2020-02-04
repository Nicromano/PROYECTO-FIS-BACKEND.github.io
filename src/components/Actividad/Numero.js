const pool = require('../../database/DBmanager');

class Numero {

    id = '';
    numero1 = '';
    numero2 = '';
    numero3 = '';
    numero4 = '';

    constructor() {
        this.id = '';
        this.numero1 = '';
        this.numero2 = '';
        this.numero3 = '';
        this.numero4 = '';
    }

    getId() {
        return id;
    }
    setId(id) {
        this.id = id;
    }

    setNumero1(n) {
        this.numero1 = n
    }
    setNumero2(n) {
        this.numero2 = n
    }
    setNumero3(n) {
        this.numero3 = n
    }
    setNumero4(n) {
        this.numero4 = n
    }
    getNumero1(){
        return this.numero1
    }
    getNumero2(){
        return this.numero2
    }
    getNumero3(){
        return this.numero3
    }
    getNumero4(){
        return this.numero4;
    }

    async agregarNumero(){

        let numeros = {
            ID: this.getId(), 
            NUMERO1: this.getNumero1(), 
            NUMERO2: this.getNumero2(),
            NUMERO3: this.getNumero3(),
            NUMERO4: this.getNumero4()
        }
        try {
            const insertar = await pool.query('INSERT INTO NUMERO SET ?', [numeros])
        } catch (error) {
            console.log(error)
        }
    }

    async actualizarNumero(){
        let numeros = {
            NUMERO1: this.getNumero1(), 
            NUMERO2: this.getNumero2(),
            NUMERO3: this.getNumero3(),
            NUMERO4: this.getNumero4()
        }

        try {
            const actualizar = await pool.query('UPDATE NUMEROS SET ? WHERE ID = ?', [numeros, this.getId()])
        } catch (error) {
            console.log(error)
        }
    }

    async eliminarNumero(){
        try {
            const eliminar = await pool.query('DELETE FROM NUMEROS WHERE ID = ?', [this.getId()])
        } catch (error) {
            console.log(error)
        }
    }

    async consultarNumero(){
        //Consulta tema antes de ingresar

        try {
            const consultar = await pool.query('SELECT ID FROM NUMEROS WHERE ID = ?', [this.getId()]);
            return consultar;
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Numero;