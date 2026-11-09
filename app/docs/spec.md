# ESPECIFICACIÓN TÉCNICA Y FUNCIONAL (SPEC.MD)
## Sistema Repositorio Oficial de Planes Digitales Curriculares 2027
**Ministerio de Educación Pública de Costa Rica (MEP)**  
**Dirección de Desarrollo Curricular (DDC)**  
**Consejo Superior de Educación (CSE)**  

---

| Metadato | Detalle |
| :--- | :--- |
| **Documento:** | `app/docs/spec.md` |
| **Rol en el Proyecto:** | **Única Fuente de Verdad (SSOT - Single Source of Truth)** |
| **Metodología:** | Spec-Driven Development (SDD) |
| **Versión del Sistema:** | `1.0.1` (`[versión].[liberación].[compilado]`) |
| **Estado:** | Aprobado y Vigente |
| **Repositorio:** | `producciongespro/ddc-planes-digitales` |

---

## 1. Contexto Institucional y Propósito

El encabezado presenta tres secciones dentro del **App Shell** institucional: logo MEP a la izquierda, título principal «Repositorio de Planeamientos Curriculares» centrado (con su descripción curricular como ayuda flotante al pasar el puntero o enfocar con teclado), y los controles institucionales **Inicio**, **Acerca de** y **¡Califícame!** a la derecha. La aplicación opera en un único **Modo Claro Institucional Luminoso (`#FFFFFF`)** y guía a la persona docente a través de un **recorrido visual progresivo de 4 pantallas**: *1. Ofertas Educativas $\rightarrow$ 2. Asignaturas $\rightarrow$ 3. Grado $\rightarrow$ 4. Contenido Descargable*.

### Coordinación de desarrollo
El contrato operativo de agentes está en `app/docs/agents.md` bajo el estándar
**«Roles Clave — Equipo de Desarrollo de Software de Élite»**. El Sponsor (Chris)
toma las decisiones del producto y el agente principal coordina **doce perfiles
especializados** (`product_manager`, `scrum_master`, `ux_designer`, `ui_designer`,
`brand_marketing_designer`, `software_architect`, `frontend_developer`,
`backend_developer`, `qa_engineer`, `software_tester`, `devops_sre`,
`auditor_seguridad`) registrados en `.codex/config.toml` y definidos en `app/agents/`.
Esta configuración es metadato de desarrollo fuera del código de producción.
La delegación usa las herramientas del host, hereda permisos y modelo y exige
asignación de archivos, espera de resultados y consolidación de evidencia.
Mientras se realizan pruebas o cambios locales (sean pequeños, medianos o inclusive
grandes) se ejecutan única y exclusivamente las pruebas unitarias (`npm run test:unit`
con los subagentes correspondientes), sin ejecutar arneses ni guardrails; única y
exclusivamente cuando Chris solicita ejecutar commit y sincronización en la nube,
entran en juego todos los subagentes necesarios (`qa_engineer`, `software_tester`,
`devops_sre` y `auditor_seguridad`) para ejecutar todas las pruebas, validaciones,
arneses y guardrails antes del commit.
No introduce backend ni procesos permanentes en el sitio.

### Integridad de archivos del catálogo
Cada entrada de `archivos[]` debe corresponder a un archivo físico único. La
`rutaDescarga` principal debe figurar entre esas entradas. La auditoría compara
todos los archivos del árbol público con todos los anexos del JSON y rechaza
archivos huérfanos, enlaces rotos y referencias duplicadas. Un registro puede
tener varios ZIP sin aumentar el número de planeamientos.

El **Repositorio Curricular Digital 2027** es una plataforma web oficial desarrollada para el Ministerio de Educación Pública de Costa Rica (MEP), concebida bajo la supervisión directa de la Dirección de Desarrollo Curricular (DDC).

### 1.1 Objetivo General
Proveer a todo el cuerpo docente de Costa Rica un canal institucional centralizado, veloz, accesible y autónomo para la consulta visual guiada y descarga segura de los **197 planeamientos de estudio normados** para el ciclo lectivo 2027, aprobados por el Consejo Superior de Educación (CSE).

### 1.2 Alcance del Repositorio
- **Total de Planeamientos Oficiales:** Exactamente 197 paquetes curriculares normados (207 archivos ZIP).
- **Formato de Entrega:** Archivos empaquetados en `.zip` (y soporte futuro para `.pdf`, `.docx`, `.xlsx`).
- **Soporte Multi-archivo:** Cada registro curricular puede contener uno o múltiples archivos complementarios (planes principales, anexos, guías de mediación pedagógica, plantillas).
- **Cobertura Territorial:** Diseñado para funcionar de manera fluida en cualquier centro educativo del país, incluso bajo redes con ancho de banda limitado o intermitente.

---

## 2. Requisitos Funcionales (RF)

### RF-01: Carga Asíncrona Desacoplada del Catálogo Curricular
- **Descripción:** La aplicación no empaqueta los datos dentro del bundle JavaScript de React. Consulta el archivo `/data/ddc-datos.json` como una API estática externa al iniciar.
- **Comportamiento:**
  - Ejecuta un `fetch('/data/ddc-datos.json?_t=[timestamp]', { cache: 'no-cache' })`.
  - Permite la actualización en caliente ("hot-update") de materias, rutas o anexos directamente en el servidor sin necesidad de recompilar la aplicación (`npm run build`).
  - Si la petición es exitosa, inicializa el catálogo en memoria sin estadísticas de uso.

### RF-02: Pantalla de Carga Institucional (Splash Screen) y Resiliencia de Red
- **Descripción:** Mientras los datos son consultados por red, la interfaz muestra una pantalla de bienvenida institucional a pantalla completa.
- **Comportamiento:**
  - En una carga exitosa, el splash inicial permanece visible al menos cuatro segundos desde el inicio de la consulta; una red lenta puede prolongarlo. Los errores aparecen tan pronto como se detectan.
  - Despliega el isotipo curricular provisional (escudo y libro académico en SVG MEP · DDC 2027), spinner de doble anillo giratorio y leyendas oficiales.
  - En caso de falla en la conexión (error 404, 500 o caída de red), conmuta automáticamente a una vista de contingencia con mensaje amigable y botón **"Reintentar conexión"**.

### RF-03: Flujo Visual Guiado en 4 Pantallas Progresivas (Cero Buscador de Texto)
- **Descripción:** En lugar de una tabla general con caja de búsqueda o filtros de columna, el sistema guía a la persona docente a través de **4 pantallas sucesivas de selección visual** que siempre se recorren en su totalidad (incluso cuando en algún paso intermedio exista una única opción):
  1. **Vista 1 — `Ofertas Educativas`:** Muestra en el centro la ilustración redimensionable de la persona docente con su bolso (`/assets/images/profe.png`) y alrededor los **7 botones 3D** correspondientes a las Ofertas Educativas Oficiales.
  2. **Vista 2 — `Asignaturas`:** Al seleccionar una Oferta Educativa, muestra en el centro la ilustración del bolso pedagógico (`/assets/images/bolso.png`) con la insignia de la Oferta elegida debajo, y alrededor únicamente los botones 3D de las **Asignaturas** que pertenecen a esa oferta (ordenadas alfabéticamente según el idioma español).
  3. **Vista 3 — `Grado`:** Al seleccionar una Asignatura, muestra en el centro la ilustración del cuaderno espiral (`/assets/images/cuaderno.png`) con el **nombre de la Asignatura impreso dinámicamente en mayúsculas sobre la portada**, y alrededor únicamente los botones 3D de los **Grados / Niveles / Subáreas** aplicables (ordenados por progresión académica: *Materno Infantil, Interactivo II, Transición, Grupo Heterogéneo*, seguidos de *1° a 12° año* en orden numérico, y las demás subáreas en orden alfabético español).
  4. **Vista 4 — `Contenido`:** Al seleccionar un Grado, presenta la tabla oficial titulada **`CONTENIDO DESCARGABLE`** con los archivos disponibles para ese planeamiento.

### RF-04: Barra Discreta de Migas de Pan (`Breadcrumbs`) y Retorno Rápido
- **Descripción:** En la parte superior de cada ventana se presenta el título de la etapa actual a la izquierda y, a la derecha, una barra discreta de navegación curricular (`<nav aria-label="Ruta de navegación curricular">`).
- **Comportamiento:**
  - En las Vistas 2, 3 y 4 ofrece el botón **`← Volver`** (para regresar un paso atrás, también activable con la tecla `Escape`) y los eslabones clicables de las migas de pan (`Ofertas Educativas › [Oferta] › [Asignatura] › [Grado]`).
  - Adicionalmente, el botón **`Inicio`** en el `Header` permite restablecer la navegación a la Vista 1 (`Ofertas Educativas`) en cualquier momento.

### RF-05: Tabla `CONTENIDO DESCARGABLE`, Descarga Individual y Botón «Descargar todo»
- **Descripción:** En la Vista 4 (`Contenido`), los documentos del planeamiento seleccionado se presentan en una tabla de dos columnas acompañada de un botón maestro de descarga total debajo de la tabla.
- **Comportamiento:**
  - **Tabla de 2 columnas (`CONTENIDO DESCARGABLE`):** La columna izquierda muestra el nombre del archivo y la columna derecha presenta el botón de descarga individual con el formato, tamaño legible y flecha (`ZIP (1.1 KB) ↓`).
  - **Botón «Descargar todo» debajo de la tabla:** Ubicado inmediatamente debajo de la tabla, alineado a la derecha en escritorio y a ancho completo en móvil. Permite descargar el archivo o la totalidad de los archivos del planeamiento (despachándolos de forma escalonada con intervalos de 350 ms cuando son múltiples archivos e informando mediante un aviso accesible `role="status"` que el navegador puede solicitar permiso para descargas múltiples).

### RF-06: Botones 3D 100% Dinámicos en CSS + SVG (`<PillButton3D />`)
- **Descripción:** Todos los botones de Ofertas, Asignaturas, Grados y «Descargar todo» se generan dinámicamente mediante CSS y SVG vectorial nativo (`Icons.jsx`), sin utilizar imágenes PNG estáticas de botones.
- **Comportamiento:**
  - Cada botón presenta cuerpo con gradiente luminoso, bisel inferior 3D presionable, medallón circular blanco traslúcido a la izquierda (con el icono relativo a la Oferta/Asignatura o el numeral del Grado `1°`..`11°`) y texto blanco nítido alimentado en vivo desde `/data/ddc-datos.json`.

### RF-09: Lienzo Único en Modo Claro Institucional Luminoso (`#FFFFFF`)
- **Descripción:** La aplicación opera de forma estandarizada en **Modo Claro Institucional (`#FFFFFF`)** sin interruptor de modo oscuro.
- **Comportamiento:**
  - Garantiza la fusión perfecta e invisible del fondo blanco de las 3 ilustraciones centrales (`profe.png`, `bolso.png`, `cuaderno.png`) con el escenario central y el máximo contraste de los botones 3D.

### RF-10: Modales y Controles Institucionales
- **Acerca de (`AboutModal.jsx`):** Muestra el contexto normativo, créditos institucionales de la DDC y directrices del CSE.
- **¡Califícame!:** Enlace oficial al formulario de evaluación del servicio del MEP.

---

## 3. Requisitos No Funcionales (RNF)

| Identificador | Requisito | Criterio de Aceptación |
| :--- | :--- | :--- |
| **RNF-01** | **Arquitectura App Shell y Responsividad Fluida** | Header fijo (`z-20`), Footer fijo (`z-20`). El desplazamiento vertical ocurre en el cuerpo central (`flex-1 overflow-y-auto bg-white`). Las 3 ilustraciones centrales (`profe.png`, `bolso.png`, `cuaderno.png`) y la tipografía sobre el cuaderno escalan fluidamente (`clamp()`) según el tamaño de pantalla sin desbordamiento horizontal entre 320px y 4K. |
| **RNF-02** | **Rendimiento y Peso** | El bundle JavaScript final compilado (`dist/assets/*.js`) no debe exceder los 300 KB. El tiempo de carga interactivo (LCP) debe ser inferior a 1.2 segundos sobre conexiones estándar. |
| **RNF-03** | **Portabilidad y Despliegue** | 100% estático. Debe ejecutarse de manera idéntica en Apache, NGINX, Azure Static Web Apps, AWS S3, IIS o GitHub Pages sin requerir motores PHP, Node.js ni bases de datos en el servidor de producción. |
| **RNF-04** | **Tratamiento y Accesibilidad** | Redacción formal dirigida al usuario mediante tratamiento de respeto de «usted» (*«seleccione»*, *«consulte»*, *«descargue»*). Contraste de colores apto para estándar WCAG AA y Ley 7600. |
| **RNF-05** | **Dualidad Ortográfica Estricta** | **En la Interfaz (UI):** Respeto riguroso de la ortografía RAE con todas las tildes y diacríticos oficiales (*Matemática*, *Educación Cívica*, *Sétimo*, *II Ciclos*, etc.). **En el Sistema de Archivos / Rutas:** Carpetas y nombres en disco limpios, sin tildes ni caracteres conflictivos para compatibilidad con servidores Linux/Apache. |
| **RNF-06** | **Blindaje Anti-Mojibake y UTF-8** | Todos los archivos de código, marcado, estilos y datos deben persistirse estrictamente en **UTF-8 sin BOM**. Todo script o tool debe forzar explícitamente `encoding: utf8` para impedir la corrupción de caracteres (`Ã¡`, `Ã©`, `Ã±`). |
| **RNF-07** | **Certificación Multi-Pantalla (20 Viewports)** | Layout certificado bajo una matriz exhaustiva de 20 resoluciones comerciales estándar (desde móviles plegables de 320px hasta monitores 4K de 3840px, pasando por tablets, netbooks escolares y pizarras interactivas de aula) sin quiebre de componentes. |

---

## 4. Contrato de Datos (Data Schema)

El archivo `app/public/data/ddc-datos.json` es la única fuente de verdad taxonómica.

### 4.1 Definición TypeScript / Schema de Cada Registro Curricular

```typescript
interface ArchivoCurricular {
  nombre: string;          // Ej: "plan-interactivo-i.zip"
  tipo: string;            // Ej: "ZIP", "PDF", "DOCX"
  ruta: string;            // Ruta web relativa accesible: "/data/ddc-planeamientos/preescolar/interactivo-i/plan-interactivo-i.zip"
  tamanoBytes: number;     // Tamaño exacto en bytes (ej: 1057)
  tamanoLegible: string;   // Tamaño formateado para el docente (ej: "1.0 KB", "2.4 MB")
}

interface PlaneamientoCurricular2027 {
  id: string;                  // Identificador oficial único (Ej: "DDC-2027-001")
  ofertaCodigo: string;        // Código normalizado (Ej: "PREESCOLAR", "I-II-CICLOS", "III-DIVERSIFICADA")
  ofertaNombre: string;        // Nombre visual institucional oficial (Ej: "Educación Preescolar")
  ofertaBadgeColor: string;    // Color temático Tailwind (Ej: "amber", "emerald", "blue", "indigo", "rose", "cyan", "violet")
  asignatura: string;          // Nombre de la asignatura o área curricular (Ej: "Educación Cívica", "Matemática")
  grado: string;               // Nivel o grado académico (Ej: "Primer Año (1°)", "Sétimo Año (7°)")
  rutaRelativa: string;        // Subruta física dentro de ddc-planeamientos (Ej: "preescolar/interactivo-i")
  archivos: ArchivoCurricular[]; // Lista de todos los archivos disponibles para esta materia
  archivoPrincipal: string;    // Nombre del archivo representativo primario
  rutaDescarga: string;        // Ruta web de descarga del archivo principal (Ej: "/data/ddc-planeamientos/preescolar/interactivo-i/plan-interactivo-i.zip")
  vigencia: string;            // Ciclo de vigencia oficial ("2027")
}
```

---

## 5. Taxonomía Oficial de las 7 Ofertas Educativas de la DDC

| # | Código | Oferta Curricular Oficial | Tema Visual 3D | Distribución de Registros |
| :---: | :--- | :--- | :---: | :--- |
| **1** | `PREESCOLAR` | **Educación Preescolar** | Ámbar Dorado (`amber`) | Materno Infantil (Interactivo I), Interactivo II, Transición y Grupo Heterogéneo. |
| **2** | `I-II-CICLOS` | **I y II Ciclos** | Verde Vivo (`green`) | Primaria regular de 1° a 6° año (13 asignaturas básicas y complementarias). |
| **3** | `III-DIVERSIFICADA` | **III Ciclo y Educación Diversificada** | Violeta Real (`violet`) | Secundaria Académica y Técnica de 7° a 11° año (21 asignaturas). |
| **4** | `EPJA` | **Educación de Personas Jóvenes y Adultas (EPJA)** | Azul Océano (`ocean`) | Orientaciones y guías modulares para IPEC y CINDEA (7 asignaturas). |
| **5** | `ESPECIAL` | **Educación Especial** | Magenta Inclusivo (`magenta`) | Centros Especiales, Aula Integrada, Audición y Lenguaje, PNV y Primera Infancia. |
| **6** | `INTERCULTURAL` | **Educación Intercultural** | Turquesa (`teal`) | Culturas y Lenguas Indígenas oficiales: Bribri, Cabécar, Boruca y Ngäbe-Buglé. |
| **7** | `UNIDOCENTES` | **Escuelas Unidocentes** | Naranja Terracota (`orange`) | Programas multigrado adaptados de 1° a 6° año de primaria rural (11 asignaturas). |

**Total Auditado:** 197 carpetas y registros oficiales (207 paquetes ZIP).

---

## 6. Guardrails y Reglas Inquebrantables del Arnés

Estas reglas son obligatorias y no pueden ser alteradas por ningún desarrollador ni agente autónomo de IA:

1. **PROHIBIDO EL USO DE BACKEND DINÁMICO (PHP / NODE RUNTIME):**
   - El aplicativo debe permanecer 100% estático. No se permite reincorporar endpoints PHP ni dependencias que requieran un servidor de aplicaciones en tiempo de ejecución.
2. **PROHIBIDO ACOPLAR EL CATÁLOGO AL BUNDLE:**
   - No se permite importar `ddc-datos.json` directamente en archivos `.js`/`.jsx` de React. El catálogo siempre debe obtenerse mediante `fetch('/data/ddc-datos.json')`.
3. **REGLA ESTRICTA DE CONTROL DE VERSIONES (GIT):**
   - **NUNCA** ejecutar `git commit` ni `git push` de manera automática. Todas las tareas deben validarse primero en local y esperar la autorización explícita de Chris antes de sincronizar con el repositorio remoto.
4. **BLINDAJE DE CODIFICACIÓN UTF-8 SIN BOM:**
   - Cualquier archivo generado o editado debe garantizar codificación UTF-8 sin BOM para prevenir el mojibake.
5. **PRESERVACIÓN DEL APP SHELL:**
   - El Header y Footer deben permanecer fijos en la pantalla (`flex-shrink-0 z-20`). El desplazamiento vertical principal ocurre en el área de contenido (`flex-1 overflow-y-auto`); ninguna de las 4 vistas debe causar desbordamiento horizontal de la página.
6. **ÚNICA FUENTE DE VERDAD (SSOT):**
   - Cualquier cambio en la arquitectura, requisitos o estructura debe actualizarse prioritariamente en `app/docs/spec.md` y documentarse en `app/docs/MEMORY.md`.
