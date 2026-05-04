// ============================================================
// Eventos de conversión para Google Analytics 4 + Meta Pixel
// Uso: import { trackEvent } from "@/lib/analytics"
//      trackEvent("cta_whatsapp_click", { source: "hero" })
// ============================================================

type GtagFn = (
  command: "event" | "config" | "consent" | "set",
  action: string,
  params?: Record<string, unknown>
) => void;

type FbqFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    fbq?: FbqFn;
    dataLayer?: unknown[];
  }
}

export type EventName =
  | "cta_whatsapp_click"
  | "cta_reservar_click"
  | "cta_servicio_click"
  | "form_submit"
  | "gicc_view"
  | "faq_open"
  | "tienda_producto_click";

const META_EVENT_MAP: Partial<Record<EventName, string>> = {
  cta_whatsapp_click: "Contact",
  cta_reservar_click: "Lead",
  form_submit: "Lead",
  tienda_producto_click: "ViewContent",
};

export function trackEvent(name: EventName, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    if (window.gtag) {
      window.gtag("event", name, params || {});
    }
    const metaName = META_EVENT_MAP[name];
    if (metaName && window.fbq) {
      window.fbq("track", metaName, params || {});
    }
  } catch (err) {
    // No bloqueamos UI si falla analytics
    console.warn("[analytics]", err);
  }
}
