const express = require('express');

const router = express.Router();
const pool = require('../database/database');

router.get('/',  (req, res) => {

   // const libros = await pool.query('SELECT * FROM libro');
    res.json({
        res: "hola"
    })
})
router.post('/signin', async(req, res)=>{
    console.log(req.body);
    res.send(req.body)
})

module.exports = router; 