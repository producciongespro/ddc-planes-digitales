import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#0a1c2d] dark:bg-[#03080e] text-slate-400 border-t border-slate-800 transition-colors duration-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
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
    </footer>
  );
}
