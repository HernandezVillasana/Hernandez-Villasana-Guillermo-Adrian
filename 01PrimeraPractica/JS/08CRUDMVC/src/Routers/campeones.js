
const express = require('express');
const router = express.Router();
const bd = require('../DB/databases');

router.get('/', async (req, res) => {
    try {

        const [campeones] = await bd.execute(
            'SELECT * FROM campeones ORDER BY anio DESC'
        );

        res.json({
            status: 'success',
            data: campeones
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
            'SELECT * FROM campeones WHERE id=?',
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Campeón no encontrado'
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

        const {
            anio,
            piloto,
            escuderia,
            puntos
        } = req.body;

        await bd.execute(
            'INSERT INTO campeones (anio, piloto, escuderia, puntos) VALUES (?, ?, ?, ?)',
            [anio, piloto, escuderia, puntos]
        );

        res.json({
            status: 'success',
            message: 'Campeón creado'
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

        const {
            anio,
            piloto,
            escuderia,
            puntos
        } = req.body;

        await bd.execute(
            `UPDATE campeones
             SET anio=?, piloto=?, escuderia=?, puntos=?
             WHERE id=?`,
            [
                anio,
                piloto,
                escuderia,
                puntos,
                req.params.id
            ]
        );

        res.json({
            status: 'success',
            message: 'Campeón actualizado'
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
            'DELETE FROM campeones WHERE id=?',
            [req.params.id]
        );

        res.json({
            status: 'success',
            message: 'Campeón eliminado'
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;
