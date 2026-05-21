// 1. Obtener el formulario
var formulario = document.querySelector("form");

// 2. Escuchar cuando el usuario envía el formulario
formulario.addEventListener("submit", function(e) {

    // Evita que la página se recargue
    e.preventDefault();

    // 3. Obtener valores de los inputs
    var usuario = document.querySelector("input[type='text']").value;
    var contraseña = document.querySelector("input[type='password']").value;

    // 4. Validar campos vacíos
    if (usuario === "" || contraseña === "") {
        alert("Por favor completa todos los campos");
        return;
    }

    if (usuario === "admin" && contraseña === "1234") {

        alert("Inicio de sesión correcto");
        window.location.href = "dashboard.html";

    } else {
        alert("Usuario o contraseña incorrectos");
    }

});

function iniciarSesion(){

    // Obtener usuario guardado
    var datos = JSON.parse(localStorage.getItem("usuarioRegistrado"));


    let correo =
    document.getElementById("correo").value;

    let password =
    document.getElementById("password").value;


    if(datos.usuario === correo && datos.password === password) {

        alert("Inicio de sesión correcto");
        window.location.href = "../home/home.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }

    if(
        correo == usuarioGuardado.correo &&
        password == usuarioGuardado.password
    ){

        localStorage.setItem(
            "sesionActiva",
            "true"
        );

        window.location.href =
"../home/home.html";
    }
    else{

        alert("Datos incorrectos");
    }
}