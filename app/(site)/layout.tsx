import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
