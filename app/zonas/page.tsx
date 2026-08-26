import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { zonasByRegion } from "@/lib/zonas";
import { agendaMonth } from "@/lib/agenda";

// El mes de agenda viaja en el HTML: lo regeneramos cada hora.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Zonas de cobertura — Adiestramiento canino a domicilio en GBA y CABA",
  description:
    "Adiestramiento canino a domicilio en San Miguel, Bella Vista, Los Polvorines, Don Torcuato, San Isidro, Vicente López, CABA y más zonas de GBA. Consultá tu zona.",
  alternates: { canonical: "/zonas" },
};

export default function ZonasPage() {
  const groups = zonasByRegion();

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[400px] bg-radial-spot"
        />
        <Container size="wide">
          <Reveal>
            <SectionLabel variant="amber">Zonas de cobertura</SectionLabel>
            <h1 className="mt-4 text-display-2xl text-brand-ink">
              Adiestramiento a domicilio <br className="hidden sm:block" />
              en tu zona.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-slate sm:text-lg">
              Trabajamos donde las conductas pasan de verdad: tu casa, tu
              vereda, tu plaza. Atendemos en zona norte, noroeste y oeste del
              Gran Buenos Aires, y en toda la Ciudad de Buenos Aires. Elegí tu
              zona para ver cómo trabajamos ahí.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container size="wide">
          <div className="grid gap-6 lg:grid-cols-2">
            {groups.map((group, gIdx) => (
              <Reveal key={group.region} delay={gIdx * 0.06}>
                <div className="h-full rounded-3xl border border-brand-line bg-white p-7 sm:p-8">
                  <h2 className="text-lg font-semibold tracking-tight text-brand-ink">
                    {group.region}
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {group.zonas.map((z) => (
                      <li key={z.slug}>
                        <Link
                          href={`/zonas/${z.slug}`}
                          className="group flex items-center justify-between gap-4 rounded-2xl border border-brand-line px-4 py-3 transition-all hover:border-brand-ink hover:shadow-card"
                        >
                          <span className="flex items-center gap-2.5">
                            <MapPin className="h-4 w-4 shrink-0 text-brand-amberDark" />
                            <span className="text-sm font-medium text-brand-ink">
                              {z.name}
                            </span>
                            {z.name !== z.partido && (
                              <span className="hidden text-xs text-brand-mist sm:inline">
                                {z.partido}
                              </span>
                            )}
                          </span>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-brand-mist transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-ink" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-sm leading-relaxed text-brand-slate">
              ¿Tu zona no aparece en la lista? Escribinos igual: según el caso
              y la agenda, llegamos a localidades vecinas de las zonas que
              cubrimos.
            </p>
          </Reveal>
        </Container>
      </section>

      <FinalCTA initialMonth={agendaMonth()} />
    </>
  );
}
