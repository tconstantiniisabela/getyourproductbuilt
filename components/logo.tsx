import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

type LogoProps = {
  className?: string;
  variant?: "mark" | "lockup";
};

/**
 * Brand mark from your shared raster artwork (`public/northtrace-mark.png`),
 * processed to white/dark transparent PNGs (`npm run process-logo`).
 */
export function Logo({ className, variant = "lockup" }: LogoProps) {
  if (variant === "mark") {
    return (
      <NorthtraceMark
        className="h-8 w-8 sm:h-9 sm:w-9"
        aria-label={site.companyShort}
      />
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <NorthtraceMark className="h-8 w-8 sm:h-9 sm:w-9" aria-hidden />
      <span className="font-semibold tracking-tight text-foreground">
        {site.companyShort}
      </span>
    </span>
  );
}

export function NorthtraceMark({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      data-mark
      className={cn("relative inline-block aspect-square shrink-0", className)}
      {...props}
    >
      <img
        src="/northtrace-mark-dark.png"
        alt=""
        className="absolute inset-0 block h-full w-full object-contain dark:hidden"
        draggable={false}
      />
      <img
        src="/northtrace-mark-white.png"
        alt=""
        className="absolute inset-0 hidden h-full w-full object-contain dark:block"
        draggable={false}
      />
    </span>
  );
}
