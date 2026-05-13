import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getMplIdTeams } from "@/services/regions/mpl-id";

interface TeamPageProps {
  params: {
    slug: string;
  };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const data = await getMplIdTeams();
  const team = data.teams.find((item) => item.slug === params.slug);

  if (!team) {
    notFound();
  }

  const standing = data.currentStandings.find(
    (item) => item.teamSlug === team.slug
  );

  return (
    <div className="flex w-full max-w-4xl flex-col gap-6">
      <Link
        href="/regions/mpl-id/teams"
        className="text-sm font-semibold text-slate-500 transition hover:text-slate-950"
      >
        Back to teams
      </Link>

      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="grid h-24 w-24 place-items-center rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <Image
              src={team.logoSrc}
              alt={`${team.name} logo`}
              width={88}
              height={88}
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-atlas-accent">
              Team Detail Placeholder
            </p>
            <h1 className="mt-3 text-4xl font-black uppercase tracking-wide text-slate-950">
              {team.name}
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              Overview, roster, recent matches, stats, and match results will be
              added here.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Current Rank
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              #{standing?.rank ?? "-"}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Match Record
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              {standing?.matchRecord ?? "-"}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Recent Form
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              {standing?.form.join("") ?? "-"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
