// ======================================
// CONTRODOLLAR - HOME.JS
// ======================================

// ===============================
// VARIABLES GLOBALES
// ===============================

let capitalInicial = 0;

let movimientos = [];


// ===============================
// MOSTRAR SECCIONES
// ===============================

function mostrarSeccion(id){

    let secciones =
    document.querySelectorAll(".seccion");

    secciones.forEach(function(sec){

        sec.classList.remove("activa");
    });

    document.getElementById(id)
    .classList.add("activa");
}


// ===============================
// CARGAR USUARIO
// ===============================

function cargarUsuario(){

    let usuario =
    JSON.parse(
        localStorage.getItem("usuarioRegistrado")
    );

    if(usuario){

        document.getElementById(
            "nombreUsuario"
        ).textContent =
        usuario.nombre;
    }
}


// ===============================
// MENSAJES VISUALES
// ===============================

function mostrarMensaje(texto, tipo){

    let mensaje =
    document.getElementById("mensaje");

    mensaje.innerHTML = `
    
        <div class="alerta ${tipo}">
            ${texto}
        </div>
    `;

    setTimeout(function(){

        mensaje.innerHTML = "";

    }, 3000);
}


// ===============================
// GUARDAR CAPITAL
// ===============================

function guardarCapital(){

    let valor =
    document.getElementById("capitalInput").value;

    capitalInicial = Number(valor);

    // VALIDAR
    if(
        isNaN(capitalInicial) ||
        capitalInicial <= 0
    ){

        mostrarMensaje(
            "Ingrese un capital válido",
            "error"
        );

        return;
    }

    // GUARDAR EN STORAGE
    localStorage.setItem(
        "capitalInicial",
        capitalInicial
    );

    actualizarResumen();

    actualizarEstadisticas();

    mostrarMensaje(
        "Capital guardado correctamente",
        "success"
    );
}


// ===============================
// AGREGAR MOVIMIENTO
// ===============================

function agregarMovimiento(){

    let descripcion =
    document.getElementById("descripcion").value;

    let monto =
    Number(
        document.getElementById("monto").value
    );

    let tipo =
    document.getElementById("tipo").value;

    let categoria =
    document.getElementById("categoria").value;

    // VALIDACIONES
    if(
        descripcion.trim() === "" ||
        isNaN(monto) ||
        monto <= 0
    ){

        mostrarMensaje(
            "Complete correctamente los campos",
            "error"
        );

        return;
    }

    // OBJETO
    let movimiento = {

        id: Date.now(),

        descripcion: descripcion,

        monto: monto,

        tipo: tipo,

        categoria: categoria,

        fecha: new Date()
        .toLocaleDateString()
    };

    // GUARDAR EN ARRAY
    movimientos.push(movimiento);

    // LOCAL STORAGE
    localStorage.setItem(
        "movimientos",
        JSON.stringify(movimientos)
    );

    // ACTUALIZAR
    mostrarMovimientos();

    actualizarResumen();

    actualizarEstadisticas();

    limpiarFormulario();

    mostrarMensaje(
        "Movimiento agregado correctamente",
        "success"
    );
}


// ===============================
// MOSTRAR MOVIMIENTOS
// ===============================

function mostrarMovimientos(){

    renderizarMovimientos(movimientos);
}


// ===============================
// RENDERIZAR TABLA
// ===============================

function renderizarMovimientos(lista){

    let tabla =
    document.getElementById(
        "tablaMovimientos"
    );

    tabla.innerHTML = "";

    lista.forEach(function(mov){

        let colorClase = "";

        if(mov.tipo == "Ingreso"){

            colorClase = "bg-success";
        }
        else{

            colorClase = "bg-danger";
        }

        tabla.innerHTML += `

        <tr>

            <td>${mov.descripcion}</td>

            <td>$${mov.monto}</td>

            <td>

                <span class="badge ${colorClase}">
                    ${mov.tipo}
                </span>

            </td>

            <td>${mov.categoria}</td>

            <td>${mov.fecha}</td>

            <td>

                <button
                class="btn btn-danger btn-sm"
                onclick="eliminarMovimiento(${mov.id})"
                >
                    Eliminar
                </button>

            </td>

        </tr>
        `;
    });
}


// ===============================
// FILTRAR MOVIMIENTOS
// ===============================

function filtrarMovimientos(){

    let categoria =
    document.getElementById(
        "filtroCategoria"
    ).value;

    if(categoria === "Todos"){

        mostrarMovimientos();

        return;
    }

    let filtrados =
    movimientos.filter(function(mov){

        return mov.categoria === categoria;
    });

    renderizarMovimientos(filtrados);
}


// ===============================
// ELIMINAR MOVIMIENTO
// ===============================

function eliminarMovimiento(id){

    movimientos =
    movimientos.filter(function(mov){

        return mov.id !== id;
    });

    // ACTUALIZAR STORAGE
    localStorage.setItem(
        "movimientos",
        JSON.stringify(movimientos)
    );

    mostrarMovimientos();

    actualizarResumen();

    actualizarEstadisticas();

    mostrarMensaje(
        "Movimiento eliminado",
        "success"
    );
}


// ===============================
// ACTUALIZAR RESUMEN
// ===============================

function actualizarResumen(){

    let totalIngresos = 0;

    let totalEgresos = 0;

    movimientos.forEach(function(mov){

        if(mov.tipo == "Ingreso"){

            totalIngresos += mov.monto;
        }
        else{

            totalEgresos += mov.monto;
        }
    });

    let balance =
    capitalInicial +
    totalIngresos -
    totalEgresos;

    document.getElementById(
        "capitalTexto"
    ).textContent =
    "$" + capitalInicial;

    document.getElementById(
        "ingresosTexto"
    ).textContent =
    "$" + totalIngresos;

    document.getElementById(
        "egresosTexto"
    ).textContent =
    "$" + totalEgresos;

    document.getElementById(
        "balanceTexto"
    ).textContent =
    "$" + balance;
}


// ===============================
// ESTADÍSTICAS
// ===============================

function actualizarEstadisticas(){

    // TOTAL MOVIMIENTOS
    document.getElementById(
        "totalMovimientos"
    ).textContent =
    movimientos.length;

    // CATEGORÍA MÁS USADA
    let contador = {};

    movimientos.forEach(function(mov){

        if(contador[mov.categoria]){

            contador[mov.categoria]++;
        }
        else{

            contador[mov.categoria] = 1;
        }
    });

    let categoriaTop = "Ninguna";

    let max = 0;

    for(let categoria in contador){

        if(contador[categoria] > max){

            max = contador[categoria];

            categoriaTop = categoria;
        }
    }

    document.getElementById(
        "categoriaTop"
    ).textContent =
    categoriaTop;

    // ESTADO FINANCIERO
    let balance =
    capitalInicial;

    movimientos.forEach(function(mov){

        if(mov.tipo == "Ingreso"){

            balance += mov.monto;
        }
        else{

            balance -= mov.monto;
        }
    });

    let estado = "Estable";

    if(balance < 0){

        estado = "Crítico";
    }

    document.getElementById(
        "balanceEstado"
    ).textContent =
    estado;
}


// ===============================
// LIMPIAR FORMULARIO
// ===============================

function limpiarFormulario(){

    document.getElementById(
        "descripcion"
    ).value = "";

    document.getElementById(
        "monto"
    ).value = "";
}


// ===============================
// CARGAR DATOS STORAGE
// ===============================

function cargarDatos(){

    // CAPITAL
    let capitalGuardado =
    localStorage.getItem(
        "capitalInicial"
    );

    if(capitalGuardado){

        capitalInicial =
        Number(capitalGuardado);
    }

    // MOVIMIENTOS
    let movimientosGuardados =
    localStorage.getItem(
        "movimientos"
    );

    if(movimientosGuardados){

        movimientos =
        JSON.parse(movimientosGuardados);
    }

    mostrarMovimientos();

    actualizarResumen();

    actualizarEstadisticas();
}


// ===============================
// CALCULADORA FINANCIERA
// ===============================

function calcularFinanzas(){

    let ingresos = Number(
        document.getElementById(
            "ingresoMensual"
        ).value
    );

    let gastos = Number(
        document.getElementById(
            "gastosMensuales"
        ).value
    );

    // VALIDAR
    if(
        isNaN(ingresos) ||
        isNaN(gastos) ||
        ingresos <= 0 ||
        gastos < 0
    ){

        mostrarMensaje(
            "Ingrese valores válidos",
            "error"
        );

        return;
    }

    let ahorro =
    ingresos - gastos;

    let resultado =
    document.getElementById(
        "resultadoCalculadora"
    );

    resultado.innerHTML = `
    
        <h5>
            Resultado Financiero
        </h5>

        <p>
            Ingresos:
            <strong>$${ingresos}</strong>
        </p>

        <p>
            Gastos:
            <strong>$${gastos}</strong>
        </p>

        <p>
            Ahorro estimado:
            <strong>$${ahorro}</strong>
        </p>
    `;

    if(ahorro >= 0){

        resultado.style.border =
        "1px solid #22c55e";
    }
    else{

        resultado.style.border =
        "1px solid #ef4444";
    }
}


// ===============================
// CERRAR SESIÓN
// ===============================

function cerrarSesion(){

    localStorage.removeItem(
        "sesionActiva"
    );

    mostrarMensaje(
        "Sesión cerrada",
        "success"
    );

    setTimeout(function(){

        window.location.href =
        "../login/login.html";

    }, 1000);
}


// ===============================
// CARGAR TODO AL INICIAR
// ===============================

window.onload = function(){

    mostrarSeccion("home");

    cargarUsuario();

    cargarDatos();

    let fecha = new Date();

    document.getElementById(
        "fechaActual"
    ).textContent =
    fecha.toLocaleDateString();
}