import React, { useState, useEffect, useMemo } from 'react';
import { AsignaturaIcon, OfertaIcon, IconDownload, IconDocument } from './Icons';

const ordenPreescolar = [
  'Materno Infantil (Interactivo I)',
  'Interactivo II',
  'Transición',
  'Grupo Heterogéneo'
];

export const ordenarGrados = (a, b) => {
  const indicePreescolarA = ordenPreescolar.indexOf(a);
  const indicePreescolarB = ordenPreescolar.indexOf(b);
  if (indicePreescolarA !== -1 || indicePreescolarB !== -1) {
    if (indicePreescolarA === -1) return 1;
    if (indicePreescolarB === -1) return -1;
    return indicePreescolarA - indicePreescolarB;
  }

  const numeroA = Number(a.match(/\bAño \((\d{1,2})°\)$/)?.[1] || a.match(/(\d{1,2})°/)?.[1]);
  const numeroB = Number(b.match(/\bAño \((\d{1,2})°\)$/)?.[1] || b.match(/(\d{1,2})°/)?.[1]);
  const esAnioA = numeroA >= 1 && numeroA <= 12;
  const esAnioB = numeroB >= 1 && numeroB <= 12;
  if (esAnioA || esAnioB) {
    if (!esAnioA) return 1;
    if (!esAnioB) return -1;
    return numeroA - numeroB;
  }

  return a.localeCompare(b, 'es');
};

// Paleta de 14 temas cromáticos 3D en CSS puro (cero imágenes de botones)
export const BUTTON_3D_THEMES = [
  {
    key: 'teal',
    classes: 'bg-gradient-to-b from-[#14b8a6] to-[#0d9488] border-[#0f766e] hover:from-[#2dd4bf] hover:to-[#0d9488] shadow-teal-900/20'
  },
  {
    key: 'amber',
    classes: 'bg-gradient-to-b from-[#f59e0b] to-[#d97706] border-[#b45309] hover:from-[#fbbf24] hover:to-[#d97706] shadow-amber-900/20'
  },
  {
    key: 'blue',
    classes: 'bg-gradient-to-b from-[#0284c7] to-[#0369a1] border-[#075985] hover:from-[#0ea5e9] hover:to-[#0284c7] shadow-sky-900/20'
  },
  {
    key: 'indigo',
    classes: 'bg-gradient-to-b from-[#4f46e5] to-[#4338ca] border-[#3730a3] hover:from-[#6366f1] hover:to-[#4f46e5] shadow-indigo-900/20'
  },
  {
    key: 'rose',
    classes: 'bg-gradient-to-b from-[#f43f5e] to-[#e11d48] border-[#be123c] hover:from-[#fb7185] hover:to-[#e11d48] shadow-rose-900/20'
  },
  {
    key: 'purple',
    classes: 'bg-gradient-to-b from-[#9333ea] to-[#7e22ce] border-[#6b21a8] hover:from-[#a855f7] hover:to-[#7e22ce] shadow-purple-900/20'
  },
  {
    key: 'emerald',
    classes: 'bg-gradient-to-b from-[#10b981] to-[#059669] border-[#047857] hover:from-[#34d399] hover:to-[#059669] shadow-emerald-900/20'
  },
  {
    key: 'cyan',
    classes: 'bg-gradient-to-b from-[#06b6d4] to-[#0891b2] border-[#0e7490] hover:from-[#22d3ee] hover:to-[#0891b2] shadow-cyan-900/20'
  },
  {
    key: 'orange',
    classes: 'bg-gradient-to-b from-[#f97316] to-[#ea580c] border-[#c2410c] hover:from-[#fb923c] hover:to-[#ea580c] shadow-orange-900/20'
  },
  {
    key: 'violet',
    classes: 'bg-gradient-to-b from-[#7c3aed] to-[#6d28d9] border-[#5b21b6] hover:from-[#8b5cf6] hover:to-[#6d28d9] shadow-violet-900/20'
  },
  {
    key: 'fuchsia',
    classes: 'bg-gradient-to-b from-[#d946ef] to-[#c026d3] border-[#a21caf] hover:from-[#e879f9] hover:to-[#c026d3] shadow-fuchsia-900/20'
  },
  {
    key: 'lime',
    classes: 'bg-gradient-to-b from-[#65a30d] to-[#4d7c0f] border-[#3f6212] hover:from-[#84cc16] hover:to-[#4d7c0f] shadow-lime-900/20'
  },
  {
    key: 'red',
    classes: 'bg-gradient-to-b from-[#ef4444] to-[#dc2626] border-[#b91c1c] hover:from-[#f87171] hover:to-[#dc2626] shadow-red-900/20'
  },
  {
    key: 'royal',
    classes: 'bg-gradient-to-b from-[#1d4ed8] to-[#1e40af] border-[#1e3a8a] hover:from-[#2563eb] hover:to-[#1d4ed8] shadow-blue-900/20'
  }
];

const ORDEN_OFERTAS_CODIGO = [
  'PREESCOLAR',
  'I-II-CICLOS',
  'III-DIVERSIFICADA',
  'EPJA',
  'ESPECIAL',
  'INTERCULTURAL',
  'UNIDOCENTES'
];

function obtenerTemaPorIndice(index, badgeColor) {
  if (badgeColor) {
    const mapColor = badgeColor === 'yellow' ? 'orange' : badgeColor;
    const found = BUTTON_3D_THEMES.find((t) => t.key === mapColor);
    if (found) return found.classes;
  }
  const safeIndex = Math.max(0, index);
  return BUTTON_3D_THEMES[safeIndex % BUTTON_3D_THEMES.length].classes;
}

/**
 * Particiona una lista de N elementos en las 4 zonas del anillo orbital en flujo real CSS
 * (top, left, right, bottom) manteniendo estrictamente el orden secuencial 0..N-1 en el DOM.
 */
export function obtenerZonasOrbitales(items = []) {
  const total = items.length;
  let topCount = 0;
  let leftCount = 0;
  let rightCount = 0;

  if (total === 1) {
    topCount = 0; leftCount = 0; rightCount = 0;
  } else if (total === 2 || total === 3) {
    topCount = 0; leftCount = 1; rightCount = 1;
  } else if (total === 4) {
    topCount = 0; leftCount = 2; rightCount = 2;
  } else if (total === 5) {
    topCount = 1; leftCount = 2; rightCount = 2;
  } else if (total === 6 || total === 7) {
    topCount = 0; leftCount = 3; rightCount = 3;
  } else if (total === 8) {
    topCount = 1; leftCount = 3; rightCount = 3;
  } else if (total <= 12) {
    // Densidad media (ej. Unidocente 11): 3 arriba + 3 izq + 3 der + 2 abajo
    topCount = 3; leftCount = 3; rightCount = 3;
  } else if (total <= 14) {
    // Densidad media-alta (ej. Primaria 13): 3 arriba + 4 izq + 4 der + 2 abajo (cero filas huérfanas)
    topCount = 3; leftCount = 4; rightCount = 4;
  } else {
    // Alta densidad (ej. Secundaria 21): 5 arriba + 6 izq (3x2) + 6 der (3x2) + 4 abajo = 21 (cero filas huérfanas)
    topCount = 5; leftCount = 6; rightCount = 6;
  }

  const topItems = items.slice(0, topCount).map((item, i) => ({ item, globalIndex: i }));
  const leftItems = items
    .slice(topCount, topCount + leftCount)
    .map((item, i) => ({ item, globalIndex: topCount + i }));
  const rightItems = items
    .slice(topCount + leftCount, topCount + leftCount + rightCount)
    .map((item, i) => ({ item, globalIndex: topCount + leftCount + i }));
  const bottomItems = items
    .slice(topCount + leftCount + rightCount)
    .map((item, i) => ({ item, globalIndex: topCount + leftCount + rightCount + i }));

  return { topItems, leftItems, rightItems, bottomItems };
}

// Extrae el numeral (1°..12°) o sigla corta para el medallón circular en la Vista 3 (Grado)
function obtenerInsigniaGrado(grado = '') {
  const matchGrado = String(grado).match(/(\d{1,2})°/);
  if (matchGrado) return `${matchGrado[1]}°`;

  const limpio = String(grado).trim();
  if (/interactivo\s*i\b/i.test(limpio)) return 'I';
  if (/interactivo\s*ii\b/i.test(limpio)) return 'II';
  if (/transici/i.test(limpio)) return 'T';
  if (/heterog/i.test(limpio)) return 'GH';

  const palabras = limpio
    .replace(/[()]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !/^(del|los|las|para|con|por)$/i.test(w));
  if (palabras.length >= 2) {
    return `${palabras[0][0]}${palabras[1][0]}`.toUpperCase();
  }
  return (limpio.slice(0, 2) || 'G').toUpperCase();
}

// Calcula el tamaño tipográfico fluido para la portada del cuaderno en Vista 3
// midiendo la palabra individual más larga para que NINGUNA palabra se parta jamás a la mitad
function obtenerFontSizeCuaderno(texto = '') {
  const limpio = String(texto).trim();
  const palabras = limpio.split(/\s+/).filter(Boolean);
  const maxWordLen = palabras.reduce((max, w) => Math.max(max, w.length), 0);
  const totalLen = limpio.length;

  if (maxWordLen <= 7 && totalLen <= 14) return 'clamp(1.15rem, 1.85vw, 1.80rem)';
  if (maxWordLen <= 10 && totalLen <= 22) return 'clamp(1.0rem, 1.50vw, 1.48rem)';
  if (maxWordLen <= 13 && totalLen <= 32) return 'clamp(0.85rem, 1.22vw, 1.20rem)';
  return 'clamp(0.72rem, 1.02vw, 1.0rem)';
}

/**
 * Botón píldora 3D reutilizable en CSS + SVG con medallón circular izquierdo (+60% escala y presencia,
 * con adaptación inteligente de densidad para que 11, 13 o 20 botones quepan en órbita sin scroll).
 */
function PillButton3D({ label, badge, themeClasses, onClick, density = 'normal', className = '' }) {
  const paddingClasses =
    density === 'high'
      ? 'gap-3 px-3.5 py-2.5 sm:py-3 rounded-xl border-b-[4px]'
      : density === 'medium'
        ? 'gap-3.5 px-4 py-3 rounded-2xl border-b-[5px]'
        : 'gap-3.5 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl border-b-[6px]';

  const medallionClasses =
    density === 'high'
      ? 'w-9 h-9 sm:w-10 sm:h-10'
      : density === 'medium'
        ? 'w-10 h-10 sm:w-11 sm:h-11'
        : 'w-12 h-12 sm:w-14 sm:h-14';

  const textClasses =
    density === 'high'
      ? 'text-xs sm:text-sm lg:text-[14.5px] leading-tight'
      : density === 'medium'
        ? 'text-sm sm:text-base lg:text-[16.5px] leading-tight'
        : 'text-base sm:text-lg xl:text-xl leading-snug';

  const widthClasses =
    density === 'high'
      ? 'w-full min-w-0 max-w-[305px]'
      : density === 'medium'
        ? 'w-full min-w-0 max-w-[360px]'
        : 'w-full min-w-0 sm:min-w-[270px] lg:min-w-[310px] max-w-[395px]';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative ${widthClasses} flex items-center ${paddingClasses} text-white shadow-lg hover:shadow-xl active:translate-y-[2px] transition-all duration-150 cursor-pointer select-none focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 ${themeClasses} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`${medallionClasses} rounded-full bg-white/25 border-2 border-white/60 flex items-center justify-center flex-shrink-0 text-white font-black shadow-inner group-hover:scale-105 transition-transform`}
      >
        {badge}
      </span>
      <span className={`${textClasses} font-black text-white text-left tracking-tight drop-shadow-xs break-words flex-1`}>
        {label}
      </span>
    </button>
  );
}

/**
 * Escenario Orbital en Flujo Real CSS Grid / Flexbox de Área Completa (Cero position:absolute, imposible solapamiento).
 */
function OrbitalFlowStage({ items, density = 'normal', centerNode, renderButton }) {
  const { topItems, leftItems, rightItems, bottomItems } = obtenerZonasOrbitales(items);
  const isHighDensity = density === 'high';

  const renderTopZone = () => {
    if (topItems.length === 0) return null;
    if (topItems.length === 1) {
      return (
        <div className="flex justify-center w-full mb-2">
          {renderButton(topItems[0].item, topItems[0].globalIndex, '')}
        </div>
      );
    }
    if (topItems.length === 2) {
      return (
        <div className="flex flex-wrap justify-center gap-8 lg:gap-16 w-full mb-2">
          {topItems.map(({ item, globalIndex }) => renderButton(item, globalIndex, ''))}
        </div>
      );
    }
    if (topItems.length === 3) {
      return (
        <div className="grid grid-cols-3 gap-5 lg:gap-8 xl:gap-10 items-end justify-items-center w-full max-w-[1260px] mx-auto mb-2">
          {topItems.map(({ item, globalIndex }, i) =>
            renderButton(item, globalIndex, i === 1 ? '-translate-y-2' : 'translate-y-1')
          )}
        </div>
      );
    }
    if (topItems.length === 4) {
      return (
        <div className="grid grid-cols-4 gap-4 lg:gap-6 items-end justify-items-center w-full max-w-[1440px] mx-auto mb-2">
          {topItems.map(({ item, globalIndex }, i) =>
            renderButton(item, globalIndex, i === 1 || i === 2 ? '-translate-y-2' : 'translate-y-1.5')
          )}
        </div>
      );
    }
    // 5 botones en el arco superior (ej. Secundaria 21 asignaturas: 5 arriba + 6 izq + 6 der + 4 abajo)
    return (
      <div className="grid grid-cols-5 gap-3 lg:gap-4 xl:gap-5 items-end justify-items-center w-full max-w-[1620px] mx-auto mb-2">
        {topItems.map(({ item, globalIndex }, i) => {
          const curve =
            i === 2
              ? '-translate-y-2.5'
              : i === 1 || i === 3
                ? '-translate-y-1'
                : 'translate-y-2';
          return renderButton(item, globalIndex, curve);
        })}
      </div>
    );
  };

  const renderBottomZone = () => {
    if (bottomItems.length === 0) return null;
    if (bottomItems.length === 1) {
      return (
        <div className="flex justify-center w-full mt-2">
          {renderButton(bottomItems[0].item, bottomItems[0].globalIndex, '')}
        </div>
      );
    }
    if (bottomItems.length === 2) {
      return (
        <div className="flex flex-wrap justify-center gap-8 lg:gap-16 xl:gap-24 w-full mt-2">
          {bottomItems.map(({ item, globalIndex }) => renderButton(item, globalIndex, ''))}
        </div>
      );
    }
    if (bottomItems.length === 3) {
      return (
        <div className="grid grid-cols-3 gap-5 lg:gap-8 xl:gap-10 items-start justify-items-center w-full max-w-[1260px] mx-auto mt-2">
          {bottomItems.map(({ item, globalIndex }, i) =>
            renderButton(item, globalIndex, i === 1 ? 'translate-y-2' : '-translate-y-1')
          )}
        </div>
      );
    }
    if (bottomItems.length === 4) {
      return (
        <div className="grid grid-cols-4 gap-4 lg:gap-6 items-start justify-items-center w-full max-w-[1440px] mx-auto mt-2">
          {bottomItems.map(({ item, globalIndex }, i) =>
            renderButton(item, globalIndex, i === 1 || i === 2 ? 'translate-y-2' : '-translate-y-1.5')
          )}
        </div>
      );
    }
    // 5 o más botones inferiores
    const filaSuperiorInferior = bottomItems.slice(0, 4);
    const apiceInferior = bottomItems.slice(4);
    return (
      <div className="flex flex-col items-center gap-4 w-full mt-2">
        <div className="grid grid-cols-4 gap-4 lg:gap-6 items-start justify-items-center w-full max-w-[1440px] mx-auto">
          {filaSuperiorInferior.map(({ item, globalIndex }, i) =>
            renderButton(item, globalIndex, i === 1 || i === 2 ? 'translate-y-1.5' : '-translate-y-1')
          )}
        </div>
        {apiceInferior.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 w-full">
            {apiceInferior.map(({ item, globalIndex }) => renderButton(item, globalIndex, ''))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      data-orbital-stage="true"
      data-orbital-density={density}
      className="w-full max-w-[1640px] flex-1 min-h-[calc(100vh-225px)] mx-auto flex flex-col items-center justify-evenly py-4 sm:py-6 gap-y-5 lg:gap-y-7"
    >
      {/* ZONA 1: ARCO SUPERIOR */}
      {renderTopZone()}

      {/* ZONA 2: ECUADOR CENTRAL (Ala Izquierda · Figura Central · Ala Derecha) */}
      <div
        className={`grid grid-cols-[1fr_auto_1fr] items-stretch w-full flex-1 ${
          isHighDensity ? 'gap-4 lg:gap-7 xl:gap-9 my-1' : 'gap-6 lg:gap-12 xl:gap-16 my-1'
        }`}
      >
        {/* Ala Izquierda */}
        {isHighDensity ? (
          <div className="grid grid-cols-2 content-between gap-y-5 lg:gap-y-7 xl:gap-y-8 gap-x-3.5 lg:gap-x-5 items-center justify-items-end w-full min-h-[290px] lg:min-h-[360px]">
            {leftItems.map(({ item, globalIndex }, i) => {
              const rowIdx = Math.floor(i / 2);
              const curve = rowIdx === 1 ? '-translate-x-1.5 lg:-translate-x-2.5' : 'translate-x-1.5 lg:translate-x-2.5';
              return renderButton(item, globalIndex, curve);
            })}
          </div>
        ) : (
          <div className="flex flex-col justify-between items-end gap-6 lg:gap-9 xl:gap-11 w-full min-h-[260px] lg:min-h-[350px] py-2">
            {leftItems.map(({ item, globalIndex }, i) => {
              let curveClass = '';
              if (leftItems.length === 4) {
                curveClass =
                  i === 0 || i === 3
                    ? 'translate-x-6 lg:translate-x-12'
                    : '-translate-x-2 lg:-translate-x-4';
              } else if (leftItems.length === 3) {
                curveClass =
                  i === 1
                    ? '-translate-x-2 lg:-translate-x-5 xl:-translate-x-8'
                    : 'translate-x-6 lg:translate-x-12 xl:translate-x-16';
              } else if (leftItems.length === 2) {
                curveClass = 'translate-x-4 lg:translate-x-8';
              }
              return renderButton(item, globalIndex, curveClass);
            })}
          </div>
        )}

        {/* Figura Central */}
        <div className="flex flex-col items-center justify-center self-center px-1 sm:px-3 shrink-0">
          {centerNode}
        </div>

        {/* Ala Derecha */}
        {isHighDensity ? (
          <div className="grid grid-cols-2 content-between gap-y-5 lg:gap-y-7 xl:gap-y-8 gap-x-3.5 lg:gap-x-5 items-center justify-items-start w-full min-h-[290px] lg:min-h-[360px]">
            {rightItems.map(({ item, globalIndex }, i) => {
              const rowIdx = Math.floor(i / 2);
              const curve = rowIdx === 1 ? 'translate-x-1.5 lg:translate-x-2.5' : '-translate-x-1.5 lg:-translate-x-2.5';
              return renderButton(item, globalIndex, curve);
            })}
          </div>
        ) : (
          <div className="flex flex-col justify-between items-start gap-6 lg:gap-9 xl:gap-11 w-full min-h-[260px] lg:min-h-[350px] py-2">
            {rightItems.map(({ item, globalIndex }, i) => {
              let curveClass = '';
              if (rightItems.length === 4) {
                curveClass =
                  i === 0 || i === 3
                    ? '-translate-x-6 lg:-translate-x-12'
                    : 'translate-x-2 lg:translate-x-4';
              } else if (rightItems.length === 3) {
                curveClass =
                  i === 1
                    ? 'translate-x-2 lg:translate-x-5 xl:translate-x-8'
                    : '-translate-x-6 lg:-translate-x-12 xl:-translate-x-16';
              } else if (rightItems.length === 2) {
                curveClass = '-translate-x-4 lg:-translate-x-8';
              }
              return renderButton(item, globalIndex, curveClass);
            })}
          </div>
        )}
      </div>

      {/* ZONA 3: ARCO INFERIOR */}
      {renderBottomZone()}
    </div>
  );
}

/**
 * Versión compacta del botón píldora 3D para la cinta interactiva «Volver a:»,
 * conservando el color exacto, el medallón circular blanco izquierdo y el relieve 3D.
 */
function MiniPillButton3D({ label, badge, themeClasses, onClick, title, isCurrent }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-current={isCurrent ? 'step' : undefined}
      className={`group relative inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl border-b-[4px] text-white shadow-md hover:shadow-lg active:translate-y-[1px] transition-all duration-150 cursor-pointer select-none focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 ${themeClasses}`}
    >
      <span
        aria-hidden="true"
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/25 border-2 border-white/60 flex items-center justify-center shrink-0 text-white font-black shadow-inner group-hover:scale-105 transition-transform"
      >
        {badge}
      </span>
      <span className="text-xs sm:text-sm font-black text-white text-left leading-tight tracking-tight drop-shadow-xs">
        {label}
      </span>
    </button>
  );
}

/**
 * Encabezado superior con barra azul limpia y cinta interactiva «Volver a:» con botones 3D.
 */
function BreadcrumbBar({
  vistaTitulo,
  ofertaSeleccionada,
  ofertaObj,
  asignaturaSeleccionada,
  asignaturaThemeClasses,
  gradoSeleccionado,
  gradoThemeClasses,
  onGoVista1,
  onGoVista2,
  onGoVista3
}) {
  const enVistaInicial = !ofertaSeleccionada;
  const pasoNumero = !ofertaSeleccionada ? '1' : !asignaturaSeleccionada ? '2' : !gradoSeleccionado ? '3' : '4';

  const textoGuiaPaso = !ofertaSeleccionada
    ? 'Paso 1 de 4 · Seleccione una oferta educativa para consultar sus asignaturas'
    : !asignaturaSeleccionada
      ? 'Paso 2 de 4 · Seleccione la asignatura o área curricular'
      : !gradoSeleccionado
        ? 'Paso 3 de 4 · Seleccione el grado, nivel o subárea'
        : 'Paso 4 de 4 · Descargue los archivos curriculares oficiales';

  return (
    <div className="sticky top-0 z-30 bg-white">
      {/* Parte 1: Barra Azul Superior limpia */}
      <div className="bg-gradient-to-r from-[#003B71] via-[#017EC1] to-[#0267a0] px-5 py-4 sm:px-7 sm:py-5 text-white border-b-2 border-amber-500 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#003B71] border border-white/30 text-amber-300 text-sm sm:text-base font-black shrink-0 shadow-xs">
            {pasoNumero}
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
            {vistaTitulo}
          </h2>
        </div>

        <span className="text-blue-100 font-semibold text-xs sm:text-sm lg:text-base">
          {textoGuiaPaso}
        </span>
      </div>

      {/* Parte 2: Cinta Interactiva «Volver a:» con Botones Píldora 3D (Vistas 2, 3 y 4) */}
      {!enVistaInicial && (
        <nav
          aria-label="Ruta de navegación curricular"
          className="bg-slate-50/90 border-b border-slate-200 px-5 py-3 sm:px-7 sm:py-3.5 flex flex-wrap items-center gap-3 shadow-2xs"
        >
          {/* Etiqueta Volver a: */}
          <span className="text-sm sm:text-base lg:text-lg font-black text-slate-900 tracking-tight">
            Volver a:
          </span>

          {/* Botón 3D 1 — Oferta Seleccionada (Vistas 2, 3 y 4) */}
          {ofertaSeleccionada && (
            <MiniPillButton3D
              label={ofertaSeleccionada}
              badge={
                <OfertaIcon
                  ofertaCodigo={ofertaObj?.ofertaCodigo}
                  ofertaNombre={ofertaSeleccionada}
                  className="w-5 h-5 text-white"
                />
              }
              themeClasses={ofertaObj?.themeClasses || BUTTON_3D_THEMES[0].classes}
              onClick={onGoVista1}
              isCurrent={!asignaturaSeleccionada}
              title={`Volver a Ofertas Educativas (${ofertaSeleccionada})`}
            />
          )}

          {/* Botón 3D 2 — Asignatura Seleccionada (Vistas 3 y 4) */}
          {asignaturaSeleccionada && (
            <MiniPillButton3D
              label={asignaturaSeleccionada}
              badge={<AsignaturaIcon asignatura={asignaturaSeleccionada} className="w-5 h-5 text-white" />}
              themeClasses={asignaturaThemeClasses}
              onClick={onGoVista2}
              isCurrent={Boolean(asignaturaSeleccionada && !gradoSeleccionado)}
              title={`Volver a Asignaturas (${asignaturaSeleccionada})`}
            />
          )}

          {/* Botón 3D 3 — Grado Seleccionado (Vista 4) */}
          {gradoSeleccionado && (
            <MiniPillButton3D
              label={gradoSeleccionado}
              badge={
                <span className="text-xs sm:text-sm font-black tracking-tight leading-none">
                  {obtenerInsigniaGrado(gradoSeleccionado)}
                </span>
              }
              themeClasses={gradoThemeClasses}
              onClick={onGoVista3}
              isCurrent={Boolean(gradoSeleccionado)}
              title={`Volver a Grado (${gradoSeleccionado})`}
            />
          )}
        </nav>
      )}
    </div>
  );
}

export function GeneralTable({
  planes = [],
  onDownload = () => {},
  onDownloadAll = () => {},
  downloadingId = null,
  downloadNotice = null,
  resetKey = 0
}) {
  const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null);
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState(null);
  const [gradoSeleccionado, setGradoSeleccionado] = useState(null);

  // Detector reactivo de relación de aspecto (Alto > Ancho = Portrait vs Ancho >= Alto = Landscape)
  const [viewportSize, setViewportSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  }));

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isPortrait = viewportSize.height > viewportSize.width;
  const isCompactLandscape = !isPortrait && viewportSize.width < 1000;
  const useOrbitalLandscape = !isPortrait && !isCompactLandscape;

  // Reiniciar a la Vista 1 cuando el usuario presiona "Inicio" en el Header (cambia resetKey)
  useEffect(() => {
    if (resetKey > 0) {
      setOfertaSeleccionada(null);
      setAsignaturaSeleccionada(null);
      setGradoSeleccionado(null);
    }
  }, [resetKey]);

  // Navegación hacia atrás de un nivel (botón Volver y tecla Escape)
  const handleStepBack = () => {
    if (gradoSeleccionado) {
      setGradoSeleccionado(null);
    } else if (asignaturaSeleccionada) {
      setAsignaturaSeleccionada(null);
    } else if (ofertaSeleccionada) {
      setOfertaSeleccionada(null);
    }
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && (ofertaSeleccionada || asignaturaSeleccionada || gradoSeleccionado)) {
        if (document.querySelector('[role="dialog"]')) return;
        handleStepBack();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  // 1. Ofertas Educativas presentes en `planes`
  const ofertasDisponibles = useMemo(() => {
    const map = new Map();
    planes.forEach((p) => {
      if (p?.ofertaNombre && !map.has(p.ofertaNombre)) {
        map.set(p.ofertaNombre, {
          ofertaNombre: p.ofertaNombre,
          ofertaCodigo: p.ofertaCodigo || '',
          ofertaBadgeColor: p.ofertaBadgeColor || ''
        });
      }
    });
    return Array.from(map.values()).sort((a, b) => {
      const idxA = ORDEN_OFERTAS_CODIGO.indexOf(a.ofertaCodigo);
      const idxB = ORDEN_OFERTAS_CODIGO.indexOf(b.ofertaCodigo);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.ofertaNombre.localeCompare(b.ofertaNombre, 'es');
    });
  }, [planes]);

  // 2. Asignaturas únicas de la Oferta seleccionada (ordenadas alfabéticamente en español)
  const asignaturasDisponibles = useMemo(() => {
    if (!ofertaSeleccionada) return [];
    const setAsig = new Set();
    planes.forEach((p) => {
      if (p?.ofertaNombre === ofertaSeleccionada && p?.asignatura) {
        setAsig.add(p.asignatura);
      }
    });
    return Array.from(setAsig).sort((a, b) => a.localeCompare(b, 'es'));
  }, [planes, ofertaSeleccionada]);

  // 3. Grados únicos de la Oferta + Asignatura seleccionadas (ordenados con ordenarGrados)
  const gradosDisponibles = useMemo(() => {
    if (!ofertaSeleccionada || !asignaturaSeleccionada) return [];
    const setGrados = new Set();
    planes.forEach((p) => {
      if (
        p?.ofertaNombre === ofertaSeleccionada &&
        p?.asignatura === asignaturaSeleccionada &&
        p?.grado
      ) {
        setGrados.add(p.grado);
      }
    });
    return Array.from(setGrados).sort(ordenarGrados);
  }, [planes, ofertaSeleccionada, asignaturaSeleccionada]);

  // 4. Colores exactos (themeClasses) de los botones elegidos para la cinta «Volver a:»
  const ofertaActivaObj = useMemo(() => {
    if (!ofertaSeleccionada) return null;
    const idx = ofertasDisponibles.findIndex((o) => o.ofertaNombre === ofertaSeleccionada);
    const item = idx !== -1 ? ofertasDisponibles[idx] : null;
    return {
      ofertaNombre: ofertaSeleccionada,
      ofertaCodigo: item?.ofertaCodigo || '',
      ofertaBadgeColor: item?.ofertaBadgeColor || '',
      themeClasses: obtenerTemaPorIndice(idx !== -1 ? idx : 0, item?.ofertaBadgeColor)
    };
  }, [ofertaSeleccionada, ofertasDisponibles]);

  const asignaturaThemeClasses = useMemo(() => {
    if (!asignaturaSeleccionada) return BUTTON_3D_THEMES[0].classes;
    const idx = asignaturasDisponibles.indexOf(asignaturaSeleccionada);
    return obtenerTemaPorIndice(idx !== -1 ? idx : 0);
  }, [asignaturaSeleccionada, asignaturasDisponibles]);

  const gradoThemeClasses = useMemo(() => {
    if (!gradoSeleccionado) return BUTTON_3D_THEMES[0].classes;
    const idx = gradosDisponibles.indexOf(gradoSeleccionado);
    return obtenerTemaPorIndice(idx !== -1 ? idx : 0);
  }, [gradoSeleccionado, gradosDisponibles]);

  // 5. Registro curricular activo en la Vista 4 (Contenido)
  const planeamientoActivo = useMemo(() => {
    if (!ofertaSeleccionada || !asignaturaSeleccionada || !gradoSeleccionado) return null;
    const coincidencias = planes.filter(
      (p) =>
        p?.ofertaNombre === ofertaSeleccionada &&
        p?.asignatura === asignaturaSeleccionada &&
        p?.grado === gradoSeleccionado
    );
    if (coincidencias.length === 0) return null;
    if (coincidencias.length === 1) return coincidencias[0];

    const archivosConsolidados = coincidencias.flatMap((c) =>
      Array.isArray(c.archivos) ? c.archivos : []
    );
    return {
      ...coincidencias[0],
      archivos: archivosConsolidados
    };
  }, [planes, ofertaSeleccionada, asignaturaSeleccionada, gradoSeleccionado]);

  // Título exacto por vista
  const vistaTitulo = !ofertaSeleccionada
    ? 'Ofertas Educativas'
    : !asignaturaSeleccionada
      ? 'Asignaturas'
      : !gradoSeleccionado
        ? 'Grado'
        : 'Contenido';

  const handleGoVista1 = () => {
    setOfertaSeleccionada(null);
    setAsignaturaSeleccionada(null);
    setGradoSeleccionado(null);
  };

  const handleGoVista2 = () => {
    setAsignaturaSeleccionada(null);
    setGradoSeleccionado(null);
  };

  const handleGoVista3 = () => {
    setGradoSeleccionado(null);
  };

  // Estado vacío si no hay planeamientos cargados
  if (!Array.isArray(planes) || planes.length === 0) {
    return (
      <section
        data-orientation={isPortrait ? 'portrait' : 'landscape'}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6 flex-1 flex flex-col"
      >
        <BreadcrumbBar
          vistaTitulo={vistaTitulo}
          ofertaSeleccionada={null}
          ofertaObj={null}
          asignaturaSeleccionada={null}
          asignaturaThemeClasses=""
          gradoSeleccionado={null}
          gradoThemeClasses=""
          onGoVista1={handleGoVista1}
          onGoVista2={handleGoVista2}
          onGoVista3={handleGoVista3}
          onStepBack={handleStepBack}
        />
        <div className="p-12 text-center bg-white flex-1 flex items-center justify-center">
          <p className="text-base sm:text-lg font-bold text-slate-600">
            No hay planeamientos curriculares disponibles en este momento.
          </p>
        </div>
      </section>
    );
  }

  // ============================================================================
  // VISTA 1: OFERTAS EDUCATIVAS (/assets/images/profe.png + 7 ofertas en órbita)
  // ============================================================================
  const renderVistaOfertas = () => {
    const seleccionarOferta = (nombre) => {
      setOfertaSeleccionada(nombre);
      setAsignaturaSeleccionada(null);
      setGradoSeleccionado(null);
    };

    // Disposición Vertical (Alto > Ancho o pantalla < 1000px): Ilustración arriba y lista ordenada debajo
    if (!useOrbitalLandscape) {
      return (
        <div className="p-5 sm:p-8 bg-white flex-1 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center mb-6">
            <img
              src="/assets/images/profe.png"
              alt="Docente guía de Ofertas Educativas"
              style={{ width: 'clamp(190px, 44vw, 300px)' }}
              className="h-auto object-contain select-none mx-auto mix-blend-multiply"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl justify-items-center">
            {ofertasDisponibles.map((item, idx) => (
              <PillButton3D
                key={item.ofertaNombre}
                label={item.ofertaNombre}
                badge={
                  <OfertaIcon
                    ofertaCodigo={item.ofertaCodigo}
                    ofertaNombre={item.ofertaNombre}
                    className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                  />
                }
                themeClasses={obtenerTemaPorIndice(idx, item.ofertaBadgeColor)}
                onClick={() => seleccionarOferta(item.ofertaNombre)}
              />
            ))}
          </div>
        </div>
      );
    }

    // Disposición Horizontal Panorámica (Ancho >= Alto y >= 1000px): Escenario Orbital CSS Flow (Cero superposición garantizado)
    return (
      <div className="px-4 py-4 sm:px-6 sm:py-6 bg-white flex-1 flex flex-col items-center justify-center">
        <OrbitalFlowStage
          items={ofertasDisponibles}
          density="normal"
          centerNode={
            <img
              src="/assets/images/profe.png"
              alt="Docente guía de Ofertas Educativas"
              style={{ width: 'clamp(250px, 23vw, 370px)' }}
              className="h-auto object-contain select-none mx-auto mix-blend-multiply"
            />
          }
          renderButton={(item, idx, curveClass) => (
            <PillButton3D
              key={item.ofertaNombre}
              label={item.ofertaNombre}
              badge={
                <OfertaIcon
                  ofertaCodigo={item.ofertaCodigo}
                  ofertaNombre={item.ofertaNombre}
                  className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                />
              }
              themeClasses={obtenerTemaPorIndice(idx, item.ofertaBadgeColor)}
              onClick={() => seleccionarOferta(item.ofertaNombre)}
              density="normal"
              className={curveClass}
            />
          )}
        />
      </div>
    );
  };

  // ============================================================================
  // VISTA 2: ASIGNATURAS (/assets/images/bolso.png limpio + asignaturas en órbita 360°)
  // ============================================================================
  const renderVistaAsignaturas = () => {
    const seleccionarAsignatura = (asig) => {
      setAsignaturaSeleccionada(asig);
      setGradoSeleccionado(null);
    };

    // Disposición Vertical (Alto > Ancho o pantalla < 1000px): Bolso arriba y botones ordenados debajo
    if (!useOrbitalLandscape) {
      return (
        <div className="p-5 sm:p-8 bg-white flex-1 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center mb-6">
            <img
              src="/assets/images/bolso.png"
              alt="Bolso escolar de Asignaturas"
              style={{ width: 'clamp(180px, 42vw, 280px)' }}
              className="h-auto object-contain select-none mx-auto mix-blend-multiply"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl justify-items-center">
            {asignaturasDisponibles.map((asig, idx) => (
              <PillButton3D
                key={asig}
                label={asig}
                badge={<AsignaturaIcon asignatura={asig} className="w-7 h-7 sm:w-8 sm:h-8 text-white" />}
                themeClasses={obtenerTemaPorIndice(idx)}
                onClick={() => seleccionarAsignatura(asig)}
              />
            ))}
          </div>
        </div>
      );
    }

    // Disposición Horizontal Panorámica (Ancho >= Alto y >= 1000px): Escenario Orbital CSS Flow de 360° alrededor del bolso (Cero colisiones físicas, soporta 11, 13 o 21+ asignaturas)
    const totalAsignaturas = asignaturasDisponibles.length;
    const density = totalAsignaturas >= 15 ? 'high' : totalAsignaturas >= 9 ? 'medium' : 'normal';
    const widthBolsoCentral =
      density === 'high'
        ? 'clamp(175px, 16vw, 250px)'
        : density === 'medium'
          ? 'clamp(205px, 19vw, 295px)'
          : 'clamp(240px, 22vw, 360px)';
    const iconSizeClass =
      density === 'high'
        ? 'w-5 h-5 text-white'
        : density === 'medium'
          ? 'w-6 h-6 text-white'
          : 'w-7 h-7 sm:w-8 sm:h-8 text-white';

    return (
      <div className="px-4 py-4 sm:px-6 sm:py-6 bg-white flex-1 flex flex-col items-center justify-center">
        <OrbitalFlowStage
          items={asignaturasDisponibles}
          density={density}
          centerNode={
            <img
              src="/assets/images/bolso.png"
              alt="Bolso escolar de Asignaturas"
              style={{ width: widthBolsoCentral }}
              className="h-auto object-contain select-none mx-auto mix-blend-multiply"
            />
          }
          renderButton={(asig, idx, curveClass) => (
            <PillButton3D
              key={asig}
              label={asig}
              badge={<AsignaturaIcon asignatura={asig} className={iconSizeClass} />}
              themeClasses={obtenerTemaPorIndice(idx)}
              onClick={() => seleccionarAsignatura(asig)}
              density={density}
              className={curveClass}
            />
          )}
        />
      </div>
    );
  };

  // ============================================================================
  // VISTA 3: GRADO (/assets/images/cuaderno.png con asignatura impresa en portada)
  // ============================================================================
  const renderVistaGrado = () => {
    const renderCuaderno = (widthClamp) => (
      <div
        className="relative aspect-square flex items-center justify-center select-none"
        style={{ width: widthClamp }}
      >
        <img
          src="/assets/images/cuaderno.png"
          alt={`Cuaderno de ${asignaturaSeleccionada}`}
          className="w-full h-full object-contain select-none mx-auto mix-blend-multiply block"
        />
        <span
          style={{
            fontSize: obtenerFontSizeCuaderno(asignaturaSeleccionada || ''),
            wordBreak: 'normal',
            overflowWrap: 'normal',
            hyphens: 'none'
          }}
          className="pointer-events-none absolute left-[54%] top-[52%] -translate-x-1/2 -translate-y-1/2 w-[56%] text-center font-black uppercase text-slate-900 leading-tight tracking-tight"
        >
          {asignaturaSeleccionada}
        </span>
      </div>
    );

    // Disposición Vertical (Alto > Ancho o pantalla < 1000px): Cuaderno arriba y grados ordenados debajo
    if (!useOrbitalLandscape) {
      return (
        <div className="p-5 sm:p-8 bg-white flex-1 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center mb-6">
            {renderCuaderno('clamp(240px, 52vw, 350px)')}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl justify-items-center">
            {gradosDisponibles.map((grado, idx) => (
              <PillButton3D
                key={grado}
                label={grado}
                badge={
                  <span className="text-base sm:text-lg font-black tracking-tight leading-none">
                    {obtenerInsigniaGrado(grado)}
                  </span>
                }
                themeClasses={obtenerTemaPorIndice(idx)}
                onClick={() => setGradoSeleccionado(grado)}
              />
            ))}
          </div>
        </div>
      );
    }

    // Disposición Horizontal Panorámica (Ancho >= Alto y >= 1000px): Escenario Orbital CSS Flow alrededor del cuaderno (Cero superposición garantizado)
    const totalGrados = gradosDisponibles.length;
    const density = totalGrados >= 15 ? 'high' : totalGrados >= 9 ? 'medium' : 'normal';

    return (
      <div className="px-4 py-4 sm:px-6 sm:py-6 bg-white flex-1 flex flex-col items-center justify-center">
        <OrbitalFlowStage
          items={gradosDisponibles}
          density={density}
          centerNode={renderCuaderno('clamp(290px, 26vw, 420px)')}
          renderButton={(grado, idx, curveClass) => (
            <PillButton3D
              key={grado}
              label={grado}
              badge={
                <span className="text-base sm:text-lg font-black tracking-tight leading-none">
                  {obtenerInsigniaGrado(grado)}
                </span>
              }
              themeClasses={obtenerTemaPorIndice(idx)}
              onClick={() => setGradoSeleccionado(grado)}
              density={density}
              className={curveClass}
            />
          )}
        />
      </div>
    );
  };

  // ============================================================================
  // VISTA 4: CONTENIDO (+60% escala: Tabla CONTENIDO DESCARGABLE + «Descargar todo»)
  // ============================================================================
  const renderVistaContenido = () => {
    const doc = planeamientoActivo;
    const archivos = Array.isArray(doc?.archivos) ? doc.archivos : [];
    const avisoTexto =
      downloadNotice && typeof downloadNotice === 'object'
        ? downloadNotice.id === doc?.id
          ? downloadNotice.message
          : ''
        : typeof downloadNotice === 'string'
          ? downloadNotice
          : '';

    const formatearNombreEditorial = (nombreArchivo = '') => {
      const sinExt = nombreArchivo.replace(/\.[^/.]+$/, '');
      if (!sinExt) return nombreArchivo;
      return sinExt
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
    };

    const obtenerEstiloTipoArchivo = (tipo = 'PDF') => {
      const t = String(tipo).toUpperCase();
      if (t === 'DOCX' || t === 'DOC') {
        return {
          iconoBox: 'bg-blue-50 border-blue-200 text-[#017EC1]',
          boton: 'bg-blue-50 hover:bg-blue-100 text-[#003B71] border-blue-300',
          iconoDescarga: 'text-[#017EC1]'
        };
      }
      if (t === 'PDF') {
        return {
          iconoBox: 'bg-rose-50 border-rose-200 text-rose-700',
          boton: 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-300',
          iconoDescarga: 'text-amber-800'
        };
      }
      return {
        iconoBox: 'bg-blue-50 border-blue-200 text-[#017EC1]',
        boton: 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-300',
        iconoDescarga: 'text-amber-800'
      };
    };

    return (
      <div className="p-5 sm:p-8 lg:p-10 bg-white flex-1 flex flex-col items-center">
        {/* Tabla limpia centrada con cabecera CONTENIDO DESCARGABLE (+60% escala) */}
        <div className="max-w-5xl w-full mx-auto rounded-2xl border-2 border-[#017EC1]/35 overflow-hidden shadow-md bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-[#003B71] to-[#017EC1] text-white">
                <th
                  scope="col"
                  className="py-4 sm:py-5 px-6 text-base sm:text-xl lg:text-2xl font-black uppercase tracking-wide"
                >
                  CONTENIDO DESCARGABLE
                </th>
                <th
                  scope="col"
                  className="py-4 sm:py-5 px-6 text-right text-base sm:text-xl font-black uppercase tracking-wide"
                >
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/15 border border-white/30 text-amber-300 text-xs sm:text-sm font-extrabold tracking-normal normal-case">
                    {archivos.length}{' '}
                    {archivos.length === 1 ? 'documento disponible' : 'documentos disponibles'}
                  </span>
                  <span className="sr-only">
                    Descargar archivo ({archivos.length} {archivos.length === 1 ? 'archivo disponible' : 'archivos disponibles'})
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {archivos.length > 0 ? (
                archivos.map((arch, idx) => {
                  const tipoDoc = (arch.tipo || 'PDF').toUpperCase();
                  const estiloTipo = obtenerEstiloTipoArchivo(tipoDoc);
                  const tituloLegible = formatearNombreEditorial(arch.nombre);
                  return (
                    <tr
                      key={`${arch.nombre || 'archivo'}-${idx}`}
                      className="bg-white hover:bg-blue-50/50 transition-colors"
                    >
                      <td className="py-4 sm:py-5 px-5 sm:px-6 align-middle">
                        <div className="flex items-center gap-4">
                          <span
                            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center shrink-0 ${estiloTipo.iconoBox}`}
                          >
                            <IconDocument className="w-6 h-6" />
                          </span>
                          <div className="min-w-0">
                            <p
                              className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-800 break-words leading-snug"
                              title={arch.nombre}
                            >
                              {tituloLegible}
                            </p>
                            <p className="text-xs sm:text-sm text-slate-500 break-all">
                              {arch.nombre}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 sm:py-5 px-5 sm:px-6 align-middle text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onDownload(doc, arch)}
                          className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl border-2 font-black text-sm sm:text-base shadow-xs transition-all cursor-pointer ${estiloTipo.boton}`}
                          title={`Descargar archivo individual: ${arch.nombre} (${arch.tamanoLegible})`}
                        >
                          <span>
                            {tipoDoc} ({arch.tamanoLegible}) ↓
                          </span>
                          <IconDownload className={`w-5 h-5 shrink-0 ${estiloTipo.iconoDescarga}`} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={2} className="py-10 px-6 text-center text-base font-semibold text-slate-500">
                    No se encontraron archivos asociados a este nivel curricular.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Botón maestro «Descargar todo» ubicado justo debajo de la tabla (+60% escala) */}
        {doc && archivos.length > 0 && (
          <div className="max-w-5xl w-full mx-auto mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm sm:text-base text-slate-600">
              {avisoTexto ? (
                <p role="status" className="font-bold text-[#003B71]">
                  {avisoTexto}
                </p>
              ) : (
                <span>
                  Puede descargar cada documento individualmente o todos los documentos de este nivel.
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => onDownloadAll(doc)}
              disabled={Boolean(downloadingId)}
              className="px-7 sm:px-9 py-4 rounded-2xl bg-gradient-to-b from-[#017EC1] to-[#005a8d] hover:from-[#0284c7] hover:to-[#017EC1] border-b-[6px] border-[#003B71] text-white font-black text-base sm:text-lg lg:text-xl shadow-xl active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-3.5 cursor-pointer shrink-0"
              title={`Solicitar la descarga de los ${archivos.length} archivos de ${doc.asignatura} (${doc.grado})`}
            >
              <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 border-2 border-white/70 flex items-center justify-center shrink-0">
                <IconDownload className="w-6 h-6 text-white" />
              </span>
              <span>
                {downloadingId === doc.id
                  ? 'Solicitando descargas...'
                  : `Descargar todo (${archivos.length})`}
              </span>
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      data-orientation={isPortrait ? 'portrait' : 'landscape'}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6 flex-1 flex flex-col"
    >
      <BreadcrumbBar
        vistaTitulo={vistaTitulo}
        ofertaSeleccionada={ofertaSeleccionada}
        ofertaObj={ofertaActivaObj}
        asignaturaSeleccionada={asignaturaSeleccionada}
        asignaturaThemeClasses={asignaturaThemeClasses}
        gradoSeleccionado={gradoSeleccionado}
        gradoThemeClasses={gradoThemeClasses}
        onGoVista1={handleGoVista1}
        onGoVista2={handleGoVista2}
        onGoVista3={handleGoVista3}
        onStepBack={handleStepBack}
      />

      {!ofertaSeleccionada && renderVistaOfertas()}
      {ofertaSeleccionada && !asignaturaSeleccionada && renderVistaAsignaturas()}
      {ofertaSeleccionada && asignaturaSeleccionada && !gradoSeleccionado && renderVistaGrado()}
      {ofertaSeleccionada && asignaturaSeleccionada && gradoSeleccionado && renderVistaContenido()}
    </section>
  );
}
