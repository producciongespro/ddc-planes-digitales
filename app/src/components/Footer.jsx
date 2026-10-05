import React, { useState, useEffect } from 'react';
import appVersion from '../data/version.json';

export function Footer() {
  const [indexTexto, setIndexTexto] = useState(0);
  const [visible, setVisible] = useState(true);

  // Lista de textos a alternar configurados en version.json
  const textos = [
    appVersion.institucion,
    appVersion.direccion
  ].filter(Boolean);

  // Intervalo recomendado: 4.5 segundos (tiempo ideal de lectura cómoda + transición fluida)
  useEffect(() => {
    if (textos.length <= 1) return;

    const interval = setInterval(() => {
      // 1. Inicia desvanecimiento suave (fade-out)
      setVisible(false);

      // 2. Cambia el texto en el punto de opacidad cero y hace fade-in
      setTimeout(() => {
        setIndexTexto((prev) => (prev + 1) % textos.length);
        setVisible(true);
      }, 300);
    }, 4500);

    return () => clearInterval(interval);
  }, [textos.length]);

  // Construcción dinámica de la versión completa sin duplicar datos: versión + compilado
  const versionCompleta = appVersion.compilado
    ? (String(appVersion.compilado).startsWith('.')
        ? `${appVersion.version}${appVersion.compilado}`
        : `${appVersion.version}.${appVersion.compilado}`)
    : appVersion.version;

  const textoActual = textos[indexTexto] || appVersion.institucion;

  return (
    <footer className="w-full bg-transparent bg-[url('/assets/images/footer.jpg')] bg-repeat-x bg-center bg-cover border-none mt-auto select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 py-1.5 px-4 sm:px-6 lg:px-8 min-h-[34px]">
        {/* Leyenda oficial dinámica que alterna suavemente entre Institución y Dirección */}
        <div className="flex items-center min-w-0 py-0.5">
          <p
            className={`text-xs sm:text-[12.5px] text-white/90 font-medium tracking-wide transition-all duration-300 ease-in-out truncate ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
            }`}
          >
            {textoActual}
          </p>
        </div>

        {/* Badge de estado del sistema (dinámico desde version.json con tooltip de auditoría) */}
        <div className="flex items-center flex-shrink-0">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-xs shadow-xs font-medium whitespace-nowrap select-none cursor-default"
            title={`${appVersion.estado} · Versión ${versionCompleta} (${appVersion.liberacion}) · Compilación: ${appVersion.compilacion}`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {appVersion.estado} v{versionCompleta}
          </span>
        </div>
      </div>
    </footer>
  );
}
