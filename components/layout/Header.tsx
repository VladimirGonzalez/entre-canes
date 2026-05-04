"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MessageCircle, PawPrint } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  NAVIGATION,
  buildWhatsAppLink,
  WHATSAPP_MESSAGES,
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
            className="flex items-center gap-2 text-brand-ink"
            aria-label="Entre Canes — Inicio"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-ink text-white">
              <PawPrint className="h-5 w-5" strokeWidth={2.25} />
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
            {NAVIGATION.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-brand-ink"
                      : "text-brand-slate hover:text-brand-ink"
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="header-underline"
                      className="mt-1 block h-[2px] w-full rounded-full bg-brand-amber"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
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
            className="lg:hidden border-t border-brand-line bg-white"
          >
            <Container size="wide" className="py-6">
              <nav className="flex flex-col gap-1">
                {NAVIGATION.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
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
                })}
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
