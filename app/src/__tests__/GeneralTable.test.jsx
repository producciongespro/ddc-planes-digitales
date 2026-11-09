import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import { GeneralTable } from '../components/GeneralTable';
import { Header } from '../components/Header';

const mockPlanes = [
  {
    id: 'DDC-2027-001',
    ofertaCodigo: 'PREESCOLAR',
    ofertaNombre: 'Educación Preescolar',
    ofertaBadgeColor: 'teal',
    asignatura: 'Educación Preescolar',
    grado: 'Transición',
    rutaRelativa: 'preescolar/transicion',
    archivos: [
      { nombre: 'plan-transicion.zip', tipo: 'ZIP', ruta: '/data/ddc-planeamientos/preescolar/transicion/plan-transicion.zip', tamanoBytes: 1024, tamanoLegible: '1.0 KB' }
    ],
    archivoPrincipal: 'plan-transicion.zip',
    rutaDescarga: '/data/ddc-planeamientos/preescolar/transicion/plan-transicion.zip',
    vigencia: '2027'
  },
  {
    id: 'DDC-2027-002',
    ofertaCodigo: 'I-II-CICLOS',
    ofertaNombre: 'I y II Ciclos',
    ofertaBadgeColor: 'amber',
    asignatura: 'Matemática',
    grado: 'Sexto Año (6°)',
    rutaRelativa: 'primero-y-segundo-ciclos/matematica/sexto',
    archivos: [
      { nombre: 'plan-mate-6.zip', tipo: 'ZIP', ruta: '/data/ddc-planeamientos/primaria/mate-6.zip', tamanoBytes: 2048, tamanoLegible: '2.0 KB' }
    ],
    archivoPrincipal: 'plan-mate-6.zip',
    rutaDescarga: '/data/ddc-planeamientos/primaria/mate-6.zip',
    vigencia: '2027'
  },
  {
    id: 'DDC-2027-003',
    ofertaCodigo: 'I-II-CICLOS',
    ofertaNombre: 'I y II Ciclos',
    ofertaBadgeColor: 'amber',
    asignatura: 'Ciencias',
    grado: 'Primer Año (1°)',
    rutaRelativa: 'primero-y-segundo-ciclos/ciencias/primero',
    archivos: [
      { nombre: 'plan-ciencias-1.zip', tipo: 'ZIP', ruta: '/data/ddc-planeamientos/primaria/ciencias-1.zip', tamanoBytes: 1024, tamanoLegible: '1.0 KB' }
    ],
    archivoPrincipal: 'plan-ciencias-1.zip',
    rutaDescarga: '/data/ddc-planeamientos/primaria/ciencias-1.zip',
    vigencia: '2027'
  },
  {
    id: 'DDC-2027-004',
    ofertaCodigo: 'I-II-CICLOS',
    ofertaNombre: 'I y II Ciclos',
    ofertaBadgeColor: 'amber',
    asignatura: 'Español',
    grado: 'Segundo Año (2°)',
    rutaRelativa: 'primero-y-segundo-ciclos/espanol/segundo',
    archivos: [
      { nombre: 'plan-espanol-2-s1.zip', tipo: 'ZIP', ruta: '/data/ddc-planeamientos/primaria/espanol-2-s1.zip', tamanoBytes: 1024, tamanoLegible: '1.0 KB' },
      { nombre: 'plan-espanol-2-s2.zip', tipo: 'ZIP', ruta: '/data/ddc-planeamientos/primaria/espanol-2-s2.zip', tamanoBytes: 2048, tamanoLegible: '2.0 KB' }
    ],
    archivoPrincipal: 'plan-espanol-2-s1.zip',
    rutaDescarga: '/data/ddc-planeamientos/primaria/espanol-2-s1.zip',
    vigencia: '2027'
  }
];

describe('Suite 2: GeneralTable (Flujo Progresivo de 4 Pantallas Curriculares)', () => {
  it('Vista 1 (Ofertas Educativas): renderiza las ofertas, la imagen profe.png y no incluye buscador de texto', () => {
    render(<GeneralTable planes={mockPlanes} />);

    expect(screen.getByRole('heading', { name: 'Ofertas Educativas' })).toBeInTheDocument();
    const imgProfe = screen.getByAltText('Docente guía de Ofertas Educativas');
    expect(imgProfe).toBeInTheDocument();
    expect(imgProfe).toHaveAttribute('src', '/assets/images/profe.png');

    expect(screen.getByRole('button', { name: /Educación Preescolar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /I y II Ciclos/i })).toBeInTheDocument();

    // Ausencia total de buscador de texto
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/Buscar/i)).not.toBeInTheDocument();
  });

  it('Vista 2 (Asignaturas): al seleccionar una oferta muestra bolso.png, insignia de oferta, migas de pan y asignaturas en orden alfabético español', () => {
    render(<GeneralTable planes={mockPlanes} />);

    fireEvent.click(screen.getByRole('button', { name: /I y II Ciclos/i }));

    expect(screen.getByRole('heading', { name: 'Asignaturas' })).toBeInTheDocument();
    const imgBolso = screen.getByAltText('Bolso escolar de Asignaturas');
    expect(imgBolso).toBeInTheDocument();
    expect(imgBolso).toHaveAttribute('src', '/assets/images/bolso.png');

    // Cinta interactiva «Volver a:» con el botón 3D de la oferta seleccionada
    const nav = screen.getByRole('navigation', { name: 'Ruta de navegación curricular' });
    expect(within(nav).getByText('Volver a:')).toBeInTheDocument();
    const btnOfertaSeleccionada = within(nav).getByRole('button', { name: 'I y II Ciclos' });
    expect(btnOfertaSeleccionada).toBeInTheDocument();
    expect(btnOfertaSeleccionada).toHaveAttribute('aria-current', 'step');

    // Asignaturas ordenadas alfabéticamente en español: Ciencias, Español, Matemática
    const btnCiencias = screen.getByRole('button', { name: /Ciencias/i });
    const btnEspanol = screen.getByRole('button', { name: /Español/i });
    const btnMatematica = screen.getByRole('button', { name: /Matemática/i });

    const allButtons = screen.getAllByRole('button');
    expect(allButtons.indexOf(btnCiencias)).toBeLessThan(allButtons.indexOf(btnEspanol));
    expect(allButtons.indexOf(btnEspanol)).toBeLessThan(allButtons.indexOf(btnMatematica));
  });

  it('Vista 3 (Grado): al seleccionar una asignatura muestra cuaderno.png con la asignatura en portada y los grados ordenados por progresión académica', () => {
    const gradosDesordenados = [
      'Décimo Año (10°)',
      'Grupo Heterogéneo',
      'Segundo Año (2°)',
      'Transición',
      'Primer Año (1°)',
      'Materno Infantil (Interactivo I)',
      'Documento Rector',
      'Interactivo II'
    ];
    const planesGrados = gradosDesordenados.map((grado, idx) => ({
      ...mockPlanes[1],
      id: `DDC-GRADO-${idx}`,
      asignatura: 'Educación Musical',
      grado
    }));

    render(<GeneralTable planes={planesGrados} />);

    // Vista 1 -> Vista 2 -> Vista 3
    fireEvent.click(screen.getByRole('button', { name: /I y II Ciclos/i }));
    fireEvent.click(screen.getByRole('button', { name: /Educación Musical/i }));

    expect(screen.getByRole('heading', { name: 'Grado' })).toBeInTheDocument();
    const imgCuaderno = screen.getByAltText('Cuaderno de Educación Musical');
    expect(imgCuaderno).toBeInTheDocument();
    expect(imgCuaderno).toHaveAttribute('src', '/assets/images/cuaderno.png');

    // Portada del cuaderno con clase uppercase y el nombre de la asignatura
    const portadaTexto = imgCuaderno.parentElement.querySelector('span');
    expect(portadaTexto).toHaveTextContent('Educación Musical');
    expect(portadaTexto.className).toContain('uppercase');

    // Verificar orden progresivo de los botones de grado
    const ordenEsperado = [
      'Materno Infantil (Interactivo I)',
      'Interactivo II',
      'Transición',
      'Grupo Heterogéneo',
      'Primer Año (1°)',
      'Segundo Año (2°)',
      'Décimo Año (10°)',
      'Documento Rector'
    ];

    const botonesVista = screen.getAllByRole('button');
    const indices = ordenEsperado.map((nombreGrado) =>
      botonesVista.findIndex((btn) => btn.textContent.includes(nombreGrado))
    );
    for (let i = 0; i < indices.length - 1; i++) {
      expect(indices[i]).toBeLessThan(indices[i + 1]);
    }
  });

  it('recorre siempre las 4 pantallas completas sin saltar pasos aunque exista solo 1 asignatura y 1 grado', () => {
    const unSoloPlan = [mockPlanes[0]]; // Educación Preescolar -> Educación Preescolar -> Transición
    render(<GeneralTable planes={unSoloPlan} />);

    // Pantalla 1: Ofertas Educativas
    expect(screen.getByRole('heading', { name: 'Ofertas Educativas' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Educación Preescolar/i }));

    // Pantalla 2: Asignaturas (no salta directo a Grado ni a Contenido)
    expect(screen.getByRole('heading', { name: 'Asignaturas' })).toBeInTheDocument();
    expect(screen.getByAltText('Bolso escolar de Asignaturas')).toBeInTheDocument();
    const btnsPreescolar = screen.getAllByRole('button', { name: /Educación Preescolar/i });
    fireEvent.click(btnsPreescolar[btnsPreescolar.length - 1]);

    // Pantalla 3: Grado (no salta directo a Contenido)
    expect(screen.getByRole('heading', { name: 'Grado' })).toBeInTheDocument();
    expect(screen.getByAltText('Cuaderno de Educación Preescolar')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Transición/i }));

    // Pantalla 4: Contenido
    expect(screen.getByRole('heading', { name: 'Contenido' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'CONTENIDO DESCARGABLE' })).toBeInTheDocument();
  });

  it('Vista 4 (Contenido): muestra la tabla CONTENIDO DESCARGABLE, dispara descarga individual y el botón Descargar todo debajo de la tabla', () => {
    const onDownload = vi.fn();
    const onDownloadAll = vi.fn();

    render(
      <GeneralTable
        planes={mockPlanes}
        onDownload={onDownload}
        onDownloadAll={onDownloadAll}
      />
    );

    // Navegar a I y II Ciclos -> Español -> Segundo Año (2°) (tiene 2 archivos)
    fireEvent.click(screen.getByRole('button', { name: /I y II Ciclos/i }));
    fireEvent.click(screen.getByRole('button', { name: /Español/i }));
    fireEvent.click(screen.getByRole('button', { name: /Segundo Año \(2°\)/i }));

    expect(screen.getByRole('heading', { name: 'Contenido' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'CONTENIDO DESCARGABLE' })).toBeInTheDocument();

    // Descarga individual desde la tabla
    const botonesIndividuales = screen.getAllByTitle(/Descargar archivo individual:/i);
    expect(botonesIndividuales).toHaveLength(2);
    fireEvent.click(botonesIndividuales[0]);
    expect(onDownload).toHaveBeenCalledTimes(1);
    expect(onDownload).toHaveBeenCalledWith(mockPlanes[3], mockPlanes[3].archivos[0]);

    // Botón Descargar todo debajo de la tabla
    const btnDescargarTodo = screen.getByRole('button', { name: /Descargar todo \(2\)/i });
    expect(btnDescargarTodo).toBeInTheDocument();
    fireEvent.click(btnDescargarTodo);
    expect(onDownloadAll).toHaveBeenCalledTimes(1);
    expect(onDownloadAll).toHaveBeenCalledWith(mockPlanes[3]);
  });

  it('permite navegar hacia atrás usando los botones 3D de la cinta «Volver a:» y resetKey', () => {
    const { rerender } = render(<GeneralTable planes={mockPlanes} resetKey={0} />);

    // Avanzar hasta Vista 4
    fireEvent.click(screen.getByRole('button', { name: /I y II Ciclos/i }));
    fireEvent.click(screen.getByRole('button', { name: /Español/i }));
    fireEvent.click(screen.getByRole('button', { name: /Segundo Año \(2°\)/i }));
    expect(screen.getByRole('heading', { name: 'Contenido' })).toBeInTheDocument();

    // En Vista 4, clic en el 3er botón 3D (Grado: Segundo Año (2°)) regresa a Vista 3 (Grado)
    const navVista4 = screen.getByRole('navigation', { name: 'Ruta de navegación curricular' });
    fireEvent.click(within(navVista4).getByRole('button', { name: 'Segundo Año (2°)' }));
    expect(screen.getByRole('heading', { name: 'Grado' })).toBeInTheDocument();

    // En Vista 3, clic en el 2do botón 3D (Asignatura: Español) regresa a Vista 2 (Asignaturas)
    const navVista3 = screen.getByRole('navigation', { name: 'Ruta de navegación curricular' });
    fireEvent.click(within(navVista3).getByRole('button', { name: 'Español' }));
    expect(screen.getByRole('heading', { name: 'Asignaturas' })).toBeInTheDocument();

    // Desde Vista 2, clic en el 1er botón 3D (Oferta: I y II Ciclos) regresa a Vista 1 (Ofertas Educativas)
    const navVista2 = screen.getByRole('navigation', { name: 'Ruta de navegación curricular' });
    fireEvent.click(within(navVista2).getByRole('button', { name: 'I y II Ciclos' }));
    expect(screen.getByRole('heading', { name: 'Ofertas Educativas' })).toBeInTheDocument();

    // Al cambiar resetKey desde cualquier vista interna, vuelve a Vista 1
    fireEvent.click(screen.getByRole('button', { name: /I y II Ciclos/i }));
    expect(screen.getByRole('heading', { name: 'Asignaturas' })).toBeInTheDocument();
    rerender(<GeneralTable planes={mockPlanes} resetKey={1} />);
    expect(screen.getByRole('heading', { name: 'Ofertas Educativas' })).toBeInTheDocument();
  });

  it('reorganiza dinámicamente la disposición según relación de aspecto (Alto > Ancho portrait vs Ancho > Alto landscape) y muestra el título oficial en Header', () => {
    // 1. Verificar el nuevo título oficial en Header
    render(<Header onGoHome={vi.fn()} onOpenAbout={vi.fn()} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Plantillas de Planeamientos Didácticos' })).toBeInTheDocument();

    // 2. Verificar modo Horizontal (Ancho > Alto -> landscape)
    window.innerWidth = 1366;
    window.innerHeight = 768;
    const { container } = render(<GeneralTable planes={mockPlanes} />);
    const rootSection = container.querySelector('section[data-orientation]');
    expect(rootSection).toHaveAttribute('data-orientation', 'landscape');

    // 3. Cambiar a modo Vertical (Alto > Ancho -> portrait)
    act(() => {
      window.innerWidth = 390;
      window.innerHeight = 844;
      window.dispatchEvent(new Event('resize'));
    });
    expect(rootSection).toHaveAttribute('data-orientation', 'portrait');
    expect(screen.getByAltText('Docente guía de Ofertas Educativas')).toBeInTheDocument();

    // Restaurar dimensiones estándar de prueba
    act(() => {
      window.innerWidth = 1024;
      window.innerHeight = 768;
      window.dispatchEvent(new Event('resize'));
    });
  });

  it('distribuye 21 asignaturas (III Ciclo y Diversificada - Secundaria) en zonas orbitales CSS Flow sin position:absolute ni superposición', () => {
    window.innerWidth = 1366;
    window.innerHeight = 768;

    const asignaturasSecundaria = [
      'Artes Industriales',
      'Artes Plásticas',
      'Biología',
      'Ciencias',
      'Educación Cívica',
      'Educación Física',
      'Educación Musical',
      'Educación para el Hogar',
      'Educación para la Paz y la Convivencia',
      'Educación Religiosa',
      'Español',
      'Estudios Sociales',
      'Filosofía',
      'Física',
      'Francés',
      'Inglés',
      'Italiano',
      'Matemática',
      'Orientación',
      'Psicología',
      'Química'
    ];

    const planesSecundaria = asignaturasSecundaria.map((asig, idx) => ({
      id: `DDC-SEC-${idx}`,
      ofertaCodigo: 'III-CICLO-DIVERSIFICADA',
      ofertaNombre: 'III Ciclo y Diversificada (Secundaria)',
      ofertaBadgeColor: 'blue',
      asignatura: asig,
      grado: 'Décimo Año (10°)',
      rutaRelativa: `secundaria/${idx}`,
      archivos: [{ nombre: `plan-${idx}.zip`, tipo: 'ZIP', ruta: `/data/${idx}.zip`, tamanoBytes: 1024, tamanoLegible: '1.0 KB' }],
      archivoPrincipal: `plan-${idx}.zip`,
      rutaDescarga: `/data/${idx}.zip`,
      vigencia: '2027'
    }));

    const { container } = render(<GeneralTable planes={planesSecundaria} />);
    fireEvent.click(screen.getByRole('button', { name: /III Ciclo y Diversificada \(Secundaria\)/i }));

    const orbitalStage = container.querySelector('[data-orbital-stage="true"]');
    expect(orbitalStage).toBeInTheDocument();
    expect(orbitalStage).toHaveAttribute('data-orbital-density', 'high');

    // Los 21 botones están dentro del escenario orbital sin ningún envoltorio position:absolute
    const botonesOrbitales = within(orbitalStage).getAllByRole('button');
    expect(botonesOrbitales).toHaveLength(21);
    expect(orbitalStage.querySelectorAll('.absolute')).toHaveLength(0);

    // Verificar que Biología y Química están ambos presentes y en orden alfabético
    expect(botonesOrbitales[0]).toHaveTextContent('Artes Industriales');
    expect(botonesOrbitales[2]).toHaveTextContent('Biología');
    expect(botonesOrbitales[20]).toHaveTextContent('Química');
  });
});
