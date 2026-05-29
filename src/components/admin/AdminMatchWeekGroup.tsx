import { AdminMatchEditorRow } from "@/components/admin/AdminMatchEditorRow";
import type { Match, Team } from "@/types/regions";

interface AdminMatchWeekGroupProps {
  week: number;
  matches: Match[];
  teams: Team[];
  onMatchChange: (match: Match) => void;
}

export function AdminMatchWeekGroup({
  week,
  matches,
  teams,
  onMatchChange
}: AdminMatchWeekGroupProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-lg font-black uppercase tracking-wide text-slate-950">
          Week {week}
        </h2>
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
          {matches.length} matches
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-separate border-spacing-0 text-left">
          <thead>
            <tr className="text-xs uppercase tracking-[0.16em] text-slate-500">
              <th className="border-b border-slate-200 pb-3 pr-4">Match</th>
              <th className="border-b border-slate-200 pb-3 pr-4">Team A</th>
              <th className="border-b border-slate-200 pb-3 pr-4">Score A</th>
              <th className="border-b border-slate-200 pb-3 pr-4">Score B</th>
              <th className="border-b border-slate-200 pb-3 pr-4">Team B</th>
              <th className="border-b border-slate-200 pb-3 pr-4">Status</th>
              <th className="border-b border-slate-200 pb-3">
                Data Status
              </th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <AdminMatchEditorRow
                key={match.id}
                match={match}
                teams={teams}
                onMatchChange={onMatchChange}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
