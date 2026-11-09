/**
 * Capa de datos desacoplada para el repositorio de planes curriculares 2027.
 * El catálogo oficial se consulta dinámicamente mediante fetch() a /data/ddc-datos.json
 * para permitir actualizaciones en caliente sin recompilar el bundle de React.
 */

const ORDEN_PREESCOLAR = [
  'Materno Infantil (Interactivo I)',
  'Interactivo II',
  'Transición',
  'Grupo Heterogéneo'
];

/**
 * Comparador determinista de progresión académica para grados, años y subáreas:
 * 1. Niveles de Educación Preescolar en progresión oficial.
 * 2. Años escolares de 1° a 12° en orden numérico ascendente.
 * 3. Subáreas y categorías restantes en orden alfabético español.
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export function ordenarGrados(a = '', b = '') {
  const strA = String(a);
  const strB = String(b);

  const indicePreescolarA = ORDEN_PREESCOLAR.indexOf(strA);
  const indicePreescolarB = ORDEN_PREESCOLAR.indexOf(strB);
  if (indicePreescolarA !== -1 || indicePreescolarB !== -1) {
    if (indicePreescolarA === -1) return 1;
    if (indicePreescolarB === -1) return -1;
    return indicePreescolarA - indicePreescolarB;
  }

  const numeroA = Number(strA.match(/\bAño \((\d{1,2})°\)$/)?.[1]);
  const numeroB = Number(strB.match(/\bAño \((\d{1,2})°\)$/)?.[1]);
  const esAnioA = numeroA >= 1 && numeroA <= 12;
  const esAnioB = numeroB >= 1 && numeroB <= 12;
  if (esAnioA || esAnioB) {
    if (!esAnioA) return 1;
    if (!esAnioB) return -1;
    return numeroA - numeroB;
  }

  return strA.localeCompare(strB, 'es');
}

/**
 * Devuelve el arreglo único de Ofertas Educativas presentes en el catálogo
 * manteniendo el orden de aparición.
 * @param {Array<any>} planes
 * @returns {Array<{ ofertaCodigo: string, ofertaNombre: string, ofertaBadgeColor: string }>}
 */
export function getOfertasCatalog(planes = []) {
  if (!Array.isArray(planes)) return [];
  const ofertasMap = new Map();

  for (const plan of planes) {
    if (!plan) continue;
    const key = plan.ofertaCodigo || plan.ofertaNombre;
    if (key && !ofertasMap.has(key)) {
      ofertasMap.set(key, {
        ofertaCodigo: plan.ofertaCodigo || '',
        ofertaNombre: plan.ofertaNombre || '',
        ofertaBadgeColor: plan.ofertaBadgeColor || 'blue'
      });
    }
  }

  return Array.from(ofertasMap.values());
}

/**
 * Devuelve la lista de nombres de asignaturas únicas para una oferta dada
 * (acepta tanto ofertaCodigo como ofertaNombre), ordenadas alfabéticamente en español.
 * @param {Array<any>} planes
 * @param {string} ofertaCodigo
 * @returns {Array<string>}
 */
export function getAsignaturasByOferta(planes = [], ofertaCodigo) {
  if (!Array.isArray(planes) || !ofertaCodigo) return [];
  const asignaturasSet = new Set();

  for (const plan of planes) {
    if (!plan) continue;
    if (plan.ofertaCodigo === ofertaCodigo || plan.ofertaNombre === ofertaCodigo) {
      if (plan.asignatura) {
        asignaturasSet.add(plan.asignatura);
      }
    }
  }

  return Array.from(asignaturasSet).sort((a, b) =>
    a.localeCompare(b, 'es', { sensitivity: 'base' })
  );
}

/**
 * Devuelve la lista de nombres de grados únicos para la combinación de oferta y asignatura,
 * ordenados según la progresión académica oficial (ordenarGrados).
 * @param {Array<any>} planes
 * @param {string} ofertaCodigo
 * @param {string} asignatura
 * @returns {Array<string>}
 */
export function getGradosByOfertaAndAsignatura(planes = [], ofertaCodigo, asignatura) {
  if (!Array.isArray(planes) || !ofertaCodigo || !asignatura) return [];
  const gradosSet = new Set();

  for (const plan of planes) {
    if (!plan) continue;
    const coincideOferta = plan.ofertaCodigo === ofertaCodigo || plan.ofertaNombre === ofertaCodigo;
    if (coincideOferta && plan.asignatura === asignatura && plan.grado) {
      gradosSet.add(plan.grado);
    }
  }

  return Array.from(gradosSet).sort(ordenarGrados);
}

/**
 * Devuelve los registros del catálogo que coinciden con la oferta, asignatura y grado seleccionados.
 * @param {Array<any>} planes
 * @param {string} ofertaCodigo
 * @param {string} asignatura
 * @param {string} grado
 * @returns {Array<any>}
 */
export function getPlanesBySelection(planes = [], ofertaCodigo, asignatura, grado) {
  if (!Array.isArray(planes) || !ofertaCodigo || !asignatura || !grado) return [];

  return planes.filter((plan) => {
    if (!plan) return false;
    const coincideOferta = plan.ofertaCodigo === ofertaCodigo || plan.ofertaNombre === ofertaCodigo;
    return coincideOferta && plan.asignatura === asignatura && plan.grado === grado;
  });
}

/**
 * Consulta el catálogo oficial de planes curriculares mediante fetch() como API estática.
 * Aplica cabeceras anti-caché para garantizar siempre la lectura del archivo más reciente.
 * @returns {Promise<Array<any>>}
 */
export async function fetchPlanesCatalog() {
  const url = `/data/ddc-datos.json?_t=${Date.now()}`;
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
    throw new Error('El formato del archivo ddc-datos.json no es una lista válida.');
  }

  return catalog;
}
