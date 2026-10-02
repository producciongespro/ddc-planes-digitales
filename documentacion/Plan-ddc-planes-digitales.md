# Plan Maestro de Reestructuración Curricular: `ddc-planes-digitales`
> **Ministerio de Educación Pública de Costa Rica (MEP) — Dirección de Desarrollo Curricular (DDC)**  
> **Documento:** Plan Oficial de Arquitectura, Repositorio y Datos  
> **Versión:** 2.0 (Catálogo Completo Oficial + Modalidades) | **Fecha:** 02 de Octubre de 2026

---

## 1. Resumen Ejecutivo y Diagnóstico

En la fase inicial de prototipado se utilizó una división simplificada de 2 carpetas (`Primer ciclo` y `Segundo ciclo`) con 4 asignaturas y 24 planes. La investigación curricular sobre el sistema educativo público regular de Costa Rica evidenció la necesidad de alinear la arquitectura de la aplicación a la **taxonomía curricular real del MEP**:

1. **Primaria** se conforma formalmente por el **I Ciclo** (1.° a 3.°) y el **II Ciclo** (4.° a 6.°).
2. **Secundaria** se conforma por el **III Ciclo** (7.° a 9.°) y la **Educación Diversificada** (10.° a 11.°/12.°).
3. En Educación Diversificada coexisten dos modalidades fundamentales:
   - **Modalidad Académica:** Concluye en **Undécimo año (11.°)**.
   - **Modalidad Técnica (CTP):** Concluye en **Duodécimo año (12.°)** con especialidad técnica.
4. En Educación Diversificada la materia *Ciencias* no existe de forma unificada; se desglosa en **Biología**, **Física** y **Química**.
5. Se incorpora el **Catálogo Completo del MEP**, integrando asignaturas Básicas y Complementarias (Artes, Música, Educación Física, Idiomas Extranjeros, Religión y Filosofía), totalizando **144 planes oficiales**.

---

## 2. Jerarquía de 5 Niveles Normalizada (Carpetas sin acentos)

La estructura de carpetas físicas en `app/public/mep-ddc-planes-digitales/` y la base de datos de la aplicación se organizan bajo la siguiente cadena jerárquica:

$$\text{Nivel Educativo} \longrightarrow \text{Ciclo} \longrightarrow [\text{Modalidad}] \longrightarrow \text{Tipo de Asignatura} \longrightarrow \text{Asignatura} \longrightarrow \text{Grado / Nivel}$$

```text
app/public/mep-ddc-planes-digitales/
├── Primaria/
│   ├── I Ciclo/
│   │   ├── Basicas/
│   │   │   ├── Espanol/ (Primero, Segundo, Tercero)
│   │   │   ├── Matematicas/ (Primero, Segundo, Tercero)
│   │   │   ├── Ciencias/ (Primero, Segundo, Tercero)
│   │   │   └── Estudios Sociales/ (Primero, Segundo, Tercero)
│   │   └── Complementarias/
│   │       ├── Ingles/ (Primero, Segundo, Tercero)
│   │       ├── Educacion Fisica/ (Primero, Segundo, Tercero)
│   │       ├── Educacion Musical/ (Primero, Segundo, Tercero)
│   │       ├── Artes Plasticas/ (Primero, Segundo, Tercero)
│   │       └── Educacion Religiosa/ (Primero, Segundo, Tercero)
│   │
│   └── II Ciclo/
│       ├── Basicas/
│       │   ├── Espanol/ (Cuarto, Quinto, Sexto)
│       │   ├── Matematicas/ (Cuarto, Quinto, Sexto)
│       │   ├── Ciencias/ (Cuarto, Quinto, Sexto)
│       │   └── Estudios Sociales/ (Cuarto, Quinto, Sexto)
│       └── Complementarias/
│           ├── Ingles/ (Cuarto, Quinto, Sexto)
│           ├── Educacion Fisica/ (Cuarto, Quinto, Sexto)
│           ├── Educacion Musical/ (Cuarto, Quinto, Sexto)
│           ├── Artes Plasticas/ (Cuarto, Quinto, Sexto)
│           └── Educacion Religiosa/ (Cuarto, Quinto, Sexto)
│
└── Secundaria/
    ├── III Ciclo/
    │   ├── Basicas/
    │   │   ├── Espanol/ (Setimo, Octavo, Noveno)
    │   │   ├── Matematicas/ (Setimo, Octavo, Noveno)
    │   │   ├── Ciencias/ (Setimo, Octavo, Noveno)  <-- Ciencias unificada en III Ciclo
    │   │   ├── Estudios Sociales/ (Setimo, Octavo, Noveno)
    │   │   └── Educacion Civica/ (Setimo, Octavo, Noveno)
    │   └── Complementarias/
    │       ├── Ingles/ (Setimo, Octavo, Noveno)
    │       ├── Frances/ (Setimo, Octavo, Noveno)
    │       ├── Educacion Fisica/ (Setimo, Octavo, Noveno)
    │       ├── Educacion Musical/ (Setimo, Octavo, Noveno)
    │       ├── Artes Plasticas/ (Setimo, Octavo, Noveno)
    │       └── Educacion Religiosa/ (Setimo, Octavo, Noveno)
    │
    └── Educacion Diversificada/
        ├── Academica/
        │   ├── Basicas/
        │   │   ├── Espanol/ (Decimo, Undecimo)
        │   │   ├── Matematicas/ (Decimo, Undecimo)
        │   │   ├── Estudios Sociales/ (Decimo, Undecimo)
        │   │   ├── Educacion Civica/ (Decimo, Undecimo)
        │   │   ├── Biologia/ (Decimo, Undecimo)  <-- Separadas
        │   │   ├── Fisica/ (Decimo, Undecimo)
        │   │   └── Quimica/ (Decimo, Undecimo)
        │   └── Complementarias/
        │       ├── Ingles/ (Decimo, Undecimo)
        │       ├── Frances/ (Decimo, Undecimo)
        │       ├── Educacion Fisica/ (Decimo, Undecimo)
        │       ├── Educacion Religiosa/ (Decimo, Undecimo)
        │       └── Filosofia/ (Decimo, Undecimo)
        │
        └── Tecnica/
            ├── Basicas/
            │   ├── Espanol/ (Decimo, Undecimo, Duodecimo)
            │   ├── Matematicas/ (Decimo, Undecimo, Duodecimo)
            │   ├── Estudios Sociales/ (Decimo, Undecimo, Duodecimo)
            │   ├── Educacion Civica/ (Decimo, Undecimo, Duodecimo)
            │   ├── Biologia/ (Decimo, Undecimo, Duodecimo)
            │   ├── Fisica/ (Decimo, Undecimo, Duodecimo)
            │   └── Quimica/ (Decimo, Undecimo, Duodecimo)
            └── Complementarias/
                ├── Ingles/ (Decimo, Undecimo, Duodecimo)
                ├── Frances/ (Decimo, Undecimo, Duodecimo)
                ├── Educacion Fisica/ (Decimo, Undecimo, Duodecimo)
                └── Educacion Religiosa/ (Decimo, Undecimo, Duodecimo)
```

---

## 3. Matriz del Catálogo Completo Oficial (144 Planes)

| Nivel Educativo | Ciclo | Modalidad | Tipo | Asignaturas Incluidas | Grados | Total |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **Primaria** | I Ciclo | Regular | **Básicas** | Español, Matemáticas, Ciencias, Estudios Sociales (4) | Primero, Segundo, Tercero | **12** |
| **Primaria** | I Ciclo | Regular | **Complementarias** | Inglés, Educación Física, Música, Artes Plásticas, Religión (5) | Primero, Segundo, Tercero | **15** |
| **Primaria** | II Ciclo | Regular | **Básicas** | Español, Matemáticas, Ciencias, Estudios Sociales (4) | Cuarto, Quinto, Sexto | **12** |
| **Primaria** | II Ciclo | Regular | **Complementarias** | Inglés, Educación Física, Música, Artes Plásticas, Religión (5) | Cuarto, Quinto, Sexto | **15** |
| **Secundaria** | III Ciclo | Regular | **Básicas** | Español, Matemáticas, Ciencias, Estudios Sociales, Cívica (5) | Sétimo, Octavo, Noveno | **15** |
| **Secundaria** | III Ciclo | Regular | **Complementarias** | Inglés, Francés, Educación Física, Música, Artes, Religión (6) | Sétimo, Octavo, Noveno | **18** |
| **Secundaria** | Ed. Diversificada | Académica | **Básicas** | Español, Matemáticas, Sociales, Cívica, Biología, Física, Química (7) | Décimo, Undécimo | **14** |
| **Secundaria** | Ed. Diversificada | Académica | **Complementarias** | Inglés, Francés, Educación Física, Religión, Filosofía (5) | Décimo, Undécimo | **10** |
| **Secundaria** | Ed. Diversificada | Técnica | **Básicas** | Español, Matemáticas, Sociales, Cívica, Biología, Física, Química (7) | Décimo, Undécimo, Duodécimo | **21** |
| **Secundaria** | Ed. Diversificada | Técnica | **Complementarias** | Inglés, Francés, Educación Física, Religión (4) | Décimo, Undécimo, Duodécimo | **12** |
| **TOTAL GENERAL** | — | — | — | — | — | **144 Planes** |

---

## 4. Reestructuración de la Interfaz Web

### 4.1. Filtros en Cascada Reactiva (`SearchArea.jsx`)
1. **Texto Libre:** Búsqueda en vivo por nombre, código curricular o asignatura.
2. **Nivel Educativo:** `Todos` | `Primaria` | `Secundaria`.
3. **Ciclo:** Desplegable adaptativo según Nivel (`I Ciclo`, `II Ciclo`, `III Ciclo`, `Educación Diversificada`).
4. **Modalidad:** Visible y activo al elegir Educación Diversificada (`Todas`, `Académica`, `Técnica`).
5. **Tipo de Asignatura:** `Todas` | `Básica` | `Complementaria`.
6. **Asignatura:** Lista contextual filtrada automáticamente según ciclo y tipo.
7. **Grado / Nivel:** Ajustado dinámicamente según ciclo y modalidad (habilita Duodécimo solo en Técnica).

### 4.2. Columnas en la Tabla General (`GeneralTable.jsx`)
- **Nivel Educativo:** Badge con código de color (Primaria / Secundaria).
- **Ciclo & Modalidad:** Identificador claro (ej. *Ed. Diversificada — Técnica*).
- **Tipo:** Indicador visual de Básica o Complementaria.
- **Asignatura:** Icono temático nativo + Nombre completo.
- **Grado:** Grado oficial (1.° a 12.°).
- **Código Oficial:** Código normado MEP (ej. `MEP-SEC-DIV-TEC-BIO-12`).
- **Descargas:** Contador dinámico persistido.
- **Acciones:** Botones de visualización y descarga directa.

---

## 5. Modelo de Datos JSON (`localStorage: "mep-ddc-planes"`)

```json
{
  "id": "MEP-SEC-DIV-TEC-BIO-12",
  "nombre": "Plan de Estudio Oficial de Biología - Duodécimo Año (Técnica)",
  "nivelEducativo": "Secundaria",
  "ciclo": "Educación Diversificada",
  "modalidad": "Técnica",
  "tipo": "Básica",
  "asignatura": "Biología",
  "grado": "Duodécimo",
  "codigo": "MEP-BIO-12-TEC",
  "ruta": "/mep-ddc-planes-digitales/Secundaria/Educacion Diversificada/Tecnica/Basicas/Biologia/Duodecimo/Plan_Biologia_Duodecimo.pdf",
  "archivo": "Plan_Biologia_Duodecimo.pdf",
  "descargas": 0,
  "fechaActualizacion": "2026"
}
```

---

## 6. Gobernanza y Actualización de Archivos de Control

- **`app/AGENTS.md`:** Actualizar la sección de repositorio con la jerarquía de 5 niveles, la métrica a 144 planes, las reglas de no acentos en carpetas y la preservación del visor PDF único.
- **`app/MEMORY.md`:** Creación de la memoria técnica de arquitectura que documenta la justificación curricular del MEP, el mapeo de rutas y la estrategia de reinicio transparente de caché local.
