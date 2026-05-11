"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Clock, ShieldCheck, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DiagnosticQuiz } from "@/components/sections/DiagnosticQuiz";
import { trackEvent } from "@/lib/analytics";

export function QuizBanner() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    trackEvent("quiz_cta_click", { source: "quiz_banner" });
    setOpen(true);
  };

  return (
    <>
      <section className="section bg-brand-ink relative overflow-hidden">
        {/* Glow decorativo */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 -z-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-brand-amber/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <Container size="wide">
          <Reveal>
            <div className="relative grid items-center gap-10 lg:grid-cols-12">
              {/* Texto + CTA */}
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-amber/40 bg-brand-amber/10 px-3 py-1 text-xs font-semibold text-brand-amber">
                  <Sparkles className="h-3.5 w-3.5" />
                  Diagnóstico online gratuito
                </span>

                <h2 className="mt-5 text-display-xl text-white">
                  ¿No sabés por dónde empezar con tu perro?{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-brand-amber">
                      Te damos un diagnóstico en 60 segundos.
                    </span>
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                  Respondé 5 preguntas rápidas sobre tu perro y te decimos qué
                  está pasando, qué programa te conviene y cuánto puede tardar
                  ver cambios. Sin compromiso. Sin tarjeta.
                </p>

                <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <motion.button
                    type="button"
                    onClick={handleOpen}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-brand-amber px-6 py-4 text-base font-semibold text-brand-ink shadow-card transition-all hover:bg-white hover:shadow-glow"
                  >
                    {/* Pulse ring sutil */}
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full bg-brand-amber opacity-60 animate-ping"
                      style={{ animationDuration: "2.5s" }}
                    />
                    Empezar mi diagnóstico
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </motion.button>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/65">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-brand-amber" />
                      ~60 segundos
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-brand-amber" />
                      100% gratuito
                    </span>
                  </div>
                </div>

                {/* Social proof pill */}
                <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/80 backdrop-blur-sm">
                  <div className="flex -space-x-1.5">
                    {["#FACC15", "#34D399", "#60A5FA"].map((c) => (
                      <span
                        key={c}
                        className="grid h-6 w-6 place-items-center rounded-full ring-2 ring-brand-ink"
                        style={{ backgroundColor: c }}
                      >
                        <Users className="h-3 w-3 text-brand-ink" strokeWidth={2.5} />
                      </span>
                    ))}
                  </div>
                  <span>
                    <span className="font-semibold text-white">+200 familias</span>{" "}
                    ya hicieron su diagnóstico este mes
                  </span>
                </div>
              </div>

              {/* Preview card */}
              <div className="relative lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm shadow-card"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-amber">
                    Paso 1 de 5
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    ¿Cuál es el problema principal?
                  </p>

                  <ul className="mt-5 grid gap-2.5">
                    {[
                      { e: "🦮", l: "Tira de la correa", sel: true },
                      { e: "🔔", l: "Ladra a todo" },
                      { e: "⚠️", l: "Agresivo / reactivo" },
                      { e: "💔", l: "Tiene miedos o ansiedad" },
                    ].map((it) => (
                      <li
                        key={it.l}
                        className={
                          "flex items-center gap-3 rounded-2xl border bg-white/[0.03] p-3 transition-all " +
                          (it.sel
                            ? "border-brand-amber/50 ring-2 ring-brand-amber/30"
                            : "border-white/10")
                        }
                      >
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-lg">
                          {it.e}
                        </span>
                        <span className="text-sm font-medium text-white/90">
                          {it.l}
                        </span>
                        {it.sel && (
                          <span className="ml-auto grid h-5 w-5 place-items-center rounded-full bg-brand-amber text-brand-ink">
                            <svg
                              viewBox="0 0 24 24"
                              className="h-3 w-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={3}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-1/5 rounded-full bg-brand-amber" />
                  </div>
                </motion.div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <DiagnosticQuiz open={open} onClose={() => setOpen(false)} />
    </>
  );
}
