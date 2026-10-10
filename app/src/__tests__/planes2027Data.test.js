import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  fetchPlanesCatalog,
  loadSavedDownloadsMap,
  saveDownloadsToStorage,
  DOWNLOADS_STORAGE_KEY,
  LEGACY_STORAGE_KEY
} from '../data/planes2027Data';

describe('Suite 1: planes2027Data (Capa de Datos y Persistencia Ligera)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('TEST-01: fetchPlanesCatalog() consulta exitosamente el catálogo y fusiona descargas', async () => {
    const mockPlanes = [
      { id: 'DDC-2027-001', asignatura: 'Matemática', descargas: 0 },
      { id: 'DDC-2027-002', asignatura: 'Español', descargas: 0 }
    ];

    localStorage.setItem(DOWNLOADS_STORAGE_KEY, JSON.stringify({ 'DDC-2027-001': 5 }));

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPlanes
    });

    const result = await fetchPlanesCatalog();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(2);
    expect(result[0].descargas).toBe(5);
    expect(result[1].descargas).toBe(0);
  });

  it('TEST-02: fetchPlanesCatalog() adjunta cabeceras anti-caché y query param _t', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => []
    });

    await fetchPlanesCatalog();

    const [calledUrl, options] = global.fetch.mock.calls[0];
    expect(calledUrl).toContain('/data/ddc-planeamientos.json?_t=');
    expect(options.cache).toBe('no-cache');
    expect(options.headers['Pragma']).toBe('no-cache');
    expect(options.headers['Cache-Control']).toBe('no-cache');
  });

  it('TEST-03: fetchPlanesCatalog() lanza error amigable ante fallo HTTP 404/500', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404
    });

    await expect(fetchPlanesCatalog()).rejects.toThrow(
      'No se pudo cargar el catálogo curricular (Código HTTP: 404)'
    );
  });

  it('TEST-03b: fetchPlanesCatalog() lanza error si el formato recibido no es un arreglo', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ error: 'malformed' })
    });

    await expect(fetchPlanesCatalog()).rejects.toThrow(
      'El formato del archivo ddc-planeamientos.json no es una lista válida.'
    );
  });

  it('TEST-04: loadSavedDownloadsMap() recupera correctamente el mapa desde localStorage', () => {
    const data = { 'DDC-2027-010': 12, 'DDC-2027-020': 3 };
    localStorage.setItem(DOWNLOADS_STORAGE_KEY, JSON.stringify(data));

    const map = loadSavedDownloadsMap();
    expect(map).toEqual(data);
  });

  it('TEST-05: Migración automática de datos legacy de planes completos a mapa numérico', () => {
    const legacyData = [
      { id: 'DDC-2027-005', asignatura: 'Ciencias', descargas: 8 },
      { id: 'DDC-2027-006', asignatura: 'Estudios Sociales', descargas: 15 }
    ];
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(legacyData));

    const map = loadSavedDownloadsMap();

    // Debe extraer solo los conteos
    expect(map).toEqual({
      'DDC-2027-005': 8,
      'DDC-2027-006': 15
    });

    // Debe haber purgado la clave legacy pesada
    expect(localStorage.getItem(LEGACY_STORAGE_KEY)).toBeNull();
    // Y haber guardado la clave moderna
    expect(JSON.parse(localStorage.getItem(DOWNLOADS_STORAGE_KEY))).toEqual({
      'DDC-2027-005': 8,
      'DDC-2027-006': 15
    });
  });

  it('TEST-06: saveDownloadsToStorage() persiste adecuadamente la lista de descargas', () => {
    const planes = [
      { id: 'DDC-2027-001', descargas: 4 },
      { id: 'DDC-2027-002', descargas: 9 }
    ];

    saveDownloadsToStorage(planes);

    const stored = JSON.parse(localStorage.getItem(DOWNLOADS_STORAGE_KEY));
    expect(stored).toEqual({
      'DDC-2027-001': 4,
      'DDC-2027-002': 9
    });
  });
});
