import type { Metadata, Viewport } from "next";
import { Mona_Sans, JetBrains_Mono } from "next/font/google"; // taste-skill-ignore: mono only for literal code blocks
import { profile } from "@/content/profile";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SignalField } from "@/components/motion/signal-field";
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

const metadataName = profile.name.toUpperCase();
const description = `${metadataName}: ${profile.intro.toUpperCase()}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: metadataName,
    template: `%s · ${metadataName}`,
  },
  description,
  authors: [{ name: metadataName, url: profile.links.github }],
  openGraph: {
    type: "website",
    title: metadataName,
    description,
    url: "/",
    siteName: metadataName,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: metadataName,
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
        <SignalField />
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
