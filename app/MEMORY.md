# MEMORY.md — ddc-planes-digitales (Memoria persistente)
Memoria técnica del proyecto. Máximo ~50 líneas.

## Estado actual
- Versión 2.0.0 (Catálogo Oficial Completo del MEP Costa Rica: 197 planeamientos normados ciclo 2027 en formato ZIP).
- Repositorio oficial en `app/public/aplicativo-planeamientos-2027/` organizado en las 7 Ofertas Educativas de la DDC.
- Frontend React 19 + Vite + Tailwind CSS con arquitectura App Shell (Header y Footer fijos, scroll en contenedor central).
- Modo Claro / Oscuro persistente en `localStorage` (`mep-theme`).
- Persistencia de descargas en `localStorage` (`mep-ddc-planes-2027`) con migración automática.
- 15 iconos temáticos en SVG nativo sin dependencias externas.

## Decisiones tomadas (y por qué)
- **Componente Hero Maestro Unificado (GeneralTable):** Se integraron los filtros en cascada, la barra de estado/métricas, el botón restablecer y el selector de paginado directamente dentro del contenedor del Catálogo Oficial. Se eliminó el componente redundante `SearchArea.jsx`, dejando una experiencia de usuario fluida con solo dos secciones maestras (Catálogo Oficial y Top de Descargas).
- **Eliminación del Scroll Horizontal:** Ajuste milimétrico de columnas, anchos responsivos y botón de acción compacto solo con icono (`IconDownload`) en azul zafiro institucional.
- **Paginación Matemática Segura:** Generador de ventana deslizante (`paginasVisibles`) estricto con `key` única que previene duplicación de índices o clonación de nodos DOM al navegar por páginas altas (ej. 9 y 10).
- **Pie de Página (Footer) Transparente:** Removido color de respaldo oscuro y borde superior; `footer.jpg` escala al 100% de la altura (`bg-cover`) con texto en blanco de alto contraste.
- **Ortografía RAE estricta en UI vs Sistema de Archivos:** Nombres visuales con tildes y numerales romanos normados (`II Ciclos`, `III Ciclo y Educación Diversificada`), manteniendo carpetas en disco limpias y compatibles con Apache/Linux.

## Aprendizajes y errores a evitar
- Nunca usar `localStorage` sin validación de esquema para evitar estados antiguos obsoletos.
- Nunca calcular rangos de paginación que generen números repetidos; las `key` duplicadas corrompen la reconciliación DOM de React.
- Responder al modismo costarricense "dale viaje" con "¡Mae listo, pura vida, todo quedó excelente!".

## Próximos pasos
- Monitoreo continuo y adición de futuros anexos en las subcarpetas del ciclo 2027 según requerimientos de la DDC.
