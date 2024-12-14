const express = require('express');
const router = express.Router();
const pool = require('./db');

 //inicio de sesion
 router.post('/login', async (req, res) => { 
    const { dni, rol_id } = req.body; 
if (!dni || !rol_id) {
    return res.status(400).json({ success: false, message: 'DNI y rol son obligatorios' });
}
try {
    // Buscar al usuario en la base de datos
    const result = await pool.query('SELECT * FROM usuarios WHERE dni = $1 AND rol_id = $2', [dni, rol_id]);
    if (result.rows.length === 0) {
        res.json({ success: true, redirect: '/dashboard.html' });
        return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
    res.json({ success: true, message: 'Login exitoso', usuario: result.rows[0] });
} catch (error) {
    console.error('Error al autenticar usuario:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
}
});

// Registro
router.post('/api/register', async (req, res) => {
    const { nombre, dni, correo, rol_id } = req.body;
    if (!nombre || !dni || !correo || !rol_id) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }
    try {
        const fecha_registro = new Date(); // Fecha actual para el campo fecha_registro
        const result = await pool.query('INSERT INTO usuarios (dni, nombre, correo, fecha_registro, rol_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [dni, nombre, correo, fecha_registro, rol_id] );
    res.status(201).json({ success: true, usuario: result.rows[0] });
} catch (err) {
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
   }
});
//ruta para obtener todos los roles
router.get('/api/roles', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, nombre_rol FROM roles');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Error interno del servidor' });
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

// Endpoint para eliminar un permiso 
router.delete('/permisos/:id', async (req, res) => { 
    const { id } = req.params; 
    try { 
        const result = await pool.query('DELETE FROM permisos WHERE id_permiso = $1', [id]); 
        res.sendStatus(200); } catch (error) { 
            console.error('Error al eliminar el permiso:', error); 
            res.status(500).send('Error al eliminar el permiso'); 
        }
     });


module.exports = router;
