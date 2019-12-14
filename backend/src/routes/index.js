const express = require('express');

const router = express.Router();
const pool = require('../database/database');

router.get('/', async (req, res) => {

    const libros = await pool.query('SELECT * FROM libro');
    res.json(libros)
})
router.post('/signin', async(req, res)=>{
    console.log(req.body);
    res.send(req.body)
})

module.exports = router; 