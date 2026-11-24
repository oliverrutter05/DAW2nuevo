# Documentación de Pruebas y Memoria — Parte 1 (Tema 5A)

## Instrucciones para abrir y ejecutar la aplicación
1. Abre la carpeta `Mini_Proyecto/parte1/` en Visual Studio Code (o sirve la carpeta raíz `Mini_Proyecto/`).
2. Inicia la extensión **Live Server** sobre `index.html`. Es importante abrirlo mediante un servidor local (`http://localhost:...`) porque `js/app.js` carga dinámicamente `js/function.js` mediante `import("./function.js")` y la ruta del CSS está definida como `/parte1/css/styles.css`.
3. Navega entre los cinco formularios mediante los botones superiores (`Socios`, `Servicios`, `Testimonios`, `Noticias`, `Citas`) o desplázate por las secciones.

---

## Casos de Prueba Mínimos Documentados

### 1. Obligatoriedad y textos
* **Prueba 1.1: Envío de formulario vacío (`form-socios`)**
  * **Entrada:** Pulsar **Registrar socio** sin haber rellenado ningún campo.
  * **Resultado esperado:** Se cancela el envío (`event.preventDefault()`), se marcan todos los campos obligatorios con `aria-invalid="true"` y clase `.invalid`, se muestran los mensajes concretos en sus `<span>` asociados con `aria-describedby` y se enfoca automáticamente el primer campo erróneo (`#socio-nombre`).
  * **Resultado obtenido:** Correcto. Se muestran los 10 mensajes de obligatoriedad y el foco pasa a `#socio-nombre`.
  * **Corrección realizada:** Ninguna.

* **Prueba 1.2: Cadena compuesta únicamente por espacios en blanco**
  * **Entrada:** Introducir `"     "` (5 espacios) en **Nombre completo** (`#socio-nombre`) y en **Título** (`#not-titulo`).
  * **Resultado esperado:** Al aplicar `.trim()` en `trimmedLengthMessage()`, la cadena queda vacía (`""`) y se rechaza como campo obligatorio.
  * **Resultado obtenido:** Correcto. Muestra `"El nombre completo es obligatorio."` y `"El título es obligatorio."`.
  * **Corrección realizada:** Ninguna.

* **Prueba 1.3: Longitudes justo por debajo, en el límite exacto y por encima**
  * **Entrada:**
    * Nombre completo (`#socio-nombre`, rango 4–50): `"Ana"` (3 chars, por debajo), `"Juan"` (4 chars, límite inferior), cadena de 50 letras (límite superior) y cadena de 51 letras (por encima, probada eliminando `maxlength` en DevTools).
    * Testimonio (`#test-texto`, rango 10–500): `"Muy bueno"` (9 chars), `"Muy bueno!"` (10 chars), 500 caracteres y 501 caracteres.
  * **Resultado esperado:** Rechazar 3 y 51 en nombre (9 y 501 en testimonio) y aceptar los límites exactos (4 y 50; 10 y 500).
  * **Resultado obtenido:** Correcto. El contador dinámico (`0 / 500 caracteres`) actualiza la longitud en tiempo real al escribir.
  * **Corrección realizada:** Ninguna.

---

### 2. Validación de números
* **Prueba 2.1: Edad del socio (`#socio-edad`)**
  * **Entrada:** `""` (vacía), `17`, `18`, `18.5` y `101`.
  * **Resultado esperado:**
    * Vacía: `"La edad es obligatoria."`
    * `17` y `101`: `"La edad debe estar entre 18 y 100 años."`
    * `18.5`: `"La edad debe ser un número entero."` (detectado con `Number.isInteger(age.valueAsNumber)` sin usar `parseInt()`).
    * `18`: Válido.
  * **Resultado obtenido:** Correcto en los cinco casos.
  * **Corrección realizada:** Ninguna.

* **Prueba 2.2: Duración del servicio (`#serv-duracion`)**
  * **Entrada:** `""` (vacío), `0`, `14`, `15`, `20` y `30`.
  * **Resultado esperado:**
    * Vacío: `"La duración es obligatoria."`
    * `0`: `"La duración no puede ser cero; el mínimo es 15 minutos."`
    * `14`: `"La duración mínima es de 15 minutos."`
    * `20`: `"La duración debe ser múltiplo de 15 minutos."`
    * `15` y `30`: Válidos.
  * **Resultado obtenido:** Correcto.
  * **Corrección realizada:** Ninguna.

* **Prueba 2.3: Precio del servicio (`#serv-precio`)**
  * **Entrada:** `""` (vacío), `-5`, `0`, `25.50` y `12.345` (tres decimales).
  * **Resultado esperado:**
    * Vacío: `"El precio es obligatorio."`
    * `-5`: `"El precio debe estar entre 0 y 9.999,99 €."`
    * `12.345`: `"El precio debe tener como máximo dos decimales."` (mediante `price.validity.stepMismatch`).
    * `0` y `25.50`: Válidos.
  * **Resultado obtenido:** Correcto.
  * **Corrección realizada:** Ninguna.

---

### 3. Validación de archivos
* **Prueba 3.1: Foto de perfil (`#socio-foto`) e Imagen de portada (`#not-imagen`)**
  * **Entrada:**
    1. Ningún archivo seleccionado (`files[0]` es `undefined`).
    2. Archivo PNG (`imagen_prueba.png`, `image/png`, `245.120 bytes`).
    3. Archivo JPEG en el límite exacto (`foto_limite.jpg`, `image/jpeg`, `5.000.000 bytes`).
    4. Archivo JPEG por encima del límite (`foto_grande.jpg`, `image/jpeg`, `5.000.001 bytes`).
  * **Resultado esperado:** Rechazar el caso 1 (obligatorio), caso 2 (MIME distinto de `image/jpeg`) y caso 4 (`file.size > 5000000`). Aceptar el caso 3 (`5.000.000 bytes` exactos incluidos).
  * **Resultado obtenido:** Correcto en ambos formularios gracias a la función reutilizable `fileMessage()`.
  * **Corrección realizada:** Ninguna.

---

### 4. Fechas, horas y selecciones
* **Prueba 4.1: Fecha de publicación de noticias (`#not-fecha`)**
  * **Entrada:** Fecha de ayer, fecha de hoy y fecha de mañana (comparadas en calendario local mediante `localCalendarDateKey(new Date())`).
  * **Resultado esperado:** Ayer y hoy muestran `"La fecha de publicación debe ser posterior a hoy."`; mañana es aceptada.
  * **Resultado obtenido:** Correcto.
  * **Corrección realizada:** Ninguna.

* **Prueba 4.2: Fecha y hora en citas (`#cita-fecha-hora`)**
  * **Entrada:** Fecha y hora pasada frente a fecha y hora futura.
  * **Resultado esperado:** Rechazar instantes pasados o iguales al actual y aceptar futuros.
  * **Resultado obtenido:** Detectado un fallo en `parte1/js/function.js`: `validateCitas()` solo comprobaba `dateTime.value ? "" : "La fecha y hora de la cita son obligatorias."`, sin verificar si el instante elegido era estrictamente posterior al momento actual (`new Date(dateTime.value) <= new Date()`).
  * **Corrección realizada:** Documentado el hallazgo en esta entrega y corregido en la ampliación (`parte2/js/function.js`) comprobando `data.dateTimeNumber <= data.now` al enviar.

* **Prueba 4.3: Desplegables (`<select>`), radios y casillas de verificación**
  * **Entrada:** Dejar `#serv-categoria`, `#cita-socio` y `#cita-servicio` en su opción inicial (`value=""`); dejar sin marcar modalidad y condiciones en socios; dejar sin marcar `#test-publicacion` en testimonios.
  * **Resultado esperado:** Los selects, radios y condiciones obligatorias bloquean el envío. En testimonios, dejar sin marcar `#test-publicacion` sí permite el envío mostrando `"Testimonio validado. Al no autorizar la publicación, queda privado."`.
  * **Resultado obtenido:** Correcto.
  * **Corrección realizada:** Ninguna.

---

### 5. Errores, eventos y seguridad
* **Prueba 5.1: Varios errores simultáneos, corrección en vivo y envío con `Intro`**
  * **Entrada:** Enviar un formulario con múltiples errores, pulsar `Intro` dentro de un `<input>`, y corregir los campos uno a uno.
  * **Resultado esperado:** Al pulsar `Intro` se dispara `submit`. Tras el primer intento (`submissionAttempted = true`), los eventos `input` y `change` revalidan inmediatamente y limpian los mensajes de error al corregirse.
  * **Resultado obtenido:** Correcto.
  * **Corrección realizada:** Ninguna.

* **Prueba 5.2: Cambio de contraseña tras error y edición tras confirmación válida**
  * **Entrada:** Escribir contraseña `"Clave1234"`, confirmar con `"Clave1234"`, enviar (sale el mensaje verde `.resumen.activo`), y luego editar el nombre o cambiar la contraseña.
  * **Resultado esperado:** Al editar cualquier campo tras una confirmación válida, `clearSummary()` oculta inmediatamente el resumen obsoleto. Si cambia la contraseña y ya no coincide con la confirmación, revalida el error.
  * **Resultado obtenido:** Correcto.
  * **Corrección realizada:** Ninguna.

---

## Reflexión sobre validación en cliente vs. servidor
La validación en JavaScript mejora la experiencia de usuario y evita envíos accidentales, pero **no aporta seguridad real**: cualquier usuario puede desactivar JavaScript, modificar el DOM o enviar peticiones HTTP directamente al servidor. En una aplicación real, el servidor debe volver a validar obligatoriamente:
1. **Todos los tipos, rangos y longitudes** de cada campo tras sanear espacios.
2. **Los archivos subidos:** verificar su firma binaria real (*magic bytes* de JPEG) y no fiarse únicamente de la extensión o cabecera `Content-Type`, además de limitar el tamaño máximo de subida en el servidor web.
3. **Las fechas y horas** respecto al reloj oficial del servidor, y la existencia real en base de datos de los IDs seleccionados (`SOC-01`, `SERV-01`, etc.) y permisos del usuario autenticado.