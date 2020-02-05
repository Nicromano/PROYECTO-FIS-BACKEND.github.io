const express = require('express');
const router = express.Router();
const User = require('../components/Usuario/usuario');
const Administrador = require('../components/Usuario/administrador');
const Actividad = require('../components/Actividad/Actividad');
const Jugador = require('../components/Usuario/jugador');


router.get('/', (req, res) => {
    res.send({
        res: "holaaa"
    })
});
router.post('/signin', async (req, res) => {
    let data = req.body;
    usuario = new User();
    usuario.setNombre(data.username);
    usuario.setContrasena(data.password);
    const result = await usuario.autenticarUsuario();
    res.json(result);

});

router.get('/actividadesRealizadas/:id', async (req, res) => {
    let data = req.params.id;

    actividad = new Actividad();
    const resultado = await actividad.actividadesRealizadas(data);
    
    res.json(resultado);

})
router.post('/realizaActividad', async (req, res) => {
    let data = req.body;
    jugador = new Jugador();
    const result = await jugador.realizaActividad(data);
    res.json(result);
});

router.post('/consultData', async (req, res) => {
    let data = req.body;
    usuario = new User();
    usuario.setNombre(data.username);
    const result = await usuario.consultarUsuario();
    res.json(result);
});

router.post('/signup', async (req, res) => {
    let data = req.body;
    usuario = new User();
    usuario.setNombre(data.username);
    usuario.setCorreo(data.email);
    usuario.setContrasena(data.password);
    usuario.setAdmin(data.admin);
    const result = await usuario.registrarUsuario();
    res.json(result);
});

router.post('/agregarActividad', async (req, res) => {
    let data = req.body;

    console.log(data);
    /* administrador = new Administrador();
    administrador.setId(data.idAdministrador);
    let result = await administrador.agregarActividad(data);
    res.json(result) */
});

router.get('/ObtenerActividades', async (req, res) => {

    actividad = new Actividad();
    const actividades = await actividad.obtenerActividades(-1);
    res.json(actividades)
});

router.get('/obtenerActividad/:id', async (req, res) => {

    let id = req.params.id;
    actividad = new Actividad();
    const consult = await actividad.obtenerActividades(id);
    res.json(consult);
})
router.post('/actualizaActividad', async (req, res) => {

    let datos = req.body.data;
    let id = req.body.id;
    administrador = new Administrador();
    const resultado = await administrador.actualizarActividad(datos, id);
    res.json(resultado);

})

router.get('/eliminarActividad/:id', async (req, res) => {
    id = req.params.id;
    administrador = new Administrador();
    const response = await administrador.eliminarActividad(id);
    res.json(response);

})
module.exports = router;


