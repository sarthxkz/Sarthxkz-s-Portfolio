import Image from "next/image";
import type { Project } from "@/content/projects";
import { SystemDiagram } from "@/components/system-diagram";
import { ScreensReel } from "@/components/motion/screens-reel";
import { Reveal } from "@/components/reveal";

export function ProjectVisual({
  project,
  priority = false,
  sizes,
  flush = false,
}: {
  project: Project;
  priority?: boolean;
  sizes: string;
  // Inside a panel that already has its own surface and padding.
  flush?: boolean;
}) {
  const v = project.visual;

  if (v.kind === "screens") {
    return (
      <ScreensReel
        screens={v.screens}
        labels={v.screens.map((s, i) => s.label ?? `Screen ${i + 1}`)}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <figure className={`flex flex-col gap-6 ${flush ? "" : "bg-surface-1 p-5 md:p-8"}`}>
      {!flush && project.mark && <Image src={project.mark} alt="" width={48} height={48} className="screenshot-outline h-12 w-12" />}
      <Reveal aria-hidden>
        <SystemDiagram name={v.diagram} />
      </Reveal>
      <figcaption className="text-[15px] text-ink-2">
        System diagram of {project.title}, drawn from its architecture notes
        <span className="sr-only">. {v.alt}</span>
      </figcaption>
    </figure>
  );
}
