import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { BrandStrip } from "@/components/sections/BrandStrip";
import { PainPoints } from "@/components/sections/PainPoints";
import { QuizBanner } from "@/components/sections/QuizBanner";
import { Transformation } from "@/components/sections/Transformation";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { SocialProof } from "@/components/sections/SocialProof";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Adiestramiento canino con metodo. Resultados reales.",
  description:
    "Escuela canina, adiestramiento y modificacion de conducta. Recupera la convivencia con tu perro en pocas semanas. Reserva tu evaluacion gratuita.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <BrandStrip />
      <PainPoints />
      <QuizBanner />
      <Transformation />
      <HowItWorks />
      <ServicesGrid />
      <Testimonials />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
