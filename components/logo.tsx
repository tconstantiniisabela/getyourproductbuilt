import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

type LogoProps = {
  className?: string;
  variant?: "mark" | "lockup";
};

/**
 * Full-color AxisForge Labs lockup (`public/northtrace-mark.png` → `npm run process-logo`).
 * Lockup image already includes the wordmark; visible adjacent text is omitted (sr-only for a11y).
 */
export function Logo({ className, variant = "lockup" }: LogoProps) {
  if (variant === "mark") {
    return (
      <LogoMark
        className="h-9 max-h-10 sm:h-10"
        aria-label={site.companyShort}
      />
    );
  }

  return (
    <span className={cn("inline-flex items-center", className)}>
      <LogoMark className="h-10 max-h-11 sm:h-11" aria-hidden />
      <span className="sr-only">{site.companyShort}</span>
    </span>
  );
}

export function LogoMark({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-mark
      className={cn(
        "relative inline-flex shrink-0 items-center overflow-visible",
        className,
      )}
      {...props}
    >
      <img
        src="/northtrace-mark-dark.png"
        alt=""
        className="max-h-full w-auto max-w-[min(100vw-2rem,280px)] object-contain object-left dark:hidden"
        draggable={false}
      />
      <img
        src="/northtrace-mark-white.png"
        alt=""
        className="hidden max-h-full w-auto max-w-[min(100vw-2rem,280px)] object-contain object-left dark:block"
        draggable={false}
      />
    </span>
  );
}
