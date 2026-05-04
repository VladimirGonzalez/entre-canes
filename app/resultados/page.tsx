import type { Metadata } from "next";
import Image from "next/image";
import { Star, Quote, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel, SectionTitle } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { SocialProof } from "@/components/sections/SocialProof";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { TESTIMONIALS, buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Resultados — Casos reales de transformación",
  description:
    "Historias reales de familias y perros que pasaron por Entre Canes. Sin marketing inflado: lo que efectivamente cambia con un buen método.",
};

const CASE_IMAGES = [
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=900&q=80&auto=format&fit=crop",
];

export default function ResultadosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-14 lg:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[400px] bg-radial-spot"
        />
        <Container size="wide">
          <Reveal>
            <SectionLabel variant="amber">Casos reales</SectionLabel>
            <h1 className="mt-4 text-display-2xl text-brand-ink">
              No es promesa. <br className="hidden sm:block" />
              Es lo que ya pasó.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-slate sm:text-lg">
              Testimonios reales, contados por las familias que vivieron el cambio. Cuando autoriza el cliente, también compartimos fotos y videos.
            </p>
          </Reveal>
        </Container>
      </section>

      <SocialProof />

      {/* Case studies */}
      <section className="section">
        <Container size="wide">
          <div className="grid gap-10 lg:gap-12">
            {TESTIMONIALS.map((t, idx) => {
              const reverse = idx % 2 === 1;
              return (
                <Reveal key={t.name} direction={reverse ? "right" : "left"}>
                  <article
                    className={`grid gap-8 rounded-3xl border border-brand-line bg-white p-6 shadow-soft sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-10 ${
                      reverse ? "" : ""
                    }`}
                  >
                    <div
                      className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-paper lg:col-span-5 lg:aspect-[4/5] ${
                        reverse ? "lg:order-last" : ""
                      }`}
                    >
                      <Image
                        src={CASE_IMAGES[idx % CASE_IMAGES.length]}
                        alt={`Caso de éxito: ${t.dog}`}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-1 text-brand-amber">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>

                      <h3 className="mt-3 text-2xl font-semibold text-brand-ink sm:text-3xl">
                        {t.dog}{" "}
                        <span className="text-brand-slate">— {t.breed}</span>
                      </h3>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl bg-brand-paper p-3">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-mist">
                            Antes
                          </p>
                          <p className="mt-1 text-sm text-brand-ink">
                            {t.problem}
                          </p>
                        </div>
                        <div className="rounded-xl bg-brand-amber/10 p-3 ring-1 ring-brand-amber/30">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-amberDark">
                            Después
                          </p>
                          <p className="mt-1 text-sm text-brand-ink">
                            {t.result}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 relative pl-6">
                        <Quote className="absolute -left-1 top-0 h-5 w-5 text-brand-amber" />
                        <p className="text-base leading-relaxed text-brand-slate">
                          {t.quote}
                        </p>
                      </div>

                      <p className="mt-4 text-sm font-medium text-brand-ink">
                        — {t.name}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Bridge CTA */}
      <section className="section bg-brand-paper">
        <Container size="wide">
          <Reveal>
            <SectionTitle
              align="center"
              eyebrow="¿Y vos?"
              title="Tu historia podría ser la próxima."
              subtitle="No tiene magia, no tiene secreto. Tiene método, paciencia y compromiso. La diferencia la hacés vos cuando das el primer paso."
            />
          </Reveal>

          <Reveal>
            <div className="mt-10 flex justify-center">
              <Button
                href={buildWhatsAppLink(WHATSAPP_MESSAGES.evaluacion)}
                external
                variant="amber"
                size="lg"
              >
                Quiero la evaluación gratuita
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
