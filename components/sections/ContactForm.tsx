"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const TOPICS = [
  { value: "evaluacion", label: "Evaluación inicial gratuita" },
  { value: "conducta", label: "Modificación de conducta" },
  { value: "gicc", label: "GICC — Grupos de socialización" },
  { value: "cachorro", label: "Educación temprana cachorros" },
  { value: "domicilio", label: "Asesoramiento a domicilio" },
  { value: "tienda", label: "Consulta sobre tienda" },
  { value: "otro", label: "Otra consulta" },
];

const inputClass =
  "w-full rounded-xl border border-brand-line bg-brand-paper px-4 py-3 text-sm text-brand-ink outline-none transition-all duration-200 placeholder:text-brand-mist focus:border-brand-ink focus:bg-white focus:ring-[3px] focus:ring-brand-amber/20";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    topic: TOPICS[0].value,
    message: "",
  });

  const update = <K extends keyof typeof data>(key: K, value: string) =>
    setData((d) => ({ ...d, [key]: value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const topicLabel =
      TOPICS.find((t) => t.value === data.topic)?.label ?? "Consulta";

    const text = [
      `Hola Entre Canes! Soy *${data.name}*.`,
      `Tema: ${topicLabel}.`,
      data.phone ? `Teléfono: ${data.phone}.` : "",
      data.email ? `Email: ${data.email}.` : "",
      "",
      data.message,
    ]
      .filter(Boolean)
      .join("\n");

    trackEvent("form_submit", { topic: data.topic });

    // Abrimos WhatsApp con el mensaje pre-cargado
    if (typeof window !== "undefined") {
      window.open(buildWhatsAppLink(text), "_blank", "noopener,noreferrer");
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl border border-brand-line bg-white p-8 text-center shadow-card sm:p-12"
      >
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-amber/15 text-brand-amberDark">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-5 text-2xl font-semibold text-brand-ink">
          Te abrimos WhatsApp para finalizar.
        </h3>
        <p className="mt-2 text-sm text-brand-slate">
          Si no se abrió automáticamente, tocá el botón de abajo. Te respondemos en menos de 1 hora hábil.
        </p>
        <Button
          href={buildWhatsAppLink(
            `Hola Entre Canes! Soy ${data.name}, te escribo desde el formulario web.`
          )}
          external
          variant="whatsapp"
          size="lg"
          className="mt-6"
        >
          <MessageCircle className="h-4 w-4" />
          Abrir WhatsApp manualmente
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-brand-line bg-white p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tu nombre" required>
          <input
            required
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="María"
            className={inputClass}
          />
        </Field>
        <Field label="Teléfono / WhatsApp" required>
          <input
            required
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+54 9 11 ..."
            inputMode="tel"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Email (opcional)" className="mt-4">
        <input
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="hola@email.com"
          type="email"
          className={inputClass}
        />
      </Field>

      <Field label="¿Sobre qué querés hablar?" required className="mt-4">
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => {
            const active = data.topic === t.value;
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => update("topic", t.value)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200",
                  active
                    ? "border-brand-ink bg-brand-ink text-white"
                    : "border-brand-line bg-white text-brand-slate hover:border-brand-ink hover:text-brand-ink"
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="Contanos un poco" required className="mt-4">
        <textarea
          required
          rows={4}
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Mi perro tiene 2 años, raza ___, vive con ___. El problema principal es ___."
          className={cn(inputClass, "min-h-[110px] resize-y")}
        />
      </Field>

      <div className="mt-6 flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-xs text-brand-mist">
          Al enviar abrimos WhatsApp con tu mensaje pre-cargado. Sin spam, sin formularios trampa.
        </p>
        <Button type="submit" variant="amber" size="lg">
          Enviar y abrir WhatsApp
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  required,
  className,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-semibold text-brand-ink">
        {label}
        {required && <span className="ml-1 text-brand-amberDark">*</span>}
      </span>
      {children}
    </label>
  );
}
