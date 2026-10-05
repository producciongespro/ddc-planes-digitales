import React, { useState, useEffect, useMemo } from 'react';
import { loadPlanesFromStorage, savePlanesToStorage } from './data/planes2027Data';
import { Header } from './components/Header';
import { WelcomeHero } from './components/WelcomeHero';
import { GeneralTable } from './components/GeneralTable';
import { TopDownloads } from './components/TopDownloads';
import { Footer } from './components/Footer';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { AboutModal } from './components/AboutModal';

export default function App() {
  // Estado principal de los 197 planeamientos 2027 persistidos en localStorage
  const [planes, setPlanes] = useState(() => loadPlanesFromStorage());

  // Estado unificado de filtros en cascada
  const [filtros, setFiltros] = useState({
    texto: '',
    oferta: '',
    asignatura: '',
    grado: ''
  });

  // Modales institucionales
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Estado del tema Claro / Oscuro con persistencia en localStorage
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('mep-theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Aplicar clase 'dark' a <html> y persistir preferencia de tema
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      try {
        localStorage.setItem('mep-theme', 'dark');
      } catch (e) {
        console.error(e);
      }
    } else {
      root.classList.remove('dark');
      try {
        localStorage.setItem('mep-theme', 'light');
      } catch (e) {
        console.error(e);
      }
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // Sincronizar cambios de planes en localStorage
  useEffect(() => {
    savePlanesToStorage(planes);
  }, [planes]);

  // Cálculos de métricas globales
  const totalDescargas = useMemo(() => {
    return planes.reduce((acc, curr) => acc + (curr.descargas || 0), 0);
  }, [planes]);

  // Manejador central de descarga de planeamientos en formato ZIP
  const handleDownload = (doc, fileObj = null) => {
    // 1. Actualizar estado y persistencia de descargas
    setPlanes((prevPlanes) => {
      const updated = prevPlanes.map((item) => {
        if (item.id === doc.id) {
          return { ...item, descargas: item.descargas + 1 };
        }
        return item;
      });
      savePlanesToStorage(updated);
      return updated;
    });

    // 2. Identificar el archivo a descargar (archivo específico o el principal)
    const archivoDestino = fileObj || (doc.archivos && doc.archivos[0]) || {
      ruta: doc.rutaDescarga,
      nombre: doc.archivoPrincipal || `${doc.id}.zip`
    };

    // 3. Disparar descarga local en el navegador
    const link = document.createElement('a');
    link.href = archivoDestino.ruta;
    link.download = archivoDestino.nombre;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Limpiar todos los filtros activos
  const handleResetFiltros = () => {
    setFiltros({
      texto: '',
      oferta: '',
      asignatura: '',
      grado: ''
    });
  };

  // Restablecer contadores a cero absoluto (función de mantenimiento institucional)
  const handleConfirmReset = () => {
    const planesCero = planes.map((p) => ({ ...p, descargas: 0 }));
    savePlanesToStorage(planesCero);
    setPlanes(planesCero);
    handleResetFiltros();
  };

  return (
    <div className="h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200 overflow-hidden">
      {/* 1. SECCIÓN: ENCABEZADO (Siempre fijo arriba) */}
      <div className="flex-shrink-0 z-20 shadow-md">
        <Header
          totalDocs={planes.length}
          totalDescargas={totalDescargas}
          onResetData={() => setIsResetModalOpen(true)}
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          onOpenAbout={() => setIsAboutModalOpen(true)}
        />
      </div>

      {/* 2. SECCIÓN: CONTENIDO PRINCIPAL (Única área con scroll vertical fluido) */}
      <div className="flex-1 overflow-y-auto min-h-0 focus:outline-none">
        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* BANNER INSTITUCIONAL COMPACTO DE BIENVENIDA (DDC · MEP) */}
          <WelcomeHero onOpenAbout={() => setIsAboutModalOpen(true)} />

          {/* 2.1 PRIMERA SECCIÓN MAESTRA (HERO): CATÁLOGO OFICIAL 2027 (FILTROS + TABLA INTEGRADOS) */}
          <GeneralTable
            planes={planes}
            onDownload={handleDownload}
            filtros={filtros}
            onFiltrosChange={setFiltros}
            onResetFiltros={handleResetFiltros}
          />

          {/* 2.2 SEGUNDA SECCIÓN: TOP DE DESCARGAS DOCENTES */}
          <TopDownloads
            planes={planes}
            onDownload={handleDownload}
          />
        </main>
      </div>

      {/* 3. SECCIÓN: PIE DE PÁGINA (Siempre fijo abajo con animación DDC) */}
      <div className="flex-shrink-0 z-20 shadow-lg">
        <Footer />
      </div>

      {/* MODAL PROFESIONAL DE CONFIRMACIÓN PARA RESTABLECER DATOS */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
      />

      {/* MODAL INSTITUCIONAL "ACERCA DE LA DDC Y EL REPOSITORIO" */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
}
