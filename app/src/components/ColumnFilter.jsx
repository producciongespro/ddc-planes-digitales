import React, { useState, useRef, useEffect, useMemo } from 'react';
import { IconFilter, IconSearch } from './Icons';

export function ColumnFilter({
  label,
  options = [],
  selectedValues = [],
  onChange,
  align = 'left'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const popoverRef = useRef(null);

  // Cerrar al hacer clic fuera o presionar Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Si selectedValues está vacío, significa que no hay filtro aplicado (todos seleccionados por defecto)
  const isFiltered = selectedValues.length > 0 && selectedValues.length < options.length;

  // Filtrar las opciones por el término de búsqueda interno
  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return options;
    const term = searchTerm.toLowerCase();
    return options.filter((opt) => opt.value.toLowerCase().includes(term));
  }, [options, searchTerm]);

  // Manejar toggle individual de un checkbox
  const handleToggle = (value) => {
    let next;
    // Si no había filtro activo (vacío), al desmarcar uno se seleccionan todos menos ese
    if (selectedValues.length === 0) {
      next = options.map((o) => o.value).filter((v) => v !== value);
    } else if (selectedValues.includes(value)) {
      next = selectedValues.filter((v) => v !== value);
      // Si el usuario desmarcó el último, dejamos el array vacío para no mostrar nada o mantener consistencia
    } else {
      next = [...selectedValues, value];
      // Si ahora están todos seleccionados, volvemos a vacío (sin filtro)
      if (next.length === options.length) {
        next = [];
      }
    }
    onChange(next);
  };

  // Seleccionar todas las opciones (equivale a sin filtro activo)
  const handleSelectAll = () => {
    onChange([]);
  };

  // Deseleccionar todas las opciones
  const handleDeselectAll = () => {
    // Si deseleccionamos todos, pasamos un array con un valor inexistente o marcamos modo ninguno
    onChange(['__NINGUNO__']);
  };

  const isChecked = (value) => {
    if (selectedValues.length === 0) return true; // todos activos
    if (selectedValues.includes('__NINGUNO__')) return false;
    return selectedValues.includes(value);
  };

  return (
    <div className="relative inline-flex items-center" ref={popoverRef}>
      {/* Botón Disparador en la Cabecera de Columna */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`inline-flex items-center gap-1.5 px-1.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
          isFiltered
            ? 'bg-blue-600 text-white shadow-xs'
            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-700/80'
        }`}
        title={`Filtrar por ${label}`}
        aria-label={`Filtrar por ${label}`}
      >
        <span>{label}</span>
        <IconFilter className={`w-3.5 h-3.5 ${isFiltered ? 'text-amber-300' : 'text-slate-400 dark:text-slate-400'}`} />
        {isFiltered && (
          <span className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-extrabold bg-amber-400 text-slate-900 rounded-full">
            {selectedValues.length}
          </span>
        )}
      </button>

      {/* Menú Flotante (Popover) */}
      {isOpen && (
        <div
          className={`absolute top-full mt-1.5 z-50 w-72 sm:w-80 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-3 text-slate-800 dark:text-slate-100 normal-case ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
          style={{ minWidth: '280px' }}
        >
          {/* Cabecera del Popover */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <IconFilter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Filtrar: {label}
              </span>
            </div>
            {isFiltered && (
              <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                {selectedValues.length} de {options.length}
              </span>
            )}
          </div>

          {/* Buscador interno para listas medianas o largas */}
          {options.length > 5 && (
            <div className="relative mb-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Buscar en ${label.toLowerCase()}...`}
                className="w-full pl-8 pr-2.5 py-1 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                <IconSearch className="w-3.5 h-3.5" />
              </div>
            </div>
          )}

          {/* Acciones Rápidas: Todos / Ninguno */}
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100 dark:border-slate-800 text-[11px]">
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
            >
              Seleccionar todos
            </button>
            <button
              type="button"
              onClick={handleDeselectAll}
              className="text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-semibold cursor-pointer"
            >
              Limpiar (Ninguno)
            </button>
          </div>

          {/* Lista de Checkboxes con Scroll */}
          <div className="max-h-56 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {filteredOptions.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-2 text-center">
                No hay coincidencias
              </p>
            ) : (
              filteredOptions.map((opt) => {
                const checked = isChecked(opt.value);
                return (
                  <label
                    key={opt.value}
                    className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleToggle(opt.value)}
                        className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer w-3.5 h-3.5"
                      />
                      <span className={`truncate ${checked ? 'font-medium text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-500'}`}>
                        {opt.value}
                      </span>
                    </div>
                    {typeof opt.count === 'number' && (
                      <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full flex-shrink-0">
                        {opt.count}
                      </span>
                    )}
                  </label>
                );
              })
            )}
          </div>

          {/* Pie del Popover */}
          <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition cursor-pointer shadow-xs"
            >
              Aplicar y Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
