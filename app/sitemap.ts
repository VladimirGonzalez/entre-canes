import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { ZONAS } from "@/lib/zonas";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const routes = [
    "",
    "/servicios",
    "/gic",
    "/tienda",
    "/sobre-nosotros",
    "/resultados",
    "/contacto",
    "/zonas",
    ...ZONAS.map((z) => `/zonas/${z.slug}`),
  ];
  const now = new Date();
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path.startsWith("/zonas/") ? "monthly" : "weekly",
    priority: path === "" ? 1 : path.startsWith("/zonas/") ? 0.7 : 0.8,
  }));
}
