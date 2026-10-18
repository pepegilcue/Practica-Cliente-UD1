// Funciones de validación y cálculo. No acceden al DOM.
const TIPOS_PARTICIPANTE = ["Estudiante", "Profesional", "Ponente"];
const MODALIDADES = ["Presencial", "Online"];

function validarNombre(nombre) {
  if (typeof nombre !== "string") return false;
  const limpio = nombre.trim();
  return limpio.length >= 2 && limpio.length <= 60;
}

function validarEdad(edad) {
  return typeof edad === "number" && Number.isInteger(edad) && edad >= 0 && edad <= 120;
}

function validarTipo(tipo) {
  return tipo === "Estudiante" || tipo === "Profesional" || tipo === "Ponente";
}

function validarModalidad(modalidad) {
  return modalidad === "Presencial" || modalidad === "Online";
}

function validarExperiencia(experiencia) {
  return typeof experiencia === "number" && Number.isFinite(experiencia) && experiencia >= 0 && experiencia <= 10;
}

function clasificarEdad(edad) {
  if (edad < 18) return "Menor de edad";
  return "Mayor de edad";
}

function clasificarExperiencia(experiencia) {
  if (experiencia < 4) return "Inicial";
  if (experiencia < 7) return "Intermedia";
  return "Avanzada";
}

function validarParticipante(participante) {
  if (participante === null || typeof participante !== "object" || Array.isArray(participante)) return false;
  if (!Number.isInteger(participante.id) || participante.id <= 0) return false;
  if (!validarNombre(participante.nombre)) return false;
  if (!validarEdad(participante.edad)) return false;
  if (!validarTipo(participante.tipo)) return false;
  if (!validarModalidad(participante.modalidad)) return false;
  if (!validarExperiencia(participante.experiencia)) return false;
  if (typeof participante.fecha !== "string") return false;
  try {
    const fecha = new Date(participante.fecha);
    if (!Number.isFinite(fecha.getTime())) return false;
    if (fecha.toISOString() !== participante.fecha) return false;
  } catch (error) {
    return false;
  }
  return true;
}

function validarColeccion(participantes) {
  if (!Array.isArray(participantes)) return { valido: false, mensaje: "El JSON debe contener un array." };
  const ids = [];
  for (let i = 0; i < participantes.length; i++) {
    if (!validarParticipante(participantes[i])) {
      return { valido: false, mensaje: "El elemento de la posición " + i + " contiene datos inválidos." };
    }
    for (let j = 0; j < ids.length; j++) {
      if (ids[j] === participantes[i].id) {
        return { valido: false, mensaje: "Hay un identificador repetido: " + participantes[i].id + "." };
      }
    }
    ids.push(participantes[i].id);
  }
  return { valido: true, mensaje: "" };
}

function filtrarParticipantes(participantes, texto, modalidad) {
  const resultado = [];
  const busqueda = texto.trim().toLowerCase();
  for (let i = 0; i < participantes.length; i++) {
    const nombre = participantes[i].nombre.toLowerCase();
    const coincideNombre = nombre.includes(busqueda);
    const coincideModalidad = modalidad === "todas" || participantes[i].modalidad === modalidad;
    if (coincideNombre && coincideModalidad) resultado.push(participantes[i]);
  }
  return resultado;
}

function calcularEstadisticas(participantes) {
  const estadisticas = {
    total: participantes.length,
    menores: 0,
    mayores: 0,
    edadMedia: null,
    edadMinima: null,
    edadMaxima: null,
    modalidades: { Presencial: 0, Online: 0 },
    tipos: { Estudiante: 0, Profesional: 0, Ponente: 0 },
    experienciaPresencialMedia: null
  };
  if (participantes.length === 0) return estadisticas;

  let sumaEdades = 0;
  let sumaExperienciaPresencial = 0;
  let totalPresenciales = 0;
  let edadMinima = participantes[0].edad;
  let edadMaxima = participantes[0].edad;

  for (let i = 0; i < participantes.length; i++) {
    const participante = participantes[i];
    sumaEdades += participante.edad;
    if (participante.edad < 18) estadisticas.menores++;
    else estadisticas.mayores++;
    if (participante.edad < edadMinima) edadMinima = participante.edad;
    if (participante.edad > edadMaxima) edadMaxima = participante.edad;
    estadisticas.modalidades[participante.modalidad]++;
    estadisticas.tipos[participante.tipo]++;
    if (participante.modalidad === "Presencial") {
      sumaExperienciaPresencial += participante.experiencia;
      totalPresenciales++;
    }
  }

  estadisticas.edadMedia = sumaEdades / participantes.length;
  estadisticas.edadMinima = edadMinima;
  estadisticas.edadMaxima = edadMaxima;
  if (totalPresenciales > 0) estadisticas.experienciaPresencialMedia = sumaExperienciaPresencial / totalPresenciales;
  return estadisticas;
}

function obtenerPrimerMenor(participantes) {
  let primerMenor = null;
  for (let i = 0; i < participantes.length; i++) {
    if (participantes[i].edad < 18) {
      primerMenor = participantes[i];
      break;
    }
  }
  return primerMenor;
}
