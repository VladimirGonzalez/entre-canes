"use client";

import Link from "next/link";
import { MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/constants";
import { ZONAS } from "@/lib/zonas";
import { trackEvent } from "@/lib/analytics";

export function ServiceAreas() {
  return (
    <section className="section bg-white">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionTitle
                eyebrow="Zonas de cobertura"
                title={
                  <>
                    Vamos hasta donde <br className="hidden sm:block" />
                    está tu perro.
                  </>
                }
                subtitle="Atendemos a domicilio en zona norte, noroeste y oeste del GBA, y en toda CABA. Trabajamos en tu casa y tu barrio: donde las conductas pasan de verdad."
              />
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 rounded-2xl border border-brand-line bg-brand-paper p-6">
                <p className="text-sm font-semibold text-brand-ink">
                  ¿Tu zona no aparece?
                </p>
                <p className="mt-1 text-sm text-brand-slate">
                  Consultanos igual: según el caso, llegamos a zonas vecinas.
                </p>
                <Button
                  href={buildWhatsAppLink(
                    "Hola! Quiero saber si cubren mi zona para el adiestramiento de mi perro 🐶"
                  )}
                  external
                  variant="whatsapp"
                  size="sm"
                  className="mt-4"
                  onClick={() =>
                    trackEvent("cta_whatsapp_click", { source: "zonas" })
                  }
                >
                  <MessageCircle className="h-4 w-4" />
                  Consultar mi zona
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-2.5">
                {ZONAS.map((z) => (
                  <Link
                    key={z.slug}
                    href={`/zonas/${z.slug}`}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-brand-line bg-white px-4 py-2 text-sm font-medium text-brand-ink transition-all hover:-translate-y-0.5 hover:border-brand-ink hover:shadow-card"
                  >
                    <MapPin className="h-3.5 w-3.5 text-brand-amberDark" />
                    {z.name}
                  </Link>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <Link
                href="/zonas"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand-ink transition-colors hover:text-brand-amberDark"
              >
                Ver todas las zonas y cómo trabajamos en cada una
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
