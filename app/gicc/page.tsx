import type { Metadata } from "next";
import Image from "next/image";
import {
  Users,
  Eye,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Calendar,
  Clock,
  PawPrint,
  Check,
  MessageCircle,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel, SectionTitle } from "@/components/ui/SectionLabel";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQSection } from "@/components/sections/FAQSection";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "GICC — Grupos de Interacción Canina Controlada",
  description:
    "El método estrella de Entre Canes: encuentros grupales supervisados donde tu perro aprende a relacionarse, leer señales caninas y autorregularse. Sociabilización real, no caos.",
};

const PILLARS = [
  {
    icon: Users,
    title: "Grupos por afinidad",
    copy: "Agrupamos por tamaño, energía y experiencia. No mezclamos un cachorro con un adulto reactivo.",
  },
  {
    icon: Eye,
    title: "Supervisión activa",
    copy: "Hay siempre un profesional leyendo señales y interviniendo antes del conflicto, no después.",
  },
  {
    icon: ShieldCheck,
    title: "Ambiente seguro",
    copy: "Espacio cerrado, controlado, con protocolos claros. Vos te quedás cerca, mirando todo.",
  },
  {
    icon: Sparkles,
    title: "Aprendizaje real",
    copy: "Aprenden a comunicar, a esperar, a ceder, a invitar al juego. Habilidades sociales sostenibles.",
  },
];

const RESULTS = [
  "Reduce reactividad en exteriores",
  "Mejora la comunicación con otros perros",
  "Reduce miedo y ansiedad social",
  "Aumenta la autorregulación",
  "Genera confianza para paseos",
  "Cansa de forma sana (mental, no solo física)",
];

const COMPARE = [
  {
    title: "Plaza pública sin guía",
    bad: [
      "Sin filtro: cualquier perro entra",
      "Nadie interviene si hay conflicto",
      "Genera trauma con frecuencia",
      "Pésima socialización",
    ],
  },
  {
    title: "Guardería tradicional",
    bad: [
      "Foco en cuidar, no en enseñar",
      "Mezcla por horario, no por afinidad",
      "Sin objetivos de aprendizaje",
      "Suelen aprender malos hábitos",
    ],
  },
  {
    title: "GICC — Entre Canes",
    good: [
      "Selección por evaluación previa",
      "Profesional leyendo cada señal",
      "Plan claro con objetivos",
      "Habilidades sociales reales",
    ],
  },
];

export default function GICCPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-ink text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(60% 50% at 30% 20%, rgba(245,158,11,0.35), transparent), radial-gradient(50% 60% at 80% 80%, rgba(245,158,11,0.18), transparent)",
          }}
        />
        <Container size="wide" className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-32">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal direction="left" className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-amber/40 bg-brand-amber/15 px-3 py-1 text-xs font-semibold text-brand-amber">
                <PawPrint className="h-3.5 w-3.5" />
                Método exclusivo Entre Canes
              </span>

              <h1 className="mt-5 text-display-2xl">
                GICC: la diferencia entre <br className="hidden sm:block" />
                <span className="relative inline-block">
                  <span className="relative z-10 text-brand-amber">socializar</span>
                </span>{" "}
                y ser{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">socialmente sano</span>
                </span>.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                Grupos de Interacción Canina Controlada: encuentros semanales
                supervisados donde tu perro aprende a leer otros perros,
                autorregularse y disfrutar el contacto social. Es lo más cercano
                a darle inteligencia emocional a tu compañero.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={buildWhatsAppLink(WHATSAPP_MESSAGES.gicc)}
                  external
                  variant="amber"
                  size="lg"
                >
                  <Calendar className="h-5 w-5" />
                  Reservar lugar en el próximo grupo
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button
                  href={buildWhatsAppLink(WHATSAPP_MESSAGES.default)}
                  external
                  variant="ghost"
                  size="lg"
                  className="border-white/20 bg-white/5 text-white hover:border-white hover:bg-white/10"
                >
                  <MessageCircle className="h-5 w-5 text-[#25D366]" />
                  Tengo preguntas
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/70">
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-brand-amber" /> 90 minutos por encuentro
                </span>
                <span className="inline-flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-brand-amber" /> 4 a 6 perros por grupo
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand-amber" /> Evaluación previa obligatoria
                </span>
              </div>
            </Reveal>

            <Reveal direction="right" className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-4xl border border-white/10 shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1551717743-49959800b1f6?w=1200&q=80&auto=format&fit=crop"
                  alt="Perros interactuando en una sesión grupal supervisada de Entre Canes"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/50 p-3 text-xs text-white backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-amber opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-amber" />
                    </span>
                    Próximo grupo: 2 lugares disponibles
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* PILLARS */}
      <section className="section">
        <Container size="wide">
          <Reveal>
            <SectionTitle
              eyebrow="¿Por qué funciona?"
              title="Cuatro pilares que lo cambian todo."
              subtitle="Lo que hace al GICC distinto a una guardería, a la plaza, o a una clase grupal cualquiera."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, idx) => (
              <Reveal key={p.title} delay={idx * 0.06}>
                <div className="h-full rounded-2xl border border-brand-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-ink text-white">
                    <p.icon className="h-5 w-5" strokeWidth={2.25} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-brand-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-slate">
                    {p.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* RESULTS */}
      <section className="section bg-brand-paper">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal direction="left" className="lg:col-span-6">
              <div className="relative aspect-[5/6] overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1000&q=80&auto=format&fit=crop"
                  alt="Perro tranquilo y atento durante una clase de GICC"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal direction="right" className="lg:col-span-6">
              <SectionLabel variant="amber">Lo que ganás</SectionLabel>
              <h2 className="mt-4 text-display-lg text-brand-ink">
                Resultados que tu perro va a llevar para toda la vida.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brand-slate">
                El GICC no enseña obediencia clásica: enseña a tu perro a vivir entre perros y entre personas. Es la base que hace que todo lo demás funcione.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {RESULTS.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-3 rounded-xl border border-brand-line bg-white p-3 text-sm text-brand-ink"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-amber text-brand-ink">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* COMPARE */}
      <section className="section">
        <Container size="wide">
          <Reveal>
            <SectionTitle
              align="center"
              eyebrow="GICC vs. lo demás"
              title="No todo encuentro entre perros suma."
              subtitle="Mucho de lo que se vende como sociabilización es exactamente lo que rompe a un perro. Esto es lo que nos diferencia."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {COMPARE.map((c, idx) => {
              const isGicc = idx === 2;
              return (
                <Reveal key={c.title} delay={idx * 0.06}>
                  <div
                    className={`relative h-full rounded-2xl border p-7 ${
                      isGicc
                        ? "border-brand-ink bg-brand-ink text-white shadow-card"
                        : "border-brand-line bg-white"
                    }`}
                  >
                    {isGicc && (
                      <span className="absolute -top-3 left-7 rounded-full bg-brand-amber px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-ink">
                        El método
                      </span>
                    )}
                    <h3
                      className={`text-lg font-semibold ${
                        isGicc ? "text-white" : "text-brand-ink"
                      }`}
                    >
                      {c.title}
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {(c.bad || c.good)!.map((item) => (
                        <li
                          key={item}
                          className={`flex items-start gap-3 text-sm ${
                            isGicc ? "text-white/85" : "text-brand-slate"
                          }`}
                        >
                          <span
                            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                              c.good
                                ? "bg-brand-amber text-brand-ink"
                                : "border border-brand-line text-brand-mist"
                            }`}
                          >
                            {c.good ? (
                              <Check className="h-3 w-3" strokeWidth={3} />
                            ) : (
                              "✕"
                            )}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <FAQSection />
      <FinalCTA />
    </>
  );
}
