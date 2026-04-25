// 1. Obtener el formulario
var formulario = document.getElementById("formRegistro");

// 2. Escuchar envío
formulario.addEventListener("submit", function(e) {

    e.preventDefault();

    // 3. Obtener valores
    var nombre = document.getElementById("nombre").value;
    var usuario = document.getElementById("usuario").value;
    var password = document.getElementById("password").value;
    var confirmar = document.getElementById("confirmar").value;

    // 4. Validar campos vacíos
    if (nombre === "" || usuario === "" || password === "" || confirmar === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    // 5. Validar contraseña
    if (password !== confirmar) {
        alert("Las contraseñas no coinciden");
        return;
    }

    // 6. Guardar usuario (simple)
    var usuarioGuardado = {
        nombre: nombre,
        usuario: usuario,
        password: password
    };

    localStorage.setItem("usuarioRegistrado", JSON.stringify(usuarioGuardado));

    alert("Registro exitoso");

    // 7. Redirigir al login
    window.location.href = "login.html";

});