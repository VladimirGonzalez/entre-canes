"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];

  const go = (delta: number) => {
    setIdx((v) => (v + delta + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="section relative overflow-hidden bg-brand-ink text-white">
      {/* Soft amber spot */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%] opacity-50"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(245,158,11,0.18), transparent)",
        }}
      />

      <Container size="wide" className="relative">
        <Reveal>
          <SectionTitle
            align="center"
            eyebrow="Historias reales"
            eyebrowVariant="amber"
            title={
              <span className="text-white">
                Lo que cuentan las familias que pasaron por acá.
              </span>
            }
            subtitle={
              <span className="text-white/70">
                Sin guiones de marketing. Casos reales contados por las personas que vivieron el cambio.
              </span>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal direction="left" className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-amber">
                Caso destacado
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight">
                {t.dog}{" "}
                <span className="text-white/60">— {t.breed}</span>
              </h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-black/30 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                    Antes
                  </p>
                  <p className="mt-1 text-sm leading-snug text-white/90">
                    {t.problem}
                  </p>
                </div>
                <div className="rounded-2xl bg-brand-amber/15 p-4 ring-1 ring-brand-amber/30">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-amber">
                    Después
                  </p>
                  <p className="mt-1 text-sm leading-snug text-white">
                    {t.result}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" className="lg:col-span-7">
            <div className="relative">
              <Quote
                className="absolute -left-2 -top-3 h-12 w-12 text-brand-amber/30 sm:h-16 sm:w-16"
                strokeWidth={1.5}
              />

              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={t.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-6 sm:pl-10"
                >
                  <p className="text-lg leading-relaxed text-white/90 sm:text-xl">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="mt-6 flex items-center gap-1 text-brand-amber">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>

                  <footer className="mt-3 text-sm">
                    <span className="font-semibold text-white">
                      {t.name}
                    </span>
                    <span className="text-white/60"> · dueñ@ de {t.dog}</span>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>

              {/* Controls */}
              <div className="mt-8 flex items-center justify-between gap-4 sm:justify-start sm:gap-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => go(-1)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10"
                    aria-label="Anterior testimonio"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => go(1)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10"
                    aria-label="Siguiente testimonio"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex gap-1.5">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      aria-label={`Ir al testimonio ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === idx
                          ? "w-7 bg-brand-amber"
                          : "w-1.5 bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
