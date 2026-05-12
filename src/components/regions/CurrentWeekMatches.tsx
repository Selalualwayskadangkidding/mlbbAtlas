import Image from "next/image";

import { cn } from "@/lib/utils/cn";
import type { Match, Team } from "@/types/regions";

interface CurrentWeekMatchesProps {
  matches: Match[];
  teams: Team[];
  title?: string;
  description?: string;
}

function getTeam(teams: Team[], slug: string) {
  const team = teams.find((item) => item.slug === slug);

  if (!team) {
    throw new Error(`Missing team for slug: ${slug}`);
  }

  return team;
}

function formatScore(match: Match) {
  if (match.status === "upcoming") {
    return "vs";
  }

  if (match.status === "live") {
    return "live";
  }

  return `${match.teamAScore} - ${match.teamBScore}`;
}

const statusStyles: Record<Match["status"], string> = {
  finished: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
  live: "border-red-400/30 bg-red-500/10 text-red-200",
  upcoming: "border-blue-400/30 bg-blue-500/10 text-blue-200"
};

export function CurrentWeekMatches({
  matches,
  teams,
  title = "Week Matches",
  description = "Completed, live, and upcoming BO3 series for the selected week."
}: CurrentWeekMatchesProps) {
  return (
    <section className="rounded-[28px] border border-atlas-border/70 bg-atlas-surface/60 p-5 sm:p-7">
      <div className="mb-6">
        <h2 className="text-2xl font-black uppercase tracking-wide text-white">
          {title}
        </h2>
        <p className="mt-2 text-sm text-atlas-secondary">
          {description}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {matches.map((match) => {
          const teamA = getTeam(teams, match.teamASlug);
          const teamB = getTeam(teams, match.teamBSlug);

          return (
            <article
              key={match.id}
              className="rounded-2xl border border-atlas-border bg-atlas-background/70 p-5 transition hover:border-atlas-accent/60"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                    statusStyles[match.status]
                  )}
                >
                  {match.status}
                </span>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-atlas-secondary">
                  <span>{match.format}</span>
                  <span>{match.date}</span>
                  <span>{match.time}</span>
                </div>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={teamA.logoSrc}
                    alt={`${teamA.name} logo`}
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                  <p className="font-semibold text-white">{teamA.name}</p>
                </div>
                <p className="rounded-xl border border-atlas-border bg-atlas-surface px-4 py-2 text-center text-lg font-black text-white">
                  {formatScore(match)}
                </p>
                <div className="flex items-center justify-end gap-3 text-right">
                  <p className="font-semibold text-white">{teamB.name}</p>
                  <Image
                    src={teamB.logoSrc}
                    alt={`${teamB.name} logo`}
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
