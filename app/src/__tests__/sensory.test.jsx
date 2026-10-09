import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { GeneralTable } from '../components/GeneralTable';
import { SplashScreen } from '../components/SplashScreen';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const mockSamplePlanes = [
  {
    id: 'DDC-2027-001',
    ofertaCodigo: 'PREESCOLAR',
    ofertaNombre: 'Educación Preescolar',
    ofertaBadgeColor: 'amber',
    asignatura: 'Educación Musical',
    grado: 'Materno Infantil',
    rutaRelativa: '1.PREESCOLAR',
    archivos: [
      { nombre: 'Plan.zip', tipo: 'ZIP', ruta: '/plan.zip', tamanoBytes: 1024, tamanoLegible: '1 KB' }
    ],
    archivoPrincipal: 'Plan.zip',
    rutaDescarga: '/plan.zip',
    descargas: 14,
    vigencia: '2027'
  }
];

describe('Suite 7: sensory (Arnés Sensorial, Accesibilidad Ley 7600 y WCAG AA)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('SENS-01: Todos los botones de la interfaz principal poseen etiqueta accesible (aria-label o texto)', () => {
    const { container } = render(
      <GeneralTable
        planes={mockSamplePlanes}
        filtros={{ ofertas: [], asignaturas: [], grados: [], texto: '' }}
        onDownload={vi.fn()}
        onFiltrosChange={vi.fn()}
        onResetFiltros={vi.fn()}
      />
    );

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);

    buttons.forEach((btn) => {
      const hasText = btn.textContent && btn.textContent.trim().length > 0;
      const hasAriaLabel = btn.getAttribute('aria-label') && btn.getAttribute('aria-label').trim().length > 0;
      const hasTitle = btn.getAttribute('title') && btn.getAttribute('title').trim().length > 0;

      const isAccessible = hasText || hasAriaLabel || hasTitle;
      expect(
        isAccessible,
        `Se detectó un botón sin etiqueta accesible para lectores de pantalla: ${btn.outerHTML}`
      ).toBe(true);
    });
  });

  it('SENS-02: Jerarquía semántica de encabezados (H1, H2) y landmarks HTML5 (header, main, footer)', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockSamplePlanes
    });

    render(<App />);

    const mainElement = await screen.findByRole('main');
    expect(mainElement).toBeInTheDocument();

    // Landmark banner/header
    expect(screen.getByRole('banner')).toBeInTheDocument();

    // Landmark contentinfo/footer
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    // Encabezado maestro H1 accesible
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
  });

  it('SENS-03: Navegabilidad pura por teclado (Cero tabIndex negativo en controles primarios)', () => {
    const { container } = render(
      <GeneralTable
        planes={mockSamplePlanes}
        filtros={{ ofertas: [], asignaturas: [], grados: [], texto: '' }}
        onDownload={vi.fn()}
        onFiltrosChange={vi.fn()}
        onResetFiltros={vi.fn()}
      />
    );

    // Controles interactivos como inputs, selects y botones deben ser alcanzables por Tab
    const interactiveElements = container.querySelectorAll('button, input, select');
    interactiveElements.forEach((el) => {
      const tabIndex = el.getAttribute('tabindex');
      if (tabIndex !== null) {
        expect(
          parseInt(tabIndex, 10),
          `El elemento ${el.outerHTML} tiene tabIndex negativo e impide navegación por teclado`
        ).toBeGreaterThanOrEqual(0);
      }
    });
  });

  it('SENS-04: Los campos de entrada (input de búsqueda) poseen placeholder o etiqueta orientativa', () => {
    render(
      <GeneralTable
        planes={mockSamplePlanes}
        filtros={{ ofertas: [], asignaturas: [], grados: [], texto: '' }}
        onDownload={vi.fn()}
        onFiltrosChange={vi.fn()}
        onResetFiltros={vi.fn()}
      />
    );

    const searchInput = screen.getByPlaceholderText(/Buscar por palabra clave/i);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('type', 'text');
  });

  it('SENS-05: El SplashScreen de carga institucional cuenta con texto descriptivo para asistencia sensorial', () => {
    render(<SplashScreen error={null} onRetry={vi.fn()} />);

    // Persona con discapacidad visual debe escuchar el título y la vigencia institucional
    expect(screen.getByText(/Planes de Estudio Digitales/i)).toBeInTheDocument();
    expect(screen.getByText(/Ministerio de Educación Pública de Costa Rica/i)).toBeInTheDocument();
    expect(screen.getByText(/Cargando catálogo curricular 2027/i)).toBeInTheDocument();
  });

  it('SENS-06: Retroalimentación textual cuantitativa en tiempo real para usuarios con baja visión', () => {
    render(
      <GeneralTable
        planes={mockSamplePlanes}
        filtros={{ ofertas: [], asignaturas: [], grados: [], texto: '' }}
        onDownload={vi.fn()}
        onFiltrosChange={vi.fn()}
        onResetFiltros={vi.fn()}
      />
    );

    // Los contadores deben ser semánticos para lectores de pantalla
    expect(screen.getByText(/Mostrando/i)).toBeInTheDocument();
    expect(screen.getAllByText(/planeamientos/i).length).toBeGreaterThan(0);
  });
});
