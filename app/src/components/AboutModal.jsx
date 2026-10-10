import React, { useEffect } from 'react';
import appVersion from '../data/version.json';
import { IconInfo, IconClose } from './Icons';

export function AboutModal({ isOpen, onClose }) {
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

  // Versión dinámica DRY
  const versionCompleta = appVersion.compilado
    ? (String(appVersion.compilado).startsWith('.')
        ? `${appVersion.version}${appVersion.compilado}`
        : `${appVersion.version}.${appVersion.compilado}`)
    : appVersion.version;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-4 transition-all duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-about-title"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all duration-200 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado institucional */}
        <div className="bg-gradient-to-r from-[#172554] to-[#1e3a8a] dark:from-[#1a3863] dark:via-[#1e447b] dark:to-[#235091] px-6 py-4 text-white border-b-2 border-amber-500 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300">
              <IconInfo className="w-5 h-5" />
            </div>
            <div>
              <h3 id="modal-about-title" className="text-base font-bold tracking-tight">
                Acerca del Repositorio Curricular Digital
              </h3>
              <p className="text-xs text-blue-200">
                Dirección de Desarrollo Curricular (DDC) · MEP Costa Rica
              </p>
            </div>
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

        {/* Contenido con scroll independiente si es necesario */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
          {/* Presentación institucional */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-400 mb-1.5 flex items-center gap-1.5">
              <span>🏛️</span> Propósito del Repositorio
            </h4>
            <p className="text-slate-600 dark:text-slate-300">
              Esta plataforma es el centro oficial de consulta y descarga de los planes y programas de estudio normados del Ministerio de Educación Pública. Su objetivo es asegurar que la comunidad docente, equipos de dirección y asesorías pedagógicas de todo el país dispongan de la versión curricular oficial, vigente y autorizada en formato digital accesible.
            </p>
          </div>

          {/* Dirección de Desarrollo Curricular */}
          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-1.5">
              <span>🎯</span> Dirección de Desarrollo Curricular (DDC)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
              Órgano técnico del Viceministerio Académico responsable de planificar, diseñar, actualizar y evaluar las ofertas curriculares y programas de estudio de la educación formal costarricense, garantizando su pertinencia pedagógica y articulación con los fines de la educación nacional.
            </p>
          </div>

          {/* Cobertura de los 197 Planeamientos Normados 2027 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-400 mb-2 flex items-center gap-1.5">
              <span>📚</span> Estructura y Cobertura Normada (197 Planes Curriculares)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
                <p className="font-semibold text-blue-950 dark:text-blue-300 mb-0.5">7 Ofertas Educativas DDC</p>
                <p className="text-slate-600 dark:text-slate-400">
                  Preescolar, I y II Ciclos, III Ciclo y Diversificada, EPJA, Educación Especial, Intercultural y Unidocentes.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
                <p className="font-semibold text-blue-950 dark:text-blue-300 mb-0.5">Paquetes Oficiales ZIP</p>
                <p className="text-slate-600 dark:text-slate-400">
                  Cada planeamiento se distribuye en paquetes comprimidos descargables con su respectivo PDF curricular oficial.
                </p>
              </div>
            </div>
          </div>

          {/* Marco Legal */}
          <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-3.5 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
            <span className="text-base leading-none">⚖️</span>
            <div>
              <p className="font-semibold mb-0.5">Aprobación Legal y Vigencia:</p>
              <p className="text-amber-800 dark:text-amber-300">
                Todos los planes de estudio y sus actualizaciones corresponden a disposiciones acordadas y ratificadas por el <strong>Consejo Superior de Educación (CSE)</strong>, órgano constitucional rector de la enseñanza pública en Costa Rica.
              </p>
            </div>
          </div>

          {/* Ficha técnica del sistema */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            <span>Versión del Software: <strong className="text-slate-700 dark:text-slate-200">{versionCompleta}</strong> ({appVersion.ambiente || appVersion.liberacion})</span>
            <span>Compilación: <strong className="text-slate-700 dark:text-slate-200">{appVersion.compilacion}</strong></span>
          </div>
        </div>

        {/* Pie de acciones */}
        <div className="bg-slate-50 dark:bg-slate-950/60 px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-xl shadow-xs transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
