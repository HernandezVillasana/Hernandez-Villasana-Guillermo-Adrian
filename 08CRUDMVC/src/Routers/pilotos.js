const express = require('express');
const router = express.Router();
const bd = require('../DB/databases');

router.get('/', async (req, res) => {
    try {
        const [pilotos] = await bd.execute(
            'SELECT * FROM pilotos ORDER BY id ASC'
        );

        res.json({
            status: 'success',
            data: pilotos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});



router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, equipo, pais, numero } = req.body;

        await bd.execute(
            `UPDATE pilotos
             SET nombre = ?, equipo = ?, pais = ?, numero = ?
             WHERE id = ?`,
            [nombre, equipo, pais, numero, id]
        );

        res.json({
            status: 'success',
            message: 'Piloto actualizado'
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});
router.post('/', async (req, res) => {
    try {
        const { nombre, equipo, pais, numero } = req.body;

        const [result] = await bd.execute(
            `INSERT INTO pilotos (nombre, equipo, pais, numero)
             VALUES (?, ?, ?, ?)`,
            [nombre, equipo, pais, numero]
        );

        res.json({
            status: 'success',
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;