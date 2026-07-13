/**
 * Editorial content for the public site. In production this is the shape the
 * custom CMS / Firebase will return, keeping it typed here lets pages render
 * real, on-brand copy today and swap to a data source later with no UI changes.
 */

export type Stat = { value: string; label: string; sub?: string };

export const stats: Stat[] = [
  { value: "5,000+", label: "Nyawa disentuh", sub: "menerusi program & komuniti" },
  { value: "1,200+", label: "Sukarelawan aktif", sub: "di seluruh Malaysia" },
  { value: "80+", label: "Program dijalankan", sub: "sejak 2021" },
  { value: "12", label: "Negeri dijangkau", sub: "dan terus berkembang" },
];

export type FocusArea = { title: string; description: string; icon: string };

export const focusAreas: FocusArea[] = [
  { icon: "HeartHandshake", title: "Survivor Kesihatan Mental", description: "Ruang selamat dan sokongan rakan sebaya untuk mereka yang sedang pulih." },
  { icon: "Users", title: "Belia & Komuniti", description: "Memperkasa generasi muda dengan kesedaran dan kemahiran daya tahan." },
  { icon: "ShieldCheck", title: "Pusat Pemulihan Juvana", description: "Program advokasi dan bimbingan untuk remaja di pusat tahanan." },
  { icon: "Sunrise", title: "Bekas Banduan", description: "Membantu peralihan semula ke masyarakat dengan maruah dan harapan." },
  { icon: "Sprout", title: "Pemulihan Komuniti", description: "Membina sistem sokongan yang kekal di peringkat akar umbi." },
  { icon: "MessageCircleHeart", title: "Kesedaran Melalui Tindakan", description: "Bukan sekadar bercakap, kami turun padang membuat perubahan." },
];

export type Programme = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  tags: string[];
  schedule?: string;
};

export const programmes: Programme[] = [
  {
    slug: "lepak-luah",
    title: "Lepak & Luah",
    tagline: "Ruang santai untuk berkongsi rasa",
    description:
      "Sesi perjumpaan santai di ruang terbuka di mana sesiapa sahaja boleh datang, lepak dan meluahkan apa yang terbuku tanpa rasa dihakimi.",
    image: "/images/event-komuniti-1.jpeg",
    tags: ["Sokongan Rakan Sebaya", "Komuniti", "Percuma"],
    schedule: "Setiap hujung minggu",
  },
  {
    slug: "kamar-empati",
    title: "Kamar Empati",
    tagline: "Sesi kaunseling bersama kaunselor terlatih",
    description:
      "Platform tempahan kaunseling yang menghubungkan anda dengan kaunselor yang dipercayai, secara peribadi, sulit dan mesra.",
    image: "/images/presiden-ucapan.jpeg",
    tags: ["Kaunseling", "Sulit", "Temujanji"],
    schedule: "Mengikut slot tersedia",
  },
  {
    slug: "misi-banjir",
    title: "Misi Bantuan Banjir",
    tagline: "Turun padang ketika komuniti memerlukan",
    description:
      "Sukarelawan Empati menyalurkan bantuan kecemasan dan sokongan psikososial kepada mangsa banjir di seluruh negara.",
    image: "/images/misi-banjir.jpeg",
    tags: ["Bantuan Bencana", "Psikososial", "Sukarelawan"],
    schedule: "Mengikut keperluan",
  },
  {
    slug: "advokasi-juvana",
    title: "Advokasi Juvana",
    tagline: "Harapan untuk remaja di pusat pemulihan",
    description:
      "Program bimbingan dan motivasi berstruktur untuk remaja di pusat tahanan juvana, membina semula keyakinan dan hala tuju.",
    image: "/images/event-komuniti-2.jpeg",
    tags: ["Belia", "Bimbingan", "Pemulihan"],
    schedule: "Bulanan",
  },
];

export type Person = {
  name: string;
  role: string;
  image?: string;
  org?: string;
};

export const ambassadors: Person[] = [
  { name: "YM Che' Puan Sarimah Ibrahim", role: "Ikon Empati", image: "/images/ikon-sarimah-ibrahim.jpeg" },
  { name: "Zynakal", role: "Ikon Empati", image: "/images/ikon-zynakal.jpeg" },
];

export const advisors: Person[] = [
  { name: "Dr. Alizi Alias", role: "Konsultan Psikologi Organisasi" },
  { name: "Dr. Fakrul Azren", role: "Doktor Psikiatri" },
  { name: "Prof. Madya Dr. Nahrizul Adib Kadri", role: "Penasihat Empati", org: "Universiti Malaya", image: "/images/penasihat-nahrizul.jpeg" },
];

export const partners = [
  { name: "Rakan Strategik 1", image: "/images/partner-1.jpeg" },
  { name: "Rakan Strategik 2", image: "/images/partner-2.jpeg" },
  { name: "Rakan Penaja", image: "/images/rakan-penaja.jpeg" },
];

export const gallery = [
  { src: "/images/event-komuniti-1.jpeg", caption: "Sesi Lepak & Luah bersama komuniti", tall: false },
  { src: "/images/perasmian-adam-adli.jpeg", caption: "Dirasmikan oleh YBTM Adam Adli (2023)", tall: true },
  { src: "/images/misi-banjir.jpeg", caption: "Misi bantuan banjir", tall: false },
  { src: "/images/event-komuniti-2.jpeg", caption: "Program kesedaran komuniti", tall: false },
  { src: "/images/presiden-ucapan.jpeg", caption: "Ucapan Presiden NGO Empati", tall: true },
  { src: "/images/liputan-media.jpeg", caption: "Liputan media", tall: false },
  { src: "/images/event-komuniti-3.jpeg", caption: "Aktiviti komuniti", tall: false },
  { src: "/images/komuniti-extra.jpeg", caption: "Bersama keluarga Empati", tall: false },
];

export type Testimonial = { quote: string; name: string; role: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      "Kali pertama saya rasa didengari tanpa dihakimi. Empati bukan sekadar program, ia keluarga yang menerima saya seadanya.",
    name: "Aisyah",
    role: "Ahli Empati",
  },
  {
    quote:
      "Menjadi sukarelawan di sini mengubah cara saya melihat kesihatan mental. Setiap check-in mingguan buat saya rasa dihargai.",
    name: "Daniel",
    role: "Sukarelawan",
  },
  {
    quote:
      "Sokongan psikososial Empati ketika banjir benar-benar menenangkan keluarga kami. Mereka hadir bukan sekadar memberi barang.",
    name: "Puan Rohani",
    role: "Penerima Manfaat",
  },
];

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
};

export const news: NewsItem[] = [
  {
    slug: "liputan-media-empati",
    title: "Empati mendapat liputan media nasional",
    excerpt:
      "Usaha advokasi kesihatan mental NGO Empati disorot dalam liputan media arus perdana baru-baru ini.",
    date: "2024-11-12",
    category: "Media",
    image: "/images/liputan-media.jpeg",
  },
  {
    slug: "misi-bantuan-banjir-2024",
    title: "Sukarelawan Empati turun padang bantu mangsa banjir",
    excerpt:
      "Lebih 100 sukarelawan dikerahkan menyalurkan bantuan dan sokongan psikososial di kawasan terjejas.",
    date: "2024-12-28",
    category: "Misi",
    image: "/images/misi-banjir.jpeg",
  },
  {
    slug: "perasmian-2023",
    title: "Program tahunan dirasmikan bekas Menteri Belia & Sukan",
    excerpt:
      "YBTM Adam Adli menyempurnakan perasmian, menandakan komitmen baharu terhadap kesihatan mental belia.",
    date: "2023-08-19",
    category: "Acara",
    image: "/images/perasmian-adam-adli.jpeg",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Apakah itu NGO Empati?",
    a: "NGO Empati (Kelab Advokasi Pulih Mental) ialah pertubuhan bukan kerajaan yang memperjuangkan kesihatan mental melalui sokongan rakan sebaya, program kesedaran dan tindakan komuniti.",
  },
  {
    q: "Adakah perkhidmatan Empati percuma?",
    a: "Kebanyakan program komuniti kami seperti Lepak & Luah adalah percuma. Sesi kaunseling Kamar Empati mungkin melibatkan sumbangan kecil bagi menampung kos kaunselor terlatih.",
  },
  {
    q: "Bagaimana saya boleh menjadi sukarelawan?",
    a: "Isi borang permohonan di halaman Sukarelawan. Selepas pengesahan e-mel dan kelulusan pentadbir, anda akan menerima akses ke papan pemuka sukarelawan dan tugasan pertama anda.",
  },
  {
    q: "Siapa yang layak menjadi Ahli Empati?",
    a: "Keahlian Ahli Empati terbuka kepada survivor kesihatan mental yang telah didiagnosis secara rasmi. Ahli menikmati sejarah program, lencana pencapaian dan kad keahlian digital.",
  },
  {
    q: "Adakah maklumat saya selamat?",
    a: "Ya. Kami mematuhi Akta Perlindungan Data Peribadi (PDPA), menyimpan data dalam pangkalan data yang disulitkan dan tidak sekali-kali berkongsi maklumat anda tanpa kebenaran.",
  },
  {
    q: "Bagaimana derma saya digunakan?",
    a: "Setiap ringgit menyokong program komuniti, sesi kaunseling dan misi bantuan. Kami memaparkan sasaran bulanan dan kemas kini ketelusan secara berkala.",
  },
];

export type Badge = { name: string; description: string; icon: string };

export const volunteerBadges: Badge[] = [
  { icon: "Sparkles", name: "Permulaan Baik", description: "Sertai projek pertama anda" },
  { icon: "CalendarCheck", name: "Konsisten", description: "4 check-in mingguan berturut-turut" },
  { icon: "Flame", name: "Penggerak", description: "Sertai 10 program" },
  { icon: "Award", name: "Ikon Empati", description: "100 jam khidmat sukarela" },
];
