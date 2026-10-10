import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve('app/public/ddc-planeamientos');

const OFERTAS_MAP = {
  'preescolar': {
    codigo: 'PREESCOLAR',
    nombre: 'Educación Preescolar',
    badgeColor: 'amber'
  },
  'primero-y-segundo-ciclos': {
    codigo: 'I-II-CICLOS',
    nombre: 'I y II Ciclos (Primaria)',
    badgeColor: 'blue'
  },
  'tercer-ciclo-y-educacion-diversificada': {
    codigo: 'III-DIVERSIFICADA',
    nombre: 'III Ciclo y Diversificada (Secundaria)',
    badgeColor: 'indigo'
  },
  'educacion-personas-jovenes-y-adultas': {
    codigo: 'EPJA',
    nombre: 'Educación de Personas Jóvenes y Adultas (EPJA)',
    badgeColor: 'teal'
  },
  'educacion-especial': {
    codigo: 'ESPECIAL',
    nombre: 'Educación Especial',
    badgeColor: 'purple'
  },
  'educacion-intercultural': {
    codigo: 'INTERCULTURAL',
    nombre: 'Educación Intercultural',
    badgeColor: 'rose'
  },
  'unidocentes': {
    codigo: 'UNIDOCENTES',
    nombre: 'Educación Unidocente',
    badgeColor: 'emerald'
  }
};

const MATERIAS_MAP = {
  'artes-industriales': 'Artes Industriales',
  'artes-plasticas': 'Artes Plásticas',
  'ciencias': 'Ciencias',
  'educacion-civica': 'Educación Cívica',
  'educacion-fisica': 'Educación Física',
  'educacion-musical': 'Educación Musical',
  'educacion-para-el-hogar': 'Educación para el Hogar',
  'educacion-para-la-paz-y-la-convivencia': 'Educación para la Paz y la Convivencia',
  'educacion-religiosa': 'Educación Religiosa',
  'espanol': 'Español',
  'estudios-sociales': 'Estudios Sociales',
  'estudios-sociales-y-educacion-civica': 'Estudios Sociales y Educación Cívica',
  'filosofia': 'Filosofía',
  'fisica': 'Física',
  'frances': 'Francés',
  'ingles': 'Inglés',
  'italiano': 'Italiano',
  'matematica': 'Matemática',
  'orientacion': 'Orientación',
  'psicologia': 'Psicología',
  'quimica': 'Química',
  'biologia': 'Biología',
  'lenguas-extranjeras': 'Lenguas Extranjeras',
  'tecnologias': 'Tecnologías',
  'cultura': 'Cultura Indígena',
  'lengua': 'Lengua Indígena'
};

const GRADOS_MAP = {
  'primero': 'Primer Año (1°)',
  'segundo': 'Segundo Año (2°)',
  'tercero': 'Tercer Año (3°)',
  'cuarto': 'Cuarto Año (4°)',
  'quinto': 'Quinto Año (5°)',
  'sexto': 'Sexto Año (6°)',
  'septimo': 'Sétimo Año (7°)',
  'octavo': 'Octavo Año (8°)',
  'noveno': 'Noveno Año (9°)',
  'decimo': 'Décimo Año (10°)',
  'undecimo': 'Undécimo Año (11°)',
  'interactivo-i': 'Materno Infantil (Interactivo I)',
  'interactivo-ii': 'Interactivo II',
  'transicion': 'Transición',
  'heterogeneo': 'Grupo Heterogéneo'
};

function formatTitleCase(str) {
  return str.split('-').map(w => {
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
    codigo: ofertaDir.toUpperCase(),
    nombre: formatTitleCase(ofertaDir),
    badgeColor: 'blue'
  };

  let materia = '';
  let grado = '';

  if (ofertaDir === 'preescolar') {
    materia = 'Educación Preescolar';
    grado = GRADOS_MAP[parts[1]] || formatTitleCase(parts[1]);
  } else if (ofertaDir === 'primero-y-segundo-ciclos') {
    materia = MATERIAS_MAP[parts[1]] || formatTitleCase(parts[1]);
    grado = GRADOS_MAP[parts[2]] || formatTitleCase(parts[2]);
  } else if (ofertaDir === 'tercer-ciclo-y-educacion-diversificada') {
    materia = MATERIAS_MAP[parts[1]] || formatTitleCase(parts[1]);
    grado = GRADOS_MAP[parts[2]] || formatTitleCase(parts[2]);
  } else if (ofertaDir === 'educacion-personas-jovenes-y-adultas') {
    if (parts.length === 2 && parts[1] === 'orientaciones-generales') {
      materia = 'Orientaciones Generales';
      grado = 'Documento Rector';
    } else if (parts.length === 3 && parts[1] === 'guias-especificas') {
      materia = MATERIAS_MAP[parts[2]] || formatTitleCase(parts[2]);
      grado = 'Guía Específica de Aprendizaje';
    } else {
      materia = formatTitleCase(parts[parts.length - 1]);
      grado = 'General';
    }
  } else if (ofertaDir === 'educacion-especial') {
    const raw = parts[1];
    if (raw.includes('centros-de-educacion')) {
      materia = 'Centros de Educación Especial';
      grado = 'Plan Integral';
    } else if (raw.includes('aula-integrada')) {
      materia = 'Aula Integrada';
      grado = 'Discapacidad Intelectual y Múltiple';
    } else if (raw.includes('audicion-y-lenguaje')) {
      materia = 'Servicios de Audición y Lenguaje';
      grado = 'I y II Ciclos';
    } else if (raw.includes('servicios-educativos')) {
      materia = 'Servicios Educativos de Primera Infancia';
      grado = 'Discapacidad o Riesgo en el Desarrollo';
    } else if (raw.includes('tercer-ciclo')) {
      materia = 'Educación Vocacional (Plan Nacional)';
      grado = 'III Ciclo y Diversificado Vocacional';
    } else {
      materia = formatTitleCase(raw);
      grado = 'General';
    }
  } else if (ofertaDir === 'educacion-intercultural') {
    const sub = parts[2] || parts[1];
    materia = parts[1] === 'cultura' ? 'Cultura Indígena' : 'Lengua Indígena';
    grado = formatTitleCase(sub)
      .replace(/\bIi Ciclos\b/g, 'I y II Ciclos')
      .replace(/\bIii Ciclo y Educacion Diversificada\b/g, 'III Ciclo y Educación Diversificada')
      .replace(/\bIii Ciclo\b/g, 'III Ciclo')
      .replace(/\bI Ciclo\b/g, 'I Ciclo');
  } else if (ofertaDir === 'unidocentes') {
    materia = MATERIAS_MAP[parts[1]] || formatTitleCase(parts[1]);
    grado = 'Escuelas Unidocentes (Multigrado 1° a 6°)';
  }

  // Encontrar los archivos en la carpeta
  const filesInDir = fs.readdirSync(leaf).filter(f => !fs.statSync(path.join(leaf, f)).isDirectory());
  const archivos = filesInDir.map(f => {
    const stat = fs.statSync(path.join(leaf, f));
    const ext = path.extname(f).toUpperCase().replace('.', '') || 'ZIP';
    const webPath = `/ddc-planeamientos/${rel}/${f}`;
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
    archivos: archivos,
    archivoPrincipal: archivos.length > 0 ? archivos[0].nombre : '',
    rutaDescarga: archivos.length > 0 ? archivos[0].ruta : '',
    descargas: 0,
    vigencia: '2027'
  });
}

const outputPath = path.resolve('app/public/data/ddc-planeamientos.json');
fs.writeFileSync(outputPath, JSON.stringify(planesCatalog, null, 2), 'utf-8');
console.log(`Guardados ${planesCatalog.length} planes en ${outputPath}.`);
