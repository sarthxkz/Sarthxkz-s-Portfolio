import { statusLabel, statusMeaning, type Status } from "@/content/projects";

export function StatusMark({ status }: { status: Status }) {
  return <span aria-hidden className={`mark mark-${status}`} />;
}

export function StatusTag({ status, className = "" }: { status: Status; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[15px] text-ink ${className}`} title={statusMeaning[status]}>
      <StatusMark status={status} />
      {statusLabel[status]}
    </span>
  );
}
