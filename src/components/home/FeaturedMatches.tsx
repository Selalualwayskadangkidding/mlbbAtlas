import type { FeaturedMatch } from "@/types";

interface FeaturedMatchesProps {
  matches: FeaturedMatch[];
}

export function FeaturedMatches({ matches }: FeaturedMatchesProps) {
  return (
    <section className="scroll-mt-20" id="matches">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">
            Featured matches
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            High-interest series from active MPL weeks.
          </p>
        </div>
        <span className="hidden text-sm text-slate-500 sm:block">
          Times shown in local league context
        </span>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {matches.map((match) => (
          <article
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300"
            key={`${match.region}-${match.teamA}-${match.teamB}`}
          >
            <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
              <span>{match.region}</span>
              <span>{match.week}</span>
            </div>
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <p className="text-lg font-semibold text-slate-950">
                {match.teamA}
              </p>
              <span className="rounded border border-slate-200 px-2 py-1 text-xs text-slate-500">
                VS
              </span>
              <p className="text-right text-lg font-semibold text-slate-950">
                {match.teamB}
              </p>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-500">
              <span>{match.stage}</span>
              <span>
                {match.date} · {match.time}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
