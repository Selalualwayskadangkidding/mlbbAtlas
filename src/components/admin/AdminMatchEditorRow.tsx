import Image from "next/image";

import type {
  Match,
  MatchStatus,
  Team,
  VerifiedDataStatus
} from "@/types/regions";

interface AdminMatchEditorRowProps {
  match: Match;
  teams: Team[];
  onMatchChange: (match: Match) => void;
}

const matchStatuses: MatchStatus[] = ["upcoming", "live", "finished"];
const dataStatuses: VerifiedDataStatus[] = [
  "verified",
  "partial",
  "placeholder"
];

function getTeam(teams: Team[], slug: string) {
  const team = teams.find((item) => item.slug === slug);

  if (!team) {
    throw new Error(`Missing team for slug: ${slug}`);
  }

  return team;
}

function parseScore(value: string) {
  if (value === "") {
    return null;
  }

  return Number(value);
}

export function AdminMatchEditorRow({
  match,
  teams,
  onMatchChange
}: AdminMatchEditorRowProps) {
  const teamA = getTeam(teams, match.teamA);
  const teamB = getTeam(teams, match.teamB);

  return (
    <tr>
      <td className="border-b border-slate-200 py-4 pr-4 align-middle">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            {match.date}
          </p>
          <p className="mt-1 text-sm text-slate-600">{match.time}</p>
        </div>
      </td>
      <td className="border-b border-slate-200 py-4 pr-4 align-middle">
        <div className="flex items-center gap-3">
          <Image
            src={teamA.logoSrc}
            alt={`${teamA.name} logo`}
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="font-semibold text-slate-950">{teamA.name}</span>
        </div>
      </td>
      <td className="border-b border-slate-200 py-4 pr-4 align-middle">
        <input
          type="number"
          min="0"
          max="2"
          value={match.scoreA ?? ""}
          onChange={(event) =>
            onMatchChange({
              ...match,
              scoreA: parseScore(event.target.value)
            })
          }
          className="w-20 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-950 outline-none focus:border-slate-500"
        />
      </td>
      <td className="border-b border-slate-200 py-4 pr-4 align-middle">
        <input
          type="number"
          min="0"
          max="2"
          value={match.scoreB ?? ""}
          onChange={(event) =>
            onMatchChange({
              ...match,
              scoreB: parseScore(event.target.value)
            })
          }
          className="w-20 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-950 outline-none focus:border-slate-500"
        />
      </td>
      <td className="border-b border-slate-200 py-4 pr-4 align-middle">
        <div className="flex items-center gap-3">
          <Image
            src={teamB.logoSrc}
            alt={`${teamB.name} logo`}
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="font-semibold text-slate-950">{teamB.name}</span>
        </div>
      </td>
      <td className="border-b border-slate-200 py-4 pr-4 align-middle">
        <select
          value={match.status}
          onChange={(event) =>
            onMatchChange({
              ...match,
              status: event.target.value as MatchStatus
            })
          }
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-950 outline-none focus:border-slate-500"
        >
          {matchStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </td>
      <td className="border-b border-slate-200 py-4 align-middle">
        <select
          value={match.verifiedDataStatus}
          onChange={(event) =>
            onMatchChange({
              ...match,
              verifiedDataStatus: event.target.value as VerifiedDataStatus
            })
          }
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-950 outline-none focus:border-slate-500"
        >
          {dataStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
}
