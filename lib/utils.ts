import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely (conditional + conflict resolution). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as Malaysian Ringgit. */
export function formatRM(value: number) {
  return new Intl.NumberFormat("ms-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 0,
  }).format(value);
}
