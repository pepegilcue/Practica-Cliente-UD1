
# Gestor de participantes de un evento - DWEC

**Asignatura:** Desarrollo Web en Entorno Cliente  
**Curso:** 2ª DAW 2026/2027  
**Autor:** Pepe Gil Cué

## 1. Descripción

Esta práctica consiste en una página web hecha con HTML, CSS y JavaScript para gestionar participantes de un evento.

Permite añadir y borrar participantes, buscarlos, filtrarlos, consultar estadísticas, importar y exportar datos JSON, usar un panel con `iframe`, guardar preferencias con cookies y abrir una ventana de ayuda.

Los participantes se guardan mientras la página está abierta. El tema y el tamaño de letra se guardan con cookies.

## 2. Cómo ejecutar

1. Abrir una terminal en la carpeta del proyecto.
2. Ejecutar `python -m http.server 8000`.
3. Abrir `http://localhost:8000/index.html` en el navegador.

Es importante abrir las páginas desde el mismo servidor para que funcionen el panel y las cookies.

## 3. Estructura del proyecto

```text
/
├── README.md
├── index.html
├── ayuda.html
├── panel.html
├── css/
│   └── estilos.css
└── js/
    ├── logica.js
    ├── interfaz.js
    ├── cookies.js
    ├── panel.js
    └── ayuda.js
```

En `index.html` se cargan `logica.js`, `cookies.js` e `interfaz.js`, en ese orden.

## 4. Funciones principales

- Añadir participantes y comprobar que los datos sean correctos.
- Clasificar por edad y experiencia.
- Mostrar participantes en tarjetas y eliminarlos con confirmación.
- Buscar por nombre y filtrar por modalidad.
- Consultar estadísticas.
- Importar y exportar datos en JSON.
- Mostrar un panel dentro de un `iframe` usando `postMessage`.
- Guardar el tema y el tamaño de letra mediante cookies.
- Abrir una ventana de ayuda con datos del navegador.

Si el JSON importado no es válido, se rechaza y se conservan los datos anteriores.

## 5. Contenidos de las sesiones 1 a 7

| Sesión | Contenidos utilizados |
|---|---|
| 1 | Navegador y servidor local. |
| 2 | Variables y tipos de datos. |
| 3 | Condicionales, funciones y validaciones. |
| 4 | Bucles y estadísticas. |
| 5 | Texto, números, fechas, JSON y objetos del navegador. |
| 6 | DOM, eventos y creación de tarjetas. |
| 7 | Ventanas, `iframe`, `postMessage` y cookies. |

Los scripts usan `defer` para ejecutarse después de leer el HTML. La aplicación funciona en el navegador y no utiliza una base de datos.

## 6. Uso de ChatGPT

He utilizado ChatGPT como ayuda para organizar y revisar la práctica siguiendo el enunciado y las sesiones 1 a 7.

**Enlace o exportación del chat:** añadir antes de entregar.

## 7. Pruebas y entrega

Antes de entregar, hay que comprobar que funcionan el formulario, la búsqueda, los filtros, las estadísticas, la importación y exportación, el panel, las cookies y la ayuda.

Por último, revisar que no haya errores en la consola, subir el proyecto a GitHub y enviarlo siguiendo las indicaciones del profesor.
