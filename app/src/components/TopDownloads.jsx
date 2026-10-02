import React, { useState } from 'react';
import { AsignaturaIcon, IconTrophy, IconDownload, IconEye } from './Icons';

export function TopDownloads({ planes, onPreview, onDownload }) {
  const [limiteTop, setLimiteTop] = useState(4);

  // Ordenar de mayor a menor número de descargas
  const topPlanes = [...planes]
    .sort((a, b) => b.descargas - a.descargas)
    .slice(0, limiteTop);

  const getRankBadge = (index) => {
    switch (index) {
      case 0:
        return {
          label: '#1 Top Nacional',
          bg: 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800 font-bold',
          badgePill: 'bg-amber-500 text-white shadow-sm'
        };
      case 1:
        return {
          label: '#2 Más Popular',
          bg: 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-600 font-bold',
          badgePill: 'bg-slate-400 dark:bg-slate-500 text-white shadow-sm'
        };
      case 2:
        return {
          label: '#3 Destacado',
          bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800 font-bold',
          badgePill: 'bg-amber-700 text-white shadow-sm'
        };
      default:
        return {
          label: `#${index + 1} del Ranking`,
          bg: 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800 font-medium',
          badgePill: 'bg-blue-600 text-white shadow-sm'
        };
    }
  };

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-10 transition-colors duration-200">
      {/* Encabezado del área */}
      <div className="bg-gradient-to-r from-[#172554] to-[#1e3a8a] dark:from-[#0f1d38] dark:to-[#172e5c] p-6 text-white border-b-2 border-amber-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="p-2 rounded-lg bg-amber-500 text-white shadow-md">
              <IconTrophy className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              2. Top de Descargas Docentes
            </h2>
          </div>
          <p className="text-blue-100 text-sm max-w-2xl">
            Planes de estudio con mayor número de descargas por docentes a nivel nacional en tiempo real.
          </p>
        </div>

        {/* Selector de cantidad de descargas (4 a 10) */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-blue-950/70 border border-blue-800 px-3 py-1.5 rounded-lg text-xs">
          <span className="text-blue-200 font-medium">Ver top:</span>
          {[4, 6, 8, 10].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setLimiteTop(num)}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                limiteTop === num
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de tarjetas */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topPlanes.map((doc, index) => {
            const rank = getRankBadge(index);
            return (
              <div
                key={doc.id}
                className="relative bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-850 border border-slate-200 dark:border-slate-700/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group hover:border-amber-400 dark:hover:border-amber-400"
              >
                {/* Posición / Ranking badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${rank.badgePill}`}>
                    #{index + 1}
                  </span>
                  <span className={`text-[11px] px-2 py-0.5 rounded border ${rank.bg}`}>
                    {rank.label}
                  </span>
                </div>

                {/* Icono de asignatura, Nombre y Nivel requeridos */}
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-slate-700/80 border border-blue-200 dark:border-slate-600 text-blue-800 dark:text-amber-400 group-hover:bg-amber-50 group-hover:border-amber-300 group-hover:text-amber-800 dark:group-hover:bg-slate-700 transition-colors">
                      <AsignaturaIcon asignatura={doc.asignatura} className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-wider block">
                        {doc.asignatura}
                      </span>
                      {/* Nivel */}
                      <span className="text-xs font-bold text-blue-900 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded-md inline-block mt-0.5">
                        Nivel {doc.nivel}
                      </span>
                    </div>
                  </div>

                  {/* Nombre */}
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mt-2 leading-snug group-hover:text-blue-700 dark:group-hover:text-amber-400 transition-colors">
                    {doc.nombre}
                  </h3>
                </div>

                {/* Total de descargas */}
                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-700/80">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Total descargas:
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-slate-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-md">
                      <IconDownload className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      {doc.descargas}
                    </span>
                  </div>

                  {/* Botones de acción rápida */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onPreview(doc)}
                      className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600 rounded-lg transition-colors shadow-sm"
                    >
                      <IconEye className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Ver</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDownload(doc)}
                      className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors shadow-sm"
                    >
                      <IconDownload className="w-3.5 h-3.5" />
                      <span>Bajar</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
