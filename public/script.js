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
        const selectElement = document.getElementById('roles'); 
        const selectValue = selectElement.value; 
        if (selectValue){
        console.log(`Obteniendo permisos para el rol: ${selectValue}`);
        obtenerPermisos(selectValue);
    } else {
        console.warn("No se selecciono ningun rol.");
    }
    }
    // Función para agregar un nuevo rol a la base de datos 
    async function agregarNuevoRol(nombre) { 
        try { 
            const response = await fetch(`${apiUrl}/roles`, { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nombre }) }); 
                if (response.ok) { 
                    await obtenerRoles(); // Refresca el menú desplegable de roles 
                    mostrarMensajeExito("Rol añadido correctamente."); } 
                    else { mostrarMensajeError('Error al agregar el nuevo rol.'); } 
                } catch (error) { 
                    console.error("Error al agregar el nuevo rol:", error); 
                    mostrarMensajeError('Error al agregar el nuevo rol.'); } }
  
// mostrar mensajes de exito y error
function mostrarMensajeExito(mensaje = "Accion realizada con exito.") {
    const successMessage = document.getElementById("successMessage");
    if (successMessage) {
        successMessage.textContent = mensaje;
        successMessage.style.display = "block";
        setTimeout(() => (successMessage.style.display = "none"), 3000);
    }
}

function mostrarMensajeError(mensaje = "Ocurrio un error.") {
    const errorMessage = document.getElementById("errorMessage");
    if (errorMessage) {
        errorMessage.textContent = mensaje;
        errorMessage.style.display = "block";
        setTimeout(() => (errorMessage.style.display = "none"), 3000);
    }
}

// Llamar a la función para obtener roles al cargar la página
document.addEventListener("DOMContentLoaded", obtenerRoles);

// Agregar evento para manejar cambios en el menú desplegable
const selectRoles = document.getElementById("roles");
if (selectRoles) {
    selectRoles.addEventListener("change", manejarSeleccionRol);
}
