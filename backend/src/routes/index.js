const express = require('express');

const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res) => {

    const libros = await pool.query('SELECT * FROM libro');
    res.json(libros)
})

module.exports = router; 