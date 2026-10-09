import React from 'react';

/**
 * Componente institucional de Splash Screen y pantalla de contingencia por error de red.
 * Muestra un logotipo provisional elegante mientras el área de diseño envía el arte final.
 */
export function SplashScreen({ error, onRetry }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-[#0a1e35] to-[#040e1b] text-white p-6 select-none animate-fadeIn">
      {/* Contenedor central con tarjeta de vidrio sutil */}
      <div className="max-w-md w-full bg-slate-800/40 backdrop-blur-md rounded-3xl border border-slate-700/50 shadow-2xl p-8 flex flex-col items-center text-center">
        
        {/* Isotipo Provisional Institucional MEP / DDC 2027 */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-700 via-blue-900 to-slate-900 p-0.5 shadow-xl shadow-blue-900/40 border border-blue-400/30 flex items-center justify-center">
            <div className="w-full h-full rounded-2xl bg-slate-900/80 flex flex-col items-center justify-center gap-1">
              {/* Libro y Escudo Curricular en SVG */}
              <svg className="w-10 h-10 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10" />
                <path d="M6 10h10" />
                <path d="M6 14h6" />
                <path d="M18 2v20" stroke="#38bdf8" strokeWidth="2" />
              </svg>
              <span className="text-[10px] font-black tracking-widest text-blue-300">MEP · DDC</span>
            </div>
          </div>
          {/* Badge de vigencia 2027 */}
          <span className="absolute -bottom-2 -right-2 px-2 py-0.5 text-[10px] font-extrabold bg-amber-500 text-slate-950 rounded-full shadow-md border border-amber-300">
            2027
          </span>
        </div>

        {/* Título institucional */}
        <h1 className="text-xl font-bold text-slate-100 tracking-tight mb-1">
          Planes de Estudio Digitales
        </h1>
        <p className="text-xs text-blue-200/80 uppercase tracking-widest font-medium mb-6">
          Ministerio de Educación Pública de Costa Rica
        </p>

        {/* Estado 1: Error de carga de red con botón de reintento */}
        {error ? (
          <div className="w-full flex flex-col items-center animate-fadeIn">
            <div className="p-3 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 mb-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-rose-300 mb-1">
              Error al consultar el catálogo
            </p>
            <p className="text-xs text-slate-400 mb-5 px-2">
              {error}
            </p>
            <button
              type="button"
              onClick={onRetry}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4 animate-spin-reverse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.72 2.24L21 8" />
                <path d="M21 3v5h-5" />
              </svg>
              <span>Reintentar conexión</span>
            </button>
          </div>
        ) : (
          /* Estado 2: Cargando normalmente con Spinner */
          <div className="flex flex-col items-center">
            {/* Spinner institucional de doble anillo */}
            <div className="relative w-10 h-10 mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
              <div className="w-10 h-10 rounded-full border-2 border-transparent border-t-amber-400 border-r-amber-400 animate-spin" />
            </div>

            <p className="text-sm font-medium text-slate-200 tracking-wide">
              Cargando catálogo curricular 2027...
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Sincronizando 197 programas oficiales
            </p>
          </div>
        )}
      </div>

      {/* Pie de pantalla discreto */}
      <div className="mt-6 text-center text-[11px] text-slate-500 tracking-wider">
        Dirección de Desarrollo Curricular · CSE Costa Rica
      </div>
    </div>
  );
}
