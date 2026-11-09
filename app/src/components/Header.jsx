import React from 'react';
import { IconHome, IconInfo } from './Icons';
import appVersion from '../data/version.json';

export function Header({ onGoHome, onOpenAbout }) {
  return (
    <header
      role="banner"
      className="relative w-full bg-[#017EC1] shadow-md border-b-2 border-amber-500 flex-shrink-0 z-20"
    >
      <div className="w-full px-2 sm:px-4 lg:px-8 grid grid-cols-3 items-center gap-1 sm:gap-3 min-h-[76px] py-2">
        {/* Banner oficial institucional del MEP */}
        <div className="flex items-center shrink-0">
          <img
            src="/assets/images/header.jpg"
            alt="Ministerio de Educación Pública · Gobierno de Costa Rica"
            className="w-12 sm:w-auto h-auto sm:h-14 lg:h-18 object-contain block select-none"
          />
        </div>

        {/* Título institucional centrado con ayuda flotante accesible (+60% escala y presencia) */}
        <div className="relative group min-w-0 justify-self-center text-center text-white">
          <h1
            tabIndex="0"
            aria-describedby="header-description"
            className="text-xs sm:text-lg md:text-xl lg:text-2xl xl:text-[26px] font-black tracking-tight text-white drop-shadow-sm leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded"
          >
            {appVersion.heroTitulo || 'Plantillas de Planeamientos Didácticos'}
          </h1>
          <span
            id="header-description"
            role="tooltip"
            className="hidden group-hover:block group-focus-within:block absolute top-full left-1/2 -translate-x-1/2 mt-2 z-30 w-56 sm:w-80 lg:w-96 rounded-lg bg-slate-900 px-3 py-2 text-xs leading-relaxed font-normal text-white shadow-xl border border-amber-400/60 normal-case"
          >
            {appVersion.heroSubtitulo || 'Catálogo Nacional Normado de planeamientos educativos aprobados por el Consejo Superior de Educación para la educación pública costarricense.'}
          </span>
        </div>

        {/* Controles institucionales: Inicio, Acerca de y ¡Califícame! */}
        <div className="flex items-center justify-self-end gap-1.5 sm:gap-2.5 lg:gap-3 flex-shrink-0 z-10">
          {/* Botón Inicio (vuelve a Vista 1: Ofertas Educativas) */}
          <button
            onClick={onGoHome}
            type="button"
            className="p-2 sm:px-4 sm:py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs border border-white/35 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            title="Volver al inicio (Ofertas Educativas)"
            aria-label="Ir al inicio de Ofertas Educativas"
          >
            <IconHome className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
            <span className="text-xs sm:text-sm font-bold text-white hidden sm:inline">Inicio</span>
          </button>

          {/* Acerca de */}
          <button
            onClick={onOpenAbout}
            type="button"
            className="p-2 sm:px-4 sm:py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs border border-white/35 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            title="Conocer más acerca de Plantillas de Planeamientos Didácticos y la DDC"
            aria-label="Acerca del Repositorio Curricular Digital"
          >
            <IconInfo className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
            <span className="text-xs sm:text-sm font-bold text-white hidden sm:inline">Acerca de</span>
          </button>

          {/* Botón Califícame con imagen oficial */}
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Califique este servicio institucional. Su opinión es importante"
            className="inline-flex items-center transition-transform hover:scale-105 active:scale-95 drop-shadow-sm ml-0.5"
          >
            <img
              src="/assets/images/calificame_fullcolor2.png"
              alt="¡Califícame!"
              className="w-7 sm:w-auto h-auto sm:h-11 md:h-12 object-contain block select-none"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
