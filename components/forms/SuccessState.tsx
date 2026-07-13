import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function SuccessState({
  title,
  message,
  children,
}: {
  title: string;
  message: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className="rounded-3xl border border-gold-200 bg-gold-50 p-8 text-center sm:p-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-ink shadow-glow">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h3 className="mt-5 text-2xl font-bold text-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-ink-muted">{message}</p>
      {children && <div className="mt-6">{children}</div>}
    </Reveal>
  );
}
