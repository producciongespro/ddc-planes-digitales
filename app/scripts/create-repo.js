import fs from 'fs';
import path from 'path';

function createSimplePdf(ciclo, asignatura, nivel) {
  const content = `BT
/F1 18 Tf
50 720 Td
(MINISTERIO DE EDUCACION PUBLICA DE COSTA RICA) Tj
/F1 14 Tf
0 -28 Td
(DIRECCION DE DESARROLLO CURRICULAR - DDC) Tj
/F2 12 Tf
0 -25 Td
(Biblioteca Digital Corporativa de Planes de Estudio) Tj
0 -40 Td
/F1 16 Tf
(PLAN DE ESTUDIO OFICIAL: ${asignatura.toUpperCase()}) Tj
/F2 13 Tf
0 -25 Td
(Nivel: ${nivel}  |  Ciclo: ${ciclo}) Tj
0 -20 Td
(Codigo Curricular: MEP-DDC-${asignatura.substring(0, 3).toUpperCase()}-${nivel.toUpperCase()}) Tj
0 -35 Td
/F1 12 Tf
(1. PROPOSITO DE LA ASIGNATURA:) Tj
/F2 11 Tf
0 -20 Td
(El presente programa orienta la mediacion pedagogica del docente costarricense,) Tj
0 -16 Td
(promoviendo la adquisicion de aprendizajes significativos y pensamiento reflexivo.) Tj
0 -30 Td
/F1 12 Tf
(2. LINEAMIENTOS METODOLOGICOS:) Tj
/F2 11 Tf
0 -20 Td
(- Fomento del aprendizaje por indagacion y resolucion de problemas cotidianos.) Tj
0 -16 Td
(- Evaluacion formativa continua orientada al desempeno del estudiantado.) Tj
0 -16 Td
(- Integracion transversal de valores civicos, eticos y ambientales.) Tj
0 -40 Td
/F2 10 Tf
(DDC - San Jose, Costa Rica. Documento oficial descargado del portal digital.) Tj
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

const structure = [
  {
    ciclo: 'Primer ciclo',
    asignaturas: [
      {
        nombre: 'Estudios Sociales',
        niveles: ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto']
      },
      {
        nombre: 'Matemáticas',
        niveles: ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto']
      }
    ]
  },
  {
    ciclo: 'Segundo ciclo',
    asignaturas: [
      {
        nombre: 'Español',
        niveles: ['Sétimo', 'Octavo', 'Noveno', 'Décimo', 'Undécimo', 'Duodécimo']
      },
      {
        nombre: 'Ciencias',
        niveles: ['Sétimo', 'Octavo', 'Noveno', 'Décimo', 'Undécimo', 'Duodécimo']
      }
    ]
  }
];

const targetDirs = [
  path.resolve('c:/xampp/htdocs/ddc-planes-digitales/app/public/mep-ddc-planes-digitales')
];

for (const baseDir of targetDirs) {
  for (const c of structure) {
    for (const a of c.asignaturas) {
      for (const n of a.niveles) {
        const folder = path.join(baseDir, c.ciclo, a.nombre, n);
        fs.mkdirSync(folder, { recursive: true });
        const fileName = `Plan_${a.nombre}_${n}.pdf`.replace(/\s+/g, '_');
        const filePath = path.join(folder, fileName);
        const pdfBuffer = createSimplePdf(c.ciclo, a.nombre, n);
        fs.writeFileSync(filePath, pdfBuffer);
      }
    }
  }
}

console.log('Repositorio de documentos creado exitosamente en app/public.');
