var pool = require('../../database/DBmanager');
const helper = require('../../helper/crypto');
const generate = require('../../helper/genarateString');
class User {
    id;
    nombre;
    contrasena;
    correo;
    admin;
    img;

    constructor() {
        this.id = '';
        this.correo = '';
        this.nombre = '';
        this.contrasena = ''
        this.admin = true;
        this.img = '';
    }

    async autenticarUsuario() {
        let data = {
            username: this.getNombre(),
            password: this.getContrasena()

        };
        const response = await pool.query('SELECT * FROM USUARIOS WHERE UPPER(USERNAME) = ? ', [data.username.toUpperCase()])
        if (response.length == 1) {
            const data_sub = response[0];
            if (data.password == helper.decrypt(data_sub.PASSWORD, data_sub.USERNAME)) {
                return {
                    res: "OK"
                }
            } else {
                return {
                    res: "INCORRECT_PASSWORD"
                }
            }
        }
        else {
            return {
                res: "NOT_EXIST"
            }
        }
    }

    destruirSesionDB(){
        pool.destroy();
    }
    async registrarUsuario() {
        let data = {
            username: this.getNombre(),
            password: this.getContrasena(),
            email: this.getCorreo(),
            admin: this.getAdmin()
        };
        try{
            const user_email = await this.consultarUsuario(null);
            if(user_email != null){
                return {
                    res: "USER_EXIST"
                }
            }
        }catch(e){
            console.log(e);
        }
        data.password = helper.encrypt(data.password, data.username);
        var idNickname;
        let result;
        do {
            idNickname = generate.getString(10);
            result = this.consultarUsuario(idNickname)
        } while (result == null);
        result = null;
        

        const dataUser = {
            ID: idNickname,
            USERNAME: data.username,
            EMAIL: data.email,
            PASSWORD: data.password,
            ADMIN: data.admin ? 'SI' : 'NO'
        }
        dataUser.EMAIL = dataUser.EMAIL.toLowerCase();
        try {
            const sendData = await pool.query('INSERT INTO USUARIOS SET ?', [dataUser]);
            
        } catch (er) {
            console.log(er);
            return {
                res: er
            }

        }
        return {
            res: "OK"
        }
    }
    async consultarUsuario(id) {
        let data = {
            username: this.getNombre(), 
            email: this.getCorreo()
        };
        let consult = null;
        try {

            if(id == null){

                 consult = await pool.query('SELECT * FROM USUARIOS WHERE USERNAME = ? OR EMAIL = ?', [data.username, data.email]);
            }else{
                consult = await pool.query('SELECT * FROM USUARIOS WHERE ID = ?', [id]);
            }
            if (consult.length > 0) {
                const consultDef = consult[0];
                return {
                    ID: consultDef.ID,
                    USERNAME: consultDef.USERNAME,
                    EMAIL: consultDef.EMAIL,
                    ADMIN: consultDef.ADMIN,
                    IMG: consultDef.IMG
                };
            }else{
                
                return null;
            }
        } catch (e) {
            console.log(e);
        }
    }

    
    setId(id) {
        this.id = id;
    }
    setImg(img) {
        this.img = img;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    setContrasena(contrasena) {
        this.contrasena = contrasena;
    }
    setCorreo(correo) {
        this.correo = correo;
    }
    setAdmin(admin) {
        this.admin = admin;
    }

    getId() {
        return this.id;
    }
    getNombre() {
        return this.nombre;
    }
    getContrasena() {
        return this.contrasena;
    }
    getCorreo() {
        return this.correo;
    }
    getAdmin() {
        return this.admin;
    }
    getImg() {
        return this.img;
    }
}


module.exports = User;