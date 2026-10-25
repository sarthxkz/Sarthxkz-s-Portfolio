import Image from "next/image";
import { profile } from "@/content/profile";
import { projects, statusLabel } from "@/content/projects";
import { formatDay, getRepoActivity } from "@/lib/github";
import { Reveal } from "@/components/reveal";
import { StatusMark } from "@/components/status";
import { HeroScrub } from "@/components/home/hero-scrub";
import { Split } from "@/components/motion/split";
import { Tilt } from "@/components/motion/tilt";
import { Glitch } from "@/components/motion/glitch";
import { line } from "@/lib/line";

export async function Hero() {
  const activity = await getRepoActivity("sarthxkz");
  const polaris = projects[0];
  const cover = polaris.visual.kind === "screens" ? polaris.visual.screens[0] : null;
  const polarisPush = "href" in polaris.repo ? activity[polaris.repo.href.toLowerCase()]?.pushedAt : undefined;

  return (
    <section
      aria-labelledby="hero-title"
      className="frame pt-[clamp(24px,4svh,64px)] lg:flex lg:h-[calc(100svh-64px)] lg:min-h-[560px] lg:flex-col lg:pb-[clamp(20px,3svh,40px)]"
    >
      <Reveal immediate className="lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
        <HeroScrub>
          <h1 id="hero-title" className="display hero-name text-[clamp(64px,19vw,180px)] text-ink lg:whitespace-nowrap lg:text-[min(11.1vw,19svh)]">
            <Glitch layer={<Split text={profile.name} by="char" step={38} decorative />}>
              <Split text={profile.name} by="char" step={38} />
            </Glitch>
          </h1>
        </HeroScrub>

        <div className="mt-[clamp(28px,4.5svh,64px)] grid gap-12 lg:min-h-0 lg:flex-1 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col lg:col-span-5 lg:min-h-0">
            <p {...line(6)} className="t-stagger-line max-w-[30ch] text-[clamp(22px,2vw,28px)] leading-[1.3] text-ink lg:max-w-[34ch] lg:text-[clamp(24px,min(2vw,3.4svh),32px)] lg:leading-[1.22]">
              {profile.headline}
            </p>
            <p {...line(7)} className="t-stagger-line mt-[clamp(16px,2.6svh,28px)] max-w-[54ch] text-ink-2 lg:text-[clamp(17px,min(1.2vw,2.2svh),19px)] lg:leading-[1.6]">
              {profile.heroDescription}
            </p>
            <div {...line(8)} className="t-stagger-line mt-[clamp(20px,3svh,32px)] flex flex-wrap gap-3">
              <a href="#work" className="btn btn-primary">
                Explore my work
              </a>
              <a href="#contact" className="btn btn-secondary">
                Contact me
              </a>
            </div>

            <ul
              className="mt-10 lg:mt-auto lg:pt-[clamp(16px,3svh,36px)] lg:grid lg:grid-cols-2 lg:gap-x-8 [@media(min-width:1024px)_and_(max-height:760px)]:pt-3 [@media(min-width:1024px)_and_(max-height:680px)]:hidden"
              aria-label="Projects"
            >
              {projects.map((p, i) => (
                <li key={p.slug} {...line(9 + i)} className="t-stagger-line">
                  <a
                    href={`#project-${p.slug}`}
                    className="group -mx-3 flex min-h-11 items-center gap-4 px-3 py-1.5 transition-colors duration-150 hover:bg-surface-1 lg:min-h-10 lg:gap-3 lg:py-0.5 [@media(min-width:1024px)_and_(max-height:760px)]:min-h-9 [@media(min-width:1024px)_and_(max-height:760px)]:py-0"
                  >
                    <StatusMark status={p.status} />
                    <span className="flex-none whitespace-nowrap font-semibold text-ink">{p.title}</span>
                    <span className="hidden min-w-0 flex-1 text-[15px] leading-snug text-ink-3 sm:inline lg:hidden">
                      {p.tagline}
                    </span>
                    <span className="ml-auto flex-none whitespace-nowrap text-[15px] text-ink-2">{statusLabel[p.status]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {cover && (
            <div {...line(7)} className="t-stagger-line lg:col-span-7 lg:flex lg:min-h-0 lg:flex-col">
              <a
                href={`#project-${polaris.slug}`}
                className="block lg:min-h-0 lg:flex-1"
                aria-label={`${polaris.title}: ${polaris.tagline}`}
              >
                <Tilt className="lg:h-full" cardClassName="lg:h-full">
                  <div className="relative overflow-hidden bg-surface-1 lg:h-full">
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      width={cover.width}
                      height={cover.height}
                      priority
                      sizes="(min-width: 1024px) 56vw, 100vw"
                      className="hero-cover screenshot-outline block h-auto w-full lg:h-full lg:object-cover lg:object-left-top"
                    />
                  </div>
                </Tilt>
              </a>
              <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-ink-2">
                <StatusMark status={polaris.status} />
                <span className="text-ink">Now shipping: {polaris.title}</span>
                <span>{polaris.tagline}</span>
                {polarisPush && <span className="text-ink-3">· last push {formatDay(polarisPush)}</span>}
              </p>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
