import Link from "next/link";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { footerNav, site } from "@/lib/site";
import { getSettings } from "@/lib/settings";
import { Logo } from "@/components/ui/Logo";

export async function Footer() {
  const s = await getSettings();
  return (
    <footer className="bg-ink text-cream/80">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo tone="dark" />
            <p className="mt-5 text-sm leading-relaxed text-cream/60">
              {site.legalName} ({site.registration}). {site.tagline}.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink href={s.instagram} label="Instagram"><Instagram className="h-4.5 w-4.5" /></SocialLink>
              <SocialLink href={s.facebook} label="Facebook"><Facebook className="h-4.5 w-4.5" /></SocialLink>
              <SocialLink href={s.youtube} label="YouTube"><Youtube className="h-4.5 w-4.5" /></SocialLink>
            </div>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-cream">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/60 transition-colors hover:text-gold-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 border-t border-white/10 pt-8 text-sm text-cream/60 sm:grid-cols-3">
          <a href={`mailto:${s.email}`} className="flex items-center gap-2 hover:text-gold-300">
            <Mail className="h-4 w-4" /> {s.email}
          </a>
          <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-gold-300">
            <Phone className="h-4 w-4" /> {s.phone}
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {s.address}
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-8 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}. Hak cipta terpelihara.</p>
          <div className="flex gap-4">
            <Link href="/privasi" className="hover:text-gold-300">Dasar Privasi</Link>
            <Link href="/terma" className="hover:text-gold-300">Terma Penggunaan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream/70 transition-colors hover:border-gold-400 hover:text-gold-300"
    >
      {children}
    </a>
  );
}
