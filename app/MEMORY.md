# MEMORY.md — ddc-planes-digitales (Memoria persistente)
Memoria técnica del proyecto. Máximo ~50 líneas.

## Estado actual
- Versión 1.0.0 (Catálogo Oficial Completo del MEP Costa Rica: 144 planes de estudio normados).
- Repositorio PDF físico en `app/public/mep-ddc-planes-digitales/` con taxonomía de 5 niveles:
  `[Nivel]/[Ciclo]/[Modalidad]/[Tipo]/[Asignatura]/[Grado]/[Archivo.pdf]`.
- Frontend con React 19 + Vite + Tailwind CSS.
- Modo Claro / Oscuro persistente en `localStorage` (`mep-theme`).
- Persistencia de descargas en `localStorage` (`mep-ddc-planes`) con migración automática a 144 planes.
- 15 iconos temáticos oficiales en SVG nativo sin librerías externas.
- Control centralizado de versión y releases en `app/src/data/version.json`.

## Decisiones tomadas (y por qué)
- **144 planes generados en PDF institucional:** El MEP distingue materias Básicas y Complementarias en I, II, III Ciclo y Educación Diversificada (Académica y Técnica CTP).
- **Ciencias unificada vs desglosada:** Ciencias unificada en III Ciclo (7°-9°); desglosada en Biología, Física y Química en Educación Diversificada (10°-12°).
- **Modalidad en Educación Diversificada:** Separada en Académica (10°-11°) y Técnica CTP (10°-12°).
- **Nombres de carpetas:** Nombres completos sin acentos en el sistema de archivos (`Setimo`, `Decimo`, `Matematicas`, `Educacion Diversificada`) para máxima compatibilidad cross-platform, y nombres con tilde en la interfaz visual.
- **Filtros en cuadrícula balanceada (7 filtros en 3 filas):** Fila 1 (Palabra Clave, Nivel, Ciclo, Modalidad en 4 cols), Fila 2 (Tipo de Materia, Asignatura, Grado/Año en 4 cols), Fila 3 (Barra inferior con estadísticas a la izquierda y botón Restablecer filtros a la derecha).
- **Paginación en tabla general:** Para renderizar fluidamente los 144 documentos sin degradar el rendimiento del navegador.
- **Botón y modal de reinicio (ResetConfirmModal):** Reemplazo de window.confirm por un modal profesional institucional con degradado azul zafiro, aviso informativo de localStorage y confirmación ámbar. Aislado para existir en desarrollo local.
- **Calibración visual y contraste UI (Modo Oscuro/Claro):** Encabezados con degradado azul zafiro institucional ('dark:from-[#1a3863] dark:via-[#1e447b] dark:to-[#235091]') y borde ámbar; tarjetas con gradiente continuo de alto contraste ('from-slate-100 to-slate-300' en claro / 'from-[#3d5377] to-[#182537]' en oscuro) para máxima presencia visual y legibilidad.
- **Optimización de columnas en tabla general:** Se sustituyó 'Disponibilidad' por 'Descargas' y se retiró 'Código Oficial' para suprimir el scroll horizontal indeseado y ajustar la vista fluidamente al 100% de la pantalla.
- **Arquitectura App Shell (Viewport Layout):** Header fijo arriba (`flex-shrink-0 z-20`) y Footer fijo abajo (`flex-shrink-0 z-20`), confinando el scroll vertical exclusivamente al contenedor principal central (`flex-1 overflow-y-auto`).

## Aprendizajes y errores a evitar
- Nunca usar `localStorage` sin validación de versión o esquema; los datos cacheados obsoletos generaban 404 con rutas previas de 2 niveles.
- Nunca crear archivos fuera de `app/` (excepto la documentación institucional y Git desde la raíz).
- Mantener siempre codificación estricta UTF-8 sin mojibake.

## Próximos pasos
- Pruebas exhaustivas de navegación responsive en 20+ resoluciones.
- Preparación para despliegue o sincronización según instrucción del usuario.
