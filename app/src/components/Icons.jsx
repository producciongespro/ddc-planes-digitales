import React from 'react';

// 1. Estudios Sociales (Globo / Sociedad / Historia)
export function IconEstudiosSociales({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// 2. Matemáticas (Cálculo / Geometría / Símbolos)
export function IconMatematicas({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="10" y1="8" x2="10" y2="16" />
      <line x1="14" y1="8" x2="14" y2="16" />
      <circle cx="8" cy="14" r="1" fill="currentColor" />
      <circle cx="16" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}

// 3. Español (Lengua / Libro abierto / Literatura)
export function IconEspanol({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

// 4. Ciencias (General / Matraz de laboratorio)
export function IconCiencias({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2v7.31a2 2 0 0 1-.37 1.17l-5.32 8A2 2 0 0 0 6 21.5h12a2 2 0 0 0 1.69-3.02l-5.32-8A2 2 0 0 1 14 9.31V2" />
      <line x1="8.5" y1="2" x2="15.5" y2="2" />
      <path d="M7 16h10" />
    </svg>
  );
}

// 5. Educación Cívica (Balanza de la justicia y democracia)
export function IconEducacionCivica({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="3" x2="12" y2="21" />
      <path d="M5 21h14" />
      <path d="M4 7l8-4 8 4" />
      <path d="M6 10l-3 5h6l-3-5z" />
      <path d="M18 10l-3 5h6l-3-5z" />
    </svg>
  );
}

// 6. Biología (ADN y naturaleza)
export function IconBiologia({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 15c6.667-6 13.333 0 20-6" />
      <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
      <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
      <path d="M17 6a5 5 0 0 0-5 5v1a5 5 0 0 0 5 5h2a5 5 0 0 0 5-5v-1a5 5 0 0 0-5-5z" />
    </svg>
  );
}

// 7. Física (Átomo con órbitas electrónicas)
export function IconFisica({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)" />
    </svg>
  );
}

// 8. Química (Tubo de ensayo y reacción química)
export function IconQuimica({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V2" />
      <path d="M8.5 2h7" />
      <path d="M9.5 12h5" />
      <circle cx="11" cy="17" r="1" fill="currentColor" />
      <circle cx="13" cy="15" r="1" fill="currentColor" />
    </svg>
  );
}

// 9. Inglés (Lengua extranjera global / Diálogo internacional)
export function IconIngles({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10" />
      <path d="M7 9h2a2 2 0 1 1 0 4H7" />
      <line x1="7" y1="7" x2="7" y2="15" />
    </svg>
  );
}

// 10. Francés (Torre / Lengua francesa)
export function IconFrances({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20" />
      <path d="M8 22l4-18 4 18" />
      <line x1="9" y1="15" x2="15" y2="15" />
      <path d="M7 22h10" />
    </svg>
  );
}

// 11. Educación Física (Movimiento y deporte)
export function IconEducacionFisica({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3" />
      <path d="M5 22l4-9 3 3 5-7" />
      <path d="M12 12l5 3 2 7" />
      <path d="M4 11l5-2 3 2" />
    </svg>
  );
}

// 12. Educación Musical (Notas musicales)
export function IconEducacionMusical({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

// 13. Artes Plásticas (Paleta de pintura y creación visual)
export function IconArtesPlasticas({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.5 2 2 6.5 2 12c0 3.6 2 6.8 5 8.2 1.4.7 3.2-.2 3.2-1.8v-.4c0-.8.7-1.5 1.5-1.5h1.8c4.7 0 8.5-3.8 8.5-8.5C22 6.5 17.5 2 12 2z" />
      <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="7.5" r="1.5" fill="currentColor" />
      <circle cx="16.5" cy="10.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

// 14. Educación Religiosa (Valores espirituales / Luz)
export function IconEducacionReligiosa({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="7" y1="9" x2="17" y2="9" />
      <circle cx="12" cy="4" r="1.5" />
    </svg>
  );
}

// 15. Filosofía (Pensamiento reflexivo y sabiduría)
export function IconFilosofia({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z" />
    </svg>
  );
}

// 16. Artes Industriales (Engranaje / Herramienta técnica)
export function IconArtesIndustriales({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

// 17. Educación para el Hogar / Vida Cotidiana
export function IconEducacionHogar({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" />
      <path d="M12 17s-3.5-2.2-3.5-4.2a2 2 0 0 1 3.5-1.3 2 2 0 0 1 3.5 1.3C15.5 14.8 12 17 12 17z" />
    </svg>
  );
}

// 18. Orientación (Brújula de proyecto de vida)
export function IconOrientacion({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

// 19. Psicología / Afectividad (Bienestar emocional y empatía)
export function IconPsicologia({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

// 20. Italiano / Lenguas Extranjeras (Diálogo lingüístico)
export function IconIdioma({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 9h8" />
      <path d="M8 13h5" />
    </svg>
  );
}

// 21. Cultura y Lengua Indígena (Patrimonio ancestral / Sol)
export function IconIntercultural({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3" />
      <path d="M12 19v3" />
      <path d="M4.93 4.93l2.12 2.12" />
      <path d="M16.95 16.95l2.12 2.12" />
      <path d="M2 12h3" />
      <path d="M19 12h3" />
      <path d="M4.93 19.07l2.12-2.12" />
      <path d="M16.95 7.05l2.12-2.12" />
    </svg>
  );
}

// 22. Tecnologías / Informática (Computadora)
export function IconTecnologia({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

// Selector dinámico institucional de icono por Oferta Educativa (Vista 1)
export function OfertaIcon({ ofertaCodigo = '', ofertaNombre = '', className = "w-5 h-5" }) {
  const key = `${ofertaCodigo} ${ofertaNombre}`.toUpperCase();

  if (key.includes('PREESCOLAR')) {
    // Bloques / Estrella de primera infancia
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  }

  if (key.includes('I-II-CICLOS') || key.includes('PRIMARIA') || key.includes('I Y II CICLOS')) {
    // Libro abierto escolar
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    );
  }

  if (key.includes('DIVERSIFICADA') || key.includes('III CICLO')) {
    // Birrete académico de secundaria
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    );
  }

  if (key.includes('EPJA') || key.includes('ADULTAS') || key.includes('JÓVENES') || key.includes('JOVENES')) {
    // Comunidad de personas jóvenes y adultas
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  if (key.includes('ESPECIAL')) {
    // Corazón de inclusión y apoyo educativo
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    );
  }

  if (key.includes('INTERCULTURAL')) {
    return <IconIntercultural className={className} />;
  }

  if (key.includes('UNIDOCENTES')) {
    // Escuela rural multigrado
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    );
  }

  return <IconDocument className={className} />;
}

// Selector dinámico institucional de icono por asignatura (Vista 2)
export function AsignaturaIcon({ asignatura = '', className = "w-6 h-6" }) {
  switch (asignatura) {
    case 'Estudios Sociales':
      return <IconEstudiosSociales className={className} />;
    case 'Matemática':
    case 'Matemáticas':
      return <IconMatematicas className={className} />;
    case 'Español':
      return <IconEspanol className={className} />;
    case 'Ciencias':
      return <IconCiencias className={className} />;
    case 'Educación Cívica':
      return <IconEducacionCivica className={className} />;
    case 'Biología':
      return <IconBiologia className={className} />;
    case 'Física':
      return <IconFisica className={className} />;
    case 'Química':
      return <IconQuimica className={className} />;
    case 'Inglés':
      return <IconIngles className={className} />;
    case 'Francés':
      return <IconFrances className={className} />;
    case 'Italiano':
      return <IconIdioma className={className} />;
    case 'Educación Física':
      return <IconEducacionFisica className={className} />;
    case 'Educación Musical':
      return <IconEducacionMusical className={className} />;
    case 'Artes Plásticas':
      return <IconArtesPlasticas className={className} />;
    case 'Artes Industriales':
      return <IconArtesIndustriales className={className} />;
    case 'Educación para el Hogar':
      return <IconEducacionHogar className={className} />;
    case 'Educación Religiosa':
      return <IconEducacionReligiosa className={className} />;
    case 'Orientación':
      return <IconOrientacion className={className} />;
    case 'Psicología':
    case 'Afectividad y Sexualidad Integral':
    case 'Educación para la Paz y la Convivencia':
      return <IconPsicologia className={className} />;
    case 'Filosofía':
      return <IconFilosofia className={className} />;
    default: {
      const norm = String(asignatura).toLowerCase();
      if (norm.includes('matem')) return <IconMatematicas className={className} />;
      if (norm.includes('social')) return <IconEstudiosSociales className={className} />;
      if (norm.includes('español') || norm.includes('espanol') || norm.includes('lectoescritura')) return <IconEspanol className={className} />;
      if (norm.includes('cienc')) return <IconCiencias className={className} />;
      if (norm.includes('cívic') || norm.includes('civic')) return <IconEducacionCivica className={className} />;
      if (norm.includes('biolog')) return <IconBiologia className={className} />;
      if (norm.includes('físic') && !norm.includes('educación')) return <IconFisica className={className} />;
      if (norm.includes('químic') || norm.includes('quimic')) return <IconQuimica className={className} />;
      if (norm.includes('inglés') || norm.includes('ingles')) return <IconIngles className={className} />;
      if (norm.includes('francés') || norm.includes('frances')) return <IconFrances className={className} />;
      if (norm.includes('italiano') || norm.includes('lengua')) return <IconIdioma className={className} />;
      if (norm.includes('cultura') || norm.includes('indígena') || norm.includes('indigena')) return <IconIntercultural className={className} />;
      if (norm.includes('músic') || norm.includes('music')) return <IconEducacionMusical className={className} />;
      if (norm.includes('plástic') || norm.includes('plastic') || norm.includes('arte')) return <IconArtesPlasticas className={className} />;
      if (norm.includes('industrial') || norm.includes('vocacional')) return <IconArtesIndustriales className={className} />;
      if (norm.includes('hogar') || norm.includes('cotidiana')) return <IconEducacionHogar className={className} />;
      if (norm.includes('orientac') || norm.includes('guía') || norm.includes('guia')) return <IconOrientacion className={className} />;
      if (norm.includes('psicolog') || norm.includes('afectividad') || norm.includes('especial') || norm.includes('audición') || norm.includes('infancia')) return <IconPsicologia className={className} />;
      if (norm.includes('filosof')) return <IconFilosofia className={className} />;
      if (norm.includes('informát') || norm.includes('tecnolog')) return <IconTecnologia className={className} />;
      if (norm.includes('preescolar')) return <OfertaIcon ofertaCodigo="PREESCOLAR" className={className} />;
      if (norm.includes('unidocent')) return <OfertaIcon ofertaCodigo="UNIDOCENTES" className={className} />;
      return <IconDocument className={className} />;
    }
  }
}

// Iconos UI utilitarios
export function IconHome({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" />
      <polyline points="9 21 9 12 15 12 15 21" />
    </svg>
  );
}

export function IconArrowLeft({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

export function IconSearch({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function IconDownload({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function IconEye({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconClose({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function IconFilter({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

export function IconRefresh({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 4v6h-6" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  );
}

export function IconTrophy({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.45 1-1 1H8v4h8v-4h-1c-.55 0-1-.45-1-1v-2.34" />
      <path d="M6 4h12v7a6 6 0 0 1-12 0V4z" />
    </svg>
  );
}

export function IconDocument({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

export function IconTable({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="10" y1="3" x2="10" y2="21" />
    </svg>
  );
}

// Icono Sol (mantenido por compatibilidad de exportación)
export function IconSun({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

// Icono Luna (mantenido por compatibilidad de exportación)
export function IconMoon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

// Icono de Advertencia / Alerta para confirmaciones
export function IconAlertTriangle({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

// Icono Información / Acerca de
export function IconInfo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
