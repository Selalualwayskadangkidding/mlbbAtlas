import { cn } from "@/lib/utils/cn";
import type { VerifiedDataStatus } from "@/types/regions";

interface DataStatusBadgeProps {
  status: VerifiedDataStatus;
}

const statusLabels: Record<VerifiedDataStatus, string> = {
  verified: "Verified",
  partial: "Partial",
  placeholder: "Placeholder"
};

const statusStyles: Record<VerifiedDataStatus, string> = {
  verified: "border-emerald-300 bg-emerald-50 text-emerald-700",
  partial: "border-amber-300 bg-amber-50 text-amber-700",
  placeholder: "border-slate-300 bg-slate-100 text-slate-600"
};

export function DataStatusBadge({ status }: DataStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em]",
        statusStyles[status]
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
