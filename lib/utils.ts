/** Concat conditional class names without bringing the clsx dep */
export function cn(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(" ");
}

/** Format CLP/ARS-style price to local string */
export function formatPrice(value: number, currency: string = "ARS") {
  try {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `$${value.toLocaleString("es-AR")}`;
  }
}
