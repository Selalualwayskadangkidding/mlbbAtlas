import Image from "next/image";
import Link from "next/link";

import type { Standing, Team } from "@/types/regions";

interface TeamsSectionProps {
  teams: Team[];
  standings: Standing[];
}

function getStanding(standings: Standing[], slug: string) {
  const standing = standings.find((item) => item.teamSlug === slug);

  if (!standing) {
    throw new Error(`Missing standing for slug: ${slug}`);
  }

  return standing;
}

export function TeamsSection({ teams, standings }: TeamsSectionProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft sm:p-7">
      <div className="mb-6">
        <h2 className="text-2xl font-black uppercase tracking-wide text-slate-950">
          Teams
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          MPL Indonesia team list with current standing and match record.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => {
          const standing = getStanding(standings, team.slug);

          return (
            <article
              key={team.slug}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-white"
            >
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-white p-2">
                <Image
                  src={team.logoSrc}
                  alt={`${team.name} logo`}
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <Link
                  href={`/regions/mpl-id/teams/${team.slug}`}
                  className="truncate font-bold text-slate-950 transition hover:text-atlas-accent"
                >
                  {team.name}
                </Link>
                <p className="mt-1 text-sm text-slate-500">
                  Rank #{standing.rank}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-700">
                  {standing.matchRecord}
                </p>
                <div className="mt-2 flex gap-1">
                  {standing.form.map((result, index) => (
                    <span
                      key={`${team.slug}-${result}-${index}`}
                      className="text-xs font-bold text-slate-500"
                    >
                      {result}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
