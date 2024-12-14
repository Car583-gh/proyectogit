// Función para verificar si el usuario está autenticado
function verificarAutenticacion() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html';
    }
}

// Llama a la función de verificación cuando la página se carga
document.addEventListener("DOMContentLoaded", verificarAutenticacion);
