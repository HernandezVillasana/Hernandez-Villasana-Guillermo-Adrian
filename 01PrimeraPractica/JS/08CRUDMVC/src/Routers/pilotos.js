
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
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});


router.get('/:id', async (req, res) => {
    try {

        const [rows] = await bd.execute(
            'SELECT * FROM pilotos WHERE id=?',
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Piloto no encontrado'
            });
        }

        res.json(rows[0]);

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

        await bd.execute(
            'INSERT INTO pilotos (nombre, equipo, pais, numero) VALUES (?, ?, ?, ?)',
            [nombre, equipo, pais, numero]
        );

        res.json({
            status: 'success',
            message: 'Piloto creado'
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {

        const { nombre, equipo, pais, numero } = req.body;

        await bd.execute(
            `UPDATE pilotos
             SET nombre=?, equipo=?, pais=?, numero=?
             WHERE id=?`,
            [nombre, equipo, pais, numero, req.params.id]
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

router.delete('/:id', async (req, res) => {
    try {

        await bd.execute(
            'DELETE FROM pilotos WHERE id=?',
            [req.params.id]
        );

        res.json({
            status: 'success',
            message: 'Piloto eliminado'
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;

