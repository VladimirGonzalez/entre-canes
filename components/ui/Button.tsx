"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "amber" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

interface AsButtonProps
  extends BaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
  external?: undefined;
}

interface AsLinkProps extends BaseProps {
  href: string;
  external?: boolean;
  onClick?: () => void;
  type?: never;
}

type Props = AsButtonProps | AsLinkProps;

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-4 text-base",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-ink text-white hover:bg-brand-ink2 hover:shadow-card focus:ring-brand-amber/60",
  amber:
    "bg-brand-amber text-brand-ink font-semibold hover:bg-brand-amberDark hover:text-white hover:shadow-glow focus:ring-brand-amber/60",
  ghost:
    "border border-brand-line bg-white text-brand-ink hover:border-brand-ink hover:bg-brand-paper focus:ring-brand-ink/20",
  whatsapp:
    "bg-[#25D366] text-white font-semibold hover:bg-[#1EB855] hover:shadow-card focus:ring-[#25D366]/60",
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  function Button(props, ref) {
    const {
      variant = "primary",
      size = "md",
      className,
      fullWidth,
      children,
      ...rest
    } = props;

    const classes = cn(
      baseClasses,
      sizeClasses[size],
      variantClasses[variant],
      fullWidth && "w-full",
      className
    );

    if ("href" in props && props.href !== undefined) {
      const { href, external, onClick } = props;
      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
            onClick={onClick}
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          onClick={onClick}
        >
          {children}
        </Link>
      );
    }

    const { type = "button", ...buttonProps } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={classes}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }
);
