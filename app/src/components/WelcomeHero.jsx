import React from 'react';
import appVersion from '../data/version.json';
import { IconDocument } from './Icons';

export function WelcomeHero() {
  const titulo = appVersion.heroTitulo || 'Repositorio de Planeamientos Curriculares';
  const subtitulo = appVersion.heroSubtitulo || 'Catálogo nacional normado de planeamientos educativos aprobados por el Consejo Superior de Educación para la Educación Pública Costarricense.';

  return (
    <section 
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-r from-[#0f2942] via-[#153454] to-[#1e293b] dark:from-[#0a1829] dark:via-[#0e2138] dark:to-[#132d4a] text-white rounded-2xl p-5 sm:p-6 mb-6 shadow-md border-b-2 border-amber-500 transition-colors duration-200"
    >
      {/* Detalle visual sutil en fondo */}
      <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-400 via-amber-300 to-amber-500" />

      {/* Contenido: Icono institucional, Título maestro H1 con máxima presencia y Subtítulo */}
      <div className="flex items-start gap-4 pl-1 min-w-0 relative z-10">
        <div className="p-3 rounded-xl bg-blue-600/30 text-white shadow-inner border border-blue-400/30 flex-shrink-0 mt-0.5 backdrop-blur-xs">
          <IconDocument className="w-6 h-6 text-amber-400" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 
            id="hero-title"
            className="text-lg sm:text-2xl font-black text-white tracking-tight drop-shadow-xs mb-1.5"
          >
            {titulo}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl font-normal drop-shadow-xs">
            {subtitulo}
          </p>
        </div>
      </div>
    </section>
  );
}
