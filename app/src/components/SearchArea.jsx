import React, { useState, useMemo } from 'react';
import { AsignaturaIcon, IconSearch, IconFilter, IconRefresh, IconEye, IconDownload } from './Icons';

export function SearchArea({ planes, onPreview, onDownload }) {
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroCiclo, setFiltroCiclo] = useState('');
  const [filtroAsignatura, setFiltroAsignatura] = useState('');
  const [filtroNivel, setFiltroNivel] = useState('');

  // Opciones dinámicas de asignaturas según ciclo seleccionado
  const asignaturasDisponibles = useMemo(() => {
    if (filtroCiclo === 'Primer ciclo') {
      return ['Estudios Sociales', 'Matemáticas'];
    }
    if (filtroCiclo === 'Segundo ciclo') {
      return ['Español', 'Ciencias'];
    }
    return ['Estudios Sociales', 'Matemáticas', 'Español', 'Ciencias'];
  }, [filtroCiclo]);

  // Opciones dinámicas de niveles según ciclo seleccionado
  const nivelesDisponibles = useMemo(() => {
    if (filtroCiclo === 'Primer ciclo') {
      return ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto'];
    }
    if (filtroCiclo === 'Segundo ciclo') {
      return ['Sétimo', 'Octavo', 'Noveno', 'Décimo', 'Undécimo', 'Duodécimo'];
    }
    return [
      'Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto',
      'Sétimo', 'Octavo', 'Noveno', 'Décimo', 'Undécimo', 'Duodécimo'
    ];
  }, [filtroCiclo]);

  // Manejar cambio de ciclo para sincronizar asignatura o nivel si ya no son válidos
  const handleCicloChange = (e) => {
    const nuevoCiclo = e.target.value;
    setFiltroCiclo(nuevoCiclo);

    if (nuevoCiclo === 'Primer ciclo' && (filtroAsignatura === 'Español' || filtroAsignatura === 'Ciencias')) {
      setFiltroAsignatura('');
    } else if (nuevoCiclo === 'Segundo ciclo' && (filtroAsignatura === 'Estudios Sociales' || filtroAsignatura === 'Matemáticas')) {
      setFiltroAsignatura('');
    }

    const nivelesPrimerCiclo = ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto'];
    const nivelesSegundoCiclo = ['Sétimo', 'Octavo', 'Noveno', 'Décimo', 'Undécimo', 'Duodécimo'];

    if (nuevoCiclo === 'Primer ciclo' && nivelesSegundoCiclo.includes(filtroNivel)) {
      setFiltroNivel('');
    } else if (nuevoCiclo === 'Segundo ciclo' && nivelesPrimerCiclo.includes(filtroNivel)) {
      setFiltroNivel('');
    }
  };

  const handleLimpiar = () => {
    setFiltroNombre('');
    setFiltroCiclo('');
    setFiltroAsignatura('');
    setFiltroNivel('');
  };

  // Filtrado reactivo de los planes
  const planesFiltrados = useMemo(() => {
    return planes.filter((doc) => {
      if (filtroNombre.trim()) {
        const busqueda = filtroNombre.toLowerCase();
        const coincideNombre = doc.nombre.toLowerCase().includes(busqueda);
        const coincideCodigo = doc.codigo.toLowerCase().includes(busqueda);
        if (!coincideNombre && !coincideCodigo) return false;
      }
      if (filtroCiclo && doc.ciclo !== filtroCiclo) {
        return false;
      }
      if (filtroAsignatura && doc.asignatura !== filtroAsignatura) {
        return false;
      }
      if (filtroNivel && doc.nivel !== filtroNivel) {
        return false;
      }
      return true;
    });
  }, [planes, filtroNombre, filtroCiclo, filtroAsignatura, filtroNivel]);

  // Colores distintivos según asignatura
  const getSubjectColorClasses = (asignatura) => {
    switch (asignatura) {
      case 'Estudios Sociales':
        return {
          badge: 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800',
          iconBg: 'bg-amber-500 text-white'
        };
      case 'Matemáticas':
        return {
          badge: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
          iconBg: 'bg-emerald-600 text-white'
        };
      case 'Español':
        return {
          badge: 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800',
          iconBg: 'bg-indigo-600 text-white'
        };
      case 'Ciencias':
        return {
          badge: 'bg-cyan-100 dark:bg-cyan-950/70 text-cyan-900 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800',
          iconBg: 'bg-cyan-600 text-white'
        };
      default:
        return {
          badge: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700',
          iconBg: 'bg-slate-600 text-white'
        };
    }
  };

  const hayFiltrosActivos = Boolean(filtroNombre || filtroCiclo || filtroAsignatura || filtroNivel);

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-10 transition-colors duration-200">
      {/* Encabezado del área de búsqueda */}
      <div className="bg-gradient-to-r from-[#0f2942] to-[#1e3a5f] dark:from-[#0a1b2b] dark:to-[#13283f] p-6 text-white border-b-2 border-amber-500">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-white/10 text-amber-400">
            <IconSearch className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            1. Búsqueda y Consulta de Planes de Estudio
          </h2>
        </div>
        <p className="text-slate-300 text-sm max-w-3xl">
          Filtre el catálogo oficial por nombre de documento, ciclo formativo, asignatura pedagógica y nivel educativo para localizar rápidamente el plan que necesita.
        </p>
      </div>

      {/* Formulario de filtros */}
      <div className="p-6 bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Filtro: Nombre */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Nombre o Palabra Clave
            </label>
            <div className="relative">
              <input
                type="text"
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
                placeholder="Ej. Matemáticas, Primero..."
                className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition shadow-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                <IconSearch className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Filtro: Ciclo */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Ciclo Educativo
            </label>
            <select
              value={filtroCiclo}
              onChange={handleCicloChange}
              className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition shadow-sm"
            >
              <option value="">Todos los ciclos</option>
              <option value="Primer ciclo">Primer ciclo</option>
              <option value="Segundo ciclo">Segundo ciclo</option>
            </select>
          </div>

          {/* Filtro: Asignatura */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Asignatura
            </label>
            <select
              value={filtroAsignatura}
              onChange={(e) => setFiltroAsignatura(e.target.value)}
              className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition shadow-sm"
            >
              <option value="">Todas las asignaturas</option>
              {asignaturasDisponibles.map((asig) => (
                <option key={asig} value={asig}>
                  {asig}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro: Nivel */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Nivel / Grado
            </label>
            <select
              value={filtroNivel}
              onChange={(e) => setFiltroNivel(e.target.value)}
              className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition shadow-sm"
            >
              <option value="">Todos los niveles</option>
              {nivelesDisponibles.map((nv) => (
                <option key={nv} value={nv}>
                  {nv}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Barra de estado de filtros y botones de acción */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <IconFilter className="w-4 h-4 text-slate-400" />
            <span>
              Mostrando <strong className="text-blue-900 dark:text-blue-400">{planesFiltrados.length}</strong> de{' '}
              <strong>{planes.length}</strong> planes curriculares
            </span>
            {hayFiltrosActivos && (
              <span className="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[11px] font-semibold px-2 py-0.5 rounded-full ml-1 border border-blue-200 dark:border-blue-800">
                Filtros aplicados
              </span>
            )}
          </div>

          {hayFiltrosActivos && (
            <button
              onClick={handleLimpiar}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors shadow-sm"
            >
              <IconRefresh className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>
      </div>

      {/* Cuadrícula de resultados de la búsqueda */}
      <div className="p-6">
        {planesFiltrados.length === 0 ? (
          <div className="text-center py-12 px-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
              <IconSearch className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-200 mb-1">
              No se encontraron planes que coincidan con la búsqueda
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
              Pruebe cambiando los términos del filtro o presione limpiar para ver todo el catálogo.
            </p>
            <button
              onClick={handleLimpiar}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition"
            >
              Restablecer todos los filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {planesFiltrados.map((doc) => {
              const colors = getSubjectColorClasses(doc.asignatura);
              return (
                <div
                  key={doc.id}
                  className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:border-blue-400 dark:hover:border-blue-500"
                >
                  <div className="p-5">
                    {/* Fila superior: Asignatura e Icono */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-lg ${colors.iconBg} shadow-sm`}>
                          <AsignaturaIcon asignatura={doc.asignatura} className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
                            {doc.asignatura}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                            {doc.codigo}
                          </span>
                        </div>
                      </div>

                      {/* Descargas totales */}
                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600">
                        <IconDownload className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <strong>{doc.descargas}</strong>
                      </span>
                    </div>

                    {/* Nombre del documento */}
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors mb-2">
                      {doc.nombre}
                    </h3>

                    {/* Badges de metadatos */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs mt-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 font-medium">
                        {doc.ciclo}
                      </span>
                      <span className={`px-2 py-0.5 rounded border font-semibold ${colors.badge}`}>
                        Nivel {doc.nivel}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 font-bold text-[11px]">
                        PDF
                      </span>
                    </div>
                  </div>

                  {/* Acciones de la tarjeta */}
                  <div className="bg-slate-50 dark:bg-slate-800/40 px-5 py-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onPreview(doc)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600 rounded-lg transition-colors shadow-sm"
                    >
                      <IconEye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Previsualizar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDownload(doc)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors shadow-sm"
                    >
                      <IconDownload className="w-4 h-4" />
                      <span>Descargar</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
