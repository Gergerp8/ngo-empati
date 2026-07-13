import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { programmes } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "", "/tentang", "/program", "/program/lepak-luah", "/kamar-empati",
    "/sukarelawan", "/keahlian", "/derma", "/rakan", "/galeri", "/berita",
    "/faq", "/hubungi", "/log-masuk", "/privasi", "/terma",
  ];
  const now = new Date();
  const base: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
  const programmeRoutes: MetadataRoute.Sitemap = programmes.map((p) => ({
    url: `${site.url}/program/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [...base, ...programmeRoutes];
}
