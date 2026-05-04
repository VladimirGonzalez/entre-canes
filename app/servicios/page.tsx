import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Servicios — Adiestramiento, conducta y educación canina",
  description:
    "Programas de adiestramiento básico, modificación de conducta, GICC y educación temprana para cachorros. Plan a medida. Resultados sostenibles.",
};

export default function ServiciosPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[400px] bg-radial-spot"
        />
        <Container size="wide">
          <Reveal>
            <SectionLabel variant="amber">Programas</SectionLabel>
            <h1 className="mt-4 text-display-2xl text-brand-ink">
              Un plan distinto <br className="hidden sm:block" />
              para cada perro real.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-slate sm:text-lg">
              Trabajamos con programas pensados según la edad, el caso y la
              dinámica de cada familia. No vendemos paquetes que sirven para todos:
              evaluamos primero, planificamos después y acompañamos hasta el final.
            </p>
          </Reveal>
        </Container>
      </section>

      <ServicesGrid showAll showHeader={false} />
      <HowItWorks />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
