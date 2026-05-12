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
    <section className="rounded-[28px] border border-atlas-border/70 bg-atlas-surface/60 p-5 sm:p-7">
      <div className="mb-6">
        <h2 className="text-2xl font-black uppercase tracking-wide text-white">
          Teams
        </h2>
        <p className="mt-2 text-sm text-atlas-secondary">
          MPL Indonesia team list with current standing and match record.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => {
          const standing = getStanding(standings, team.slug);

          return (
            <article
              key={team.slug}
              className="flex items-center gap-4 rounded-2xl border border-atlas-border bg-atlas-background/70 p-4 transition hover:border-atlas-accent/60"
            >
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-white/10 bg-atlas-surface p-2">
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
                  className="truncate font-bold text-white transition hover:text-atlas-accent"
                >
                  {team.name}
                </Link>
                <p className="mt-1 text-sm text-atlas-secondary">
                  Rank #{standing.rank}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-200">
                  {standing.matchRecord}
                </p>
                <div className="mt-2 flex gap-1">
                  {standing.form.map((result, index) => (
                    <span
                      key={`${team.slug}-${result}-${index}`}
                      className="text-xs font-bold text-atlas-secondary"
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
