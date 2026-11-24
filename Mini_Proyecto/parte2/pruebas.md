# Documentación de Pruebas y Memoria Final — Parte 2 (Tema 5B)

## Instrucciones para abrir y ejecutar la aplicación
1. Abre la carpeta `Mini_Proyecto/parte2/` en Visual Studio Code.
2. Ejecuta la extensión **Live Server** sobre `parte2/index.html` (es necesario servidor HTTP porque `js/app.js` usa `type="module"` para importar `js/function.js`).
3. **Pruebas de integración:** Utiliza la barra de navegación superior (`Socios`, `Servicios`, `Testimonios`, `Noticias`, `Citas`, `Demo Pattern`) para probar cada formulario.
4. **Nota sobre `pruebas.js`:** En `parte2/index.html` está enlazado `<script src="pruebas.js" defer></script>`; crea o ejecuta dicho archivo en la carpeta `parte2/` (o abre la consola `F12` del navegador) para lanzar las comprobaciones unitarias de las funciones exportadas en `js/function.js`.

---

## Casos de Prueba Mínimos (Parte 2)

### 1. Nombre y normalización (`normalizeSpaces` e `isValidMemberName`)
* **Prueba 1.1: Normalización de espacios exteriores e interiores**
  * **Entrada:** `"   Ana    López  "`
  * **Resultado esperado:** `normalizeSpaces()` elimina espacios iniciales/finales y reduce los espacios interiores múltiples a un único espacio ASCII, convirtiéndolo en `"Ana López"` (9 caracteres). Cumple la regex y la longitud (4–50), por lo que es válido.
  * **Resultado obtenido:** Correcto. El input se normaliza a `"Ana López"` y el resumen muestra `"Socio Ana López (...) registrado correctamente."`.
  * **Corrección realizada:** Ninguna.

* **Prueba 1.2: Caracteres no permitidos y límites de longitud**
  * **Entrada:** `"Ana2 López"` (número), `"Ana-López"` (guion), `"   Ana   "` (3 caracteres tras normalizar, por debajo del mínimo de 4) y cadena de 51 letras (por encima de 50).
  * **Resultado esperado:** Todos deben fallar y mostrar el mensaje de error en `#err-socio-nombre`.
  * **Resultado obtenido:** Correcto.
  * **Corrección realizada:** Ninguna.

---

### 2. Usuario y contraseña (límites y repetición doble)
* **Prueba 2.1: Validación de Usuario (`isValidMemberUsername`, ejecutada 2 veces seguidas)**
  * **Entrada:**
    * Válidos: `"ana77"` (5 chars, límite inferior) y `"UsuarioDeVeinteCar20"` (20 chars, límite superior).
    * Inválidos: `"7ana7"` (empieza por cifra), `"ana_7"` (contiene guion bajo), `"ana7"` (4 chars) y `"UsuarioConVeintiunC21"` (21 chars).
  * **Resultado esperado:** Aceptar `"ana77"` y `"UsuarioDeVeinteCar20"` en ambas ejecuciones consecutivas; rechazar los inválidos sin efectos secundarios de estado interno.
  * **Resultado obtenido:** Correcto en la 1.ª y 2.ª repetición.
  * **Corrección realizada:** Ninguna.

* **Prueba 2.2: Validación de Contraseña (`isValidMemberPassword`, ejecutada 2 veces seguidas)**
  * **Entrada:**
    * Válidas: `"Clave_12"` (8 chars, límite inferior) y `"Clave_1234567890"` (16 chars, límite superior).
    * Inválidas: `"1Clave_2"` (empieza por cifra), `"Clave-12"` (guion medio), `"Clave_1"` (7 chars) y `"Clave_12345678901"` (17 chars).
  * **Resultado esperado:** Aceptar `"Clave_12"` y `"Clave_1234567890"` en ambas ejecuciones sin aplicar `trim()`; rechazar el resto.
  * **Resultado obtenido:** Correcto en la 1.ª y 2.ª repetición.
  * **Corrección realizada:** Ninguna.

---

### 3. Teléfono y códigos (`isValidPhone`, `isValidServiceCode`, `isValidAppointmentReference`)
* **Prueba 3.1: Formato de Teléfono español**
  * **Entrada:**
    * Válido: `"+34 612 345 678"`
    * Inválidos: `"34 612 345 678"` (sin `+`), `"+34612345678"` (sin espacios), `"+34 512 345 678"` (primera cifra nacional `5`, fuera de `[6789]`) y `"+34 612 345 6789"` (una cifra de más).
  * **Resultado esperado:** Solo `"+34 612 345 678"` es válido; los 4 restantes muestran error en `#err-socio-telefono`.
  * **Resultado obtenido:** Correcto.
  * **Corrección realizada:** Ninguna.

* **Prueba 3.2: Códigos de Servicio y Referencias de Cita**
  * **Entrada:**
    * Válidos: `"DEP-007"`, `"CITA-0001"` y `"RES-0001"`.
    * Inválidos: `"dep-007"` (minúsculas), `"DEP-07"` (2 cifras), `"XDEP-007"` (texto prefijado), `"XCITA-0001"` (texto prefijado) y `"RES-001"` (3 cifras).
  * **Resultado esperado:** Aceptar los 3 primeros y rechazar los 5 últimos.
  * **Resultado obtenido:** Correcto.
  * **Corrección realizada:** Ninguna.

---

### 4. Métodos de texto (`extractDigitSequences` y `splitNewsTags`)
* **Prueba 4.1: Búsqueda de secuencias de cifras en Testimonios (`match` + regex global)**
  * **Entrada:**
    * `"Hay 12 clases y 3 pistas"`
    * `"Un club excelente sin números"`
  * **Resultado esperado:** Al pulsar **Extraer cifras del testimonio**, el primer caso muestra `Cifras encontradas: 12, 3` (array `["12", "3"]`) y el segundo `No se encontraron cifras.` (array `[]`).
  * **Resultado obtenido:** Correcto.
  * **Corrección realizada:** Ninguna.

* **Prueba 4.2: Separación de etiquetas en Noticias (`split` + `trim` + `filter`)**
  * **Entrada:**
    * `"club, salud,, verano"`
    * `""` (vacía) y `" , , "` (comas y espacios sobrantes).
  * **Resultado esperado:** El primer caso produce `["club", "salud", "verano"]` (3 etiquetas, mostradas en el resumen como `Etiquetas: club, salud, verano`). Las entradas vacías o solo con comas producen `[]` (`Etiquetas: ninguna`).
  * **Resultado obtenido:** Correcto.
  * **Corrección realizada:** Ninguna.

---

### 5. Integración con reglas de la Parte 1
* **Prueba 5.1: RegEx correcta junto con errores de la Parte 1 y recuperación**
  * **Entrada:** Rellenar `#serv-codigo` con `"DEP-007"` (válido), pero introducir duración `20` (no múltiplo de 15) o edad `17` en socios. Después, corregir la duración a `30` (o la edad a `18`).
  * **Resultado esperado:** Aunque la expresión regular sea válida, el formulario no se envía hasta corregir el resto de restricciones. Al corregirlas durante `input`/`change`, los mensajes de error desaparecen y el envío muestra la confirmación simulada.
  * **Resultado obtenido:** Correcto.
  * **Corrección realizada:** Ninguna.

---

## Memoria Técnica Breve

### Explicación de cada patrón por partes y banderas
1. **Normalización (`normalizeSpaces`):**
   * `value.replace(/^\s+|\s+$/g, "").replace(/ {2,}/g, " ")`: la primera expresión elimina espacios en blanco al inicio (`^\s+`) y al final (`\s+$`) de toda la cadena (`g`); la segunda localiza secuencias de 2 o más espacios ASCII (` {2,}`) y las reemplaza por un único espacio.
2. **Nombre completo (`/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?: [A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/`):**
   * `^` y `$`: anclan inicio y fin para exigir coincidencia completa (complementado además con `matchesEntireValue`).
   * `[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+`: primera palabra formada exclusivamente por letras ASCII o vocales acentuadas/diéresis/eñe españolas.
   * `(?: [A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*`: grupo no capturador opcional que permite palabras adicionales separadas por **exactamente un espacio ASCII**.
3. **Usuario (`/^[A-Za-z][A-Za-z0-9]{4,19}$/`):**
   * `^[A-Za-z]`: obliga a empezar por una letra ASCII (sin tildes ni números).
   * `[A-Za-z0-9]{4,19}$`: de 4 a 19 caracteres alfanuméricos ASCII (total 5–20 caracteres), excluyendo espacios y guiones bajos.
4. **Contraseña (`/^[A-Za-z][A-Za-z0-9_]{7,15}$/`):**
   * `^[A-Za-z]`: primer carácter letra ASCII.
   * `[A-Za-z0-9_]{7,15}$`: de 7 a 15 caracteres compuestos por letras ASCII, dígitos o guion bajo `_` (total 8–16 caracteres).
5. **Teléfono (`/^\+34 [6789][0-9]{2} [0-9]{3} [0-9]{3}$/`):**
   * `^\+34 `: prefijo literal `+34` (escapando `+` con `\+`) seguido de un espacio.
   * `[6789][0-9]{2}`: primer bloque nacional de 3 cifras empezando obligatoriamente por `6`, `7`, `8` o `9`.
   * ` [0-9]{3} [0-9]{3}$`: dos bloques finales de 3 dígitos separados por espacios simples.
6. **Código de servicio (`/^DEP-[0-9]{3}$/`):**
   * Exige literalmente `DEP-` en mayúsculas seguido de exactamente 3 cifras del `0` al `9`.
7. **Referencia de cita (`/^(?:CITA|RES)-[0-9]{4}$/`):**
   * `(?:CITA|RES)`: alternancia entre `CITA` o `RES` agrupada para que las anclas `^` y `$` afecten a ambas opciones, seguida de `-` y 4 dígitos.
8. **Búsqueda de cifras (`/[0-9]+/g`):**
   * Única expresión que utiliza la bandera global **`g`**, ya que se pasa a `String.prototype.match()` para obtener **todas** las subcadenas numéricas consecutivas del testimonio. En los validadores de formato se omite `g` (y se usa `exec` verificando `match[0] === value`) para evitar mutaciones del puntero `lastIndex` entre llamadas repetidas.

### Formato frente a significado
* Que un dato cumpla una expresión regular valida su **sintaxis o formato** (por ejemplo, que `+34 612 345 678` respeta la estructura de numeración móvil española o que `DEP-007` sigue la nomenclatura interna), pero **no garantiza su significado ni veracidad en el mundo real** (el teléfono puede no existir o pertenecer a otra persona, y el código `DEP-007` puede no corresponder a ningún servicio dado de alta en la base de datos).

### Comparación entre JavaScript y `pattern` (`#seccion-demo-pattern`)
* **Vacío:** Si el campo está vacío, el atributo `pattern="DEP-[0-9]{3}"` **no produce error por sí solo**; es imprescindible añadir el atributo `required` para bloquear valores vacíos.
* **Código correcto (`DEP-007`):** Tanto la validación nativa con `pattern` como el validador JavaScript lo aceptan. El navegador aplica anclas implícitas a toda la cadena en `pattern` (por eso se escribe sin barras `/.../` ni banderas).
* **Texto adicional (`XDEP-007` o `DEP-0079`):** Ambos lo rechazan, aunque `pattern` muestra un globo nativo genérico del navegador (orientado con `title`), mientras que JavaScript permite controlar exactamente el momento de validación, el estilo accesible (`aria-invalid`, `aria-describedby`) y el mensaje concreto.
* **Limitaciones de `pattern`:** Solo comprueba patrones sobre cadenas de texto; **no puede sustituir** reglas de negocio ni binarias como comprobar el tamaño en bytes o tipo MIME real de una imagen (`files[0]`), verificar que un número sea entero (`Number.isInteger`) o comparar una fecha/hora con el reloj local actual.