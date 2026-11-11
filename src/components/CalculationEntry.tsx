import { formatArea } from "@/lib/areaUtils";

type Props = {
  entries: { name: string; area: number }[];
  onClear: () => void;
};

export default function CalculationEntry({ entries, onClear }: Props) {
  const lastTenEntries = entries.slice(-10);

  return (
    <aside className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden lg:sticky lg:top-24">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <rect width="16" height="20" x="4" y="2" rx="2" />
              <line x1="8" x2="16" y1="6" y2="6" />
              <line x1="16" x2="16" y1="14" y2="18" />
              <path d="M16 10h.01" />
              <path d="M12 10h.01" />
              <path d="M8 10h.01" />
              <path d="M12 14h.01" />
              <path d="M8 14h.01" />
              <path d="M12 18h.01" />
              <path d="M8 18h.01" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-tight">
              Area Calculator
            </h2>
            <p className="text-xs text-slate-500">
              {entries.length} {entries.length === 1 ? "calculation" : "calculations"}
            </p>
          </div>
        </div>

        {entries.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="p-5">
        {lastTenEntries.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-8 text-center">
            <p className="text-sm font-medium text-slate-600">No history yet</p>
            <p className="text-xs text-slate-400 mt-1">
              Enter dimensions on any shape to calculate and record its area.
            </p>
          </div>
        ) : (
          <>
            <ol className="divide-y divide-slate-100">
              {lastTenEntries.map((entry, i) => {
                const entryNumber =
                  entries.length - lastTenEntries.length + i + 1;
                return (
                  <li
                    key={`${entryNumber}-${entry.name}-${entry.area}`}
                    className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-sm"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 font-mono text-xs font-semibold flex items-center justify-center shrink-0">
                        {entryNumber}
                      </span>
                      <span className="font-medium text-slate-800 truncate">
                        {entry.name}
                      </span>
                    </div>
                    <span className="font-mono font-semibold text-emerald-700 tabular-nums shrink-0">
                      {formatArea(entry.area)}{" "}
                      <span className="text-xs font-normal text-slate-500">
                        cm<sup>2</sup>
                      </span>
                    </span>
                  </li>
                );
              })}
            </ol>

            {entries.length > 10 && (
              <p className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400 text-center">
                Showing latest 10 of {entries.length} calculations
              </p>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
