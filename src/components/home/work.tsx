import Image from "next/image";
import { ViewTransition } from "react";
import { projects, type Project } from "@/content/projects";
import { ProjectVisual } from "@/components/project-visual";
import { LearnMore } from "@/components/learn-more";
import { StatusTag } from "@/components/status";
import { Reveal } from "@/components/reveal";
import { Split } from "@/components/motion/split";
import { StackScroll } from "@/components/motion/stack-scroll";
import { line } from "@/lib/line";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-1">
      {project.caseStudy && <LearnMore href={`/work/${project.slug}`}>Read the case study</LearnMore>}
      {project.live && (
        <LearnMore href={project.live} external>
          Open the live site
        </LearnMore>
      )}
      {"href" in project.repo ? (
        <LearnMore href={project.repo.href} external>
          Source on GitHub
        </LearnMore>
      ) : (
        <span className="inline-flex min-h-11 items-center text-[15px] text-ink-3">Repository is private</span>
      )}
    </div>
  );
}

function Chapter({ project, index }: { project: Project; index: number }) {
  const visual = <ProjectVisual project={project} priority={index === 0} sizes="(min-width: 1024px) 62vw, 100vw" flush />;
  return (
    <article
      id={`project-${project.slug}`}
      aria-labelledby={`title-${project.slug}`}
      className="stack-panel scroll-mt-24 lg:sticky lg:top-[88px] lg:flex lg:min-h-[calc(100svh-104px)] lg:flex-col"
    >
      <div className="stack-inner relative origin-top bg-surface-1 lg:flex-1">
        <div className="grid h-full gap-8 p-5 md:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
          <Reveal className="flex flex-col lg:col-span-4">
            {project.mark && (
              <Image src={project.mark} alt="" width={44} height={44} className="t-stagger-line screenshot-outline mb-6 block h-11 w-11" />
            )}
            <h3 id={`title-${project.slug}`} className="display chapter-title text-[clamp(52px,6vw,104px)]">
              <Split text={project.title} by="char" delay={80} />
            </h3>
            <p {...line(1)} className="t-stagger-line mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
              <StatusTag status={project.status} />
              <span className="text-[15px] text-ink-3">{project.category}</span>
            </p>
            <p {...line(2)} className="t-stagger-line mt-4 text-[19px] text-ink">
              {project.summary}
            </p>
            <p {...line(3)} className="t-stagger-line mt-4 text-[15px] text-ink-2">
              {project.statusNote}
            </p>
            <div {...line(4)} className="t-stagger-line mt-auto pt-8">
              <p className="text-[15px] leading-relaxed text-ink-3">{project.stack.join(" · ")}</p>
              <div className="mt-4">
                <ProjectLinks project={project} />
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <div className="w-full">
              {project.caseStudy ? (
                <ViewTransition name={`plate-${project.slug}`}>
                  <div>{visual}</div>
                </ViewTransition>
              ) : (
                visual
              )}
            </div>
          </div>
        </div>
        <div aria-hidden className="stack-shade pointer-events-none absolute inset-0 bg-ground opacity-0" />
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="frame mt-[var(--section-gap)] scroll-mt-20">
      <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h2 id="work-title" className="heading text-[clamp(56px,7vw,124px)] lg:col-span-8">
          <Split text="Selected work" />
        </h2>
        <p {...line(2)} className="t-stagger-line max-w-[46ch] text-[19px] text-ink-2 lg:col-span-4 lg:pb-3">
          Four projects, each labelled with where it actually stands: live, in beta, or still being built.
        </p>
      </Reveal>

      <div className="mt-14">
        <StackScroll>
          <div className="space-y-6 lg:space-y-[18vh]">
            {projects.map((project, i) => (
              <Chapter key={project.slug} project={project} index={i} />
            ))}
          </div>
        </StackScroll>
      </div>
    </section>
  );
}
