import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { caseStudies } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.siteUrl, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((p) => ({
      url: `${profile.siteUrl}/work/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
