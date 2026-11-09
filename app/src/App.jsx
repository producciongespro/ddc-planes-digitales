import React, { useState, useEffect, useRef } from 'react';
import { fetchPlanesCatalog } from './data/planes2027Data';
import { Header } from './components/Header';
import { GeneralTable } from './components/GeneralTable';
import { Footer } from './components/Footer';
import { AboutModal } from './components/AboutModal';
import { SplashScreen } from './components/SplashScreen';

export default function App() {
  // Estado principal del catálogo de 197 planeamientos cargado asíncronamente
  const [planes, setPlanes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadNotice, setDownloadNotice] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const bulkInProgress = useRef(false);

  // Carga asíncrona desacoplada del catálogo curricular oficial desde /data/ddc-datos.json
  const cargarCatalogo = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const inicio = Date.now();
      const data = await fetchPlanesCatalog();
      const restante = Math.max(0, 4000 - (Date.now() - inicio));
      if (restante > 0 && import.meta.env.MODE !== 'test') {
        await new Promise((resolve) => setTimeout(resolve, restante));
      }
      setPlanes(data);
    } catch (err) {
      console.error('Error al cargar catálogo curricular:', err);
      setLoadError(err.message || 'No fue posible conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Asegurar lienzo claro institucional limpio eliminando cualquier clase 'dark' residual
    document.documentElement.classList.remove('dark');
    cargarCatalogo();
  }, []);

  // Modales institucionales
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Disparador unitario de descarga segura en el navegador
  const triggerBrowserDownload = (ruta, nombre) => {
    if (!ruta) return;
    const link = document.createElement('a');
    link.href = ruta;
    link.download = nombre || 'planeamiento.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Descarga individual de un archivo curricular
  const handleDownload = (_doc, fileObj) => {
    if (fileObj) triggerBrowserDownload(fileObj.ruta, fileObj.nombre);
  };

  // Descarga completa de los archivos del nivel seleccionado (1 o múltiples archivos)
  const handleDownloadAll = async (doc) => {
    if (!doc || bulkInProgress.current) return;
    const files = Array.isArray(doc.archivos) ? doc.archivos : [];
    if (files.length === 0) return;

    if (files.length === 1) {
      triggerBrowserDownload(files[0].ruta, files[0].nombre);
      setDownloadNotice({
        id: doc.id,
        message: 'Se inició la descarga del archivo curricular oficial.'
      });
      return;
    }

    bulkInProgress.current = true;
    setDownloadingId(doc.id);
    setDownloadNotice(null);
    try {
      for (const [index, file] of files.entries()) {
        if (index > 0) await new Promise((resolve) => setTimeout(resolve, 350));
        triggerBrowserDownload(file.ruta, file.nombre);
      }
      setDownloadNotice({
        id: doc.id,
        message: `Se solicitaron ${files.length} descargas. Si el navegador solicita permiso para descargar varios archivos, permítalo.`
      });
    } catch {
      setDownloadNotice({
        id: doc.id,
        message: 'No se pudieron solicitar todas las descargas. Descargue los archivos individualmente.'
      });
    } finally {
      bulkInProgress.current = false;
      setDownloadingId(null);
    }
  };

  // Volver a la Vista 1 (Ofertas Educativas) desde el botón Inicio del Header
  const handleGoHome = () => {
    setDownloadNotice(null);
    setResetKey((prev) => prev + 1);
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
    <div className="h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
      {/* 0. WCAG 2.4.1: Enlace accesible de salto al contenido principal (Skip Link) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-blue-700 focus:text-white focus:font-bold focus:text-xs focus:rounded-xl focus:shadow-2xl focus:ring-4 focus:ring-amber-400 focus:outline-none transition-all"
      >
        Saltar al catálogo de planeamientos
      </a>

      {/* 1. SECCIÓN: ENCABEZADO (Siempre fijo arriba) */}
      <div className="flex-shrink-0 z-20 shadow-md">
        <Header
          onGoHome={handleGoHome}
          onOpenAbout={() => setIsAboutModalOpen(true)}
        />
      </div>

      {/* 2. SECCIÓN: CONTENIDO PRINCIPAL (Única área con scroll vertical fluido) */}
      <div className="flex-1 overflow-y-auto min-h-0 bg-white focus:outline-none">
        <main
          id="main-content"
          tabIndex="-1"
          className="max-w-[1600px] w-full mx-auto px-3 sm:px-6 lg:px-10 py-4 sm:py-6 focus:outline-none min-h-full flex flex-col"
        >
          {/* Flujo interactivo guiado de 4 vistas progresivas */}
          <GeneralTable
            planes={planes}
            onDownload={handleDownload}
            onDownloadAll={handleDownloadAll}
            downloadingId={downloadingId}
            downloadNotice={downloadNotice}
            resetKey={resetKey}
          />
        </main>
      </div>

      {/* 3. SECCIÓN: PIE DE PÁGINA (Siempre fijo abajo) */}
      <div className="flex-shrink-0 z-20 shadow-lg">
        <Footer />
      </div>

      {/* MODAL INSTITUCIONAL "ACERCA DE LA DDC Y EL REPOSITORIO" */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
}
