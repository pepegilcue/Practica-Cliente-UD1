# Gestor de participantes de un evento - Práctica Cliente - UD1

| | |
|---|---|
| **Asignatura** | Desarrollo Web en Entorno Cliente (DWEC) |
| **Curso** | 2026/2027 |
| **Autor** | Pepe Gil Cué |
| **Fecha límite indicada en el enunciado** | Viernes 16/10/2026 a las 23:59 |

## 1. Descripción

Aplicación web que se ejecuta en el navegador con HTML, CSS y JavaScript, sin frameworks ni lógica de servidor. Incluye alta y baja de participantes, búsqueda y filtro, estadísticas, importación y exportación JSON, panel en un `iframe` comunicado mediante `postMessage`, preferencias de presentación guardadas en cookies y ventana de ayuda con `window.open`.

La colección inicial contiene tres participantes de ejemplo. Los cambios de la colección se mantienen en memoria durante la sesión; las preferencias de tema y tamaño de letra se guardan en cookies independientes durante 30 días.

## 2. Cómo ejecutar la aplicación

1. Descomprime el ZIP.
2. Abre una terminal en la carpeta del proyecto.
3. Arranca un servidor HTTP local de archivos estáticos con `python -m http.server 8000`.
4. Entra en `http://localhost:8000/index.html`.
5. Abre todas las páginas desde ese mismo host y puerto. No uses `file://` ni mezcles `localhost` con `127.0.0.1` durante las pruebas de `postMessage` y cookies.

| Dato | Valor |
|---|---|
| Servidor elegido | Servidor estático local de Python |
| Comando para arrancarlo | `python -m http.server 8000` |
| URL de acceso | `http://localhost:8000/index.html` |
| Navegador usado | Completar con el navegador y versión usados en las pruebas |

## 3. Estructura del proyecto

```text
/
├── README.md
├── index.html
├── ayuda.html
├── panel.html
├── css/
│   └── estilos.css
├── js/
│   ├── logica.js
│   ├── interfaz.js
│   ├── cookies.js
│   ├── panel.js
│   └── ayuda.js
└── evidencias/
    └── README.txt
```

### Orden de carga de scripts en `index.html`

Los tres scripts de la página principal llevan `defer` y aparecen en este orden:

1. `js/logica.js`: declara las funciones de validación, clasificación, filtrado y estadísticas.
2. `js/cookies.js`: declara las funciones para leer, guardar y borrar cookies.
3. `js/interfaz.js`: conecta los eventos, consulta las funciones anteriores y construye la interfaz.

Los scripts diferidos se ejecutan después de analizar el HTML y conservan el orden del documento. `panel.html` carga `js/panel.js` y `ayuda.html` carga `js/ayuda.js`, también con `defer`.

## 4. Funcionalidades y casos de prueba

Las pruebas siguientes deben ejecutarse en el navegador y marcarse como realizadas solo después de comprobar el resultado. Las capturas de evidencias no se han inventado: deben añadirse después de ejecutar las pruebas.

### 4.1 Alta de participantes y validación

**Qué hace:** recoge nombre, edad, tipo, modalidad y experiencia; valida todos los campos en JavaScript; muestra errores y conserva los valores si hay errores.

**Archivos y funciones:** `js/logica.js` (`validarNombre`, `validarEdad`, `validarTipo`, `validarModalidad`, `validarExperiencia`) y `js/interfaz.js` (`validarFormulario`, `guardarParticipante`).

**Cómo se ha realizado:** se leen los valores de los controles, se comprueba cada condición y se muestran los errores mediante `textContent`. El participante solo se añade si todos los campos son válidos. Junto al nombre hay tres herramientas sencillas: `toUpperCase()` convierte el texto a mayúsculas, `toLowerCase()` lo convierte a minúsculas y `trim()` quita los espacios de los extremos. Estos métodos devuelven un texto nuevo, por lo que el resultado se asigna de nuevo a `value`.

| Nº | Pasos | Entrada | Resultado esperado |
|---|---|---|---|
| 1 | Completar todos los campos y añadir | Nombre `Mario Gil`, edad `18`, tipo `Estudiante`, modalidad `Presencial`, experiencia `3.5` | Se añade una tarjeta y se actualizan estadísticas y panel |
| 2 | Enviar con nombre vacío | Nombre vacío | Aparece error y no se añade ningún participante |
| 3 | Probar nombre de un carácter | `A` | Se rechaza |
| 4 | Probar nombre de 61 caracteres | Cadena de 61 caracteres | Se rechaza |
| 5 | Probar nombre con espacios | `     ` | Se rechaza |
| 6 | Probar edad vacía | Vacía | Se rechaza |
| 7 | Probar edad `18abc` | `18abc` | Se rechaza |
| 8 | Probar edad decimal | `18.5` | Se rechaza |
| 9 | Probar edad negativa y edad 121 | `-1`, `121` | Se rechazan |
| 10 | Probar edad cero | `0` | Se acepta |
| 11 | Seleccionar tipo o modalidad no válidos | Opción vacía o valor alterado desde DevTools | Se rechaza |
| 12 | Probar experiencia vacía o fuera de rango | Vacía, `-0.1`, `10.1` | Se rechaza |
| 13 | Probar experiencia decimal | `3.5` | Se acepta |
| 14 | Provocar varios errores a la vez | Nombre vacío, edad decimal y demás campos vacíos | Se muestran errores, los valores se conservan y no se añade nada |
| 15 | Escribir ` ana pérez ` y pulsar MAYÚSCULAS | ` ana pérez ` | El campo pasa a ` ANA PÉREZ ` |
| 16 | Escribir `ANA PÉREZ` y pulsar minúsculas | `ANA PÉREZ` | El campo pasa a `ana pérez` |
| 17 | Escribir `  Ana Pérez  ` y pulsar Quitar espacios | Espacios antes y después del nombre | El campo pasa a `Ana Pérez`; los espacios interiores se conservan |

### 4.2 Clasificación de edad y experiencia

**Qué hace:** clasifica como menor a quien tiene menos de 18 años; en caso contrario, como mayor. La experiencia es inicial desde 0 hasta menos de 4, intermedia desde 4 hasta menos de 7 y avanzada desde 7 hasta 10.

**Archivos y funciones:** `js/logica.js` (`clasificarEdad`, `clasificarExperiencia`); se muestran las clasificaciones en las tarjetas de `js/interfaz.js`.

| Nº | Pasos | Entrada | Resultado esperado |
|---|---|---|---|
| 1 | Añadir o importar edad 17 y edad 18 | `17`, `18` | 17 es menor; 18 es mayor |
| 2 | Comprobar experiencia inicial | `0`, `3.9` | Inicial |
| 3 | Comprobar límite intermedio inferior | `4` | Intermedia |
| 4 | Comprobar límite intermedio superior | `6.9` | Intermedia |
| 5 | Comprobar límite avanzado | `7`, `10` | Avanzada |

### 4.3 Listado en tarjetas

**Qué hace:** muestra una tarjeta por participante, con sus datos, clasificaciones y fecha/hora de inscripción en formato español.

**Archivos y funciones:** `js/interfaz.js` (`mostrarParticipantes`, `crearLineaTarjeta`). Las tarjetas se crean con `createElement`, `textContent` y `append`.

| Nº | Pasos | Entrada | Resultado esperado |
|---|---|---|---|
| 1 | Abrir la página | Sin entrada adicional | Se muestran los tres participantes iniciales |
| 2 | Importar un nombre con caracteres especiales | `Ana <b> & "López"` como valor de nombre válido | Se muestra como texto literal y no se interpreta como HTML |
| 3 | Importar una colección vacía | `[]` | No se muestran tarjetas y aparece un mensaje de coincidencias vacías |

### 4.4 Bajas con confirmación

**Qué hace:** el botón de cada tarjeta pregunta mediante `confirm`. Aceptar elimina el participante; cancelar no modifica la colección.

**Archivos y funciones:** `js/interfaz.js` (`eliminarParticipante`, `buscarParticipantePorId`).

| Nº | Pasos | Entrada | Resultado esperado |
|---|---|---|---|
| 1 | Pulsar eliminar y aceptar | Confirmar | Desaparece solo esa tarjeta |
| 2 | Pulsar eliminar y cancelar | Cancelar | La tarjeta y las estadísticas no cambian |
| 3 | Eliminar un participante entre varios | Confirmar | Las demás tarjetas permanecen |
| 4 | Eliminar todos los participantes | Confirmar en cada diálogo | Lista vacía y estadísticas con `Sin datos` |

### 4.5 Búsqueda por nombre y filtro por modalidad

**Qué hace:** la búsqueda no distingue mayúsculas de minúsculas y puede combinarse con el filtro de modalidad.

**Archivos y funciones:** `js/logica.js` (`filtrarParticipantes`) y `js/interfaz.js` (`aplicarFiltros`, `mostrarParticipantes`).

| Nº | Pasos | Entrada | Resultado esperado |
|---|---|---|---|
| 1 | Escribir parte de un nombre | `ana` | Coincide con `Ana López` sin distinguir mayúsculas |
| 2 | Elegir una modalidad | `Online` | Solo se muestran participantes online |
| 3 | Combinar búsqueda y modalidad | Nombre `a`, modalidad `Presencial` | Se aplican ambas condiciones |
| 4 | Buscar un nombre inexistente | `ZZZ` | Mensaje de que no hay coincidencias |
| 5 | Aplicar filtros con la colección vacía | `[]` | Mensaje de que no hay coincidencias |

### 4.6 Estadísticas

**Qué hace:** calcula sobre la colección completa, aunque el listado esté filtrado: total, menores, mayores, edad media, edad mínima y máxima, recuentos por modalidad y tipo y experiencia media de participantes presenciales. Usa bucles, contadores y acumuladores; no usa `reduce`.

**Archivos y funciones:** `js/logica.js` (`calcularEstadisticas`) y `js/interfaz.js` (`mostrarEstadisticas`).

| Nº | Pasos | Entrada | Resultado esperado |
|---|---|---|---|
| 1 | Abrir la página con datos de ejemplo | Tres participantes iniciales | Aparecen todas las estadísticas calculadas |
| 2 | Importar array vacío | `[]` | Los apartados muestran `Sin datos` |
| 3 | Dejar solo participantes online | Colección sin presenciales | Experiencia presencial media indica que no hay participantes presenciales |
| 4 | Filtrar el listado sin cambiar la colección | Búsqueda que muestra una tarjeta | Las estadísticas siguen representando toda la colección |
| 5 | Añadir, borrar e importar | Operaciones válidas | Las estadísticas se actualizan tras cada operación |

### 4.7 Primer menor de edad

**Qué hace:** recorre la colección en su orden y utiliza `break` para detenerse al encontrar al primer menor.

**Archivos y funciones:** `js/logica.js` (`obtenerPrimerMenor`) y `js/interfaz.js` (`mostrarEstadisticas`).

| Nº | Pasos | Entrada | Resultado esperado |
|---|---|---|---|
| 1 | Abrir la página | Datos iniciales | Se indica `Ana López`, que es el primer menor |
| 2 | Importar colección sin menores | Array válido con edades desde 18 | Se indica que no hay menores |
| 3 | Importar colección vacía | `[]` | Se muestra `Sin datos` |

### 4.8 Exportar e importar JSON

**Qué hace:** exporta con `JSON.stringify` e importa con `JSON.parse`. La validación es todo o nada: la colección anterior solo se sustituye si todos los elementos son válidos.

**Archivos y funciones:** `js/interfaz.js` (`exportarJSON`, `importarJSON`) y `js/logica.js` (`validarParticipante`, `validarColeccion`).

**Formato de cada participante:** `id` entero positivo y único, `nombre` de 2 a 60 caracteres tras eliminar espacios exteriores, `edad` entero entre 0 y 120, `tipo` permitido, `modalidad` permitida, `experiencia` numérica entre 0 y 10 y `fecha` en formato ISO generado por `Date.toISOString()`.

| Nº | Pasos | Entrada | Resultado esperado |
|---|---|---|---|
| 1 | Pulsar exportar | Colección actual | El cuadro de texto contiene un array JSON |
| 2 | Importar JSON correcto | JSON exportado | La colección se sustituye y se actualizan tarjetas, estadísticas y panel |
| 3 | Importar array vacío | `[]` | Se acepta y la colección queda vacía |
| 4 | Importar JSON mal formado | `{no es json` | Se muestra error y se conserva la colección anterior |
| 5 | Importar un objeto en vez de un array | `{}` | Se rechaza y se conserva la colección anterior |
| 6 | Omitir un campo o cambiar su tipo | Elemento incompleto o edad como texto | Se rechaza toda la importación |
| 7 | Importar valores fuera de rango | Edad `121` o experiencia `11` | Se rechaza toda la importación |
| 8 | Importar fecha que no sea ISO válida | `fecha: "ayer"` | Se rechaza toda la importación |
| 9 | Importar identificador inválido | ID `0`, negativo o decimal | Se rechaza toda la importación |
| 10 | Importar identificadores repetidos | Dos objetos con el mismo ID | Se rechaza toda la importación |
| 11 | Mezclar un objeto inválido con objetos válidos | Array de varios elementos, uno inválido | Se rechaza todo y la colección anterior se conserva |
| 12 | Importar correctamente | Array válido | Se actualizan tarjetas, estadísticas y panel |

### 4.9 Panel en iframe con `postMessage`

**Qué hace:** `panel.html` se incrusta en un `iframe` con título descriptivo. El panel muestra total, cantidades por modalidad y participante más reciente. La comunicación se realiza mediante mensajes de objetos, sin insertar datos recibidos como HTML.

**Archivos y funciones:** `index.html` (`#iframe-panel`), `js/interfaz.js` (`recibirMensajePanelEnPrincipal`, `enviarResumenPanel`) y `js/panel.js` (`recibirResumen`).

**Protocolo:** el panel hijo anuncia `{ tipo: "panel-listo" }`. La página principal comprueba `event.origin` y `event.source`; después envía `{ tipo: "resumen", total, modalidades, reciente }`. El receptor del panel comprueba origen, ventana emisora, tipo, estructura y valores antes de cambiar el DOM. El destino de `postMessage` es `location.origin`, no `"*"`.

| Nº | Pasos | Entrada | Resultado esperado |
|---|---|---|---|
| 1 | Cargar la página | Carga inicial | El panel avisa que está listo y recibe el resumen |
| 2 | Añadir, borrar e importar | Operaciones válidas | El panel se actualiza tras cada operación |
| 3 | Importar colección vacía | `[]` | El panel muestra `Sin inscripciones` |
| 4 | Enviar mensaje desde origen distinto en una prueba controlada | Origen incorrecto | El mensaje se ignora |
| 5 | Enviar mensaje desde otra ventana del mismo origen | `event.source` incorrecto | El mensaje se ignora |
| 6 | Enviar datos con tipo o estructura incorrectos | Objeto incompleto o valores inválidos | No cambia el resumen ni se produce una excepción no controlada |

### 4.10 Preferencias con cookies

**Qué hace:** guarda tema claro/oscuro y tamaño de letra normal/grande en dos cookies independientes, con duración de 30 días. Comprueba los valores al recuperarlos y permite restablecerlos.

**Archivos y funciones:** `js/cookies.js` (`leerCookie`, `guardarCookie`, `borrarCookie`) y `js/interfaz.js` (`cargarPreferencias`, `aplicarPreferencias`, `guardarPreferencias`, `restablecerPreferencias`).

**Cookies y atributos:** `dwec_tema` y `dwec_tamano`; `Path=/`, `Max-Age=2592000` (30 días) y `SameSite=Lax`. Los valores se codifican y decodifican con `encodeURIComponent` y `decodeURIComponent`. Al borrar se usa `Max-Age=0` con el mismo ámbito.

| Nº | Pasos | Entrada | Resultado esperado |
|---|---|---|---|
| 1 | Abrir sin cookies de preferencias | Primera visita | Tema claro y letra normal |
| 2 | Guardar tema oscuro y letra grande y recargar | Valores válidos | Las preferencias se recuperan |
| 3 | Alterar `dwec_tema` desde DevTools | Valor desconocido | Se ignora y se usa el tema claro |
| 4 | Restablecer preferencias | Pulsar restablecer | Se aplican valores predeterminados y se intentan eliminar ambas cookies |
| 5 | Bloquear cookies en el navegador y guardar | Preferencias válidas | El aspecto se aplica, pero la interfaz no confirma el guardado |

### 4.11 Ventana de ayuda

**Qué hace:** abre `ayuda.html` con `window.open`, guarda la referencia, no abre otra ventana si la anterior sigue abierta, comprueba `closed` y permite cerrarla desde la principal. Si el navegador bloquea la apertura, informa al usuario. La ayuda muestra `navigator.language`, `location.origin` y `screen.width`/`screen.height`.

**Archivos y funciones:** `js/interfaz.js` (`abrirAyuda`, `cerrarAyuda`) y `js/ayuda.js`.

| Nº | Pasos | Entrada | Resultado esperado |
|---|---|---|---|
| 1 | Pulsar abrir ayuda | Ventana permitida | Se abre `ayuda.html` y muestra los datos del navegador |
| 2 | Pulsar abrir con la ayuda ya abierta | Segunda pulsación | Se reutiliza la ventana abierta; no se crea otra |
| 3 | Pulsar cerrar desde la página principal | Ayuda abierta | La ventana se cierra |
| 4 | Cerrar manualmente y volver a abrir | Cierre manual | Se detecta `closed` y se puede abrir de nuevo |
| 5 | Bloquear ventanas emergentes y abrir | Popup bloqueado | Se muestra un aviso |
| 6 | Revisar los datos de la ayuda | Página abierta | Aparecen idioma, origen y tamaño de pantalla |

## 5. Contenidos aplicados de cada sesión

| Sesión | Contenidos del temario | Dónde se aplican en la práctica |
|---|---|---|
| 1 | Arquitectura cliente-servidor, navegador, ejecución en cliente, petición HTTP y respuesta, DOM y capacidades/restricciones del cliente | La aplicación se ejecuta en el navegador y se sirve desde un servidor HTTP estático local; la interfaz se modifica desde JavaScript |
| 2 | Variables, tipos, expresiones y comprobación de tipos con `typeof` | Variables para colección y estado; comprobación del tipo y estructura de los datos importados y mensajes recibidos |
| 3 | Condicionales, conversión y validación numérica, operadores y funciones | Validación de los campos, rangos, condiciones de clasificación y validación de importaciones |
| 4 | Bucles, contadores, acumuladores, `break` y `continue` | Cálculo de estadísticas, búsqueda del primer menor y validación de IDs duplicados |
| 5 | `String` (`length`, `toUpperCase`, `toLowerCase`, `trim`, `includes`), `Number`, `Math`, `Date`, `JSON`, `window`, `navigator`, `location` y `screen`; `try/catch` | Conversión de mayúsculas/minúsculas y eliminación de espacios en el formulario; búsqueda sin distinguir mayúsculas, validación numérica, fecha ISO, estadísticas y formato español, importación/exportación JSON, ventana de ayuda y datos del navegador |
| 6 | DOM, `defer`, selectores, eventos, `textContent`, `createElement`, `append`, `className` y `classList` | Carga ordenada de scripts, eventos de formularios y botones, creación de tarjetas y mensajes de estado, tema y tamaño de letra |
| 7 | Ventanas y contextos, `window.open`, `window.close`, `window.opener`, `iframe`, mismo origen, `postMessage` y cookies | Ventana de ayuda, panel incrustado, comprobaciones `origin`/`source`, intercambio de mensajes y preferencias persistentes |

## 6. Conceptos que hay que explicar

### 6.1 Carga del script

Los scripts de la página principal usan `defer`. El navegador puede analizar el HTML mientras descarga los scripts y los ejecuta después de analizar el documento. Los scripts clásicos con `defer` conservan el orden en el que aparecen, por eso `logica.js` y `cookies.js` se cargan antes de `interfaz.js`.

### 6.2 Arquitectura cliente-servidor en esta práctica

El servidor HTTP local entrega los archivos estáticos HTML, CSS y JavaScript. La lógica de validación, las tarjetas, los filtros, las estadísticas, la comunicación entre documentos y las preferencias se ejecutan en el navegador. No hay un servidor de aplicación ni una base de datos. La colección de participantes permanece en memoria durante la sesión; se puede trasladar mediante exportación e importación JSON.

### 6.3 Ámbitos y hoisting

Las variables de estado se declaran con `let` y las referencias que no se reasignan con `const`. Las funciones se declaran con `function`. Las declaraciones de función tienen un comportamiento de hoisting distinto al de las variables declaradas con `let` y `const`; por claridad, la inicialización de la interfaz se llama al final de `interfaz.js`, después de las declaraciones.

### 6.4 Valores truthy y falsy

Las condiciones comprueban expresamente los casos importantes, como cadenas vacías, `null` y valores booleanos. En particular, para edad y experiencia se comprueba primero que el texto no esté vacío, porque convertir una cadena vacía con `Number` puede producir cero y no debe confundirse con una entrada válida escrita por el usuario.

### 6.5 Diferencia entre `||` y `??`

La aplicación no necesita usar `||` ni `??` para elegir valores predeterminados. La carga de preferencias comprueba explícitamente si el valor leído es uno de los permitidos. Si el temario de clase exige demostrar ambos operadores, se debe añadir un ejemplo separado y comprobarlo según la sesión correspondiente, sin introducirlo solo por estilo.

### 6.6 Restricciones entre orígenes

El origen está formado por esquema, host y puerto. Para las pruebas se usa el mismo host y puerto en `index.html` y `panel.html`. La página principal y el iframe no acceden directamente al DOM del otro documento: se comunican mediante `postMessage`. Ambos receptores comprueban `event.origin` y `event.source`, y validan `event.data` antes de actuar.

## 7. Uso de la inteligencia artificial

Se ha utilizado ChatGPT como apoyo para organizar y revisar el código a partir del README de la actividad y de las sesiones 1 a 7 compartidas. Las decisiones implementadas se deben comprobar en el navegador; no se deben presentar como realizadas pruebas que no se hayan ejecutado.

**Enlaces o exportaciones de los chats usados:** añadir el enlace o la exportación que corresponda antes de entregar.

| Consulta o referencia | Problema que se quería resolver | Propuesta aplicada | Comprobación que debe realizar el alumno |
|---|---|---|---|
| Revisión de la práctica a partir del README y sesiones 1–7 | Ajustar la estructura y funcionalidades al enunciado | Separar lógica, interfaz, cookies, panel y ayuda; validar datos y mensajes | Ejecutar los casos de prueba de las secciones 4.1–4.11 y corregir cualquier fallo observado |

## 8. Evidencias de depuración

### 8.1 Punto de interrupción

- **Captura:** pendiente, guardar como `evidencias/breakpoint.png`.
- **Cómo obtenerla:** abrir DevTools, colocar un punto de interrupción en una función como `guardarParticipante` en `js/interfaz.js`, enviar un formulario y capturar el depurador pausado.
- **Explicación que debe completarse:** indicar archivo, línea, valores de las variables inspeccionadas y qué se comprobó. No marcarlo como realizado hasta obtener la captura.

### 8.2 Petición en la pestaña Network

- **Captura:** pendiente, guardar como `evidencias/network.png`.
- **Cómo obtenerla:** abrir DevTools en Network, recargar `http://localhost:8000/index.html` y seleccionar la petición del documento HTML o de uno de los scripts.
- **Explicación que debe completarse:** anotar método, URL, código de estado y tipo de contenido tal como aparezcan en el navegador. No inventar valores si no se han comprobado.

## 9. Lista de comprobación de entrega

- [ ] Repositorio en GitHub, público o compartido con manuel.granados@eusa.es.
- [ ] Revisar fecha del último commit y los requisitos de entrega del profesor.
- [ ] Todas las funcionalidades se pueden activar desde la interfaz HTML.
- [ ] Ejecutar las pruebas y comprobar que no hay errores en la consola.
- [ ] Marcar y documentar los casos de prueba realizados.
- [ ] Añadir enlaces o exportaciones de los chats utilizados.
- [ ] Incluir y explicar las dos evidencias (breakpoint y Network).
- [ ] Enviar el correo a manuel.granados@eusa.es con el enlace al proyecto.
