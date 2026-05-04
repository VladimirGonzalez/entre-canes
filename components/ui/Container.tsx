import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "tight" | "wide";
}) {
  const max =
    size === "tight"
      ? "max-w-4xl"
      : size === "wide"
      ? "max-w-7xl"
      : "max-w-6xl";
  return (
    <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", max, className)}>
      {children}
    </div>
  );
}
