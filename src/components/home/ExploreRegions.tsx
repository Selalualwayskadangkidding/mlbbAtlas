import Image from "next/image";

import { cn } from "@/lib/utils/cn";
import type { RegionSummary } from "@/types";

interface ExploreRegionsProps {
  regions: RegionSummary[];
}

export function ExploreRegions({ regions }: ExploreRegionsProps) {
  return (
    <section
      id="regions"
      className="relative z-20 scroll-mt-20 overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-soft backdrop-blur sm:p-7 lg:p-10"
    >


      <div className="relative z-10 mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-wide text-slate-950">
            Explore Regions
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-500">
            Follow every MPL league across Southeast Asia
          </p>
        </div>

        <a
          href="/regions/mpl-id"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-blue-600 transition-all duration-300 hover:border-blue-300 hover:bg-white"
        >
          Open MPL ID
          <span>-&gt;</span>
        </a>
      </div>

      <div className="relative z-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {regions.map((region) => (
          <a
            href={region.shortName === "ID" ? "/regions/mpl-id" : "#regions"}
            key={region.name}
            className={cn(
              "group relative overflow-hidden border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-6 pb-14 text-center shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-blue-200 [clip-path:polygon(0_0,100%_0,100%_84%,50%_100%,0_84%)]",
              region.accentClass
            )}
          >
            <div
              className={cn(
                "absolute inset-x-0 top-0 h-[2px] opacity-90",
                region.accentClass
              )}
            />
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_60%)]" />
            </div>

            <div className="relative z-10">
              <p
                className={cn(
                  "text-lg font-black uppercase tracking-[0.25em]",
                  region.textAccentClass
                )}
              >
                {region.shortName}
              </p>

              <div className="relative mx-auto mt-6 flex h-[112px] w-[112px] items-center justify-center overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                <div
                  className="absolute inset-0 opacity-70"
                  style={{
                    background: `linear-gradient(135deg, ${region.colors.join(", ")})`
                  }}
                />
                <div className="absolute inset-[1px] rounded-[23px] bg-white/72" />
                <span className="relative text-4xl font-black text-slate-950 transition duration-500 group-hover:scale-105">
                  {region.mark}
                </span>
              </div>

              <h3 className="mt-6 text-[1.1rem] font-bold text-slate-950">
                {region.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {region.status}
              </p>

              <div className="mt-5 flex items-center justify-center gap-2 text-sm">
                <span className="text-slate-500">#1</span>
                <span className="font-medium text-slate-700">
                  {region.leader}
                </span>
              </div>

              <div className="mt-4 text-sm font-bold tracking-wide text-slate-950">
                {region.record}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
              <div className="absolute inset-0 border border-blue-200/80 [clip-path:polygon(0_0,100%_0,100%_84%,50%_100%,0_84%)]" />
            </div>
          </a>
        ))}
      </div>

      <p className="relative z-10 mt-10 text-center text-sm text-slate-500">
        More regions, more battles, one competitive ecosystem.
      </p>
    </section>
  );
}
