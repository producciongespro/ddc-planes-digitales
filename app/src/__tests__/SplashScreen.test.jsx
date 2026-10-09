import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SplashScreen } from '../components/SplashScreen';

describe('Suite 3: SplashScreen (Resiliencia y Ciclo de Vida)', () => {
  it('TEST-14: SplashScreen renderiza spinner y textos de carga cuando no hay error', () => {
    render(<SplashScreen error={null} onRetry={vi.fn()} />);

    expect(screen.getByText(/Planes de Estudio Digitales/i)).toBeInTheDocument();
    expect(screen.getByText(/Ministerio de Educación Pública de Costa Rica/i)).toBeInTheDocument();
    expect(screen.getByText(/Cargando catálogo curricular 2027/i)).toBeInTheDocument();
    expect(screen.getByText('2027')).toBeInTheDocument();
  });

  it('TEST-15: SplashScreen muestra tarjeta de error ante fallo de red', () => {
    const errorMsg = 'No se pudo cargar el catálogo curricular (Código HTTP: 500)';
    render(<SplashScreen error={errorMsg} onRetry={vi.fn()} />);

    expect(screen.getByText(/Error al consultar el catálogo/i)).toBeInTheDocument();
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reintentar conexión/i })).toBeInTheDocument();
  });

  it('TEST-16: Presionar "Reintentar conexión" dispara la función onRetry', () => {
    const retryMock = vi.fn();
    render(<SplashScreen error="Error de red" onRetry={retryMock} />);

    const retryBtn = screen.getByRole('button', { name: /Reintentar conexión/i });
    fireEvent.click(retryBtn);

    expect(retryMock).toHaveBeenCalledTimes(1);
  });
});
