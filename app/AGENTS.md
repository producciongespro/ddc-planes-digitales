# AGENTS.md — ddc-planes-digitales

Aplicación web profesional tipo Biblioteca Digital Corporativa (estilo BNE) para que los docentes del MEP consulten, previsualicen y descarguen planes de estudio oficiales por ciclo, asignatura y nivel.

## Ámbito de trabajo exclusivo
- **Carpeta de trabajo del proyecto:** `app/`.
- **Regla estricta:** Fuera de `app/` no se debe crear, modificar ni tocar nada en el código. Todo el desarrollo de la aplicación se realiza exclusivamente dentro de `app/` y sus subcarpetas.
- **Excepción de Git:** Las operaciones de Git (`commit`, `push`, `pull`, `sync`) se ejecutan desde la raíz `ddc-planes-digitales` para respaldar simultáneamente `app/` y `documentacion/`.

## Stack y estructura
- React 19 + JS + Vite + Tailwind CSS (dentro de `app/`).
- Sin librerías externas de UI ni componentes pesados: iconos en SVG nativo (`src/components/Icons.jsx`).
- **Repositorio de documentos PDF:** Reside **ÚNICAMENTE** en `app/public/mep-ddc-planes-digitales/`.
  - Primer ciclo: Estudios Sociales (1° a 6°), Matemáticas (1° a 6°).
  - Segundo ciclo: Español (7° a 12°), Ciencias (7° a 12°).
  - Fuera de esta ruta no debe existir ninguna otra carpeta de planes.

## Comandos
- Servidor local de desarrollo: `cd app && npm run dev` (acceder en `http://localhost:5173`).
- Verificación de compilación: `cd app && npm run build`.
- Comandos Git (desde raíz `ddc-planes-digitales`):
  `git add app documentacion`
  `git commit -m "DD-MM-YYYY: [descripción]"`
  `git push`

## Reglas de negocio y componentes
- **3 secciones principales:** Encabezado (`Header`), Contenido principal (`SearchArea`, `TopDownloads`, `GeneralTable`) y Pie de página (`Footer`).
- **Área 1 - Búsqueda:** Filtros obligatorios por nombre, ciclo, asignatura y nivel, con resultados reactivos.
- **Área 2 - Top descargas:** Entre 4 y 10 tarjetas con nombre, icono de asignatura, nivel y total de descargas (orden descendente).
- **Área 3 - Tabla general:** Inventario consolidado del total de documentos a disposición por ciclo, asignatura y nivel.
- **Previsualización estricta:** El docente solo puede previsualizar 1 documento PDF a la vez (`PdfPreviewModal`) con opción de descarga directa.
- **Selector Claro / Oscuro:** Botón toggle en la parte superior derecha de la cabecera para alternar entre tema claro y oscuro con persistencia.

## Datos y persistencia
- `localStorage`, clave exacta: `mep-ddc-planes`.
- **Clave oculta en la UI:** La clave de almacenamiento es exclusivamente de uso interno del sistema; nunca debe exponerse de manera visible en la interfaz para los usuarios.
- Si cambias la forma de los datos, mantén compatibilidad con lo ya guardado (`{ id, nombre, ciclo, asignatura, nivel, ruta, archivo, descargas, codigo, fechaActualizacion }`).
- Al descargar, incrementar el contador `descargas` del documento correspondiente y persistir.

## Convenciones
- Textos de la interfaz en español con tratamiento formal de usted.
- Código simple, nombres descriptivos y comentarios solo donde aporten.
- Diseño limpio, profesional y responsive; cualquier pantalla o componente nuevo debe verse impecable en cualquier dispositivo.

## Forma de trabajar
- Haz solo lo que se pide: no añadas funcionalidades por tu cuenta.
- Cambios pequeños y enfocados; no reescribas lo que ya funciona.
- Trabajar siempre y únicamente dentro de `app/`.
- Al terminar, resume qué has cambiado y cualquier decisión que deba revisar.

## Límites
- ✅ Siempre: mantener textos en español formal (de usted), trabajar únicamente dentro de `app/`, respetar la regla de solo 1 PDF previsualizado a la vez, ejecutar git desde `ddc-planes-digitales`.
- ⚠️ Pregunta antes de: crear archivos nuevos, cambiar el formato de los datos guardados.
- 🚫 Nunca: crear archivos o carpetas fuera de `app/`, añadir dependencias externas o librerías de UI, mostrar la clave técnica en la UI.

## Verificación y pruebas responsive multiresolución
- Iniciar `npm run dev` en `app/` y probar en el navegador la búsqueda, filtros, visor modal único, descargas, selector claro/oscuro y Top reactivo.
- Para empezar de cero o reiniciar datos: Usar el botón "Reiniciar datos" en la cabecera o DevTools → Application → Local Storage → borrar la clave `mep-ddc-planes`.
- **Pruebas de dimensiones de pantalla (mínimo 20 resoluciones comerciales internacionales):**
  Al solicitar pruebas, verificar exhaustivamente que no existan desbordamientos horizontales, solapamientos ni elementos montados unos sobre otros en las siguientes categorías de dispositivos:
  1. *Móviles compactos / ultra estrechos:* 320×568 (iPhone SE 1st gen), 360×640 (Android estándar compacto), 360×800 (Galaxy serie A).
  2. *Móviles comerciales populares:* 375×667 (iPhone 7/8/SE 2-3), 375×812 (iPhone X/XS/11 Pro/12 mini), 390×844 (iPhone 12/13/14), 393×873 (Google Pixel 7/8), 412×915 (Samsung Galaxy S20/S21/S22/S23), 414×896 (iPhone XR/11), 428×926 (iPhone 13/14 Pro Max), 430×932 (iPhone 15/16 Pro Max).
  3. *Tablets y pantallas medianas:* 768×1024 (iPad vertical), 800×1280 (Galaxy Tab vertical), 810×1080 (iPad 10.2"), 820×1180 (iPad Air), 834×1194 (iPad Pro 11"), 1024×768 (iPad horizontal), 1024×1366 (iPad Pro 12.9" vertical).
  4. *Laptops y monitores de escritorio:* 1280×720 (HD estándar), 1280×800 (MacBook 13"), 1366×768 (Laptop comercial más vendida), 1440×900 (MacBook Air), 1536×864 (Laptop Full HD con zoom 125%), 1920×1080 (FHD escritorio / laptop), 2560×1440 (2K / QHD).

## Regla obligatoria de codificación y anti-mojibake
- Todo archivo de texto del proyecto debe mantenerse en **UTF-8 sin mojibake**.
- Ningún cambio puede introducir cadenas visibles con patrones de mojibake como
  `Ã`, `Â`, `â€™`, `â€œ`, `â€`, `` o signos de interrogación en lugar de tildes y `ñ`.
- La regla aplica a código fuente, documentación, datos JSON, HTML y CSS:
  `.js`, `.jsx`, `.md`, `.json`, `.html`, `.css` y archivos de configuración.
- No se deben reescribir archivos con comandos que puedan reinterpretar mal
  UTF-8, especialmente rondas `Get-Content` -> `Set-Content` de PowerShell
  sobre archivos con tildes, `ñ`, `ü`, signos `¿` o `¡`.
- Para editar texto con caracteres en español se debe preferir `apply_patch` o herramientas con UTF-8 estricto.
- Después de cualquier cambio que toque texto visible, documentación, datos o
  atributos accesibles, es obligatorio ejecutar esta verificación desde `app/`:
  `rg -n "Ã|Â|â€™|â€œ|â€|" src public index.html`
- El comando anterior debe terminar sin coincidencias. Si devuelve resultados,
  esos textos deben corregirse antes de cerrar la tarea.

## Regla obligatoria de idioma
- Todo texto dirigido a la persona usuaria debe usar el tratamiento formal de usted, con verbos en tercera persona singular y pronombres concordantes: «seleccione», «revise», «su», «le». No usar tuteo ni voseo, incluidos títulos, instrucciones, resultados, errores, ayudas y atributos accesibles.
- Al incorporar o revisar textos, comprobar también las conjugaciones y los pronombres enclíticos (por ejemplo, «prepárese», «edítelas»).
- La app, sus documentos, datos visibles y mensajes para usuario deben mantenerse en español con correcta ortografía y acentuación.

## Regla de commits
- **Directorio de ejecución:** Siempre ejecutar desde la carpeta raíz `ddc-planes-digitales` para incluir simultáneamente `app/` (código fuente) y `documentacion/` (notas y respaldos).
- Antes de redactar el mensaje de commit, revisar el estado real con `git status`.
- El commit debe describir de forma amplia, clara y detallada todos los cambios incluidos en esa iteración.
- El encabezado del mensaje de commit debe incluir obligatoriamente la **fecha actual** en formato `DD-MM-YYYY`. Ejemplo: `git commit -m "02-10-2026: [Descripción amplia de cambios]"`.

## Regla de sincronización con GitHub
- Ejecutar siempre desde `ddc-planes-digitales`.
- Revisar primero el estado entre la rama local y la remota (`git status`, `git branch -vv`).
- Sincronizar de forma segura realizando `git pull --rebase` si fuera necesario antes del `git push`.