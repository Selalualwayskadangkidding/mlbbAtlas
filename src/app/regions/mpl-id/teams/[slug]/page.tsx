import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Header } from "@/components/layout/Header";
import { mplIdStandings, mplIdTeams } from "@/data/mock/mpl-id";

interface TeamPageProps {
  params: {
    slug: string;
  };
}

export default function TeamPage({ params }: TeamPageProps) {
  const team = mplIdTeams.find((item) => item.slug === params.slug);

  if (!team) {
    notFound();
  }

  const standing = mplIdStandings.find((item) => item.teamSlug === team.slug);

  return (
    <main className="min-h-screen bg-atlas-background text-atlas-primary">
      <Header />
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-5 py-10 sm:px-8 lg:px-10">
        <Link
          href="/regions/mpl-id"
          className="text-sm font-semibold text-atlas-secondary transition hover:text-white"
        >
          Back to MPL Indonesia
        </Link>

        <section className="rounded-[28px] border border-atlas-border/70 bg-atlas-surface/60 p-6 shadow-soft sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="grid h-24 w-24 place-items-center rounded-2xl border border-white/10 bg-atlas-background p-4">
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
              <h1 className="mt-3 text-4xl font-black uppercase tracking-wide text-white">
                {team.name}
              </h1>
              <p className="mt-3 text-sm text-atlas-secondary">
                Overview, roster, recent matches, stats, and match results will
                be added here.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-atlas-border bg-atlas-background/70 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-atlas-secondary">
                Current Rank
              </p>
              <p className="mt-2 text-2xl font-bold text-white">
                #{standing?.rank ?? "-"}
              </p>
            </div>
            <div className="rounded-2xl border border-atlas-border bg-atlas-background/70 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-atlas-secondary">
                Match Record
              </p>
              <p className="mt-2 text-2xl font-bold text-white">
                {standing?.matchRecord ?? "-"}
              </p>
            </div>
            <div className="rounded-2xl border border-atlas-border bg-atlas-background/70 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-atlas-secondary">
                Recent Form
              </p>
              <p className="mt-2 text-2xl font-bold text-white">
                {standing?.form.join("") ?? "-"}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
