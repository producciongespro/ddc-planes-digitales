# Plan Estratégico y Arquitectura Curricular 2027 — DDC Planes Digitales

**Ministerio de Educación Pública de Costa Rica (MEP)**  
**Dirección de Desarrollo Curricular (DDC)**  
**Versión del Software:** `1.0.1` (`[versión].[liberación].[compilado]`)  
**Estado:** Planeamientos 2027 (Aprobado por el Consejo Superior de Educación - CSE)  

---

## 1. Justificación y Propósito
El aplicativo institucional **DDC Planes Digitales** centraliza y distribuye los planeamientos educativos normados a todos los docentes de Costa Rica para el ciclo lectivo 2027. Reemplaza cualquier versión piloto previa por un repositorio robusto, auditable y de acceso instantáneo.

---

## 2. Taxonomía Curricular Oficial (197 Carpetas de Planeamiento en Formato ZIP)

La estructura física reside en `app/public/aplicativo-planeamientos-2027/` y se distribuye en 7 grandes Ofertas Educativas normadas:

```text
aplicativo-planeamientos-2027/
├── 1.PREESCOLAR/
│   ├── MATERNO INFANTIL/
│   └── TRANSICION/
│
├── 2.PRIMERO Y SEGUNDO CICLOS/ (Primaria Regular 1° a 6°)
│   ├── ARTES PLASTICAS/
│   ├── CIENCIAS/
│   ├── EDUCACION CIVICA/
│   ├── EDUCACION FISICA/
│   ├── EDUCACION MUSICAL/
│   ├── EDUCACION RELIGIOSA/
│   ├── ESPANOL/
│   ├── ESTUDIOS SOCIALES/
│   ├── FRANCES/
│   ├── INGLES/
│   └── MATEMATICAS/
│
├── 3.TERCER CICLO Y EDUCACION DIVERSIFICADA/ (Secundaria 7° a 11°/12°)
│   ├── ARTES PLASTICAS/
│   ├── BIOLOGIA/
│   ├── CIENCIAS/ (7°, 8°, 9°)
│   ├── EDUCACION CIVICA/
│   ├── EDUCACION FISICA/
│   ├── EDUCACION MUSICAL/
│   ├── EDUCACION RELIGIOSA/
│   ├── ESPANOL/
│   ├── ESTUDIOS SOCIALES/
│   ├── FILOSOFIA/ (10°, 11°)
│   ├── FISICA/
│   ├── FRANCES/
│   ├── INGLES/
│   ├── MATEMATICAS/
│   ├── PSICOLOGIA/
│   └── QUIMICA/
│
├── 4.EDUCACION PERSONAS JOVENES Y ADULTAS/ (EPJA)
│   ├── 1.ORIENTACIONES GENERALES/
│   └── 2.GUIAS ESPECIFICAS/ (IPEC y CINDEA por asignaturas)
│
├── 5.EDUCACION ESPECIAL/
│   ├── SERVICIOS DE APOYO EN AUDICION Y LENGUAJE/
│   ├── SERVICIOS EDUCATIVOS PRIMERA INFANCIA CON DISCAPACIDAD O RIESGO EN EL DESARROLLO/
│   ├── SERVICIOS DE APOYO EN AULA INTEGRADA CON DISCAPACIDAD INTELECTUAL Y MULTIPLE/
│   ├── PLAN NACIONAL DE EDUCACION VOCACIONAL (III CICLO Y DIVERSIFICADO)/
│   └── CENTROS DE EDUCACION ESPECIAL/
│
├── 6.EDUCACION INTERCULTURAL/
│   ├── CULTURA INDIGENA/ (Bribri, Cabécar, Boruca, Ngäbe-Buglé, Maleku)
│   └── LENGUA INDIGENA/ (Bribri, Cabécar, Boruca, Ngäbe-Buglé, Maleku)
│
└── 7.UNIDOCENTES/
    └── Planes Integrados Multigrado (1° a 6°) por Asignaturas Básicas y Complementarias
```

---

## 3. Arquitectura Frontend y Experiencia de Usuario
- **App Shell Viewport:** Cabecera institucional y pie de página anclados, con scroll confinado exclusivamente a la zona de trabajo central.
- **Hero Maestro Unificado (`GeneralTable.jsx`):**
  - Buscador de texto predictivo.
  - Selectores en cascada adaptativa (Oferta -> Asignatura -> Grado).
  - Selector de paginado dinámico (`15`, `20`, `50`, `Todos`).
  - Tabla de alta densidad sin desbordamiento horizontal y botón zafiro de descarga directa.
  - Paginador matemático libre de colisiones (`key={`pag-btn-${pNum}`}`).
- **Métricas y Top de Descargas (`TopDownloads.jsx`):**
  - Ranking reactivo con soporte para estado vacío inicial.
- **Pie Institucional (`Footer.jsx`):**
  - Banda oficial `footer.jpg` con transparencia de respaldo y texto de alto contraste.
  - Badge dinámico `Planeamientos 2027 v1.0.1`.

---

## 4. Persistencia y Datos
- **Almacenamiento del Navegador:** `localStorage` bajo clave interna `mep-ddc-planes-2027`.
- **Formato de Archivo:** Paquetes comprimidos oficiales `.zip` conteniendo los documentos curriculares y sus anexos.
