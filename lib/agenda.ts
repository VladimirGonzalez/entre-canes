// ============================================================
// Mes de agenda — se calcula solo, nunca se escribe a mano.
// Función pura y sin dependencias de React: la usan tanto el
// servidor (para que el mes quede en el HTML) como el cliente.
// ============================================================

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
