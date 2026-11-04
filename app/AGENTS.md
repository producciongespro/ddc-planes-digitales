# AGENTS.md — ddc-planes-digitales (Directrices del Proyecto)

Aplicación web profesional oficial tipo Repositorio Curricular Digital para que los docentes del Ministerio de Educación Pública (MEP) de Costa Rica consulten, filtren y descarguen los planeamientos de estudio oficiales correspondientes al ciclo 2027 aprobados por el Consejo Superior de Educación (CSE).

## Ámbito de trabajo y Única Fuente de Verdad (SSOT)
- **Carpeta de trabajo del proyecto:** `app/`.
- **Única Fuente de Verdad (SSOT - Spec-Driven Development):** Reside exclusivamente en `app/docs/`.
  - Todas las especificaciones, requisitos, arquitectura (`spec.md`) y memoria técnica persistente (`MEMORY.md`) se gestionan dentro de `app/docs/`.
  - El código debe ceñirse con fidelidad a lo especificado en `app/docs/`.
- **Regla estricta:** Fuera de `app/` no se debe crear ni modificar código fuente. Todo el desarrollo de la aplicación se realiza exclusivamente dentro de `app/` y sus subcarpetas.
- **Excepción de Git:** Las operaciones de Git (`commit`, `push`, `pull`, `sync`) se ejecutan desde la raíz `ddc-planes-digitales`.
- **Regla Estricta de Control de Versiones:** NUNCA ejecutar `git commit` ni sincronizar (`git push`) de forma automática. Siempre implementar y verificar en local, y consultar/esperar la instrucción expresa de Chris antes de commitear y sincronizar.

## Coordinación de agentes de desarrollo (Equipo de Desarrollo de Software de Élite)
- **Jerarquía:** Chris actúa como Sponsor y tomador de decisiones del producto; el Agente Principal actúa como Orquestador General y coordina a los **12 subagentes especializados** ("los muchachos del equipo") registrados en `.codex/config.toml` de la raíz con perfiles en `app/agents/`:
  - **1. Estrategia y Producto:**
    1. `product_manager` (`app/agents/product-manager.toml`): **Product Manager (PM)** (*Analista de Producto y Visión*) — Define la visión y roadmap, levanta y analiza requerimientos, detecta vacíos formulando preguntas de clarificación, prioriza funciones y traduce ideas en historias de usuario claras.
    2. `scrum_master` (`app/agents/scrum-master.toml`): **Scrum Master / Delivery Manager** (*Planificador Operativo*) — Planifica sprints/ciclos, coordina al equipo a diario, elimina obstáculos y controla el avance y cumplimiento de metas.
  - **2. Diseño UI/UX de Élite:**
    3. `ux_designer` (`app/agents/ux-designer.toml`): **UX Designer & Researcher** (*Experiencia de Usuario y Usabilidad*) — Investiga el comportamiento del usuario final, diseña la arquitectura de información y mapas de navegación, y valida que el sistema sea intuitivo sin fricciones.
    4. `ui_designer` (`app/agents/ui-designer.toml`): **UI Designer** (*Diseño de Interfaz Gráfica de Élite*) — Diseña el aspecto visual funcional (paletas, tipografías, iconografía), construye el Design System con componentes reutilizables, define micro-interacciones y entrega pantallas al píxel.
    5. `brand_marketing_designer` (`app/agents/brand-marketing-designer.toml`): **Brand & Visual Marketing Designer** (*Director de Arte, Branding y Estética Visual*) — Custodia la identidad visual y personalidad de marca ("la cara linda"), diseña activos visuales de alto impacto, fuentes llamativas, colocación estratégica de imágenes/ilustraciones y piezas de marketing.
  - **3. Arquitectura e Ingeniería:**
    6. `software_architect` (`app/agents/software-architect.toml`): **Software Architect / Tech Lead** (*El Gurú y Líder Técnico*) — Diseña la arquitectura interna escalable y robusta, elige el stack, define estándares de código limpio y realiza Code Reviews.
    7. `frontend_developer` (`app/agents/frontend-developer.toml`): **Frontend Senior Developer** (*Especialista en Ingeniería de Interfaz*) — Programa toda la parte visual e interactiva, convierte diseños UI/UX en código al píxel, optimiza a 60fps y asegura responsividad 100%.
    8. `backend_developer` (`app/agents/backend-developer.toml`): **Backend Senior Developer** (*Motor de Negocio y Bases de Datos*) — Programa la lógica central del negocio, algoritmos, estructuras de datos, scripts y contratos de API/integraciones (respetando en este proyecto el Guardrail #1 de 100% estático en runtime web).
  - **4. Calidad y Pruebas:**
    9. `qa_engineer` (`app/agents/qa-engineer.toml`): **QA Engineer / Automation** (*Aseguramiento de Calidad Preventivo*) — Define planes de prueba y criterios de aceptación, programa suites automatizadas y ejecuta únicamente pruebas unitarias en el trabajo local (cambios pequeños, medianos o grandes), reservando la regresión completa exclusivamente para cuando se solicita commit y sincronización.
    10. `software_tester` (`app/agents/software-tester.toml`): **Software Tester** (*Control de Calidad y Pruebas Manuales*) — Ejecuta pruebas manuales/exploratorias y casos extremos poniéndose en los zapatos del usuario final, verifica al 100% la interfaz contra el diseño original y documenta bugs.
  - **5. Infraestructura y Auditoría:**
    11. `devops_sre` (`app/agents/devops-sre.toml`): **DevOps / SRE Engineer** (*Infraestructura Cloud y Despliegue*) — Configura empaquetado e infraestructura, automatiza tuberías CI/CD, supervisa disponibilidad/rendimiento y gestiona respaldos.
    12. `auditor_seguridad` (`app/agents/auditor-seguridad.toml`): **Auditor de Seguridad y Calidad** (*DevSecOps / Auditoría TI*) — Audita código fuente, dependencias e infraestructura, verifica normativas legales y certifica los 10 Guardrails y arneses única y exclusivamente cuando se solicita commit y sincronización en la nube.
- **Protocolo obligatorio:** Lea `app/docs/agents.md`; delegue trabajo independiente con un único escritor por archivo, espere informes y consolide evidencia. Los roles de producto, diseño, arquitectura, testing manual y auditoría no editan código de producción; los subagentes no delegan recursivamente.
- **Excepción de metadatos:** `AGENTS.md` y `.codex/config.toml` en la raíz son configuración de desarrollo; el código del sitio y la SSOT permanecen en `app/`.

## Nomenclatura de Versión Institucional
- Formato oficial de versión: `[versión].[liberación].[compilado]` (ej. `1.0.1`).
  - **Versión (Mayor):** `1`
  - **Liberación (Release):** `0`
  - **Compilado (Build):** `1`
- Gestionado centralizadamente en `app/src/data/version.json`.

## Stack y Estructura
- **Tecnologías:** React 19 + JavaScript (ES Modules) + Vite + Tailwind CSS (dentro de `app/`).
- **Arquitectura de Datos:** **100% Estática y Desacoplada**. No utiliza PHP ni escaneo de backend. El frontend consulta asíncronamente `/data/ddc-datos.json` como una API externa con cabeceras anti-caché.
- **Iconografía:** Iconos en SVG nativo sin dependencias pesadas (`src/components/Icons.jsx`).
- **Arquitectura de Maquetación:** **App Shell** (Header fijo superior `flex-shrink-0 z-20`, Footer fijo inferior `flex-shrink-0 z-20`, y contenedor principal `flex-1 overflow-y-auto` como único elemento con scroll).
- **Repositorio Físico de Documentos:** Reside **ÚNICAMENTE** en `app/public/data/ddc-planeamientos/`.
  - Organizado en las **7 Ofertas Educativas Oficiales de la DDC** en kebab-case limpio:
    1. `preescolar` (Materno Infantil y Transición).
    2. `primero-y-segundo-ciclos` (Primaria: 1° a 6° año).
    3. `tercer-ciclo-y-educacion-diversificada` (Secundaria: 7° a 11°/12° año en modalidades Académica y Técnica).
    4. `4.EDUCACION PERSONAS JOVENES Y ADULTAS` (EPJA: Orientaciones Generales y Guías Específicas IPEC/CINDEA).
    5. `5.EDUCACION ESPECIAL` (Centros Especiales, Aula Integrada, Audición y Lenguaje, Primera Infancia, Plan Nacional Vocacional).
    6. `6.EDUCACION INTERCULTURAL` (Culturas y Lenguas Indígenas: Bribri, Cabécar, Boruca, Ngäbe-Buglé, Maleku).
    7. `7.UNIDOCENTES` (Escuelas Unidocentes multigrado de 1° a 6°).
  - Total exacto: **197 carpetas finales con paquetes ZIP y documentos normados**.
  - Estructura multi-archivo: Cada fila soporta múltiples archivos ZIP/anexos con descarga secuencial en lote y chips interactivos individuales.

## Comandos Oficiales y Arnés de Pruebas
- **Servidor local de desarrollo:** `npm run dev` (ejecutado dentro de `app/`, accesible en `http://localhost:5173`).
- **Verificación de compilación:** `npm run build` (ejecutado dentro de `app/`).
- **Pruebas Unitarias para Trabajo Local (cambios pequeños, medianos o grandes):** `npm run test:unit` o `npx vitest run <suite-unitaria>` (ejecutado dentro de `app/`). **Regla Estricta de Trabajo Local:** Mientras se hacen pruebas o cambios en local (sean pequeños, medianos o inclusive grandes), se ejecutan **única y exclusivamente las pruebas unitarias** con los subagentes correspondientes (`qa_engineer`, `frontend_developer`, `backend_developer`). **NO** se ejecutan los arneses (`responsive`, `chaos`, `sensory`) ni los guardrails (`guardrails.test.js` / `npm run audit:guardrails`) durante el desarrollo local.
- **Ejecución Completa de Pruebas, Arneses y Guardrails (Exclusivo Pre-Commit y Sincronización):**
  **Única y exclusivamente cuando Chris solicita ejecutar commit y sincronización en el repositorio en la nube** («ejecuta commit y sincroniza»), entran en juego todos los subagentes de cierre (`qa_engineer`, `software_tester`, `devops_sre` y `auditor_seguridad`) y se ejecutan todas las pruebas, validaciones, arneses y guardrails en las 3 puertas en cascada antes del commit:
  1. `npm run audit:guardrails` (10 Guardrails auditados por `auditor_seguridad`).
  2. `npm test` (Suite completa + Arnés 20 Viewports + Arnés de Caos + Arnés Sensorial por `qa_engineer`, `software_tester` y `auditor_seguridad`).
  3. `npm run build` (Empaquetado limpio < 300 KB verificado por `devops_sre`).
- **Comandos Git (desde raíz `ddc-planes-digitales`, SOLO bajo autorización expresa de Chris tras superar el Quality Gate):**
  - `git add -A`
  - `git commit -m "DD-MM-YYYY: [descripción de cambios]"`
  - `git push origin ddc-planes-digitales-2.0.0`

## Arquitectura de Componentes y Flujo UI
1. **Pantalla de Carga y Contingencia de Red (`SplashScreen.jsx`):**
   - Isotipo curricular provisional institucional (escudo y libro académico MEP · DDC 2027).
   - Spinner de doble anillo en rotación suave.
   - Manejo de contingencia por desconexión o fallo HTTP con botón de reintento.
2. **Encabezado Institucional Fijo (`Header.jsx`):**
   - Identidad visual oficial MEP / DDC (`header.jpg`).
   - Botón institucional "Acerca de" con modal informativo (`AboutModal.jsx`).
   - Botón toggle de tema Claro / Oscuro con persistencia en `localStorage`.
3. **Encabezado de tres secciones:** Logo MEP a la izquierda, título y descripción al centro, y controles de tema, Acerca de y Califícame a la derecha.
4. **Catálogo Oficial 2027 (`GeneralTable.jsx`):**
   - **Encabezado Institucional:** Título oficial y subtítulo normativo de la DDC.
   - **Barra de Herramientas Unificada (Opción A):** Franja de una sola fila compacta con buscador predictivo libre, métricas, botón "Restablecer" y selector de paginado (`15`, `20`, `50`, `Todos`).
   - **Filtros por Columna con Checkboxes (`ColumnFilter.jsx`):** Popovers flotantes multiselección con estado borrador (draft), botones *Aplicar*, *Cancelar*, *Marcar todas* y *Desmarcar todas*.
   - **Tabla interactiva de 4 columnas:** *Oferta Educativa*, *Asignatura* (con icono vectorial temático), *Grado* y *Archivos* (chips interactivos individuales con tamaño en KB/MB y descarga directa).
   - **Paginador matemático seguro:** Ventana deslizante (`paginasVisibles`) con botones *« Primero*, *‹ Anterior*, numéricos, *Siguiente ›* y *Último »*.
5. **Pie de Página Fijo (`Footer.jsx`):**
   - Fondo transparente con imagen institucional `footer.jpg` escalada al 100% (`bg-cover`) y badge oficial con versión `1.0.1`.

## Datos y Persistencia
- **Catálogo Maestro:** Reside exclusivamente en `app/public/data/ddc-datos.json` (rutas relativas universales, sin rutas físicas de Windows).
- **Persistencia de preferencia visual:** Solo el tema se guarda en `localStorage` con la clave `mep-theme`. No se registran descargas.

## Convenciones de Código y Calidad
- **Tratamiento en UI:** Todo texto dirigido a la persona usuaria debe emplear tratamiento formal de usted («seleccione», «consulte», «descargue»).
- **Ortografía RAE estricta en UI vs Rutas:** En la interfaz visual todos los nombres llevan acentuación y diacríticos oficiales (*Matemática*, *Educación Cívica*, *Sétimo*, *Décimo*, *II Ciclos*, *III Ciclo*, etc.). Las rutas en disco se mantienen limpias y sin tildes para compatibilidad con servidores Apache/Linux.
- **Regla Estricta Anti-Mojibake y Codificación UTF-8:**
  El **mojibake** (corrupción de caracteres diacríticos como tildes, eñes o signos: `Ã¡`, `Ã©`, `Ã­`, `Ã³`, `Ãº`, `Ã±`, `Â°`, `â€“`) está terminantemente prohibido en cualquier archivo del proyecto. Para prevenirlo de forma infalible, se establecen las siguientes directrices obligatorias:
  1. **Codificación Universal UTF-8 sin BOM:** Todo archivo creado o modificado (`.json`, `.jsx`, `.js`, `.html`, `.md`, `.css`, `.txt`) DEBE guardarse estrictamente en formato **UTF-8 sin BOM** (Byte Order Mark).
  2. **Operaciones en Terminal y Scripts (PowerShell / Node.js):** Nunca asumir la codificación por defecto del sistema operativo (evitar Windows-1252 o ANSI). En Node.js, siempre declarar explícitamente `encoding: 'utf8'` en lecturas y escrituras (`fs.readFileSync(path, 'utf8')`, `fs.writeFileSync(path, data, 'utf8')`). En PowerShell, forzar `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8` y parámetros `-Encoding utf8` en `Set-Content` / `Out-File`.
  3. **Catálogo `public/data/ddc-datos.json`:** Los valores con tildes (*Educación*, *Orientación*, *Ciencias*, *Español*, *Francés*, *Guía*, *Música*, *Filosofía*, etc.) deben conservarse como caracteres UTF-8 nativos directos y legibles, nunca con dobles codificaciones ni caracteres rotos.
  4. **Metadatos Web y HTTP:** `index.html` debe mantener `<meta charset="UTF-8" />` como primer hijo del `<head>`.
  5. **Auditoría Preventiva Obligatoria:** Antes de dar por concluida cualquier edición, se debe verificar que los textos con caracteres especiales en español (`á, é, í, ó, ú, ñ, Ñ, ¿, ¡, °`) se lean limpios e impecables en la interfaz y en disco.
- **Certificación Multi-Pantalla Obligatoria (20 Viewports):** Única y exclusivamente al momento de ejecutar commit y sincronización en la nube, todo cambio se somete a la batería de pruebas en 20 resoluciones comerciales estándar (de 320px a 3840px) para certificar cero desbordamientos horizontales (`overflow-x`) y preservación del App Shell.
- **Memoria técnica:** Mantener actualizado `app/docs/MEMORY.md` al concluir cada tarea relevante.
