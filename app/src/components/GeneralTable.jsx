import React, { useState, useMemo } from 'react';
import { AsignaturaIcon, IconTable, IconEye, IconDownload } from './Icons';

export function GeneralTable({ planes, onPreview, onDownload }) {
  const [filtroCicloTabla, setFiltroCicloTabla] = useState('');

  // Agrupación y resumen estadístico de documentos
  const resumen = useMemo(() => {
    const total = planes.length;
    const primerCiclo = planes.filter((p) => p.ciclo === 'Primer ciclo').length;
    const segundoCiclo = planes.filter((p) => p.ciclo === 'Segundo ciclo').length;
    const porAsignatura = {
      'Estudios Sociales': planes.filter((p) => p.asignatura === 'Estudios Sociales').length,
      'Matemáticas': planes.filter((p) => p.asignatura === 'Matemáticas').length,
      'Español': planes.filter((p) => p.asignatura === 'Español').length,
      'Ciencias': planes.filter((p) => p.asignatura === 'Ciencias').length
    };
    return { total, primerCiclo, segundoCiclo, porAsignatura };
  }, [planes]);

  // Filtrado de la tabla
  const planesMostrados = useMemo(() => {
    if (!filtroCicloTabla) return planes;
    return planes.filter((p) => p.ciclo === filtroCicloTabla);
  }, [planes, filtroCicloTabla]);

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-10 transition-colors duration-200">
      {/* Encabezado del área */}
      <div className="bg-gradient-to-r from-[#0f2942] to-[#1e293b] dark:from-[#091522] dark:to-[#111c2a] p-6 text-white border-b-2 border-amber-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="p-2 rounded-lg bg-blue-600/60 text-white shadow">
              <IconTable className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              3. Tabla General de Documentos a Disposición
            </h2>
          </div>
          <p className="text-slate-300 text-sm max-w-2xl">
            Inventario consolidado de planes curriculares oficiales organizados por ciclo educativo, asignatura y nivel escolar.
          </p>
        </div>

        {/* Filtro rápido para la tabla */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <select
            value={filtroCicloTabla}
            onChange={(e) => setFiltroCicloTabla(e.target.value)}
            className="px-3 py-1.5 bg-slate-800 dark:bg-slate-950 text-slate-200 border border-slate-700 dark:border-slate-700 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Todos los ciclos ({resumen.total})</option>
            <option value="Primer ciclo">Primer ciclo ({resumen.primerCiclo})</option>
            <option value="Segundo ciclo">Segundo ciclo ({resumen.segundoCiclo})</option>
          </select>
        </div>
      </div>

      {/* Tarjetas resumen de disponibilidad */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800">
        <div className="bg-white dark:bg-slate-800/90 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 block">Total a Disposición</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">{resumen.total}</span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-0.5">Planes oficiales PDF</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center justify-center font-bold text-xs">
            MEP
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/90 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 block">Primer Ciclo</span>
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400">{resumen.primerCiclo}</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">Soc. (6) + Mat. (6)</span>
          </div>
          <span className="px-2 py-1 text-xs font-bold rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            1° a 6°
          </span>
        </div>

        <div className="bg-white dark:bg-slate-800/90 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 block">Segundo Ciclo</span>
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{resumen.segundoCiclo}</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">Esp. (6) + Cie. (6)</span>
          </div>
          <span className="px-2 py-1 text-xs font-bold rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            7° a 12°
          </span>
        </div>

        <div className="bg-white dark:bg-slate-800/90 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 block">Asignaturas</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">4</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">Áreas curriculares</span>
          </div>
          <span className="px-2 py-1 text-xs font-bold rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            100% Activas
          </span>
        </div>
      </div>

      {/* Tabla responsiva */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-700 dark:text-slate-200">
          <thead className="bg-slate-100/90 dark:bg-slate-800 text-xs uppercase font-bold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 tracking-wider">
            <tr>
              <th scope="col" className="px-6 py-3.5">
                Ciclo
              </th>
              <th scope="col" className="px-6 py-3.5">
                Asignatura
              </th>
              <th scope="col" className="px-6 py-3.5">
                Nivel / Grado
              </th>
              <th scope="col" className="px-6 py-3.5">
                Código Oficial
              </th>
              <th scope="col" className="px-6 py-3.5 text-center">
                Disponibilidad
              </th>
              <th scope="col" className="px-6 py-3.5 text-center">
                Descargas
              </th>
              <th scope="col" className="px-6 py-3.5 text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {planesMostrados.map((doc, idx) => (
              <tr
                key={doc.id}
                className={`transition-colors hover:bg-blue-50/50 dark:hover:bg-slate-800/80 ${
                  idx % 2 === 0
                    ? 'bg-white dark:bg-slate-900'
                    : 'bg-slate-50/40 dark:bg-slate-850/50'
                }`}
              >
                {/* Ciclo */}
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                  <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${
                    doc.ciclo === 'Primer ciclo'
                      ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                      : 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                  }`}>
                    {doc.ciclo}
                  </span>
                </td>

                {/* Asignatura con icono */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      <AsignaturaIcon asignatura={doc.asignatura} className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {doc.asignatura}
                    </span>
                  </div>
                </td>

                {/* Nivel */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-bold text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded text-xs">
                    {doc.nivel}
                  </span>
                </td>

                {/* Código oficial */}
                <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  {doc.codigo}
                </td>

                {/* Disponibilidad */}
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    1 Plan Oficial (PDF)
                  </span>
                </td>

                {/* Descargas */}
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {doc.descargas}
                  </span>
                </td>

                {/* Acciones */}
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onPreview(doc)}
                      className="p-1.5 rounded-lg text-blue-700 dark:text-blue-400 hover:text-blue-900 hover:bg-blue-100 dark:hover:bg-slate-800 transition-colors"
                      title={`Previsualizar plan de ${doc.asignatura} ${doc.nivel}`}
                    >
                      <IconEye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDownload(doc)}
                      className="p-1.5 rounded-lg text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 hover:bg-emerald-100 dark:hover:bg-slate-800 transition-colors"
                      title={`Descargar plan de ${doc.asignatura} ${doc.nivel}`}
                    >
                      <IconDownload className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pie informativo de la tabla */}
      <div className="bg-slate-50 dark:bg-slate-800/40 px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
        <div>
          Mostrando <strong>{planesMostrados.length}</strong> niveles educativos registrados.
        </div>
        <div>
          Todos los planes han sido verificados por el Consejo Superior de Educación y la DDC.
        </div>
      </div>
    </section>
  );
}
