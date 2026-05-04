import { permanentRedirect } from "next/navigation";

/**
 * Redirección permanente: la antigua URL /gicc fue rebrandeada a /gic.
 * Mantiene el SEO transferido vía 308 y evita 404 en links externos viejos.
 */
export default function GiccLegacyRedirect() {
  permanentRedirect("/gic");
}
