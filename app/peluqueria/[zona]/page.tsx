import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  GroomingCTA,
  GroomingFAQ,
  GroomingServices,
  GroomingSteps,
  GroomingWhatsAppButton,
  GroomingWhy,
} from "@/components/sections/Grooming";
import { GroomingZones } from "@/components/sections/GroomingZones";
import { SITE } from "@/lib/constants";
import { ZONAS, getZona, type Zona } from "@/lib/zonas";
import {
  GROOMING,
  groomingZonaFAQ,
  groomingZonaSchema,
  groomingZonaWhatsAppMessage,
  listaNatural,
  nearbyZonas,
  zonaUbicacion,
} from "@/lib/peluqueria";

type Props = { params: { zona: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return ZONAS.map((z) => ({ zona: z.slug }));
}

function describe(z: Zona) {
  return `Peluquería canina en ${zonaUbicacion(z)}: baño, corte de raza, deslanado, uñas e higiene de oídos. Atendida por adiestradores, sin forcejeos. Pedí turno por WhatsApp.`;
}

export function generateMetadata({ params }: Props): Metadata {
  const zona = getZona(params.zona);
  if (!zona) return {};
  const description = describe(zona);
  const title = `Peluquería canina en ${zona.name} — Baño, corte y deslanado`;
  return {
    title,
    description,
    keywords: [
      `peluquería canina ${zona.name}`,
      `peluquería para perros ${zona.name}`,
      `baño para perros ${zona.name}`,
      `corte de pelo perro ${zona.name}`,
      `deslanado ${zona.name}`,
      `estética canina ${zona.name}`,
      `peluquería canina ${zona.partido}`,
    ],
    alternates: { canonical: `/peluqueria/${zona.slug}` },
    openGraph: {
      type: "website",
      locale: "es_AR",
      url: `${SITE.url}/peluqueria/${zona.slug}`,
      siteName: SITE.name,
      title: `Peluquería canina en ${zona.name} · ${SITE.name}`,
      description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Peluquería canina en ${zona.name} · ${SITE.name}`,
      description,
      images: ["/og.png"],
    },
  };
}

export default function PeluqueriaZonaPage({ params }: Props) {
  const zona = getZona(params.zona);
  if (!zona) notFound();

  const message = groomingZonaWhatsAppMessage(zona.name);
  const cercanas = nearbyZonas(zona);
  const ubicacion =
    zona.name === zona.partido
      ? `${zona.name}, Buenos Aires`
      : `${zona.name} · Partido de ${zona.partido}`;

  return (
    <>
      <JsonLd data={groomingZonaSchema(zona, describe(zona))} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-16 lg:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[400px] bg-radial-spot"
        />
        <Container size="wide">
          <nav aria-label="Migas de pan" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-brand-slate">
              <li className="flex items-center gap-1">
                <Link href="/" className="hover:text-brand-ink">
                  Inicio
                </Link>
                <ChevronRight className="h-3 w-3" aria-hidden />
              </li>
              <li className="flex items-center gap-1">
                <Link href="/peluqueria" className="hover:text-brand-ink">
                  Peluquería canina
                </Link>
                <ChevronRight className="h-3 w-3" aria-hidden />
              </li>
              <li aria-current="page" className="font-medium text-brand-ink">
                {zona.name}
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionLabel variant="amber">
                  <MapPin className="h-3 w-3" />
                  {ubicacion}
                </SectionLabel>
                <h1 className="mt-4 text-display-2xl text-brand-ink">
                  Peluquería canina <br className="hidden sm:block" />
                  en {zona.name}.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-slate sm:text-lg">
                  Baño completo, corte de raza o a gusto, deslanado, corte de
                  uñas e higiene de oídos para perros de {zonaUbicacion(zona)}.
                  La hace un equipo de adiestradores: manejo con calma, sin
                  forcejeos, ideal si tu perro se pone nervioso en la
                  peluquería.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <GroomingWhatsAppButton
                    message={message}
                    source={`peluqueria-${zona.slug}-hero`}
                  >
                    <MessageCircle className="h-5 w-5" />
                    Pedir turno en {zona.name}
                  </GroomingWhatsAppButton>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.15}>
                <div className="rounded-3xl border border-brand-line bg-white p-7 sm:p-8">
                  <p className="text-sm font-semibold uppercase tracking-wider text-brand-mist">
                    Ideal si tu perro…
                  </p>
                  <ul className="mt-5 space-y-3.5">
                    {GROOMING.idealFor.map((b) => (
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
                  {cercanas.length > 0 && (
                    <p className="mt-6 border-t border-brand-line pt-5 text-sm leading-relaxed text-brand-slate">
                      También damos turnos en{" "}
                      {listaNatural(cercanas.slice(0, 4).map((c) => c.name))}.
                    </p>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <GroomingServices
        title={<>Qué incluye la peluquería canina en {zona.name}.</>}
      />
      <GroomingWhy />
      <GroomingSteps />
      <GroomingFAQ
        items={groomingZonaFAQ(zona)}
        title={<>Peluquería canina en {zona.name}: preguntas frecuentes.</>}
      />
      {cercanas.length > 0 && (
        <GroomingZones
          title={<>También cerca de {zona.name}.</>}
          only={cercanas}
        />
      )}

      <section className="pb-4">
        <Container size="wide">
          <p className="text-sm text-brand-slate">
            ¿Buscás otra zona?{" "}
            <Link
              href="/peluqueria"
              className="font-medium text-brand-ink underline decoration-brand-line underline-offset-4 hover:decoration-brand-ink"
            >
              Ver peluquería canina en todas las zonas
            </Link>
            .
          </p>
        </Container>
      </section>

      <GroomingCTA
        message={message}
        source={`peluqueria-${zona.slug}-final`}
        title={`¿Le toca baño? Pedí tu turno en ${zona.name}.`}
      />
    </>
  );
}
