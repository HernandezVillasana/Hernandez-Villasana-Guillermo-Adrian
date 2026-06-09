const express = require('express');
const router = express.Router();
const bd = require('../DB/databases');
const CAMPEONES = {
  2025: { piloto: "Max Verstappen", escuderia: "Red Bull", puntos: 0 },
  2024: { piloto: "Max Verstappen", escuderia: "Red Bull", puntos: 575 },
  2023: { piloto: "Max Verstappen", escuderia: "Red Bull", puntos: 575 },
  2022: { piloto: "Max Verstappen", escuderia: "Red Bull", puntos: 454 },
  2021: { piloto: "Max Verstappen", escuderia: "Red Bull", puntos: 395 },
  2020: { piloto: "Lewis Hamilton", escuderia: "Mercedes", puntos: 347 },
  2019: { piloto: "Lewis Hamilton", escuderia: "Mercedes", puntos: 413 },
  2018: { piloto: "Lewis Hamilton", escuderia: "Mercedes", puntos: 408 },
  2017: { piloto: "Lewis Hamilton", escuderia: "Mercedes", puntos: 363 },
  2016: { piloto: "Nico Rosberg", escuderia: "Mercedes", puntos: 385 },
  2015: { piloto: "Lewis Hamilton", escuderia: "Mercedes", puntos: 381 },
  2014: { piloto: "Lewis Hamilton", escuderia: "Mercedes", puntos: 384 },
  2013: { piloto: "Sebastian Vettel", escuderia: "Red Bull", puntos: 397 },
  2012: { piloto: "Sebastian Vettel", escuderia: "Red Bull", puntos: 281 },
  2011: { piloto: "Sebastian Vettel", escuderia: "Red Bull", puntos: 392 },
  2010: { piloto: "Sebastian Vettel", escuderia: "Red Bull", puntos: 256 }
};
// GET
 /* router.get('/', async (req, res) => {
    const [campeones] = await bd.execute(
        'SELECT * FROM campeones ORDER BY anio DESC'
    );

    res.json({
        status: 'success',
        data: campeones
    });
});  
*/ router.get('/', async (req, res) => {
    try {
        const [campeones] = await bd.execute('SELECT * FROM campeones');

        res.json({
            status: 'success',
            data: campeones
        });

    } catch (error) {
        console.error('ERROR BD:', error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
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
// DELETE (ELIMINAR)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    await bd.execute(
        'DELETE FROM campeones WHERE id=?',
        [id]
    );

    res.json({ status: 'success', message: 'Campeón eliminado' });
});
module.exports = router;