import { getMplIdJourney } from "@/services/regions/mpl-id";

export default async function MplIdJourneyPage() {
  const data = await getMplIdJourney();

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft sm:p-7">
      <h1 className="text-2xl font-black uppercase tracking-wide text-slate-950">
        Journey
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Season history preview for MPL Indonesia.
      </p>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {data.seasons.map((season) => (
          <article
            key={season.season}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-atlas-accent">
              {season.season}
            </p>
            <h2 className="mt-3 text-xl font-bold text-slate-950">
              {season.champion}
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Runner-up: {season.runnerUp}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              FMVP Preview: {season.fmvp}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
