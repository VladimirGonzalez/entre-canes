// ============================================================
// /llms.txt — resumen del sitio para asistentes de IA
// (ChatGPT, Claude, Perplexity, Gemini). Formato: https://llmstxt.org
// Se genera desde las mismas constantes que el sitio, así que nunca
// queda desactualizado respecto del contenido real.
// ============================================================
import {
  CONTACT,
  FAQ,
  GROOMING_CONTACT,
  SERVICES,
  SITE,
  SOCIAL,
} from "@/lib/constants";
import { ZONAS } from "@/lib/zonas";
import { GROOMING, GROOMING_FAQ, ZONAS_LISTA } from "@/lib/peluqueria";

export const dynamic = "force-static";

export function GET() {
  const u = SITE.url;
  const lines: string[] = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.name} es una escuela canina de Buenos Aires, Argentina. Hace adiestramiento canino, modificación de conducta y educación de cachorros con refuerzo positivo, y tiene además un servicio separado de peluquería canina con manejo sin estrés. Atiende zona norte, noroeste y oeste del GBA y CABA.`,
    "",
    "## Contacto",
    "",
    `- WhatsApp de adiestramiento: ${CONTACT.phone}`,
    `- WhatsApp de peluquería canina (turnos de baño y corte): ${GROOMING_CONTACT.phone}`,
    `- Email: ${CONTACT.email}`,
    `- Sitio: ${u}`,
    `- Instagram: ${SOCIAL.instagram}`,
    "",
    "## Adiestramiento canino y conducta",
    "",
    `- [Servicios de adiestramiento](${u}/servicios): programas a medida según edad y caso. Método de refuerzo positivo, sin collares de castigo ni dominación.`,
    ...SERVICES.map(
      (s) =>
        `- [${s.title}](${u}/servicios#${s.slug}): ${s.tagline} ${s.description}`
    ),
    "",
    "## Peluquería canina",
    "",
    `- [Peluquería canina](${u}/peluqueria): ${GROOMING.summary}`,
    ...GROOMING.items.map((i) => `- ${i.title}: ${i.copy}`),
    `- ${GROOMING.note}`,
    `- Zonas: ${ZONAS_LISTA}.`,
    `- Turnos: por WhatsApp al ${GROOMING_CONTACT.phone} (número exclusivo de peluquería). El valor depende del tamaño del perro y del tipo y estado del pelo; se informa antes de confirmar.`,
    "",
    "### Peluquería canina por zona",
    "",
    ...ZONAS.map(
      (z) => `- [Peluquería canina en ${z.name}](${u}/peluqueria/${z.slug})`
    ),
    "",
    "## Adiestramiento canino por zona",
    "",
    ...ZONAS.map(
      (z) => `- [Adiestramiento canino en ${z.name}](${u}/zonas/${z.slug})`
    ),
    "",
    "## Preguntas frecuentes: adiestramiento",
    "",
    ...FAQ.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
    "## Preguntas frecuentes: peluquería canina",
    "",
    ...GROOMING_FAQ.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
    "## Otras páginas",
    "",
    `- [Resultados y casos](${u}/resultados)`,
    `- [Sobre nosotros](${u}/sobre-nosotros)`,
    `- [Contacto](${u}/contacto)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
