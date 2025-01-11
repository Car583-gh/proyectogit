document.addEventListener('DOMContentLoaded', () => {
// Manejo del formulario de registro
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const dni = document.getElementById('dni').value;
    const correo = document.getElementById('correo').value;
    const rol_id = document.getElementById('rol_id').value;
    const rol_nombre = document.getElementById('rol_nombre').value;

    // Enviar los datos al servidor para registrar el usuario
    fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, dni, correo, rol_id, rol_nombre })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Usuario registrado exitosamente');
            window.location.href = '/login.html'; // Redirige al login
        } else {
            alert('Error al registrar el usuario: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
    });
});
