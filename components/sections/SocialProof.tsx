"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { METRICS } from "@/lib/constants";

export function SocialProof() {
  return (
    <section className="section-tight border-y border-brand-line bg-white">
      <Container size="wide">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, idx) => (
            <Reveal key={m.label} delay={idx * 0.05}>
              <div className="text-center sm:text-left">
                <div className="text-display-md text-brand-ink">{m.value}</div>
                <div className="mt-1 text-sm text-brand-slate">{m.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
