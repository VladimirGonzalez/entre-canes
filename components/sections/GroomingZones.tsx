import Link from "next/link";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { zonasByRegion, type Zona } from "@/lib/zonas";

/**
 * Enlaces a /peluqueria/[zona]. Es el interlinking que hace que Google
 * y las IAs descubran y entiendan la cobertura completa por ciudad.
 */
export function GroomingZones({
  title,
  subtitle,
  only,
}: {
  title: React.ReactNode;
  subtitle?: string;
  /** Si se pasa, muestra solo estas zonas (sin agrupar por región). */
  only?: Zona[];
}) {
  const groups = only
    ? [{ region: null as string | null, zonas: only }]
    : zonasByRegion().filter((g) => g.zonas.length > 0);

  return (
    <section className="section bg-brand-paper">
      <Container size="wide">
        <Reveal>
          <SectionTitle eyebrow="Zonas" title={title} subtitle={subtitle} />
        </Reveal>

        <div className="mt-10 grid gap-8">
          {groups.map((g) => (
            <Reveal key={g.region ?? "cercanas"}>
              <div>
                {g.region && (
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-mist">
                    {g.region}
                  </h3>
                )}
                <ul className={g.region ? "mt-3 flex flex-wrap gap-2.5" : "flex flex-wrap gap-2.5"}>
                  {g.zonas.map((z) => (
                    <li key={z.slug}>
                      <Link
                        href={`/peluqueria/${z.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-brand-line bg-white px-4 py-2 text-sm font-medium text-brand-ink transition-all hover:-translate-y-0.5 hover:border-brand-ink hover:shadow-card"
                      >
                        <MapPin className="h-3.5 w-3.5 text-brand-amberDark" />
                        Peluquería canina en {z.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
