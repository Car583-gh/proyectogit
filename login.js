document.addEventListener('DOMContentLoaded',() => {
    //Manejo del formulario de login
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const dni = document.getElementById('dni').value;
    const rolId = document.getElementById('rol').value;

    // Enviar los datos al servidor para verificar el login
    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dni, rol_id: rolId })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            if(data.token) {
        localStorage.setItem('token', data.token); // Guardar el token
    }
        alert('Login exitoso');
        console.log('Usuario autenticado:', data.usuario);
        window.location.href = 'http://localhost:3000/dashboard.html'; // Redirigir al dashboard despues del login
    } else {
        alert('Credenciales incorrectas: ' + data.message);
    }
})
.catch(error => console.error('Error: ', error));
    });
});
