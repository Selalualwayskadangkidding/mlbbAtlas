import { mplIdMatchesByWeek, mplIdTeams } from "@/data/mock/mpl-id";

function getTeamName(slug: string) {
  return mplIdTeams.find((team) => team.slug === slug)?.name ?? slug;
}

export default function MplIdSimulatorPage() {
  const futureMatches = mplIdMatchesByWeek[7].filter(
    (match) => match.status !== "finished"
  );

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft sm:p-7">
      <h1 className="text-2xl font-black uppercase tracking-wide text-slate-950">
        Playoff Simulator
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Placeholder structure for match predictions and future standings
        simulation.
      </p>
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-4">
          {futureMatches.map((match) => (
            <article
              key={match.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <p className="text-sm text-slate-500">
                {match.date}, {match.time}
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-950">
                {getTeamName(match.teamASlug)} vs {getTeamName(match.teamBSlug)}
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
                  Team A Wins
                </button>
                <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
                  Team B Wins
                </button>
              </div>
            </article>
          ))}
        </div>
        <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="font-bold text-slate-950">Future Standings</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            This area will show derived standings once prediction state and
            ranking logic are connected.
          </p>
        </aside>
      </div>
    </section>
  );
}
