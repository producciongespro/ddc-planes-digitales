import React, { useEffect } from 'react';
import { IconAlertTriangle, IconRefresh, IconClose } from './Icons';

export function ResetConfirmModal({ isOpen, onClose, onConfirm }) {
  // Manejo de tecla Escape para cerrar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-4 transition-all duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-reset-title"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden transform transition-all duration-200 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado con degradado institucional */}
        <div className="bg-gradient-to-r from-[#172554] to-[#1e3a8a] dark:from-[#1a3863] dark:via-[#1e447b] dark:to-[#235091] px-6 py-4 text-white border-b-2 border-amber-500 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300">
              <IconAlertTriangle className="w-5 h-5" />
            </div>
            <h3 id="modal-reset-title" className="text-base font-bold tracking-tight">
              Restablecer Datos de Prueba
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Cerrar modal"
          >
            <IconClose className="w-4 h-4" />
          </button>
        </div>

        {/* Cuerpo del modal */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            ¿Está seguro de que desea restablecer los contadores de descargas a sus valores originales de fábrica?
          </p>

          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3.5 text-xs text-amber-900 dark:text-amber-200 leading-normal flex items-start gap-2.5">
            <span className="text-amber-600 dark:text-amber-400 text-base leading-none mt-0.5 font-bold">ℹ️</span>
            <div>
              <p className="font-semibold mb-0.5">Efecto de la acción:</p>
              <p className="text-amber-800 dark:text-amber-300">
                Se limpiarán las modificaciones en el almacenamiento local (<code className="font-mono bg-amber-100 dark:bg-amber-900/50 px-1 py-0.5 rounded">localStorage</code>) y se reiniciarán las métricas de los <strong>144 planes de estudio</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Pie de acciones con botones estilizados */}
        <div className="bg-slate-50 dark:bg-slate-950/60 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-xl transition-colors shadow-xs"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 dark:bg-amber-500 dark:hover:bg-amber-400 rounded-xl shadow transition-all transform active:scale-95"
          >
            <IconRefresh className="w-3.5 h-3.5" />
            <span>Sí, restablecer datos</span>
          </button>
        </div>
      </div>
    </div>
  );
}
