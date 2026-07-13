import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  dark: "btn-dark",
  ghost: "btn-ghost",
};
const sizes: Record<Size, string> = { md: "btn-md", lg: "btn-lg" };

type BaseProps = { variant?: Variant; size?: Size; className?: string; children: React.ReactNode };

export function Button({
  href,
  variant = "primary",
  size = "lg",
  className,
  children,
  ...rest
}: BaseProps &
  ({ href: string } & React.ComponentProps<typeof Link>) ) {
  return (
    <Link href={href} className={cn("btn", sizes[size], variants[variant], className)} {...rest}>
      {children}
    </Link>
  );
}

export function ButtonAction({
  variant = "primary",
  size = "lg",
  className,
  children,
  ...rest
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn("btn", sizes[size], variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
