import Link from "next/link";
import { Instagram, Facebook, Mail, Phone, MessageCircle, PawPrint } from "lucide-react";
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
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-ink text-white">
                <PawPrint className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <span className="text-base font-semibold tracking-tight text-brand-ink">
                {SITE.name}
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-slate">
              Adiestramiento canino con método. Ayudamos a familias a recuperar
              la convivencia con su perro a través de un proceso claro,
              respetuoso y sostenible.
            </p>

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
                  href="/gicc"
                  className="text-brand-slate transition-colors hover:text-brand-ink"
                >
                  GICC — Grupos de socialización
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
