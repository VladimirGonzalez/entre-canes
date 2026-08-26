"use client";

import { useEffect, useState } from "react";

const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

/**
 * Mes para el que conviene ofrecer agenda. Pasado el día 20 ya casi no quedan
 * fechas libres en el mes corriente, así que ofrecemos el siguiente.
 */
export function agendaMonth(now: Date = new Date()): string {
  const d = new Date(now.getFullYear(), now.getMonth(), 1);
  if (now.getDate() > 20) d.setMonth(d.getMonth() + 1);
  return MESES[d.getMonth()];
}

/**
 * El sitio se genera estático: si el mes se calculara al renderizar, el HTML
 * quedaría congelado en el mes del deploy. Por eso se resuelve recién en el
 * cliente y devuelve null hasta montar, para que el copy caiga en una variante
 * sin fecha en vez de mostrar un mes viejo.
 */
export function useAgendaMonth(): string | null {
  const [mes, setMes] = useState<string | null>(null);
  useEffect(() => setMes(agendaMonth()), []);
  return mes;
}
