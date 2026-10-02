import React, { useEffect } from 'react';
import { AsignaturaIcon, IconDownload, IconClose } from './Icons';

export function PdfPreviewModal({ documento, onClose, onDownload }) {
  // Manejo de tecla Escape para cerrar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (documento) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [documento, onClose]);

  // Si no hay documento seleccionado, no se renderiza nada
  if (!documento) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-3 sm:p-6 transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-doc-title"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-5xl h-[92vh] max-h-[900px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-300 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado del visor modal */}
        <div className="bg-[#0f2942] dark:bg-[#071320] text-white px-5 py-4 flex items-center justify-between border-b-2 border-amber-500">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-blue-800 dark:bg-blue-900 text-amber-400 flex-shrink-0">
              <AsignaturaIcon asignatura={documento.asignatura} className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Previsualización de Documento Único
                </span>
                <span className="text-xs text-slate-300 font-mono hidden sm:inline">
                  {documento.codigo}
                </span>
              </div>
              <h2
                id="modal-doc-title"
                className="text-base sm:text-lg font-bold text-white truncate mt-0.5"
                title={documento.nombre}
              >
                {documento.nombre}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 ml-3">
            {/* Botón de descarga directa */}
            <button
              type="button"
              onClick={() => onDownload(documento)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-sm"
              title="Descargar este archivo oficial a su dispositivo"
            >
              <IconDownload className="w-4 h-4" />
              <span className="hidden sm:inline">Descargar PDF</span>
            </button>

            {/* Botón de cierre */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Cerrar previsualizador (Esc)"
              aria-label="Cerrar visor"
            >
              <IconClose className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Barra de metadatos del documento */}
        <div className="bg-slate-100 dark:bg-slate-800/80 px-5 py-2 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-300 gap-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <span>
              <strong>Nivel:</strong> {documento.nivelEducativo}
            </span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span>
              <strong>Ciclo:</strong> {documento.ciclo}
            </span>
            {documento.modalidad && documento.modalidad !== 'Regular' && (
              <>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span>
                  <strong>Modalidad:</strong> {documento.modalidad}
                </span>
              </>
            )}
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span>
              <strong>Tipo:</strong> {documento.tipo}
            </span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span>
              <strong>Asignatura:</strong> {documento.asignatura}
            </span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span>
              <strong>Grado:</strong> {documento.grado || documento.nivel}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-500 dark:text-slate-400">
              Descargas registradas: <strong className="text-blue-900 dark:text-amber-400">{documento.descargas}</strong>
            </span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Documento Vigente 2026
            </span>
          </div>
        </div>

        {/* Área del visor PDF nativo mediante iframe */}
        <div className="flex-1 bg-slate-200 dark:bg-slate-950 relative overflow-hidden">
          <iframe
            src={`${documento.ruta}#toolbar=1&navpanes=0`}
            title={`Visor del ${documento.nombre}`}
            className="w-full h-full border-0"
          />
        </div>

        {/* Pie del modal */}
        <div className="bg-white dark:bg-slate-900 px-5 py-3 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
            <span>
              Archivo: <code className="text-slate-700 dark:text-slate-200 font-mono">{documento.archivo}</code>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-lg transition"
            >
              Cerrar visor
            </button>
            <button
              type="button"
              onClick={() => onDownload(documento)}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-lg transition flex items-center gap-1.5 shadow"
            >
              <IconDownload className="w-4 h-4" />
              <span>Descargar copia oficial</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
