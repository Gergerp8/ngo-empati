# NGO Empati — Laman Web Rasmi

Laman web awam untuk **NGO Empati (Kelab Advokasi Pulih Mental)** — sistem sokongan
kesihatan mental paling mesra di Malaysia. Dibina dengan **Next.js (App Router) + TypeScript
+ Tailwind CSS**, sepenuhnya dalam Bahasa Melayu, mesra SEO, responsif dan mematuhi
piawaian kebolehcapaian AA.

## Pantas mula

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # binaan produksi
```

## Stack & seni bina

- **Next.js 15 / React 19** — App Router, static + dynamic rendering
- **Tailwind CSS 3** — token reka bentuk jenama (emas/amber) dalam `tailwind.config.ts`
- **Framer Motion** — animasi halus (menghormati `prefers-reduced-motion`)
- **lucide-react** — ikon SVG (tiada emoji sebagai ikon)
- **Firebase** (stub) — sedia untuk Auth + Firestore (`lib/firebase.ts`)

### Struktur

```
app/
  (site)/        Halaman awam (Navbar + Footer + WhatsApp)
    page.tsx               Laman utama
    tentang, program, kamar-empati, sukarelawan, keahlian,
    derma, rakan, galeri, berita, faq, hubungi, log-masuk,
    privasi, terma
    program/[slug]         Halaman program dinamik
  (panel)/       Papan pemuka (tiada chrome pemasaran)
    dashboard      Papan pemuka sukarelawan
    admin          Papan pemuka pentadbir / CMS
  api/           Route stub backend (lihat di bawah)
  sitemap.ts, robots.ts, layout.tsx, globals.css
components/      Navbar, Footer, UI primitif, borang, seksyen, dashboard
lib/             site.ts (konfig), content.ts (kandungan), types.ts (model data),
                 firebase.ts (stub), api.ts (pembantu), utils.ts
public/images/   Aset jenama (logo, foto, rakan, ikon)
```

## Reka bentuk

- **Palet:** emas/amber jenama (`#E5A823`) + putih + hitam (`#1C1B19`) + krim/pasir
- **Tipografi:** Plus Jakarta Sans
- **Gaya:** premium, hangat, organik, ruang putih luas, sudut bulat, bayang halus
- Semua imej menggunakan foto sebenar daripada `public/images/`

## Backend — Supabase

Backend penuh dibina dengan **Supabase** (Postgres + Auth + RLS):

- **Skema:** [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) —
  jadual `profiles`, `volunteers`, `members`, `donations`, `counsellors`, `bookings`,
  `registrations`, `contacts`, `partnerships` dengan polisi RLS
  (borang awam boleh insert; hanya admin boleh baca/urus).
- **Auth:** log masuk e-mel/kata laluan (`/log-masuk`) melalui Server Actions;
  `middleware.ts` melindungi `/admin` (peranan admin) dan `/dashboard`.
- **Admin:** `/admin` memaparkan data sebenar — kelulusan sukarelawan,
  permintaan kerjasama, mesej, jumlah derma — dengan tindakan Lulus/Tolak langsung.
- **Mod demo:** tanpa kunci Supabase, semua borang tetap berfungsi (tidak disimpan)
  dan papan pemuka memaparkan notis mod demo.

### Persediaan (5 minit)

1. Buat projek di [supabase.com](https://supabase.com) (percuma)
2. Salin `.env.example` → `.env.local`, isi `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   (Dashboard → Settings → API)
3. Jalankan `supabase/migrations/0001_init.sql` dalam **SQL Editor** Supabase
4. Cipta akaun admin:
   ```bash
   node scripts/create-admin.mjs admin@ngoempati.org kata-laluan-kukuh "Nama Admin"
   ```
5. `npm run dev` → `/log-masuk` → anda akan diarahkan ke `/admin`

### Borang → jadual

| Borang | Route | Jadual Supabase |
|--------|-------|-----------------|
| Sukarelawan | `/api/volunteer` | `volunteers` (status `pending` → kelulusan di /admin) |
| Keahlian | `/api/membership` | `members` (no. ahli auto: `AE-YYYY-####`) |
| Derma | `/api/donation` | `donations` (+ titik integrasi ToyyibPay/FPX) |
| Tempahan Kamar Empati | `/api/booking` | `bookings` (kaunselor dari jadual `counsellors`) |
| Pendaftaran program | `/api/registration` | `registrations` |
| Hubungi | `/api/contact` | `contacts` |
| Kerjasama | `/api/partnership` | `partnerships` |

## Animasi

Kit animasi tersuai dalam [`components/motion/`](components/motion) — semuanya
menghormati `prefers-reduced-motion`:

- `TextReveal` — pendedahan perkataan berperingkat (hero)
- `CountUp` — pembilang statistik animasi spring
- `Parallax` — hanyutan berkait skrol untuk kad terapung
- `TiltCard` — kecondongan 3D + cahaya emas mengikut kursor
- `Magnetic` — CTA magnetik
- `ProgressBar` — bar sasaran derma menyapu masuk
- `ScrollProgress` — bar kemajuan emas di atas halaman
- Blob kecerunan "hidup" dalam hero (CSS keyframes)

## Status

✅ Laman awam penuh (BM) · ✅ Backend Supabase + RLS · ✅ Log masuk & peranan admin ·
✅ Papan pemuka admin dengan data langsung · ✅ Kit animasi premium · ✅ SEO/A11y

🔜 Seterusnya: pembayaran ToyyibPay/FPX sebenar, e-mel transaksional, CMS kandungan.
