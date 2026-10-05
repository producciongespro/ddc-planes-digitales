import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

function createPdfBuffer(title, hierarchy) {
  // Sanitize text for standard PDF string (escape parens and backslashes, keep ASCII)
  const cleanTitle = title.replace(/[()\\\r\n]/g, ' ').replace(/\s+/g, ' ').trim();
  const cleanHier = hierarchy.replace(/[()\\\r\n]/g, ' ').replace(/\s+/g, ' ').trim();

  const streamContent = [
    'BT',
    '/F1 18 Tf',
    '50 720 Td',
    '(MINISTERIO DE EDUCACION PUBLICA DE COSTA RICA) Tj',
    '/F1 13 Tf',
    '0 -26 Td',
    '(DIRECCION DE DESARROLLO CURRICULAR - DDC) Tj',
    '/F2 11 Tf',
    '0 -22 Td',
    '(Biblioteca Digital Corporativa - Planeamientos 2027) Tj',
    '0 -36 Td',
    '/F1 14 Tf',
    `(PLAN DE ESTUDIO OFICIAL: ${cleanTitle}) Tj`,
    '/F2 11 Tf',
    '0 -24 Td',
    `(Ruta Curricular: ${cleanHier}) Tj`,
    '0 -20 Td',
    '(Vigencia Lectiva: Periodo 2027 | MEP - DDC) Tj',
    '0 -35 Td',
    '/F1 12 Tf',
    '(1. PROPOSITO INSTITUCIONAL DE LA MEDIACION:) Tj',
    '/F2 10.5 Tf',
    '0 -18 Td',
    '(El presente documento orienta la mediacion pedagogica y curricular docente,)',
    '0 -15 Td',
    '(articulando el pensamiento critico, cientifico, humanista y competencias digitales.)',
    '0 -28 Td',
    '/F1 12 Tf',
    '(2. LINEAMIENTOS METODOLOGICOS Y EVALUACION 2027:) Tj',
    '/F2 10.5 Tf',
    '0 -18 Td',
    '(- Estrategias centradas en la persona estudiante y su desarrollo integral.)',
    '0 -15 Td',
    '(- Evaluacion diagnostica, formativa y continua segun lineamientos DDC.)',
    '0 -15 Td',
    '(- Fomento de valores eticos, ciudadania responsable, inclusion y equidad.)',
    '0 -35 Td',
    '/F2 9.5 Tf',
    '(DDC - San Jose, Costa Rica. Repositorio Oficial DDC Planes Digitales - Vigencia 2027.) Tj',
    'ET'
  ].join('\r\n') + '\r\n';

  const streamBytes = Buffer.from(streamContent, 'ascii');
  const streamLen = streamBytes.length;

  const header = Buffer.from('%PDF-1.4\r\n', 'ascii');
  const obj1 = Buffer.from('1 0 obj\r\n<< /Type /Catalog /Pages 2 0 R >>\r\nendobj\r\n', 'ascii');
  const obj2 = Buffer.from('2 0 obj\r\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\r\nendobj\r\n', 'ascii');
  const obj3 = Buffer.from('3 0 obj\r\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> >>\r\nendobj\r\n', 'ascii');
  const obj4Head = Buffer.from(`4 0 obj\r\n<< /Length ${streamLen} >>\r\nstream\r\n`, 'ascii');
  const obj4Foot = Buffer.from('endstream\r\nendobj\r\n', 'ascii');

  const offset1 = header.length;
  const offset2 = offset1 + obj1.length;
  const offset3 = offset2 + obj2.length;
  const offset4 = offset3 + obj3.length;
  const offsetEnd = offset4 + obj4Head.length + streamBytes.length + obj4Foot.length;

  const pad = n => String(n).padStart(10, '0');
  const xref = Buffer.from(
    `xref\r\n0 5\r\n0000000000 65535 f \r\n${pad(offset1)} 00000 n \r\n${pad(offset2)} 00000 n \r\n${pad(offset3)} 00000 n \r\n${pad(offset4)} 00000 n \r\ntrailer\r\n<< /Size 5 /Root 1 0 R >>\r\nstartxref\r\n${offsetEnd}\r\n%%EOF\r\n`,
    'ascii'
  );

  return Buffer.concat([header, obj1, obj2, obj3, obj4Head, streamBytes, obj4Foot, xref]);
}

function createZipBuffer(innerFileName, innerBuffer) {
  const nameBuffer = Buffer.from(innerFileName, 'utf8');
  const crc = zlib.crc32(innerBuffer);
  const deflated = zlib.deflateRawSync(innerBuffer);

  // Local file header (30 bytes + name)
  const lh = Buffer.alloc(30 + nameBuffer.length);
  lh.writeUInt32LE(0x04034b50, 0); // signature
  lh.writeUInt16LE(20, 4);         // version needed (2.0)
  lh.writeUInt16LE(0, 6);          // flags
  lh.writeUInt16LE(8, 8);          // compression method: 8 (deflate)
  lh.writeUInt16LE(0, 10);         // mod time
  lh.writeUInt16LE(0, 12);         // mod date
  lh.writeUInt32LE(crc, 14);       // crc32
  lh.writeUInt32LE(deflated.length, 18);   // compressed size
  lh.writeUInt32LE(innerBuffer.length, 22); // uncompressed size
  lh.writeUInt16LE(nameBuffer.length, 26); // file name length
  lh.writeUInt16LE(0, 28);                 // extra field length
  nameBuffer.copy(lh, 30);

  // Central directory header (46 bytes + name)
  const cd = Buffer.alloc(46 + nameBuffer.length);
  cd.writeUInt32LE(0x02014b50, 0); // signature
  cd.writeUInt16LE(20, 4);         // version made by
  cd.writeUInt16LE(20, 6);         // version needed
  cd.writeUInt16LE(0, 8);          // flags
  cd.writeUInt16LE(8, 10);         // method: 8 (deflate)
  cd.writeUInt16LE(0, 12);         // mod time
  cd.writeUInt16LE(0, 14);         // mod date
  cd.writeUInt32LE(crc, 16);       // crc32
  cd.writeUInt32LE(deflated.length, 20);   // compressed size
  cd.writeUInt32LE(innerBuffer.length, 24); // uncompressed size
  cd.writeUInt16LE(nameBuffer.length, 28); // file name length
  cd.writeUInt16LE(0, 30);                 // extra field length
  cd.writeUInt16LE(0, 32);                 // file comment length
  cd.writeUInt16LE(0, 34);                 // disk number start
  cd.writeUInt16LE(0, 36);                 // internal attributes
  cd.writeUInt32LE(0, 38);                 // external attributes
  cd.writeUInt32LE(0, 42);                 // relative offset of local header
  nameBuffer.copy(cd, 46);

  // End of Central Directory Record (22 bytes)
  const cdOffset = lh.length + deflated.length;
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0); // signature
  eocd.writeUInt16LE(0, 4);          // disk number
  eocd.writeUInt16LE(0, 6);          // disk with start of CD
  eocd.writeUInt16LE(1, 8);          // entries on this disk
  eocd.writeUInt16LE(1, 10);         // total entries
  eocd.writeUInt32LE(cd.length, 12); // size of CD
  eocd.writeUInt32LE(cdOffset, 16);  // offset of start of CD
  eocd.writeUInt16LE(0, 20);         // comment length

  return Buffer.concat([lh, deflated, cd, eocd]);
}

const rootDir = path.resolve('app/public/aplicativo-planeamientos-2027');

function getLeafDirs(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const subdirs = entries.filter(e => e.isDirectory());
  if (subdirs.length === 0) {
    return [dir];
  }
  let leaves = [];
  for (const s of subdirs) {
    leaves = leaves.concat(getLeafDirs(path.join(dir, s.name)));
  }
  return leaves;
}

const leaves = getLeafDirs(rootDir);
console.log(`Encontradas ${leaves.length} carpetas finales (hojas).`);

let count = 0;
for (const leaf of leaves) {
  // Limpiar cualquier archivo previo que pudiera haber en la carpeta
  const existingFiles = fs.readdirSync(leaf).filter(f => !fs.statSync(path.join(leaf, f)).isDirectory());
  for (const ef of existingFiles) {
    fs.unlinkSync(path.join(leaf, ef));
  }

  const rel = path.relative(rootDir, leaf).replace(/\\/g, '/');
  const parts = rel.split('/');
  const leafName = parts[parts.length - 1];
  const parentName = parts.length > 1 ? parts[parts.length - 2] : '';

  // Determinar el nombre legible del plan y de los archivos
  let fileBaseName = leafName;
  if (parentName && !parentName.startsWith('1.') && !parentName.startsWith('2.') && !parentName.startsWith('3.') && !parentName.startsWith('4.') && !parentName.startsWith('5.') && !parentName.startsWith('6.') && !parentName.startsWith('7.')) {
    fileBaseName = `${parentName}_${leafName}`;
  } else if (parts[0] === '7.UNIDOCENTES') {
    fileBaseName = `UNIDOCENTES_${leafName}`;
  }

  // Normalizar caracteres para nombre de archivo seguro
  const safeName = fileBaseName.replace(/[\/\\?%*:|"<>]/g, '_').replace(/\s+/g, '_');
  const pdfFileName = `Plan_${safeName}.pdf`;
  const zipFileName = `Plan_${safeName}.zip`;

  const pdfBuf = createPdfBuffer(fileBaseName.replace(/_/g, ' '), rel);
  const zipBuf = createZipBuffer(pdfFileName, pdfBuf);

  const zipPath = path.join(leaf, zipFileName);
  fs.writeFileSync(zipPath, zipBuf);
  count++;
}

console.log(`Generados ${count} archivos ZIP con su respectivo PDF interno.`);
