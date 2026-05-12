import { mplIdStandings, mplIdTeams } from "@/data/mock/mpl-id";

function getTeamName(slug: string) {
  return mplIdTeams.find((team) => team.slug === slug)?.name ?? slug;
}

export default function MplIdStatisticsPage() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft sm:p-7">
      <h1 className="text-2xl font-black uppercase tracking-wide text-slate-950">
        Statistics
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Team performance preview for MPL Indonesia mock data.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {mplIdStandings.slice(0, 6).map((standing) => (
          <article
            key={standing.teamSlug}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
          >
            <h2 className="font-bold text-slate-950">
              {getTeamName(standing.teamSlug)}
            </h2>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-slate-500">Win Rate</p>
                <p className="mt-1 font-bold text-slate-950">
                  {Math.round((standing.matchPoints / 12) * 100)}%
                </p>
              </div>
              <div>
                <p className="text-slate-500">Game Diff</p>
                <p className="mt-1 font-bold text-slate-950">
                  {standing.gameDifference > 0 ? "+" : ""}
                  {standing.gameDifference}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Streak</p>
                <p className="mt-1 font-bold text-slate-950">
                  {standing.form.slice(-3).join("")}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
