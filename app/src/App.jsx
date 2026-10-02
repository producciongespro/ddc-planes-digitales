import React, { useState, useEffect, useMemo } from 'react';
import { loadPlanesFromStorage, savePlanesToStorage, INITIAL_PLANES } from './data/planesData';
import { Header } from './components/Header';
import { SearchArea } from './components/SearchArea';
import { TopDownloads } from './components/TopDownloads';
import { GeneralTable } from './components/GeneralTable';
import { Footer } from './components/Footer';
import { PdfPreviewModal } from './components/PdfPreviewModal';

export default function App() {
  // Estado principal de los planes cargados desde localStorage con la clave 'mep-ddc-planes'
  const [planes, setPlanes] = useState(() => loadPlanesFromStorage());

  // Restricción: El docente solo podrá previsualizar un PDF a la vez
  const [previewDoc, setPreviewDoc] = useState(null);

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

  // Restablecer datos iniciales de prueba si se requiere
  const handleResetData = () => {
    if (window.confirm('¿Desea restablecer los datos originales de descargas?')) {
      savePlanesToStorage(INITIAL_PLANES);
      setPlanes(INITIAL_PLANES);
      setPreviewDoc(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* 1. SECCIÓN: ENCABEZADO */}
      <Header
        totalDocs={planes.length}
        totalDescargas={totalDescargas}
        onResetData={handleResetData}
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
      />

      {/* 2. SECCIÓN: CONTENIDO PRINCIPAL */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner de bienvenida estilo Biblioteca Digital Corporativa */}
        <div className="mb-8 bg-white dark:bg-slate-900 border-l-4 border-blue-700 dark:border-blue-500 rounded-r-xl p-5 shadow-sm border-y border-r border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Bienvenido al Sistema de Gestión Curricular Digital (DDC)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Consulte, previsualice y descargue los programas oficiales para el planeamiento didáctico de Primaria (I y II Ciclo) y Secundaria (III Ciclo y Diversificada Académica / Técnica).
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>144 Planes Oficiales Verificados</span>
          </div>
        </div>

        {/* 2.1 PRIMER ÁREA: BÚSQUEDA DE DOCUMENTOS POR FILTROS */}
        <SearchArea
          planes={planes}
          onPreview={handlePreview}
          onDownload={handleDownload}
        />

        {/* 2.2 SEGUNDA ÁREA: TOP DE DESCARGAS (4 a 10 DOCUMENTOS) */}
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

      {/* 3. SECCIÓN: PIE DE PÁGINA */}
      <Footer />

      {/* VISOR MODAL DE PREVISUALIZACIÓN (Regla: Solo 1 PDF a la vez y descargarlo) */}
      <PdfPreviewModal
        documento={previewDoc}
        onClose={handleClosePreview}
        onDownload={handleDownload}
      />
    </div>
  );
}
