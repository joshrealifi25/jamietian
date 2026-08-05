import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Width = "sm" | "md" | "lg" | "xl" | "full";

const widths: Record<Width, string> = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  full: "max-w-7xl",
};

interface PageSectionProps {
  children: ReactNode;
  className?: string;
  width?: Width;
  hero?: boolean;
}

export function PageSection({
  children,
  className,
  width = "lg",
  hero,
}: PageSectionProps) {
  return (
    <section
      className={cn(
        "px-6 md:px-12 lg:px-20 xl:px-32",
        hero ? "pt-32 md:pt-40 pb-16 md:pb-24" : "py-20 md:py-28",
        className
      )}
    >
      <div className={cn(widths[width], "mx-auto w-full")}>{children}</div>
    </section>
  );
}
