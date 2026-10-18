// Funciones para leer, guardar y borrar una cookie concreta.
function leerCookie(nombre) {
  try {
    const partes = document.cookie.split(";");
    const prefijo = nombre + "=";
    for (let i = 0; i < partes.length; i++) {
      const parte = partes[i].trim();
      if (parte.startsWith(prefijo)) {
        return decodeURIComponent(parte.slice(prefijo.length));
      }
    }
  } catch (error) {
    return null;
  }
  return null;
}

function guardarCookie(nombre, valor) {
  try {
    document.cookie = nombre + "=" + encodeURIComponent(valor) + "; Path=/; Max-Age=2592000; SameSite=Lax";
    return leerCookie(nombre) === valor;
  } catch (error) {
    return false;
  }
}

function borrarCookie(nombre) {
  try {
    document.cookie = nombre + "=; Path=/; Max-Age=0; SameSite=Lax";
    return leerCookie(nombre) === null;
  } catch (error) {
    return false;
  }
}
