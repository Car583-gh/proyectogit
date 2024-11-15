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
        //limpiar el menu desplegable antes de agregar opciones
        selectRoles.innerHTML = '<option value="">-- Selecciona un Rol --</option>';

//Verificar cada objeto de rol
        roles.forEach((rol, index) => {
            console.log(`Rol[${index}]:`,rol);

            //crear una nueva opcion
            const option = document.createElement("option");
            option.value = rol.id;
            option.textContent = rol.nombre;
            selectRoles.appendChild(option);
        });
        console.log("Opciones agregadas al menu desplegable.");
    } catch (error) {
        console.error("Error al obtener roles:", error);
    }
}

// aplicar estilos al menu desplegable despues de cargar las opciones
const select = document.getElementById('roles');
select.style.color
select.style.backgroundColor = 'beige';
//aplicar estilos a cada opcion del menu
for (let i = 0; i < select.options.length; i++){
    select.options[i].style.color = 'black';
}

//llamar a la funcion para cargar los roles al cargar la pagina
obtenerRoles();

// Obtener permisos de un rol seleccionado
async function obtenerPermisos() {
    const selectElement = document.getElementById('selectRol').value;
    const selectValue = selectElement ? selectElement.value : null;

    try {
        const response = await fetch(`${apiUrl}/roles/${rolId}/permisos`);
        if (!response.ok) {
            throw new Error("Error en la respuesta de la API");
        }
        const permisos = await response.json();
        console.log("Permisos recibidos:", permisos);

        const listaPermisos = document.getElementById("listaPermisos");
        listaPermisos.innerHTML = ""; // Limpiar la lista

        permisos.forEach((permiso, index) => {
            console.log(`Permiso[${index}]:`, permiso);

            const listItem = document.createElement("li");
            listItem.textContent = permiso.nombre_permiso;
            listaPermisos.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error al obtener permisos:", error);
    }
}

// Llamar a la función para obtener roles al cargar la página
document.addEventListener("DOMContentLoaded", obtenerRoles);