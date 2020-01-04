const express = require('express');
const helper = require('../helper/crypto');
const generate = require('../helper/genarateString');
const router = express.Router();
const pool = require('../database/database');

router.get('/', (req, res) => {
    res.send({
        res: "hola"
    })
})
router.post('/signin', async (req, res) => {
    let data = req.body;
    const response = await pool.query('SELECT * FROM USUARIOS WHERE USERNAME = ? ', [data.username])
    
    if(response.length == 1){
        //Existe el usuario
        const data_sub = response[0];
        if(data.password == helper.decrypt(data_sub.PASSWORD, data_sub.USERNAME)){
            //Contraseña correcta
            res.json({
                res: "OK"
            })
        }else{
            //Contraseña incorrecta
            res.json({
                res: "INCORRECT_PASSWORD"
            })
        }
    }
    else{
        //No existe el usuario
        res.json({
            res: "NOT_EXIST"
        })
    }
})
router.post('/userExist',  async (req, res)=>{
    const data = req.body;
    try{
        const consulta = await pool.query('SELECT * FROM USUARIOS WHERE USERNAME = ? OR EMAIL = ?', [data.username, data.username])
        if(consulta.length== 1){
            //Existe el usuario
            res.json({
                response: 'EXIST'
            })
        }else{
            res.json({
                response: 'NOT_EXIST'
            });
        }
    }catch(e){
        console.log(e)
    }

})
router.post('/signup', async (req, res) => {
    let data = req.body;
    data.password = helper.encrypt(data.password, data.username);
    const idNickname = generate.getString(10)
    
    const dataNickname = {
        ID: idNickname, 
        NICKNAME: data.username
    }
    const dataUser = {
        ID: idNickname, 
        USERNAME: data.username, 
        EMAIL: data.email, 
        PASSWORD: data.password
    }
    try {
        const sendData = await pool.query('INSERT INTO USUARIOS SET ?', [dataUser]);
        const sendNickname = await pool.query('INSERT INTO JUGADOR SET ? ', [dataNickname]);

    } catch (er) {
       res.json({
           res: 'ERROR', 
           error: er
       })
        
    }
    res.json({
        res: "OK"
    })
})
module.exports = router; 