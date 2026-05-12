interface QuickStatsProps {
  totalTeams: number;
  currentWeek: string;
  matchesPlayed: number;
  currentLeader: string;
}

export function QuickStats({
  totalTeams,
  currentWeek,
  matchesPlayed,
  currentLeader
}: QuickStatsProps) {
  const stats = [
    { label: "Total Teams", value: totalTeams.toString() },
    { label: "Current Week", value: currentWeek },
    { label: "Matches Played", value: matchesPlayed.toString() },
    { label: "Current Leader", value: currentLeader }
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {stat.label}
          </p>
          <p className="mt-3 text-2xl font-bold text-slate-950">{stat.value}</p>
        </article>
      ))}
    </section>
  );
}
