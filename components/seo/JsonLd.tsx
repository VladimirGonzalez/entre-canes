/**
 * JSON-LD renderizado en el HTML del servidor.
 *
 * Importante: NO usar next/script con strategy="afterInteractive" para
 * datos estructurados. Eso lo inyecta por JavaScript después de cargar,
 * y muchos crawlers (sobre todo los de IAs: GPTBot, ClaudeBot,
 * PerplexityBot) no ejecutan JS, así que nunca lo ven.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escapamos "<" para que ningún texto pueda cerrar el <script>.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}
