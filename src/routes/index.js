const express = require('express');
const router = express.Router();
const User = require('../components/Usuario/usuario');
const Administrador = require('../components/Usuario/administrador');
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

router.post('/sendImg', (req, res) => {

    console.log(req.body);

})
router.post('/consultData', async (req, res) => {
    let data = req.body;
    usuario = new User();
    usuario.setNombre(data.username);
    const result = await usuario.consultarUsuario();
    res.json(result);

})

router.post('/signup', async (req, res) => {
    let data = req.body;
    usuario = new User();
    usuario.setNombre(data.username);
    usuario.setCorreo(data.email);
    usuario.setContrasena(data.password);
    usuario.setAdmin(data.admin);
    const result = await usuario.registrarUsuario();
    res.json(result);

})

router.post('/agregarActividad', async (req, res) => {
    let data = req.body;
    administrador = new Administrador();
    administrador.setId(data.idAdministrador);
    let result = await administrador.agregarActividad(data);
    res.json(result)
})
module.exports = router; 