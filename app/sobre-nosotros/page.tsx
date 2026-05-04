import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, Heart, BookOpen, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel, SectionTitle } from "@/components/ui/SectionLabel";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SocialProof } from "@/components/sections/SocialProof";

export const metadata: Metadata = {
  title: "Sobre nosotros — Quiénes somos y por qué hacemos esto",
  description:
    "Detrás de Entre Canes hay un equipo apasionado por mejorar la vida de las familias y sus perros. Conocé nuestra historia, método y valores.",
};

const VALUES = [
  {
    icon: Heart,
    title: "Respeto absoluto",
    copy: "No usamos castigo, ni miedo, ni dominación. La ciencia es clara: aprenden mejor sin amenaza.",
  },
  {
    icon: GraduationCap,
    title: "Método con base",
    copy: "Nos formamos constantemente. Lo que enseñamos tiene respaldo etológico y de aprendizaje moderno.",
  },
  {
    icon: BookOpen,
    title: "Honestidad radical",
    copy: "Si no podemos resolverlo, te lo decimos. Si necesitás un especialista, te derivamos.",
  },
  {
    icon: Compass,
    title: "Compromiso con cada caso",
    copy: "No somos una fábrica. Conocemos a cada perro por nombre. Acompañamos hasta lograr el cambio.",
  },
];

export default function SobreNosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 sm:pt-16 lg:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[400px] bg-radial-spot"
        />
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal direction="left" className="lg:col-span-7">
              <SectionLabel variant="amber">Sobre Entre Canes</SectionLabel>
              <h1 className="mt-4 text-display-2xl text-brand-ink">
                Empezamos por amor, <br className="hidden sm:block" />
                seguimos por método.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-slate sm:text-lg">
                Entre Canes nació porque vimos demasiadas familias agotadas, perros mal entendidos y vínculos que se rompían por falta de información. Decidimos juntar pasión, formación y experiencia en un proyecto que se ocupe del verdadero problema: la convivencia diaria.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-slate">
                Hoy somos un equipo que entrena con método, escucha sin juicio y acompaña hasta el final. Cada cliente, cada perro, cada caso, importa.
              </p>
            </Reveal>

            <Reveal direction="right" className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-4xl border border-brand-line bg-white shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1560807707-8cc77767d783?w=1200&q=80&auto=format&fit=crop"
                  alt="Equipo de Entre Canes trabajando con un perro"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <SocialProof />

      {/* Values */}
      <section className="section">
        <Container size="wide">
          <Reveal>
            <SectionTitle
              align="center"
              eyebrow="Nuestros valores"
              title="Cuatro principios no negociables."
              subtitle="Lo que vas a sentir desde el primer mensaje hasta la última sesión."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, idx) => (
              <Reveal key={v.title} delay={idx * 0.06}>
                <div className="h-full rounded-2xl border border-brand-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-amber/15 text-brand-amberDark">
                    <v.icon className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-brand-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-slate">
                    {v.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Story / method */}
      <section className="section bg-brand-paper">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal direction="left" className="lg:col-span-5">
              <SectionLabel>Nuestro enfoque</SectionLabel>
              <h2 className="mt-4 text-display-lg text-brand-ink">
                El perro no es el problema. La comunicación, sí.
              </h2>
            </Reveal>

            <Reveal direction="right" className="lg:col-span-7">
              <div className="space-y-5 text-base leading-relaxed text-brand-slate">
                <p>
                  Trabajamos con refuerzo positivo, manejo del ambiente y educación cooperativa. La mayoría de las conductas que se ven como “problema” son síntomas de algo más simple: el perro no entiende qué se espera de él, o vive en un ambiente que potencia el desorden.
                </p>
                <p>
                  Por eso siempre evaluamos primero a fondo: la rutina, la familia, el espacio, el historial. A veces la solución pasa por una corrección clara; otras, por un cambio de hábitos en casa. La respuesta nunca es genérica.
                </p>
                <p>
                  Nuestro foco no está en obtener un perro &ldquo;que obedece&rdquo;. Buscamos un perro que se entiende con su familia, que sabe qué esperar, y que vive más relajado por dentro.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
