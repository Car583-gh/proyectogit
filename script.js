const apiUrl = "http://localhost:3000";

// Obtener roles desde la API
async function obtenerRoles() {
    try {
        console.log("Obteniendo roles...");
        const response = await fetch(`${apiUrl}/roles`);
        if (!response.ok) {
            throw new Error("Error en la respuesta de la API");
        }

        const roles = await response.json();
        console.log("Roles recibidos:", roles);

        const selectRoles = document.getElementById("roles");
        selectRoles.innerHTML = '<option value="">-- Selecciona un Rol --</option>'; 
        roles.forEach(rol => { 
            const option = document.createElement("option"); 
            option.value = rol.id; 
            option.textContent = rol.nombre; 
            selectRoles.appendChild(option); 
        }); 
} catch (error) {
        console.error("Error al obtener roles:", error);
    }
}

// Mostrar el prompt para agregar un nuevo rol 
function mostrarPromptRol() { 
    const nuevoNombre = prompt("Introduce el nombre del nuevo rol:"); 
    if (nuevoNombre) { 
        agregarNuevoRol(nuevoNombre); 
    }
 }
    // Manejar la selección del menú desplegable de roles 
    function manejarSeleccionRol() { 
        const selectElement = document.getElementById('selectRol'); 
        const selectValue = selectElement.value; 
        console.log(`Obteniendo permisos para el rol: ${selectValue}`);
    }

    // Función para agregar un nuevo rol a la base de datos 
    async function agregarNuevoRol(nombre) { 
        try { 
            const response = await fetch(`${apiUrl}/roles`, { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nombre }) }); 
                if (response.ok) { 
                    obtenerRoles(); // Refresca el menú desplegable de roles 
                    mostrarMensajeExito("Rol añadido correctamente."); } 
                    else { mostrarMensajeError('Error al agregar el nuevo rol.'); } 
                } catch (error) { 
                    console.error("Error al agregar el nuevo rol:", error); 
                    mostrarMensajeError('Error al agregar el nuevo rol.'); } }
  
// mostrar mensajes de exito y error
function mostrarMensajeExito() {
    document.getElementById('successMessage').style.display = 'block';
    document.getElementById('errorMessage').style.display = 'none';
}

function mostrarMensajeError() {
    document.getElementById('errorMessage').style.display = 'block';
    document.getElementById('successMessage').style.display = 'none';
}
// Llamar a la función para obtener roles al cargar la página
document.addEventListener("DOMContentLoaded", obtenerRoles);
