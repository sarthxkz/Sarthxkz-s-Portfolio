import { profile } from "@/content/profile";
import { activities, skills } from "@/content/experience";
import { Reveal } from "@/components/reveal";
import { line } from "@/lib/line";
import Image from "next/image";
import { PlateReveal } from "@/components/motion/plate-reveal";
import { Split } from "@/components/motion/split";

export function About() {
  const e = profile.education;
  const photo = profile.photo;
  const facts = (
        <Reveal as="dl" className={`grid content-start gap-px bg-ground ${photo ? "mt-12 sm:grid-cols-2" : "lg:col-span-5 lg:mt-[calc(clamp(44px,6vw,96px)+32px)]"}`}>
          {[
            ["Studying", `${e.degree}, ${e.university}`],
            ["Campus", e.campus],
            ["Graduating", e.period],
            ["Campus involvement", "PLACVS SRMIST, Corporate Domain"],
          ].map(([k, v], i) => (
            <div key={k} {...line(i)} className="t-stagger-line bg-surface-1 px-5 py-4">
              <dt className="text-[15px] text-ink-3">{k}</dt>
              <dd className="mt-1 text-ink">{v}</dd>
            </div>
          ))}
          <div {...line(4)} className="t-stagger-line bg-surface-1 px-5 py-4">
            <dt className="text-[15px] text-ink-3">Learning right now</dt>
            <dd className="mt-1">
              <ul className="space-y-1 text-ink">
                {profile.learning.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div {...line(5)} className="t-stagger-line bg-surface-1 px-5 py-4">
            <dt className="text-[15px] text-ink-3">Interested in</dt>
            <dd className="mt-1 text-ink">{profile.interests.join(", ")}</dd>
          </div>
        </Reveal>
  );
  return (
    <section id="about" aria-labelledby="about-title" className="frame mt-[var(--section-gap)] scroll-mt-20">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-7">
          <h2 id="about-title" className="heading text-[clamp(56px,8.4vw,148px)]">
            <Split text="About" by="char" />
          </h2>
          <div className="mt-8 max-w-[62ch] space-y-5 text-[19px] leading-[1.6] text-ink">
            {profile.about.map((para, i) => (
              <p key={i} {...line(i + 1)} className="t-stagger-line">
                {para}
              </p>
            ))}
          </div>
          {photo && facts}
        </Reveal>

        {photo && (
          <div className="lg:col-span-5 lg:mt-[calc(clamp(56px,8.4vw,148px)*0.9+32px)]">
            <div className="lg:sticky lg:top-24">
              <PlateReveal>
                <div className="overflow-hidden bg-surface-1">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="portrait screenshot-outline aspect-[4/5] h-auto w-full object-cover"
                    style={{ objectPosition: photo.position }}
                  />
                </div>
              </PlateReveal>
            </div>
          </div>
        )}
        {!photo && facts}
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="frame mt-[var(--section-gap)] scroll-mt-20">
      <Reveal className="max-w-[60ch]">
        <h2 id="skills-title" className="heading text-[clamp(56px,8.4vw,148px)]">
          <Split text="Skills" by="char" />
        </h2>
        <p {...line(1)} className="t-stagger-line mt-5 text-[19px] text-ink-2">
          Only what I have shipped or studied, each with where I used it. No percentage bars.
        </p>
      </Reveal>

      <div className="mt-14">
        {skills.map((group) => (
          <Reveal key={group.title} className="grid gap-4 py-8 md:grid-cols-12 md:gap-8">
            <h3 {...line(0)} className="t-stagger-line text-[22px] font-semibold md:col-span-3" style={{ fontVariationSettings: '"wdth" 108' }}>
              {group.title}
            </h3>
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 md:col-span-9 xl:grid-cols-3">
              {group.items.map((item, i) => (
                <li key={item.name} {...line(i + 1)} className="t-stagger-line">
                  <span className="block text-[19px] text-ink">{item.name}</span>
                  <span className="block text-[15px] text-ink-3">{item.usedIn}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Activities() {
  return (
    <section id="activities" aria-labelledby="activities-title" className="frame mt-[var(--section-gap)] scroll-mt-20">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <h2 id="activities-title" className="heading text-[clamp(56px,7vw,120px)] lg:sticky lg:top-28">
            <Split text="Activities" by="char" />
          </h2>
        </Reveal>
        <ol className="lg:col-span-8">
          {activities.map((a) => (
            <Reveal as="li" key={`${a.org}-${a.title}`} className="grid gap-2 bg-surface-1 px-5 py-6 sm:grid-cols-[9rem_1fr] sm:gap-8 md:px-8 [&+li]:mt-px">
              <p {...line(0)} className="t-stagger-line tabular text-[15px] text-ink-3">
                {a.period ?? "Ongoing"}
              </p>
              <div>
                <h3 {...line(1)} className="t-stagger-line text-[22px] font-semibold leading-tight" style={{ fontVariationSettings: '"wdth" 108' }}>
                  {a.org}
                </h3>
                <p {...line(2)} className="t-stagger-line mt-1 text-ink-2">
                  {a.title}
                </p>
                <p {...line(3)} className="t-stagger-line mt-3 text-ink">
                  {a.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
