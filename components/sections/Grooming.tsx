"use client";

// ============================================================
// Bloques de la vertical de peluquería canina.
// Se usan solo en /peluqueria y /peluqueria/[zona]: a pedido del
// cliente, la peluquería no aparece mezclada con adiestramiento.
//
// Todo el contenido se renderiza en el HTML del servidor (también
// las respuestas del FAQ, con <details>), para que lo lean Google
// y los crawlers de IAs que no ejecutan JavaScript.
// ============================================================

import {
  Bath,
  Ear,
  Heart,
  PawPrint,
  Scissors,
  Wind,
  MessageCircle,
  Plus,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { buildGroomingWhatsAppLink } from "@/lib/constants";
import { GROOMING, type GroomingItem, type QA } from "@/lib/peluqueria";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const ICONS: Record<GroomingItem["icon"], typeof Bath> = {
  Bath,
  Scissors,
  Wind,
  PawPrint,
  Ear,
  Heart,
};

/* --------------------------- Botón WhatsApp --------------------------- */

export function GroomingWhatsAppButton({
  message,
  source,
  children,
  variant = "whatsapp",
  size = "lg",
  fullWidth,
  className,
}: {
  message: string;
  source: string;
  children: React.ReactNode;
  variant?: "whatsapp" | "amber" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}) {
  return (
    <Button
      href={buildGroomingWhatsAppLink(message)}
      external
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
      onClick={() =>
        trackEvent("cta_servicio_click", { service: "peluqueria", source })
      }
    >
      {children}
    </Button>
  );
}

/* ------------------------------ Servicios ----------------------------- */

export function GroomingServices({ title }: { title: React.ReactNode }) {
  return (
    <section id="servicios-peluqueria" className="section scroll-mt-24">
      <Container size="wide">
        <Reveal>
          <SectionTitle
            eyebrow="Qué hacemos"
            title={title}
            subtitle="Podés pedir el servicio completo o solo una parte, por ejemplo baño y uñas."
          />
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

        <p className="mt-6 text-xs leading-relaxed text-brand-slate">
          {GROOMING.note}
        </p>
      </Container>
    </section>
  );
}

/* --------------------- Por qué con adiestradores ---------------------- */

export function GroomingWhy() {
  return (
    <section className="section bg-brand-ink text-white">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-amber" />
                La diferencia
              </span>
              <h2 className="mt-4 text-display-lg text-white">
                Una peluquería atendida por adiestradores.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
                La mayoría de los problemas en la peluquería no son de técnica,
                son de manejo. Por eso nos importa tanto cómo sale tu perro como
                cómo queda.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-4 lg:col-span-7">
            {GROOMING.why.map((w, idx) => (
              <Reveal key={w.title} delay={idx * 0.08}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {w.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------- Proceso ------------------------------ */

export function GroomingSteps() {
  return (
    <section className="section bg-brand-paper">
      <Container size="wide">
        <Reveal>
          <SectionTitle
            align="center"
            eyebrow="Cómo es un turno"
            title="Cuatro pasos, sin sorpresas."
            subtitle="Antes de confirmar ya sabés cuánto sale y cuánto va a llevar."
          />
        </Reveal>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GROOMING.steps.map((s, idx) => (
            <Reveal key={s.title} delay={idx * 0.08}>
              <li className="h-full rounded-2xl border border-brand-line bg-white p-6 shadow-soft">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-amberDark">
                  Paso {idx + 1}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-brand-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-slate">
                  {s.copy}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* --------------------------------- FAQ -------------------------------- */

export function GroomingFAQ({
  items,
  title,
}: {
  items: QA[];
  title: React.ReactNode;
}) {
  return (
    <section className="section">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionTitle
                eyebrow="Preguntas frecuentes"
                title={title}
                subtitle="Si te quedó otra duda, escribinos por WhatsApp."
              />
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-brand-line rounded-2xl border border-brand-line bg-white">
              {items.map((item, idx) => (
                <details
                  key={item.q}
                  open={idx === 0}
                  className="group px-5 sm:px-6"
                  onToggle={(e) => {
                    if ((e.currentTarget as HTMLDetailsElement).open) {
                      trackEvent("faq_open", { question: item.q });
                    }
                  }}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                    <h3 className="text-sm font-semibold text-brand-ink sm:text-base">
                      {item.q}
                    </h3>
                    <span
                      className={cn(
                        "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-brand-line text-brand-ink transition-transform",
                        "group-open:rotate-45"
                      )}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                  </summary>
                  <p className="pb-5 pr-9 text-sm leading-relaxed text-brand-slate sm:text-[15px]">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------ CTA final ----------------------------- */

export function GroomingCTA({
  message,
  source,
  title = "¿Le toca baño? Pedí el turno por WhatsApp.",
}: {
  message: string;
  source: string;
  title?: string;
}) {
  return (
    <section className="section">
      <Container size="wide">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl bg-brand-ink px-6 py-12 text-center sm:px-12 sm:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-radial-spot opacity-70"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-display-lg text-white">{title}</h2>
              <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
                Contanos raza, largo de pelo y cómo se porta cuando lo
                manipulan. Te respondemos con el valor y el turno más cercano.
              </p>
              <div className="mt-8 flex justify-center">
                <GroomingWhatsAppButton message={message} source={source}>
                  <MessageCircle className="h-5 w-5" />
                  Pedir turno por WhatsApp
                </GroomingWhatsAppButton>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
