"use client";

import { useMemo, useState } from "react";

import { CurrentStandings } from "@/components/regions/CurrentStandings";
import { CurrentWeekMatches } from "@/components/regions/CurrentWeekMatches";
import { cn } from "@/lib/utils/cn";
import type {
  Match,
  Standing,
  StandingViewMode,
  StandingsSnapshot,
  Team
} from "@/types/regions";

interface ScheduleDashboardProps {
  teams: Team[];
  currentWeek: number;
  currentStandings: Standing[];
  standingsSnapshots: StandingsSnapshot[];
  matchesByWeek: Record<number, Match[]>;
}

export function ScheduleDashboard({
  teams,
  currentWeek,
  currentStandings,
  standingsSnapshots,
  matchesByWeek
}: ScheduleDashboardProps) {
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const [standingViewMode, setStandingViewMode] =
    useState<StandingViewMode>("current");

  const availableWeeks = useMemo(
    () => Object.keys(matchesByWeek).map(Number).sort((a, b) => a - b),
    [matchesByWeek]
  );
  const selectedMatches = matchesByWeek[selectedWeek] ?? [];
  const selectedSnapshot = standingsSnapshots.find(
    (snapshot) => snapshot.week === selectedWeek
  );
  const displayedStandings =
    standingViewMode === "current"
      ? currentStandings
      : selectedSnapshot?.standings ?? currentStandings;

  return (
    <>
      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft sm:p-7">
        <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-wide text-slate-950">
              Schedule Timeline
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Select a week to update the match list and review standings
              snapshots.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Latest Table", value: "current" },
              { label: "Table After Selected Week", value: "after-selected-week" }
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  setStandingViewMode(option.value as StandingViewMode)
                }
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition",
                  standingViewMode === option.value
                    ? "border-atlas-accent bg-atlas-accent text-white"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:border-atlas-accent hover:text-slate-950"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative overflow-x-auto pb-2">
          <div className="absolute left-8 right-8 top-[50px] h-px bg-slate-200" />
          <div className="relative grid min-w-[960px] grid-cols-9 gap-4">
            {availableWeeks.map((week) => {
              const isSelected = selectedWeek === week;
              const isCurrent = week === currentWeek;

              return (
                <button
                  key={week}
                  type="button"
                  onClick={() => setSelectedWeek(week)}
                  className="group flex min-h-[88px] flex-col items-center justify-start gap-3 text-center"
                >
                  <span
                    className={cn(
                      "text-sm font-semibold transition",
                      isSelected
                        ? "text-red-300"
                        : "text-slate-600 group-hover:text-slate-950"
                    )}
                  >
                    {isCurrent ? "Current Week" : `Week ${week}`}
                  </span>
                  <span
                    className={cn(
                      "relative z-10 grid h-4 w-4 place-items-center rounded-full border transition",
                      isSelected
                        ? "border-red-300 bg-red-500 shadow-[0_0_0_6px_rgba(239,68,68,0.12)]"
                        : "border-slate-300 bg-white group-hover:border-atlas-accent"
                    )}
                  />
                  <span
                    className={cn(
                      "text-xs uppercase tracking-[0.14em]",
                      isSelected ? "text-red-500" : "text-slate-500"
                    )}
                  >
                    {matchesByWeek[week]?.length ?? 0} matches
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <CurrentWeekMatches
        matches={selectedMatches}
        teams={teams}
        title={`Week ${selectedWeek} Matches`}
      />
      <CurrentStandings
        standings={displayedStandings}
        teams={teams}
        title={
          standingViewMode === "current"
            ? "Current Standings"
            : `Standings After Week ${selectedWeek}`
        }
        description={
          standingViewMode === "current"
            ? "Live table based on the latest mock standings."
            : "Snapshot table based on results up to the selected week."
        }
      />
    </>
  );
}
