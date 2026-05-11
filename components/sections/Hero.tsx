"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { DiagnosticQuiz } from "@/components/sections/DiagnosticQuiz";
import { METRICS } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  const [quizOpen, setQuizOpen] = useState(false);

  const openQuiz = () => {
    trackEvent("quiz_cta_click", { source: "hero" });
    setQuizOpen(true);
  };

  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14 lg:pt-20">
      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-radial-spot"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-50"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, transparent 70%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 70%)",
        }}
      />

      <Container size="wide">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Copy column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-amber/30 bg-brand-amber/10 px-3 py-1 text-xs font-medium text-brand-amberDark"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Cupos limitados — abrimos agenda para Mayo
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 text-display-2xl text-brand-ink"
            >
              Educamos perros, fortalecemos{" "}
              <span className="relative inline-block">
                <span className="relative z-10">vínculos</span>
                <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-brand-amber/40 sm:bottom-2 sm:h-4" />
              </span>{" "}
              y transformamos la convivencia.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-xl text-base leading-relaxed text-brand-slate sm:text-lg"
            >
              Desde obediencia básica hasta problemas de conducta como
              agresividad, miedo y ansiedad, te ayudamos a entender mejor a tu
              perro y construir una relación basada en confianza, comunicación
              y educación en positivo.
            </motion.p>

            {/* CTA con animaciones ultra-convertidoras */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
            >
              <div className="relative inline-flex">
                {/* Halo glow pulse (detrás del botón) */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-full bg-brand-amber blur-xl"
                  animate={{
                    opacity: [0.35, 0.65, 0.35],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Ring expansivo cada cierto tiempo (efecto "ping" suave) */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-full border-2 border-brand-amber"
                  animate={{
                    opacity: [0.6, 0, 0.6],
                    scale: [1, 1.18, 1],
                  }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeOut",
                    times: [0, 0.6, 1],
                  }}
                />

                {/* Botón principal */}
                <motion.button
                  type="button"
                  onClick={openQuiz}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-brand-amber px-7 py-4 text-base font-semibold text-brand-ink shadow-card transition-shadow hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-brand-amber/60 focus:ring-offset-2"
                >
                  {/* Shimmer effect: brillo diagonal que cruza el botón */}
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                    animate={{ x: ["0%", "400%"] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      repeatDelay: 2.4,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Sparkles que titilan */}
                  <motion.span
                    className="relative z-10 inline-flex"
                    animate={{
                      scale: [1, 1.25, 1],
                      rotate: [0, -8, 8, 0],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.4, 0.7, 1],
                    }}
                  >
                    <Sparkles className="h-4 w-4" strokeWidth={2.5} />
                  </motion.span>

                  <span className="relative z-10">
                    Empezar diagnóstico gratis
                  </span>

                  {/* Flecha con auto-nudge + hover */}
                  <motion.span
                    className="relative z-10 inline-flex"
                    animate={{ x: [0, 4, 0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 2.5,
                      ease: "easeInOut",
                      times: [0, 0.15, 0.3, 0.45, 1],
                    }}
                  >
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.span>
                </motion.button>
              </div>

              <span className="text-xs text-brand-mist">
                Tarda ~60 segundos · Sin compromiso
              </span>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
            >
              <div className="flex items-center gap-2 text-brand-slate">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-brand-amber text-brand-amber"
                    />
                  ))}
                </div>
                <span className="font-medium text-brand-ink">4.9/5</span>
                <span className="text-brand-mist">+200 reseñas</span>
              </div>
              <div className="flex items-center gap-2 text-brand-slate">
                <ShieldCheck className="h-4 w-4 text-brand-amber" />
                <span>Método sin castigo · 100% positivo</span>
              </div>
            </motion.div>

            {/* Mini-metrics row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
            >
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-brand-line bg-white p-4 shadow-soft"
                >
                  <div className="text-xl font-semibold tracking-tight text-brand-ink sm:text-2xl">
                    {m.value}
                  </div>
                  <div className="mt-1 text-xs text-brand-slate">{m.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-5"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-4xl border border-brand-line bg-white shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80&auto=format&fit=crop"
                alt="Familia caminando con su perro tranquilo en el parque, entrenado por Entre Canes"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
              {/* Bottom-left chip: live status */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-brand-ink/85 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-amber opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-amber" />
                </span>
                Sesiones esta semana
              </div>
            </div>

            {/* Floating testimonial card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -left-6 bottom-12 hidden w-64 rounded-2xl border border-brand-line bg-white p-4 shadow-card md:block"
            >
              <div className="flex items-center gap-1 text-brand-amber">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-2 text-sm leading-snug text-brand-ink">
                &ldquo;En 6 semanas Luna dejo de tirar de la correa. Recupere las tardes con ella.&rdquo;
              </p>
              <p className="mt-2 text-xs text-brand-slate">— Maria, dueña de Luna</p>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      <DiagnosticQuiz open={quizOpen} onClose={() => setQuizOpen(false)} />
    </section>
  );
}
