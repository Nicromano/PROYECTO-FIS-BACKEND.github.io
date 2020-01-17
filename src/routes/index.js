const express = require('express');
const helper = require('../helper/crypto');
const generate = require('../helper/genarateString');
const router = express.Router();
const pool = require('../database/DBmanager');
const User = require('../components/usuario');
router.get('/', (req, res) => {
    res.send({
        res: "hola"
    })
})
router.post('/signin', async (req, res) => {
    let data = req.body;
    usuario = new User();
    usuario.setNombre(data.username);
    usuario.setContrasena(data.password);
    const result = await usuario.autenticarUsuario();
    res.json(result);

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
router.post('/sendImg', (req, res) => {

    console.log(req.body);

})
router.post('/consultData', async (req, res) => {
    let data = req.body;
    usuario = new User();
    usuario.setNombre(data.username);
    const result =  await usuario.consultarUsuario();
    res.json(result);

    /* try {
        const consult = await pool.query('SELECT * FROM USUARIOS WHERE UPPER(username) = ?', [data.username.toLowerCase()]);
        const consultDef = consult[0];
        console.log(consult);
        res.json({
            ID: consultDef.ID,
            USERNAME: consultDef.USERNAME,
            EMAIL: consultDef.EMAIL,
            ADMIN: consultDef.ADMIN,
            IMG: consultDef.IMG
        });
    } catch (e) {
        console.log(e);
    } */
})
router.post('/signup', async (req, res) => {
    let data = req.body;
    usuario = new User();
    usuario.setNombre(data.username);
    usuario.setCorreo(data.email);
    usuario.setContrasena(data.password);
    usuario.setAdmin(data.check);
    const result = await usuario.registrarUsuario();
    res.json(result);

})
module.exports = router; 