import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ViewTransition } from "react";
import { caseStudies, getProject, type Ledger } from "@/content/projects";
import { ProjectVisual } from "@/components/project-visual";
import { StatusTag } from "@/components/status";
import { LearnMore } from "@/components/learn-more";
import { Reveal } from "@/components/reveal";
import { Split } from "@/components/motion/split";
import { line } from "@/lib/line";

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} case study`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: `${project.title} case study`, description: project.summary, url: `/work/${project.slug}` },
  };
}

const ledgerLabel: Record<Ledger[number]["state"], string> = {
  verified: "Verified",
  built: "Built, not yet verified",
  blocked: "Blocked",
};
const ledgerMark: Record<Ledger[number]["state"], string> = {
  verified: "mark-verified",
  built: "mark-beta",
  blocked: "mark-concept",
};

function Block({ title, children, i = 0 }: { title: string; children: React.ReactNode; i?: number }) {
  return (
    <Reveal as="section" className="grid gap-5 lg:grid-cols-12 lg:gap-10" aria-label={title}>
      <h2 {...line(i)} className="t-stagger-line text-[22px] font-semibold leading-tight lg:col-span-4" style={{ fontVariationSettings: '"wdth" 108' }}>
        {title}
      </h2>
      <div {...line(i + 1)} className="t-stagger-line max-w-[72ch] lg:col-span-7">
        {children}
      </div>
    </Reveal>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();
  const cs = project.caseStudy;

  const index = caseStudies.findIndex((p) => p.slug === project.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <article className="frame pt-10">
      <nav aria-label="Breadcrumb">
        <Link href="/#work" className="inline-flex min-h-11 items-center gap-1.5 text-[15px] text-ink-2 hover:text-ink">
          <ArrowLeft aria-hidden size={16} strokeWidth={2} /> All work
        </Link>
      </nav>

      <Reveal immediate className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1 className="display case-title text-[clamp(64px,10vw,176px)]">
            <Split text={project.title} by="char" />
          </h1>
          <p {...line(1)} className="t-stagger-line mt-8 max-w-[44ch] text-[19px] leading-[1.4] text-ink md:text-[clamp(22px,2vw,28px)] md:leading-[1.3]">
            {project.summary}
          </p>
        </div>
        <dl {...line(2)} className="t-stagger-line space-y-5 self-end lg:col-span-4">
          <div>
            <dt className="text-[15px] text-ink-3">Status</dt>
            <dd className="mt-1">
              <StatusTag status={project.status} />
              <p className="mt-1 text-[15px] text-ink-2">{project.statusNote}</p>
            </dd>
          </div>
          <div>
            <dt className="text-[15px] text-ink-3">Role</dt>
            <dd className="mt-1 text-[15px] text-ink">{cs.role}</dd>
          </div>
          <div>
            <dt className="text-[15px] text-ink-3">Built with</dt>
            <dd className="mt-1 text-[15px] text-ink-2">{project.stack.join(", ")}</dd>
          </div>
        </dl>
        <div {...line(3)} className="t-stagger-line flex flex-wrap gap-x-6 lg:col-span-4 lg:col-start-9 lg:-mt-6">
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
      </Reveal>

      <div className="mt-14">
        <ViewTransition name={`plate-${project.slug}`}>
          <div>
            <ProjectVisual project={project} priority sizes="100vw" />
          </div>
        </ViewTransition>
        {project.stills && project.stills.length > 0 && (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {project.stills.map((still) => (
              <Image
                key={still.src}
                src={still.src}
                alt={still.alt}
                width={still.width}
                height={still.height}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="screenshot-outline block h-auto w-full bg-surface-1"
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-24 space-y-20">
        <Block title="The problem">
          <p className="text-[19px] leading-[1.6] text-ink">{cs.problem}</p>
        </Block>

        {cs.why && (
          <Block title="Why I built it">
            <p className="text-[19px] leading-[1.6] text-ink">{cs.why}</p>
          </Block>
        )}

        <Block title="How it works">
          <ul className="space-y-4 text-[19px] leading-[1.6] text-ink">
            {cs.howItWorks.map((item) => (
              <li key={item} className="grid grid-cols-[14px_1fr] gap-3">
                <span aria-hidden className="mt-[0.7em] h-[2px] w-3 bg-ink-3" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Decisions that mattered">
          <dl className="grid gap-px bg-ground">
            {cs.decisions.map((d) => (
              <div key={d.decision} className="bg-surface-1 px-5 py-5">
                <dt className="font-semibold text-ink">{d.decision}</dt>
                <dd className="mt-1.5 text-ink-2">{d.reason}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block title="Problems I had to solve">
          <div className="space-y-8">
            {cs.challenges.map((c) => (
              <div key={c.title}>
                <h3 className="text-[19px] font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 text-[19px] leading-[1.6] text-ink-2">{c.detail}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block title="What is verified, and what isn't">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Verification status of each part of {project.title}</caption>
            <thead>
              <tr className="text-[15px] text-ink-3">
                <th scope="col" className="pb-3 font-normal">
                  Part
                </th>
                <th scope="col" className="w-[38%] pb-3 font-normal">
                  State
                </th>
              </tr>
            </thead>
            <tbody>
              {cs.ledger.map((row) => (
                <tr key={row.item} className="border-t border-rule align-top" /* taste-skill-ignore: real data table */>
                  <td className="py-4 pr-6 text-ink">{row.item}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center gap-2 text-[15px] ${row.state === "verified" ? "text-ink" : "text-ink-2"}`}>
                      <span aria-hidden className={`mark ${ledgerMark[row.state]}`} />
                      {ledgerLabel[row.state]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-[15px] text-ink-3">Taken from the project&apos;s own status documents.</p>
        </Block>

        <Block title="Still unfinished">
          <ul className="space-y-3 text-[19px] text-ink">
            {cs.unfinished.map((u) => (
              <li key={u} className="grid grid-cols-[14px_1fr] gap-3">
                <span aria-hidden className="mark mark-in-progress mt-[0.55em]" />
                <span>{u}</span>
              </li>
            ))}
          </ul>
        </Block>

        {cs.learned && (
          <Block title="What I learned">
            <p className="text-[19px] leading-[1.6] text-ink">{cs.learned}</p>
          </Block>
        )}
      </div>

      {next && next.slug !== project.slug && (
        <nav aria-label="Next case study" className="mt-[var(--section-gap)]">
          <Link href={`/work/${next.slug}`} className="group block bg-surface-1 px-5 py-12 transition-colors duration-150 hover:bg-surface-2 md:px-12">
            <span className="flex items-center justify-between gap-6">
              <span className="display text-[clamp(48px,7vw,120px)]">
                <span className="sr-only">Next case study: </span>
                {next.title}
              </span>
              <ArrowRight
                aria-hidden
                strokeWidth={1.5}
                className="h-[clamp(32px,4vw,64px)] w-[clamp(32px,4vw,64px)] flex-none text-ink-2 transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
              />
            </span>
          </Link>
        </nav>
      )}
    </article>
  );
}
