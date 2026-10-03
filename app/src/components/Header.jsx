import React from 'react';
import { IconSun, IconMoon } from './Icons';

export function Header({ totalDocs, totalDescargas, onResetData, darkMode, onToggleTheme }) {
  return (
    <header className="relative w-full bg-[#017EC1] shadow-md border-b-2 border-amber-500 overflow-hidden transition-colors">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between min-h-[64px] sm:min-h-[76px] py-1">
        {/* Banner oficial institucional del MEP */}
        <div className="flex items-center min-w-0">
          <img
            src="/assets/images/header.jpg"
            alt="Ministerio de Educación Pública · Gobierno de Costa Rica"
            className="h-12 sm:h-16 md:h-18 w-auto object-contain block select-none"
          />
        </div>

        {/* Controles de cabecera en el orden solicitado: 1. Reiniciar, 2. Modo Oscuro/Claro, 3. Califícame */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 z-10">
          {/* 1. Botón Reiniciar (desarrollo) */}
          {import.meta.env.DEV && (
            <button
              onClick={onResetData}
              type="button"
              title="Restablecer datos originales de prueba (Solo Desarrollo)"
              className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-white/90 hover:text-white bg-black/25 hover:bg-black/40 border border-white/20 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
              <span className="hidden sm:inline">Reiniciar</span>
            </button>
          )}

          {/* 2. Botón de Modo Claro / Oscuro */}
          <button
            onClick={onToggleTheme}
            type="button"
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs border border-white/30 transition-all flex items-center gap-1.5 shadow-sm"
            title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {darkMode ? (
              <>
                <IconSun className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-semibold text-white hidden sm:inline">Claro</span>
              </>
            ) : (
              <>
                <IconMoon className="w-4 h-4 text-white" />
                <span className="text-xs font-semibold text-white hidden sm:inline">Oscuro</span>
              </>
            )}
          </button>

          {/* 3. Botón Califícame con imagen oficial y enlace externo temporal */}
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
            title="¡Califícanos! Tu opinión es importante"
            className="inline-flex items-center transition-transform hover:scale-105 active:scale-95 drop-shadow-sm ml-0.5"
          >
            <img
              src="/assets/images/calificame_fullcolor2.png"
              alt="¡Califícame!"
              className="h-9 sm:h-11 md:h-12 w-auto object-contain block select-none"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
