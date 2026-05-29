"use client";

import { useMemo, useState } from "react";

import { AdminMatchWeekGroup } from "@/components/admin/AdminMatchWeekGroup";
import type { Match, Team } from "@/types/regions";

interface AdminMatchResultPanelProps {
  matches: Match[];
  teams: Team[];
  persistenceConfigured: boolean;
  source: "supabase" | "local-fallback";
}

interface AdminMatchesApiData {
  matches: Match[];
  persistenceConfigured: boolean;
  source: "supabase" | "local-fallback";
}

interface ApiResult<T> {
  success: boolean;
  data: T | null;
  message: string;
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
  teams,
  persistenceConfigured,
  source
}: AdminMatchResultPanelProps) {
  const [draftMatches, setDraftMatches] = useState(() => cloneMatches(matches));
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

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

  async function handleSave() {
    if (!persistenceConfigured) {
      setMessage("Persistence is not configured yet. Changes are local draft only.");
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      for (const match of draftMatches) {
        const response = await fetch(
          `/api/admin/matches/${encodeURIComponent(match.id)}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              scoreA: match.scoreA,
              scoreB: match.scoreB,
              status: match.status,
              verifiedDataStatus: match.verifiedDataStatus
            })
          }
        );
        const result = (await response.json()) as ApiResult<Match>;

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to save match result.");
        }
      }

      setMessage("Match result changes saved to Supabase.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to save match results."
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleReset() {
    setIsResetting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/matches", {
        method: "GET"
      });
      const result = (await response.json()) as ApiResult<AdminMatchesApiData>;

      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.message || "Failed to reload matches.");
      }

      setDraftMatches(cloneMatches(result.data.matches));
      setMessage("Draft changes reset to the latest loaded data.");
    } catch (error) {
      setDraftMatches(cloneMatches(matches));
      setMessage(
        error instanceof Error
          ? error.message
          : "Reset failed. Restored initial loaded data."
      );
    } finally {
      setIsResetting(false);
    }
  }

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft sm:p-7">
      <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <strong className="font-black">Internal admin panel.</strong> Admin
        updates match results only. Standings are never edited directly.
        {!persistenceConfigured ? (
          <span className="mt-2 block font-semibold">
            Persistence is not configured yet. Changes are local draft only.
          </span>
        ) : (
          <span className="mt-2 block font-semibold">
            Persistence source: {source === "supabase" ? "Supabase" : "local fallback until first save"}.
          </span>
        )}
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
            disabled={isSaving || isResetting}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-600 transition hover:border-slate-400 hover:text-slate-950"
          >
            {isResetting ? "Resetting" : "Reset"}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || isResetting}
            className="rounded-full border border-slate-950 bg-slate-950 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-slate-800"
          >
            {isSaving ? "Saving" : "Save"}
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
