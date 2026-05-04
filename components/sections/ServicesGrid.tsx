"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SERVICES, buildWhatsAppLink } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export function ServicesGrid({
  showAll = false,
  showHeader = true,
}: {
  showAll?: boolean;
  showHeader?: boolean;
}) {
  const items = showAll ? SERVICES : SERVICES.slice(0, 4);

  return (
    <section className="section">
      <Container size="wide">
        {showHeader && (
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionTitle
                eyebrow="Servicios"
                title={
                  <>
                    Programas pensados <br className="hidden sm:block" />
                    según tu caso real.
                  </>
                }
                subtitle="No todos los perros necesitan lo mismo. Por eso trabajamos con planes diferenciados que respetan la edad, la energía y la historia de tu compañero."
              />
              {!showAll && (
                <Link
                  href="/servicios"
                  className="group inline-flex shrink-0 items-center gap-2 self-start text-sm font-medium text-brand-ink transition-colors hover:text-brand-amberDark"
                >
                  Ver todos los servicios
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              )}
            </div>
          </Reveal>
        )}

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {items.map((s, idx) => (
            <Reveal key={s.slug} delay={idx * 0.06}>
              <article
                id={s.slug}
                className="group relative h-full rounded-3xl border border-brand-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-ink hover:shadow-card sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-brand-amberDark">
                      {s.duration}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-brand-ink sm:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-brand-slate">
                      {s.tagline}
                    </p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand-line text-brand-ink transition-colors group-hover:border-brand-ink group-hover:bg-brand-ink group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-brand-slate">
                  {s.description}
                </p>

                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-brand-ink"
                    >
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-amber text-brand-ink">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col items-stretch gap-3 border-t border-brand-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs text-brand-slate">
                    Ideal: {s.ideal}
                  </span>
                  <Button
                    href={buildWhatsAppLink(s.whatsappMessage)}
                    external
                    variant="amber"
                    size="sm"
                    onClick={() =>
                      trackEvent("cta_servicio_click", { service: s.slug })
                    }
                  >
                    Consultar este programa
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
