// 1. Obtener el formulario
var formulario = document.getElementById("formRegistro");
const loginURL = "../login/login.html";

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
        password: password,
        saldo: 0
    };

    localStorage.setItem("usuarioRegistrado", JSON.stringify(usuarioGuardado));

    alert("Evento formulario: " + loginURL);

    // 7. Redirigir al login
    window.location.href = loginURL;

});

// REGISTRAR USUARIO

function registrarUsuario(){

    let nombre =
    document.getElementById("nombre").value;

    let correo =
    document.getElementById("correo").value;

    let password =
    document.getElementById("password").value;

    if(nombre == "" || correo == "" || password == ""){

        alert("Complete todos los campos");
        return;
    }

    let usuario = {

        nombre: nombre,
        correo: correo,
        password: password,
        saldo: 0

    };

    localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    );


    alert("Usuario registrado: " + loginURL);
    console.log("redirigiendo a: ", loginURL);

   window.location.href = loginURL;
}