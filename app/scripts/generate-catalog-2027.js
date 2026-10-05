import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve('app/public/aplicativo-planeamientos-2027');

const OFERTAS_MAP = {
  '1.PREESCOLAR': {
    codigo: 'PREESCOLAR',
    nombre: 'Educación Preescolar',
    badgeColor: 'amber'
  },
  '2.PRIMERO Y SEGUNDO CICLOS': {
    codigo: 'I-II-CICLOS',
    nombre: 'I y II Ciclos (Primaria)',
    badgeColor: 'blue'
  },
  '3.TERCER CICLO Y EDUCACION DIVERSIFICADA': {
    codigo: 'III-DIVERSIFICADA',
    nombre: 'III Ciclo y Diversificada (Secundaria)',
    badgeColor: 'indigo'
  },
  '4.EDUCACION PERSONAS JOVENES Y ADULTAS': {
    codigo: 'EPJA',
    nombre: 'Educación de Personas Jóvenes y Adultas (EPJA)',
    badgeColor: 'teal'
  },
  '5.EDUCACION ESPECIAL': {
    codigo: 'ESPECIAL',
    nombre: 'Educación Especial',
    badgeColor: 'purple'
  },
  '6.EDUCACION INTERCULTURAL': {
    codigo: 'INTERCULTURAL',
    nombre: 'Educación Intercultural',
    badgeColor: 'rose'
  },
  '7.UNIDOCENTES': {
    codigo: 'UNIDOCENTES',
    nombre: 'Educación Unidocente',
    badgeColor: 'emerald'
  }
};

const MATERIAS_MAP = {
  'ARTES INDUSTRIALES': 'Artes Industriales',
  'ARTES PLASTICAS': 'Artes Plásticas',
  'CIENCIAS': 'Ciencias',
  'EDUCACION CIVICA': 'Educación Cívica',
  'EDUCACION FISICA': 'Educación Física',
  'EDUCACION MUSICAL': 'Educación Musical',
  'EDUCACION PARA EL HOGAR': 'Educación para el Hogar',
  'EDUCACION PARA LA PAZ Y LA CONVIVENCIA': 'Educación para la Paz y la Convivencia',
  'EDUCACION RELIGIOSA': 'Educación Religiosa',
  'ESPANOL': 'Español',
  'ESTUDIOS SOCIALES': 'Estudios Sociales',
  'ESTUDIOS SOCIALES Y EDUCACION CIVICA': 'Estudios Sociales y Educación Cívica',
  'FILOSOFIA': 'Filosofía',
  'FISICA': 'Física',
  'FRANCES': 'Francés',
  'INGLES': 'Inglés',
  'ITALIANO': 'Italiano',
  'MATEMATICA': 'Matemática',
  'ORIENTACION': 'Orientación',
  'PSICOLOGIA': 'Psicología',
  'QUIMICA': 'Química',
  'BIOLOGIA': 'Biología',
  'LENGUAS EXTRANJERAS': 'Lenguas Extranjeras',
  'TECNOLOGIAS': 'Tecnologías',
  'CULTURA': 'Cultura Indígena',
  'LENGUA': 'Lengua Indígena'
};

const GRADOS_MAP = {
  '1.PRIMERO': 'Primer Año (1°)',
  '2.SEGUNDO': 'Segundo Año (2°)',
  '3.TERCERO': 'Tercer Año (3°)',
  '4.CUARTO': 'Cuarto Año (4°)',
  '5.QUINTO': 'Quinto Año (5°)',
  '6.SEXTO': 'Sexto Año (6°)',
  '1.SEPTIMO': 'Sétimo Año (7°)',
  '2.OCTAVO': 'Octavo Año (8°)',
  '3.NOVENO': 'Noveno Año (9°)',
  '4.DECIMO': 'Décimo Año (10°)',
  '5.UNDECIMO': 'Undécimo Año (11°)',
  '1.DECIMO': 'Décimo Año (10°)',
  '2.UNDECIMO': 'Undécimo Año (11°)',
  '1.INTERACTIVO I': 'Materno Infantil (Interactivo I)',
  '2.INTERACTIVO II': 'Interactivo II',
  '3.TRANSICION': 'Transición',
  '4.HETEROGENEO': 'Grupo Heterogéneo'
};

function formatTitleCase(str) {
  return str.toLowerCase().split(' ').map(w => {
    if (['y', 'e', 'de', 'del', 'en', 'para', 'el', 'la', 'los', 'las'].includes(w)) return w;
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}

function getLeafDirs(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const subdirs = entries.filter(e => e.isDirectory());
  if (subdirs.length === 0) return [dir];
  let leaves = [];
  for (const s of subdirs) {
    leaves = leaves.concat(getLeafDirs(path.join(dir, s.name)));
  }
  return leaves;
}

const leafDirs = getLeafDirs(rootDir);
console.log(`Encontradas ${leafDirs.length} carpetas finales.`);

const planesCatalog = [];

for (let i = 0; i < leafDirs.length; i++) {
  const leaf = leafDirs[i];
  const rel = path.relative(rootDir, leaf).replace(/\\/g, '/');
  const parts = rel.split('/');

  const ofertaDir = parts[0];
  const ofertaInfo = OFERTAS_MAP[ofertaDir] || {
    codigo: ofertaDir,
    nombre: ofertaDir,
    badgeColor: 'blue'
  };

  let materia = '';
  let grado = '';
  let idPrefix = ofertaInfo.codigo;

  if (ofertaDir === '1.PREESCOLAR') {
    materia = 'Educación Preescolar';
    grado = GRADOS_MAP[parts[1]] || parts[1];
  } else if (ofertaDir === '2.PRIMERO Y SEGUNDO CICLOS') {
    materia = MATERIAS_MAP[parts[1]] || parts[1];
    grado = GRADOS_MAP[parts[2]] || parts[2];
  } else if (ofertaDir === '3.TERCER CICLO Y EDUCACION DIVERSIFICADA') {
    materia = MATERIAS_MAP[parts[1]] || parts[1];
    grado = GRADOS_MAP[parts[2]] || parts[2];
  } else if (ofertaDir === '4.EDUCACION PERSONAS JOVENES Y ADULTAS') {
    if (parts.length === 2 && parts[1] === '1.ORIENTACIONES GENERALES') {
      materia = 'Orientaciones Generales';
      grado = 'Documento Rector';
    } else if (parts.length === 3 && parts[1] === '2.GUIAS ESPECIFICAS') {
      materia = MATERIAS_MAP[parts[2]] || parts[2];
      grado = 'Guía Específica de Aprendizaje';
    } else {
      materia = parts[parts.length - 1];
      grado = 'General';
    }
  } else if (ofertaDir === '5.EDUCACION ESPECIAL') {
    const raw = parts[1];
    if (raw.includes('CENTROS DE EDUCACION')) {
      materia = 'Centros de Educación Especial';
      grado = 'Plan Integral';
    } else if (raw.includes('AULA INTEGRADA')) {
      materia = 'Aula Integrada';
      grado = 'Discapacidad Intelectual y Múltiple';
    } else if (raw.includes('AUDICION Y LENGUAJE')) {
      materia = 'Servicios de Audición y Lenguaje';
      grado = 'I y II Ciclos';
    } else if (raw.includes('RIESGO EN EL DESARROLLO')) {
      materia = 'Servicios Educativos de Primera Infancia';
      grado = 'Discapacidad o Riesgo en el Desarrollo';
    } else if (raw.includes('PLAN NACIONAL')) {
      materia = 'Educación Vocacional (Plan Nacional)';
      grado = 'III Ciclo y Diversificado Vocacional';
    } else {
      materia = raw;
      grado = 'General';
    }
  } else if (ofertaDir === '6.EDUCACION INTERCULTURAL') {
    const categoria = parts[1]; // CULTURA o LENGUA
    const sub = parts[2];
    const subFormatted = formatTitleCase(sub.replace(/^CULTURA\s+|^LENGUA\s+|^IDIOMA\s+/, ''))
      .replace(/\bIi Ciclos\b/g, 'II Ciclos')
      .replace(/\bIii Ciclo y Educacion Diversificada\b/g, 'III Ciclo y Educación Diversificada')
      .replace(/\bIii Ciclo\b/g, 'III Ciclo')
      .replace(/\bI Ciclo\b/g, 'I Ciclo');
    grado = subFormatted;
  } else if (ofertaDir === '7.UNIDOCENTES') {
    materia = MATERIAS_MAP[parts[1]] || parts[1];
    grado = 'Escuelas Unidocentes (Multigrado 1° a 6°)';
  }

  // Encontrar los archivos en la carpeta
  const filesInDir = fs.readdirSync(leaf).filter(f => !fs.statSync(path.join(leaf, f)).isDirectory());
  const archivos = filesInDir.map(f => {
    const stat = fs.statSync(path.join(leaf, f));
    const ext = path.extname(f).toUpperCase().replace('.', '') || 'ZIP';
    const webPath = `/aplicativo-planeamientos-2027/${rel}/${f}`;
    return {
      nombre: f,
      tipo: ext,
      ruta: webPath,
      tamanoBytes: stat.size,
      tamanoLegible: `${(stat.size / 1024).toFixed(1)} KB`
    };
  });

  const uniqueId = `DDC-2027-${String(i + 1).padStart(3, '0')}`;

  planesCatalog.push({
    id: uniqueId,
    ofertaCodigo: ofertaInfo.codigo,
    ofertaNombre: ofertaInfo.nombre,
    ofertaBadgeColor: ofertaInfo.badgeColor,
    asignatura: materia,
    grado: grado,
    rutaRelativa: rel,
    carpetaFisica: leaf,
    archivos: archivos,
    archivoPrincipal: archivos.length > 0 ? archivos[0].nombre : '',
    rutaDescarga: archivos.length > 0 ? archivos[0].ruta : '',
    descargas: 0,
    vigencia: '2027'
  });
}

const outputPath = path.resolve('app/src/data/planes2027.json');
fs.writeFileSync(outputPath, JSON.stringify(planesCatalog, null, 2), 'utf-8');
console.log(`Guardados ${planesCatalog.length} planes en ${outputPath}.`);
