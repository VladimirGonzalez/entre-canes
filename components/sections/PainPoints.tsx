"use client";

import {
  Bell,
  Heart,
  Home,
  PhoneOff,
  Shield,
  Move,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PAIN_POINTS, buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

const ICONS: Record<string, LucideIcon> = {
  TugOfWar: Move,
  Phone: PhoneOff,
  Bell,
  Shield,
  Heart,
  Home,
};

export function PainPoints() {
  return (
    <section className="section bg-brand-paper">
      <Container size="wide">
        <Reveal>
          <SectionTitle
            eyebrow="Te entendemos"
            title={
              <>
                ¿Tu perro hace esto?
                <br />
                <span className="text-brand-slate">No estás solo.</span>
              </>
            }
            subtitle="Cada semana llegan a Entre Canes familias frustradas, agotadas y a punto de tirar la toalla. La buena noticia: todo lo que ves abajo tiene solución cuando hay un plan de trabajo claro acompañado de constancia y compromiso."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PAIN_POINTS.map((p, idx) => {
            const Icon = ICONS[p.icon] ?? Heart;
            return (
              <Reveal key={p.title} delay={idx * 0.05}>
                <div className="group h-full rounded-2xl border border-brand-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-ink hover:shadow-card">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-ink text-white transition-colors group-hover:bg-brand-amber group-hover:text-brand-ink">
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-brand-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-slate">
                    {p.copy}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl border border-brand-line bg-white p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-sm font-semibold text-brand-ink">
                Sea cual sea el caso, lo evaluamos sin compromiso.
              </p>
              <p className="mt-1 text-sm text-brand-slate">
                Contanos qué te pasa con tu perro y te decimos qué se puede hacer.
              </p>
            </div>
            <Button
              href={buildWhatsAppLink(WHATSAPP_MESSAGES.conducta)}
              external
              variant="amber"
              onClick={() =>
                trackEvent("cta_whatsapp_click", { source: "pain-points" })
              }
            >
              Contar mi caso
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
