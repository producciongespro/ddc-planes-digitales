import fs from 'fs';
import path from 'path';

function createInstitutionalPdf(doc) {
  const content = `BT
/F1 18 Tf
50 720 Td
(MINISTERIO DE EDUCACION PUBLICA DE COSTA RICA) Tj
/F1 13 Tf
0 -26 Td
(DIRECCION DE DESARROLLO CURRICULAR - DDC) Tj
/F2 11 Tf
0 -22 Td
(Biblioteca Digital Corporativa de Planes de Estudio) Tj
0 -36 Td
/F1 15 Tf
(PLAN DE ESTUDIO OFICIAL: ${doc.asignatura.toUpperCase()}) Tj
/F2 12 Tf
0 -22 Td
(Nivel: ${doc.nivelEducativo}  |  Ciclo: ${doc.ciclo}  |  Modalidad: ${doc.modalidad}) Tj
0 -18 Td
(Tipo de Asignatura: ${doc.tipo}  |  Grado: ${doc.grado}) Tj
0 -18 Td
(Codigo Curricular: ${doc.codigo}) Tj
0 -32 Td
/F1 12 Tf
(1. PROPOSITO INSTITUCIONAL DE LA ASIGNATURA:) Tj
/F2 10.5 Tf
0 -18 Td
(El presente programa oficial orienta la mediacion pedagogica del cuerpo docente,) Tj
0 -15 Td
(fortaleciendo el pensamiento critico, cientifico, humanista y los aprendizajes significativos.) Tj
0 -28 Td
/F1 12 Tf
(2. LINEAMIENTOS METODOLOGICOS Y EVALUACION:) Tj
/F2 10.5 Tf
0 -18 Td
(- Metodologia basada en la indagacion, resolucion colaborativa y formacion integral.) Tj
0 -15 Td
(- Evaluacion diagnostica, formativa y sumativa articulada con el perfil de salida MEP.) Tj
0 -15 Td
(- Promocion activa de valores eticos, ciudadanos, ambientales y de inclusion digital.) Tj
0 -35 Td
/F2 9.5 Tf
(DDC - San Jose, Costa Rica. Repositorio Oficial DDC Planes Digitales - Vigencia 2026.) Tj
ET`;

  const streamLength = Buffer.byteLength(content, 'latin1');

  let pdf = `%PDF-1.4\n`;
  const offsets = [];

  offsets.push(pdf.length);
  pdf += `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;

  offsets.push(pdf.length);
  pdf += `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`;

  offsets.push(pdf.length);
  pdf += `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> >>\nendobj\n`;

  offsets.push(pdf.length);
  pdf += `4 0 obj\n<< /Length ${streamLength} >>\nstream\n${content}\nendstream\nendobj\n`;

  const xrefOffset = pdf.length;
  pdf += `xref\n0 5\n0000000000 65535 f \n`;
  for (const offset of offsets) {
    pdf += offset.toString().padStart(10, '0') + ` 00000 n \n`;
  }
  pdf += `trailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(pdf, 'latin1');
}

// Catálogo formal de asignaturas y sus nombres en disco (sin tildes)
const ASIGNATURAS_MAP = {
  'Español': 'Espanol',
  'Matemáticas': 'Matematicas',
  'Ciencias': 'Ciencias',
  'Estudios Sociales': 'Estudios Sociales',
  'Educación Cívica': 'Educacion Civica',
  'Biología': 'Biologia',
  'Física': 'Fisica',
  'Química': 'Quimica',
  'Inglés': 'Ingles',
  'Francés': 'Frances',
  'Educación Física': 'Educacion Fisica',
  'Educación Musical': 'Educacion Musical',
  'Artes Plásticas': 'Artes Plasticas',
  'Educación Religiosa': 'Educacion Religiosa',
  'Filosofía': 'Filosofia'
};

const GRADOS_MAP = {
  'Primero': { dir: 'Primero', num: '1', code: '01' },
  'Segundo': { dir: 'Segundo', num: '2', code: '02' },
  'Tercero': { dir: 'Tercero', num: '3', code: '03' },
  'Cuarto': { dir: 'Cuarto', num: '4', code: '04' },
  'Quinto': { dir: 'Quinto', num: '5', code: '05' },
  'Sexto': { dir: 'Sexto', num: '6', code: '06' },
  'Sétimo': { dir: 'Setimo', num: '7', code: '07' },
  'Octavo': { dir: 'Octavo', num: '8', code: '08' },
  'Noveno': { dir: 'Noveno', num: '9', code: '09' },
  'Décimo': { dir: 'Decimo', num: '10', code: '10' },
  'Undécimo': { dir: 'Undecimo', num: '11', code: '11' },
  'Duodécimo': { dir: 'Duodecimo', num: '12', code: '12' }
};

const SUBJECT_CODE_PREFIX = {
  'Español': 'ESP',
  'Matemáticas': 'MAT',
  'Ciencias': 'CIE',
  'Estudios Sociales': 'SOC',
  'Educación Cívica': 'CIV',
  'Biología': 'BIO',
  'Física': 'FIS',
  'Química': 'QUI',
  'Inglés': 'ING',
  'Francés': 'FRA',
  'Educación Física': 'EFI',
  'Educación Musical': 'MUS',
  'Artes Plásticas': 'ART',
  'Educación Religiosa': 'REL',
  'Filosofía': 'FIL'
};

const specs = [
  // 1. Primaria I Ciclo
  {
    nivelEducativo: 'Primaria',
    ciclo: 'I Ciclo',
    cicloDir: 'I Ciclo',
    modalidad: 'Regular',
    modalidadDir: '',
    tipo: 'Básica',
    tipoDir: 'Basicas',
    asignaturas: ['Español', 'Matemáticas', 'Ciencias', 'Estudios Sociales'],
    grados: ['Primero', 'Segundo', 'Tercero']
  },
  {
    nivelEducativo: 'Primaria',
    ciclo: 'I Ciclo',
    cicloDir: 'I Ciclo',
    modalidad: 'Regular',
    modalidadDir: '',
    tipo: 'Complementaria',
    tipoDir: 'Complementarias',
    asignaturas: ['Inglés', 'Educación Física', 'Educación Musical', 'Artes Plásticas', 'Educación Religiosa'],
    grados: ['Primero', 'Segundo', 'Tercero']
  },

  // 2. Primaria II Ciclo
  {
    nivelEducativo: 'Primaria',
    ciclo: 'II Ciclo',
    cicloDir: 'II Ciclo',
    modalidad: 'Regular',
    modalidadDir: '',
    tipo: 'Básica',
    tipoDir: 'Basicas',
    asignaturas: ['Español', 'Matemáticas', 'Ciencias', 'Estudios Sociales'],
    grados: ['Cuarto', 'Quinto', 'Sexto']
  },
  {
    nivelEducativo: 'Primaria',
    ciclo: 'II Ciclo',
    cicloDir: 'II Ciclo',
    modalidad: 'Regular',
    modalidadDir: '',
    tipo: 'Complementaria',
    tipoDir: 'Complementarias',
    asignaturas: ['Inglés', 'Educación Física', 'Educación Musical', 'Artes Plásticas', 'Educación Religiosa'],
    grados: ['Cuarto', 'Quinto', 'Sexto']
  },

  // 3. Secundaria III Ciclo
  {
    nivelEducativo: 'Secundaria',
    ciclo: 'III Ciclo',
    cicloDir: 'III Ciclo',
    modalidad: 'Regular',
    modalidadDir: '',
    tipo: 'Básica',
    tipoDir: 'Basicas',
    asignaturas: ['Español', 'Matemáticas', 'Ciencias', 'Estudios Sociales', 'Educación Cívica'],
    grados: ['Sétimo', 'Octavo', 'Noveno']
  },
  {
    nivelEducativo: 'Secundaria',
    ciclo: 'III Ciclo',
    cicloDir: 'III Ciclo',
    modalidad: 'Regular',
    modalidadDir: '',
    tipo: 'Complementaria',
    tipoDir: 'Complementarias',
    asignaturas: ['Inglés', 'Francés', 'Educación Física', 'Educación Musical', 'Artes Plásticas', 'Educación Religiosa'],
    grados: ['Sétimo', 'Octavo', 'Noveno']
  },

  // 4. Secundaria Educación Diversificada - Académica
  {
    nivelEducativo: 'Secundaria',
    ciclo: 'Educación Diversificada',
    cicloDir: 'Educacion Diversificada',
    modalidad: 'Académica',
    modalidadDir: 'Academica',
    tipo: 'Básica',
    tipoDir: 'Basicas',
    asignaturas: ['Español', 'Matemáticas', 'Estudios Sociales', 'Educación Cívica', 'Biología', 'Física', 'Química'],
    grados: ['Décimo', 'Undécimo']
  },
  {
    nivelEducativo: 'Secundaria',
    ciclo: 'Educación Diversificada',
    cicloDir: 'Educacion Diversificada',
    modalidad: 'Académica',
    modalidadDir: 'Academica',
    tipo: 'Complementaria',
    tipoDir: 'Complementarias',
    asignaturas: ['Inglés', 'Francés', 'Educación Física', 'Educación Religiosa', 'Filosofía'],
    grados: ['Décimo', 'Undécimo']
  },

  // 5. Secundaria Educación Diversificada - Técnica
  {
    nivelEducativo: 'Secundaria',
    ciclo: 'Educación Diversificada',
    cicloDir: 'Educacion Diversificada',
    modalidad: 'Técnica',
    modalidadDir: 'Tecnica',
    tipo: 'Básica',
    tipoDir: 'Basicas',
    asignaturas: ['Español', 'Matemáticas', 'Estudios Sociales', 'Educación Cívica', 'Biología', 'Física', 'Química'],
    grados: ['Décimo', 'Undécimo', 'Duodécimo']
  },
  {
    nivelEducativo: 'Secundaria',
    ciclo: 'Educación Diversificada',
    cicloDir: 'Educacion Diversificada',
    modalidad: 'Técnica',
    modalidadDir: 'Tecnica',
    tipo: 'Complementaria',
    tipoDir: 'Complementarias',
    asignaturas: ['Inglés', 'Francés', 'Educación Física', 'Educación Religiosa'],
    grados: ['Décimo', 'Undécimo', 'Duodécimo']
  }
];

const basePublicDir = path.resolve('c:/xampp/htdocs/ddc-planes-digitales/app/public/mep-ddc-planes-digitales');

// 1. Limpieza de carpetas obsoletas si existen
const oldDirs = [
  path.join(basePublicDir, 'Primer ciclo'),
  path.join(basePublicDir, 'Segundo ciclo')
];
for (const od of oldDirs) {
  if (fs.existsSync(od)) {
    fs.rmSync(od, { recursive: true, force: true });
    console.log('Carpeta obsoleta eliminada:', od);
  }
}

const allPlans = [];
let planIndex = 1;

// Seed reproducible de descargas iniciales realistas para el top y la tabla
const initialDownloadCounts = {
  // Populares en secundaria
  'MEP-SEC-DIV-ACA-MAT-11': 342,
  'MEP-SEC-DIV-ACA-ESP-11': 289,
  'MEP-SEC-III-CIE-09': 256,
  'MEP-SEC-DIV-TEC-MAT-12': 234,
  'MEP-SEC-DIV-ACA-BIO-11': 218,
  'MEP-SEC-DIV-ACA-QUI-11': 195,
  'MEP-SEC-DIV-ACA-FIS-11': 187,
  // Populares en primaria
  'MEP-PRI-II-MAT-06': 310,
  'MEP-PRI-II-ESP-06': 275,
  'MEP-PRI-I-MAT-01': 240,
  'MEP-PRI-I-ESP-01': 225,
  'MEP-PRI-II-CIE-06': 198,
  'MEP-SEC-III-MAT-07': 180,
  'MEP-SEC-III-ESP-07': 175
};

for (const spec of specs) {
  for (const asig of spec.asignaturas) {
    const asigDir = ASIGNATURAS_MAP[asig];
    const subPrefix = SUBJECT_CODE_PREFIX[asig] || 'DOC';

    for (const grado of spec.grados) {
      const gInfo = GRADOS_MAP[grado];
      
      // Construir ruta relativa y absoluta
      const pathSegments = [spec.nivelEducativo, spec.cicloDir];
      if (spec.modalidadDir) {
        pathSegments.push(spec.modalidadDir);
      }
      pathSegments.push(spec.tipoDir, asigDir, gInfo.dir);

      const folderPath = path.join(basePublicDir, ...pathSegments);
      fs.mkdirSync(folderPath, { recursive: true });

      const fileName = `Plan_${asigDir}_${gInfo.dir}.pdf`.replace(/\s+/g, '_');
      const filePath = path.join(folderPath, fileName);

      // Código curricular normado
      let codePrefix = spec.nivelEducativo === 'Primaria' ? 'MEP-PRI' : 'MEP-SEC';
      let cicloCode = '';
      if (spec.ciclo === 'I Ciclo') cicloCode = 'I';
      else if (spec.ciclo === 'II Ciclo') cicloCode = 'II';
      else if (spec.ciclo === 'III Ciclo') cicloCode = 'III';
      else if (spec.ciclo === 'Educación Diversificada') {
        cicloCode = spec.modalidad === 'Académica' ? 'DIV-ACA' : 'DIV-TEC';
      }

      const id = `${codePrefix}-${cicloCode}-${subPrefix}-${gInfo.code}`;
      const codigo = `${codePrefix}-${subPrefix}-${gInfo.num}${spec.modalidad === 'Técnica' ? '-TEC' : ''}`;
      const webRoute = '/mep-ddc-planes-digitales/' + pathSegments.map(encodeURIComponent).join('/') + '/' + encodeURIComponent(fileName);

      const modSuffix = spec.modalidad === 'Técnica' ? ' (Técnica)' : (spec.modalidad === 'Académica' ? ' (Académica)' : '');
      const nombre = `Plan de Estudio Oficial de ${asig} - ${grado} Año${modSuffix}`;

      const descargas = initialDownloadCounts[id] || (35 + ((planIndex * 17) % 120));

      const planObj = {
        id,
        nombre,
        nivelEducativo: spec.nivelEducativo,
        ciclo: spec.ciclo,
        modalidad: spec.modalidad,
        tipo: spec.tipo,
        asignatura: asig,
        grado,
        codigo,
        ruta: webRoute,
        archivo: fileName,
        descargas,
        fechaActualizacion: '2026'
      };

      // Crear archivo PDF físico
      const pdfBuffer = createInstitutionalPdf(planObj);
      fs.writeFileSync(filePath, pdfBuffer);

      allPlans.push(planObj);
      planIndex++;
    }
  }
}

console.log(`✓ Repositorio físico generado con éxito. Total de planes creados: ${allPlans.length}`);

// Generar planesData.js automáticamente sincronizado
const dataJsPath = path.resolve('c:/xampp/htdocs/ddc-planes-digitales/app/src/data/planesData.js');
const fileHeader = `// Catálogo Oficial Completo de Planes de Estudio del MEP Costa Rica (144 planes)
// Generado automáticamente - Vigencia 2026 - DDC Planes Digitales

export const initialPlanes = ${JSON.stringify(allPlans, null, 2)};

export const INITIAL_PLANES = initialPlanes;
export const STORAGE_KEY = 'mep-ddc-planes';

export function loadPlanesFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialPlanes;
    const parsed = JSON.parse(raw);
    if (
      !Array.isArray(parsed) ||
      parsed.length !== initialPlanes.length ||
      parsed.some((p) => p.ruta && p.ruta.includes('Primer%20ciclo'))
    ) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPlanes));
      return initialPlanes;
    }
    return parsed;
  } catch (err) {
    console.error('Error cargando planes desde localStorage:', err);
    return initialPlanes;
  }
}

export function savePlanesToStorage(planes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(planes));
  } catch (err) {
    console.error('Error guardando planes en localStorage:', err);
  }
}
`;

fs.writeFileSync(dataJsPath, fileHeader, 'utf8');
console.log(`✓ Archivo app/src/data/planesData.js actualizado con los ${allPlans.length} planes oficiales.`);
