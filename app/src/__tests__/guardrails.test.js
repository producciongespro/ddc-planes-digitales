import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Suite 4: guardrails (Auditoría Automatizada de Seguridad y Arnés)', () => {
  const rootDir = path.resolve(__dirname, '../../');
  const srcDir = path.join(rootDir, 'src');
  const catalogPath = path.join(rootDir, 'public/data/planes2027.json');

  // Función auxiliar recursiva para listar archivos de código excluyendo pruebas
  function getProductionFilesRecursively(dir, extensions = ['.js', '.jsx', '.json', '.html']) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== '__tests__') {
          results = results.concat(getProductionFilesRecursively(filePath, extensions));
        }
      } else {
        if (extensions.some((ext) => file.endsWith(ext))) {
          results.push(filePath);
        }
      }
    });
    return results;
  }

  it('TEST-18: Certificación Anti-Mojibake en código fuente y catálogo JSON', () => {
    const filesToAudit = [
      ...getProductionFilesRecursively(srcDir),
      catalogPath
    ];

    const mojibakePatterns = [
      'Ã¡', 'Ã©', 'Ã­', 'Ã³', 'Ãº', 'Ã±', 'Ã‘', 'Â°', 'â€“', 'â€”', 'Ã', 'Ã‰', 'Ã', 'Ã“', 'Ãš'
    ];

    const corruptedFiles = [];

    filesToAudit.forEach((filePath) => {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        mojibakePatterns.forEach((pattern) => {
          if (content.includes(pattern)) {
            corruptedFiles.push({ file: path.relative(rootDir, filePath), pattern });
          }
        });
      }
    });

    expect(
      corruptedFiles,
      `Se detectó mojibake en los siguientes archivos: ${JSON.stringify(corruptedFiles)}`
    ).toEqual([]);
  });

  it('TEST-19: Certificación Zero-Windows-Paths en public/data/planes2027.json', () => {
    expect(fs.existsSync(catalogPath)).toBe(true);
    const content = fs.readFileSync(catalogPath, 'utf8');
    const catalog = JSON.parse(content);

    expect(Array.isArray(catalog)).toBe(true);
    expect(catalog.length).toBe(197);

    catalog.forEach((item) => {
      expect(item).not.toHaveProperty('carpetaFisica');
      expect(item.rutaRelativa).not.toMatch(/^[a-zA-Z]:\\/);
      expect(item.rutaDescarga).not.toMatch(/^[a-zA-Z]:\\/);
      expect(item.rutaDescarga).toMatch(/^\/aplicativo-planeamientos-2027\//);
    });
  });

  it('TEST-20: Certificación de Desacople del Bundle en React (Cero import de planes2027.json)', () => {
    const srcFiles = getProductionFilesRecursively(srcDir, ['.js', '.jsx']);
    const offendingImports = [];

    srcFiles.forEach((filePath) => {
      const content = fs.readFileSync(filePath, 'utf8');
      if (/import\s+.*from\s+['"].*planes2027\.json['"]/i.test(content)) {
        offendingImports.push(path.relative(rootDir, filePath));
      }
    });

    expect(
      offendingImports,
      `Los siguientes archivos acoplan el catálogo al bundle de React: ${offendingImports.join(', ')}`
    ).toEqual([]);
  });

  it('TEST-21: Certificación de tratamiento de respeto institucional («usted»)', () => {
    const welcomeHeroPath = path.join(srcDir, 'components/WelcomeHero.jsx');
    if (fs.existsSync(welcomeHeroPath)) {
      const content = fs.readFileSync(welcomeHeroPath, 'utf8');
      expect(content).not.toMatch(/\btu planeamiento\b/i);
      expect(content).not.toMatch(/\bdescarga tus\b/i);
    }
  });
});
