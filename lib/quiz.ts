// ============================================================
// Quiz de diagnóstico — Entre Canes
// Motor de preguntas y recomendaciones personalizadas.
// ============================================================

import { ZONAS } from "@/lib/zonas";

export type QuizOptionId = string;

export type QuizQuestion = {
  id: string;
  /** Eyebrow corto (ej: "Paso 1 de 4") se calcula en el componente */
  title: string;
  subtitle?: string;
  /** Si es un input de texto en lugar de opciones */
  type?: "single" | "text";
  options?: {
    id: QuizOptionId;
    label: string;
    /** Descripción corta debajo del label, opcional */
    hint?: string;
    /** Emoji decorativo opcional */
    emoji?: string;
    /**
     * Si está presente, al elegir esta opción se pide que la persona escriba
     * su caso en sus palabras. El paso no auto-avanza hasta que lo complete.
     */
    requiresText?: {
      name: string;
      label: string;
      placeholder: string;
    };
  }[];
  /** Para tipo "text" */
  fields?: {
    name: string;
    label: string;
    placeholder: string;
    optional?: boolean;
    /** "select" muestra un desplegable con `options` */
    kind?: "text" | "select";
    options?: { value: string; label: string }[];
  }[];
};

// ============================================================
// Preguntas
// ============================================================
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "problem",
    title: "¿Cuál es el problema principal que querés resolver?",
    subtitle: "Elegí el que más te limita el día a día.",
    type: "single",
    options: [
      {
        id: "tira-correa",
        label: "Tira de la correa / paseos imposibles",
        emoji: "🦮",
      },
      {
        id: "ladridos",
        label: "Ladra a todo: timbre, perros, gente",
        emoji: "🔔",
      },
      {
        id: "agresividad",
        label: "Es agresivo o reactivo con otros perros",
        emoji: "⚠️",
      },
      {
        id: "miedo",
        label: "Tiene miedo, ansiedad o se esconde",
        emoji: "💔",
      },
      {
        id: "ansiedad-separacion",
        label: "Llora, destroza o ladra cuando se queda solo",
        emoji: "🏠",
      },
      {
        id: "cachorro",
        label: "Es un cachorro y no sé por dónde empezar",
        emoji: "🐶",
      },
      {
        id: "obediencia",
        label: "No me obedece / ignora órdenes",
        emoji: "🎯",
      },
      {
        id: "varios",
        label: "Varios problemas a la vez",
        emoji: "🌀",
      },
      {
        id: "otro",
        label: "Otra cosa — te la cuento yo",
        hint: "Escribí tu caso puntual",
        emoji: "✍️",
        requiresText: {
          name: "problemCustom",
          label: "Contanos qué pasa con tu perro",
          placeholder:
            "Ej: se sube a la mesa a comer, no se deja cortar las uñas, persigue autos, se escapa por el portón...",
        },
      },
    ],
  },
  {
    id: "age",
    title: "¿Qué edad tiene tu perro?",
    type: "single",
    options: [
      { id: "puppy", label: "Cachorro", hint: "Menos de 6 meses", emoji: "🐶" },
      { id: "young", label: "Joven", hint: "6 meses a 2 años", emoji: "🐕" },
      { id: "adult", label: "Adulto", hint: "2 a 7 años", emoji: "🐕‍🦺" },
      { id: "senior", label: "Senior", hint: "7 años o más", emoji: "🦴" },
    ],
  },
  {
    id: "duration",
    title: "¿Hace cuánto convivís con este problema?",
    type: "single",
    options: [
      { id: "recent", label: "Recién empieza", hint: "Últimas semanas", emoji: "🌱" },
      { id: "months", label: "Algunos meses", emoji: "📅" },
      { id: "long", label: "Más de 6 meses", emoji: "⏳" },
      { id: "always", label: "Desde siempre", emoji: "🌀" },
    ],
  },
  {
    id: "severity",
    title: "¿Qué tan grave es para tu vida diaria?",
    subtitle: "Sé honesto. Esto nos ayuda a recomendar el camino correcto.",
    type: "single",
    options: [
      {
        id: "low",
        label: "Manejable, pero me cansa",
        hint: "Convivo, pero no disfruto",
        emoji: "😐",
      },
      {
        id: "medium",
        label: "Me está limitando la vida",
        hint: "Cambié rutinas, evito lugares",
        emoji: "😣",
      },
      {
        id: "high",
        label: "Es peligroso o pone en riesgo a alguien",
        hint: "Mordidas, daño, escapes",
        emoji: "🚨",
      },
    ],
  },
  {
    id: "context",
    title: "Para personalizar tu diagnóstico",
    subtitle:
      "Con tu zona te confirmamos si llegamos hasta tu casa. El resto ayuda a darte una respuesta más precisa.",
    type: "text",
    fields: [
      {
        name: "zone",
        label: "¿De qué zona sos?",
        placeholder: "Elegí tu zona",
        optional: true,
        kind: "select",
        options: [
          ...ZONAS.map((z) => ({ value: z.slug, label: z.name })),
          { value: "otra", label: "Otra zona / no está en la lista" },
        ],
      },
      {
        name: "dogName",
        label: "Nombre de tu perro",
        placeholder: "Ej: Luna",
        optional: true,
      },
      {
        name: "breed",
        label: "Raza (o mestizo)",
        placeholder: "Ej: Border Collie, Mestizo grande...",
        optional: true,
      },
    ],
  },
];

// ============================================================
// Tipo de respuestas
// ============================================================
export type QuizAnswers = {
  problem?: string;
  /** Texto libre cuando eligen "Otra cosa" */
  problemCustom?: string;
  /** Slug de zona (ver lib/zonas.ts) o "otra" */
  zone?: string;
  age?: string;
  duration?: string;
  severity?: string;
  dogName?: string;
  breed?: string;
};

// ============================================================
// Motor de recomendación
// ============================================================
export type Recommendation = {
  /** Slug del servicio recomendado (matches SERVICES[].slug) */
  serviceSlug:
    | "adiestramiento-basico"
    | "modificacion-conducta"
    | "gic"
    | "educacion-cachorros"
    | "domicilio";
  /** Si recomienda un sub-grupo dentro de GIC */
  gicGroup?: "cachorros" | "adultos" | "miedo" | "reactividad";
  /** Diagnóstico breve, personalizado */
  diagnosis: string;
  /** Headline del resultado */
  headline: string;
  /** Tag de severidad */
  urgency: "baja" | "media" | "alta";
  /** Mensaje pre-llenado para WhatsApp */
  whatsappMessage: string;
};

/**
 * Devuelve la recomendación personalizada según las respuestas del quiz.
 */
export function getRecommendation(answers: QuizAnswers): Recommendation {
  const { problem, problemCustom, age, duration, severity, dogName, breed, zone } =
    answers;

  const dogLabel = dogName ? dogName : "mi perro";
  const breedLabel = breed ? ` (${breed})` : "";

  // ─── 1) Cachorros: siempre van a educación temprana ──────────
  if (age === "puppy" || problem === "cachorro") {
    return {
      serviceSlug: "educacion-cachorros",
      diagnosis:
        "Estás en el momento más importante. Las primeras 16 semanas de un cachorro definen el 80% de su conducta adulta. Bien guiado, prevenís la mayoría de los problemas que llegan a vernos en perros grandes.",
      headline: "Educación temprana para cachorros",
      urgency: "media",
      whatsappMessage: buildWhatsAppMessage({
        diagnosis: "Tengo un cachorro y quiero arrancar bien con su educación",
        dogLabel,
        breedLabel,
        problem,
        problemCustom,
        age,
        duration,
        severity,
        zone,
      }),
    };
  }

  // ─── 2) Casos graves o de conducta seria → Modificación ──────
  const seriousProblems = ["agresividad", "miedo", "ansiedad-separacion"];
  const isSeriousProblem = problem ? seriousProblems.includes(problem) : false;
  const isHighSeverity = severity === "high";
  const isOldProblem = duration === "long" || duration === "always";

  if (isSeriousProblem || isHighSeverity) {
    let diagnosis = "";
    if (problem === "agresividad") {
      diagnosis =
        "Lo que describís suena a reactividad o agresividad social — un cuadro que no se soluciona con obediencia común. Hay que trabajar la causa: el umbral del perro, sus gatillos, su comunicación. Lleva tiempo, pero tiene solución concreta cuando se aborda con método.";
    } else if (problem === "miedo") {
      diagnosis =
        "Los miedos y fobias requieren un trabajo gradual y sin presión. Forzar la exposición empeora el cuadro. Lo que hacemos es reconstruir la confianza desde abajo, en un ambiente seguro, con avances medidos.";
    } else if (problem === "ansiedad-separacion") {
      diagnosis =
        "La ansiedad por separación es una de las conductas más mal tratadas. Los collares, los juguetes y las despedidas largas casi siempre empeoran el cuadro. Tiene protocolo claro y resultados sostenibles cuando se trabaja bien.";
    } else {
      diagnosis =
        "Por la gravedad que describís, no es un caso de obediencia común. Necesitás un abordaje serio de modificación de conducta, con evaluación previa y plan personalizado.";
    }

    return {
      serviceSlug: "modificacion-conducta",
      diagnosis,
      headline: "Modificación de conducta",
      urgency: isHighSeverity ? "alta" : "media",
      whatsappMessage: buildWhatsAppMessage({
        diagnosis: `Necesito ayuda con modificación de conducta para ${dogLabel}${breedLabel}`,
        dogLabel,
        breedLabel,
        problem,
        problemCustom,
        age,
        duration,
        severity,
        zone,
      }),
    };
  }

  // ─── 3) Ladridos / reactividad: GIC o modificación según gravedad ──
  if (problem === "ladridos") {
    if (isOldProblem) {
      return {
        serviceSlug: "modificacion-conducta",
        diagnosis:
          "Los ladridos sostenidos en el tiempo se vuelven una conducta automática. Cuanto más vieja la respuesta, más esfuerzo de modificación de conducta requiere. La buena noticia: con plan claro, en pocas semanas hay cambios reales.",
        headline: "Modificación de conducta",
        urgency: "media",
        whatsappMessage: buildWhatsAppMessage({
          diagnosis: `${dogLabel}${breedLabel} ladra mucho y necesito ayuda profesional`,
          dogLabel,
          breedLabel,
          problem,
          problemCustom,
          age,
          duration,
          severity,
          zone,
        }),
      };
    }
    return {
      serviceSlug: "modificacion-conducta",
      diagnosis:
        "Los ladridos hacia estímulos externos (timbre, otros perros, ruidos) son señales de reactividad. Trabajamos por debajo del umbral del perro, enseñando respuestas alternativas sin castigo ni dominación, con un abordaje de modificación de conducta paso a paso.",
      headline: "Modificación de conducta",
      urgency: "media",
      whatsappMessage: buildWhatsAppMessage({
        diagnosis: `${dogLabel}${breedLabel} ladra a otros perros, gente o ruidos y necesito ayuda con modificación de conducta`,
        dogLabel,
        breedLabel,
        problem,
        problemCustom,
        age,
        duration,
        severity,
        zone,
      }),
    };
  }

  // ─── 4) Tira de la correa u obediencia → Básico ────────────────
  if (problem === "tira-correa" || problem === "obediencia") {
    return {
      serviceSlug: "adiestramiento-basico",
      diagnosis:
        problem === "tira-correa"
          ? "Tirar de la correa no se arregla con un arnés ni con corrección física. Se arregla enseñándole al perro qué hacer en lugar de tirar, y construyendo refuerzo en los paseos. Es uno de los cambios más rápidos cuando se trabaja bien."
          : "La obediencia se construye con repetición clara y refuerzo positivo. En 8-10 sesiones recuperás la respuesta a las órdenes básicas y el llamado confiable en exteriores.",
      headline: "Adiestramiento básico",
      urgency: "baja",
      whatsappMessage: buildWhatsAppMessage({
        diagnosis: `Quiero info sobre adiestramiento básico para ${dogLabel}${breedLabel}`,
        dogLabel,
        breedLabel,
        problem,
        problemCustom,
        age,
        duration,
        severity,
        zone,
      }),
    };
  }

  // ─── 5) Varios problemas → Asesoramiento a domicilio ───────────
  if (problem === "varios") {
    return {
      serviceSlug: "domicilio",
      diagnosis:
        "Cuando se acumulan varios problemas, lo más eficiente es una sesión a domicilio. Vemos a tu perro en su contexto real (tu casa, tu rutina, tu zona) y armamos un plan integral, no parches sueltos.",
      headline: "Asesoramiento a domicilio",
      urgency: "media",
      whatsappMessage: buildWhatsAppMessage({
        diagnosis: `Tengo varios problemas con ${dogLabel}${breedLabel} y quiero una sesión a domicilio`,
        dogLabel,
        breedLabel,
        problem,
        problemCustom,
        age,
        duration,
        severity,
        zone,
      }),
    };
  }

  // ─── 6) Caso puntual que no entra en las categorías ───────────
  if (problem === "otro") {
    return {
      serviceSlug: "domicilio",
      diagnosis:
        "Lo que contás no entra en las categorías típicas, y eso es más común de lo que parece: cada perro tiene su combinación. Para casos puntuales lo más eficiente es vernos en tu casa, observar la conducta donde realmente ocurre y armar un plan a medida en lugar de aplicar una receta genérica.",
      headline: "Asesoramiento a domicilio",
      urgency: "media",
      whatsappMessage: buildWhatsAppMessage({
        diagnosis: `Tengo un caso puntual con ${dogLabel}${breedLabel} y quiero asesoramiento`,
        dogLabel,
        breedLabel,
        problem,
        problemCustom,
        age,
        duration,
        severity,
        zone,
      }),
    };
  }

  // ─── Fallback: básico ──────────────────────────────────────────
  return {
    serviceSlug: "adiestramiento-basico",
    diagnosis:
      "Por lo que contás, lo más probable es que empecemos por adiestramiento básico para construir las bases. En la evaluación inicial podemos ajustar el plan según lo que veamos en persona.",
    headline: "Adiestramiento básico",
    urgency: "baja",
    whatsappMessage: buildWhatsAppMessage({
      diagnosis: `Hice el diagnóstico online y quiero hablar sobre el caso de ${dogLabel}${breedLabel}`,
      dogLabel,
      breedLabel,
      problem,
      problemCustom,
      age,
      duration,
      severity,
      zone,
    }),
  };
}

// ============================================================
// Builder de mensaje WhatsApp con todas las respuestas
// ============================================================
function buildWhatsAppMessage(args: {
  diagnosis: string;
  dogLabel: string;
  breedLabel: string;
  problem?: string;
  problemCustom?: string;
  age?: string;
  duration?: string;
  severity?: string;
  zone?: string;
}) {
  const { diagnosis, problem, problemCustom, age, duration, severity, zone } =
    args;

  const problemLabels: Record<string, string> = {
    "tira-correa": "Tira de la correa",
    ladridos: "Ladra a todo",
    agresividad: "Agresivo o reactivo con otros perros",
    miedo: "Miedos / ansiedad / fobias",
    "ansiedad-separacion": "Ansiedad por separación",
    cachorro: "Cachorro que arranca de cero",
    obediencia: "Obediencia / no escucha",
    varios: "Varios problemas a la vez",
    otro: "Caso puntual",
  };

  // Si escribieron su caso, eso vale más que la etiqueta genérica.
  const problemLine =
    problem === "otro" && problemCustom?.trim()
      ? `• Problema: ${problemCustom.trim()}`
      : problem
        ? `• Problema: ${problemLabels[problem] ?? problem}`
        : null;

  const zoneLine = zone
    ? `• Zona: ${ZONAS.find((z) => z.slug === zone)?.name ?? "Otra (a confirmar)"}`
    : null;

  const ageLabels: Record<string, string> = {
    puppy: "Cachorro (<6m)",
    young: "Joven (6m-2a)",
    adult: "Adulto (2-7a)",
    senior: "Senior (7+a)",
  };

  const durationLabels: Record<string, string> = {
    recent: "Recién empieza",
    months: "Algunos meses",
    long: "Más de 6 meses",
    always: "Desde siempre",
  };

  const severityLabels: Record<string, string> = {
    low: "Manejable",
    medium: "Limita mi vida",
    high: "Grave / peligroso",
  };

  const lines = [
    `¡Hola Entre Canes! ${diagnosis}.`,
    "",
    "Mi diagnóstico online:",
    problemLine,
    age ? `• Edad: ${ageLabels[age] ?? age}` : null,
    duration ? `• Hace: ${durationLabels[duration] ?? duration}` : null,
    severity ? `• Gravedad: ${severityLabels[severity] ?? severity}` : null,
    zoneLine,
    "",
    "¿Cuándo podemos hablar?",
  ].filter(Boolean);

  return lines.join("\n");
}
