import React, { useState } from 'react';
import { AsignaturaIcon, IconTrophy, IconDownload } from './Icons';

export function TopDownloads({ planes, onDownload }) {
  const [limiteTop, setLimiteTop] = useState(4);

  // Verificar si hay descargas registradas en el sistema
  const hayDescargas = planes.some((p) => p.descargas > 0);

  // Ordenar de mayor a menor número de descargas (únicamente los que tienen > 0)
  const topPlanes = hayDescargas
    ? [...planes]
        .filter((p) => p.descargas > 0)
        .sort((a, b) => b.descargas - a.descargas)
        .slice(0, limiteTop)
    : [];

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

  const getBadgeColor = (color) => {
    switch (color) {
      case 'amber':
        return 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'blue':
        return 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800';
      case 'indigo':
        return 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800';
      case 'teal':
        return 'bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border-teal-300 dark:border-teal-800';
      case 'purple':
        return 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800';
      case 'rose':
        return 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800';
      case 'emerald':
        return 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700';
    }
  };

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-8 transition-colors duration-200">
      {/* Encabezado del área */}
      <div className="bg-gradient-to-r from-[#003B71] via-[#017EC1] to-[#0267a0] dark:from-[#1a3863] dark:via-[#1e447b] dark:to-[#235091] p-6 text-white border-b-2 border-amber-500 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="p-2 rounded-lg bg-amber-500 text-slate-950 shadow-md">
              <IconTrophy className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              2. Top de Descargas Docentes
            </h2>
          </div>
          <p className="text-blue-100 text-sm max-w-2xl">
            Planeamientos educativos con mayor demanda y descargas a nivel nacional en tiempo real.
          </p>
        </div>

        {/* Selector de cantidad de descargas */}
        {hayDescargas ? (
          <div className="flex items-center gap-2 self-start sm:self-auto bg-blue-950/70 border border-blue-800 px-3 py-1.5 rounded-lg text-xs">
            <span className="text-blue-200 font-medium">Ver top:</span>
            {[4, 8, 12, 16].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setLimiteTop(num)}
                className={`px-2.5 py-1 rounded font-semibold transition-all cursor-pointer ${
                  limiteTop === num
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-xs text-blue-200 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Sin descargas activas</span>
          </div>
        )}
      </div>

      {/* Cuerpo del Top de Descargas */}
      {!hayDescargas ? (
        /* Estado vacío (Zero state) */
        <div className="p-10 sm:p-14 text-center flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-950/30">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-3 shadow-xs">
            <IconDownload className="w-7 h-7" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
            Sin datos registrados en el Top de Descargas
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            El ranking se activará dinámicamente en tiempo real una vez que se descarguen los planeamientos curriculares.
          </p>
        </div>
      ) : (
        /* Cuadrícula de documentos Top */
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {topPlanes.map((doc, index) => {
            const rank = getRankBadge(index);
            const badgeClass = getBadgeColor(doc.ofertaBadgeColor);

            return (
              <div
                key={doc.id}
                className="relative bg-gradient-to-b from-slate-100 via-slate-200/90 to-slate-300/80 dark:from-[#3d5377] dark:via-[#2a3c57] dark:to-[#182537] border border-slate-300 dark:border-slate-500/80 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between group hover:border-amber-400 dark:hover:border-amber-400"
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

                {/* Materia, Nivel y Grado */}
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-slate-700/80 border border-blue-200 dark:border-slate-600 text-blue-800 dark:text-amber-400 group-hover:bg-amber-50 group-hover:border-amber-300 group-hover:text-amber-800 dark:group-hover:bg-slate-700 transition-colors">
                      <AsignaturaIcon asignatura={doc.asignatura} className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs uppercase font-bold text-slate-600 dark:text-slate-300 tracking-wider block truncate">
                        {doc.asignatura}
                      </span>
                      <span className="text-xs font-semibold text-blue-900 dark:text-blue-300 block truncate">
                        {doc.grado}
                      </span>
                    </div>
                  </div>

                  {/* Badge de Oferta Educativa */}
                  <div className="mt-2">
                    <span className={`text-[11px] px-2 py-0.5 rounded-md font-semibold border inline-block ${badgeClass}`}>
                      {doc.ofertaNombre}
                    </span>
                  </div>
                </div>

                {/* Descargas y botón directo */}
                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-700/80">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Descargas:
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-md">
                      <IconDownload className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      {doc.descargas}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDownload(doc)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white shadow-xs transition-colors cursor-pointer"
                    title={
                      doc.archivos && doc.archivos.length > 1
                        ? `Descargar los ${doc.archivos.length} archivos de ${doc.asignatura}`
                        : `Descargar ${doc.archivoPrincipal || 'ZIP oficial'}`
                    }
                  >
                    <IconDownload className="w-4 h-4" />
                    <span>
                      {doc.archivos && doc.archivos.length > 1
                        ? `Descargar (${doc.archivos.length} archivos)`
                        : 'Descargar ZIP'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
