import React from 'react';
import appVersion from '../data/version.json';

export function Footer() {
  return (
    <footer className="w-full bg-[#0F1C2D] border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 py-2.5 px-4 sm:px-6 lg:px-8">
        {/* Leyenda oficial institucional (contenedor responsivo con recorte del espacio vacío derecho) */}
        <div className="overflow-hidden flex-shrink min-w-0 max-w-[460px] sm:max-w-[500px]">
          <img
            src="/assets/images/footer.jpg"
            alt={appVersion.institucion}
            className="h-6 sm:h-7 w-auto max-w-none block select-none"
          />
        </div>

        {/* Badge de estado del sistema (dinámico desde version.json con tooltip de auditoría) */}
        <div className="flex items-center flex-shrink-0">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-xs shadow-xs font-medium whitespace-nowrap select-none cursor-default"
            title={`${appVersion.estado} · Versión ${appVersion.versionCompleta} (${appVersion.liberacion}) · Compilación: ${appVersion.compilacion}`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {appVersion.estado} v{appVersion.version}
          </span>
        </div>
      </div>
    </footer>
  );
}
