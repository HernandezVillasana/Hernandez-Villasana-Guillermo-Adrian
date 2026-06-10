
const express = require('express');
const router = express.Router();
const bd = require('../DB/databases');

router.get('/', async (req, res) => {
    try {

        const [escuderias] = await bd.execute(
            'SELECT * FROM escuderias ORDER BY nombre ASC'
        );

        res.json({
            status: 'success',
            data: escuderias
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
            'SELECT * FROM escuderias WHERE id=?',
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Escudería no encontrada'
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
            nombre,
            pais,
            motor,
            titulos
        } = req.body;

        await bd.execute(
            'INSERT INTO escuderias (nombre, pais, motor, titulos) VALUES (?, ?, ?, ?)',
            [nombre, pais, motor, titulos]
        );

        res.json({
            status: 'success',
            message: 'Escudería creada'
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
            nombre,
            pais,
            motor,
            titulos
        } = req.body;

        await bd.execute(
            `UPDATE escuderias
             SET nombre=?, pais=?, motor=?, titulos=?
             WHERE id=?`,
            [
                nombre,
                pais,
                motor,
                titulos,
                req.params.id
            ]
        );

        res.json({
            status: 'success',
            message: 'Escudería actualizada'
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
            'DELETE FROM escuderias WHERE id=?',
            [req.params.id]
        );

        res.json({
            status: 'success',
            message: 'Escudería eliminada'
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;
