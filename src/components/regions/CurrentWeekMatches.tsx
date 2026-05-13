import Image from "next/image";

import { DataStatusBadge } from "@/components/regions/DataStatusBadge";
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

  return `${match.scoreA} - ${match.scoreB}`;
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
  const matchesByDate = matches.reduce<Record<string, Match[]>>((groups, match) => {
    const dateMatches = groups[match.date] ?? [];

    return {
      ...groups,
      [match.date]: [...dateMatches, match]
    };
  }, {});

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft sm:p-7">
      <div className="mb-6">
        <h2 className="text-2xl font-black uppercase tracking-wide text-slate-950">
          {title}
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          {description}
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(matchesByDate).map(([date, dateMatches]) => (
          <div key={date}>
            <div className="mb-3 flex items-center gap-3">
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-700">
                {date}
              </h3>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {dateMatches.map((match) => {
                const teamA = getTeam(teams, match.teamA);
                const teamB = getTeam(teams, match.teamB);

                return (
                  <article
                    key={match.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-white"
                  >
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                            match.status === "finished"
                              ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                              : match.status === "live"
                                ? "border-red-300 bg-red-50 text-red-700"
                                : "border-blue-300 bg-blue-50 text-blue-700"
                          )}
                        >
                          {match.status}
                        </span>
                        <DataStatusBadge status={match.verifiedDataStatus} />
                      </div>
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                        <span>{match.format}</span>
                        <span>{match.time}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={teamA.logoSrc}
                          alt={`${teamA.name} logo`}
                          width={36}
                          height={36}
                          className="h-9 w-9 object-contain"
                        />
                        <p className="text-sm font-bold text-slate-950">
                          {teamA.name}
                        </p>
                      </div>
                      <p className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-center text-base font-black text-slate-950">
                        {formatScore(match)}
                      </p>
                      <div className="flex items-center justify-end gap-3 text-right">
                        <p className="text-sm font-bold text-slate-950">
                          {teamB.name}
                        </p>
                        <Image
                          src={teamB.logoSrc}
                          alt={`${teamB.name} logo`}
                          width={36}
                          height={36}
                          className="h-9 w-9 object-contain"
                        />
                      </div>
                    </div>
                    {match.verifiedDataStatus === "partial" ? (
                      <p className="mt-4 text-xs text-amber-700">
                        Partial data - used for standings calculation
                      </p>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
