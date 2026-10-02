import React from 'react';
import { IconSun, IconMoon } from './Icons';

export function Header({ totalDocs, totalDescargas, onResetData, darkMode, onToggleTheme }) {
  return (
    <header className="bg-[#0f2942] dark:bg-[#071320] text-white shadow-md border-b-4 border-amber-500 transition-colors duration-200">
      {/* Barra superior de gobierno institucional */}
      <div className="bg-[#0a1c2d] dark:bg-[#040b12] py-1.5 px-4 text-xs font-medium text-slate-300 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span className="font-semibold text-white tracking-wide">REPÚBLICA DE COSTA RICA</span>
            <span className="text-slate-500">|</span>
            <span>Ministerio de Educación Pública</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 text-xs">
            <span>DDC · Dirección de Desarrollo Curricular</span>
            <span className="text-slate-500">·</span>
            <span className="text-amber-400 font-medium">Curso Lectivo 2026</span>
          </div>
        </div>
      </div>

      {/* Cabecera principal institucional */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            {/* Emblema / Logo */}
            <div className="relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-blue-700 via-blue-900 to-[#0a1c2d] p-2.5 shadow-lg border border-blue-400/30 flex items-center justify-center">
              <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <path d="M12 6v6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="14" r="1" fill="#f59e0b" />
              </svg>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-blue-900/80 text-blue-200 border border-blue-700/50">
                  Biblioteca Digital Corporativa
                </span>
                <span className="text-xs text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 hidden sm:inline">
                  Acceso Docente Oficial
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
                ddc-planes-digitales
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-0.5">
                Repositorio oficial de planes de estudio para docentes del Ministerio de Educación Pública
              </p>
            </div>
          </div>

          {/* Estadísticas de cabecera, selector de tema claro/oscuro y reinicio */}
          <div className="flex items-center gap-2.5 sm:gap-3 self-start md:self-auto flex-wrap">
            <div className="bg-slate-800/80 dark:bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-center">
              <span className="block text-[11px] uppercase text-slate-400 font-medium">Planes Totales</span>
              <span className="text-base sm:text-lg font-bold text-white">{totalDocs}</span>
            </div>
            <div className="bg-slate-800/80 dark:bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-center">
              <span className="block text-[11px] uppercase text-slate-400 font-medium">Descargas</span>
              <span className="text-base sm:text-lg font-bold text-amber-400">{totalDescargas}</span>
            </div>

            {/* Selector de modo claro / oscuro */}
            <button
              onClick={onToggleTheme}
              type="button"
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-amber-300 hover:text-amber-200 border border-slate-700 transition-all flex items-center gap-1.5 shadow-sm"
              title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {darkMode ? (
                <>
                  <IconSun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                  <span className="text-xs font-semibold text-slate-200 hidden sm:inline">Claro</span>
                </>
              ) : (
                <>
                  <IconMoon className="w-4 h-4 text-blue-200" />
                  <span className="text-xs font-semibold text-slate-200 hidden sm:inline">Oscuro</span>
                </>
              )}
            </button>

            {/* Botón de reinicio de datos */}
            <button
              onClick={onResetData}
              title="Restablecer datos originales de prueba"
              className="text-xs text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700 px-2.5 py-2 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
              <span className="hidden lg:inline">Reiniciar</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
