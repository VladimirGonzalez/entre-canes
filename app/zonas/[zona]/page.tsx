import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import {
  MapPin,
  MessageCircle,
  Calendar,
  ArrowRight,
  Check,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SITE, buildWhatsAppLink } from "@/lib/constants";
import { ZONAS, getZona, zonaWhatsAppMessage } from "@/lib/zonas";
import { agendaMonth } from "@/lib/agenda";

type Props = { params: { zona: string } };

// El mes de agenda viaja en el HTML: lo regeneramos cada hora.
export const revalidate = 3600;

export function generateStaticParams() {
  return ZONAS.map((z) => ({ zona: z.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const zona = getZona(params.zona);
  if (!zona) return {};
  const ubicacion =
    zona.name === zona.partido ? zona.name : `${zona.name}, ${zona.partido}`;
  return {
    title: `Adiestramiento canino en ${zona.name} — A domicilio y con método`,
    description: `Adiestramiento canino y modificación de conducta a domicilio en ${ubicacion}. Paseos sin tirones, obediencia y socialización. Evaluación gratuita.`,
    alternates: { canonical: `/zonas/${zona.slug}` },
    openGraph: {
      title: `Adiestramiento canino en ${zona.name} · ${SITE.name}`,
      description: `Adiestramiento y modificación de conducta a domicilio en ${zona.name}. Reservá tu evaluación gratuita.`,
    },
  };
}

const BENEFITS = [
  "Sesiones a domicilio: trabajamos en tu casa y tu barrio",
  "Evaluación inicial gratuita y sin compromiso",
  "Refuerzo positivo: sin castigos, gritos ni dominación",
  "Plan personalizado según tu perro y tu rutina",
  "Seguimiento por WhatsApp entre sesiones",
];

export default function ZonaPage({ params }: Props) {
  const zona = getZona(params.zona);
  if (!zona) notFound();

  const whatsapp = buildWhatsAppLink(zonaWhatsAppMessage(zona.name));
  const otherZonas = ZONAS.filter((z) => z.slug !== zona.slug);

  return (
    <>
      {/* JSON-LD: Service localizado */}
      <Script
        id={`ld-service-${zona.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `Adiestramiento canino en ${zona.name}`,
            serviceType: "Adiestramiento canino y modificación de conducta",
            provider: { "@id": `${SITE.url}/#localbusiness` },
            areaServed: {
              "@type": "Place",
              name:
                zona.name === zona.partido
                  ? `${zona.name}, Buenos Aires, Argentina`
                  : `${zona.name}, ${zona.partido}, Buenos Aires, Argentina`,
            },
            url: `${SITE.url}/zonas/${zona.slug}`,
          }),
        }}
      />

      {/* Page hero */}
      <section className="relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[400px] bg-radial-spot"
        />
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionLabel variant="amber">
                  <MapPin className="h-3 w-3" />
                  {zona.name === zona.partido
                    ? `${zona.name}, Buenos Aires`
                    : `${zona.name} · Partido de ${zona.partido}`}
                </SectionLabel>
                <h1 className="mt-4 text-display-2xl text-brand-ink">
                  Adiestramiento canino <br className="hidden sm:block" />
                  en {zona.name}.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-slate sm:text-lg">
                  {zona.blurb} Adiestramiento básico, educación de cachorros y
                  modificación de conducta: reactividad, miedos, ansiedad por
                  separación y paseos sin tirones.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href={whatsapp} external variant="amber" size="lg">
                    <Calendar className="h-5 w-5" />
                    Reservar evaluación gratuita
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                  <Button href={whatsapp} external variant="ghost" size="lg">
                    <MessageCircle className="h-5 w-5 text-[#25D366]" />
                    Consultar por WhatsApp
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.15}>
                <div className="rounded-3xl border border-brand-line bg-white p-7 sm:p-8">
                  <p className="text-sm font-semibold uppercase tracking-wider text-brand-mist">
                    Cómo trabajamos en {zona.name}
                  </p>
                  <ul className="mt-5 space-y-3.5">
                    {BENEFITS.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-amber/15">
                          <Check className="h-3 w-3 text-brand-amberDark" />
                        </span>
                        <span className="text-sm leading-relaxed text-brand-slate">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <ServicesGrid showAll showHeader={false} />
      <Testimonials />

      {/* Otras zonas (interlinking SEO) */}
      <section className="section bg-brand-paper">
        <Container size="wide">
          <Reveal>
            <h2 className="text-display-lg text-brand-ink">
              También atendemos cerca de {zona.name}.
            </h2>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {otherZonas.map((z) => (
                <Link
                  key={z.slug}
                  href={`/zonas/${z.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-line bg-white px-4 py-2 text-sm font-medium text-brand-ink transition-all hover:-translate-y-0.5 hover:border-brand-ink hover:shadow-card"
                >
                  <MapPin className="h-3.5 w-3.5 text-brand-amberDark" />
                  {z.name}
                </Link>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <FinalCTA initialMonth={agendaMonth()} />
    </>
  );
}
