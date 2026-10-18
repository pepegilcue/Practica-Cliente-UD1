// Información disponible mediante los objetos del navegador.
document.querySelector("#idioma-navegador").textContent = "Idioma del navegador: " + navigator.language;
document.querySelector("#origen-pagina").textContent = "Origen de esta página: " + location.origin;
document.querySelector("#tamano-pantalla").textContent = "Tamaño de pantalla: " + screen.width + " × " + screen.height;
if (window.opener === null || window.opener.closed) {
  document.querySelector("#estado-opener").textContent = "La página principal no está disponible.";
} else {
  document.querySelector("#estado-opener").textContent = "Esta ventana se ha abierto desde la página principal.";
}
document.querySelector("#btn-cerrar-ventana").addEventListener("click", function () {
  window.close();
});
