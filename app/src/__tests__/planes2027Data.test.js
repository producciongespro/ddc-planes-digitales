import { describe, it, expect, vi } from 'vitest';
import {
  fetchPlanesCatalog,
  ordenarGrados,
  getOfertasCatalog,
  getAsignaturasByOferta,
  getGradosByOfertaAndAsignatura,
  getPlanesBySelection
} from '../data/planes2027Data';

const sampleCatalog = [
  {
    id: 'DDC-2027-001',
    ofertaCodigo: 'PREESCOLAR',
    ofertaNombre: 'Educación Preescolar',
    ofertaBadgeColor: 'teal',
    asignatura: 'Educación Preescolar',
    grado: 'Transición',
    archivos: [{ nombre: 'plan-transicion.zip', tipo: 'ZIP', ruta: '/data/ddc-planeamientos/preescolar/transicion/plan-transicion.zip', tamanoLegible: '1.0 KB' }]
  },
  {
    id: 'DDC-2027-002',
    ofertaCodigo: 'PREESCOLAR',
    ofertaNombre: 'Educación Preescolar',
    ofertaBadgeColor: 'teal',
    asignatura: 'Educación Preescolar',
    grado: 'Materno Infantil (Interactivo I)',
    archivos: [{ nombre: 'plan-interactivo-i.zip', tipo: 'ZIP', ruta: '/data/ddc-planeamientos/preescolar/interactivo-i/plan-interactivo-i.zip', tamanoLegible: '1.0 KB' }]
  },
  {
    id: 'DDC-2027-003',
    ofertaCodigo: 'I-II-CICLOS',
    ofertaNombre: 'I y II Ciclos',
    ofertaBadgeColor: 'amber',
    asignatura: 'Matemática',
    grado: 'Sexto Año (6°)',
    archivos: [{ nombre: 'plan-mate-6.zip', tipo: 'ZIP', ruta: '/data/ddc-planeamientos/primaria/mate-6.zip', tamanoLegible: '2.0 KB' }]
  },
  {
    id: 'DDC-2027-004',
    ofertaCodigo: 'I-II-CICLOS',
    ofertaNombre: 'I y II Ciclos',
    ofertaBadgeColor: 'amber',
    asignatura: 'Español',
    grado: 'Primer Año (1°)',
    archivos: [{ nombre: 'plan-esp-1.zip', tipo: 'ZIP', ruta: '/data/ddc-planeamientos/primaria/esp-1.zip', tamanoLegible: '1.5 KB' }]
  },
  {
    id: 'DDC-2027-005',
    ofertaCodigo: 'I-II-CICLOS',
    ofertaNombre: 'I y II Ciclos',
    ofertaBadgeColor: 'amber',
    asignatura: 'Matemática',
    grado: 'Primer Año (1°)',
    archivos: [{ nombre: 'plan-mate-1.zip', tipo: 'ZIP', ruta: '/data/ddc-planeamientos/primaria/mate-1.zip', tamanoLegible: '1.8 KB' }]
  }
];

describe('Suite 1: planes2027Data (Capa de Datos y Selectores Curriculares)', () => {
  it('TEST-01 & TEST-02 & TEST-04: consulta y devuelve el catálogo con cabeceras anti-caché sin usar almacenamiento local', async () => {
    const catalog = [{ id: 'DDC-2027-001', asignatura: 'Matemática' }];
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => catalog });
    const getItem = vi.spyOn(Storage.prototype, 'getItem');
    const setItem = vi.spyOn(Storage.prototype, 'setItem');

    expect(await fetchPlanesCatalog()).toEqual(catalog);
    const [url, options] = global.fetch.mock.calls[0];
    expect(url).toContain('/data/ddc-datos.json?_t=');
    expect(options.cache).toBe('no-cache');
    expect(options.headers['Pragma']).toBe('no-cache');
    expect(getItem).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
    getItem.mockRestore();
    setItem.mockRestore();
  });

  it('TEST-03: informa un fallo HTTP con mensaje descriptivo en español', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 404 });
    await expect(fetchPlanesCatalog()).rejects.toThrow('Código HTTP: 404');
  });

  it('TEST-03b: rechaza un catálogo que no sea una lista', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    await expect(fetchPlanesCatalog()).rejects.toThrow('no es una lista válida');
  });

  it('ordenarGrados ordena Preescolar, años de 1° a 12° y subáreas alfabéticas al final', () => {
    const desordenados = [
      'Décimo Año (10°)',
      'Grupo Heterogéneo',
      'Segundo Año (2°)',
      'Transición',
      'Documento Rector',
      'Materno Infantil (Interactivo I)',
      'Primer Año (1°)',
      'Interactivo II',
      'Aula Integrada'
    ];

    expect([...desordenados].sort(ordenarGrados)).toEqual([
      'Materno Infantil (Interactivo I)',
      'Interactivo II',
      'Transición',
      'Grupo Heterogéneo',
      'Primer Año (1°)',
      'Segundo Año (2°)',
      'Décimo Año (10°)',
      'Aula Integrada',
      'Documento Rector'
    ]);
  });

  it('getOfertasCatalog extrae las ofertas únicas preservando orden de aparición', () => {
    expect(getOfertasCatalog(sampleCatalog)).toEqual([
      {
        ofertaCodigo: 'PREESCOLAR',
        ofertaNombre: 'Educación Preescolar',
        ofertaBadgeColor: 'teal'
      },
      {
        ofertaCodigo: 'I-II-CICLOS',
        ofertaNombre: 'I y II Ciclos',
        ofertaBadgeColor: 'amber'
      }
    ]);
    expect(getOfertasCatalog(null)).toEqual([]);
  });

  it('getAsignaturasByOferta devuelve asignaturas únicas ordenadas alfabéticamente en español', () => {
    expect(getAsignaturasByOferta(sampleCatalog, 'I-II-CICLOS')).toEqual([
      'Español',
      'Matemática'
    ]);
    expect(getAsignaturasByOferta(sampleCatalog, 'I y II Ciclos')).toEqual([
      'Español',
      'Matemática'
    ]);
    expect(getAsignaturasByOferta(sampleCatalog, '')).toEqual([]);
  });

  it('getGradosByOfertaAndAsignatura devuelve grados ordenados por progresión académica', () => {
    expect(
      getGradosByOfertaAndAsignatura(sampleCatalog, 'PREESCOLAR', 'Educación Preescolar')
    ).toEqual([
      'Materno Infantil (Interactivo I)',
      'Transición'
    ]);

    expect(
      getGradosByOfertaAndAsignatura(sampleCatalog, 'I-II-CICLOS', 'Matemática')
    ).toEqual([
      'Primer Año (1°)',
      'Sexto Año (6°)'
    ]);
  });

  it('getPlanesBySelection filtra exactamente por oferta, asignatura y grado', () => {
    const resultado = getPlanesBySelection(
      sampleCatalog,
      'I-II-CICLOS',
      'Matemática',
      'Primer Año (1°)'
    );
    expect(resultado).toHaveLength(1);
    expect(resultado[0].id).toBe('DDC-2027-005');
    expect(getPlanesBySelection(sampleCatalog, 'I-II-CICLOS', 'Matemática', '')).toEqual([]);
  });
});
