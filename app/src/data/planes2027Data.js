import planesRaw from './planes2027.json';

export const INITIAL_PLANES_2027 = planesRaw;
export const STORAGE_KEY = 'mep-ddc-planes-2027';

/**
 * Carga el catálogo de planes 2027 desde localStorage con migración automática
 */
export function loadPlanesFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return INITIAL_PLANES_2027;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length !== INITIAL_PLANES_2027.length) {
      // Re-sincronizar conservando descargas previas si existen
      const downloadsMap = new Map();
      if (Array.isArray(parsed)) {
        parsed.forEach((p) => {
          if (p && p.id && typeof p.descargas === 'number') {
            downloadsMap.set(p.id, p.descargas);
          }
        });
      }
      return INITIAL_PLANES_2027.map((base) => ({
        ...base,
        descargas: downloadsMap.get(base.id) || 0
      }));
    }
    return parsed;
  } catch (err) {
    console.error('Error cargando planes desde localStorage:', err);
    return INITIAL_PLANES_2027;
  }
}

/**
 * Guarda los planes en localStorage
 */
export function savePlanesToStorage(planes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(planes));
  } catch (err) {
    console.error('Error guardando planes en localStorage:', err);
  }
}
