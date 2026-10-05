# MEMORY.md — ddc-planes-digitales (Memoria persistente)
Memoria técnica del proyecto. Máximo ~50 líneas.

## Estado actual
- Versión 1.0.1 (Nomenclatura [versión].[liberación].[compilado]. Catálogo Oficial Completo del MEP Costa Rica: 197 planeamientos normados ciclo 2027 en formato ZIP).
- Repositorio oficial en `app/public/aplicativo-planeamientos-2027/` organizado en las 7 Ofertas Educativas de la DDC.
- Frontend React 19 + Vite + Tailwind CSS con arquitectura App Shell (Header y Footer fijos, scroll en contenedor central).
- Modo Claro / Oscuro persistente en `localStorage` (`mep-theme`).
- Persistencia de descargas en `localStorage` (`mep-ddc-planes-2027`) con migración automática.
- 15 iconos temáticos en SVG nativo sin dependencias externas.

## Decisiones tomadas (y por qué)
- **Arquitectura Híbrida Dinámica (Sin dependencia manual de JSON):** Endpoint dual (`app/public/api/listar_planes.php` en Apache/XAMPP y middleware en Vite) que escanea en tiempo real el sistema de archivos físico (`aplicativo-planeamientos-2027/`), soportando múltiples archivos ZIP por carpeta sin editar código, con fallback automático al catálogo local.
- **Descarga Multi-Archivo Híbrida y Chips Interactivos:** Botón de acción principal descarga automáticamente todos los archivos asociados a la fila de forma secuencial (micro-intervalo 350ms para evitar bloqueos del navegador), con badge numérico indicador. Cada chip de archivo individual en la columna Archivos es interactivo para descarga unitaria bajo demanda.
- **Barra de Herramientas Unificada (Opción A):** Franja de una sola fila compacta con buscador predictivo global, contador reactivo, botón restablecer y selector de elementos por página.
- **Filtros en Cabeceras de Columna (ColumnFilter):** Popovers flotantes con estado borrador (draft) que congelan la tabla mientras se seleccionan checkboxes, aplicando cambios únicamente al presionar *Aplicar Filtro*, con botones de *Cancelar*, *Desmarcar todas* y *Marcar todas*.
- **Altura Mínima de Tabla (`min-h-[480px]`):** Evita el colapso vertical cuando hay pocos registros (1 a 8 líneas) y previene el recorte o solapamiento del menú flotante de filtros.
- **Eliminación de la Columna Código:** Removida por carecer de valor pedagógico directo para el docente, liberando más de 120px de ancho para máxima legibilidad de las materias y grados.
- **Eliminación del Scroll Horizontal:** Ajuste milimétrico de columnas, anchos responsivos y botón de acción compacto solo con icono (`IconDownload`) en azul zafiro institucional.
- **Paginación Matemática Segura:** Controles completos con botones *« Primero*, *‹ Anterior*, ventana deslizante numérica estricta, *Siguiente ›* y *Último »*, con `key` única que previene duplicación de índices o clonación de nodos DOM.
- **Pie de Página (Footer) Transparente:** Removido color de respaldo oscuro y borde superior; `footer.jpg` escala al 100% de la altura (`bg-cover`) con texto en blanco de alto contraste.
- **Depuración de Archivos Obsoletos:** Eliminado `planesData.js` (83 KB del prototipo inicial), consolidando el código en `planes2027Data.js` y el catálogo taxonómico maestro `planes2027.json`.
- **Ortografía RAE estricta en UI vs Sistema de Archivos:** Nombres visuales con tildes y numerales romanos normados (`II Ciclos`, `III Ciclo y Educación Diversificada`), manteniendo carpetas en disco limpias y compatibles con Apache/Linux.

## Aprendizajes y errores a evitar
- Nunca usar `localStorage` sin validación de esquema para evitar estados antiguos obsoletos.
- Nunca calcular rangos de paginación que generen números repetidos; las `key` duplicadas corrompen la reconciliación DOM de React.
- Responder al modismo costarricense "dale viaje" con "¡Mae listo, pura vida, todo quedó excelente!".
- **Regla Estricta de Control de Versiones:** NUNCA ejecutar `git commit` ni sincronizar (`git push`) de forma automática. Siempre implementar y verificar en local, y consultar/esperar la instrucción expresa de Chris antes de commitear y sincronizar.

## Próximos pasos
- Monitoreo continuo y adición de futuros anexos en las subcarpetas del ciclo 2027 según requerimientos de la DDC.
