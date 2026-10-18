// Receptor de mensajes del documento principal incrustado en el iframe.
const origenPrincipal = location.origin;

function agregarDato(contenedor, texto) {
  const parrafo = document.createElement("p");
  parrafo.className = "dato";
  parrafo.textContent = texto;
  contenedor.append(parrafo);
}

function recibirResumen(evento) {
  if (evento.origin !== origenPrincipal) return;
  if (evento.source !== window.parent) return;
  const datos = evento.data;
  if (datos === null || typeof datos !== "object" || Array.isArray(datos)) return;
  if (datos.tipo !== "resumen") return;
  if (!Number.isInteger(datos.total) || datos.total < 0) return;
  if (datos.modalidades === null || typeof datos.modalidades !== "object") return;
  if (!Number.isInteger(datos.modalidades.Presencial) || datos.modalidades.Presencial < 0) return;
  if (!Number.isInteger(datos.modalidades.Online) || datos.modalidades.Online < 0) return;
  if (datos.modalidades.Presencial + datos.modalidades.Online !== datos.total) return;
  if (datos.reciente !== null) {
    if (typeof datos.reciente !== "object") return;
    if (typeof datos.reciente.nombre !== "string" || typeof datos.reciente.fecha !== "string") return;
    const fecha = new Date(datos.reciente.fecha);
    if (!Number.isFinite(fecha.getTime()) || fecha.toISOString() !== datos.reciente.fecha) return;
  }

  const contenedor = document.querySelector("#resumen");
  contenedor.textContent = "";
  agregarDato(contenedor, "Total de inscritos: " + datos.total);
  agregarDato(contenedor, "Presenciales: " + datos.modalidades.Presencial);
  agregarDato(contenedor, "Online: " + datos.modalidades.Online);
  if (datos.reciente === null) agregarDato(contenedor, "Inscrito más reciente: Sin inscripciones");
  else agregarDato(contenedor, "Inscrito más reciente: " + datos.reciente.nombre + " (" + new Date(datos.reciente.fecha).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }) + ")");
  document.querySelector("#estado-panel").textContent = "Resumen actualizado.";
}

window.addEventListener("message", recibirResumen);
window.parent.postMessage({ tipo: "panel-listo" }, origenPrincipal);
