// ============================================================
// Entre Canes — Zonas de cobertura (SEO local)
// Cada zona genera una landing propia en /zonas/[slug] para
// posicionar "adiestramiento canino en <zona>" en Google.
// ============================================================

export type Zona = {
  slug: string;
  /** Nombre corto de la localidad, tal como lo busca la gente */
  name: string;
  /** Partido / jurisdicción a la que pertenece */
  partido: string;
  /** Región para agrupar en la UI */
  region: "Zona Norte" | "Zona Noroeste" | "Zona Oeste" | "CABA";
  /** Frase local que le da contexto real a la página (evita contenido clonado) */
  blurb: string;
};

export const ZONAS: Zona[] = [
  {
    slug: "san-miguel",
    name: "San Miguel",
    partido: "San Miguel",
    region: "Zona Noroeste",
    blurb:
      "Trabajamos en toda la zona de San Miguel: paseos de práctica por el centro, la plaza principal y los espacios verdes del partido.",
  },
  {
    slug: "muniz",
    name: "Muñiz",
    partido: "San Miguel",
    region: "Zona Noroeste",
    blurb:
      "Atendemos familias de Muñiz con sesiones a domicilio y prácticas en las calles y plazas del barrio, donde tu perro vive sus paseos reales.",
  },
  {
    slug: "bella-vista",
    name: "Bella Vista",
    partido: "San Miguel",
    region: "Zona Noroeste",
    blurb:
      "En Bella Vista entrenamos en el entorno real de tu perro: sus veredas arboladas, sus plazas y los estímulos de todos los días.",
  },
  {
    slug: "los-polvorines",
    name: "Los Polvorines",
    partido: "Malvinas Argentinas",
    region: "Zona Noroeste",
    blurb:
      "Cubrimos Los Polvorines y alrededores con adiestramiento a domicilio y planes de modificación de conducta en contexto real.",
  },
  {
    slug: "grand-bourg",
    name: "Grand Bourg",
    partido: "Malvinas Argentinas",
    region: "Zona Noroeste",
    blurb:
      "Llegamos a Grand Bourg con sesiones individuales en tu casa y tu barrio, trabajando las conductas donde realmente aparecen.",
  },
  {
    slug: "villa-de-mayo",
    name: "Villa de Mayo",
    partido: "Malvinas Argentinas",
    region: "Zona Noroeste",
    blurb:
      "En Villa de Mayo acompañamos a familias con cachorros y perros adultos, con planes adaptados a la rutina de cada casa.",
  },
  {
    slug: "malvinas-argentinas",
    name: "Malvinas Argentinas",
    partido: "Malvinas Argentinas",
    region: "Zona Noroeste",
    blurb:
      "Cubrimos todo el partido de Malvinas Argentinas: Los Polvorines, Grand Bourg, Villa de Mayo, Tortuguitas y localidades vecinas.",
  },
  {
    slug: "don-torcuato",
    name: "Don Torcuato",
    partido: "Tigre",
    region: "Zona Norte",
    blurb:
      "Atendemos Don Torcuato y la zona sur del partido de Tigre con adiestramiento a domicilio y trabajo de conducta en tu entorno.",
  },
  {
    slug: "hurlingham",
    name: "Hurlingham",
    partido: "Hurlingham",
    region: "Zona Oeste",
    blurb:
      "En Hurlingham trabajamos paseos, obediencia y socialización aprovechando los espacios verdes característicos del partido.",
  },
  {
    slug: "el-palomar",
    name: "El Palomar",
    partido: "Morón",
    region: "Zona Oeste",
    blurb:
      "Llegamos a El Palomar con sesiones a domicilio: educación de cachorros, obediencia y modificación de conducta en tu barrio.",
  },
  {
    slug: "caseros",
    name: "Caseros",
    partido: "Tres de Febrero",
    region: "Zona Oeste",
    blurb:
      "Cubrimos Caseros y alrededores en Tres de Febrero, con planes personalizados para paseos sin tirones y convivencia tranquila.",
  },
  {
    slug: "san-isidro",
    name: "San Isidro",
    partido: "San Isidro",
    region: "Zona Norte",
    blurb:
      "En San Isidro entrenamos en el día a día real de tu perro: su casa, sus veredas y los espacios verdes de la zona.",
  },
  {
    slug: "martinez",
    name: "Martínez",
    partido: "San Isidro",
    region: "Zona Norte",
    blurb:
      "Atendemos Martínez con adiestramiento a domicilio y trabajo de conducta, adaptado a la vida en casas y departamentos.",
  },
  {
    slug: "olivos",
    name: "Olivos",
    partido: "Vicente López",
    region: "Zona Norte",
    blurb:
      "En Olivos trabajamos obediencia, paseos y socialización, incluyendo prácticas en los espacios costeros de Vicente López.",
  },
  {
    slug: "vicente-lopez",
    name: "Vicente López",
    partido: "Vicente López",
    region: "Zona Norte",
    blurb:
      "Cubrimos todo Vicente López: Olivos, Florida, La Lucila, Munro y alrededores, con sesiones a domicilio y en exteriores.",
  },
  {
    slug: "san-fernando",
    name: "San Fernando",
    partido: "San Fernando",
    region: "Zona Norte",
    blurb:
      "Llegamos a San Fernando con planes de adiestramiento y modificación de conducta trabajados en el entorno real de tu perro.",
  },
  {
    slug: "caba",
    name: "CABA",
    partido: "Ciudad Autónoma de Buenos Aires",
    region: "CABA",
    blurb:
      "Atendemos toda la Ciudad de Buenos Aires: trabajamos convivencia en departamentos, paseos urbanos, ascensores, plazas y caniles.",
  },
];

export function getZona(slug: string): Zona | undefined {
  return ZONAS.find((z) => z.slug === slug);
}

/** Zonas agrupadas por región, para listados en la UI */
export function zonasByRegion() {
  const regions: Zona["region"][] = [
    "Zona Norte",
    "Zona Noroeste",
    "Zona Oeste",
    "CABA",
  ];
  return regions.map((region) => ({
    region,
    zonas: ZONAS.filter((z) => z.region === region),
  }));
}

/** Mensaje de WhatsApp pre-cargado con la zona (mejora la conversión y el lead) */
export function zonaWhatsAppMessage(name: string) {
  return `Hola Entre Canes! Soy de ${name} y quiero info sobre el adiestramiento para mi perro 🐶`;
}
