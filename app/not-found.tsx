import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-warm-radial px-5 text-center">
      <Logo />
      <p className="mt-8 text-7xl font-extrabold text-gradient-gold">404</p>
      <h1 className="mt-4 text-2xl font-bold text-ink">Halaman tidak ditemui</h1>
      <p className="mt-2 max-w-sm text-ink-muted">
        Maaf, halaman yang anda cari mungkin telah dialihkan atau tidak wujud.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn btn-lg btn-primary"><Home className="h-4 w-4" /> Laman Utama</Link>
        <Link href="/hubungi" className="btn btn-lg btn-ghost"><ArrowLeft className="h-4 w-4" /> Hubungi Kami</Link>
      </div>
    </div>
  );
}
