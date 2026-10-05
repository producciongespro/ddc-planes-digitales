import React, { useState, useEffect, useMemo } from 'react';
import { AsignaturaIcon, IconTable, IconDownload, IconSearch, IconFilter, IconRefresh } from './Icons';

export function GeneralTable({
  planes,
  onDownload,
  filtros,
  onFiltrosChange,
  onResetFiltros
}) {
  const [paginaActual, setPaginaActual] = useState(1);
  const [elementosPorPagina, setElementosPorPagina] = useState(20);

  // 1. Lista de Ofertas Educativas ordenadas según la estructura institucional de la DDC
  const ofertasDisponibles = useMemo(() => {
    const orden = [
      'Educación Preescolar',
      'I y II Ciclos (Primaria)',
      'III Ciclo y Diversificada (Secundaria)',
      'Educación de Personas Jóvenes y Adultas (EPJA)',
      'Educación Especial',
      'Educación Intercultural',
      'Educación Unidocente'
    ];
    const encontradas = new Set(planes.map((p) => p.ofertaNombre));
    return orden.filter((o) => encontradas.has(o));
  }, [planes]);

  // 2. Asignaturas o Áreas dinámicas según la oferta seleccionada
  const asignaturasDisponibles = useMemo(() => {
    let subset = planes;
    if (filtros.oferta) {
      subset = subset.filter((p) => p.ofertaNombre === filtros.oferta);
    }
    const setAsig = new Set(subset.map((p) => p.asignatura));
    return Array.from(setAsig).sort((a, b) => a.localeCompare(b, 'es'));
  }, [planes, filtros.oferta]);

  // 3. Grados, Años o Subáreas dinámicas según oferta y asignatura seleccionadas
  const gradosDisponibles = useMemo(() => {
    let subset = planes;
    if (filtros.oferta) {
      subset = subset.filter((p) => p.ofertaNombre === filtros.oferta);
    }
    if (filtros.asignatura) {
      subset = subset.filter((p) => p.asignatura === filtros.asignatura);
    }
    const setGrados = new Set(subset.map((p) => p.grado));
    return Array.from(setGrados).sort((a, b) => a.localeCompare(b, 'es'));
  }, [planes, filtros.oferta, filtros.asignatura]);

  // 4. Filtrado reactivo en tiempo real
  const planesFiltrados = useMemo(() => {
    const textoNormalizado = filtros.texto.trim().toLowerCase();

    return planes.filter((doc) => {
      if (filtros.oferta && doc.ofertaNombre !== filtros.oferta) return false;
      if (filtros.asignatura && doc.asignatura !== filtros.asignatura) return false;
      if (filtros.grado && doc.grado !== filtros.grado) return false;
      if (textoNormalizado) {
        const busquedaFuente = `${doc.id} ${doc.ofertaNombre} ${doc.asignatura} ${doc.grado} ${doc.archivoPrincipal || ''}`.toLowerCase();
        if (!busquedaFuente.includes(textoNormalizado)) return false;
      }
      return true;
    });
  }, [planes, filtros]);

  // Reiniciar a página 1 cuando cambia el resultado de los filtros o el tamaño de página
  useEffect(() => {
    setPaginaActual(1);
  }, [filtros.texto, filtros.oferta, filtros.asignatura, filtros.grado, elementosPorPagina]);

  // Paginación reactiva
  const limite = elementosPorPagina === 'todos' ? planesFiltrados.length || 1 : Number(elementosPorPagina);
  const totalPaginas = Math.ceil(planesFiltrados.length / limite) || 1;

  // Cálculo seguro y matemático de números de página visibles (sin duplicados)
  const paginasVisibles = useMemo(() => {
    if (totalPaginas <= 7) {
      return Array.from({ length: totalPaginas }, (_, i) => i + 1);
    }
    if (paginaActual <= 4) {
      return [1, 2, 3, 4, 5, 6, 7];
    }
    if (paginaActual >= totalPaginas - 3) {
      return [
        totalPaginas - 6,
        totalPaginas - 5,
        totalPaginas - 4,
        totalPaginas - 3,
        totalPaginas - 2,
        totalPaginas - 1,
        totalPaginas
      ];
    }
    return [
      paginaActual - 3,
      paginaActual - 2,
      paginaActual - 1,
      paginaActual,
      paginaActual + 1,
      paginaActual + 2,
      paginaActual + 3
    ];
  }, [paginaActual, totalPaginas]);

  const planesPaginados = useMemo(() => {
    if (elementosPorPagina === 'todos') return planesFiltrados;
    const inicio = (paginaActual - 1) * limite;
    return planesFiltrados.slice(inicio, inicio + limite);
  }, [planesFiltrados, paginaActual, limite, elementosPorPagina]);

  const hayFiltrosActivos = Boolean(
    filtros.texto || filtros.oferta || filtros.asignatura || filtros.grado
  );

  const handleOfertaChange = (e) => {
    onFiltrosChange({
      ...filtros,
      oferta: e.target.value,
      asignatura: '',
      grado: ''
    });
  };

  const handleAsignaturaChange = (e) => {
    onFiltrosChange({
      ...filtros,
      asignatura: e.target.value,
      grado: ''
    });
  };

  const handleGradoChange = (e) => {
    onFiltrosChange({
      ...filtros,
      grado: e.target.value
    });
  };

  const handleTextoChange = (e) => {
    onFiltrosChange({
      ...filtros,
      texto: e.target.value
    });
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
      {/* 1. ENCABEZADO INSTITUCIONAL MAESTRO */}
      <div className="bg-gradient-to-r from-[#0f2942] to-[#1e293b] dark:from-[#1a3863] dark:via-[#1e447b] dark:to-[#235091] p-5 sm:p-6 text-white border-b-2 border-amber-500 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="p-2 rounded-lg bg-blue-600/60 text-white shadow">
              <IconTable className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              1. Catálogo Oficial de Planeamientos 2027
            </h2>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
            Inventario normado de la Dirección de Desarrollo Curricular (DDC). Filtre dinámicamente por oferta, asignatura o grado y descargue los paquetes ZIP oficiales.
          </p>
        </div>

        {/* Control de elementos por página en el encabezado */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-slate-800/80 dark:bg-slate-950/80 border border-slate-700 px-3 py-1.5 rounded-lg text-xs">
          <span className="text-slate-300 font-medium">Mostrar:</span>
          <select
            value={elementosPorPagina}
            onChange={(e) => {
              setElementosPorPagina(e.target.value);
              setPaginaActual(1);
            }}
            className="bg-slate-900 text-white font-semibold rounded px-2 py-1 border border-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
          >
            <option value="15">15 por pág.</option>
            <option value="20">20 por pág.</option>
            <option value="50">50 por pág.</option>
            <option value="todos">Todos ({planesFiltrados.length})</option>
          </select>
        </div>
      </div>

      {/* 2. ÁREA DE FILTROS EN CASCADA INTEGRADA */}
      <div className="p-5 sm:p-6 bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Filtro 1: Buscador de texto */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Palabra clave o Materia
            </label>
            <div className="relative">
              <input
                type="text"
                value={filtros.texto}
                onChange={handleTextoChange}
                placeholder="Ej. Matemática, Salitre, Interactivo..."
                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition shadow-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <IconSearch className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Filtro 2: Oferta Educativa (7 ramas) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Oferta Educativa
            </label>
            <select
              value={filtros.oferta}
              onChange={handleOfertaChange}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition shadow-sm"
            >
              <option value="">Todas las ofertas ({ofertasDisponibles.length})</option>
              {ofertasDisponibles.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          {/* Filtro 3: Asignatura / Área */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Asignatura / Área
            </label>
            <select
              value={filtros.asignatura}
              onChange={handleAsignaturaChange}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition shadow-sm"
            >
              <option value="">Todas las asignaturas ({asignaturasDisponibles.length})</option>
              {asignaturasDisponibles.map((asig) => (
                <option key={asig} value={asig}>{asig}</option>
              ))}
            </select>
          </div>

          {/* Filtro 4: Grado / Subárea */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Grado / Subárea
            </label>
            <select
              value={filtros.grado}
              onChange={handleGradoChange}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition shadow-sm"
            >
              <option value="">Todos los grados ({gradosDisponibles.length})</option>
              {gradosDisponibles.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Barra inferior de estado, métricas y botón de limpieza */}
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
            <IconFilter className="w-4 h-4 text-slate-400" />
            <span>
              Mostrando <strong className="text-blue-900 dark:text-blue-400 font-bold">{planesFiltrados.length}</strong> de{' '}
              <strong>{planes.length}</strong> planeamientos registrados (Vigencia 2027)
            </span>
            {hayFiltrosActivos && (
              <span className="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                Filtros activos
              </span>
            )}
          </div>

          <div>
            {hayFiltrosActivos ? (
              <button
                type="button"
                onClick={onResetFiltros}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 rounded-lg transition-all shadow-xs cursor-pointer"
                title="Limpiar todos los filtros y ver los 197 planeamientos"
              >
                <IconRefresh className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span>Restablecer filtros</span>
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-lg cursor-not-allowed opacity-60"
              >
                <IconRefresh className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                <span>Restablecer filtros</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. TABLA GENERAL SIN SCROLL HORIZONTAL */}
      {planesFiltrados.length === 0 ? (
        <div className="p-12 text-center bg-slate-50/50 dark:bg-slate-950/30">
          <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto mb-3">
            <IconSearch className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
            No hay documentos que coincidan con los filtros seleccionados
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-3">
            Por favor ajuste la oferta educativa, asignatura o grado en los filtros superiores para explorar el repositorio.
          </p>
          <button
            type="button"
            onClick={onResetFiltros}
            className="px-3.5 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 transition cursor-pointer"
          >
            Ver los 197 planeamientos oficiales
          </button>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-collapse table-auto">
            <thead className="bg-slate-100/90 dark:bg-slate-800/80 text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th scope="col" className="py-2.5 px-3 w-24">Código</th>
                <th scope="col" className="py-2.5 px-3">Oferta Educativa</th>
                <th scope="col" className="py-2.5 px-3">Asignatura / Área</th>
                <th scope="col" className="py-2.5 px-3">Grado / Subárea</th>
                <th scope="col" className="py-2.5 px-3">Archivos</th>
                <th scope="col" className="py-2.5 px-2 text-center w-20">Descargas</th>
                <th scope="col" className="py-2.5 px-2 text-center w-16">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
              {planesPaginados.map((doc, idx) => {
                const badgeClass = getBadgeColor(doc.ofertaBadgeColor);

                return (
                  <tr
                    key={doc.id}
                    className={`hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors ${
                      idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/40 dark:bg-slate-900/40'
                    }`}
                  >
                    {/* Código único */}
                    <td className="py-2.5 px-3 font-mono text-[11px] font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {doc.id}
                    </td>

                    {/* Oferta Educativa */}
                    <td className="py-2.5 px-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold border leading-tight ${badgeClass}`}>
                        {doc.ofertaNombre}
                      </span>
                    </td>

                    {/* Asignatura con icono */}
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="p-1 rounded bg-blue-50 dark:bg-slate-800 border border-blue-200/60 dark:border-slate-700 text-blue-800 dark:text-amber-400 flex-shrink-0">
                          <AsignaturaIcon asignatura={doc.asignatura} className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white truncate">
                          {doc.asignatura}
                        </span>
                      </div>
                    </td>

                    {/* Grado / Subárea */}
                    <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 font-medium">
                      {doc.grado}
                    </td>

                    {/* Archivos Disponibles (soporte multi-archivo) */}
                    <td className="py-2.5 px-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {doc.archivos && doc.archivos.length > 0 ? (
                          doc.archivos.map((arch, aIdx) => (
                            <span
                              key={aIdx}
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                              title={`${arch.nombre} (${arch.tamanoLegible})`}
                            >
                              <span className="font-bold">{arch.tipo}</span>
                              <span className="text-slate-500 dark:text-slate-400">({arch.tamanoLegible})</span>
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400 italic">Sin archivos</span>
                        )}
                      </div>
                    </td>

                    {/* Contador de Descargas */}
                    <td className="py-2.5 px-2 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-amber-400 border border-blue-200 dark:border-slate-700">
                        <IconDownload className="w-3 h-3 text-blue-600 dark:text-amber-400" />
                        {doc.descargas}
                      </span>
                    </td>

                    {/* Botón de Acción: Icono azul fuerte compacto */}
                    <td className="py-2.5 px-2 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onDownload(doc)}
                        className="p-2 inline-flex items-center justify-center rounded-lg text-white bg-blue-700 hover:bg-blue-600 active:bg-blue-800 shadow-xs hover:shadow transition-all cursor-pointer"
                        title={`Descargar paquete ZIP oficial: ${doc.archivoPrincipal || doc.asignatura}`}
                        aria-label={`Descargar paquete ZIP oficial: ${doc.archivoPrincipal || doc.asignatura}`}
                      >
                        <IconDownload className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. PAGINACIÓN */}
      {elementosPorPagina !== 'todos' && totalPaginas > 1 && (
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
          <div>
            Página <strong className="text-slate-900 dark:text-white">{paginaActual}</strong> de{' '}
            <strong className="text-slate-900 dark:text-white">{totalPaginas}</strong> ({planesFiltrados.length} planeamientos)
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={paginaActual === 1}
              onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
              className="px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Anterior
            </button>

            <div className="flex items-center gap-1">
              {paginasVisibles.map((pNum) => (
                <button
                  key={`pag-btn-${pNum}`}
                  type="button"
                  onClick={() => setPaginaActual(pNum)}
                  className={`w-7 h-7 rounded-md font-semibold text-xs transition cursor-pointer ${
                    paginaActual === pNum
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {pNum}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={paginaActual === totalPaginas}
              onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
              className="px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
