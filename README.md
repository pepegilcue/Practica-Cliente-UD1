# Gestor de participantes de un evento - Práctica Cliente - UD1

| | |
|---|---|
| **Asignatura** | Desarrollo Web en Entorno Cliente (DWEC) |
| **Curso** | 2026/2027 |
| **Autor** | Pepe Gil Cué |
| **Fecha límite** | Viernes 16/10/2026 a las 23:59 

## 1. Descripción

Aplicación web que se ejecuta íntegramente en el navegador (HTML, CSS y JavaScript, sin frameworks ni lógica de servidor) para gestionar las inscripciones de un evento tecnológico. Permite:

- Dar de alta y borrar participantes.
- Buscar y filtrar el listado.
- Consultar estadísticas.
- Exportar e importar la colección en JSON.
- Mostrar un panel en un `iframe` comunicado mediante `postMessage`.
- Guardar preferencias de tema y tamaño de letra en cookies.
- Abrir una ventana de ayuda con `window.open`.

## 2. Cómo ejecutar la aplicación

Requisitos del enunciado:

- Servir los archivos con un **servidor HTTP local de archivos estáticos**. No abrir con `file://`.
- Usar el **mismo host y puerto** en todas las páginas (no mezclar `localhost` y `127.0.0.1`).

| Paso | Contenido |
|---|---|
| Servidor elegido | ⏳ Pendiente |
| Comando para arrancarlo | ⏳ Pendiente |
| URL de acceso | ⏳ Pendiente |
| Navegador usado | ⏳ Pendiente |

## 3. Estructura del proyecto

```
/
├── README.md       Documentación
├── index.html      Página principal
├── panel.html      Página que se incrusta en el iframe
├── ayuda.html      Página que abre window.open
├── js/
    └── logica.js       Lógica sin DOM: validación, identificadores, estadísticas
    ├── interfaz.js     Código de interfaz: DOM, eventos, postMessage, ventana de ayuda
    ├── cookies.js      leerCookie, guardarCookie, borrarCookie
    ├── panel.js        Receptor y DOM del panel
    ├── ayuda.js        Datos del navegador mostrados en la ayuda
├── css/
    ├── estilos.css     Estilos (incluye tema oscuro y letra grande)
└── evidencias/     Capturas de depuración y de Network.  
```

⏳ Pendiente: actualizar esta estructura si cambia durante el desarrollo.

**Orden de carga de scripts en `index.html`:** ⏳ Pendiente

## 4. Funcionalidades y casos de prueba

> Las funcionalidades sin caso de prueba reproducible no se evalúan. En cada caso: pasos, datos de entrada y resultado esperado.

### 4.1 Alta de participantes y validación

- **Qué hace:** formulario con nombre, edad, tipo, modalidad y experiencia. Valida en JavaScript, muestra errores, conserva los valores y solo añade si todo es correcto.
- **Archivos y funciones:** ⏳ Pendiente
- **Cómo se ha realizado:** ⏳ Pendiente

| Nº | Pasos | Entrada | Resultado esperado | Estado |
|---|---|---|---|---|
| 1 | ⏳ | ⏳ | ⏳ | Pendiente |

Casos a cubrir:

- [ ] Alta válida.
- [ ] Nombre vacío o de 1 carácter.
- [ ] Nombre de más de 60 caracteres.
- [ ] Nombre solo con espacios.
- [ ] Edad vacía.
- [ ] Edad `18abc`.
- [ ] Edad decimal.
- [ ] Edad fuera de rango (negativa o mayor que 120).
- [ ] Edad `0` (válida).
- [ ] Tipo o modalidad no permitidos.
- [ ] Experiencia vacía.
- [ ] Experiencia fuera de rango.
- [ ] Experiencia decimal (válida).
- [ ] Con errores, se conservan los valores y no se añade nada.

### 4.2 Clasificación (edad y experiencia)

- **Qué hace:** menor de edad si `edad < 18`, mayor en caso contrario. Experiencia inicial de 0 a menos de 4, intermedia de 4 a menos de 7, avanzada de 7 a 10.
- **Archivos y funciones:** ⏳ Pendiente

| Nº | Pasos | Entrada | Resultado esperado | Estado |
|---|---|---|---|---|
| 1 | ⏳ | ⏳ | ⏳ | Pendiente |

Casos a cubrir: valores límite 17/18 años y experiencia 3.9 / 4 / 6.9 / 7 / 10.

### 4.3 Listado en tarjetas

- **Qué hace:** una tarjeta por participante con todos sus datos, sus clasificaciones y la fecha y hora de inscripción en formato español. Tarjetas creadas con `createElement`, `textContent` y `append`.
- **Archivos y funciones:** ⏳ Pendiente

| Nº | Pasos | Entrada | Resultado esperado | Estado |
|---|---|---|---|---|
| 1 | ⏳ | ⏳ | ⏳ | Pendiente |

Casos a cubrir: tarjetas iniciales (3 participantes de ejemplo) y nombre con caracteres especiales (se muestra como texto).

### 4.4 Bajas con confirmación

- **Qué hace:** botón de borrar por tarjeta con `confirm`. Aceptar elimina el dato y la tarjeta. Cancelar no cambia nada.
- **Archivos y funciones:** ⏳ Pendiente

| Nº | Pasos | Entrada | Resultado esperado | Estado |
|---|---|---|---|---|
| 1 | ⏳ | ⏳ | ⏳ | Pendiente |

Casos a cubrir:

- [ ] Baja confirmada.
- [ ] Baja **cancelada**.
- [ ] Las demás tarjetas no se ven afectadas.
- [ ] Borrar hasta dejar la lista vacía.

### 4.5 Búsqueda por nombre y filtro por modalidad

- **Qué hace:** búsqueda sin distinguir mayúsculas y minúsculas y filtro por modalidad. Se combinan. Informa si no hay coincidencias.
- **Archivos y funciones:** ⏳ Pendiente

| Nº | Pasos | Entrada | Resultado esperado | Estado |
|---|---|---|---|---|
| 1 | ⏳ | ⏳ | ⏳ | Pendiente |

Casos a cubrir: solo búsqueda, solo filtro, ambos combinados, sin coincidencias y lista vacía.

### 4.6 Estadísticas

- **Qué hace:** se calculan sobre la colección completa (aunque el listado esté filtrado) y se actualizan tras alta, baja o importación.
  - Total, menores y mayores.
  - Edad media, mínima y máxima.
  - Recuento por modalidad y por tipo.
  - Experiencia media de presenciales.
  - Cálculos con bucles, contadores y acumuladores (sin `reduce`).
  - `"Sin datos"` cuando no hay datos.
- **Archivos y funciones:** ⏳ Pendiente

| Nº | Pasos | Entrada | Resultado esperado | Estado |
|---|---|---|---|---|
| 1 | ⏳ | ⏳ | ⏳ | Pendiente |

Casos a cubrir: colección con datos, colección vacía, sin participantes presenciales, y estadísticas con el listado filtrado.

### 4.7 Primer menor de edad

- **Qué hace:** localiza el primer menor en el orden de la colección con un bucle con `break`, y muestra su nombre o indica que no hay ninguno.
- **Archivos y funciones:** ⏳ Pendiente

| Nº | Pasos | Entrada | Resultado esperado | Estado |
|---|---|---|---|---|
| 1 | ⏳ | ⏳ | ⏳ | Pendiente |

Casos a cubrir: hay menores, no hay menores y colección vacía.

### 4.8 Exportar e importar JSON

- **Qué hace:** exporta la colección con `JSON.stringify` e importa con `JSON.parse`. La importación es todo o nada: solo sustituye la colección si todos los datos son válidos.
- **Archivos y funciones:** ⏳ Pendiente

| Nº | Pasos | Entrada | Resultado esperado | Estado |
|---|---|---|---|---|
| 1 | ⏳ | ⏳ | ⏳ | Pendiente |

Casos a cubrir:

- [ ] Exportación.
- [ ] Importación válida.
- [ ] Array vacío (válido).
- [ ] **JSON mal formado.**
- [ ] El JSON no es un array.
- [ ] Falta un campo o tiene un tipo incorrecto.
- [ ] Valor fuera de rango.
- [ ] Fecha no ISO.
- [ ] Id inválido.
- [ ] Id repetido.
- [ ] Un elemento inválido entre varios válidos: la colección anterior se conserva.
- [ ] Tras importar se actualizan tarjetas, estadísticas y panel.

### 4.9 Panel en iframe con `postMessage`

- **Qué hace:** `panel.html` se incrusta con un `iframe` con título descriptivo. Muestra total de inscritos, cantidades por modalidad y el inscrito más reciente (o `"Sin inscripciones"`). Recibe los datos por `postMessage` y construye su propio DOM.
- **Archivos y funciones:** ⏳ Pendiente
- **Protocolo de mensajes (tipos, estructura, comprobaciones):** ⏳ Pendiente

| Nº | Pasos | Entrada | Resultado esperado | Estado |
|---|---|---|---|---|
| 1 | ⏳ | ⏳ | ⏳ | Pendiente |

Casos a cubrir:

- [ ] Carga inicial: el panel avisa y recibe el resumen.
- [ ] Alta, baja e importación actualizan el panel.
- [ ] Sin participantes: `"Sin inscripciones"`.
- [ ] **Mensaje rechazado** por origen incorrecto.
- [ ] **Mensaje rechazado** por origen de ventana (`source`) incorrecto.
- [ ] **Mensaje rechazado** por estructura o valores inválidos.
- [ ] Los mensajes rechazados no cambian la interfaz ni provocan errores.

### 4.10 Preferencias con cookies

- **Qué hace:** tema claro u oscuro y tamaño de letra normal o grande, en dos cookies independientes durante 30 días. Valida los valores recuperados. Permite restablecer.
- **Archivos y funciones:** ⏳ Pendiente
- **Atributos usados en las cookies:** ⏳ Pendiente

| Nº | Pasos | Entrada | Resultado esperado | Estado |
|---|---|---|---|---|
| 1 | ⏳ | ⏳ | ⏳ | Pendiente |

Casos a cubrir:

- [ ] Primera visita (**cookies ausentes**): tema claro y tamaño normal.
- [ ] Guardar y recargar.
- [ ] **Cookie alterada** o con valor desconocido desde DevTools.
- [ ] Restablecer y comprobar que se eliminan ambas.
- [ ] Cookies bloqueadas: el aspecto se aplica pero no se confirma el guardado.

### 4.11 Ventana de ayuda

- **Qué hace:** abre `ayuda.html` con `window.open` y guarda la referencia. Reutiliza la ventana si sigue abierta, comprueba `closed` y permite cerrarla desde la principal. Avisa si la apertura se bloquea. Muestra `navigator.language`, `location.origin` y `screen.width` / `screen.height`.
- **Archivos y funciones:** ⏳ Pendiente

| Nº | Pasos | Entrada | Resultado esperado | Estado |
|---|---|---|---|---|
| 1 | ⏳ | ⏳ | ⏳ | Pendiente |

Casos a cubrir:

- [ ] Abrir.
- [ ] Pulsar abrir con la ayuda ya abierta (se reutiliza).
- [ ] Cerrar desde la principal.
- [ ] Cerrar manualmente y volver a abrir.
- [ ] Apertura bloqueada.
- [ ] Datos del navegador mostrados.

## 5. Contenidos aplicados de cada sesión

| Sesión | Contenidos del temario | Dónde se aplican en la práctica |
|---|---|---|
| 1 | ⏳ Pendiente | ⏳ Pendiente |
| 2 | ⏳ Pendiente | ⏳ Pendiente |
| 3 | ⏳ Pendiente | ⏳ Pendiente |
| 4 | ⏳ Pendiente | ⏳ Pendiente |
| 5 | ⏳ Pendiente | ⏳ Pendiente |
| 6 | ⏳ Pendiente | ⏳ Pendiente |
| 7 | Ventanas y contextos, `iframe`, restricciones de origen, `postMessage`, cookies | ⏳ Pendiente |

## 6. Conceptos que hay que explicar

### 6.1 Carga del script
⏳ Pendiente

### 6.2 Arquitectura cliente-servidor en esta práctica
⏳ Pendiente

### 6.3 Ámbitos y hoisting
⏳ Pendiente

### 6.4 Valores truthy y falsy
⏳ Pendiente

### 6.5 Diferencia entre `||` y `??`
⏳ Pendiente

### 6.6 Restricciones entre orígenes
⏳ Pendiente

## 7. Uso de la inteligencia artificial

**Enlaces o exportaciones de los chats usados:**

- ⏳ Pendiente

**Análisis de las decisiones tomadas con ayuda de la IA:**

| Consulta (enlace o referencia) | Qué problema concreto quería resolver | Qué propuso la IA | Aceptado, cambiado o descartado y por qué | Cómo lo comprobé |
|---|---|---|---|---|
| ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |

## 8. Evidencias de depuración

### 8.1 Punto de interrupción
- **Captura:** ⏳ Pendiente (`evidencias/...`)
- **Explicación (archivo, línea, variables inspeccionadas, qué se comprobó):** ⏳ Pendiente

### 8.2 Petición en la pestaña Network
- **Captura:** ⏳ Pendiente (`evidencias/...`)
- **Explicación (método, URL, código de estado, tipo de contenido):** ⏳ Pendiente

## 9. Lista de comprobación de entrega

- [ ] Repositorio en GitHub, público o compartido con manuel.granados@eusa.es.
- [ ] Último commit anterior al 16/10/2026 a las 23:59.
- [ ] Todas las funcionalidades se pueden activar desde la interfaz HTML.
- [ ] Sin errores en la consola del navegador.
- [ ] Todas las funcionalidades tienen su caso de prueba en este README.
- [ ] Enlaces o exportaciones de los chats incluidos.
- [ ] Dos evidencias (breakpoint y Network) incluidas y explicadas.
- [ ] Correo enviado a manuel.granados@eusa.es con el enlace al proyecto.
