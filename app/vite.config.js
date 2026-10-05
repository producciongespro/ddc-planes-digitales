import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

function formatBytes(bytes) {
  if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(1) + ' GB';
  if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + ' MB';
  if (bytes >= 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes > 0) return bytes + ' B';
  return '0 KB';
}

function dynamicPlanesDevPlugin() {
  return {
    name: 'dynamic-planes-dev-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if (url === '/api/listar_planes.php' || url === '/api/listar_planes') {
          try {
            const root = server.config.root || process.cwd();
            const catalogPath = path.join(root, 'src/data/planes2027.json');
            const storageBase = path.join(root, 'public/aplicativo-planeamientos-2027');

            if (!fs.existsSync(catalogPath)) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: true, mensaje: 'Catálogo no encontrado' }));
              return;
            }

            const rawCatalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
            const resultado = rawCatalog.map((plane) => {
              const relPath = (plane.rutaRelativa || '').replace(/[\\/]/g, path.sep);
              const folderPath = path.join(storageBase, relPath);
              const archivosEncontrados = [];

              if (fs.existsSync(folderPath)) {
                const files = fs.readdirSync(folderPath);
                files.forEach((file) => {
                  if (file.startsWith('.')) return;
                  const fullFile = path.join(folderPath, file);
                  try {
                    const stats = fs.statSync(fullFile);
                    if (stats.isFile()) {
                      const ext = path.extname(file).replace('.', '').toUpperCase() || 'ZIP';
                      const urlRuta = `/aplicativo-planeamientos-2027/${(plane.rutaRelativa || '').replace(/\\/g, '/')}/${encodeURIComponent(file)}`;
                      archivosEncontrados.push({
                        nombre: file,
                        tipo: ext,
                        ruta: urlRuta,
                        tamanoBytes: stats.size,
                        tamanoLegible: formatBytes(stats.size)
                      });
                    }
                  } catch (e) {
                    // Ignorar errores en archivos bloqueados
                  }
                });
              }

              return {
                ...plane,
                archivos: archivosEncontrados,
                archivoPrincipal: archivosEncontrados.length > 0 ? archivosEncontrados[0].nombre : null,
                rutaDescarga: archivosEncontrados.length > 0 ? archivosEncontrados[0].ruta : null
              };
            });

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.setHeader('Cache-Control', 'no-cache');
            res.end(JSON.stringify(resultado));
            return;
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: true, detalle: err.message }));
            return;
          }
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dynamicPlanesDevPlugin()
  ],
  server: {
    port: 5173,
    open: false
  }
});
