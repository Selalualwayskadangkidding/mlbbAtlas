import Image from "next/image";

import { cn } from "@/lib/utils/cn";
import type { Standing, StandingStatus, Team } from "@/types/regions";

interface CurrentStandingsProps {
  standings: Standing[];
  teams: Team[];
  title?: string;
  description?: string;
}

const statusStyles: Record<StandingStatus, string> = {
  "upper-bracket-secured": "border-blue-300 bg-blue-50 text-blue-700",
  "playoff-secured": "border-emerald-300 bg-emerald-50 text-emerald-700",
  "outside-playoff-zone": "border-slate-300 bg-slate-100 text-slate-700",
  eliminated: "border-red-300 bg-red-50 text-red-700"
};

const statusLabels: Record<StandingStatus, string> = {
  "upper-bracket-secured": "Upper Bracket Secured",
  "playoff-secured": "Playoff Secured",
  "outside-playoff-zone": "Outside Playoff Zone",
  eliminated: "Eliminated"
};

function getTeam(teams: Team[], slug: string) {
  const team = teams.find((item) => item.slug === slug);

  if (!team) {
    throw new Error(`Missing team for slug: ${slug}`);
  }

  return team;
}

export function CurrentStandings({
  standings,
  teams,
  title = "Current Standings",
  description = "Ranking order for the selected standings view."
}: CurrentStandingsProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft sm:p-7">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-wide text-slate-950">
            {title}
          </h2>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
          <p className="mt-2 text-xs text-slate-500">
            Secured and eliminated statuses use a conservative max-points
            check. Teams without a guaranteed outcome remain Outside Playoff
            Zone.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {Object.entries(statusLabels).map(([status, label]) => (
            <span
              key={status}
              className={cn(
                "rounded-full border px-3 py-1",
                statusStyles[status as StandingStatus]
              )}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-separate border-spacing-0 text-left">
          <thead>
            <tr className="text-xs uppercase tracking-[0.16em] text-slate-500">
              <th className="border-b border-slate-200 pb-3 pr-4">Rank</th>
              <th className="border-b border-slate-200 pb-3 pr-4">Team</th>
              <th className="border-b border-slate-200 pb-3 pr-4">
                Match W-L
              </th>
              <th className="border-b border-slate-200 pb-3 pr-4">
                Game W-L
              </th>
              <th className="border-b border-slate-200 pb-3 pr-4">
                Net Game Win
              </th>
              <th className="border-b border-slate-200 pb-3 pr-4">Points</th>
              <th className="border-b border-slate-200 pb-3 pr-4">Form</th>
              <th className="border-b border-slate-200 pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((standing) => {
              const team = getTeam(teams, standing.teamSlug);
              const gameDifference =
                standing.gameDifference > 0
                  ? `+${standing.gameDifference}`
                  : standing.gameDifference.toString();

              return (
                <tr key={standing.teamSlug} className="group">
                  <td className="border-b border-slate-200 py-4 pr-4 text-sm font-bold text-slate-950">
                    {standing.rank}
                  </td>
                  <td className="border-b border-slate-200 py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-slate-50 p-1.5">
                        <Image
                          src={team.logoSrc}
                          alt={`${team.name} logo`}
                          width={32}
                          height={32}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <span className="font-semibold text-slate-950">
                        {team.name}
                      </span>
                    </div>
                  </td>
                  <td className="border-b border-slate-200 py-4 pr-4 text-slate-600">
                    {standing.matchRecord}
                  </td>
                  <td className="border-b border-slate-200 py-4 pr-4 text-slate-600">
                    {standing.gameRecord}
                  </td>
                  <td className="border-b border-slate-200 py-4 pr-4 font-medium text-slate-700">
                    {gameDifference}
                  </td>
                  <td className="border-b border-slate-200 py-4 pr-4 font-medium text-slate-700">
                    {standing.matchPoints}
                  </td>
                  <td className="border-b border-slate-200 py-4 pr-4">
                    <div className="flex gap-1">
                      {standing.form.map((result, index) => (
                        <span
                          key={`${standing.teamSlug}-${result}-${index}`}
                          className={cn(
                            "grid h-6 w-6 place-items-center rounded text-xs font-bold",
                            result === "W"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-700"
                          )}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="border-b border-slate-200 py-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-3 py-1 text-xs font-medium",
                        statusStyles[standing.status]
                      )}
                    >
                      {statusLabels[standing.status]}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
