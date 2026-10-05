# AGENTS.md — ddc-planes-digitales (Directrices del Proyecto)

Aplicación web profesional oficial tipo Repositorio Curricular Digital para que los docentes del Ministerio de Educación Pública (MEP) de Costa Rica consulten, filtren y descarguen los planeamientos de estudio oficiales correspondientes al ciclo 2027 aprobados por el Consejo Superior de Educación (CSE).

## Ámbito de trabajo exclusivo
- **Carpeta de trabajo del proyecto:** `app/`.
- **Regla estricta:** Fuera de `app/` no se debe crear ni modificar código fuente. Todo el desarrollo de la aplicación se realiza exclusivamente dentro de `app/` y sus subcarpetas.
- **Excepción de Git y documentación raíz:** Las operaciones de Git (`commit`, `push`, `pull`, `sync`) y la documentación general del repositorio se ejecutan desde la raíz `ddc-planes-digitales`.

## Nomenclatura de Versión Institucional
- Formato oficial de versión: `[versión].[liberación].[compilado]` (ej. `1.0.1`).
  - **Versión (Mayor):** `1`
  - **Liberación (Release):** `0`
  - **Compilado (Build):** `1`
- Gestionado centralizadamente en `app/src/data/version.json`.

## Stack y Estructura
- **Tecnologías:** React 19 + JavaScript (ES Modules) + Vite + Tailwind CSS (dentro de `app/`).
- **Iconografía:** Iconos en SVG nativo sin dependencias pesadas (`src/components/Icons.jsx`).
- **Arquitectura de Maquetación:** **App Shell** (Header fijo superior `flex-shrink-0 z-20`, Footer fijo inferior `flex-shrink-0 z-20`, y contenedor principal `flex-1 overflow-y-auto` como único elemento con scroll).
- **Repositorio Físico de Documentos:** Reside **ÚNICAMENTE** en `app/public/aplicativo-planeamientos-2027/`.
  - Organizado en las **7 Ofertas Educativas Oficiales de la DDC**:
    1. `1.PREESCOLAR` (Materno Infantil y Transición).
    2. `2.PRIMERO Y SEGUNDO CICLOS` (Primaria: 1° a 6° año).
    3. `3.TERCER CICLO Y EDUCACION DIVERSIFICADA` (Secundaria: 7° a 11°/12° año en modalidades Académica y Técnica).
    4. `4.EDUCACION PERSONAS JOVENES Y ADULTAS` (EPJA: Orientaciones Generales y Guías Específicas IPEC/CINDEA).
    5. `5.EDUCACION ESPECIAL` (Centros Especiales, Aula Integrada, Audición y Lenguaje, Primera Infancia, Plan Nacional Vocacional).
    6. `6.EDUCACION INTERCULTURAL` (Culturas y Lenguas Indígenas: Bribri, Cabécar, Boruca, Ngäbe-Buglé, Maleku).
    7. `7.UNIDOCENTES` (Escuelas Unidocentes multigrado de 1° a 6°).
  - Total exacto: **197 carpetas finales con paquetes ZIP y PDFs normados**.
  - Estructura de archivos multi-archivo: Cada carpeta hoja contiene al menos un archivo `.zip` principal y admite anexos/guías adicionales sin romper el modelo.

## Comandos Oficiales
- **Servidor local de desarrollo:** `npm run dev` (ejecutado dentro de `app/`, accesible en `http://localhost:5173`).
- **Verificación de compilación:** `npm run build` (ejecutado dentro de `app/`).
- **Indexación y generación de catálogo:** `node app/scripts/generate-catalog-2027.js`.
- **Comandos Git (desde raíz `ddc-planes-digitales`):**
  - `git add -A`
  - `git commit -m "DD-MM-YYYY: [descripción de cambios]"`
  - `git push origin ddc-planes-digitales-1.0.0`

## Arquitectura de Componentes y Flujo UI
La interfaz está optimizada para eliminar redundancias y scrolls horizontales, organizada en dos bloques maestros:
1. **Encabezado Institucional Fijo (`Header.jsx`):**
   - Identidad visual oficial MEP / DDC.
   - Métricas globales en vivo (total de planeamientos y total nacional de descargas).
   - Botón institucional "Acerca de" con modal informativo (`AboutModal.jsx`).
   - Botón toggle de tema Claro / Oscuro con persistencia en `localStorage`.
   - Botón de mantenimiento "Reiniciar datos" con modal de confirmación (`ResetConfirmModal.jsx`).
2. **Banner Institucional Compacto (`WelcomeHero.jsx`):**
   - Franja de bienvenida y acreditación curricular aprobada por el CSE.
3. **Sección 1 (Hero Maestro) - Catálogo Oficial 2027 (`GeneralTable.jsx`):**
   - **Encabezado Institucional:** Título oficial y subtítulo normativo de la DDC.
   - **Barra de Herramientas Unificada (Opción A):** Franja de una sola fila compacta con buscador libre de texto, métricas de visualización, indicador de filtros activos, botón "Restablecer" y selector de paginado (`15`, `20`, `50`, `Todos`).
   - **Filtros por Columna con Checkboxes (`ColumnFilter.jsx`):** Popovers flotantes multiselección con buscador interno y botones de acción rápida (*Todos* / *Ninguno*) integrados en los encabezados `<th>` de *Oferta Educativa*, *Asignatura / Área* y *Grado / Subárea*.
   - **Tabla interactiva de 6 columnas (sin columna Código):** Máxima amplitud visual para *Oferta Educativa*, *Asignatura* (con icono vectorial temático), *Grado*, *Archivos* (etiquetas ZIP con tamaño), *Descargas* y **botón azul zafiro compacto de descarga directa**.
   - **Paginador matemático seguro:** Ventana deslizante (`paginasVisibles`) sin duplicación de índices ni clonación de nodos DOM (`key={`pag-btn-${pNum}`}`).
4. **Sección 2 - Top de Descargas Docentes (`TopDownloads.jsx`):**
   - Ranking nacional en tiempo real con soporte de estado vacío (*Zero State* cuando las descargas están en 0).
5. **Pie de Página Fijo (`Footer.jsx`):**
   - Fondo transparente con imagen institucional `footer.jpg` escalada al 100% (`bg-cover`), alternancia suave de textos y badge oficial con versión `1.0.1`.

## Datos y Persistencia
- Clave de almacenamiento en `localStorage`: `mep-ddc-planes-2027`.
- **Clave interna oculta:** La clave técnica de almacenamiento es exclusivamente de uso interno del sistema; nunca debe exponerse en textos visibles de la interfaz.
- Modelo de datos del catálogo:
  `{ id, ofertaCodigo, ofertaNombre, ofertaBadgeColor, asignatura, grado, rutaCarpeta, archivoPrincipal, rutaDescarga, archivos: [{ nombre, tipo, ruta, tamanoBytes, tamanoLegible }], descargas }`.
- Al realizar una descarga, se incrementa el contador del documento y se persiste en `localStorage`.

## Convenciones de Código y Calidad
- **Tratamiento en UI:** Todo texto dirigido a la persona usuaria debe emplear tratamiento formal de usted («seleccione», «consulte», «descargue»).
- **Ortografía RAE estricta en UI vs Rutas:** En la interfaz visual todos los nombres llevan acentuación y diacríticos oficiales (*Matemática*, *Educación Cívica*, *Sétimo*, *Décimo*, *II Ciclos*, *III Ciclo*, etc.). Las rutas en disco se mantienen limpias y sin tildes para compatibilidad con servidores Apache/Linux.
- **Codificación:** Todo archivo de texto debe mantenerse estrictamente en **UTF-8 sin mojibake**.
- **Memoria técnica:** Mantener actualizado [`app/MEMORY.md`](file:///c:/xampp/htdocs/ddc-planes-digitales/app/MEMORY.md) al concluir cada tarea relevante.