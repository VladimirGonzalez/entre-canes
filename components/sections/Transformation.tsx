"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, X, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { TRANSFORMATION_IMAGES } from "@/lib/constants";

const BEFORE = [
  "Tira de la correa cada paseo",
  "Ladra al timbre, a otros perros, a todo",
  "No viene cuando lo llamás",
  "Salta sobre las visitas",
  "Te sentís culpable o frustrado",
];
const AFTER = [
  "Camina al pie, con calma",
  "Reacciona menos, escucha más",
  "Acude cuando lo llamás",
  "Recibe visitas tranquilo",
  "Disfrutás los paseos otra vez",
];

export function Transformation() {
  const [pos, setPos] = useState(50);

  return (
    <section className="section">
      <Container size="wide">
        <Reveal>
          <SectionTitle
            align="center"
            eyebrow="Antes y después"
            title="Esto es lo que cambia."
            subtitle="No vendemos magia ni promesas inflables. Mostramos lo que ocurre cuando aplicás un método claro durante el tiempo que hace falta."
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Image slider */}
          <Reveal direction="left" className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-brand-line bg-brand-paper shadow-card">
              {/* AFTER image (background) */}
              <Image
                src={TRANSFORMATION_IMAGES.after}
                alt={TRANSFORMATION_IMAGES.afterAlt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
              {/* BEFORE image (clipped) */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: `inset(0 ${100 - pos}% 0 0)`,
                  WebkitClipPath: `inset(0 ${100 - pos}% 0 0)`,
                }}
              >
                <Image
                  src={TRANSFORMATION_IMAGES.before}
                  alt={TRANSFORMATION_IMAGES.beforeAlt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Tags */}
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-ink shadow-soft">
                Antes
              </span>
              <span className="absolute right-3 top-3 rounded-full bg-brand-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-soft">
                Después
              </span>

              {/* Slider line */}
              <div
                className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.05)]"
                style={{ left: `${pos}%` }}
              />
              <div
                className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-brand-line bg-white shadow-card"
                style={{ left: `${pos}%` }}
              >
                <div className="flex items-center gap-0.5 text-brand-ink">
                  <span className="text-xs">‹</span>
                  <span className="text-xs">›</span>
                </div>
              </div>

              {/* Range input */}
              <input
                type="range"
                min={0}
                max={100}
                value={pos}
                onChange={(e) => setPos(Number(e.target.value))}
                aria-label="Comparar antes y después"
                className="absolute inset-0 z-10 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
              />
            </div>
            <p className="mt-3 text-center text-xs text-brand-mist">
              Arrastrá para comparar antes y después
            </p>
          </Reveal>

          {/* Lists */}
          <Reveal direction="right" className="lg:col-span-5">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-brand-line bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-mist">
                  Antes
                </p>
                <ul className="mt-4 space-y-3">
                  {BEFORE.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="flex items-start gap-3 text-sm text-brand-slate"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-brand-line text-brand-mist">
                        <X className="h-3 w-3" />
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-brand-ink bg-brand-ink p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-amber">
                  Después
                </p>
                <ul className="mt-4 space-y-3">
                  {AFTER.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: 8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="flex items-start gap-3 text-sm text-white/90"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-amber text-brand-ink">
                        <Check className="h-3 w-3" />
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center gap-2 text-xs text-brand-amber">
                  <ArrowRight className="h-3.5 w-3.5" />
                  Promedio: 6 a 10 sesiones
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
