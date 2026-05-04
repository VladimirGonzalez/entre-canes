"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  MessageCircle,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  NAVIGATION,
  buildWhatsAppLink,
  WHATSAPP_MESSAGES,
  type NavItem,
} from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-brand-line bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container size="wide">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-brand-ink"
            aria-label="Entre Canes — Inicio"
          >
            <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-brand-line">
              <Image
                src="/logo.png"
                alt="Entre Canes"
                width={44}
                height={44}
                priority
                className="h-11 w-11 object-contain"
              />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">
                Entre Canes
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-brand-mist">
                Escuela canina
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAVIGATION.map((item) =>
              item.children ? (
                <DesktopDropdown key={item.href} item={item} pathname={pathname} />
              ) : (
                <DesktopLink key={item.href} item={item} pathname={pathname} />
              )
            )}
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-2">
            <Button
              href={buildWhatsAppLink(WHATSAPP_MESSAGES.evaluacion)}
              external
              variant="amber"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() =>
                trackEvent("cta_reservar_click", { source: "header" })
              }
            >
              Reservar evaluación gratis
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-brand-line bg-white text-brand-ink lg:hidden"
              aria-label="Abrir menú"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden border-t border-brand-line bg-white max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <Container size="wide" className="py-6">
              <nav className="flex flex-col gap-1">
                {NAVIGATION.map((item) =>
                  item.children ? (
                    <MobileAccordion
                      key={item.href}
                      item={item}
                      pathname={pathname}
                    />
                  ) : (
                    <MobileLink
                      key={item.href}
                      item={item}
                      pathname={pathname}
                    />
                  )
                )}
              </nav>

              <div className="mt-6 flex flex-col gap-3">
                <Button
                  href={buildWhatsAppLink(WHATSAPP_MESSAGES.evaluacion)}
                  external
                  variant="amber"
                  fullWidth
                  onClick={() =>
                    trackEvent("cta_reservar_click", {
                      source: "mobile-menu",
                    })
                  }
                >
                  Reservar evaluación gratis
                </Button>
                <Button
                  href={buildWhatsAppLink(WHATSAPP_MESSAGES.default)}
                  external
                  variant="whatsapp"
                  fullWidth
                  onClick={() =>
                    trackEvent("cta_whatsapp_click", {
                      source: "mobile-menu",
                    })
                  }
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp directo
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ----------------------------- Desktop -------------------------- */

function DesktopLink({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const active =
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
  return (
    <Link
      href={item.href}
      className={cn(
        "rounded-full px-3 py-2 text-sm font-medium transition-colors",
        active ? "text-brand-ink" : "text-brand-slate hover:text-brand-ink"
      )}
    >
      {item.label}
      {active && (
        <motion.span
          layoutId="header-underline"
          className="mt-1 block h-[2px] w-full rounded-full bg-brand-amber"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}

function DesktopDropdown({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = pathname.startsWith(item.href);

  const onEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsOpen(true);
  };
  const onLeave = () => {
    closeTimer.current = setTimeout(() => setIsOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <Link
        href={item.href}
        onClick={() => setIsOpen(false)}
        className={cn(
          "flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors",
          active ? "text-brand-ink" : "text-brand-slate hover:text-brand-ink"
        )}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        />
        {active && (
          <motion.span
            layoutId="header-underline"
            className="mt-1 block h-[2px] w-full rounded-full bg-brand-amber"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            role="menu"
            className="absolute left-1/2 top-full z-50 mt-2 w-[360px] -translate-x-1/2"
          >
            <div className="rounded-2xl border border-brand-line bg-white p-2 shadow-card">
              <div className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-wider text-brand-mist">
                Elegí el grupo ideal
              </div>
              <ul className="space-y-1">
                {item.children!.map((child) => (
                  <li key={child.href}>
                    <DropdownItem
                      child={child}
                      onClose={() => setIsOpen(false)}
                    />
                  </li>
                ))}
              </ul>

              <div className="mt-2 border-t border-brand-line pt-2">
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium text-brand-ink hover:bg-brand-paper"
                >
                  Ver todos los grupos
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DropdownItem({
  child,
  onClose,
}: {
  child: NavItem;
  onClose: () => void;
}) {
  return (
    <div className="group flex items-center gap-1 rounded-xl p-1 transition-colors hover:bg-brand-paper">
      <Link
        href={child.href}
        onClick={() => {
          trackEvent("cta_gic_grupo_click", {
            source: "dropdown",
            grupo: child.label,
          });
          onClose();
        }}
        className="flex flex-1 items-center justify-between rounded-lg px-3 py-2 transition-colors"
      >
        <div>
          <p className="text-sm font-semibold text-brand-ink">{child.label}</p>
          {child.description && (
            <p className="text-xs text-brand-slate">{child.description}</p>
          )}
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-brand-mist transition-all group-hover:translate-x-0.5 group-hover:text-brand-ink" />
      </Link>
      {child.whatsappMessage && (
        <a
          href={buildWhatsAppLink(child.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackEvent("cta_whatsapp_click", {
              source: "dropdown",
              grupo: child.label,
            });
            onClose();
          }}
          aria-label={`Consultar por WhatsApp sobre ${child.label}`}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#25D366]/10 text-[#1EB855] transition-colors hover:bg-[#25D366] hover:text-white"
        >
          <MessageCircle className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

/* ----------------------------- Mobile --------------------------- */

function MobileLink({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const active =
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
        active
          ? "bg-brand-paper text-brand-ink"
          : "text-brand-slate hover:bg-brand-paper hover:text-brand-ink"
      )}
    >
      {item.label}
      <span className="text-brand-amber">→</span>
    </Link>
  );
}

function MobileAccordion({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const [open, setOpen] = useState(pathname.startsWith(item.href));
  const active = pathname.startsWith(item.href);

  return (
    <div className="rounded-xl">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
          active || open
            ? "bg-brand-paper text-brand-ink"
            : "text-brand-slate hover:bg-brand-paper hover:text-brand-ink"
        )}
      >
        <span>{item.label}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            open ? "rotate-180" : "rotate-0"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="children"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <ul className="pl-2 pt-1">
              {item.children!.map((child) => (
                <li key={child.href} className="flex items-center gap-2 py-1">
                  <Link
                    href={child.href}
                    onClick={() =>
                      trackEvent("cta_gic_grupo_click", {
                        source: "mobile-accordion",
                        grupo: child.label,
                      })
                    }
                    className="flex flex-1 items-center justify-between rounded-lg border border-brand-line bg-white px-3 py-2.5"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-brand-ink">
                        {child.label}
                      </p>
                      {child.description && (
                        <p className="truncate text-xs text-brand-slate">
                          {child.description}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-brand-mist" />
                  </Link>
                  {child.whatsappMessage && (
                    <a
                      href={buildWhatsAppLink(child.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("cta_whatsapp_click", {
                          source: "mobile-accordion",
                          grupo: child.label,
                        })
                      }
                      aria-label={`WhatsApp sobre ${child.label}`}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#25D366] text-white"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  )}
                </li>
              ))}

              <li className="pt-2">
                <Link
                  href={item.href}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-brand-ink hover:bg-brand-paper"
                >
                  Ver todos los grupos
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
