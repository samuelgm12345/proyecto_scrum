// Mostrar solo una sección
function mostrarSeccion(id) {

    // Ocultar todas
    var secciones = document.querySelectorAll(".seccion");
    secciones.forEach(function(sec) {
        sec.classList.remove("activa");
    });

    // Mostrar la seleccionada
    document.getElementById(id).classList.add("activa");
}

// Mostrar HOME al iniciar
window.onload = function() {
    mostrarSeccion("home");
};