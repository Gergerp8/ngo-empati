import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Quote, ShieldCheck, Sparkles, CalendarHeart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { ProgrammeCard } from "@/components/marketing/ProgrammeCard";
import { PartnerMarquee } from "@/components/marketing/PartnerMarquee";
import { CountUp } from "@/components/motion/CountUp";
import { TextReveal } from "@/components/motion/TextReveal";
import { Parallax } from "@/components/motion/Parallax";
import { TiltCard } from "@/components/motion/TiltCard";
import { Magnetic } from "@/components/motion/Magnetic";
import { ProgressBar } from "@/components/motion/ProgressBar";
import { stats, focusAreas, programmes, testimonials, ambassadors } from "@/lib/content";
import { getSettings, getDonationRaised } from "@/lib/settings";
import { formatRM } from "@/lib/utils";

export default async function HomePage() {
  const [settings, raised] = await Promise.all([getSettings(), getDonationRaised()]);
  const pct = Math.min(100, Math.round((raised / settings.monthly_target) * 100));

  return (
    <>
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative overflow-hidden bg-warm-radial">
        {/* Living gradient blobs */}
        <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 animate-blob rounded-full bg-gold-200/50 blur-3xl motion-reduce:animate-none" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 animate-blob-slow rounded-full bg-ember-400/15 blur-3xl motion-reduce:animate-none" />
        <div className="container grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <Reveal immediate>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-white/70 px-4 py-1.5 text-sm font-semibold text-gold-800 backdrop-blur">
                <span className="flex h-2 w-2 rounded-full bg-gold-500" />
                Kelab Advokasi Pulih Mental
              </span>
            </Reveal>
            <h1 className="heading-1 mt-6 text-ink">
              <TextReveal delay={0.1}>Sistem sokongan kesihatan mental</TextReveal>{" "}
              <TextReveal delay={0.42} className="text-gradient-gold">paling mesra</TextReveal>{" "}
              <TextReveal delay={0.56}>di Malaysia.</TextReveal>
            </h1>
            <Reveal immediate delay={0.1}>
              <p className="lead mt-6 max-w-xl text-ink-muted">
                Kami menyatukan survivor, belia dan komuniti melalui sokongan rakan sebaya,
                kaunseling, dan tindakan nyata, supaya tiada siapa berjuang bersendirian.
              </p>
            </Reveal>
            <Reveal immediate delay={0.15}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Magnetic>
                  <Button href="/sukarelawan" variant="primary" size="lg">
                    Jadi Sukarelawan <ArrowRight className="h-4 w-4" />
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button href="/derma" variant="dark" size="lg">
                    <Heart className="h-4 w-4" /> Derma Bulanan
                  </Button>
                </Magnetic>
              </div>
            </Reveal>
            <Reveal immediate delay={0.2}>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {ambassadors.map((a) => (
                    <span key={a.name} className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-cream">
                      {a.image && (
                        <Image src={a.image} alt={a.name} fill sizes="44px" className="object-cover" />
                      )}
                    </span>
                  ))}
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-cream bg-gold-500 text-xs font-bold text-ink">
                    +50
                  </span>
                </div>
                <p className="text-sm text-ink-muted">
                  Disokong oleh <span className="font-semibold text-ink">Ikon & Penasihat Empati</span>
                  <br className="hidden sm:block" /> serta ribuan sukarelawan di seluruh negara.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Hero visual collage */}
          <Reveal immediate delay={0.1} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift sm:aspect-[4/4.2]">
              <Image
                src="/images/event-komuniti-1.jpeg"
                alt="Komuniti NGO Empati berkumpul dalam sesi santai"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            {/* Floating stat card (parallax drift) */}
            <Parallax speed={26} className="absolute -bottom-5 -left-3 sm:-left-6">
              <div className="w-48 rounded-2xl border border-line bg-white/95 p-4 shadow-lift backdrop-blur">
                <div className="flex items-center gap-2 text-gold-700">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">Impak kami</span>
                </div>
                <p className="mt-1 text-2xl font-extrabold text-ink"><CountUp value="5,000+" /></p>
                <p className="text-xs text-ink-muted">nyawa disentuh sejak 2021</p>
              </div>
            </Parallax>
            {/* Floating secondary image (counter parallax) */}
            <Parallax speed={-18} className="absolute -right-3 -top-4 hidden sm:block">
              <div className="relative h-28 w-36 overflow-hidden rounded-2xl border-4 border-cream shadow-lift">
                <Image src="/images/event-komuniti-3.jpeg" alt="Aktiviti komuniti Empati" fill sizes="144px" className="object-cover" />
              </div>
            </Parallax>
          </Reveal>
        </div>

        {/* Partner trust strip */}
        <div className="border-t border-line/70 bg-cream/50">
          <div className="container py-6">
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
              Dipercayai &amp; disokong oleh rakan strategik kami
            </p>
            <PartnerMarquee />
          </div>
        </div>
      </section>

      {/* ───────────────────────── STATS ───────────────────────── */}
      <section className="container py-16 sm:py-20">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05} className="bg-white p-7 text-center sm:p-8">
              <p className="text-3xl font-extrabold text-gradient-gold sm:text-4xl">
                <CountUp value={s.value} />
              </p>
              <p className="mt-2 text-sm font-semibold text-ink">{s.label}</p>
              {s.sub && <p className="mt-0.5 text-xs text-ink-muted">{s.sub}</p>}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────────────── FOCUS / MISSION ───────────────────── */}
      <section className="container py-16 sm:py-24">
        <SectionHeading
          align="center"
          eyebrow="Misi Kami"
          title="Membina harapan untuk mereka yang paling memerlukan"
          description="Kami percaya kesihatan mental adalah hak semua orang. Inilah komuniti yang kami perjuangkan."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.06}>
              <TiltCard className="h-full">
                <div className="card h-full p-7 transition-shadow duration-300 hover:shadow-lift">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-gradient text-ink shadow-glow">
                    <Icon name={f.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-ink">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.description}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────────────────── PROGRAMMES ───────────────────────── */}
      <section className="bg-sand/60 py-16 sm:py-24">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Program Kami"
              title="Tindakan nyata, bukan sekadar kata"
              description="Daripada sesi luahan santai hingga misi bantuan bencana, inilah cara kami hadir."
            />
            <Button href="/program" variant="ghost" size="md" className="shrink-0">
              Semua Program <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programmes.map((p) => (
              <ProgrammeCard key={p.slug} programme={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── KAMAR EMPATI FEATURE ───────────────────── */}
      <section className="container py-16 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-lift">
              <Image src="/images/presiden-ucapan.jpeg" alt="Sesi sokongan Kamar Empati" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-5 right-4 flex items-center gap-3 rounded-2xl border border-line bg-white/95 p-4 shadow-lift backdrop-blur">
              <ShieldCheck className="h-9 w-9 text-gold-600" />
              <div>
                <p className="text-sm font-bold text-ink">100% Sulit</p>
                <p className="text-xs text-ink-muted">Patuh PDPA</p>
              </div>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Kamar Empati"
              title="Ruang selamat untuk bercakap dengan seseorang yang faham"
              description="Tempah sesi kaunseling bersama kaunselor terlatih dan dipercayai. Pilih slot, sahkan tempahan, dan terima peringatan, semuanya secara peribadi dan mesra."
            />
            <ul className="mt-6 space-y-3">
              {[
                "Pilih kaunselor & slot yang sesuai dengan anda",
                "Pengesahan dan peringatan automatik melalui e-mel",
                "Sesi secara peribadi atau dalam talian (Google Meet / Zoom)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink-soft">
                  <CalendarHeart className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/kamar-empati" variant="dark" size="lg">
                Tempah Sesi Kaunseling <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── DONATION IMPACT BAND ───────────────────── */}
      <section className="container pb-4">
        <Reveal className="overflow-hidden rounded-[2.5rem] border border-gold-200 bg-gold-50 p-8 sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow">Ketelusan & Impak</p>
              <h2 className="heading-2 mt-3 text-ink">Sasaran derma bulanan kami</h2>
              <p className="mt-3 max-w-md text-ink-muted">
                Setiap ringgit menyokong program komuniti, sesi kaunseling dan misi bantuan.
                Sertai komuniti penyumbang kami bulan ini.
              </p>
              <div className="mt-6">
                <Button href="/derma" variant="primary" size="lg">
                  <Heart className="h-4 w-4" /> Derma Sekarang
                </Button>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-soft">
              <div className="flex items-end justify-between">
                <span className="text-3xl font-extrabold text-ink">
                  <CountUp value={formatRM(raised)} />
                </span>
                <span className="text-sm text-ink-muted">dari {formatRM(settings.monthly_target)}</span>
              </div>
              <ProgressBar pct={pct} className="mt-3" />
              <p className="mt-2 text-sm font-semibold text-gold-700">{pct}% tercapai bulan ini</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ───────────────────────── TESTIMONIALS ───────────────────────── */}
      <section className="container py-16 sm:py-24">
        <SectionHeading
          align="center"
          eyebrow="Suara Komuniti"
          title="Apa kata mereka yang kami sentuh"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <figure className="card h-full p-7">
                <Quote className="h-8 w-8 text-gold-300" />
                <blockquote className="mt-4 text-ink-soft">“{t.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <p className="font-bold text-ink">{t.name}</p>
                  <p className="text-sm text-ink-muted">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
