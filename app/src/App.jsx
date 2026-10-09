import React, { useState, useEffect, useMemo } from 'react';
import { fetchPlanesCatalog, saveDownloadsToStorage } from './data/planes2027Data';
import { Header } from './components/Header';
import { WelcomeHero } from './components/WelcomeHero';
import { GeneralTable } from './components/GeneralTable';
import { TopDownloads } from './components/TopDownloads';
import { Footer } from './components/Footer';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { AboutModal } from './components/AboutModal';
import { SplashScreen } from './components/SplashScreen';

export default function App() {
  // Estado principal del catálogo de 197 planeamientos cargado asíncronamente
  const [planes, setPlanes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // Carga asíncrona desacoplada del catálogo curricular oficial desde /data/planes2027.json
  const cargarCatalogo = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const data = await fetchPlanesCatalog();
      setPlanes(data);
    } catch (err) {
      console.error('Error al cargar catálogo curricular:', err);
      setLoadError(err.message || 'No fue posible conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarCatalogo();
  }, []);

  // Estado unificado de filtros
  const [filtros, setFiltros] = useState({
    texto: '',
    ofertas: [],
    asignaturas: [],
    grados: []
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

  // Cálculos de métricas globales
  const totalDescargas = useMemo(() => {
    return planes.reduce((acc, curr) => acc + (curr.descargas || 0), 0);
  }, [planes]);

  // Disparador unitario de descarga segura en el navegador
  const triggerBrowserDownload = (ruta, nombre) => {
    if (!ruta) return;
    const link = document.createElement('a');
    link.href = ruta;
    link.download = nombre || 'planeamiento.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Manejador central de descarga de planeamientos en formato ZIP (individual o paquete completo)
  const handleDownload = (doc, fileObj = null) => {
    // 1. Actualizar estado y persistencia de descargas
    setPlanes((prevPlanes) => {
      const updated = prevPlanes.map((item) => {
        if (item.id === doc.id) {
          return { ...item, descargas: (item.descargas || 0) + 1 };
        }
        return item;
      });
      saveDownloadsToStorage(updated);
      return updated;
    });

    // 2. Si se solicitó un archivo individual específico (clic directo en un chip)
    if (fileObj) {
      triggerBrowserDownload(fileObj.ruta, fileObj.nombre);
      return;
    }

    // 3. Descarga de todos los archivos asociados a la fila
    const listaArchivos = (doc.archivos && doc.archivos.length > 0)
      ? doc.archivos
      : [{
          ruta: doc.rutaDescarga,
          nombre: doc.archivoPrincipal || `${doc.id}.zip`
        }];

    // Descarga secuencial con micro-intervalo (350ms) para garantizar que el navegador no bloquee descargas múltiples
    listaArchivos.forEach((archivo, index) => {
      setTimeout(() => {
        triggerBrowserDownload(archivo.ruta, archivo.nombre);
      }, index * 350);
    });
  };

  // Limpiar todos los filtros activos
  const handleResetFiltros = () => {
    setFiltros({
      texto: '',
      ofertas: [],
      asignaturas: [],
      grados: []
    });
  };

  // Restablecer contadores a cero absoluto (función de mantenimiento institucional)
  const handleConfirmReset = () => {
    const planesCero = planes.map((p) => ({ ...p, descargas: 0 }));
    saveDownloadsToStorage(planesCero);
    setPlanes(planesCero);
    handleResetFiltros();
  };

  // 0. PANTALLA DE CARGA (SPLASH SCREEN) O ERROR DE RED
  if (isLoading || loadError) {
    return (
      <SplashScreen
        error={loadError}
        onRetry={cargarCatalogo}
      />
    );
  }

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
