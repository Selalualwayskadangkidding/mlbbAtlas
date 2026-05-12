"use client";

import { useMemo, useState } from "react";

import { CurrentStandings } from "@/components/regions/CurrentStandings";
import { CurrentWeekMatches } from "@/components/regions/CurrentWeekMatches";
import { QuickStats } from "@/components/regions/QuickStats";
import { RegionHero } from "@/components/regions/RegionHero";
import { TeamsSection } from "@/components/regions/TeamsSection";
import { cn } from "@/lib/utils/cn";
import type {
  Match,
  Region,
  Standing,
  StandingViewMode,
  StandingsSnapshot,
  Team
} from "@/types/regions";

interface MplIdDashboardProps {
  region: Region;
  teams: Team[];
  currentStandings: Standing[];
  standingsSnapshots: StandingsSnapshot[];
  matchesByWeek: Record<number, Match[]>;
  seasonMatchCount: number;
  matchesPlayedCount: number;
}

function getTeamName(teams: Team[], slug: string) {
  return teams.find((team) => team.slug === slug)?.name ?? slug;
}

function getCompactTeamName(teams: Team[], slug: string) {
  const name = getTeamName(teams, slug);

  return name
    .replace(" Esports", "")
    .replace(" Hoshi", "")
    .replace(" Glory", "")
    .replace(" By Vit", "")
    .replace("Team Liquid ID", "TLID");
}

function formatMatchLabel(match: Match, teams: Team[]) {
  return `${getCompactTeamName(teams, match.teamASlug)} vs ${getCompactTeamName(
    teams,
    match.teamBSlug
  )}`;
}

function formatResult(match: Match, teams: Team[]) {
  return `${getCompactTeamName(teams, match.teamASlug)} ${match.teamAScore} - ${
    match.teamBScore
  } ${getCompactTeamName(teams, match.teamBSlug)}`;
}

export function MplIdDashboard({
  region,
  teams,
  currentStandings,
  standingsSnapshots,
  matchesByWeek,
  seasonMatchCount,
  matchesPlayedCount
}: MplIdDashboardProps) {
  const currentWeek = Number(region.currentWeek.replace("Week ", ""));
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
  const leaderStanding = currentStandings.find((standing) => standing.rank === 1);
  const currentLeader = getCompactTeamName(
    teams,
    leaderStanding?.teamSlug ?? "TBD"
  );
  const nextMatch =
    matchesByWeek[currentWeek]?.find((match) => match.status === "live") ??
    matchesByWeek[currentWeek]?.find((match) => match.status === "upcoming");
  const recentResults = Object.values(matchesByWeek)
    .flat()
    .filter((match) => match.status === "finished")
    .slice(-3)
    .reverse();

  return (
    <>
      <RegionHero
        region={region}
        currentLeader={currentLeader}
        matchesPlayedLabel={`${matchesPlayedCount}/${seasonMatchCount}`}
        nextMatchLabel={nextMatch ? formatMatchLabel(nextMatch, teams) : "TBD"}
      />

      <QuickStats
        totalTeams={teams.length}
        currentWeek={region.currentWeek}
        matchesPlayed={matchesPlayedCount}
        currentLeader={currentLeader}
      />

      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-[28px] border border-atlas-border/70 bg-atlas-surface/60 p-5 sm:p-7">
          <div className="mb-5">
            <h2 className="text-2xl font-black uppercase tracking-wide text-white">
              Week Selector
            </h2>
            <p className="mt-2 text-sm text-atlas-secondary">
              Change the selected week to review schedule and weekly standings
              snapshots.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableWeeks.map((week) => (
              <button
                key={week}
                type="button"
                onClick={() => setSelectedWeek(week)}
                className={cn(
                  "rounded-xl border px-4 py-2 text-sm font-semibold transition",
                  selectedWeek === week
                    ? "border-atlas-accent bg-atlas-accent text-white"
                    : "border-atlas-border bg-atlas-background text-atlas-secondary hover:border-atlas-accent hover:text-white"
                )}
              >
                {week === currentWeek ? "Current Week" : `Week ${week}`}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-atlas-border/70 bg-atlas-surface/60 p-5 sm:p-7">
          <div className="mb-5">
            <h2 className="text-2xl font-black uppercase tracking-wide text-white">
              Standing View
            </h2>
            <p className="mt-2 text-sm text-atlas-secondary">
              Switch between the live table and the selected week snapshot.
            </p>
          </div>
          <div className="grid gap-2">
            {[
              { label: "Current Standing", value: "current" },
              {
                label: "After Selected Week",
                value: "after-selected-week"
              }
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  setStandingViewMode(option.value as StandingViewMode)
                }
                className={cn(
                  "rounded-xl border px-4 py-3 text-left text-sm font-semibold transition",
                  standingViewMode === option.value
                    ? "border-atlas-accent bg-blue-500/10 text-blue-200"
                    : "border-atlas-border bg-atlas-background text-atlas-secondary hover:border-atlas-accent hover:text-white"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>

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
            : "Snapshot table for the selected week. No recalculation yet."
        }
      />

      <CurrentWeekMatches
        matches={selectedMatches}
        teams={teams}
        title={`Week ${selectedWeek} Matches`}
      />

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <UpcomingMatchHighlight match={nextMatch} teams={teams} />
        <RecentResults matches={recentResults} teams={teams} />
      </section>

      <TeamsSection teams={teams} standings={currentStandings} />

      <section className="grid gap-4 lg:grid-cols-3">
        <PreviewCard
          title="Statistics Preview"
          items={[
            "Highest Win Rate: ONIC",
            "Best Game Diff: ONIC +15",
            "Most Improved: EVOS",
            "Longest Win Streak: TLID"
          ]}
        />
        <PreviewCard
          title="Journey Preview"
          items={[
            "Latest Champion: Team Liquid ID",
            "Previous Season: ONIC Esports",
            "Most Titles: RRQ / ONIC"
          ]}
        />
        <SimulatorEntry />
      </section>
    </>
  );
}

interface MatchPreviewProps {
  match: Match | undefined;
  teams: Team[];
}

function UpcomingMatchHighlight({ match, teams }: MatchPreviewProps) {
  return (
    <article className="rounded-[28px] border border-atlas-border/70 bg-atlas-surface/60 p-5 sm:p-7">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-atlas-accent">
        Next Match
      </p>
      <h2 className="mt-3 text-2xl font-black uppercase tracking-wide text-white">
        {match ? formatMatchLabel(match, teams) : "TBD"}
      </h2>
      <p className="mt-3 text-sm text-atlas-secondary">
        {match ? `${match.date}, ${match.time} - ${match.format}` : "No match"}
      </p>
    </article>
  );
}

interface RecentResultsProps {
  matches: Match[];
  teams: Team[];
}

function RecentResults({ matches, teams }: RecentResultsProps) {
  return (
    <article className="rounded-[28px] border border-atlas-border/70 bg-atlas-surface/60 p-5 sm:p-7">
      <h2 className="text-2xl font-black uppercase tracking-wide text-white">
        Recent Results
      </h2>
      <div className="mt-5 space-y-3">
        {matches.map((match) => (
          <div
            key={match.id}
            className="flex items-center justify-between rounded-2xl border border-atlas-border bg-atlas-background/70 px-4 py-3 text-sm"
          >
            <span className="font-semibold text-white">
              {formatResult(match, teams)}
            </span>
            <span className="text-atlas-secondary">{match.date}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

interface PreviewCardProps {
  title: string;
  items: string[];
}

function PreviewCard({ title, items }: PreviewCardProps) {
  return (
    <article className="rounded-[28px] border border-atlas-border/70 bg-atlas-surface/60 p-5 sm:p-7">
      <h2 className="text-xl font-black uppercase tracking-wide text-white">
        {title}
      </h2>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <p key={item} className="text-sm text-atlas-secondary">
            {item}
          </p>
        ))}
      </div>
    </article>
  );
}

function SimulatorEntry() {
  return (
    <article className="rounded-[28px] border border-atlas-border/70 bg-atlas-surface/60 p-5 sm:p-7">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-atlas-accent">
        Playoff Simulator
      </p>
      <h2 className="mt-3 text-xl font-black uppercase tracking-wide text-white">
        Test Match Results
      </h2>
      <p className="mt-3 text-sm leading-6 text-atlas-secondary">
        Preview how standings could change when future match results are
        selected.
      </p>
      <a
        href="#"
        className="mt-5 inline-flex rounded-xl border border-atlas-accent/60 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200"
      >
        Open Simulator
      </a>
    </article>
  );
}
