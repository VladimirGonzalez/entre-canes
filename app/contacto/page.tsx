import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { CONTACT, SITE, buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contacto — Hablemos de tu perro",
  description:
    "Escribinos por WhatsApp o completá el formulario. Respondemos en menos de 1 hora hábil. La evaluación inicial es gratuita.",
};

const CHANNELS = [
  {
    label: "WhatsApp (más rápido)",
    value: "Respondemos en menos de 1 hora hábil",
    icon: MessageCircle,
    href: buildWhatsAppLink(WHATSAPP_MESSAGES.default),
    cta: "Abrir chat",
    accent: true,
  },
  {
    label: "Email",
    value: CONTACT.email,
    icon: Mail,
    href: `mailto:${CONTACT.email}`,
    cta: "Escribir email",
  },
  {
    label: "Teléfono",
    value: CONTACT.phone,
    icon: Phone,
    href: `tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`,
    cta: "Llamar",
  },
];

export default function ContactoPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[400px] bg-radial-spot"
        />
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left: copy + channels */}
            <Reveal direction="left" className="lg:col-span-5">
              <SectionLabel variant="amber">Contacto</SectionLabel>
              <h1 className="mt-4 text-display-xl text-brand-ink">
                Hablemos de tu perro.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-brand-slate sm:text-lg">
                La evaluación inicial es gratuita y sin compromiso. Elegí el canal que prefieras: respondemos rápido, sin guiones automáticos.
              </p>

              <ul className="mt-8 space-y-3">
                {CHANNELS.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300 ${
                        c.accent
                          ? "border-brand-amber/40 bg-brand-amber/10 hover:border-brand-amber"
                          : "border-brand-line bg-white hover:border-brand-ink"
                      }`}
                    >
                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                          c.accent
                            ? "bg-brand-amber text-brand-ink"
                            : "bg-brand-paper text-brand-ink"
                        }`}
                      >
                        <c.icon className="h-5 w-5" />
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-brand-ink">
                          {c.label}
                        </p>
                        <p className="text-xs text-brand-slate">{c.value}</p>
                      </div>
                      <span className="text-xs font-medium text-brand-ink">
                        {c.cta} →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border border-brand-line bg-white p-5 text-sm text-brand-slate">
                <div className="flex items-center gap-2 text-brand-ink">
                  <MapPin className="h-4 w-4 text-brand-amber" />
                  <span className="font-semibold">Zona</span>
                </div>
                <p className="mt-1.5">
                  {SITE.city} y alrededores. Asesoramiento a domicilio en CABA y GBA Norte. Otras zonas, consultar.
                </p>
                <div className="mt-4 flex items-center gap-2 text-brand-ink">
                  <Clock className="h-4 w-4 text-brand-amber" />
                  <span className="font-semibold">Horario</span>
                </div>
                <p className="mt-1.5">
                  Lun a Sáb · 9:00 a 19:00. WhatsApp respondido todos los días hábiles.
                </p>
              </div>
            </Reveal>

            {/* Right: form */}
            <Reveal direction="right" className="lg:col-span-7">
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
