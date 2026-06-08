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

module.exports = router;