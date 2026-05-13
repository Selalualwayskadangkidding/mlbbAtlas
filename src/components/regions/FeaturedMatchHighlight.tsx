import Image from "next/image";

import { cn } from "@/lib/utils/cn";
import type { Match, Team } from "@/types/regions";

interface FeaturedMatchHighlightProps {
  match: Match | undefined;
  teams: Team[];
}

function getTeam(teams: Team[], slug: string) {
  const team = teams.find((item) => item.slug === slug);

  if (!team) {
    throw new Error(`Missing team for slug: ${slug}`);
  }

  return team;
}

function formatScore(match: Match) {
  if (match.status === "finished") {
    return `${match.scoreA} - ${match.scoreB}`;
  }

  if (match.status === "live") {
    return "Live";
  }

  return "vs";
}

export function FeaturedMatchHighlight({
  match,
  teams
}: FeaturedMatchHighlightProps) {
  if (!match) {
    return null;
  }

  const teamA = getTeam(teams, match.teamA);
  const teamB = getTeam(teams, match.teamB);

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft sm:p-7">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-atlas-accent">
            Featured Match
          </p>
          <h2 className="mt-2 text-2xl font-black uppercase tracking-wide text-slate-950">
            Upcoming / Featured Highlight
          </h2>
        </div>
        <span
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide",
            match.status === "live"
              ? "border-red-400/30 bg-red-500/10 text-red-200"
              : "border-blue-400/30 bg-blue-500/10 text-blue-200"
          )}
        >
          {match.status}
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-center gap-3">
          <Image
            src={teamA.logoSrc}
            alt={`${teamA.name} logo`}
            width={56}
            height={56}
            className="h-14 w-14 object-contain"
          />
          <p className="text-lg font-bold text-slate-950">{teamA.name}</p>
        </div>
        <div className="text-center">
          <p className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-xl font-black text-slate-950">
            {formatScore(match)}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">
            {match.format}
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 text-right">
          <p className="text-lg font-bold text-slate-950">{teamB.name}</p>
          <Image
            src={teamB.logoSrc}
            alt={`${teamB.name} logo`}
            width={56}
            height={56}
            className="h-14 w-14 object-contain"
          />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-500">
        {match.date}, {match.time}
      </p>
    </section>
  );
}
