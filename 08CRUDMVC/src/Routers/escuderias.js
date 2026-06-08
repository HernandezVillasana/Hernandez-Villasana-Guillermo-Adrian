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
            data: escuderias,
            count: escuderias.length
        });

    } catch (error) {
        console.error('Error al obtener escuderias:', error.message);

        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;