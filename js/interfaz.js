
/* INTERFAZ PRINCIPAL */

// Lista de participantes
let participantes = [];

// Ventana de ayuda
let ventanaAyuda = null;

// Control del panel
let panelPreparado = false;
const panelIframe = document.querySelector("#iframe-panel");


// PARTICIPANTES INICIALES

function crearParticipantesIniciales() {
    const fecha = new Date();

    participantes = [
        {
            id: 1,
            nombre: "Ana López",
            edad: 17,
            tipo: "Estudiante",
            modalidad: "Presencial",
            experiencia: 1.5,
            fecha: new Date(fecha.getTime() - 3000).toISOString()
        },
        {
            id: 2,
            nombre: "Carlos Ruiz",
            edad: 28,
            tipo: "Profesional",
            modalidad: "Online",
            experiencia: 6,
            fecha: new Date(fecha.getTime() - 2000).toISOString()
        },
        {
            id: 3,
            nombre: "Lucía Martín",
            edad: 35,
            tipo: "Ponente",
            modalidad: "Presencial",
            experiencia: 8.5,
            fecha: new Date(fecha.getTime() - 1000).toISOString()
        }
    ];
}


// INICIAR LA PÁGINA

function inicializarInterfaz() {
    crearParticipantesIniciales();

    document.querySelector("#formulario-participante")
        .addEventListener("submit", guardarParticipante);

    document.querySelector("#formulario-participante")
        .addEventListener("reset", limpiarMensajesFormulario);

    document.querySelector("#btn-mayusculas")
        .addEventListener("click", function () {
            cambiarFormatoNombre("mayusculas");
        });

    document.querySelector("#btn-minusculas")
        .addEventListener("click", function () {
            cambiarFormatoNombre("minusculas");
        });

    document.querySelector("#btn-quitar-espacios")
        .addEventListener("click", function () {
            cambiarFormatoNombre("espacios");
        });

    document.querySelector("#buscar-nombre")
        .addEventListener("input", aplicarFiltros);

    document.querySelector("#filtrar-modalidad")
        .addEventListener("change", aplicarFiltros);

    document.querySelector("#btn-exportar")
        .addEventListener("click", exportarJSON);

    document.querySelector("#btn-importar")
        .addEventListener("click", importarJSON);

    document.querySelector("#btn-guardar-preferencias")
        .addEventListener("click", guardarPreferencias);

    document.querySelector("#btn-restablecer-preferencias")
        .addEventListener("click", restablecerPreferencias);

    document.querySelector("#btn-abrir-ayuda")
        .addEventListener("click", abrirAyuda);

    document.querySelector("#btn-cerrar-ayuda")
        .addEventListener("click", cerrarAyuda);

    window.addEventListener("message", recibirMensajePanelEnPrincipal);

    cargarPreferencias();
    actualizarInterfaz();

    panelIframe.src = "panel.html";
}


// CAMBIAR EL FORMATO DEL NOMBRE

function cambiarFormatoNombre(formato) {
    const nombre = document.querySelector("#nombre");

    if (formato === "mayusculas") {
        nombre.value = nombre.value.toUpperCase();
    }

    if (formato === "minusculas") {
        nombre.value = nombre.value.toLowerCase();
    }

    if (formato === "espacios") {
        nombre.value = nombre.value.trim();
    }
}


// LIMPIAR LOS MENSAJES DE ERROR

function limpiarMensajesFormulario() {
    document.querySelector("#error-nombre").textContent = "";
    document.querySelector("#error-edad").textContent = "";
    document.querySelector("#error-tipo").textContent = "";
    document.querySelector("#error-modalidad").textContent = "";
    document.querySelector("#error-experiencia").textContent = "";
    document.querySelector("#mensaje-alta").textContent = "";
}


// VALIDAR EL FORMULARIO

function validarFormulario(nombre, textoEdad, tipo, modalidad, textoExperiencia) {
    let valido = true;

    const edad = Number(textoEdad);
    const experiencia = Number(textoExperiencia);

    limpiarMensajesFormulario();

    if (!validarNombre(nombre)) {
        document.querySelector("#error-nombre").textContent =
            "Escribe un nombre de entre 2 y 60 caracteres.";
        valido = false;
    }

    if (
        textoEdad.trim() === "" ||
        !Number.isInteger(edad) ||
        edad < 0 ||
        edad > 120
    ) {
        document.querySelector("#error-edad").textContent =
            "La edad debe ser un número entero entre 0 y 120.";
        valido = false;
    }

    if (!validarTipo(tipo)) {
        document.querySelector("#error-tipo").textContent =
            "Selecciona un tipo permitido.";
        valido = false;
    }

    if (!validarModalidad(modalidad)) {
        document.querySelector("#error-modalidad").textContent =
            "Selecciona una modalidad permitida.";
        valido = false;
    }

    if (
        textoExperiencia.trim() === "" ||
        !Number.isFinite(experiencia) ||
        experiencia < 0 ||
        experiencia > 10
    ) {
        document.querySelector("#error-experiencia").textContent =
            "La experiencia debe estar entre 0 y 10.";
        valido = false;
    }

    return valido;
}


// CREAR UN IDENTIFICADOR

function crearId() {
    let id = new Date().getTime();
    let repetido = true;

    while (repetido) {
        repetido = false;

        for (let i = 0; i < participantes.length; i++) {
            if (participantes[i].id === id) {
                id++;
                repetido = true;
                break;
            }
        }
    }

    return id;
}


// AÑADIR UN PARTICIPANTE

function guardarParticipante(evento) {
    evento.preventDefault();

    const nombre = document.querySelector("#nombre").value;
    const textoEdad = document.querySelector("#edad").value;
    const tipo = document.querySelector("#tipo").value;
    const modalidad = document.querySelector("#modalidad").value;
    const textoExperiencia = document.querySelector("#experiencia").value;

    const valido = validarFormulario(
        nombre,
        textoEdad,
        tipo,
        modalidad,
        textoExperiencia
    );

    if (!valido) {
        document.querySelector("#mensaje-alta").textContent =
            "Revisa los errores antes de continuar.";
        return;
    }

    const nuevo = {
        id: crearId(),
        nombre: nombre.trim(),
        edad: Number(textoEdad),
        tipo: tipo,
        modalidad: modalidad,
        experiencia: Number(textoExperiencia),
        fecha: new Date().toISOString()
    };

    participantes.push(nuevo);

    document.querySelector("#formulario-participante").reset();

    document.querySelector("#mensaje-alta").textContent =
        "Participante añadido correctamente.";

    actualizarInterfaz();
}


// AÑADIR UNA LÍNEA A UNA TARJETA

function crearLineaTarjeta(tarjeta, etiqueta, valor) {
    const parrafo = document.createElement("p");

    parrafo.textContent = etiqueta + ": " + valor;

    tarjeta.append(parrafo);
}


// MOSTRAR LOS PARTICIPANTES

function mostrarParticipantes(datos) {
    const contenedor = document.querySelector("#lista-participantes");

    contenedor.textContent = "";

    if (datos.length === 0) {
        document.querySelector("#mensaje-listado").textContent =
            "No hay participantes.";
        return;
    }

    document.querySelector("#mensaje-listado").textContent =
        "Participantes mostrados: " + datos.length;

    for (let i = 0; i < datos.length; i++) {
        const participante = datos[i];

        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";

        const titulo = document.createElement("h3");
        titulo.textContent = participante.nombre;
        tarjeta.append(titulo);

        crearLineaTarjeta(tarjeta, "Identificador", participante.id);

        crearLineaTarjeta(
            tarjeta,
            "Edad",
            participante.edad + " años (" +
            clasificarEdad(participante.edad) + ")"
        );

        crearLineaTarjeta(tarjeta, "Tipo", participante.tipo);
        crearLineaTarjeta(tarjeta, "Modalidad", participante.modalidad);

        crearLineaTarjeta(
            tarjeta,
            "Experiencia",
            participante.experiencia + " años (" +
            clasificarExperiencia(participante.experiencia) + ")"
        );

        const fecha = new Date(participante.fecha);

        crearLineaTarjeta(
            tarjeta,
            "Inscripción",
            fecha.toLocaleDateString("es-ES")
        );

        const boton = document.createElement("button");
        boton.type = "button";
        boton.textContent = "Eliminar participante";

        boton.addEventListener("click", function () {
            eliminarParticipante(participante.id);
        });

        tarjeta.append(boton);
        contenedor.append(tarjeta);
    }
}


// ELIMINAR UN PARTICIPANTE

function eliminarParticipante(id) {
    const confirmar = window.confirm("¿Quieres eliminar este participante?");

    if (!confirmar) {
        return;
    }

    const nuevaLista = [];

    for (let i = 0; i < participantes.length; i++) {
        if (participantes[i].id !== id) {
            nuevaLista.push(participantes[i]);
        }
    }

    participantes = nuevaLista;

    actualizarInterfaz();
}


// BUSCAR PARTICIPANTES Y APLICAR FILTROS

function aplicarFiltros() {
    const texto = document.querySelector("#buscar-nombre").value;
    const modalidad = document.querySelector("#filtrar-modalidad").value;

    const resultados = filtrarParticipantes(
        participantes,
        texto,
        modalidad
    );

    mostrarParticipantes(resultados);
}


// MOSTRAR LAS ESTADÍSTICAS

function agregarEstadistica(contenedor, titulo, valor) {
    const bloque = document.createElement("div");

    const nombre = document.createElement("strong");
    nombre.textContent = titulo;

    const dato = document.createElement("p");
    dato.textContent = valor;

    bloque.append(nombre);
    bloque.append(dato);
    contenedor.append(bloque);
}


function mostrarEstadisticas() {
    const contenedor = document.querySelector("#estadisticas");

    contenedor.textContent = "";

    const datos = calcularEstadisticas(participantes);

    if (datos.total === 0) {
        agregarEstadistica(contenedor, "Total", "Sin datos");
        document.querySelector("#primer-menor").textContent = "Sin datos";
        return;
    }

    agregarEstadistica(contenedor, "Total", datos.total);

    agregarEstadistica(
        contenedor,
        "Menores",
        datos.menores
    );

    agregarEstadistica(
        contenedor,
        "Mayores",
        datos.mayores
    );

    agregarEstadistica(
        contenedor,
        "Edad media",
        datos.edadMedia.toFixed(1)
    );

    agregarEstadistica(
        contenedor,
        "Edad mínima",
        datos.edadMinima
    );

    agregarEstadistica(
        contenedor,
        "Edad máxima",
        datos.edadMaxima
    );

    agregarEstadistica(
        contenedor,
        "Presenciales",
        datos.modalidades.Presencial
    );

    agregarEstadistica(
        contenedor,
        "Online",
        datos.modalidades.Online
    );

    agregarEstadistica(
        contenedor,
        "Estudiantes",
        datos.tipos.Estudiante
    );

    agregarEstadistica(
        contenedor,
        "Profesionales",
        datos.tipos.Profesional
    );

    agregarEstadistica(
        contenedor,
        "Ponentes",
        datos.tipos.Ponente
    );

    if (datos.experienciaPresencialMedia === null) {
        agregarEstadistica(
            contenedor,
            "Experiencia presencial media",
            "Sin participantes presenciales"
        );
    } else {
        agregarEstadistica(
            contenedor,
            "Experiencia presencial media",
            datos.experienciaPresencialMedia.toFixed(1)
        );
    }

    const menor = obtenerPrimerMenor(participantes);

    if (menor === null) {
        document.querySelector("#primer-menor").textContent =
            "No hay menores de edad.";
    } else {
        document.querySelector("#primer-menor").textContent =
            menor.nombre + " (" + menor.edad + " años)";
    }
}


// ACTUALIZAR LA PÁGINA

function actualizarInterfaz() {
    aplicarFiltros();
    mostrarEstadisticas();
    enviarResumenPanel();
}


// EXPORTAR LOS DATOS A JSON

function exportarJSON() {
    const texto = JSON.stringify(participantes, null, 2);

    document.querySelector("#texto-json").value = texto;

    document.querySelector("#mensaje-json").textContent =
        "JSON generado correctamente.";
}


// IMPORTAR LOS DATOS JSON

function importarJSON() {
    const texto = document.querySelector("#texto-json").value;
    let datos;

    try {
        datos = JSON.parse(texto);
    } catch (error) {
        document.querySelector("#mensaje-json").textContent =
            "El JSON no es válido.";
        return;
    }

    const comprobacion = validarColeccion(datos);

    if (!comprobacion.valido) {
        document.querySelector("#mensaje-json").textContent =
            comprobacion.mensaje;
        return;
    }

    participantes = datos;

    document.querySelector("#mensaje-json").textContent =
        "Importación correcta.";

    actualizarInterfaz();
}


// APLICAR LAS PREFERENCIAS

function aplicarPreferencias(tema, tamano) {
    document.body.classList.toggle("oscuro", tema === "oscuro");
    document.body.classList.toggle("grande", tamano === "grande");

    document.querySelector("#preferencia-tema").value = tema;
    document.querySelector("#preferencia-tamano").value = tamano;
}


function cargarPreferencias() {
    let tema = leerCookie("dwec_tema");
    let tamano = leerCookie("dwec_tamano");

    if (tema !== "claro" && tema !== "oscuro") {
        tema = "claro";
    }

    if (tamano !== "normal" && tamano !== "grande") {
        tamano = "normal";
    }

    aplicarPreferencias(tema, tamano);
}


function guardarPreferencias() {
    const tema = document.querySelector("#preferencia-tema").value;
    const tamano = document.querySelector("#preferencia-tamano").value;

    aplicarPreferencias(tema, tamano);

    guardarCookie("dwec_tema", tema);
    guardarCookie("dwec_tamano", tamano);

    document.querySelector("#mensaje-preferencias").textContent =
        "Preferencias aplicadas.";
}


function restablecerPreferencias() {
    aplicarPreferencias("claro", "normal");

    borrarCookie("dwec_tema");
    borrarCookie("dwec_tamano");

    document.querySelector("#mensaje-preferencias").textContent =
        "Preferencias restablecidas.";
}


// ABRIR Y CERRAR LA VENTANA DE AYUDA

function abrirAyuda() {
    if (ventanaAyuda !== null && !ventanaAyuda.closed) {
        ventanaAyuda.focus();
        return;
    }

    ventanaAyuda = window.open(
        "ayuda.html",
        "ayudaDWEC",
        "width=620,height=520"
    );

    if (ventanaAyuda === null) {
        document.querySelector("#estado-ayuda").textContent =
            "El navegador ha bloqueado la ventana.";
    }
}


function cerrarAyuda() {
    if (ventanaAyuda !== null && !ventanaAyuda.closed) {
        ventanaAyuda.close();

        document.querySelector("#estado-ayuda").textContent =
            "Ventana cerrada.";
    } else {
        document.querySelector("#estado-ayuda").textContent =
            "No hay ninguna ventana abierta.";
    }
}


// COMUNICACIÓN CON EL PANEL

function recibirMensajePanelEnPrincipal(evento) {
    if (evento.origin !== location.origin) {
        return;
    }

    if (evento.source !== panelIframe.contentWindow) {
        return;
    }

    if (evento.data === null || evento.data.tipo !== "panel-listo") {
        return;
    }

    panelPreparado = true;

    document.querySelector("#estado-panel").textContent =
        "Panel conectado.";

    enviarResumenPanel();
}


function enviarResumenPanel() {
    if (!panelPreparado) {
        return;
    }

    let reciente = null;

    if (participantes.length > 0) {
        const ultimo = participantes[participantes.length - 1];

        reciente = {
            nombre: ultimo.nombre,
            fecha: ultimo.fecha
        };
    }

    const resumen = {
        tipo: "resumen",
        total: participantes.length,
        modalidades: {
            Presencial: contarModalidad("Presencial"),
            Online: contarModalidad("Online")
        },
        reciente: reciente
    };

    panelIframe.contentWindow.postMessage(resumen, location.origin);
}


function contarModalidad(modalidad) {
    let total = 0;

    for (let i = 0; i < participantes.length; i++) {
        if (participantes[i].modalidad === modalidad) {
            total++;
        }
    }

    return total;
}


// INICIAR LA APLICACIÓN

inicializarInterfaz();
