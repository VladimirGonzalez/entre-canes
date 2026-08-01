import type { Metadata } from "next";
import Script from "next/script";
import { FAQ } from "@/lib/constants";
import { Hero } from "@/components/sections/Hero";
import { BrandStrip } from "@/components/sections/BrandStrip";
import { PainPoints } from "@/components/sections/PainPoints";
import { QuizBanner } from "@/components/sections/QuizBanner";
import { Transformation } from "@/components/sections/Transformation";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { SocialProof } from "@/components/sections/SocialProof";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Adiestramiento canino con metodo. Resultados reales.",
  description:
    "Escuela canina, adiestramiento y modificacion de conducta a domicilio en zona norte y oeste del GBA y CABA. Recupera la convivencia con tu perro en pocas semanas. Reserva tu evaluacion gratuita.",
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD: FAQPage (rich results en Google) */}
      <Script
        id="ld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
      <Hero />
      <SocialProof />
      <BrandStrip />
      <PainPoints />
      <QuizBanner />
      <Transformation />
      <HowItWorks />
      <ServicesGrid />
      <Testimonials />
      <ServiceAreas />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
