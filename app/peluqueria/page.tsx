import type { Metadata } from "next";
import { Check, MessageCircle, Scissors } from "lucide-react";
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
import { GROOMING, GROOMING_FAQ, groomingSchema } from "@/lib/peluqueria";

const TITLE = "Peluquería canina — Baño, corte y deslanado sin estrés";
const DESCRIPTION =
  "Peluquería canina en zona norte, noroeste y oeste del GBA y CABA: baño, corte de raza, deslanado, uñas e higiene de oídos. Atendida por adiestradores, ideal para perros nerviosos. Pedí turno por WhatsApp.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "peluquería canina",
    "peluquería para perros",
    "baño para perros",
    "baño y corte perros",
    "corte de pelo perro",
    "deslanado perros",
    "estética canina",
    "grooming canino",
    "corte de uñas perro",
    "peluquería canina zona norte",
    "peluquería canina perros nerviosos",
  ],
  alternates: { canonical: "/peluqueria" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: `${SITE.url}/peluqueria`,
    siteName: SITE.name,
    title: `Peluquería canina · ${SITE.name}`,
    description: DESCRIPTION,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Peluquería canina · ${SITE.name}`,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function PeluqueriaPage() {
  return (
    <>
      <JsonLd data={groomingSchema(DESCRIPTION)} />

      {/* Hero */}
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
                  <Scissors className="h-3 w-3" />
                  Peluquería canina
                </SectionLabel>
                <h1 className="mt-4 text-display-2xl text-brand-ink">
                  Baño, corte y deslanado. <br className="hidden sm:block" />
                  Sin forcejeos.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-slate sm:text-lg">
                  {GROOMING.summary}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <GroomingWhatsAppButton
                    message={GROOMING.whatsappMessage}
                    source="peluqueria-hero"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Pedir turno por WhatsApp
                  </GroomingWhatsAppButton>
                  <a
                    href="#servicios-peluqueria"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-line bg-white px-6 py-4 text-base font-medium text-brand-ink transition-all duration-300 hover:border-brand-ink hover:bg-brand-paper"
                  >
                    Ver qué incluye
                  </a>
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
                  <p className="mt-6 border-t border-brand-line pt-5 text-sm leading-relaxed text-brand-slate">
                    ¿Tu perro es tranquilo? Mejor todavía: el turno es igual de
                    cuidado y más rápido.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <GroomingServices title="Todo lo que necesita para quedar impecable." />
      <GroomingWhy />
      <GroomingSteps />
      <GroomingZones
        title="Peluquería canina en tu zona."
        subtitle="Damos turnos para perros de zona norte, noroeste y oeste del GBA y de CABA. Elegí tu zona para ver los detalles."
      />
      <GroomingFAQ
        items={GROOMING_FAQ}
        title="Lo que nos preguntan antes del primer baño."
      />
      <GroomingCTA
        message={GROOMING.whatsappMessage}
        source="peluqueria-final"
      />
    </>
  );
}
