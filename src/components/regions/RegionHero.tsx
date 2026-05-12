import Image from "next/image";

import type { Region } from "@/types/regions";

interface RegionHeroProps {
  region: Region;
  currentLeader: string;
  matchesPlayedLabel: string;
  nextMatchLabel: string;
}

export function RegionHero({
  region,
  currentLeader,
  matchesPlayedLabel,
  nextMatchLabel
}: RegionHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-atlas-border/70 bg-atlas-surface/55 p-6 shadow-soft sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.14),transparent_34rem)]" />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="grid h-24 w-24 place-items-center rounded-2xl border border-white/10 bg-atlas-background/80 p-4 sm:h-28 sm:w-28">
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
            <h1 className="mt-3 text-4xl font-black uppercase tracking-normal text-white sm:text-5xl">
              {region.name}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-atlas-secondary sm:text-base">
              {region.subtitle}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:w-72 lg:grid-cols-1">
          <div className="rounded-2xl border border-atlas-border bg-atlas-background/65 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-atlas-secondary">
              Current season
            </p>
            <p className="mt-2 text-xl font-bold text-white">{region.season}</p>
          </div>
          <div className="rounded-2xl border border-atlas-border bg-atlas-background/65 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-atlas-secondary">
              Current week
            </p>
            <p className="mt-2 text-xl font-bold text-white">
              {region.currentWeek}
            </p>
          </div>
          <div className="rounded-2xl border border-atlas-border bg-atlas-background/65 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-atlas-secondary">
              Stage
            </p>
            <p className="mt-2 text-xl font-bold text-white">{region.stage}</p>
          </div>
        </div>
      </div>
      <div className="relative mt-8 grid gap-3 border-t border-atlas-border pt-6 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-atlas-secondary">
            Current Leader
          </p>
          <p className="mt-2 font-bold text-white">{currentLeader}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-atlas-secondary">
            Matches Played
          </p>
          <p className="mt-2 font-bold text-white">{matchesPlayedLabel}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-atlas-secondary">
            Next Match
          </p>
          <p className="mt-2 font-bold text-white">{nextMatchLabel}</p>
        </div>
      </div>
    </section>
  );
}
