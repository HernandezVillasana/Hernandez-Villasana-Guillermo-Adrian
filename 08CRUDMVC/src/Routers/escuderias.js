const express = require('express');
const router = express.Router();
const bd = require('../DB/databases');

// GET
router.get('/', async (req, res) => {
    const [escuderias] = await bd.execute(
        'SELECT * FROM escuderias ORDER BY nombre ASC'
    );

    res.json({
        status: 'success',
        data: escuderias
    });
});

// POST (CREAR)
router.post('/', async (req, res) => {
    const { nombre, pais, motor, titulos } = req.body;

    await bd.execute(
        'INSERT INTO escuderias (nombre, pais, motor, titulos) VALUES (?, ?, ?, ?)',
        [nombre, pais, motor, titulos]
    );

    res.json({ status: 'success', message: 'Escudería creada' });
});

// PUT (EDITAR)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, pais, motor, titulos } = req.body;

    await bd.execute(
        'UPDATE escuderias SET nombre=?, pais=?, motor=?, titulos=? WHERE id=?',
        [nombre, pais, motor, titulos, id]
    );

    res.json({ status: 'success', message: 'Escudería actualizada' });
});
// DELETE ESCUDERIA
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    await bd.execute(
        'DELETE FROM escuderias WHERE id=?',
        [id]
    );

    res.json({
        status: 'success',
        message: 'Escudería eliminada'
    });
});

module.exports = router;