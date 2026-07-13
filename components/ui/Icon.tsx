import {
  HeartHandshake, Users, ShieldCheck, Sunrise, Sprout, MessageCircleHeart,
  Sparkles, CalendarCheck, Flame, Award, type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  HeartHandshake, Users, ShieldCheck, Sunrise, Sprout, MessageCircleHeart,
  Sparkles, CalendarCheck, Flame, Award,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = map[name] ?? HeartHandshake;
  return <Cmp className={className} aria-hidden="true" />;
}
