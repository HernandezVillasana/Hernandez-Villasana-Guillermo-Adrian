const express = require('express');
const router = express.Router();
const bd = require('../DB/databases');
const F1_PILOTOS = {
  "Max Verstappen": { equipo: "Red Bull", pais: "Países Bajos" },
  "Sergio Pérez": { equipo: "Red Bull", pais: "México" },
  "Lewis Hamilton": { equipo: "Ferrari", pais: "Reino Unido" },
  "Charles Leclerc": { equipo: "Ferrari", pais: "Mónaco" },
  "Lando Norris": { equipo: "McLaren", pais: "Reino Unido" }
};

const PILOTOS = Object.keys(F1_PILOTOS);
const EQUIPOS = [...new Set(Object.values(F1_PILOTOS).map(p => p.equipo))];
const PAISES = [...new Set(Object.values(F1_PILOTOS).map(p => p.pais))];
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

    const { nombre, equipo, pais, numero } = req.body;

    if (!PILOTOS.includes(nombre)) {
        return res.status(400).json({ message: "Piloto inválido" });
    }

    if (!EQUIPOS.includes(equipo)) {
        return res.status(400).json({ message: "Equipo inválido" });
    }

    if (!PAISES.includes(pais)) {
        return res.status(400).json({ message: "País inválido" });
    }

    if (numero < 1 || numero > 87) {
        return res.status(400).json({ message: "Número fuera de rango" });
    }

    await bd.execute(
        'INSERT INTO pilotos (nombre, equipo, pais, numero) VALUES (?, ?, ?, ?)',
        [nombre, equipo, pais, numero]
    );

    res.json({ status: 'success', message: 'Piloto creado' });
});
// DELETE PILOTO
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    await bd.execute(
        'DELETE FROM pilotos WHERE id=?',
        [id]
    );

    res.json({
        status: 'success',
        message: 'Piloto eliminado'
    });
});

module.exports = router;