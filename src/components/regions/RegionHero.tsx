import Image from "next/image";

import type { Region, Season } from "@/types/regions";

interface RegionHeroProps {
  region: Region;
  season: Season;
  currentLeader: string;
  matchesPlayedLabel: string;
  nextMatchLabel: string;
}

export function RegionHero({
  region,
  season,
  currentLeader,
  matchesPlayedLabel,
  nextMatchLabel
}: RegionHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.1),transparent_34rem)]" />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="grid h-24 w-24 place-items-center rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:h-28 sm:w-28">
            <Image
              src={region.logoSrc}
              alt={`${region.name} logo`}
              width={96}
              height={96}
              priority
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-atlas-accent">
              {region.shortName}
            </p>
            <h1 className="mt-3 text-4xl font-black uppercase tracking-normal text-slate-950 sm:text-5xl">
              {region.name}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              {region.subtitle}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:w-72 lg:grid-cols-1">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Current season
            </p>
            <p className="mt-2 text-xl font-bold text-slate-950">{season.name}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Current week
            </p>
            <p className="mt-2 text-xl font-bold text-slate-950">
              Week {season.currentWeek}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Stage
            </p>
            <p className="mt-2 text-xl font-bold text-slate-950">{season.stage}</p>
          </div>
        </div>
      </div>
      <div className="relative mt-8 grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Current Leader
          </p>
          <p className="mt-2 font-bold text-slate-950">{currentLeader}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Matches Played
          </p>
          <p className="mt-2 font-bold text-slate-950">{matchesPlayedLabel}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Next Match
          </p>
          <p className="mt-2 font-bold text-slate-950">{nextMatchLabel}</p>
        </div>
      </div>
    </section>
  );
}
