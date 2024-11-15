const express = require('express');
const router = express.Router();
const pool = require('./db');

//ruta para obtener todos los roles
router.get('/roles', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM roles');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error:err.message });
    }
});


//Ruta para obtener permisos de un rol
router.get('/roles/:id/permisos', async (req, res) => {
    const { id } = req.params;
    try { 
        const result = await pool.query(
            'SELECT p.nombre_permiso FROM permisos p LEFT JOIN rol_permisos rp ON p.id = rp.permiso_id WHERE rp.rol_id = $1',
            [id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/permisos", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM permisos");
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener permisos:", error);
        res.status(500).send("Error del servidor");
    }
});

module.exports = router;