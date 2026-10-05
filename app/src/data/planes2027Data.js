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

/**
 * Consulta la API dinámica (PHP en XAMPP o Middleware en Vite)
 * para detectar archivos reales en el disco en tiempo real.
 */
export async function fetchPlanesDynamic() {
  try {
    // 1. Intentar llamar al endpoint PHP oficial
    const res = await fetch('/api/listar_planes.php');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }

    // 2. Intentar llamar al endpoint sin extensión .php
    const resClean = await fetch('/api/listar_planes');
    if (resClean.ok) {
      const dataClean = await resClean.json();
      if (Array.isArray(dataClean) && dataClean.length > 0) {
        return dataClean;
      }
    }
    return null;
  } catch (err) {
    // En caso de hosting estático o sin backend activo, se usa el catálogo local como fallback
    console.info('Modo híbrido: ejecutando con catálogo local (API dinámica no requerida).');
    return null;
  }
}
