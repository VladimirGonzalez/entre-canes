"use client";

import { ArrowRight, ClipboardList, MessageSquareText, Trophy } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { HOW_IT_WORKS, buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

const ICONS = [MessageSquareText, ClipboardList, Trophy];

export function HowItWorks() {
  return (
    <section className="section bg-brand-paper">
      <Container size="wide">
        <Reveal>
          <SectionTitle
            align="center"
            eyebrow="Cómo funciona"
            title="Tres pasos. Sin vueltas."
            subtitle="Ningún proceso eterno ni cursos online infinitos. Esto es lo que hacemos desde el primer mensaje hasta el último día."
          />
        </Reveal>

        <div className="relative mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Decorative connector line desktop */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-12 hidden h-px lg:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, rgba(15,23,42,0.15) 0 6px, transparent 6px 12px)",
            }}
          />

          {HOW_IT_WORKS.map((s, idx) => {
            const Icon = ICONS[idx] ?? MessageSquareText;
            return (
              <Reveal key={s.step} delay={idx * 0.08}>
                <div className="relative h-full rounded-2xl border border-brand-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                  {/* Step badge */}
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-ink text-white">
                      <Icon className="h-5 w-5" strokeWidth={2.25} />
                    </span>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-amberDark">
                      Paso {s.step}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-brand-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-slate">
                    {s.copy}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-12 flex justify-center">
            <Button
              href={buildWhatsAppLink(WHATSAPP_MESSAGES.evaluacion)}
              external
              variant="primary"
              size="lg"
              onClick={() =>
                trackEvent("cta_reservar_click", { source: "how-it-works" })
              }
            >
              Empezar con la evaluación gratuita
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
