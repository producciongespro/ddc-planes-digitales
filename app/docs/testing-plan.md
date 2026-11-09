# PLAN DE PRUEBAS AUTOMATIZADAS Y ARNÉS DE CALIDAD (TESTING-PLAN.MD)
## Repositorio Curricular Oficial de Planes Digitales 2027
**Ministerio de Educación Pública de Costa Rica (MEP)**  
**Dirección de Desarrollo Curricular (DDC)**  

---

| Metadato | Detalle |
| :--- | :--- |
| **Documento:** | `app/docs/testing-plan.md` |
| **Rol en el Proyecto:** | **Especificación del Arnés de Pruebas y Subagentes (SDD)** |
| **Framework:** | Vitest + React Testing Library + jsdom |
| **Estado:** | Aprobado para Implementación |
| **Versión del Sistema:** | `1.0.1` |

---

## 1. Objetivo del Plan de Pruebas

Garantizar la **estabilidad, resiliencia y cero regresiones** del Repositorio Curricular Oficial 2027 mediante la implementación de un arnés de pruebas automatizadas y la asignación de tareas a los 12 subagentes autónomos especializados del Equipo de Desarrollo de Software de Élite.

---

## 2. Pila Tecnológica del Arnés (Testing Stack)

| Herramienta | Rol en el Arnés | Justificación Técnica |
| :--- | :--- | :--- |
| **Vitest** | Test Runner principal | Framework nativo de Vite, soporta módulos ESM directamente, ejecuta pruebas a ultra-alta velocidad y comparte la misma configuración de `vite.config.js`. |
| **@testing-library/react** | Pruebas de componentes UI | Evalúa los componentes desde la perspectiva del usuario docente (accesibilidad, clicks, navegación por vistas, renderizado). |
| **@testing-library/jest-dom** | Matchers semánticos del DOM | Proporciona aserciones expresivas (`toBeInTheDocument`, `toBeDisabled`, `toHaveClass`). |
| **jsdom** | Entorno simulado de navegador | Emula `window`, `document` y APIs de red en memoria para Node.js. |

---

## 3. Arquitectura y Roles del Equipo de Desarrollo de Software de Élite

```
                         ┌────────────────────────────────────────────┐
                         │      SPONSOR / PRODUCT OWNER (Chris)       │
                         │        AGENTE PRINCIPAL (Orquestador)      │
                         └─────────────────────┬──────────────────────┘
                                               │
     ┌────────────────────┬────────────────────┼────────────────────┬────────────────────┐
     ▼                    ▼                    ▼                    ▼                    ▼
┌──────────┐        ┌──────────┐         ┌──────────┐         ┌──────────┐        ┌──────────┐
│ESTRATEGIA│        │  DISEÑO  │         │INGENIERÍA│         │ CALIDAD  │        │INFRA/SEC │
├──────────┤        ├──────────┤         ├──────────┤         ├──────────┤        ├──────────┤
│-product_ │        │-ux_      │         │-software_│         │-qa_      │        │-devops_  │
│ manager  │        │ designer │         │ architect│         │ engineer │        │ sre      │
│-scrum_   │        │-ui_      │         │-frontend_│         │-software_│        │-auditor_ │
│ master   │        │ designer │         │ developer│         │ tester   │        │ seguridad│
│          │        │-brand_   │         │-backend_ │         │          │        │          │
│          │        │ marketing│         │ developer│         │          │        │          │
└──────────┘        └──────────┘         └──────────┘         └──────────┘        └──────────┘
```

### Cadencia Operativa: Trabajo Local vs. Commit y Sincronización en la Nube
1. **Durante el trabajo y pruebas en local (cambios pequeños, medianos o inclusive grandes):** Se ejecutan **única y exclusivamente las pruebas unitarias** (`npm run test:unit` o `npx vitest run <suite-unitaria>`) con los subagentes correspondientes (`qa_engineer`, `frontend_developer`, `backend_developer`). **No** se ejecutan los arneses (`responsive`, `chaos`, `sensory`) ni los guardrails (`guardrails.test.js` / `npm run audit:guardrails`) durante las pruebas locales.
2. **Única y exclusivamente al solicitar Commit y Sincronización en la nube («ejecuta commit y sincroniza»):** Solo cuando Chris solicita hacer commit y sincronizar con el repositorio en la nube, entran en juego todos los subagentes de cierre (`qa_engineer`, `software_tester`, `devops_sre` y `auditor_seguridad`) y se ejecutan **todas las pruebas, validaciones, arneses y guardrails** antes de realizar el commit.

---

## 4. Matriz Exhaustiva de Pruebas Unitarias y de Integración

### Suite 1: `planes2027Data.test.js` (Capa de Datos y Selectores — Unitaria)
- **TEST-01:** `fetchPlanesCatalog()` consulta exitosamente `/data/ddc-datos.json` y devuelve los 197 registros curriculares con cabeceras anti-caché y parámetro `_t`.
- **TEST-02:** Manejo de contingencia: si el servidor retorna un error HTTP (ej. 404 o 500) o un JSON no válido, la función lanza una excepción descriptiva en español sin romper la ejecución.
- **TEST-03:** Selectores curriculares (`getOfertasCatalog`, `getAsignaturasByOferta`, `getGradosByOfertaAndAsignatura`, `ordenarGrados`, `getPlanesBySelection`) agrupan y ordenan con exactitud las 4 vistas.

### Suite 2: `GeneralTable.test.jsx` (Navegación Guiada en 4 Vistas, Breadcrumbs y Descargas — Unitaria)
- **TEST-07 (Vista 1 — Ofertas Educativas y Cero Buscador):** Renderiza la ilustración de la docente (`profe.png`), las Ofertas Educativas como botones interactivos y verifica que no exista ningún buscador de texto ni filtros de columna.
- **TEST-08 (Vista 2 — Asignaturas por Oferta):** Al hacer clic en una Oferta Educativa, muestra el bolso pedagógico (`bolso.png`), la insignia de la oferta elegida, las migas de pan y únicamente las asignaturas de esa oferta ordenadas alfabéticamente en español.
- **TEST-09 (Vista 3 — Grado y Portada de Cuaderno Dinámica):** Al hacer clic en una Asignatura, muestra el cuaderno (`cuaderno.png`) con el nombre de la asignatura en mayúsculas sobre la portada y los grados ordenados por progresión académica (`ordenarGrados`).
- **TEST-10 (Recorrido Estricto de 4 Pantallas):** Verifica que incluso cuando una oferta tiene 1 sola asignatura (Preescolar) o una asignatura tiene 1 solo grado (EPJA / Especial / Unidocentes), se mantienen siempre los 4 pasos explícitos.
- **TEST-11 (Vista 4 — Tabla `CONTENIDO DESCARGABLE` y Descarga Individual):** Al seleccionar un grado, muestra la tabla `CONTENIDO DESCARGABLE` con sus archivos y ejecuta `onDownload(doc, arch)` al pulsar `ZIP (...) ↓`.
- **TEST-12 (Botón `Descargar todo` debajo de la tabla):** Verifica la presencia y funcionamiento del botón **«Descargar todo»** ubicado debajo de la tabla en la Vista 4 (`onDownloadAll(doc)`).
- **TEST-13 (Retorno por Breadcrumbs y Botón `Volver`):** Verifica que el docente pueda retroceder de la Vista 4 a Grado, Asignaturas u Ofertas Educativas mediante la barra de migas de pan o el botón `← Volver`.

### Suite 3: `SplashScreen.test.jsx` y `ErrorBoundary.test.jsx` (Ciclo de Vida y Resiliencia — Unitaria)
- **TEST-14:** `SplashScreen` se renderiza de forma predeterminada mientras el estado `isLoading` sea `true`.
- **TEST-15:** Si ocurre un fallo de conexión, `SplashScreen` conmuta a la vista de error mostrando la tarjeta de contingencia y el botón **"Reintentar conexión"**.
- **TEST-16:** Presionar el botón de reintento dispara una nueva invocación a la función de carga.

### Suite 4: `guardrails.test.js` (Auditoría Automatizada de Seguridad y Arnés — Pre-Commit por `auditor_seguridad`)
- **TEST-18 (Anti-Mojibake):** Escaneo recursivo de todo el proyecto certificando que ningún archivo contenga secuencias de caracteres UTF-8 corruptos (`Ã¡`, `Ã©`, `Ã­`, `Ã³`, `Ãº`, `Ã±`, `Â°`, `â€“`).
- **TEST-19 (Zero-Windows-Paths):** Certifica que ninguna entrada en `app/public/data/ddc-datos.json` contenga rutas locales de Windows (`C:\` ni `C:\\`).
- **TEST-20 (Desacople del Bundle):** Certifica que ningún archivo en `app/src/` importe `ddc-datos.json` de forma estática.
- **TEST-21 (Regla de Tratamiento Formal):** Verifica que los textos visibles dirigidos al usuario docente en los componentes principales mantengan tratamiento de respeto de «usted».
- **TEST-25 (Rutas Web Limpias Kebab-Case):** Certifica que ninguna carpeta en `ddc-datos.json` contenga puntos ni espacios en blanco, y que las URLs de descarga sean 100% minúsculas bajo estándar POSIX RFC 3986.
- **TEST-26 (Visualización Limpia Docente):** Certifica que ninguna asignatura, grado u oferta presente prefijos numéricos ("1. ", "2. ") de cara al usuario.
- **TEST-27 (Verificación Física 100%):** Certifica que los 197 archivos ZIP principales y sus anexos existan físicamente en el disco en sus rutas relativas dentro de `app/public/data/ddc-planeamientos/`.
- **TEST-28 (Guardrail Físico de Directorios):** Escaneo recursivo de todo el árbol en disco de `app/public/data/ddc-planeamientos/`. Certifica que cada carpeta cumpla con `^[a-z0-9]+(-[a-z0-9]+)*$`.
- **TEST-29 (Guardrail Físico de Archivos ZIP):** Escaneo recursivo de todos los archivos ZIP en disco. Certifica que cada archivo cumpla con `^[a-z0-9]+(-[a-z0-9]+)*\.zip$`.
- **TEST-30 (Guardrail de Paridad Bidireccional):** Valida paridad matemática 1:1 entre los archivos del disco (`app/public/data/ddc-planeamientos/`) y los registros de `ddc-datos.json` (0 archivos huérfanos y 0 enlaces rotos).

### Suite 5: `responsive.test.jsx` (Matriz de 20 Dimensiones Comerciales de Pantalla — Pre-Commit por `auditor_seguridad`)
- **Objetivo:** Simular y certificar la fidelidad del layout App Shell, ausencia de desbordamiento horizontal (`overflow-x: hidden`), redimensionamiento fluido de ilustraciones y persistencia visual de Header y Footer a lo largo de **20 resoluciones comerciales estándar** (320px a 3840px).

### Suite 6: `chaos.test.jsx` (Arnés de Caos y Resiliencia Extrema — Pre-Commit por `auditor_seguridad`)
- **CHAOS-01 a CHAOS-08:** Caída abrupta de red, recuperación resiliente, JSON corrupto, HTTP 502, payload no tabular, registros nulos/incompletos, ráfaga de clics y descarga en lote desde la Vista 4.

### Suite 7: `sensory.test.jsx` (Arnés Sensorial, Accesibilidad Ley 7600 y WCAG AA — Pre-Commit por `auditor_seguridad`)
- **SENS-01 a SENS-08:** Skip-link, etiquetas accesibles universales, navegación por teclado a través de las 4 vistas y migas de pan, diálogo modal accesible con `Escape`, anillos de foco visibles, jerarquía semántica (`h1`/`h2`) y lienzo claro institucional luminoso.

---

## 5. Fases de Ejecución

1. **Fase 1: Estrategia, Diseño y Arquitectura (`product_manager`, `scrum_master`, `ux_designer`, `ui_designer`, `brand_marketing_designer`, `software_architect`)**
   - El `product_manager` revisa los requerimientos planteados y formula preguntas si algo está escueto; el `scrum_master` organiza el plan de trabajo.
   - Los diseñadores (`ux_designer`, `ui_designer`, `brand_marketing_designer`) validan cada ventana, flujo e identidad visual; el `software_architect` define el impacto técnico.

2. **Fase 2: Implementación y Pruebas Unitarias en Local (`frontend_developer`, `backend_developer`, `devops_sre`, `qa_engineer`)**
   - Modificación en `app/` con un único escritor por archivo y ejecución **única y exclusivamente de pruebas unitarias** (`npm run test:unit` o suite unitaria específica) durante las pruebas locales (sean cambios pequeños, medianos o inclusive grandes), sin correr arneses ni guardrails.

3. **Fase 3: Certificación Pre-Commit y Sincronización en la Nube (`qa_engineer`, `software_tester`, `devops_sre` y `auditor_seguridad`)**
   - **Única y exclusivamente** cuando Chris solicita ejecutar commit y sincronización en la nube, entran en juego todos los subagentes necesarios para correr todas las pruebas (`npm test`), validar todos los arneses y los guardrails (`npm run audit:guardrails`) y verificar el build (`npm run build`) antes del commit.
