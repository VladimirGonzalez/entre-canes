import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Grooming } from "@/components/sections/Grooming";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { agendaMonth } from "@/lib/agenda";
import { GIC_ENABLED } from "@/lib/constants";

// El mes de agenda viaja en el HTML: lo regeneramos cada hora.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Servicios — Adiestramiento, conducta y educación canina",
  description: GIC_ENABLED
    ? "Programas de adiestramiento básico, modificación de conducta, Grupos GIC, educación temprana para cachorros y peluquería canina (baños, corte y deslanado). Plan a medida."
    : "Programas de adiestramiento básico, modificación de conducta, educación temprana para cachorros, asesoramiento a domicilio y peluquería canina (baños, corte y deslanado). Plan a medida.",
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
              Y si además necesitás baño, corte o deslanado, tenemos peluquería
              canina con el mismo criterio de manejo.
            </p>
          </Reveal>
        </Container>
      </section>

      <ServicesGrid showAll showHeader={false} />
      <Grooming />
      <HowItWorks />
      <FAQSection />
      <FinalCTA initialMonth={agendaMonth()} />
    </>
  );
}
