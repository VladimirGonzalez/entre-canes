import type { Metadata } from "next";
import Image from "next/image";
import { ShoppingBag, MessageCircle, Truck, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PRODUCTS, buildWhatsAppLink } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tienda — Accesorios y kits curados para tu perro",
  description:
    "Lo que recomendamos en cada plan de adiestramiento: arneses anti-tirón, correas largas, snacks naturales y kits por etapa. Curados por la escuela.",
};

const PERKS = [
  {
    icon: BadgeCheck,
    title: "Curado por la escuela",
    copy: "Solo lo que usamos en clase. Nada que no recomendaríamos a nuestra familia.",
  },
  {
    icon: Truck,
    title: "Envíos a todo el país",
    copy: "Coordinamos envío por correo o moto en CABA y GBA. Retiro en escuela disponible.",
  },
  {
    icon: ShoppingBag,
    title: "Compra por WhatsApp",
    copy: "Te asesoramos antes de comprar. Sin checkout frío: persona real al otro lado.",
  },
];

export default function TiendaPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden pt-12 pb-10 sm:pt-16 lg:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[400px] bg-radial-spot"
        />
        <Container size="wide">
          <Reveal>
            <SectionLabel variant="amber">Tienda</SectionLabel>
            <h1 className="mt-4 text-display-2xl text-brand-ink">
              Lo que recomendamos a <br className="hidden sm:block" />
              cada cliente, ahora en un solo lugar.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-slate sm:text-lg">
              Cada producto pasó por la cancha: lo probamos, lo usamos en clase y solo lo dejamos si funciona. Sin marcas patrocinadas. Te asesoramos por WhatsApp antes de comprar.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Perks */}
      <section className="section-tight border-y border-brand-line bg-white">
        <Container size="wide">
          <div className="grid gap-6 sm:grid-cols-3">
            {PERKS.map((p, idx) => (
              <Reveal key={p.title} delay={idx * 0.05}>
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-paper text-brand-ink">
                    <p.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-brand-ink">
                      {p.title}
                    </p>
                    <p className="mt-0.5 text-xs text-brand-slate">{p.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Products grid */}
      <section className="section">
        <Container size="wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p, idx) => (
              <Reveal key={p.id} delay={idx * 0.04}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                  <div className="relative aspect-[4/3] overflow-hidden bg-brand-paper">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {p.highlight && (
                      <span className="absolute left-3 top-3 rounded-full bg-brand-amber px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-ink shadow-soft">
                        {p.highlight}
                      </span>
                    )}
                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium text-brand-slate backdrop-blur">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-semibold text-brand-ink">
                      {p.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-3 text-sm text-brand-slate">
                      {p.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-brand-line pt-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-brand-mist">
                          Desde
                        </p>
                        <p className="text-lg font-semibold text-brand-ink">
                          {formatPrice(p.price)}
                        </p>
                      </div>
                      <Button
                        href={buildWhatsAppLink(
                          `Hola! Quiero consultar por: ${p.name}`
                        )}
                        external
                        variant="amber"
                        size="sm"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Consultar
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-14 rounded-3xl border border-brand-line bg-brand-paper p-8 sm:p-12">
              <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <SectionLabel>Recomendaciones a medida</SectionLabel>
                  <h3 className="mt-3 text-display-md text-brand-ink">
                    ¿No sabés qué arnés o correa le va a tu perro?
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-slate sm:text-base">
                    Mandanos una foto de tu perro y la situación que querés mejorar (paseo, llegada, premios). En 10 minutos te decimos qué te conviene y te lo cotizamos.
                  </p>
                </div>
                <div className="lg:col-span-4 lg:text-right">
                  <Button
                    href={buildWhatsAppLink(
                      "Hola! Quiero asesoramiento para elegir productos. Te paso una foto de mi perro 🐶"
                    )}
                    external
                    variant="amber"
                    size="lg"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Pedir asesoramiento
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
