// ============================================================
// Entre Canes — Constantes del negocio
// Centralizamos copy y datos para que personalizar sea trivial.
// ============================================================

export const SITE = {
  name: "Entre Canes",
  shortDescription:
    "Escuela canina, adiestramiento y modificación de conducta. Resultados reales, método claro.",
  description:
    "Adiestramiento canino profesional, modificación de conducta y GICC. Recuperá la convivencia con tu perro en pocas semanas. Reservá tu evaluación gratuita.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://entrecanes.com.ar",
  city: process.env.NEXT_PUBLIC_CITY || "Buenos Aires, Argentina",
};

export const CONTACT = {
  // Formato internacional sin + ni espacios. Ej: 54 11 1234-5678 -> 5491112345678
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5491112345678",
  phone: process.env.NEXT_PUBLIC_PHONE || "+54 9 11 1234-5678",
  email: process.env.NEXT_PUBLIC_EMAIL || "hola@entrecanes.com.ar",
};

export const SOCIAL = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "https://instagram.com/entrecanes",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK || "https://facebook.com/entrecanes",
  tiktok: process.env.NEXT_PUBLIC_TIKTOK || "https://tiktok.com/@entrecanes",
};

/** Construye un link de WhatsApp con mensaje pre-cargado */
export function buildWhatsAppLink(message?: string) {
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MESSAGES = {
  default:
    "Hola Entre Canes! Quiero más información sobre el adiestramiento de mi perro 🐶",
  evaluacion:
    "Hola! Me gustaría reservar la evaluación gratuita para mi perro. ¿Tienen lugar esta semana?",
  gicc: "Hola! Quiero anotar a mi perro en el GICC. ¿Cuándo arranca el próximo grupo?",
  conducta:
    "Hola! Tengo un problema de conducta con mi perro y necesito ayuda profesional.",
  cachorro:
    "Hola! Tengo un cachorro y quiero arrancar bien con la educación temprana 🐾",
  tienda:
    "Hola! Quiero consultar por accesorios y productos de la tienda 🛒",
};

export const NAVIGATION: { label: string; href: string }[] = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "GICC", href: "/gicc" },
  { label: "Resultados", href: "/resultados" },
  { label: "Tienda", href: "/tienda" },
  { label: "Nosotros", href: "/sobre-nosotros" },
  { label: "Contacto", href: "/contacto" },
];

// ============================================================
// Servicios
// ============================================================
export type Service = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  duration: string;
  ideal: string;
  whatsappMessage: string;
};

export const SERVICES: Service[] = [
  {
    slug: "adiestramiento-basico",
    title: "Adiestramiento básico",
    tagline: "Sentado, quieto, vení, caminar al pie y mucho más.",
    description:
      "El programa pensado para que recuperes el control en lo cotidiano: paseos sin tirones, llamada confiable y obediencia en distintos entornos.",
    bullets: [
      "Caminar sin tirar de la correa",
      "Llamada confiable (vení) en exteriores",
      "Sentado, echado, quieto y suelta",
      "Manejo en visitas y llegadas a casa",
    ],
    duration: "8 a 10 sesiones",
    ideal: "Perros de 4 meses en adelante",
    whatsappMessage:
      "Hola! Me interesa el programa de adiestramiento básico. ¿Pueden contarme cómo arranca?",
  },
  {
    slug: "modificacion-conducta",
    title: "Modificación de conducta",
    tagline: "Agresividad, miedos, ansiedad por separación y reactividad.",
    description:
      "Un abordaje serio para problemas que arruinan la convivencia. Trabajamos sobre la causa, no sólo el síntoma. Acompañamiento cercano hasta lograr el cambio.",
    bullets: [
      "Reactividad con otros perros y personas",
      "Miedos, fobias y ansiedad por separación",
      "Resguardo de recursos (comida, juguetes, espacio)",
      "Mordidas, destrozos y conductas autolíticas",
    ],
    duration: "Plan personalizado de 6 a 12 semanas",
    ideal: "Casos complejos · Perros adultos",
    whatsappMessage:
      "Hola! Tengo un problema de conducta con mi perro y quiero saber si pueden ayudarme.",
  },
  {
    slug: "gicc",
    title: "GICC — Grupos de Interacción Canina Controlada",
    tagline: "El método que diferencia a Entre Canes.",
    description:
      "Sesiones grupales supervisadas donde tu perro aprende a relacionarse, leer señales caninas y autorregularse. Es la diferencia entre un perro 'que socializa' y un perro socialmente sano.",
    bullets: [
      "Encuentros semanales supervisados",
      "Grupos por tamaño, energía y experiencia",
      "Lectura de señales caninas en vivo",
      "Reduce reactividad y miedo en exteriores",
    ],
    duration: "Encuentros semanales",
    ideal: "Cachorros y adultos sociables o en proceso",
    whatsappMessage:
      "Hola! Quiero anotar a mi perro en el próximo GICC. ¿Hay lugar?",
  },
  {
    slug: "educacion-cachorros",
    title: "Educación temprana para cachorros",
    tagline: "Empezá bien para no corregir después.",
    description:
      "Las primeras 16 semanas marcan el resto de la vida del perro. Te damos un sistema simple para criar un cachorro equilibrado, social y fácil de convivir.",
    bullets: [
      "Sociabilización segura (perros, personas, ruidos)",
      "Higiene en interior y baño en lugar correcto",
      "Juego sano y mordidas controladas",
      "Bases de obediencia adaptadas a la edad",
    ],
    duration: "Programa de 6 sesiones",
    ideal: "Cachorros de 2 a 5 meses",
    whatsappMessage:
      "Hola! Tengo un cachorro y quiero arrancar bien con su educación.",
  },
  {
    slug: "domicilio",
    title: "Asesoramiento a domicilio",
    tagline: "Vamos a tu casa, donde ocurren las conductas reales.",
    description:
      "Muchos comportamientos sólo aparecen en el ambiente del perro. Te visitamos para entrenar en contexto: paseos por tu barrio, llegadas, comidas y rutinas.",
    bullets: [
      "Sesión 1:1 en tu casa y zona",
      "Plan de rutinas para toda la familia",
      "Pautas escritas post-sesión",
      "Seguimiento por WhatsApp",
    ],
    duration: "Sesión de 90 min · Plan a medida",
    ideal: "Familias con poco tiempo o problemas en casa",
    whatsappMessage:
      "Hola! Quiero un asesoramiento a domicilio. ¿Cubren mi zona?",
  },
];

// ============================================================
// Pain points — "¿Tu perro hace esto?"
// ============================================================
export const PAIN_POINTS: { icon: string; title: string; copy: string }[] = [
  {
    icon: "TugOfWar",
    title: "Tira de la correa y te arrastra",
    copy: "Salir a pasear se convirtió en un tirón constante. Volvés a casa con el brazo dolorido y sin ganas de salir mañana.",
  },
  {
    icon: "Phone",
    title: "No viene cuando lo llamás",
    copy: "Lo soltás y desaparece. Te ignora, se distrae con cualquier cosa, y ya no podés llevarlo a espacios abiertos sin estrés.",
  },
  {
    icon: "Bell",
    title: "Ladra a todo: timbre, otros perros, gente",
    copy: "Cada timbre es un caos. Cada paseo, una pelea anunciada. Estás siempre tenso y los vecinos ya se quejaron.",
  },
  {
    icon: "Shield",
    title: "Es agresivo o reactivo con otros perros",
    copy: "Cambiaste de rutas, evitás horarios de plaza, pedís disculpas en cada cruce. Estás caminando en puntas de pie.",
  },
  {
    icon: "Heart",
    title: "Tiene miedo a personas, ruidos o autos",
    copy: "Se esconde, tiembla, escapa. No podés llevarlo a ningún lado y verlo así te rompe el corazón.",
  },
  {
    icon: "Home",
    title: "Destruye cosas o tiene ansiedad por separación",
    copy: "Volvés a casa y encontrás todo dado vuelta. Los vecinos te dicen que llora cuando no estás. Te sentís culpable de irte.",
  },
];

// ============================================================
// Cómo funciona (3 pasos)
// ============================================================
export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Evaluación gratuita",
    copy: "Charlamos por WhatsApp y coordinamos una evaluación inicial sin costo. Entendemos a tu perro, tu casa y tu rutina antes de proponer nada.",
  },
  {
    step: "02",
    title: "Plan personalizado",
    copy: "Te armamos un plan claro: qué se trabaja, en cuántas sesiones, qué resultados esperar y cuánto cuesta. Sin promesas mágicas.",
  },
  {
    step: "03",
    title: "Resultados sostenibles",
    copy: "Trabajamos en sesiones presenciales o GICC, y te damos pautas para tu vida real. El cambio se queda mucho después de la última clase.",
  },
];

// ============================================================
// Testimonios (storytelling)
// ============================================================
export type Testimonial = {
  name: string;
  dog: string;
  breed: string;
  problem: string;
  result: string;
  quote: string;
  rating: number;
  avatar?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "María",
    dog: "Luna",
    breed: "Border Collie · 2 años",
    problem: "Tiraba tanto de la correa que dejé de sacarla",
    result: "Hoy caminamos juntas, sin estrés",
    quote:
      "Llegué llorando a la primera sesión. Luna era hermosa pero impasable, me había sacado el hombro dos veces. En seis semanas lo dimos vuelta. No solo aprendió a caminar al pie: yo aprendí a ser su guía. Recuperé las tardes con ella.",
    rating: 5,
  },
  {
    name: "Diego",
    dog: "Toby",
    breed: "Mestizo rescatado · 4 años",
    problem: "Le ladraba a todo el mundo, pensé que no había vuelta",
    result: "Convive con mis sobrinos sin problema",
    quote:
      "Toby venía de la calle, todo le daba miedo y eso lo volvía agresivo. Otros entrenadores me dijeron que era 'caso perdido'. Con el GICC empezó a confiar de nuevo. Hoy es otro perro. No es magia, es paciencia y método.",
    rating: 5,
  },
  {
    name: "Familia Pérez",
    dog: "Rocco",
    breed: "Labrador · 1 año",
    problem: "Era un huracán, mordía a los chicos jugando",
    result: "En 8 sesiones cambió la convivencia",
    quote:
      "Rocco era un huracán. Rompía todo, mordía sin querer pero fuerte. Mis hijos le tenían miedo. En 8 sesiones todo cambió. Lo más importante: nos enseñaron a NOSOTROS qué hacer. Ahora es parte de la familia, no un problema.",
    rating: 5,
  },
  {
    name: "Sofía",
    dog: "Olivia",
    breed: "Caniche Toy · 3 años",
    problem: "Ansiedad por separación: lloraba 4 horas seguidas",
    result: "Se queda sola tranquila",
    quote:
      "Los vecinos me amenazaron con denunciarme. Olivia lloraba cada vez que salía. Probé de todo: collares, juguetes, dejarla con la TV. Nada. Con el plan de Entre Canes, en seis semanas dejó de llorar. Volví a tener vida propia.",
    rating: 5,
  },
];

// ============================================================
// Métricas / prueba social
// ============================================================
export const METRICS = [
  { value: "+800", label: "Perros entrenados" },
  { value: "8 años", label: "De experiencia" },
  { value: "95%", label: "Casos con mejoría" },
  { value: "4.9/5", label: "Reseñas reales" },
];

// ============================================================
// FAQ — Diseñado para eliminar objeciones de compra
// ============================================================
export const FAQ: { q: string; a: string }[] = [
  {
    q: "¿En cuántas sesiones voy a ver resultados?",
    a: "Depende del caso, pero la mayoría de las familias notan cambios concretos a partir de la 2da o 3ra sesión. Programas básicos: 8 a 10 sesiones. Modificación de conducta: 6 a 12 semanas. Te damos el plan claro desde el día uno, sin sorpresas.",
  },
  {
    q: "¿Trabajan con perros agresivos o reactivos?",
    a: "Sí, son una parte importante de nuestro trabajo. Hicimos modificación de conducta con cientos de casos, incluyendo agresividad entre perros, hacia personas y resguardo de recursos. Siempre evaluamos primero para asegurar tu seguridad y la del perro.",
  },
  {
    q: "¿Qué es el GICC y por qué funciona?",
    a: "GICC es nuestro programa estrella: Grupos de Interacción Canina Controlada. Son encuentros supervisados donde los perros aprenden a relacionarse y autorregularse, agrupados por tamaño, energía y experiencia. Es lo que diferencia a un perro 'que tolera' de uno realmente social. No es una guardería: es entrenamiento social estructurado.",
  },
  {
    q: "¿Sirve para cachorros o sólo para adultos?",
    a: "Para los dos. Tenemos un programa específico de educación temprana (2 a 5 meses) que es la mejor inversión que podés hacer: previene el 80% de los problemas que vemos en adultos. Para perros adultos también funciona, sólo lleva más tiempo y constancia.",
  },
  {
    q: "¿Las clases son individuales o grupales?",
    a: "Las dos, según lo que necesite tu perro. Adiestramiento básico y modificación de conducta arrancan 1:1 para personalizar. El GICC es grupal por diseño. En la evaluación inicial te recomendamos qué formato te conviene.",
  },
  {
    q: "¿Atienden a domicilio?",
    a: "Sí, ofrecemos asesoramiento a domicilio dentro de zona CABA y GBA Norte (consultar otras zonas). Es ideal cuando los problemas aparecen en casa o en tu barrio: trabajamos en contexto real.",
  },
  {
    q: "¿Qué método usan? ¿Es entrenamiento positivo?",
    a: "Trabajamos con refuerzo positivo y aprendizaje cooperativo. No usamos collares de castigo, gritos ni dominación. La ciencia es clara: los perros aprenden mejor sin miedo. Eso no significa permisivo: hay límites, estructura y consecuencias razonables.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende del programa y la cantidad de sesiones. Para que tengas una idea: una sesión individual ronda lo que sale una cena para dos en un buen restaurante. Pero la primera evaluación es 100% gratis y sin compromiso. Te pasamos el presupuesto exacto después de conocer a tu perro.",
  },
  {
    q: "¿Y si no veo cambios?",
    a: "Te acompañamos hasta lograrlo. Si después de la cantidad de sesiones acordadas no hay avance, ajustamos el plan sin costo extra. La transformación es nuestro trabajo, no la cantidad de clases.",
  },
];

// ============================================================
// Tienda — productos demo
// ============================================================
export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  highlight?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "kit-cachorro",
    name: "Kit Cachorro Entre Canes",
    category: "Kits",
    price: 38900,
    description:
      "Todo lo que necesitás para arrancar bien: collar, correa de entrenamiento, mordedor, snacks de premio y guía PDF.",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&auto=format&fit=crop",
    highlight: "Más vendido",
  },
  {
    id: "correa-larga",
    name: "Correa larga 5m de entrenamiento",
    category: "Paseo",
    price: 14900,
    description:
      "Diseñada para sesiones de llamada y trabajo en exteriores. Liviana, resistente, fácil de manejar.",
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&auto=format&fit=crop",
  },
  {
    id: "arnes-antitiron",
    name: "Arnés anti-tirón regulable",
    category: "Paseo",
    price: 17900,
    description:
      "El que recomendamos para perros que tiran. Sin presión en el cuello. Fácil de poner.",
    image:
      "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800&auto=format&fit=crop",
    highlight: "Recomendado",
  },
  {
    id: "snacks-naturales",
    name: "Snacks naturales premium x 250g",
    category: "Premios",
    price: 8500,
    description:
      "Hechos en Argentina, sin conservantes. Ideales para sesiones largas y reforzar comportamientos.",
    image:
      "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800&auto=format&fit=crop",
  },
  {
    id: "kong-rellenable",
    name: "Juguete rellenable 'Anti-aburrimiento'",
    category: "Enriquecimiento",
    price: 11500,
    description:
      "Para perros que destruyen cosas y los que sufren ansiedad por separación. Mantiene la mente ocupada.",
    image:
      "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=800&auto=format&fit=crop",
  },
  {
    id: "kit-conducta",
    name: "Kit Modificación de Conducta",
    category: "Kits",
    price: 52900,
    description:
      "Línea larga, arnés, snacks de alto valor, clicker y manual de pautas. Para acompañar el plan profesional.",
    image:
      "https://images.unsplash.com/photo-1546975490-e8b92a360b24?w=800&auto=format&fit=crop",
  },
];
