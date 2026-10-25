import { cacheLife } from "next/cache";
import { profile } from "@/content/profile";
import { BackToTop } from "@/components/back-to-top";
import { Reveal } from "@/components/reveal";
import { Split } from "@/components/motion/split";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="mt-3 bg-surface-1">
      <div className="frame pt-20 pb-10">
        <Reveal aria-hidden>
          <p
            className="display select-none text-[clamp(56px,19vw,180px)] text-ink lg:whitespace-nowrap lg:text-[10.3vw]"
            style={{ fontVariationSettings: '"wdth" 125' }}
          >
            <Split text={profile.name} by="char" step={40} decorative />
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[17px]">
            <li>
              <a className="link" href={`mailto:${profile.email}`}>
                Email
              </a>
            </li>
            <li>
              <a className="link" href={profile.links.github} target="_blank" rel="noopener">
                GitHub
              </a>
            </li>
            <li>
              <a className="link" href={profile.links.linkedin} target="_blank" rel="noopener">
                LinkedIn
              </a>
            </li>
            <li>
              <a className="link" href={profile.resume.href} target="_blank" rel="noopener">
                Resume
              </a>
            </li>
          </ul>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px] text-ink-2">
            <p>
              © <CurrentYear /> {profile.name}. Built with Next.js. No tracking, no cookies.
            </p>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
