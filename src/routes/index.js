const express = require('express');
const helper = require('../helper/crypto');
const generate = require('../helper/genarateString');
const router = express.Router();
const pool = require('../database/DBmanager');

router.get('/', (req, res) => {
    res.send({
        res: "hola"
    })
})
router.post('/signin', async (req, res) => {
    let data = req.body;

    
    const response = await pool.query('SELECT * FROM USUARIOS WHERE UPPER(USERNAME) = ? ', [data.username.toLowerCase()])
    if (response.length == 1) {
        //Existe el usuario
        const data_sub = response[0];
        if (data.password == helper.decrypt(data_sub.PASSWORD, data_sub.USERNAME)) {
            //Contraseña correcta
            res.json({
                res: "OK"
            })
        } else {
            //Contraseña incorrecta
            res.json({
                res: "INCORRECT_PASSWORD"
            })
        }
    }
    else {
        //No existe el usuario
        res.json({
            res: "NOT_EXIST"
        })
    }
})
router.post('/userExist', async (req, res) => {
    const data = req.body;
    try {
        const consulta = await pool.query('SELECT * FROM USUARIOS WHERE UPPER(USERNAME) = ? OR UPPER(EMAIL) = ?', [data.username.toLowerCase(), data.username.toLowerCase()]);
        if (consulta.length == 1) {
            //Existe el usuario
            res.json({
                response: 'EXIST'
            })
        } else {
            res.json({
                response: 'NOT_EXIST'
            });
        }
    } catch (e) {
        console.log(e)
    }

});

router.post('/consultData',  async (req, res)=>{
    let data = req.body;
    try{
        const consult = await pool.query('SELECT * FROM USUARIOS WHERE UPPER(username) = ?', [data.username.toLowerCase()]);
        const consultDef = consult[0];
        console.log(consult);
        res.json({
            ID: consultDef.ID, 
            USERNAME: consultDef.USERNAME, 
            EMAIL: consultDef.EMAIL, 
            ADMIN: consultDef.ADMIN
        });
    }catch(e){
        console.log(e);
    }
})
router.post('/signup', async (req, res) => {
    let data = req.body;
    data.password = helper.encrypt(data.password, data.username);
    var idNickname; 
    let result;
    do {
        idNickname = generate.getString(10);
        if(data.check){
             result = await pool.query('SELECT ID FROM ADMINISTRADOR WHERE ID = ? ', [idNickname]);
        }else{
             result = await pool.query('SELECT ID FROM JUGADOR WHERE ID = ? ', [idNickname]);
        }
    } while (result.length == 1);
    result = null;
    const dataNickname = {
        ID: idNickname,
        NICKNAME: data.username
    }
    const dataUser = {
        ID: idNickname,
        USERNAME: data.username,
        EMAIL: data.email,
        PASSWORD: data.password, 
        ADMIN: data.check? 'SI': 'NO'
    }
    dataUser.EMAIL = dataUser.EMAIL.toLowerCase();
    try {
        const sendData = await pool.query('INSERT INTO USUARIOS SET ?', [dataUser]);
        if(data.check){
            const sendAdmin = await pool.query('INSERT INTO ADMINISTRADOR SET ?', [dataNickname]);
        }else{
            const sendJugador = await pool.query('INSERT INTO JUGADOR SET ? ', [dataNickname]);
        }
    } catch (er) {
        console.log(er);

    }
    res.json({
        res: "OK"
    })
})
module.exports = router; 