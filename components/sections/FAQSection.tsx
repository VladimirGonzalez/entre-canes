"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FAQ, buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section bg-brand-paper">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionTitle
                eyebrow="Preguntas frecuentes"
                title={
                  <>
                    Las dudas que recibimos <br className="hidden sm:block" />
                    todos los días.
                  </>
                }
                subtitle="Te las respondemos sin medias tintas. Si quedó algo, escribinos por WhatsApp."
              />
            </Reveal>

            <div className="mt-8 hidden lg:block">
              <Reveal delay={0.15}>
                <div className="rounded-2xl border border-brand-line bg-white p-6">
                  <p className="text-sm font-semibold text-brand-ink">
                    ¿Tu caso no está acá?
                  </p>
                  <p className="mt-1 text-sm text-brand-slate">
                    Escribinos directo. Respondemos en menos de una hora hábil.
                  </p>
                  <Button
                    href={buildWhatsAppLink(WHATSAPP_MESSAGES.default)}
                    external
                    variant="whatsapp"
                    size="sm"
                    className="mt-4"
                    onClick={() =>
                      trackEvent("cta_whatsapp_click", { source: "faq" })
                    }
                  >
                    <MessageCircle className="h-4 w-4" />
                    Hablar por WhatsApp
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-brand-line rounded-2xl border border-brand-line bg-white">
              {FAQ.map((item, idx) => {
                const isOpen = open === idx;
                return (
                  <Reveal key={item.q} delay={idx * 0.03}>
                    <div className="px-5 sm:px-6">
                      <button
                        onClick={() => {
                          const next = isOpen ? null : idx;
                          setOpen(next);
                          if (next !== null) {
                            trackEvent("faq_open", { question: item.q });
                          }
                        }}
                        className="flex w-full items-start justify-between gap-4 py-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="text-sm font-semibold text-brand-ink sm:text-base">
                          {item.q}
                        </span>
                        <span
                          className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-brand-line text-brand-ink transition-transform ${
                            isOpen ? "rotate-45" : "rotate-0"
                          }`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <p className="pb-5 pr-9 text-sm leading-relaxed text-brand-slate sm:text-[15px]">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <div className="mt-6 lg:hidden">
              <Button
                href={buildWhatsAppLink(WHATSAPP_MESSAGES.default)}
                external
                variant="whatsapp"
                fullWidth
                onClick={() =>
                  trackEvent("cta_whatsapp_click", { source: "faq-mobile" })
                }
              >
                <MessageCircle className="h-4 w-4" />
                ¿Otra duda? Hablanos por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
