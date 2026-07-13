import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden bg-warm-radial", className)}>
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold-200/40 blur-3xl" />
      <div className="container relative py-14 sm:py-20">
        <Reveal immediate className="max-w-3xl">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="heading-1 text-ink">{title}</h1>
          {description && <p className="lead mt-5 max-w-2xl text-ink-muted">{description}</p>}
        </Reveal>
      </div>
    </section>
  );
}
