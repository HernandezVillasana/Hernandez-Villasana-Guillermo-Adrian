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
            data: campeones,
            count: campeones.length
        });

    } catch (error) {
        console.error('Error al obtener campeones:', error.message);

        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;