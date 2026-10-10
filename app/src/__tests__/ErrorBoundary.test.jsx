import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Componente defectuoso que simula una excepción imprevista de renderizado
function ComponenteConError({ deberiaFallar }) {
  if (deberiaFallar) {
    throw new Error('Fallo crítico simulado de renderizado en componente');
  }
  return <div>Contenido renderizado correctamente</div>;
}

describe('Suite 7: ErrorBoundary (Tolerancia a Excepciones de UI - React 19)', () => {
  it('ERR-01: Renderiza los componentes hijos con normalidad cuando no hay errores', () => {
    render(
      <ErrorBoundary>
        <ComponenteConError deberiaFallar={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Contenido renderizado correctamente')).toBeInTheDocument();
  });

  it('ERR-02: Intercepta excepciones de renderizado y despliega la tarjeta institucional de contingencia', () => {
    // Suprimir el console.error en la prueba para evitar ruido en el test runner
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ComponenteConError deberiaFallar={true} />
      </ErrorBoundary>
    );

    // Verificar que no se rompe la app y se presenta la pantalla de contingencia
    expect(screen.getByText(/Se ha producido un error inesperado/i)).toBeInTheDocument();
    expect(screen.getByText(/Fallo crítico simulado/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Recargar aplicación/i })).toBeInTheDocument();

    spy.mockRestore();
  });
});
