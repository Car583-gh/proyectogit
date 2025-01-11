document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cerrarSesionBtn').addEventListener('click', cerrarSesion);
});

function cerrarSesion() {
    // Limpiar almacenamiento de sesión
    sessionStorage.clear();
    localStorage.clear();

    // Redirigir a la página de inicio de sesión
    window.location.href = 'login.html'; // Verifica que esta ruta es correcta
}

