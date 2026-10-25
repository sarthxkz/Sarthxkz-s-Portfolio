import type { Metadata, Viewport } from "next";
import { Mona_Sans, JetBrains_Mono } from "next/font/google"; // taste-skill-ignore: mono only for literal code blocks
import { profile } from "@/content/profile";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { DotField } from "@/components/motion/dot-field";
import "./globals.css";

const mona = Mona_Sans({
  variable: "--font-mona",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({ // taste-skill-ignore
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const description = `${profile.name}: ${profile.intro}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name}, student developer`,
    template: `%s · ${profile.name}`,
  },
  description,
  authors: [{ name: profile.name, url: profile.links.github }],
  openGraph: {
    type: "website",
    title: `${profile.name}, student developer`,
    description,
    url: "/",
    siteName: profile.name,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name}, student developer`,
    description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0c1116",
  colorScheme: "dark",
};

// Marks the document as scripted before paint, so reveal styles only hide
// content when JavaScript is actually running.
const jsFlag = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${mona.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        <DotField />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteNav />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
