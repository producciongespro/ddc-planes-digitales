import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { GeneralTable } from '../components/GeneralTable';
import { saveDownloadsToStorage, fetchPlanesCatalog, DOWNLOADS_STORAGE_KEY } from '../data/planes2027Data';

describe('Suite 6: chaos (Arnés de Caos y Resiliencia Extrema)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('CHAOS-01: Caída abrupta de red (Failed to fetch / Offline) muestra contingencia sin pantalla blanca', async () => {
    global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

    render(<App />);

    // Debe mostrar SplashScreen de contingencia con mensaje amigable
    const errorTitle = await screen.findByText(/Error al consultar el catálogo/i);
    expect(errorTitle).toBeInTheDocument();

    const retryBtn = screen.getByRole('button', { name: /Reintentar conexión/i });
    expect(retryBtn).toBeInTheDocument();

    // No debe renderizar el contenido principal roto
    expect(screen.queryByRole('main')).not.toBeInTheDocument();
  });

  it('CHAOS-02: Recuperación resiliente tras restablecimiento de red mediante botón Reintentar', async () => {
    // 1er intento: Falla la red
    global.fetch = vi.fn().mockRejectedValueOnce(new TypeError('Network down'));

    render(<App />);

    const retryBtn = await screen.findByRole('button', { name: /Reintentar conexión/i });
    expect(retryBtn).toBeInTheDocument();

    // 2do intento: Se restablece la red exitosamente
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 'DDC-2027-001',
          ofertaCodigo: 'PRIMARIA',
          ofertaNombre: 'I y II Ciclos (Primaria)',
          ofertaBadgeColor: 'emerald',
          asignatura: 'Ciencias',
          grado: '4° Año',
          rutaRelativa: 'ciencias/4',
          archivos: [{ nombre: 'Plan.zip', tipo: 'ZIP', ruta: '/p.zip', tamanoBytes: 500, tamanoLegible: '500 B' }],
          archivoPrincipal: 'Plan.zip',
          rutaDescarga: '/p.zip',
          descargas: 0,
          vigencia: '2027'
        }
      ]
    });

    fireEvent.click(retryBtn);

    // Debe salir del SplashScreen y montar la aplicación principal
    const mainElement = await screen.findByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(screen.getByText('Ciencias')).toBeInTheDocument();
  });

  it('CHAOS-03: JSON corrupto sintácticamente en el servidor no rompe el ciclo de vida de React', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => {
        throw new SyntaxError('Unexpected token , in JSON at position 140');
      }
    });

    render(<App />);

    const errorCard = await screen.findByText(/Error al consultar el catálogo/i);
    expect(errorCard).toBeInTheDocument();
    expect(screen.getByText(/Unexpected token/i)).toBeInTheDocument();
  });

  it('CHAOS-04: Servidor devolviendo HTTP 502 / 500 Bad Gateway muestra código exacto', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 502
    });

    render(<App />);

    const errorDetails = await screen.findByText(/Código HTTP: 502/i);
    expect(errorDetails).toBeInTheDocument();
  });

  it('CHAOS-05: Catálogo respondiendo payload no tabular (objeto en vez de array) se rechaza defensivamente', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'unauthorized', message: 'Token requerido' })
    });

    render(<App />);

    const errorDetails = await screen.findByText(/no es una lista válida/i);
    expect(errorDetails).toBeInTheDocument();
  });

  it('CHAOS-06: Saturación de localStorage (QuotaExceededError) no bloquea la app ni las descargas', () => {
    // Simular que el navegador del docente tiene el almacenamiento al 100%
    const quotaError = new DOMException('The quota has been exceeded.', 'QuotaExceededError');
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw quotaError;
    });

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const mockPlanes = [{ id: 'DDC-2027-001', descargas: 5 }];

    // No debe lanzar excepción no controlada
    expect(() => {
      saveDownloadsToStorage(mockPlanes);
    }).not.toThrow();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error guardando descargas'),
      expect.any(DOMException)
    );
  });

  it('CHAOS-07: GeneralTable renderiza de forma tolerante ante registros con datos nulos o corruptos', () => {
    const corruptPlanes = [
      {
        id: 'DDC-2027-ERR-1',
        ofertaCodigo: null,
        ofertaNombre: 'Educación Especial',
        ofertaBadgeColor: undefined, // Color no definido
        asignatura: 'Estimulación Temprana',
        grado: null, // Grado nulo
        rutaRelativa: '',
        archivos: null, // Lista de archivos nula
        archivoPrincipal: null,
        rutaDescarga: '',
        descargas: undefined,
        vigencia: null
      },
      {
        id: 'DDC-2027-ERR-2',
        ofertaNombre: 'Educación Unidocente',
        asignatura: 'Guía General',
        archivos: [] // Sin archivos
      }
    ];

    expect(() => {
      render(
        <GeneralTable
          planes={corruptPlanes}
          filtros={{ ofertas: [], asignaturas: [], grados: [], texto: '' }}
          onDownload={vi.fn()}
          onFiltrosChange={vi.fn()}
          onResetFiltros={vi.fn()}
        />
      );
    }).not.toThrow();

    expect(screen.getByText('Estimulación Temprana')).toBeInTheDocument();
    expect(screen.getAllByText('Sin archivos')).toHaveLength(2);
  });

  it('CHAOS-08: Ráfaga de clics frenéticos en descarga actualiza el estado de forma consistente', () => {
    const mockPlanes = [
      {
        id: 'DDC-2027-RAPID',
        ofertaNombre: 'I y II Ciclos (Primaria)',
        asignatura: 'Matemática',
        grado: '1° Año',
        archivos: [{ nombre: 'M.zip', tipo: 'ZIP', ruta: '/m.zip', tamanoBytes: 100, tamanoLegible: '100 B' }],
        descargas: 0
      }
    ];

    const downloadMock = vi.fn();

    render(
      <GeneralTable
        planes={mockPlanes}
        filtros={{ ofertas: [], asignaturas: [], grados: [], texto: '' }}
        onDownload={downloadMock}
        onFiltrosChange={vi.fn()}
        onResetFiltros={vi.fn()}
      />
    );

    const downloadBtn = screen.getByRole('button', { name: /Descargar paquete oficial:/i });

    // Simular 8 clics ultra rápidos (docente impaciente)
    for (let i = 0; i < 8; i++) {
      fireEvent.click(downloadBtn);
    }

    expect(downloadMock).toHaveBeenCalledTimes(8);
  });
});
