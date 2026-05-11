import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Mail, Phone, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  CONTACT,
  SITE,
  SOCIAL,
  buildWhatsAppLink,
  WHATSAPP_MESSAGES,
  SERVICES,
} from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-brand-line bg-white">
      <Container size="wide" className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-brand-line">
                <Image
                  src="/logo.png"
                  alt="Entre Canes"
                  width={44}
                  height={44}
                  className="h-11 w-11 object-contain"
                />
              </span>
              <span className="text-base font-semibold tracking-tight text-brand-ink">
                {SITE.name}
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-slate">
              Adiestramiento canino basado en técnicas de modificación de
              conducta y obediencia en positivo. Trabajamos ayudando a las
              familias a recuperar la convivencia con su perro de una manera
              clara, respetuosa y sostenible.
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-slate">
              Nuestra postura se basa en la evidencia científica actual, que
              demuestra de forma consistente que los métodos aversivos pueden
              generar estrés, miedo y afectar el vínculo entre las personas y
              sus perros, mientras que los métodos basados en recompensas y
              aprendizaje cooperativo son más seguros, eficaces y generan
              cambios más estables en el tiempo.
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-slate">
              Estas técnicas son estudiadas y recomendadas por organizaciones
              dedicadas al comportamiento animal como la{" "}
              <span className="font-medium text-brand-ink">
                American Veterinary Society of Animal Behavior (AVSAB)
              </span>
              , fundada en 1976 en Estados Unidos, que publica investigaciones
              y guías sobre educación canina y bienestar animal.
            </p>
            <div className="mt-3 flex flex-col gap-1 text-xs text-brand-slate">
              <span className="font-semibold text-brand-ink">
                Publicaciones oficiales:
              </span>
              <a
                href="https://avsab.org/resources/position-statements/"
                target="_blank"
                rel="noopener noreferrer"
                className="break-all underline decoration-brand-line underline-offset-2 transition-colors hover:text-brand-ink hover:decoration-brand-ink"
              >
                avsab.org/resources/position-statements
              </a>
              <a
                href="https://avsab.org/wp-content/uploads/2021/08/AVSAB-Humane-Dog-Training-Position-Statement-2021.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="break-all underline decoration-brand-line underline-offset-2 transition-colors hover:text-brand-ink hover:decoration-brand-ink"
              >
                AVSAB Humane Dog Training Position Statement (PDF)
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={buildWhatsAppLink(WHATSAPP_MESSAGES.default)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brand-line px-3 py-1.5 text-xs font-medium text-brand-ink transition-colors hover:border-brand-ink"
              >
                <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
                WhatsApp
              </a>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brand-line px-3 py-1.5 text-xs font-medium text-brand-ink transition-colors hover:border-brand-ink"
              >
                <Instagram className="h-3.5 w-3.5" />
                Instagram
              </a>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brand-line px-3 py-1.5 text-xs font-medium text-brand-ink transition-colors hover:border-brand-ink"
              >
                <Facebook className="h-3.5 w-3.5" />
                Facebook
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-mist">
              Servicios
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/servicios#${s.slug}`}
                    className="text-brand-slate transition-colors hover:text-brand-ink"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/gic"
                  className="text-brand-slate transition-colors hover:text-brand-ink"
                >
                  Grupos GIC — Interacción canina
                </Link>
              </li>
              <li>
                <Link
                  href="/tienda"
                  className="text-brand-slate transition-colors hover:text-brand-ink"
                >
                  Tienda
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-mist">
              Empresa
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/sobre-nosotros" className="text-brand-slate transition-colors hover:text-brand-ink">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/resultados" className="text-brand-slate transition-colors hover:text-brand-ink">
                  Resultados
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-brand-slate transition-colors hover:text-brand-ink">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto directo */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-mist">
              Contacto
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-brand-slate transition-colors hover:text-brand-ink"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-2 text-brand-slate transition-colors hover:text-brand-ink"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2 text-brand-slate transition-colors hover:text-brand-ink"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-brand-mist">{SITE.city}</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-brand-line pt-6 text-xs text-brand-mist sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE.name}. Todos los derechos reservados.</p>
          <p>
            Hecho con foco en perros felices y dueños tranquilos.
          </p>
        </div>
      </Container>
    </footer>
  );
}
