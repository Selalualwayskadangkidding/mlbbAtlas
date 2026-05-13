interface DevValidationSummaryProps {
  validationIssues: number;
  sourceLabel: string;
}

export function DevValidationSummary({
  validationIssues,
  sourceLabel
}: DevValidationSummaryProps) {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-4 text-sm text-slate-600">
      <p className="font-bold text-slate-950">Development data validation</p>
      <p className="mt-1">
        Status: {validationIssues === 0 ? "passing" : "needs review"} · Issues:{" "}
        {validationIssues} · Source: {sourceLabel}
      </p>
    </section>
  );
}
