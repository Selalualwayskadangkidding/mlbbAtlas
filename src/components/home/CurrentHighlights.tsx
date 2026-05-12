import type { Highlight } from "@/types";

interface CurrentHighlightsProps {
  highlights: Highlight[];
}

export function CurrentHighlights({ highlights }: CurrentHighlightsProps) {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-slate-950">
          Current highlights
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Snapshot metrics for the global MPL tracking view.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {highlights.map((highlight) => (
          <article
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            key={highlight.label}
          >
            <p className="text-sm text-slate-500">{highlight.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">
              {highlight.value}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              {highlight.detail}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
