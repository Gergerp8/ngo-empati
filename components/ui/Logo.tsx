import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Brand lockup: the gold knot mark (cropped from the supplied logo) + wordmark.
 * `tone="dark"` is for use on dark backgrounds (footer).
 */
export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const src = tone === "dark" ? "/images/logo-empati-dark.jpeg" : "/images/logo-empati.jpeg";
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative block h-10 w-10 shrink-0 overflow-hidden rounded-xl",
          tone === "dark" ? "bg-black" : "bg-white",
        )}
      >
        {/* Scale + reposition to isolate the knot mark from the stacked wordmark */}
        <Image
          src={src}
          alt="Logo NGO Empati"
          fill
          sizes="40px"
          priority
          className="scale-[1.7] object-cover object-[center_34%]"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-lg font-extrabold tracking-tight",
            tone === "dark" ? "text-cream" : "text-ink",
          )}
        >
          Empati
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.18em]",
            tone === "dark" ? "text-gold-300" : "text-gold-700",
          )}
        >
          NGO
        </span>
      </span>
    </span>
  );
}
