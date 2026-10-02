import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#0a1c2d] dark:bg-[#03080e] text-slate-300 border-t border-slate-800 transition-colors duration-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white font-bold text-sm shadow">
                MEP
              </div>
              <span className="font-bold text-white text-base">Dirección de Desarrollo Curricular</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Plataforma institucional de consulta, previsualización y descarga digital de planes de estudio para la mediación pedagógica en el sistema educativo nacional de Costa Rica.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-3">
              Estructura Curricular
            </h4>
            <ul className="text-sm text-slate-400 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span><strong>Primaria:</strong> I Ciclo (1° a 3°) y II Ciclo (4° a 6°)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span><strong>Secundaria:</strong> III Ciclo (7° a 9°) y Educación Diversificada</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Documentos oficiales en formato PDF para uso docente</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-3">
              Repositorio Institucional
            </h4>
            <p className="text-sm text-slate-400 mb-2">
              Los archivos digitales de planes curriculares residen de manera segura en el repositorio del portal web.
            </p>
            <div className="bg-slate-900/90 dark:bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Catálogo y métricas persistentes en el navegador</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Ministerio de Educación Pública · San José, Costa Rica
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © 2026 Ministerio de Educación Pública de Costa Rica · Dirección de Desarrollo Curricular (DDC).
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950 dark:bg-emerald-900/40 text-emerald-300 border border-emerald-800 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Sistema Activo v2.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
