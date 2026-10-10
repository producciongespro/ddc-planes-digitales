import React from 'react';
import { IconAlertTriangle, IconRefresh } from './Icons';

/**
 * Componente Enterprise Error Boundary (React 19).
 * Captura excepciones imprevistas en el ciclo de vida o renderizado de cualquier componente hijo,
 * previniendo la pantalla blanca del navegador y desplegando una pantalla de contingencia institucional.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Registrar error para trazabilidad y auditoría
    console.error('CRITICAL UI EXCEPTION CAUGHT BY ERROR BOUNDARY:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-slate-900 via-[#0a1e35] to-[#040e1b] text-white p-6 select-none animate-fadeIn">
          <div className="max-w-lg w-full bg-slate-800/60 backdrop-blur-md rounded-3xl border border-slate-700/60 shadow-2xl p-8 flex flex-col items-center text-center">
            {/* Isotipo de alerta institucional */}
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-5 shadow-lg shadow-rose-950/50">
              <IconAlertTriangle className="w-8 h-8" />
            </div>

            <h1 className="text-xl font-bold text-slate-100 tracking-tight mb-2">
              Se ha producido un error inesperado
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              El sistema de protección de interfaz de la Dirección de Desarrollo Curricular ha interceptado una excepción para salvaguardar la integridad de los datos.
            </p>

            {/* Tarjeta de detalle técnico para diagnóstico y auditoría */}
            {this.state.error && (
              <div className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl p-3 text-left mb-6 overflow-hidden">
                <p className="text-[11px] font-mono text-rose-400 break-all">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            {/* Botón de acción: Recargar la aplicación */}
            <button
              type="button"
              onClick={this.handleReload}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <IconRefresh className="w-4 h-4" />
              <span>Recargar aplicación</span>
            </button>

            <p className="mt-6 text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
              MEP · Dirección de Desarrollo Curricular · Costa Rica
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
