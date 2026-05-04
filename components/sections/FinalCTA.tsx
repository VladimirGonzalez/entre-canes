"use client";

import { ArrowRight, MessageCircle, Clock, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export function FinalCTA() {
  return (
    <section className="section">
      <Container size="wide">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl border border-brand-ink bg-brand-ink p-8 text-white sm:p-12 lg:p-16">
            {/* Decorative spots */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-amber/30 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-brand-amber/15 blur-3xl"
            />

            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-amber/30 bg-brand-amber/15 px-3 py-1 text-xs font-semibold text-brand-amber">
                  <Clock className="h-3.5 w-3.5" />
                  Cupos limitados este mes
                </span>

                <h2 className="mt-5 text-display-xl">
                  El primer paso es escribirnos.
                  <br />
                  El resto, lo hacemos juntos.
                </h2>

                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                  La evaluación inicial es gratuita y sin compromiso. En 20 minutos
                  vamos a saber qué le pasa a tu perro y qué se puede hacer.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="space-y-3">
                  <Button
                    href={buildWhatsAppLink(WHATSAPP_MESSAGES.evaluacion)}
                    external
                    variant="amber"
                    size="lg"
                    fullWidth
                    onClick={() =>
                      trackEvent("cta_reservar_click", { source: "final-cta" })
                    }
                  >
                    <Calendar className="h-5 w-5" />
                    Reservar evaluación gratuita
                    <ArrowRight className="h-5 w-5" />
                  </Button>

                  <Button
                    href={buildWhatsAppLink(WHATSAPP_MESSAGES.default)}
                    external
                    variant="ghost"
                    size="lg"
                    fullWidth
                    className="border-white/20 bg-white/5 text-white hover:border-white hover:bg-white/10"
                    onClick={() =>
                      trackEvent("cta_whatsapp_click", { source: "final-cta" })
                    }
                  >
                    <MessageCircle className="h-5 w-5 text-[#25D366]" />
                    Tengo una pregunta primero
                  </Button>
                </div>

                <p className="mt-4 text-center text-xs text-white/50">
                  Respondemos en menos de 1 hora hábil · Lun a Sáb
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
