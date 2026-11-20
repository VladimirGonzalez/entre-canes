import type { MetadataRoute } from "next";
import { SITE, GIC_ENABLED } from "@/lib/constants";
import { ZONAS } from "@/lib/zonas";

const isZonePage = (path: string) =>
  path.startsWith("/zonas/") || path.startsWith("/peluqueria/");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const routes = [
    "",
    "/servicios",
    "/peluqueria",
    ...(GIC_ENABLED ? ["/gic"] : []),
    "/tienda",
    "/sobre-nosotros",
    "/resultados",
    "/contacto",
    "/zonas",
    ...ZONAS.map((z) => `/zonas/${z.slug}`),
    ...ZONAS.map((z) => `/peluqueria/${z.slug}`),
  ];
  const now = new Date();
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: isZonePage(path) ? "monthly" : "weekly",
    priority: path === "" ? 1 : isZonePage(path) ? 0.7 : 0.8,
  }));
}
