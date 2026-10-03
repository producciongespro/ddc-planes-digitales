import React from 'react';
import appVersion from '../data/version.json';
import { IconInfo, IconDocument } from './Icons';

export function WelcomeHero({ onOpenAbout }) {
  const titulo = appVersion.heroTitulo || 'Repositorio Curricular Oficial';
  const subtitulo = appVersion.heroSubtitulo || 'Catálogo nacional normado de planes de estudio del Ministerio de Educación Pública de Costa Rica.';

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-900/10 via-slate-100 to-transparent dark:from-blue-950/40 dark:via-slate-900/40 dark:to-transparent border border-blue-200/70 dark:border-blue-900/40 rounded-2xl p-4 sm:p-5 mb-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Acento decorativo institucional */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-600 via-amber-500 to-blue-800 rounded-l-2xl" />

      {/* Título y subtítulo dinámicos desde version.json */}
      <div className="flex items-start gap-3.5 pl-1.5 min-w-0">
        <div className="p-2.5 rounded-xl bg-blue-900/10 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300 flex-shrink-0 mt-0.5">
          <IconDocument className="w-5 h-5 text-blue-800 dark:text-blue-400" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {titulo}
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              DDC · MEP
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {subtitulo}
          </p>
        </div>
      </div>

      {/* Botón de acceso rápido a Acerca de la DDC */}
      <div className="flex-shrink-0 pl-1.5 sm:pl-0">
        <button
          type="button"
          onClick={onOpenAbout}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-900 dark:text-blue-300 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700/80 border border-blue-200 dark:border-blue-800 rounded-xl transition-all shadow-xs"
        >
          <IconInfo className="w-4 h-4 text-blue-700 dark:text-blue-400" />
          <span>Conocer más</span>
        </button>
      </div>
    </div>
  );
}
