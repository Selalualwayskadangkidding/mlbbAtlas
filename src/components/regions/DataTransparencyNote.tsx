interface DataTransparencyNoteProps {
  hasPartialData: boolean;
}

export function DataTransparencyNote({
  hasPartialData
}: DataTransparencyNoteProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600 shadow-sm">
      <p>Standings calculated from verified internal MPL ID data.</p>
      {hasPartialData ? (
        <p className="mt-1">
          Some match rows are aggregate-derived until full schedule data is
          added.
        </p>
      ) : null}
    </section>
  );
}
