# DDC Planes Digitales (Repositorio Curricular Oficial 2027)

Aplicación web institucional desarrollada para el **Ministerio de Educación Pública de Costa Rica (MEP)** y la **Dirección de Desarrollo Curricular (DDC)**. Permite a los docentes de todo el país consultar, filtrar y descargar los planeamientos educativos oficiales aprobados por el Consejo Superior de Educación (CSE) para el ciclo lectivo 2027.

---

## 📌 Especificaciones Generales
- **Versión del Software:** `1.0.1` (`[versión].[liberación].[compilado]`)
- **Total de Planeamientos:** 197 carpetas y paquetes normados oficiales en formato ZIP.
- **Ofertas Educativas:** 7 ramas oficiales de la DDC:
  1. Educación Preescolar (Materno Infantil y Transición)
  2. I y II Ciclos (Primaria regular de 1° a 6° año)
  3. III Ciclo y Educación Diversificada (Secundaria Académica y Técnica)
  4. Educación de Personas Jóvenes y Adultas (EPJA - IPEC / CINDEA)
  5. Educación Especial (Servicios y Centros de Apoyo)
  6. Educación Intercultural (Culturas y Lenguas Indígenas)
  7. Escuelas Unidocentes (Multigrado)

---

## 🚀 Tecnologías y Arquitectura
- **Frontend:** React 19, JavaScript moderno (ES Modules), Tailwind CSS, Vite.
- **Arquitectura de Maquetación:** **App Shell** (Header y Footer anclados al viewport, scroll confinado al contenedor central).
- **Iconografía:** Iconos temáticos vectoriales en SVG nativo sin dependencias externas.
- **Persistencia de Métricas:** Almacenamiento local seguro (`localStorage`) con migración automática y sincronización de descargas en tiempo real.
- **Temas:** Soporte nativo para modo Claro y Oscuro con persistencia institucional.

---

## 💻 Instalación y Ejecución Local

### Prerrequisitos
- Node.js (v18 o superior recomendado)
- Git

### Pasos
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/producciongespro/ddc-planes-digitales.git
   cd ddc-planes-digitales
   ```

2. Ingresar a la carpeta de la aplicación e instalar dependencias:
   ```bash
   cd app
   npm install
   ```

3. Iniciar el servidor local de desarrollo:
   ```bash
   npm run dev
   ```
   Abrir en el navegador: [http://localhost:5173](http://localhost:5173)

4. Compilar para producción:
   ```bash
   npm run build
   ```

---

## 🏛️ Créditos Institucionales
- **Institución:** Ministerio de Educación Pública de Costa Rica (MEP).
- **Dependencia:** Dirección de Desarrollo Curricular (DDC).
- **Aprobación:** Consejo Superior de Educación (CSE).
- **Ciclo Lectivo:** Vigencia 2027.
