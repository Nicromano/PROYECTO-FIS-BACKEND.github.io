const express = require('express');
const helper = require('../helper/crypto');
const router = express.Router();
const pool = require('../database/database');

router.get('/', (req, res) => {


    res.json({
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
router.post('/signup', async (req, res) => {
    let data = req.body;
    data.password = helper.encrypt(data.password, data.username);
    try {
        console.log(data)
        const sendData = await pool.query('INSERT INTO USUARIOS SET ?', [data]);

    } catch (error) {
        console.log(error)
    }
    res.json({
        res: "OK"
    })

})

module.exports = router; 