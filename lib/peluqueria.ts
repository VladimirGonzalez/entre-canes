// ============================================================
// Entre Canes — Peluquería canina
// ------------------------------------------------------------
// Vertical separada del adiestramiento, a pedido del cliente:
// vive en /peluqueria y /peluqueria/[zona], con su propio ítem
// en el menú. No se mezcla con las secciones de Inicio ni de
// /servicios, que son 100% adiestramiento.
//
// TODO (datos del negocio, completar cuando estén):
//   - Precios o rango por tamaño de perro.
//   - Si el turno es en local o a domicilio (y en qué zonas).
//   - Cuánto dura un turno típico.
// Mientras tanto el copy deriva todo a WhatsApp a propósito:
// así nadie se va con una expectativa equivocada. Cuando estén,
// sumarlos acá y en GROOMING_FAQ (la pregunta de precio).
// ============================================================
import { CONTACT, SITE, WHATSAPP_MESSAGES } from "@/lib/constants";
import { ZONAS, type Zona } from "@/lib/zonas";

export type GroomingItem = {
  icon: "Bath" | "Scissors" | "Wind" | "PawPrint" | "Ear" | "Heart";
  title: string;
  copy: string;
};

export const GROOMING = {
  title: "Peluquería canina",
  /** Párrafo "respuesta directa": lo que citan buscadores e IAs. */
  summary:
    "En Entre Canes hacemos peluquería canina: baño completo, corte de raza o a gusto, deslanado, corte de uñas e higiene de oídos y ojos. La diferencia es que la hace un equipo de adiestradores, así que trabajamos con manejo sin forcejeo, ideal para perros nerviosos o que no se dejan tocar.",
  items: [
    {
      icon: "Bath",
      title: "Baño completo",
      copy: "Productos elegidos según su piel y su tipo de pelo, secado profesional y perfumado final.",
    },
    {
      icon: "Scissors",
      title: "Corte y arreglo",
      copy: "Corte de raza o a tu gusto, con arreglo de cara, patas y zona higiénica.",
    },
    {
      icon: "Wind",
      title: "Deslanado y cepillado",
      copy: "Para perros de doble capa: sacamos el pelo muerto y baja muchísimo la caída de pelo en casa.",
    },
    {
      icon: "PawPrint",
      title: "Uñas y almohadillas",
      copy: "Corte de uñas a la medida justa y pelo entre los dedos, para que camine cómodo.",
    },
    {
      icon: "Ear",
      title: "Higiene de oídos y ojos",
      copy: "Limpieza suave de oídos, lagrimal y pliegues. Si vemos algo raro, te avisamos para que lo vea el veterinario.",
    },
    {
      icon: "Heart",
      title: "Perros que no se dejan tocar",
      copy: "Si tiembla, muerde la toalla o no deja que le toquen las patas, lo trabajamos por etapas y sin pelear.",
    },
  ] as GroomingItem[],
  idealFor: [
    "Se pone nervioso con el secador o el agua",
    "No deja que le toquen las patas, las orejas o la cola",
    "Tiene pelo largo o doble capa y suelta mucho",
    "Tuvo una mala experiencia en otra peluquería",
  ],
  why: [
    {
      title: "Leemos al perro antes de tocarlo",
      copy: "Detectamos tensión, miedo o incomodidad a tiempo y frenamos antes de que la situación escale.",
    },
    {
      title: "Sin forcejeo ni sujeción forzada",
      copy: "Si algo le cuesta (patas, oídos, secador), lo trabajamos por etapas en vez de imponerlo.",
    },
    {
      title: "Una visita que no lo deja peor",
      copy: "Que salga limpio y además tranquilo: así el próximo turno es más fácil para todos.",
    },
  ],
  steps: [
    {
      title: "Nos escribís",
      copy: "Por WhatsApp: raza, edad, largo de pelo y cómo reacciona cuando lo manipulan.",
    },
    {
      title: "Te damos turno",
      copy: "Con el valor, el tiempo estimado y qué servicio le conviene a su tipo de pelo.",
    },
    {
      title: "Lo atendemos con calma",
      copy: "Baño, corte o deslanado, con pausas si las necesita. Sin apuro.",
    },
    {
      title: "Te lo devolvemos con un resumen",
      copy: "Cómo quedó, qué vimos en su piel y su pelaje, y pautas de cepillado en casa.",
    },
  ],
  note: "Los baños medicados los hacemos siguiendo la indicación de tu veterinario.",
  whatsappMessage: WHATSAPP_MESSAGES.peluqueria,
};

/** Mensaje de WhatsApp con la zona: el cliente sabe de dónde viene el lead. */
export function groomingZonaWhatsAppMessage(name: string) {
  return `Hola Entre Canes! Soy de ${name} y quiero pedir un turno de peluquería canina (baño y corte) para mi perro 🛁`;
}

/**
 * Si la ruta es de peluquería, devuelve el mensaje de WhatsApp que
 * corresponde (con la zona, si la hay). Si no, null. Lo usan los CTAs
 * globales (WhatsApp flotante y barra mobile) para no mandar un
 * mensaje de adiestramiento desde una página de peluquería.
 */
export function groomingMessageForPath(pathname: string | null): string | null {
  if (!pathname || !pathname.startsWith("/peluqueria")) return null;
  const slug = pathname.split("/")[2];
  const zona = slug ? ZONAS.find((z) => z.slug === slug) : undefined;
  return zona
    ? groomingZonaWhatsAppMessage(zona.name)
    : WHATSAPP_MESSAGES.peluqueria;
}

export function zonaUbicacion(z: Zona) {
  return z.name === z.partido ? z.name : `${z.name}, ${z.partido}`;
}

/** Zonas cercanas reales: primero mismo partido, después misma región. */
export function nearbyZonas(z: Zona, max = 6): Zona[] {
  const samePartido = ZONAS.filter(
    (o) => o.slug !== z.slug && o.partido === z.partido
  );
  const sameRegion = ZONAS.filter(
    (o) =>
      o.slug !== z.slug && o.partido !== z.partido && o.region === z.region
  );
  return [...samePartido, ...sameRegion].slice(0, max);
}

export function listaNatural(nombres: string[]) {
  if (nombres.length <= 1) return nombres.join("");
  return `${nombres.slice(0, -1).join(", ")} y ${nombres[nombres.length - 1]}`;
}

export const ZONAS_LISTA = listaNatural(ZONAS.map((z) => z.name));

// ============================================================
// FAQ — escritas "respuesta primero": la primera oración contesta
// la pregunta sola. Es lo que extraen Google y los asistentes de IA.
// ============================================================
export type QA = { q: string; a: string };

export const GROOMING_FAQ: QA[] = [
  {
    q: "¿Qué incluye la peluquería canina de Entre Canes?",
    a: "Baño completo con productos según la piel y el pelaje, secado, corte de raza o a gusto, deslanado para perros de doble capa, corte de uñas, pelo de almohadillas e higiene de oídos y ojos. Podés pedir el servicio completo o solo una parte, por ejemplo baño y uñas.",
  },
  {
    q: "¿Qué diferencia hay con una peluquería canina común?",
    a: "La hace un equipo de adiestradores. Sabemos leer el lenguaje corporal del perro, así que detectamos el estrés a tiempo y trabajamos sin forcejeos ni sujeción forzada. Para perros tranquilos es un turno más cómodo; para perros nerviosos es la diferencia entre poder atenderlos o no.",
  },
  {
    q: "¿Atienden perros nerviosos, miedosos o que muerden cuando los bañan?",
    a: "Sí, es justamente donde más servimos. Avisanos antes cómo reacciona para organizar el turno con más tiempo. Trabajamos por etapas, con pausas, y si el perro está muy estresado preferimos frenar y seguir otro día antes que forzarlo.",
  },
  {
    q: "¿Cuánto cuesta bañar o cortar el pelo a un perro?",
    a: "Depende del tamaño, el tipo de pelo y cómo esté el pelaje: no es lo mismo un caniche con nudos que un labrador de pelo corto. Escribinos por WhatsApp con la raza y una foto y te pasamos el valor antes de confirmar el turno, sin sorpresas.",
  },
  {
    q: "¿Cada cuánto conviene bañar a un perro?",
    a: "No hay una regla única: muchos perros quedan bien con un baño cada 4 a 6 semanas, y los de pelo corto pueden estirar más. Bañarlo muy seguido puede resecarle la piel. En el turno te recomendamos una frecuencia según su pelaje y su rutina.",
  },
  {
    q: "¿Hacen baños medicados?",
    a: "Sí, siempre siguiendo la indicación de tu veterinario: el producto y la frecuencia los define él. Pasanos la indicación o el producto recetado al pedir el turno.",
  },
  {
    q: "¿En qué zonas tienen peluquería canina?",
    a: `Damos turnos para perros de zona norte, noroeste y oeste del GBA y de CABA: ${ZONAS_LISTA}. Si tu zona no aparece, consultanos igual.`,
  },
  {
    q: "¿Cómo pido un turno de peluquería canina?",
    a: `Por WhatsApp al ${CONTACT.phone}. Contanos raza, edad, largo de pelo y cómo se porta cuando lo manipulan, y te respondemos con el valor y el turno más cercano.`,
  },
];

export function groomingZonaFAQ(z: Zona): QA[] {
  const cerca = nearbyZonas(z, 4).map((o) => o.name);
  const alrededores = cerca.length
    ? ` y de zonas cercanas como ${listaNatural(cerca)}`
    : "";
  return [
    {
      q: `¿Hacen peluquería canina en ${z.name}?`,
      a: `Sí. Damos turnos de baño, corte, deslanado y corte de uñas para perros de ${zonaUbicacion(z)}${alrededores}. El turno se coordina por WhatsApp según tu ubicación.`,
    },
    {
      q: `¿Cuánto sale la peluquería canina en ${z.name}?`,
      a: "Depende del tamaño del perro, el tipo de pelo y el estado del pelaje. Mandanos por WhatsApp la raza y una foto y te pasamos el valor exacto antes de confirmar el turno.",
    },
    {
      q: `¿Atienden perros que no se dejan bañar en ${z.name}?`,
      a: "Sí. Somos adiestradores, así que trabajamos con manejo sin forcejeo: por etapas, con pausas y leyendo al perro. Si tu perro se pone nervioso en la peluquería, avisanos y organizamos el turno con más tiempo.",
    },
    {
      q: `¿Cómo pido turno de peluquería canina en ${z.name}?`,
      a: `Escribinos por WhatsApp al ${CONTACT.phone} contando que sos de ${z.name}, la raza de tu perro y cómo se porta cuando lo manipulan. Te respondemos con el valor y el turno más cercano.`,
    },
  ];
}

// ============================================================
// Datos estructurados (schema.org)
// ============================================================
const LOCAL_BUSINESS_ID = `${SITE.url}/#localbusiness`;

function place(z: Zona) {
  return {
    "@type": "Place",
    name: `${zonaUbicacion(z)}, Buenos Aires, Argentina`,
  };
}

function offerCatalog() {
  return {
    "@type": "OfferCatalog",
    name: "Servicios de peluquería canina",
    itemListElement: GROOMING.items.map((i) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: i.title,
        description: i.copy,
      },
    })),
  };
}

function faqPage(items: QA[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}

const ALTERNATE_NAMES = [
  "Estética canina",
  "Baño y corte para perros",
  "Grooming canino",
  "Peluquería para perros",
];

export function groomingSchema(description: string) {
  const url = `${SITE.url}/peluqueria`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: "Peluquería canina",
        alternateName: ALTERNATE_NAMES,
        serviceType: "Peluquería canina",
        description,
        url,
        provider: { "@id": LOCAL_BUSINESS_ID },
        areaServed: ZONAS.map(place),
        hasOfferCatalog: offerCatalog(),
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: "Peluquería canina — Entre Canes",
        description,
        inLanguage: "es-AR",
        about: { "@id": `${url}#service` },
      },
      faqPage(GROOMING_FAQ),
      breadcrumbs([
        { name: "Inicio", path: "" },
        { name: "Peluquería canina", path: "/peluqueria" },
      ]),
    ],
  };
}

export function groomingZonaSchema(z: Zona, description: string) {
  const url = `${SITE.url}/peluqueria/${z.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `Peluquería canina en ${z.name}`,
        alternateName: ALTERNATE_NAMES.map((n) => `${n} en ${z.name}`),
        serviceType: "Peluquería canina",
        description,
        url,
        provider: { "@id": LOCAL_BUSINESS_ID },
        areaServed: place(z),
        hasOfferCatalog: offerCatalog(),
        isRelatedTo: { "@id": `${SITE.url}/peluqueria#service` },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `Peluquería canina en ${z.name} — Entre Canes`,
        description,
        inLanguage: "es-AR",
        about: { "@id": `${url}#service` },
      },
      faqPage(groomingZonaFAQ(z)),
      breadcrumbs([
        { name: "Inicio", path: "" },
        { name: "Peluquería canina", path: "/peluqueria" },
        { name: z.name, path: `/peluqueria/${z.slug}` },
      ]),
    ],
  };
}
