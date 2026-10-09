import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GeneralTable } from '../components/GeneralTable';

const mockPlanes = Array.from({ length: 45 }, (_, i) => ({
  id: `DDC-2027-${String(i + 1).padStart(3, '0')}`,
  ofertaCodigo: i < 15 ? 'PRIMARIA' : (i < 30 ? 'SECUNDARIA' : 'PREESCOLAR'),
  ofertaNombre: i < 15 ? 'I y II Ciclos (Primaria)' : (i < 30 ? 'III Ciclo y Diversificada (Secundaria)' : 'Educación Preescolar'),
  ofertaBadgeColor: i < 15 ? 'emerald' : (i < 30 ? 'blue' : 'amber'),
  asignatura: i % 2 === 0 ? 'Educación Musical' : 'Matemática',
  grado: `${(i % 6) + 1}° Año`,
  rutaRelativa: `ruta/${i}`,
  archivos: [
    { nombre: `Plan_${i}.zip`, tipo: 'ZIP', ruta: `/plan_${i}.zip`, tamanoBytes: 1024, tamanoLegible: '1.0 KB' }
  ],
  archivoPrincipal: `Plan_${i}.zip`,
  rutaDescarga: `/plan_${i}.zip`,
  descargas: i * 2,
  vigencia: '2027'
}));

describe('Suite 2: GeneralTable (Paginación Matemática y Filtros)', () => {
  const defaultFiltros = {
    ofertas: [],
    asignaturas: [],
    grados: [],
    texto: ''
  };

  it('TEST-07 & TEST-08: Paginador inicia en página 1 con « Primero y ‹ Anterior deshabilitados', () => {
    render(
      <GeneralTable
        planes={mockPlanes}
        filtros={defaultFiltros}
        onDownload={vi.fn()}
        onFiltrosChange={vi.fn()}
        onResetFiltros={vi.fn()}
      />
    );

    const primeroBtn = screen.getByTitle('Ir a la primera página');
    const anteriorBtn = screen.getByTitle('Página anterior');
    const siguienteBtn = screen.getByTitle('Página siguiente');
    const ultimoBtn = screen.getByTitle('Ir a la última página');

    expect(primeroBtn).toBeDisabled();
    expect(anteriorBtn).toBeDisabled();
    expect(siguienteBtn).not.toBeDisabled();
    expect(ultimoBtn).not.toBeDisabled();
  });

  it('TEST-09: En la última página, Siguiente › y Último » se deshabilitan', () => {
    render(
      <GeneralTable
        planes={mockPlanes}
        filtros={defaultFiltros}
        onDownload={vi.fn()}
        onFiltrosChange={vi.fn()}
        onResetFiltros={vi.fn()}
      />
    );

    const ultimoBtn = screen.getByTitle('Ir a la última página');
    fireEvent.click(ultimoBtn);

    const siguienteBtn = screen.getByTitle('Página siguiente');
    expect(siguienteBtn).toBeDisabled();
    expect(ultimoBtn).toBeDisabled();
  });

  it('TEST-10: Paginador numérico no genera números duplicados jamás', () => {
    render(
      <GeneralTable
        planes={mockPlanes}
        filtros={defaultFiltros}
        onDownload={vi.fn()}
        onFiltrosChange={vi.fn()}
        onResetFiltros={vi.fn()}
      />
    );

    // Con 45 registros a 20 por página hay 3 páginas (1, 2, 3)
    const pageButtons = screen.getAllByRole('button', { name: /^[0-9]+$/ });
    const numbers = pageButtons.map((b) => b.textContent);
    const uniqueNumbers = [...new Set(numbers)];

    expect(numbers).toEqual(uniqueNumbers);
  });

  it('TEST-13: Buscador predictivo libre dispara onFiltrosChange con texto ingresado', () => {
    const handleFiltrosChange = vi.fn();
    render(
      <GeneralTable
        planes={mockPlanes}
        filtros={defaultFiltros}
        onDownload={vi.fn()}
        onFiltrosChange={handleFiltrosChange}
        onResetFiltros={vi.fn()}
      />
    );

    const inputBuscador = screen.getByPlaceholderText(/Buscar por palabra clave, materia o grado/i);
    fireEvent.change(inputBuscador, { target: { value: 'Musical' } });

    expect(handleFiltrosChange).toHaveBeenCalledWith({
      ...defaultFiltros,
      texto: 'Musical'
    });
  });

  it('TEST-17: Botón de descarga de fila invoca a onDownload con el objeto del planeamiento', () => {
    const downloadMock = vi.fn();
    render(
      <GeneralTable
        planes={mockPlanes.slice(0, 5)}
        filtros={defaultFiltros}
        onDownload={downloadMock}
        onFiltrosChange={vi.fn()}
        onResetFiltros={vi.fn()}
      />
    );

    const downloadButtons = screen.getAllByRole('button', { name: /Descargar paquete oficial:/i });
    expect(downloadButtons.length).toBeGreaterThan(0);

    fireEvent.click(downloadButtons[0]);
    expect(downloadMock).toHaveBeenCalledTimes(1);
    expect(downloadMock).toHaveBeenCalledWith(mockPlanes[0]);
  });
});
