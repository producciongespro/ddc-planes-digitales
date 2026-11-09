import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { GeneralTable } from '../components/GeneralTable';
import { SplashScreen } from '../components/SplashScreen';
import { AboutModal } from '../components/AboutModal';

const mockSamplePlanes = [
  {
    id: 'DDC-2027-001',
    ofertaCodigo: 'PREESCOLAR',
    ofertaNombre: 'Educación Preescolar',
    ofertaBadgeColor: 'teal',
    asignatura: 'Educación Musical',
    grado: 'Materno Infantil (Interactivo I)',
    rutaRelativa: 'preescolar',
    archivos: [
      { nombre: 'plan-interactivo-i.zip', tipo: 'ZIP', ruta: '/data/ddc-planeamientos/preescolar/interactivo-i/plan-interactivo-i.zip', tamanoBytes: 1024, tamanoLegible: '1 KB' }
    ],
    archivoPrincipal: 'plan-interactivo-i.zip',
    rutaDescarga: '/data/ddc-planeamientos/preescolar/interactivo-i/plan-interactivo-i.zip',
    vigencia: '2027'
  }
];

describe('Suite 7: sensory (Arnés Sensorial, Accesibilidad Ley 7600 y WCAG AA)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('SENS-01: Todos los botones de las 4 pantallas poseen etiqueta accesible (aria-label, texto o title)', () => {
    const { container } = render(
      <GeneralTable
        planes={mockSamplePlanes}
        onDownload={vi.fn()}
        onDownloadAll={vi.fn()}
      />
    );

    const assertAccessibleButtons = () => {
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
    };

    // Vista 1: Ofertas Educativas
    assertAccessibleButtons();

    // Vista 2: Asignaturas
    fireEvent.click(screen.getByRole('button', { name: /Educación Preescolar/i }));
    assertAccessibleButtons();

    // Vista 3: Grado
    fireEvent.click(screen.getByRole('button', { name: /Educación Musical/i }));
    assertAccessibleButtons();

    // Vista 4: Contenido
    fireEvent.click(screen.getByRole('button', { name: /Materno Infantil/i }));
    assertAccessibleButtons();
  });

  it('SENS-02: Jerarquía semántica de encabezados (H1, H2), landmarks HTML5 y ausencia de Modo Oscuro', async () => {
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

    // Encabezado maestro H1 accesible dentro de <header>
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
    expect(h1.closest('header')).toBeInTheDocument();
    expect(screen.getByRole('main').querySelector('h1')).toBeNull();

    // Ausencia del botón de Modo Oscuro y permanencia del lienzo claro
    expect(screen.queryByRole('button', { name: /modo oscuro|cambiar tema/i })).not.toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('SENS-03: Navegabilidad pura por teclado (Cero tabIndex negativo en controles interactivos)', () => {
    const { container } = render(
      <GeneralTable
        planes={mockSamplePlanes}
        onDownload={vi.fn()}
        onDownloadAll={vi.fn()}
      />
    );

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

  it('SENS-04: La barra de ruta curricular (Breadcrumbs) expone landmark de navegación accesible y paso actual', () => {
    render(
      <GeneralTable
        planes={mockSamplePlanes}
        onDownload={vi.fn()}
        onDownloadAll={vi.fn()}
      />
    );

    expect(screen.getByText(/Paso 1 de 4/i)).toBeInTheDocument();

    // Al avanzar a la Vista 2 se expone la cinta «Volver a:» (landmark navigation) y aria-current="step"
    fireEvent.click(screen.getByRole('button', { name: /Educación Preescolar/i }));
    const nav = screen.getByRole('navigation', { name: 'Ruta de navegación curricular' });
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveTextContent('Volver a:');
    expect(nav.querySelector('[aria-current="step"]')).toHaveTextContent('Educación Preescolar');
  });

  it('SENS-05: El SplashScreen de carga institucional cuenta con texto descriptivo para asistencia sensorial', () => {
    render(<SplashScreen error={null} onRetry={vi.fn()} />);

    expect(screen.getByText(/Plantillas de Planeamientos Didácticos/i)).toBeInTheDocument();
    expect(screen.getByText(/Ministerio de Educación Pública de Costa Rica/i)).toBeInTheDocument();
    expect(screen.getByText(/Cargando catálogo curricular/i)).toBeInTheDocument();
  });

  it('SENS-06: Retroalimentación cuantitativa de archivos disponibles y tabla CONTENIDO DESCARGABLE en Vista 4', () => {
    render(
      <GeneralTable
        planes={mockSamplePlanes}
        onDownload={vi.fn()}
        onDownloadAll={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Educación Preescolar/i }));
    fireEvent.click(screen.getByRole('button', { name: /Educación Musical/i }));
    fireEvent.click(screen.getByRole('button', { name: /Materno Infantil/i }));

    expect(screen.getByText(/1 archivo disponible/i)).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'CONTENIDO DESCARGABLE' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Descargar todo \(1\)/i })).toBeInTheDocument();
  });

  it('SENS-07: Cumplimiento WCAG 2.4.1 (Bypass Blocks) con Skip Link accesible al catálogo principal', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockSamplePlanes
    });

    render(<App />);

    const skipLink = await screen.findByRole('link', { name: /Saltar al catálogo de planeamientos/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
    expect(skipLink.className).toContain('sr-only');
  });

  it('SENS-08: Cumplimiento WAI-ARIA Dialog - Cerrar AboutModal al presionar la tecla Escape', () => {
    const handleClose = vi.fn();
    render(<AboutModal isOpen={true} onClose={handleClose} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
