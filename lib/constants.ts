// ============================================================
// Entre Canes — Constantes del negocio
// Centralizamos copy y datos para que personalizar sea trivial.
// ============================================================

export const SITE = {
  name: "Entre Canes",
  shortDescription:
    "Escuela canina, adiestramiento y modificación de conducta. Resultados reales, método claro.",
  description:
    "Adiestramiento canino profesional, modificación de conducta y Grupos GIC (Grupos de Interacción Canina). Recuperá la convivencia con tu perro en pocas semanas. Reservá tu evaluación gratuita.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://entrecanes.com.ar",
  city: process.env.NEXT_PUBLIC_CITY || "Buenos Aires, Argentina",
};

export const CONTACT = {
  // Formato internacional sin + ni espacios. Ej: 54 9 11 2867-1420 -> 5491128671420
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5491128671420",
  phone: process.env.NEXT_PUBLIC_PHONE || "+54 9 11 2867-1420",
  email: process.env.NEXT_PUBLIC_EMAIL || "hola@entrecanes.com.ar",
};

export const SOCIAL = {
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM || "https://instagram.com/entre_canes_",
  facebook:
    process.env.NEXT_PUBLIC_FACEBOOK || "https://facebook.com/dogschoolll",
  tiktok:
    process.env.NEXT_PUBLIC_TIKTOK || "https://tiktok.com/@dog._._.school",
};

/** Construye un link de WhatsApp con mensaje pre-cargado */
export function buildWhatsAppLink(message?: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || CONTACT.whatsapp;
  const base = `https://wa.me/${number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MESSAGES = {
  default:
    "Hola Entre Canes! Quiero más información sobre el adiestramiento de mi perro 🐶",
  evaluacion:
    "Hola! Me gustaría reservar la evaluación gratuita para mi perro. ¿Tienen lugar esta semana?",
  gic: "Hola! Quiero info sobre los Grupos GIC. ¿Cuándo arranca el próximo?",
  gicCachorros: "Hola! Quiero info sobre GIC Cachorros 🐶",
  gicAdultos: "Hola! Quiero info sobre GIC Adultos 🐕",
  gicMiedo: "Hola! Quiero info sobre GIC Miedo (mi perro tiene miedos o inseguridad)",
  gicReactividad:
    "Hola! Quiero info sobre GIC Reactividad (mi perro ladra o reacciona)",
  conducta:
    "Hola! Tengo un problema de conducta con mi perro y necesito ayuda profesional.",
  cachorro:
    "Hola! Tengo un cachorro y quiero arrancar bien con la educación temprana 🐾",
  tienda:
    "Hola! Quiero consultar por accesorios y productos de la tienda 🛒",
};

// ============================================================
// Navegación con soporte para submenús
// ============================================================
export type NavItem = {
  label: string;
  href: string;
  description?: string;
  whatsappMessage?: string;
  children?: NavItem[];
};

export const NAVIGATION: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  {
    label: "Grupos GIC",
    href: "/gic",
    children: [
      {
        label: "GIC Cachorros",
        href: "/gic#cachorros",
        description: "Socialización temprana",
        whatsappMessage: "Hola! Quiero info sobre GIC Cachorros 🐶",
      },
      {
        label: "GIC Adultos",
        href: "/gic#adultos",
        description: "Convivencia y control",
        whatsappMessage: "Hola! Quiero info sobre GIC Adultos 🐕",
      },
      {
        label: "GIC Miedo",
        href: "/gic#miedo",
        description: "Perros inseguros / fobias",
        whatsappMessage:
          "Hola! Quiero info sobre GIC Miedo (mi perro tiene miedos o inseguridad)",
      },
      {
        label: "GIC Reactividad",
        href: "/gic#reactividad",
        description: "Perros que ladran o reaccionan",
        whatsappMessage:
          "Hola! Quiero info sobre GIC Reactividad (mi perro ladra o reacciona)",
      },
    ],
  },
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
    slug: "gic",
    title: "Grupos GIC — Interacción Canina",
    tagline: "El método que diferencia a Entre Canes.",
    description:
      "Los GIC son espacios diseñados para que perros y sus dueños aprendan a convivir de forma equilibrada. Paseos guiados, lectura del lenguaje canino y situaciones controladas. 4 grupos según la necesidad: Cachorros, Adultos, Miedo y Reactividad.",
    bullets: [
      "GIC Cachorros — socialización temprana",
      "GIC Adultos — convivencia y control",
      "GIC Miedo — perros inseguros y fobias",
      "GIC Reactividad — perros que ladran o reaccionan",
    ],
    duration: "Encuentros semanales",
    ideal: "Cachorros y adultos según el grupo",
    whatsappMessage:
      "Hola! Quiero info sobre los Grupos GIC. ¿Cuándo arranca el próximo?",
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
// Grupos GIC — Grupos de Interacción Canina
// ============================================================
export type GicGroup = {
  slug: "cachorros" | "adultos" | "miedo" | "reactividad";
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  bullets: string[];
  ideal: string;
  whatsappMessage: string;
  image: string;
};

export const GIC_GROUPS: GicGroup[] = [
  {
    slug: "cachorros",
    title: "GIC Cachorros",
    subtitle: "Socialización temprana",
    badge: "2 a 5 meses",
    description:
      "El momento clave. En las primeras semanas tu cachorro construye el mapa social que va a usar toda su vida. Lo guiamos para que ese mapa sea sano, sin trauma y con confianza.",
    bullets: [
      "Encuentros con cachorros sanos y equilibrados",
      "Lectura de señales caninas en vivo",
      "Juego apropiado, mordida controlada",
      "Habituación a personas, sonidos y entornos",
    ],
    ideal: "Cachorros entre 2 y 5 meses con vacunación al día",
    whatsappMessage: "Hola! Quiero info sobre GIC Cachorros 🐶",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "adultos",
    title: "GIC Adultos",
    subtitle: "Convivencia y control",
    badge: "Desde 1 año",
    description:
      "Para perros adultos sociables que necesitan estructura. Mejoran su comunicación con otros perros, aprenden a esperar, ceder, invitar al juego y volver a vos cuando los llamás.",
    bullets: [
      "Paseos guiados en grupo",
      "Autorregulación durante el juego",
      "Llamada confiable entre estímulos",
      "Habilidades sociales sostenibles",
    ],
    ideal: "Perros adultos sin reactividad activa",
    whatsappMessage: "Hola! Quiero info sobre GIC Adultos 🐕",
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "miedo",
    title: "GIC Miedo",
    subtitle: "Perros inseguros / fobias",
    badge: "Trabajo gradual",
    description:
      "Para perros que se esconden, tiemblan, escapan o evitan el contacto. Reconstruimos la confianza desde abajo, en un ambiente protegido, sin forzar nada. Cero exposición traumática.",
    bullets: [
      "Ambiente seguro y previsible",
      "Aproximaciones graduales sin presión",
      "Refuerzo positivo en cada pequeño avance",
      "Acompañamiento cercano al dueño",
    ],
    ideal: "Perros con miedos a personas, ruidos, otros perros o entornos",
    whatsappMessage:
      "Hola! Quiero info sobre GIC Miedo (mi perro tiene miedos o inseguridad)",
    image:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "reactividad",
    title: "GIC Reactividad",
    subtitle: "Perros que ladran o reaccionan",
    badge: "Foco específico",
    description:
      "Para perros que ladran, se erizan o explotan al cruzar otros perros o personas. Trabajamos por debajo de su umbral, enseñando respuestas alternativas sin castigo ni dominación.",
    bullets: [
      "Distancias seguras y progreso medido",
      "Sustitución de respuesta reactiva",
      "Manejo de correa y comunicación",
      "Plan paralelo para casa y paseos",
    ],
    ideal: "Perros reactivos en correa o en encuentros sociales",
    whatsappMessage:
      "Hola! Quiero info sobre GIC Reactividad (mi perro ladra o reacciona)",
    image:
      "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=1200&q=80&auto=format&fit=crop",
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
    title: "Te conocemos",
    copy: "Charlamos por WhatsApp y entendemos a tu perro, tu casa y tu rutina antes de proponer nada. Sin presión, sin guiones automáticos.",
  },
  {
    step: "02",
    title: "Plan personalizado",
    copy: "Te armamos un plan claro: qué se trabaja, en cuántas sesiones, qué resultados esperar y cuánto cuesta. Sin promesas mágicas.",
  },
  {
    step: "03",
    title: "Resultados sostenibles",
    copy: "Trabajamos en sesiones presenciales o en Grupos GIC, y te damos pautas para tu vida real. El cambio se queda mucho después de la última clase.",
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
  /**
   * URL de la imagen del caso (idealmente una foto real del cliente con
   * autorización). Reemplazá las URLs de Unsplash por fotos reales subiéndolas
   * a `public/casos/<perro>.jpg` y poniendo "/casos/luna.jpg" acá.
   */
  image: string;
  imageAlt?: string;
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
    // Border Collie blanco y negro
    image:
      "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=900&q=80&auto=format&fit=crop",
    imageAlt: "Border Collie blanco y negro caminando relajado con su dueña",
  },
  {
    name: "Diego",
    dog: "Toby",
    breed: "Mestizo rescatado · 4 años",
    problem: "Le ladraba a todo el mundo, pensé que no había vuelta",
    result: "Convive con mis sobrinos sin problema",
    quote:
      "Toby venía de la calle, todo le daba miedo y eso lo volvía agresivo. Otros entrenadores me dijeron que era 'caso perdido'. Con el GIC empezó a confiar de nuevo. Hoy es otro perro. No es magia, es paciencia y método.",
    rating: 5,
    // Perro mestizo de tamaño mediano
    image:
      "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=900&q=80&auto=format&fit=crop",
    imageAlt: "Perro mestizo tranquilo en una sesión de entrenamiento",
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
    // Labrador
    image:
      "https://images.unsplash.com/photo-1537204696486-967f1b7198c8?w=900&q=80&auto=format&fit=crop",
    imageAlt: "Labrador joven con expresión amable y atenta",
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
    // Caniche Toy
    image:
      "https://images.unsplash.com/photo-1645097140485-ccf3d61d60d5?w=900&q=80&auto=format&fit=crop",
    imageAlt: "Caniche Toy pequeño y peludo, tranquilo y feliz",
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
    a: "Sí, son una parte importante de nuestro trabajo. Hicimos modificación de conducta con cientos de casos, incluyendo agresividad entre perros, hacia personas y resguardo de recursos. Para perros que ladran o reaccionan, además, tenemos GIC Reactividad: un grupo específico para trabajar gradualmente. Siempre evaluamos primero.",
  },
  {
    q: "¿Qué son los Grupos GIC y por qué funcionan?",
    a: "GIC son nuestros Grupos de Interacción Canina: encuentros supervisados donde tu perro aprende a relacionarse de forma sana. Tenemos 4 grupos según la necesidad: GIC Cachorros (socialización temprana), GIC Adultos (convivencia y control), GIC Miedo (perros inseguros) y GIC Reactividad (perros que ladran o reaccionan). No es una guardería: es entrenamiento social estructurado.",
  },
  {
    q: "¿Sirve para cachorros o sólo para adultos?",
    a: "Para los dos. Tenemos un programa específico de educación temprana (2 a 5 meses) y el GIC Cachorros que es la mejor inversión que podés hacer: previene el 80% de los problemas que vemos en adultos. Para perros adultos también funciona, sólo lleva más tiempo y constancia.",
  },
  {
    q: "¿Las clases son individuales o grupales?",
    a: "Las dos, según lo que necesite tu perro. Adiestramiento básico y modificación de conducta arrancan 1:1 para personalizar. Los Grupos GIC son grupales por diseño. En la evaluación inicial te recomendamos qué formato te conviene.",
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

// ============================================================
// Imágenes Antes / Después (sección "Transformation")
// ----------------------------------------------------------
// 🔥 IDEAL: usar fotos reales de un mismo cliente con autorización.
// Dropealas en `public/transformation/before.jpg` y `after.jpg` y
// cambiá las URLs de abajo por "/transformation/before.jpg" etc.
//
// Para máxima conversión emocional:
// - Mismo perro o misma raza/color
// - Misma persona, mismo lugar (idealmente)
// - Estado emocional opuesto (estrés vs. calma, lejos vs. al pie)
// ============================================================
export const TRANSFORMATION_IMAGES = {
  // Antes: perro estresado / con conducta problemática
  before:
    "https://images.unsplash.com/photo-1777941334330-7c78b562653c?w=1400&q=80&auto=format&fit=crop",
  beforeAlt:
    "Perro mostrando conducta de descontrol, tenso y reactivo",

  // Después: perro feliz jugando con su dueño/a
  after:
    "https://images.unsplash.com/photo-1715483199288-4d72cae66fb8?w=1400&q=80&auto=format&fit=crop",
  afterAlt:
    "Perro feliz jugando con su dueña, vínculo fuerte y conducta equilibrada",
};

export const PRODUCTS: Product[] = [
  {
    id: "kit-cachorro",
    name: "Kit Cachorro Entre Canes",
    category: "Kits",
    price: 38900,
    description:
      "Todo lo que necesitás para arrancar bien: collar, correa de entrenamiento, mordedor, snacks de premio y guía PDF.",
    image: "/productos/kit-cachorro.svg",
    highlight: "Más vendido",
  },
  {
    id: "correa-larga",
    name: "Correa larga 5m de entrenamiento",
    category: "Paseo",
    price: 14900,
    description:
      "Diseñada para sesiones de llamada y trabajo en exteriores. Liviana, resistente, fácil de manejar.",
    image: "/productos/correa-larga.svg",
  },
  {
    id: "arnes-antitiron",
    name: "Arnés anti-tirón regulable",
    category: "Paseo",
    price: 17900,
    description:
      "El que recomendamos para perros que tiran. Sin presión en el cuello. Fácil de poner.",
    image: "/productos/arnes-antitiron.svg",
    highlight: "Recomendado",
  },
  {
    id: "snacks-naturales",
    name: "Snacks naturales premium x 250g",
    category: "Premios",
    price: 8500,
    description:
      "Hechos en Argentina, sin conservantes. Ideales para sesiones largas y reforzar comportamientos.",
    image: "/productos/snacks-naturales.svg",
  },
  {
    id: "kong-rellenable",
    name: "Juguete rellenable 'Anti-aburrimiento'",
    category: "Enriquecimiento",
    price: 11500,
    description:
      "Para perros que destruyen cosas y los que sufren ansiedad por separación. Mantiene la mente ocupada.",
    image: "/productos/kong-rellenable.svg",
  },
  {
    id: "kit-conducta",
    name: "Kit Modificación de Conducta",
    category: "Kits",
    price: 52900,
    description:
      "Línea larga, arnés, snacks de alto valor, clicker y manual de pautas. Para acompañar el plan profesional.",
    image: "/productos/kit-conducta.svg",
  },
];
