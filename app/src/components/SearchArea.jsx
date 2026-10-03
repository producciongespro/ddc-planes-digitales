import React, { useState, useMemo, useEffect } from 'react';
import { AsignaturaIcon, IconSearch, IconFilter, IconRefresh, IconEye, IconDownload } from './Icons';

export function SearchArea({ planes, onPreview, onDownload, resetKey }) {
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroNivelEducativo, setFiltroNivelEducativo] = useState('');
  const [filtroCiclo, setFiltroCiclo] = useState('');
  const [filtroModalidad, setFiltroModalidad] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroAsignatura, setFiltroAsignatura] = useState('');
  const [filtroGrado, setFiltroGrado] = useState('');

  // Escuchar evento de reinicio global desde el Header
  useEffect(() => {
    if (resetKey) {
      setFiltroTexto('');
      setFiltroNivelEducativo('');
      setFiltroCiclo('');
      setFiltroModalidad('');
      setFiltroTipo('');
      setFiltroAsignatura('');
      setFiltroGrado('');
    }
  }, [resetKey]);

  // Ciclos disponibles según Nivel Educativo
  const ciclosDisponibles = useMemo(() => {
    if (filtroNivelEducativo === 'Primaria') {
      return ['I Ciclo', 'II Ciclo'];
    }
    if (filtroNivelEducativo === 'Secundaria') {
      return ['III Ciclo', 'Educación Diversificada'];
    }
    return ['I Ciclo', 'II Ciclo', 'III Ciclo', 'Educación Diversificada'];
  }, [filtroNivelEducativo]);

  // Si el ciclo seleccionado es Educación Diversificada, la modalidad es relevante
  const mostrarModalidad = filtroCiclo === 'Educación Diversificada' || (!filtroCiclo && filtroNivelEducativo === 'Secundaria');

  // Asignaturas disponibles dinámicamente según filtros previos
  const asignaturasDisponibles = useMemo(() => {
    const subset = planes.filter((doc) => {
      if (filtroNivelEducativo && doc.nivelEducativo !== filtroNivelEducativo) return false;
      if (filtroCiclo && doc.ciclo !== filtroCiclo) return false;
      if (filtroModalidad && doc.modalidad !== filtroModalidad && doc.modalidad !== 'Regular') return false;
      if (filtroTipo && doc.tipo !== filtroTipo) return false;
      return true;
    });
    return Array.from(new Set(subset.map((d) => d.asignatura))).sort((a, b) => a.localeCompare(b, 'es'));
  }, [planes, filtroNivelEducativo, filtroCiclo, filtroModalidad, filtroTipo]);

  // Grados disponibles dinámicamente según filtros previos
  const gradosDisponibles = useMemo(() => {
    const subset = planes.filter((doc) => {
      if (filtroNivelEducativo && doc.nivelEducativo !== filtroNivelEducativo) return false;
      if (filtroCiclo && doc.ciclo !== filtroCiclo) return false;
      if (filtroModalidad && doc.modalidad !== filtroModalidad && doc.modalidad !== 'Regular') return false;
      if (filtroTipo && doc.tipo !== filtroTipo) return false;
      if (filtroAsignatura && doc.asignatura !== filtroAsignatura) return false;
      return true;
    });

    const ordenGrados = [
      'Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto',
      'Sétimo', 'Octavo', 'Noveno', 'Décimo', 'Undécimo', 'Duodécimo'
    ];
    const gradosEncontrados = new Set(subset.map((d) => d.grado));
    return ordenGrados.filter((g) => gradosEncontrados.has(g));
  }, [planes, filtroNivelEducativo, filtroCiclo, filtroModalidad, filtroTipo, filtroAsignatura]);

  // Manejo sincronizado de cambios en cascada
  const handleNivelEducativoChange = (e) => {
    const nuevoNivel = e.target.value;
    setFiltroNivelEducativo(nuevoNivel);
    setFiltroCiclo('');
    setFiltroModalidad('');
    setFiltroAsignatura('');
    setFiltroGrado('');
  };

  const handleCicloChange = (e) => {
    const nuevoCiclo = e.target.value;
    setFiltroCiclo(nuevoCiclo);
    if (nuevoCiclo !== 'Educación Diversificada') {
      setFiltroModalidad('');
    }
    setFiltroAsignatura('');
    setFiltroGrado('');
  };

  const handleModalidadChange = (e) => {
    setFiltroModalidad(e.target.value);
    setFiltroGrado('');
  };

  const handleTipoChange = (e) => {
    setFiltroTipo(e.target.value);
    setFiltroAsignatura('');
  };

  const handleLimpiar = () => {
    setFiltroTexto('');
    setFiltroNivelEducativo('');
    setFiltroCiclo('');
    setFiltroModalidad('');
    setFiltroTipo('');
    setFiltroAsignatura('');
    setFiltroGrado('');
  };

  // Filtrado reactivo de todos los planes
  const planesFiltrados = useMemo(() => {
    return planes.filter((doc) => {
      if (filtroTexto.trim()) {
        const busqueda = filtroTexto.toLowerCase();
        const coincideNombre = doc.nombre.toLowerCase().includes(busqueda);
        const coincideCodigo = doc.codigo.toLowerCase().includes(busqueda);
        const coincideAsig = doc.asignatura.toLowerCase().includes(busqueda);
        if (!coincideNombre && !coincideCodigo && !coincideAsig) return false;
      }
      if (filtroNivelEducativo && doc.nivelEducativo !== filtroNivelEducativo) return false;
      if (filtroCiclo && doc.ciclo !== filtroCiclo) return false;
      if (filtroModalidad && doc.modalidad !== filtroModalidad) return false;
      if (filtroTipo && doc.tipo !== filtroTipo) return false;
      if (filtroAsignatura && doc.asignatura !== filtroAsignatura) return false;
      if (filtroGrado && doc.grado !== filtroGrado) return false;
      return true;
    });
  }, [planes, filtroTexto, filtroNivelEducativo, filtroCiclo, filtroModalidad, filtroTipo, filtroAsignatura, filtroGrado]);

  // Colores e iconos según asignatura
  const getSubjectColorClasses = (asignatura) => {
    switch (asignatura) {
      case 'Español':
        return {
          badge: 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800',
          iconBg: 'bg-indigo-600 text-white'
        };
      case 'Matemáticas':
        return {
          badge: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
          iconBg: 'bg-emerald-600 text-white'
        };
      case 'Ciencias':
        return {
          badge: 'bg-cyan-100 dark:bg-cyan-950/70 text-cyan-900 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800',
          iconBg: 'bg-cyan-600 text-white'
        };
      case 'Estudios Sociales':
        return {
          badge: 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800',
          iconBg: 'bg-amber-500 text-white'
        };
      case 'Educación Cívica':
        return {
          badge: 'bg-blue-100 dark:bg-blue-950/70 text-blue-900 dark:text-blue-300 border-blue-300 dark:border-blue-800',
          iconBg: 'bg-blue-600 text-white'
        };
      case 'Biología':
        return {
          badge: 'bg-teal-100 dark:bg-teal-950/70 text-teal-900 dark:text-teal-300 border-teal-300 dark:border-teal-800',
          iconBg: 'bg-teal-600 text-white'
        };
      case 'Física':
        return {
          badge: 'bg-violet-100 dark:bg-violet-950/70 text-violet-900 dark:text-violet-300 border-violet-300 dark:border-violet-800',
          iconBg: 'bg-violet-600 text-white'
        };
      case 'Química':
        return {
          badge: 'bg-orange-100 dark:bg-orange-950/70 text-orange-900 dark:text-orange-300 border-orange-300 dark:border-orange-800',
          iconBg: 'bg-orange-600 text-white'
        };
      case 'Inglés':
      case 'Francés':
        return {
          badge: 'bg-sky-100 dark:bg-sky-950/70 text-sky-900 dark:text-sky-300 border-sky-300 dark:border-sky-800',
          iconBg: 'bg-sky-600 text-white'
        };
      case 'Educación Musical':
      case 'Artes Plásticas':
        return {
          badge: 'bg-pink-100 dark:bg-pink-950/70 text-pink-900 dark:text-pink-300 border-pink-300 dark:border-pink-800',
          iconBg: 'bg-pink-600 text-white'
        };
      case 'Educación Física':
        return {
          badge: 'bg-lime-100 dark:bg-lime-950/70 text-lime-900 dark:text-lime-300 border-lime-300 dark:border-lime-800',
          iconBg: 'bg-lime-600 text-white'
        };
      case 'Filosofía':
      case 'Educación Religiosa':
        return {
          badge: 'bg-purple-100 dark:bg-purple-950/70 text-purple-900 dark:text-purple-300 border-purple-300 dark:border-purple-800',
          iconBg: 'bg-purple-600 text-white'
        };
      default:
        return {
          badge: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700',
          iconBg: 'bg-slate-600 text-white'
        };
    }
  };

  const hayFiltrosActivos = Boolean(
    filtroTexto || filtroNivelEducativo || filtroCiclo || filtroModalidad || filtroTipo || filtroAsignatura || filtroGrado
  );

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-10 transition-colors duration-200">
      {/* Encabezado del área de búsqueda */}
      <div className="bg-gradient-to-r from-[#0f2942] to-[#1e3a5f] dark:from-[#1a3863] dark:via-[#1e447b] dark:to-[#235091] p-6 text-white border-b-2 border-amber-500 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-white/10 text-amber-400">
            <IconSearch className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            1. Búsqueda y Consulta de Planes de Estudio Oficiales
          </h2>
        </div>
        <p className="text-slate-300 text-sm max-w-4xl">
          Consulte el catálogo institucional completo del MEP. Filtre dinámicamente por nivel, ciclo, modalidad (Académica / Técnica), tipo, asignatura y grado para acceder de inmediato al documento PDF normado.
        </p>
      </div>

      {/* Formulario de filtros en cascada */}
      <div className="p-6 bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* --- FILA 1: 4 FILTROS --- */}
          {/* 1. Filtro: Texto */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Palabra Clave
            </label>
            <div className="relative">
              <input
                type="text"
                value={filtroTexto}
                onChange={(e) => setFiltroTexto(e.target.value)}
                placeholder="Ej. Biología, MEP-SEC..."
                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition shadow-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                <IconSearch className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 2. Filtro: Nivel Educativo */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Nivel Educativo
            </label>
            <select
              value={filtroNivelEducativo}
              onChange={handleNivelEducativoChange}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition shadow-sm"
            >
              <option value="">Todos los niveles</option>
              <option value="Primaria">Primaria</option>
              <option value="Secundaria">Secundaria</option>
            </select>
          </div>

          {/* 3. Filtro: Ciclo */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Ciclo Curricular
            </label>
            <select
              value={filtroCiclo}
              onChange={handleCicloChange}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition shadow-sm"
            >
              <option value="">Todos los ciclos</option>
              {ciclosDisponibles.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* 4. Filtro: Modalidad (Académica / Técnica) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Modalidad {mostrarModalidad && <span className="text-amber-500">*</span>}
            </label>
            <select
              value={filtroModalidad}
              onChange={handleModalidadChange}
              disabled={!mostrarModalidad && filtroNivelEducativo === 'Primaria'}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 disabled:opacity-50 disabled:bg-slate-100 dark:disabled:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition shadow-sm"
            >
              <option value="">Todas las modalidades</option>
              <option value="Académica">Académica</option>
              <option value="Técnica">Técnica (CTP)</option>
              <option value="Regular">Regular (General)</option>
            </select>
          </div>

          {/* --- FILA 2: 3 FILTROS + 1 ESPACIO LIBRE --- */}
          {/* 5. Filtro: Tipo de Asignatura */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Tipo de Materia
            </label>
            <select
              value={filtroTipo}
              onChange={handleTipoChange}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition shadow-sm"
            >
              <option value="">Todos los tipos</option>
              <option value="Básica">Básica</option>
              <option value="Complementaria">Complementaria</option>
            </select>
          </div>

          {/* 6. Filtro: Asignatura */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Asignatura
            </label>
            <select
              value={filtroAsignatura}
              onChange={(e) => setFiltroAsignatura(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition shadow-sm"
            >
              <option value="">Todas ({asignaturasDisponibles.length})</option>
              {asignaturasDisponibles.map((asig) => (
                <option key={asig} value={asig}>{asig}</option>
              ))}
            </select>
          </div>

          {/* 7. Filtro: Grado / Año */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Grado / Año
            </label>
            <select
              value={filtroGrado}
              onChange={(e) => setFiltroGrado(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition shadow-sm"
            >
              <option value="">Todos los grados ({gradosDisponibles.length})</option>
              {gradosDisponibles.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Espacio libre para balance de la cuadrícula de 4 columnas */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>

        {/* --- FILA 3: BARRA DE ESTADO Y ACCIONES --- */}
        <div className="mt-5 pt-3.5 border-t border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Izquierda: Estadísticas y badge de filtros activos */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
            <IconFilter className="w-4 h-4 text-slate-400" />
            <span>
              Mostrando <strong className="text-blue-900 dark:text-blue-400 font-bold">{planesFiltrados.length}</strong> de{' '}
              <strong>{planes.length}</strong> planes registrados
            </span>
            {hayFiltrosActivos && (
              <span className="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                Filtros activos
              </span>
            )}
          </div>

          {/* Derecha: Botón Restablecer filtros */}
          <div>
            {hayFiltrosActivos ? (
              <button
                type="button"
                onClick={handleLimpiar}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 rounded-lg transition-all shadow-xs cursor-pointer"
                title="Limpiar todos los filtros y volver a ver los 144 planes"
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

      {/* Cuadrícula de resultados de la búsqueda */}
      <div className="p-6">
        {planesFiltrados.length === 0 ? (
          <div className="text-center py-12 px-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
              <IconSearch className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-200 mb-1">
              No se encontraron planes con los filtros seleccionados
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
              Pruebe ajustando el ciclo, la modalidad o la asignatura para explorar otros documentos.
            </p>
            <button
              onClick={handleLimpiar}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition"
            >
              Ver los 144 planes oficiales
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {planesFiltrados.map((doc) => {
              const colors = getSubjectColorClasses(doc.asignatura);
              const isPrimaria = doc.nivelEducativo === 'Primaria';

              return (
                <div
                  key={doc.id}
                  className="relative bg-gradient-to-b from-slate-100 via-slate-200/90 to-slate-300/80 dark:from-[#3d5377] dark:via-[#2a3c57] dark:to-[#182537] border border-slate-300 dark:border-slate-500/80 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:border-blue-500 dark:hover:border-amber-400"
                >
                  <div className="p-5 flex-1">
                    {/* Fila superior: Asignatura e Icono */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`p-2.5 rounded-lg ${colors.iconBg} shadow-xs flex-shrink-0 transition-colors`}>
                          <AsignaturaIcon asignatura={doc.asignatura} className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block uppercase tracking-wider truncate">
                            {doc.asignatura}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 inline-block mt-0.5">
                            {doc.codigo}
                          </span>
                        </div>
                      </div>

                      {/* Descargas totales */}
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg bg-blue-50 dark:bg-slate-800/90 text-blue-900 dark:text-amber-400 border border-blue-200/70 dark:border-slate-700 shadow-2xs flex-shrink-0">
                        <IconDownload className="w-3.5 h-3.5 text-blue-600 dark:text-amber-400" />
                        <strong>{doc.descargas}</strong>
                      </span>
                    </div>

                    {/* Nombre del documento con realce en hover */}
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-amber-400 transition-colors mb-2 line-clamp-2 leading-snug">
                      {doc.nombre}
                    </h3>

                    {/* Badges de metadatos jerárquicos */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs mt-3">
                      <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                        isPrimaria
                          ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : 'bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                      }`}>
                        {doc.nivelEducativo}
                      </span>

                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium text-[11px]">
                        {doc.ciclo}
                      </span>

                      {doc.modalidad && doc.modalidad !== 'Regular' && (
                        <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                          doc.modalidad === 'Técnica'
                            ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                            : 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800'
                        }`}>
                          {doc.modalidad}
                        </span>
                      )}

                      <span className={`px-2 py-0.5 rounded border font-semibold text-[11px] ${colors.badge}`}>
                        {doc.grado}
                      </span>

                      <span className="px-2 py-0.5 rounded bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 font-bold text-[10px]">
                        PDF
                      </span>
                    </div>
                  </div>

                  {/* Acciones de la tarjeta con flujo transparente integrado sobre el degradado */}
                  <div className="px-5 pb-5 pt-3 mt-auto flex items-center justify-between gap-2 border-t border-slate-200/60 dark:border-slate-700/50">
                    <button
                      type="button"
                      onClick={() => onPreview(doc)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg transition-colors shadow-2xs backdrop-blur-xs"
                    >
                      <IconEye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Previsualizar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDownload(doc)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors shadow-2xs"
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
