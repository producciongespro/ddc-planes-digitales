import React, { useState, useMemo } from 'react';
import { AsignaturaIcon, IconTable, IconEye, IconDownload } from './Icons';

export function GeneralTable({ planes, onPreview, onDownload }) {
  const [filtroAgrupacion, setFiltroAgrupacion] = useState('');
  const [filtroTipoTabla, setFiltroTipoTabla] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [elementosPorPagina, setElementosPorPagina] = useState(20);

  // Estadísticas consolidadas
  const metricas = useMemo(() => {
    const total = planes.length;
    const primaria = planes.filter((p) => p.nivelEducativo === 'Primaria').length;
    const secundaria = planes.filter((p) => p.nivelEducativo === 'Secundaria').length;
    const iCiclo = planes.filter((p) => p.ciclo === 'I Ciclo').length;
    const iiCiclo = planes.filter((p) => p.ciclo === 'II Ciclo').length;
    const iiiCiclo = planes.filter((p) => p.ciclo === 'III Ciclo').length;
    const divAca = planes.filter((p) => p.ciclo === 'Educación Diversificada' && p.modalidad === 'Académica').length;
    const divTec = planes.filter((p) => p.ciclo === 'Educación Diversificada' && p.modalidad === 'Técnica').length;
    const basicas = planes.filter((p) => p.tipo === 'Básica').length;
    const complementarias = planes.filter((p) => p.tipo === 'Complementaria').length;

    return { total, primaria, secundaria, iCiclo, iiCiclo, iiiCiclo, divAca, divTec, basicas, complementarias };
  }, [planes]);

  // Filtrado de la tabla según selector rápido
  const planesFiltrados = useMemo(() => {
    return planes.filter((p) => {
      if (filtroAgrupacion) {
        if (filtroAgrupacion === 'Primaria' && p.nivelEducativo !== 'Primaria') return false;
        if (filtroAgrupacion === 'Secundaria' && p.nivelEducativo !== 'Secundaria') return false;
        if (filtroAgrupacion === 'I Ciclo' && p.ciclo !== 'I Ciclo') return false;
        if (filtroAgrupacion === 'II Ciclo' && p.ciclo !== 'II Ciclo') return false;
        if (filtroAgrupacion === 'III Ciclo' && p.ciclo !== 'III Ciclo') return false;
        if (filtroAgrupacion === 'Div-Academica' && !(p.ciclo === 'Educación Diversificada' && p.modalidad === 'Académica')) return false;
        if (filtroAgrupacion === 'Div-Tecnica' && !(p.ciclo === 'Educación Diversificada' && p.modalidad === 'Técnica')) return false;
      }
      if (filtroTipoTabla && p.tipo !== filtroTipoTabla) {
        return false;
      }
      return true;
    });
  }, [planes, filtroAgrupacion, filtroTipoTabla]);

  // Paginación reactiva
  const totalPaginas = Math.ceil(planesFiltrados.length / elementosPorPagina) || 1;
  const planesPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * elementosPorPagina;
    return planesFiltrados.slice(inicio, inicio + elementosPorPagina);
  }, [planesFiltrados, paginaActual, elementosPorPagina]);

  const handleCambioAgrupacion = (e) => {
    setFiltroAgrupacion(e.target.value);
    setPaginaActual(1);
  };

  const handleCambioTipo = (e) => {
    setFiltroTipoTabla(e.target.value);
    setPaginaActual(1);
  };

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-10 transition-colors duration-200">
      {/* Encabezado de la tabla */}
      <div className="bg-gradient-to-r from-[#0f2942] to-[#1e293b] dark:from-[#091522] dark:to-[#111c2a] p-6 text-white border-b-2 border-amber-500 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="p-2 rounded-lg bg-blue-600/60 text-white shadow">
              <IconTable className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              3. Tabla General de Documentos Oficiales a Disposición
            </h2>
          </div>
          <p className="text-slate-300 text-sm max-w-2xl">
            Inventario consolidado y normado de planes de estudio del MEP. Organizado por nivel, ciclo formativo, modalidad y tipo curricular.
          </p>
        </div>

        {/* Filtros rápidos de cabecera */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <select
            value={filtroAgrupacion}
            onChange={handleCambioAgrupacion}
            className="px-3 py-1.5 bg-slate-800 dark:bg-slate-950 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
          >
            <option value="">Todo el Catálogo ({metricas.total})</option>
            <option value="Primaria">Toda Primaria ({metricas.primaria})</option>
            <option value="I Ciclo">I Ciclo (1° a 3°) ({metricas.iCiclo})</option>
            <option value="II Ciclo">II Ciclo (4° a 6°) ({metricas.iiCiclo})</option>
            <option value="Secundaria">Toda Secundaria ({metricas.secundaria})</option>
            <option value="III Ciclo">III Ciclo (7° a 9°) ({metricas.iiiCiclo})</option>
            <option value="Div-Academica">Diversificada Académica (10°-11°) ({metricas.divAca})</option>
            <option value="Div-Tecnica">Diversificada Técnica CTP (10°-12°) ({metricas.divTec})</option>
          </select>

          <select
            value={filtroTipoTabla}
            onChange={handleCambioTipo}
            className="px-3 py-1.5 bg-slate-800 dark:bg-slate-950 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
          >
            <option value="">Tipo (Todos)</option>
            <option value="Básica">Básicas ({metricas.basicas})</option>
            <option value="Complementaria">Complementarias ({metricas.complementarias})</option>
          </select>
        </div>
      </div>

      {/* Tarjetas resumen métrico */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 p-5 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800">
        <div className="bg-white dark:bg-slate-800/90 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 block tracking-wide">
            Total Disponibles
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{metricas.total}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Planes PDF</span>
          </div>
          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium block mt-1">
            100% Verificados MEP
          </span>
        </div>

        <div className="bg-white dark:bg-slate-800/90 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 block tracking-wide">
            Primaria (I y II Ciclo)
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{metricas.primaria}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">1.° a 6.°</span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">
            27 en I Ciclo | 27 en II Ciclo
          </span>
        </div>

        <div className="bg-white dark:bg-slate-800/90 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 block tracking-wide">
            Secundaria (III y Diversificada)
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{metricas.secundaria}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">7.° a 12.°</span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">
            33 en III Ciclo | 57 en Diversificada
          </span>
        </div>

        <div className="bg-white dark:bg-slate-800/90 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 block tracking-wide">
            Por Categoría
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-xl font-bold text-slate-900 dark:text-white">{metricas.basicas}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Básicas /</span>
            <span className="text-xl font-bold text-purple-600 dark:text-purple-400">{metricas.complementarias}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Compl.</span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">
            15 Asignaturas Oficiales
          </span>
        </div>
      </div>

      {/* Tabla responsiva */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-700 dark:text-slate-200">
          <thead className="bg-slate-100/90 dark:bg-slate-800 text-xs uppercase font-bold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 tracking-wider">
            <tr>
              <th scope="col" className="px-5 py-3.5">
                Nivel & Ciclo
              </th>
              <th scope="col" className="px-5 py-3.5">
                Tipo
              </th>
              <th scope="col" className="px-5 py-3.5">
                Asignatura
              </th>
              <th scope="col" className="px-5 py-3.5">
                Grado / Nivel
              </th>
              <th scope="col" className="px-5 py-3.5">
                Código Oficial
              </th>
              <th scope="col" className="px-5 py-3.5 text-center">
                Disponibilidad
              </th>
              <th scope="col" className="px-5 py-3.5 text-center">
                Descargas
              </th>
              <th scope="col" className="px-5 py-3.5 text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {planesPaginados.map((doc, idx) => {
              const isPrimaria = doc.nivelEducativo === 'Primaria';

              return (
                <tr
                  key={doc.id}
                  className={`transition-colors hover:bg-blue-50/60 dark:hover:bg-slate-800/80 ${
                    idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/40 dark:bg-slate-850/50'
                  }`}
                >
                  {/* Nivel & Ciclo */}
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          isPrimaria
                            ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                            : 'bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                        }`}>
                          {doc.nivelEducativo}
                        </span>
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          {doc.ciclo}
                        </span>
                      </div>
                      {doc.modalidad && doc.modalidad !== 'Regular' && (
                        <span className={`inline-block w-fit px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                          doc.modalidad === 'Técnica'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                            : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                        }`}>
                          Modalidad {doc.modalidad}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Tipo (Básica / Complementaria) */}
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      doc.tipo === 'Básica'
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
                        : 'bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                    }`}>
                      {doc.tipo}
                    </span>
                  </td>

                  {/* Asignatura con icono */}
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        <AsignaturaIcon asignatura={doc.asignatura} className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-slate-800 dark:text-slate-100">
                        {doc.asignatura}
                      </span>
                    </div>
                  </td>

                  {/* Grado */}
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="font-bold text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded text-xs">
                      {doc.grado} Año
                    </span>
                  </td>

                  {/* Código oficial */}
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {doc.codigo}
                  </td>

                  {/* Disponibilidad */}
                  <td className="px-5 py-3.5 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      PDF Oficial
                    </span>
                  </td>

                  {/* Descargas */}
                  <td className="px-5 py-3.5 text-center whitespace-nowrap">
                    <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                      {doc.descargas}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td className="px-5 py-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onPreview(doc)}
                        className="p-1.5 rounded-lg text-blue-700 dark:text-blue-400 hover:text-blue-900 hover:bg-blue-100 dark:hover:bg-slate-800 transition-colors"
                        title={`Previsualizar plan de ${doc.asignatura} ${doc.grado}`}
                      >
                        <IconEye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDownload(doc)}
                        className="p-1.5 rounded-lg text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 hover:bg-emerald-100 dark:hover:bg-slate-800 transition-colors"
                        title={`Descargar plan de ${doc.asignatura} ${doc.grado}`}
                      >
                        <IconDownload className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Paginación y pie informativo */}
      <div className="bg-slate-50 dark:bg-slate-800/40 px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
        <div>
          Mostrando{' '}
          <strong>
            {Math.min((paginaActual - 1) * elementosPorPagina + 1, planesFiltrados.length)} -{' '}
            {Math.min(paginaActual * elementosPorPagina, planesFiltrados.length)}
          </strong>{' '}
          de <strong>{planesFiltrados.length}</strong> planes registrados (Página {paginaActual} de {totalPaginas}).
        </div>

        {/* Controles de paginación */}
        <div className="flex items-center gap-2">
          <select
            value={elementosPorPagina}
            onChange={(e) => {
              setElementosPorPagina(Number(e.target.value));
              setPaginaActual(1);
            }}
            className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-xs text-slate-700 dark:text-slate-200"
          >
            <option value={15}>15 por página</option>
            <option value={20}>20 por página</option>
            <option value={50}>50 por página</option>
            <option value={144}>Ver todos (144)</option>
          </select>

          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              disabled={paginaActual === 1}
              onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
              className="px-3 py-1 text-xs font-semibold rounded-l-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <button
              type="button"
              disabled={paginaActual >= totalPaginas}
              onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
              className="px-3 py-1 text-xs font-semibold rounded-r-lg border-t border-b border-r border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
