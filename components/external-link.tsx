import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type ExternalLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
};

/** External anchor with safe defaults for third-party destinations. */
export function ExternalLink({ className, href, rel, target, children, ...props }: ExternalLinkProps) {
  return (
    <a
      href={href}
      className={cn(className)}
      target={target ?? "_blank"}
      rel={rel ?? "noopener noreferrer"}
      {...props}
    >
      {children}
    </a>
  );
}

type InternalLinkProps = ComponentPropsWithoutRef<typeof Link>;

export function InternalLink({ className, ...props }: InternalLinkProps) {
  return <Link className={cn(className)} {...props} />;
}
