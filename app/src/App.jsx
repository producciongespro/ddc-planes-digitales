import React, { useState, useEffect, useMemo } from 'react';
import { loadPlanesFromStorage, savePlanesToStorage, INITIAL_PLANES } from './data/planesData';
import { Header } from './components/Header';
import { SearchArea } from './components/SearchArea';
import { TopDownloads } from './components/TopDownloads';
import { GeneralTable } from './components/GeneralTable';
import { Footer } from './components/Footer';
import { PdfPreviewModal } from './components/PdfPreviewModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { WelcomeHero } from './components/WelcomeHero';
import { AboutModal } from './components/AboutModal';

export default function App() {
  // Estado principal de los planes cargados desde localStorage con la clave 'mep-ddc-planes'
  const [planes, setPlanes] = useState(() => loadPlanesFromStorage());

  // Restricción: El docente solo podrá previsualizar un PDF a la vez
  const [previewDoc, setPreviewDoc] = useState(null);

  // Estado para el modal profesional de confirmación de reseteo
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Estado para el modal institucional "Acerca de la DDC"
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Clave para disparar la limpieza de filtros en SearchArea
  const [searchResetKey, setSearchResetKey] = useState(0);

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

  // Manejador para previsualizar: asegura que solo 1 documento esté activo
  const handlePreview = (doc) => {
    setPreviewDoc(doc);
  };

  const handleClosePreview = () => {
    setPreviewDoc(null);
  };

  // Manejador para descargar documento y actualizar contador en localStorage
  const handleDownload = (doc) => {
    // 1. Actualizar estado y localStorage incrementando descargas
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

    // 2. Si el documento actual está en previsualización, actualizar su contador
    if (previewDoc && previewDoc.id === doc.id) {
      setPreviewDoc((prev) => (prev ? { ...prev, descargas: prev.descargas + 1 } : null));
    }

    // 3. Disparar descarga directa del archivo PDF oficial
    const link = document.createElement('a');
    link.href = doc.ruta;
    link.download = doc.archivo || `${doc.nombre}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Abrir modal profesional de restablecimiento de datos
  const handleOpenResetModal = () => {
    setIsResetModalOpen(true);
  };

  // Confirmar y ejecutar restablecimiento de fábrica (a 0 descargas y limpieza de filtros)
  const handleConfirmReset = () => {
    const planesCero = planes.map((p) => ({ ...p, descargas: 0 }));
    savePlanesToStorage(planesCero);
    setPlanes(planesCero);
    setPreviewDoc(null);
    setSearchResetKey((prev) => prev + 1);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200 overflow-hidden">
      {/* 1. SECCIÓN: ENCABEZADO (Siempre visible arriba) */}
      <div className="flex-shrink-0 z-20 shadow-md">
        <Header
          totalDocs={planes.length}
          totalDescargas={totalDescargas}
          onResetData={handleOpenResetModal}
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          onOpenAbout={() => setIsAboutModalOpen(true)}
        />
      </div>

      {/* 2. SECCIÓN: CONTENIDO PRINCIPAL (Única área con scroll vertical) */}
      <div className="flex-1 overflow-y-auto min-h-0 focus:outline-none">
        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* BANNER INSTITUCIONAL COMPACTO DE BIENVENIDA (DDC · MEP) */}
          <WelcomeHero onOpenAbout={() => setIsAboutModalOpen(true)} />

          {/* 2.1 PRIMER ÁREA: BÚSQUEDA DE DOCUMENTOS POR FILTROS */}
          <SearchArea
            planes={planes}
            onPreview={handlePreview}
            onDownload={handleDownload}
            resetKey={searchResetKey}
          />

          {/* 2.2 SEGUNDA ÁREA: TOP DE DESCARGAS (4 a 16 DOCUMENTOS) */}
          <TopDownloads
            planes={planes}
            onPreview={handlePreview}
            onDownload={handleDownload}
          />

          {/* 2.3 TERCERA ÁREA: TABLA GENERAL POR CICLO, ASIGNATURA Y NIVEL */}
          <GeneralTable
            planes={planes}
            onPreview={handlePreview}
            onDownload={handleDownload}
          />
        </main>
      </div>

      {/* 3. SECCIÓN: PIE DE PÁGINA (Siempre visible abajo) */}
      <div className="flex-shrink-0 z-20 shadow-lg">
        <Footer />
      </div>

      {/* VISOR MODAL DE PREVISUALIZACIÓN (Regla: Solo 1 PDF a la vez y descargarlo) */}
      <PdfPreviewModal
        documento={previewDoc}
        onClose={handleClosePreview}
        onDownload={handleDownload}
      />

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
