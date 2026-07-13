"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Heart, Menu, X } from "lucide-react";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { AuthGreeting } from "@/components/AuthGreeting";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line/80 bg-white/85 backdrop-blur-xl"
          : "border-b border-transparent bg-cream/60 backdrop-blur-sm",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
      >
        Langkau ke kandungan utama
      </a>
      <nav className="container flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Link href="/" aria-label="NGO Empati, Laman utama">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            item.children ? (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(item.label)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button
                  className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-gold-50 hover:text-ink"
                  aria-expanded={openGroup === item.label}
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4 text-ink-faint" />
                </button>
                <AnimatePresence>
                  {openGroup === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-0 top-full w-72 pt-3"
                    >
                      <div className="overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-lift">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-gold-50"
                          >
                            <span className="block text-sm font-semibold text-ink">{child.label}</span>
                            {child.description && (
                              <span className="block text-xs text-ink-muted">{child.description}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  href={item.href!}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-gold-50 hover:text-ink",
                    pathname === item.href ? "text-ink" : "text-ink-soft",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <AuthGreeting />
          <Link href="/derma" className="btn btn-md btn-primary">
            <Heart className="h-4 w-4" />
            Derma
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-line bg-white lg:hidden"
          >
            <div className="container space-y-1 py-4">
              {mainNav.map((item) =>
                item.children ? (
                  <div key={item.label} className="py-1">
                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
                      {item.label}
                    </p>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-3 py-2.5 text-[15px] font-medium text-ink-soft hover:bg-gold-50"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className="block rounded-xl px-3 py-2.5 text-[15px] font-medium text-ink-soft hover:bg-gold-50"
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <div className="space-y-2 pt-3">
                <AuthGreeting variant="mobile" />
                <Link href="/derma" className="btn btn-md btn-primary w-full">
                  <Heart className="h-4 w-4" /> Derma
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
