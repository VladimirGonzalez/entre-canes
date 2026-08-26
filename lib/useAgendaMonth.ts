"use client";

import { useEffect, useState } from "react";
import { agendaMonth } from "@/lib/agenda";

/**
 * Mantiene el mes al día en el navegador.
 *
 * El sitio es estático: el HTML lo genera el servidor y se cachea. Si el mes
 * saliera sólo de ahí, quedaría viejo cuando la página cacheada cruza un
 * cambio de mes. Por eso se recalcula al montar y corrige lo que haya venido
 * en el HTML.
 *
 * @param initial mes calculado en el servidor. Se usa para el primer render
 *   (así el mes viaja en el HTML y no hay parpadeo). Sin él, devuelve null
 *   hasta montar y el copy cae en una variante sin fecha.
 */
export function useAgendaMonth(initial: string | null = null): string | null {
  const [mes, setMes] = useState<string | null>(initial);
  useEffect(() => setMes(agendaMonth()), []);
  return mes;
}
