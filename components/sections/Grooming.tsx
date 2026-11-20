"use client";

import {
  Bath,
  Ear,
  Heart,
  PawPrint,
  Scissors,
  Wind,
  Check,
  MessageCircle,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { GROOMING, buildWhatsAppLink } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import type { GroomingItem } from "@/lib/constants";

const ICONS: Record<GroomingItem["icon"], typeof Bath> = {
  Bath,
  Scissors,
  Wind,
  PawPrint,
  Ear,
  Heart,
};

export function Grooming() {
  return (
    <section id="peluqueria" className="section scroll-mt-24 bg-brand-paper">
      <Container size="wide">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle
              eyebrow={GROOMING.eyebrow}
              title={GROOMING.title}
              subtitle={GROOMING.subtitle}
            />
            <Button
              href={buildWhatsAppLink(GROOMING.whatsappMessage)}
              external
              variant="whatsapp"
              className="shrink-0 self-start lg:self-end"
              onClick={() =>
                trackEvent("cta_servicio_click", { service: "peluqueria" })
              }
            >
              <MessageCircle className="h-4 w-4" />
              Pedir turno por WhatsApp
            </Button>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GROOMING.items.map((item, idx) => {
            const Icon = ICONS[item.icon] ?? Bath;
            return (
              <Reveal key={item.title} delay={idx * 0.06}>
                <article className="h-full rounded-2xl border border-brand-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-ink hover:shadow-card">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-amber/15 text-brand-amberDark">
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-brand-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-slate">
                    {item.copy}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-3xl border border-brand-line bg-white p-7 sm:p-9">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <h3 className="text-display-md text-brand-ink">
                  Cómo trabajamos cada turno
                </h3>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {GROOMING.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-start gap-2 text-sm leading-relaxed text-brand-ink"
                    >
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-amber text-brand-ink">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs leading-relaxed text-brand-slate">
                  {GROOMING.note}
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-brand-line bg-brand-paper p-6">
                  <p className="text-sm leading-relaxed text-brand-slate">
                    Contanos la raza, el largo de pelo y cómo se porta tu perro
                    cuando lo manipulan. Con eso te decimos cuánto lleva, qué
                    le conviene y te damos el turno más cercano.
                  </p>
                  <Button
                    href={buildWhatsAppLink(GROOMING.whatsappMessage)}
                    external
                    variant="amber"
                    fullWidth
                    className="mt-5"
                    onClick={() =>
                      trackEvent("cta_servicio_click", {
                        service: "peluqueria-bloque",
                      })
                    }
                  >
                    Consultar disponibilidad
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
