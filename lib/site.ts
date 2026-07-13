/**
 * Global site configuration - single source of truth for nav, contact details,
 * donation info, and social links. Edit here (or wire to the CMS later).
 */

export const site = {
  name: "NGO Empati",
  legalName: "Kelab Advokasi Pulih Mental",
  registration: "PPM-016-10-21072022",
  tagline: "Sistem sokongan kesihatan mental paling mesra di Malaysia",
  description:
    "NGO Empati ialah sebuah pertubuhan advokasi kesihatan mental yang menyatukan survivor, belia dan komuniti melalui sokongan rakan sebaya, program kesedaran dan tindakan nyata.",
  url: "https://ngoempati.org",
  email: "hello@ngoempati.org",
  phone: "+60 11-1234 5678",
  whatsapp: "60111234567",
  whatsappCommunity: "https://chat.whatsapp.com/", // TODO: pautan komuniti sebenar
  address: "Kuala Lumpur, Malaysia",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63721.5!2d101.66!3d3.139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zS3VhbGEgTHVtcHVy!5e0!3m2!1sen!2smy!4v0",
  socials: {
    instagram: "https://instagram.com/ngoempati",
    tiktok: "https://tiktok.com/@ngoempati",
    facebook: "https://facebook.com/ngoempati",
    youtube: "https://youtube.com/@ngoempati",
  },
} as const;

export const donation = {
  bankName: "CIMB Bank",
  accountName: "Kelab Advokasi Pulih Mental",
  accountNumber: "8605587480",
  reference: "WEBSITE",
  monthlyTarget: 2500,
  monthlyRaised: 1680, // contoh - ganti dengan data sebenar / CMS
  donorsThisMonth: 42,
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

/** Primary navigation. Grouped item appears as a mega-dropdown on desktop. */
export const mainNav: { label: string; href?: string; children?: NavItem[] }[] = [
  { label: "Tentang", href: "/tentang" },
  {
    label: "Program",
    children: [
      { label: "Semua Program", href: "/program", description: "Senarai penuh inisiatif Empati" },
      { label: "Lepak & Luah", href: "/program/lepak-luah", description: "Ruang santai untuk berkongsi rasa" },
      { label: "Kamar Empati", href: "/kamar-empati", description: "Tempahan sesi kaunseling" },
    ],
  },
  {
    label: "Sertai Kami",
    children: [
      { label: "Jadi Sukarelawan", href: "/sukarelawan", description: "Sumbang masa & tenaga" },
      { label: "Keahlian (Ahli Empati)", href: "/keahlian", description: "Untuk survivor kesihatan mental" },
      { label: "Rakan & Kerjasama", href: "/rakan", description: "Kolaborasi korporat & institusi" },
    ],
  },
  { label: "Galeri", href: "/galeri" },
  { label: "Berita", href: "/berita" },
  { label: "Hubungi", href: "/hubungi" },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Organisasi",
    links: [
      { label: "Tentang Kami", href: "/tentang" },
      { label: "Program", href: "/program" },
      { label: "Galeri", href: "/galeri" },
      { label: "Berita", href: "/berita" },
      { label: "Rakan & Penaja", href: "/rakan" },
    ],
  },
  {
    title: "Sertai",
    links: [
      { label: "Jadi Sukarelawan", href: "/sukarelawan" },
      { label: "Keahlian", href: "/keahlian" },
      { label: "Kamar Empati", href: "/kamar-empati" },
      { label: "Derma Bulanan", href: "/derma" },
    ],
  },
  {
    title: "Sokongan",
    links: [
      { label: "Soalan Lazim", href: "/faq" },
      { label: "Hubungi Kami", href: "/hubungi" },
      { label: "Dasar Privasi", href: "/privasi" },
      { label: "Terma Penggunaan", href: "/terma" },
    ],
  },
];
