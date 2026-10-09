/**
 * Capa de datos desacoplada para el repositorio de planes curriculares 2027.
 * El catálogo oficial se consulta dinámicamente mediante fetch() a /data/planes2027.json
 * para permitir actualizaciones en caliente sin recompilar el bundle de React.
 */

export const DOWNLOADS_STORAGE_KEY = 'mep-ddc-planes-2027-downloads';
export const LEGACY_STORAGE_KEY = 'mep-ddc-planes-2027';

/**
 * Obtiene el mapa de descargas del usuario guardado en localStorage.
 * Incluye migración retrocompatible si existían datos en el formato previo.
 * @returns {Record<string, number>} Mapa de { [id]: descargas }
 */
export function loadSavedDownloadsMap() {
  try {
    // 1. Intentar leer mapa moderno de descargas
    const rawMap = localStorage.getItem(DOWNLOADS_STORAGE_KEY);
    if (rawMap) {
      const parsed = JSON.parse(rawMap);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed;
      }
    }

    // 2. Migración: Si no existe, revisar si había datos en la clave legacy
    const rawLegacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (rawLegacy) {
      const legacyParsed = JSON.parse(rawLegacy);
      const migrationMap = {};
      if (Array.isArray(legacyParsed)) {
        legacyParsed.forEach((item) => {
          if (item && item.id && typeof item.descargas === 'number') {
            migrationMap[item.id] = item.descargas;
          }
        });
      }
      // Guardar mapa migrado y limpiar el almacenamiento anterior pesado
      localStorage.setItem(DOWNLOADS_STORAGE_KEY, JSON.stringify(migrationMap));
      localStorage.removeItem(LEGACY_STORAGE_KEY);
      return migrationMap;
    }
  } catch (err) {
    console.error('Error al leer descargas desde localStorage:', err);
  }
  return {};
}

/**
 * Guarda el mapa de descargas en localStorage
 * @param {Array<{id: string, descargas: number}>} planes 
 */
export function saveDownloadsToStorage(planes) {
  try {
    const downloadsMap = {};
    if (Array.isArray(planes)) {
      planes.forEach((item) => {
        if (item && item.id && typeof item.descargas === 'number') {
          downloadsMap[item.id] = item.descargas;
        }
      });
    }
    localStorage.setItem(DOWNLOADS_STORAGE_KEY, JSON.stringify(downloadsMap));
  } catch (err) {
    console.error('Error guardando descargas en localStorage:', err);
  }
}

/**
 * Consulta el catálogo oficial de planes curriculares mediante fetch() como API estática.
 * Aplica cabeceras anti-caché para garantizar siempre la lectura del archivo más reciente.
 * @returns {Promise<Array<any>>}
 */
export async function fetchPlanesCatalog() {
  const url = `/data/planes2027.json?_t=${Date.now()}`;
  const response = await fetch(url, {
    cache: 'no-cache',
    headers: {
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache'
    }
  });

  if (!response.ok) {
    throw new Error(`No se pudo cargar el catálogo curricular (Código HTTP: ${response.status})`);
  }

  const catalog = await response.json();
  if (!Array.isArray(catalog)) {
    throw new Error('El formato del archivo planes2027.json no es una lista válida.');
  }

  // Fusionar catálogo con las descargas locales del usuario
  const downloadsMap = loadSavedDownloadsMap();
  return catalog.map((plane) => ({
    ...plane,
    descargas: typeof downloadsMap[plane.id] === 'number' ? downloadsMap[plane.id] : (plane.descargas || 0)
  }));
}
