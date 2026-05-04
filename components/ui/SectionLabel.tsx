import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "amber";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
        variant === "amber"
          ? "border border-brand-amber/30 bg-brand-amber/10 text-brand-amberDark"
          : "border border-brand-line bg-white text-brand-slate",
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          variant === "amber" ? "bg-brand-amber" : "bg-brand-amber"
        )}
      />
      {children}
    </span>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  eyebrowVariant = "default",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  eyebrowVariant?: "default" | "amber";
}) {
  return (
    <div
      className={cn(
        align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <SectionLabel variant={eyebrowVariant} className="mb-4">
          {eyebrow}
        </SectionLabel>
      )}
      <h2 className="text-display-lg text-brand-ink">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-brand-slate">
          {subtitle}
        </p>
      )}
    </div>
  );
}
