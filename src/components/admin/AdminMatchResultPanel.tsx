"use client";

import { useMemo, useState } from "react";

import { AdminMatchWeekGroup } from "@/components/admin/AdminMatchWeekGroup";
import type { Match, Team } from "@/types/regions";

interface AdminMatchResultPanelProps {
  matches: Match[];
  teams: Team[];
}

function cloneMatches(matches: Match[]) {
  return matches.map((match) => ({ ...match }));
}

function groupMatchesByWeek(matches: Match[]) {
  return matches.reduce<Record<number, Match[]>>((weeks, match) => {
    return {
      ...weeks,
      [match.week]: [...(weeks[match.week] ?? []), match]
    };
  }, {});
}

export function AdminMatchResultPanel({
  matches,
  teams
}: AdminMatchResultPanelProps) {
  const [draftMatches, setDraftMatches] = useState(() => cloneMatches(matches));
  const [message, setMessage] = useState<string | null>(null);

  const matchesByWeek = useMemo(
    () => groupMatchesByWeek(draftMatches),
    [draftMatches]
  );
  const weeks = useMemo(
    () => Object.keys(matchesByWeek).map(Number).sort((a, b) => a - b),
    [matchesByWeek]
  );

  function updateMatch(updatedMatch: Match) {
    setDraftMatches((currentMatches) =>
      currentMatches.map((match) =>
        match.id === updatedMatch.id ? updatedMatch : match
      )
    );
    setMessage(null);
  }

  function handleSave() {
    setMessage(
      "Persistence is not configured yet. Changes are local draft only."
    );
  }

  function handleReset() {
    setDraftMatches(cloneMatches(matches));
    setMessage("Draft changes reset to the original loaded data.");
  }

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft sm:p-7">
      <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <strong className="font-black">Internal admin draft.</strong> Changes
        are local only until database persistence is configured. Standings are
        never edited directly.
      </div>

      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wide text-slate-950">
            MPL ID Match Result Admin
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Edit match result drafts only. Standings remain derived from match
            data through the ranking engine.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-600 transition hover:border-slate-400 hover:text-slate-950"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-full border border-slate-950 bg-slate-950 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-slate-800"
          >
            Save Draft
          </button>
        </div>
      </div>

      {message ? (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700">
          {message}
        </div>
      ) : null}

      <div className="space-y-6">
        {weeks.map((week) => (
          <AdminMatchWeekGroup
            key={week}
            week={week}
            matches={matchesByWeek[week] ?? []}
            teams={teams}
            onMatchChange={updateMatch}
          />
        ))}
      </div>
    </section>
  );
}
