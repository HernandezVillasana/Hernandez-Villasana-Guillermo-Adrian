const express = require('express');
const router = express.Router();
const bd = require('../DB/databases');

// GET
router.get('/', async (req, res) => {
    const [campeones] = await bd.execute(
        'SELECT * FROM campeones ORDER BY anio DESC'
    );

    res.json({
        status: 'success',
        data: campeones
    });
});

// POST (CREAR)
router.post('/', async (req, res) => {
    const { anio, piloto, escuderia, puntos } = req.body;

    await bd.execute(
        'INSERT INTO campeones (anio, piloto, escuderia, puntos) VALUES (?, ?, ?, ?)',
        [anio, piloto, escuderia, puntos]
    );

    res.json({ status: 'success', message: 'Campeón creado' });
});

// PUT (EDITAR)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { anio, piloto, escuderia, puntos } = req.body;

    await bd.execute(
        'UPDATE campeones SET anio=?, piloto=?, escuderia=?, puntos=? WHERE id=?',
        [anio, piloto, escuderia, puntos, id]
    );

    res.json({ status: 'success', message: 'Campeón actualizado' });
});

module.exports = router;