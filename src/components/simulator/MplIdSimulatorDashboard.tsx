"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

import {
  calculateRankMovement,
  calculateSimulatedStandings
} from "@/lib/simulator";
import { cn } from "@/lib/utils/cn";
import type {
  RankMovement,
  SimulatedResultOption
} from "@/lib/simulator";
import type { Match, Standing, Team } from "@/types/regions";

interface MplIdSimulatorDashboardProps {
  teams: Team[];
  matches: Match[];
  currentWeek: number;
  originalStandings: Standing[];
}

type SimulatorStage = number | "playoff";

const resultOptions: SimulatedResultOption[] = [
  "team-a-2-0",
  "team-a-2-1",
  "team-b-2-1",
  "team-b-2-0"
];

const teamAccentColors: Record<string, string> = {
  onic: "#FFD700",
  "dewa-united": "#B68A2B",
  evos: "#003366",
  "alter-ego": "#8B0000",
  "team-liquid-id": "#0D2240",
  "geek-fam": "#C1121F",
  "bigetron-vitality": "#FF0000",
  navi: "#FFF200",
  "rrq-hoshi": "#FF8C00"
};

function getTeam(teams: Team[], slug: string) {
  const team = teams.find((item) => item.slug === slug);

  if (!team) {
    throw new Error(`Missing team for slug: ${slug}`);
  }

  return team;
}

function getResultLabel(
  option: SimulatedResultOption,
  teamA: Team,
  teamB: Team
) {
  const labels: Record<SimulatedResultOption, string> = {
    "team-a-2-0": `${teamA.shortName} 2-0 ${teamB.shortName}`,
    "team-a-2-1": `${teamA.shortName} 2-1 ${teamB.shortName}`,
    "team-b-2-1": `${teamB.shortName} 2-1 ${teamA.shortName}`,
    "team-b-2-0": `${teamB.shortName} 2-0 ${teamA.shortName}`
  };

  return labels[option];
}

function getMovementLabel(movement: RankMovement) {
  if (movement.direction === "up") {
    return `Up ${movement.delta}`;
  }

  if (movement.direction === "down") {
    return `Down ${Math.abs(movement.delta)}`;
  }

  return "Same";
}

function getMovementClass(movement: RankMovement) {
  if (movement.direction === "up") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (movement.direction === "down") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-500";
}

function formatScore(match: Match) {
  if (match.scoreA === null || match.scoreB === null) {
    return "vs";
  }

  return `${match.scoreA} - ${match.scoreB}`;
}

function getMatchesByWeek(matches: Match[]) {
  return matches.reduce<Record<number, Match[]>>((weeks, match) => {
    return {
      ...weeks,
      [match.week]: [...(weeks[match.week] ?? []), match]
    };
  }, {});
}

function getSameRankMovement(standings: Standing[]): Record<string, RankMovement> {
  return standings.reduce<Record<string, RankMovement>>((movements, standing) => {
    return {
      ...movements,
      [standing.teamSlug]: {
        direction: "same",
        delta: 0
      }
    };
  }, {});
}

function getTeamAccent(team: Team) {
  return teamAccentColors[team.slug] ?? "#334155";
}

function getVersusBackground(teamA: Team, teamB: Team): CSSProperties {
  return {
    background: `
      linear-gradient(105deg,
        ${getTeamAccent(teamA)} 0%,
        rgba(15, 23, 42, 0.96) 29%,
        rgba(2, 6, 23, 0.98) 50%,
        rgba(15, 23, 42, 0.96) 71%,
        ${getTeamAccent(teamB)} 100%
      )
    `
  };
}

function TeamBadge({ team }: { team: Team }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white p-2">
        <Image
          src={team.logoSrc}
          alt={`${team.name} logo`}
          width={36}
          height={36}
          className="h-full w-full object-contain"
        />
      </div>
      <span className="truncate font-bold text-slate-950">{team.name}</span>
    </div>
  );
}

function VersusBanner({
  teamA,
  teamB,
  centerText
}: {
  teamA: Team;
  teamB: Team;
  centerText: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 px-5 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.18)]"
      style={getVersusBackground(teamA, teamB)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_50%,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_84%_50%,rgba(255,255,255,0.16),transparent_24%)] opacity-60" />
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/10" />
      <div className="relative grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <div className="flex min-w-0 items-center gap-4">
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl border border-white/30 bg-white p-3 shadow-[0_10px_22px_rgba(0,0,0,0.35)]">
            <Image
              src={teamA.logoSrc}
              alt={`${teamA.name} logo`}
              width={64}
              height={64}
              className="h-full w-full object-contain"
            />
          </div>
          <h3 className="truncate text-xl font-black uppercase tracking-wide text-white md:text-2xl">
            {teamA.name}
          </h3>
        </div>

        <div className="justify-self-center text-4xl font-black italic tracking-wide text-white drop-shadow md:text-5xl">
          {centerText}
        </div>

        <div className="flex min-w-0 items-center justify-end gap-4">
          <h3 className="truncate text-right text-xl font-black uppercase tracking-wide text-white md:text-2xl">
            {teamB.name}
          </h3>
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl border border-white/30 bg-white p-3 shadow-[0_10px_22px_rgba(0,0,0,0.35)]">
            <Image
              src={teamB.logoSrc}
              alt={`${teamB.name} logo`}
              width={64}
              height={64}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MatchResultCard({
  match,
  teams
}: {
  match: Match;
  teams: Team[];
}) {
  const teamA = getTeam(teams, match.teamA);
  const teamB = getTeam(teams, match.teamB);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {match.format} - {match.date} - {match.time}
      </p>
      <div className="mt-3">
        <VersusBanner
          teamA={teamA}
          teamB={teamB}
          centerText={formatScore(match)}
        />
      </div>
    </article>
  );
}

interface BracketSlot {
  seed?: number;
  team?: Team;
  label?: string;
}

interface BracketMatchProps {
  title: string;
  format: "BO5" | "BO7";
  slots: [BracketSlot, BracketSlot];
  emphasis?: boolean;
  className?: string;
}

function SimulatedStandingsTable({
  teams,
  standings,
  movement
}: {
  teams: Team[];
  standings: Standing[];
  movement: Record<string, RankMovement>;
}) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft sm:p-7">
      <div className="mb-6">
        <h2 className="text-2xl font-black uppercase tracking-wide text-slate-950">
          Simulated Standings
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Table recalculated from every selected simulated result.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[840px] border-separate border-spacing-0 text-left">
          <thead>
            <tr className="text-xs uppercase tracking-[0.16em] text-slate-500">
              <th className="border-b border-slate-200 pb-3 pr-4">Rank</th>
              <th className="border-b border-slate-200 pb-3 pr-4">Move</th>
              <th className="border-b border-slate-200 pb-3 pr-4">Team</th>
              <th className="border-b border-slate-200 pb-3 pr-4">
                Match W-L
              </th>
              <th className="border-b border-slate-200 pb-3 pr-4">
                Game W-L
              </th>
              <th className="border-b border-slate-200 pb-3 pr-4">
                Net Game Win
              </th>
              <th className="border-b border-slate-200 pb-3">Points</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((standing) => {
              const team = getTeam(teams, standing.teamSlug);
              const teamMovement = movement[standing.teamSlug];
              const gameDifference =
                standing.gameDifference > 0
                  ? `+${standing.gameDifference}`
                  : standing.gameDifference.toString();

              return (
                <tr key={standing.teamSlug}>
                  <td className="border-b border-slate-200 py-4 pr-4 text-sm font-bold text-slate-950">
                    {standing.rank}
                  </td>
                  <td className="border-b border-slate-200 py-4 pr-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-3 py-1 text-xs font-bold",
                        getMovementClass(teamMovement)
                      )}
                    >
                      {getMovementLabel(teamMovement)}
                    </span>
                  </td>
                  <td className="border-b border-slate-200 py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-slate-50 p-1.5">
                        <Image
                          src={team.logoSrc}
                          alt={`${team.name} logo`}
                          width={32}
                          height={32}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <span className="font-semibold text-slate-950">
                        {team.name}
                      </span>
                    </div>
                  </td>
                  <td className="border-b border-slate-200 py-4 pr-4 text-slate-600">
                    {standing.matchRecord}
                  </td>
                  <td className="border-b border-slate-200 py-4 pr-4 text-slate-600">
                    {standing.gameRecord}
                  </td>
                  <td className="border-b border-slate-200 py-4 pr-4 font-medium text-slate-700">
                    {gameDifference}
                  </td>
                  <td className="border-b border-slate-200 py-4 font-medium text-slate-700">
                    {standing.matchPoints}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function BracketMatch({
  title,
  format,
  slots,
  emphasis = false,
  className
}: BracketMatchProps) {
  return (
    <article
      className={cn(
        "relative z-10 w-full overflow-hidden rounded-xl border bg-white shadow-[0_14px_35px_rgba(15,23,42,0.08)]",
        emphasis ? "border-slate-500" : "border-slate-300",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-slate-200 px-3 py-1.5">
        <h3 className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-500 sm:text-[10px]">
          {title}
        </h3>
        <span
          className={cn(
            "rounded-full border px-2 py-0.5 text-[10px] font-black",
            emphasis
              ? "border-slate-500 bg-slate-950 text-white"
              : "border-slate-200 bg-slate-50 text-slate-500"
          )}
        >
          {format}
        </span>
      </div>
      <div className="divide-y divide-slate-200">
        {slots.map((slot, index) => (
          <div
            key={`${title}-${index}`}
            className="grid grid-cols-[1fr_auto] items-center gap-3 px-3 py-2"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span className="w-5 text-[10px] font-black text-slate-400 sm:w-6">
                {slot.seed ? `#${slot.seed}` : ""}
              </span>
              {slot.team ? (
                <Image
                  src={slot.team.logoSrc}
                  alt={`${slot.team.name} logo`}
                  width={26}
                  height={26}
                  className="h-5 w-5 object-contain sm:h-6 sm:w-6"
                />
              ) : (
                <span className="grid h-6 w-6 place-items-center rounded border border-slate-200 bg-slate-50 text-[10px] font-black text-slate-400">
                  T
                </span>
              )}
              <span className="truncate text-xs font-black text-slate-950 sm:text-sm">
                {slot.team?.shortName ?? slot.label ?? "TBD"}
              </span>
            </div>
            <span className="grid h-6 w-7 place-items-center rounded border border-slate-200 bg-slate-50 text-xs font-black text-slate-500">
              0
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

function PlayoffBracketPreview({
  standings,
  teams,
  finalRegularSeasonWeek
}: {
  standings: Standing[];
  teams: Team[];
  finalRegularSeasonWeek: number;
}) {
  const seeds = standings.slice(0, 6).map((standing) => ({
    standing,
    team: getTeam(teams, standing.teamSlug)
  }));

  if (seeds.length < 6) {
    return null;
  }

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft sm:p-7">
      <div className="mb-6">
        <h2 className="text-2xl font-black uppercase tracking-wide text-slate-950">
          Playoff Projection
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Basic bracket preview after Week {finalRegularSeasonWeek} based on
          the current simulated standings. Full playoff logic can be expanded
          later.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
        <div className="grid grid-cols-[minmax(0,1fr)_32px_minmax(0,1fr)_32px_minmax(0,1fr)_32px_minmax(0,1fr)] grid-rows-[auto_126px_126px_64px_126px_126px] gap-x-2 gap-y-5">
          <div className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
            Upper Quarterfinals
          </div>
          <div className="col-start-3 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
            Upper Semifinals
          </div>
          <div className="col-start-5 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
            Finals
          </div>
          <div className="col-start-7 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
            Grand Final
          </div>

          <BracketMatch
            title="Match 1"
            format="BO5"
            slots={[
              { seed: 3, team: seeds[2].team },
              { seed: 6, team: seeds[5].team }
            ]}
            className="col-start-1 row-start-2 self-center"
          />
          <div className="col-start-2 row-start-2 self-center">
            <div className="h-px bg-slate-400" />
          </div>
          <BracketMatch
            title="Upper Semifinal 1"
            format="BO5"
            slots={[
              { seed: 1, team: seeds[0].team },
              { label: "Winner M1" }
            ]}
            className="col-start-3 row-start-2 self-center"
          />

          <BracketMatch
            title="Match 2"
            format="BO5"
            slots={[
              { seed: 4, team: seeds[3].team },
              { seed: 5, team: seeds[4].team }
            ]}
            className="col-start-1 row-start-3 self-center"
          />
          <div className="col-start-2 row-start-3 self-center">
            <div className="h-px bg-slate-400" />
          </div>
          <BracketMatch
            title="Upper Semifinal 2"
            format="BO5"
            slots={[
              { seed: 2, team: seeds[1].team },
              { label: "Winner M2" }
            ]}
            className="col-start-3 row-start-3 self-center"
          />

          <div className="col-start-4 row-start-2 row-span-2 grid items-center">
            <div className="relative h-full">
              <div className="absolute left-1/2 top-1/4 h-1/2 w-px bg-slate-400" />
              <div className="absolute left-0 top-1/4 h-px w-1/2 bg-slate-400" />
              <div className="absolute left-0 top-3/4 h-px w-1/2 bg-slate-400" />
              <div className="absolute left-1/2 top-1/2 h-px w-1/2 bg-slate-400" />
            </div>
          </div>
          <BracketMatch
            title="Upper Final"
            format="BO5"
            slots={[{ label: "Winner USF 1" }, { label: "Winner USF 2" }]}
            className="col-start-5 row-start-2 row-span-2 self-center"
          />

          <div className="col-start-1 row-start-5 text-[10px] font-black uppercase tracking-[0.16em] text-red-500">
            Lower Bracket
          </div>
          <BracketMatch
            title="Lower Round"
            format="BO5"
            slots={[{ label: "Loser M1/M2" }, { label: "Loser USF" }]}
            className="col-start-3 row-start-5 self-center"
          />
          <div className="col-start-4 row-start-5 self-center">
            <div className="h-px border-t border-dashed border-red-300" />
          </div>
          <BracketMatch
            title="Lower Final"
            format="BO5"
            slots={[{ label: "Lower Winner" }, { label: "Upper Drop" }]}
            className="col-start-5 row-start-5 self-center"
          />

          <div className="col-start-6 row-start-2 row-span-4 grid items-center">
            <div className="relative h-full">
              <div className="absolute left-1/2 top-[24%] h-[58%] w-px bg-slate-400" />
              <div className="absolute left-0 top-[24%] h-px w-1/2 bg-slate-400" />
              <div className="absolute left-0 top-[82%] h-px w-1/2 border-t border-dashed border-red-300" />
              <div className="absolute left-1/2 top-1/2 h-px w-1/2 bg-slate-400" />
            </div>
          </div>
          <BracketMatch
            title="Grand Final"
            format="BO7"
            slots={[{ label: "Upper Winner" }, { label: "Lower Winner" }]}
            emphasis
            className="col-start-7 row-start-2 row-span-4 self-center"
          />
        </div>
      </div>
    </section>
  );
}

export function MplIdSimulatorDashboard({
  teams,
  matches,
  currentWeek,
  originalStandings
}: MplIdSimulatorDashboardProps) {
  const [selectedResults, setSelectedResults] = useState<
    Record<string, SimulatedResultOption>
  >({});
  const [selectedStage, setSelectedStage] =
    useState<SimulatorStage>(currentWeek);

  const matchesByWeek = useMemo(() => getMatchesByWeek(matches), [matches]);
  const availableWeeks = useMemo(
    () => Object.keys(matchesByWeek).map(Number).sort((a, b) => a - b),
    [matchesByWeek]
  );
  const finalRegularSeasonWeek = availableWeeks[availableWeeks.length - 1];
  const selectedWeek =
    typeof selectedStage === "number" ? selectedStage : currentWeek;
  const selectedWeekMatches = matchesByWeek[selectedWeek] ?? [];
  const simulatedResults = useMemo(
    () =>
      Object.entries(selectedResults).map(([matchId, result]) => ({
        matchId,
        result
      })),
    [selectedResults]
  );
  const simulatedStandings = useMemo(() => {
    if (simulatedResults.length === 0) {
      return null;
    }

    return calculateSimulatedStandings(teams, matches, simulatedResults);
  }, [matches, simulatedResults, teams]);
  const displayedStandings = simulatedStandings ?? originalStandings;
  const displayedMovement = useMemo(() => {
    if (!simulatedStandings) {
      return getSameRankMovement(originalStandings);
    }

    return calculateRankMovement(originalStandings, simulatedStandings);
  }, [originalStandings, simulatedStandings]);
  const isPlayoffStage = selectedStage === "playoff";

  return (
    <>
      <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-wide text-slate-950">
              MPL ID Simulator
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Simulate Week 8 and Week 9 BO3 results, then preview the playoff
              bracket from the projected final table.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedResults({})}
            disabled={simulatedResults.length === 0}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-600 transition hover:border-atlas-accent hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reset Simulation
          </button>
        </div>

        <div className="relative mt-7 overflow-x-auto pb-2">
          <div className="absolute left-8 right-8 top-[50px] h-px bg-slate-200" />
          <div className="relative grid min-w-[1040px] grid-cols-10 gap-4">
            {availableWeeks.map((week) => {
              const isSelected = week === selectedStage;
              const isPastWeek = week < currentWeek;

              return (
                <button
                  key={week}
                  type="button"
                  onClick={() => setSelectedStage(week)}
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
                    Week {week}
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
                    {isPastWeek ? "Results" : "Simulate"}
                  </span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setSelectedStage("playoff")}
              className="group flex min-h-[88px] flex-col items-center justify-start gap-3 text-center"
            >
              <span
                className={cn(
                  "text-sm font-semibold transition",
                  isPlayoffStage
                    ? "text-red-300"
                    : "text-slate-600 group-hover:text-slate-950"
                )}
              >
                Playoff
              </span>
              <span
                className={cn(
                  "relative z-10 grid h-4 w-4 place-items-center rounded-full border transition",
                  isPlayoffStage
                    ? "border-red-300 bg-red-500 shadow-[0_0_0_6px_rgba(239,68,68,0.12)]"
                    : "border-slate-300 bg-white group-hover:border-atlas-accent"
                )}
              />
              <span
                className={cn(
                  "text-xs uppercase tracking-[0.14em]",
                  isPlayoffStage ? "text-red-500" : "text-slate-500"
                )}
              >
                Projection
              </span>
            </button>
          </div>
        </div>

        {!isPlayoffStage ? (
          <>
            <div className="mt-7 grid gap-4">
              {selectedWeekMatches.map((match) => {
                const teamA = getTeam(teams, match.teamA);
                const teamB = getTeam(teams, match.teamB);
                const canSimulate = match.week >= currentWeek;

                if (!canSimulate) {
                  return (
                    <MatchResultCard
                      key={match.id}
                      match={match}
                      teams={teams}
                    />
                  );
                }

                return (
                  <article
                    key={match.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {match.format} - {match.date} - {match.time}
                    </p>
                    <div className="mt-3">
                      <VersusBanner
                        teamA={teamA}
                        teamB={teamB}
                        centerText="VS"
                      />
                    </div>

                    <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                      {resultOptions.map((option) => {
                        const isSelected =
                          selectedResults[match.id] === option;

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() =>
                              setSelectedResults((currentResults) => ({
                                ...currentResults,
                                [match.id]: option
                              }))
                            }
                            className={cn(
                              "rounded-xl border px-4 py-3 text-sm font-bold transition",
                              isSelected
                                ? "border-atlas-accent bg-atlas-accent text-white"
                                : "border-slate-200 bg-white text-slate-700 hover:border-atlas-accent hover:text-slate-950"
                            )}
                          >
                            {getResultLabel(option, teamA, teamB)}
                          </button>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>

            {selectedWeek < currentWeek ? (
              <p className="mt-5 text-sm text-slate-500">
                Week {selectedWeek} is locked because its matches are already
                finished.
              </p>
            ) : null}
          </>
        ) : (
          <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
            Playoff projection uses the current simulated standings from Week{" "}
            {finalRegularSeasonWeek}.
          </div>
        )}
      </section>

      {!isPlayoffStage ? (
        <SimulatedStandingsTable
          teams={teams}
          standings={displayedStandings}
          movement={displayedMovement}
        />
      ) : null}

      {isPlayoffStage ? (
        <PlayoffBracketPreview
          standings={displayedStandings}
          teams={teams}
          finalRegularSeasonWeek={finalRegularSeasonWeek}
        />
      ) : null}
    </>
  );
}
