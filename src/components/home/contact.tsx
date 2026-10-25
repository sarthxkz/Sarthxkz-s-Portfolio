import { profile } from "@/content/profile";
import { Reveal } from "@/components/reveal";
import { line } from "@/lib/line";
import { CopyEmail } from "@/components/home/copy-email";
import { LearnMore } from "@/components/learn-more";
import { Split } from "@/components/motion/split";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="frame mt-[var(--section-gap)] scroll-mt-20">
      <Reveal className="grid gap-14 bg-surface-1 px-5 py-14 md:px-12 md:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <h2 id="contact-title" className="heading text-[clamp(56px,8.4vw,148px)]">
            <Split text="Contact" by="char" />
          </h2>
          <p {...line(1)} className="t-stagger-line mt-5 max-w-[48ch] text-[19px] text-ink">
            Internships, hackathon teams, or a project you want a second pair of hands on: email is the fastest way
            to reach me.
          </p>

          <div {...line(2)} className="t-stagger-line mt-12">
            <a
              href={`mailto:${profile.email}`}
              className="heading block text-[clamp(26px,3.5vw,54px)] text-ink decoration-accent decoration-2 underline-offset-[0.18em] hover:underline"
            >
              {profile.email.split("@")[0]}
              <wbr />@{profile.email.split("@")[1]}
            </a>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="btn btn-primary">
                Write an email
              </a>
              <CopyEmail email={profile.email} />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end lg:col-span-4">
          <h3 {...line(3)} className="t-stagger-line text-[15px] text-ink-3">
            Elsewhere
          </h3>
          <ul {...line(4)} className="t-stagger-line mt-2">
            <li>
              <LearnMore href={profile.links.github} external className="w-full justify-between py-2 text-[19px]">
                GitHub, @sarthxkz
              </LearnMore>
            </li>
            <li>
              <LearnMore href={profile.links.linkedin} external className="w-full justify-between py-2 text-[19px]">
                LinkedIn
              </LearnMore>
            </li>
            <li>
              <LearnMore href={profile.resume.href} external className="w-full justify-between py-2 text-[19px]">
                Resume, PDF ({profile.resume.updated})
              </LearnMore>
            </li>
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
