import { Container } from "@/components/ui/Container";

const ITEMS = [
  "Método científico",
  "Sin castigo",
  "Refuerzo positivo",
  "Atención cercana",
  "Cupos limitados",
  "Sesiones presenciales y a domicilio",
  "Grupos GIC originales",
  "Resultados medibles",
];

/**
 * Marquee horizontal con los pilares de marca.
 * Sirve como rompedor entre secciones y refuerzo de mensajes clave.
 */
export function BrandStrip() {
  return (
    <section className="relative border-y border-brand-line bg-white py-3 overflow-hidden">
      <Container size="wide" className="overflow-hidden">
        <div className="relative">
          <div className="flex gap-12 whitespace-nowrap animate-marquee">
            {[...ITEMS, ...ITEMS].map((it, idx) => (
              <span
                key={`${it}-${idx}`}
                className="flex shrink-0 items-center gap-3 text-sm text-brand-slate"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-amber" />
                {it}
              </span>
            ))}
          </div>
          {/* Edge fades */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent"
          />
        </div>
      </Container>
    </section>
  );
}
