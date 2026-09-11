import Link from "next/link";
import { PredictionResponse, PredictionResult, MatchTier } from "@/lib/types";
import { formatCurrency, formatRank } from "@/lib/utils";

interface PredictionResultsProps {
  predictions: PredictionResponse;
}

export default function PredictionResults({ predictions }: PredictionResultsProps) {
  const { summary, userRank, examCode, category } = predictions;

  if (predictions.predictions.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-6 text-center space-y-2">
        <h3 className="text-sm font-semibold text-slate-900">
          No Historical Matches Found
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Rank {formatRank(userRank)} exceeded historical closing rank windows for {examCode} ({category}) in this dataset. You may wish to evaluate different entrance examinations or state-level quota opportunities.
        </p>
      </div>
    );
  }

  const strongMatches = predictions.predictions.filter((p) => p.matchTier === "STRONG");
  const possibleMatches = predictions.predictions.filter((p) => p.matchTier === "POSSIBLE");
  const reachMatches = predictions.predictions.filter((p) => p.matchTier === "REACH");

  return (
    <div className="space-y-6">
      {/* Summary Matrix Banner */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-900">
            Historical Cutoff Matches for Rank {formatRank(userRank)} ({examCode} • {category})
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Classified by distance between your rank and published historical closing ranks.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-medium font-mono text-slate-600">
          <span className="text-emerald-700 font-semibold">{summary.strongCount} Strong</span>
          <span>•</span>
          <span className="text-slate-800 font-semibold">{summary.possibleCount} Possible</span>
          <span>•</span>
          <span className="text-slate-600 font-semibold">{summary.reachCount} Reach</span>
        </div>
      </div>

      {/* Strong Matches */}
      {strongMatches.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Strong Matches ({strongMatches.length})
            </h3>
            <span className="text-[11px] text-slate-500 font-normal">
              — Your rank is comfortably within historical closing cutoffs
            </span>
          </div>

          <div className="space-y-3">
            {strongMatches.map((result) => (
              <PredictionResultItem key={`${result.college.id}-${result.course.name}`} result={result} />
            ))}
          </div>
        </section>
      )}

      {/* Possible Matches */}
      {possibleMatches.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Possible Matches ({possibleMatches.length})
            </h3>
            <span className="text-[11px] text-slate-500 font-normal">
              — Your rank falls near historical closing ranges (competitive)
            </span>
          </div>

          <div className="space-y-3">
            {possibleMatches.map((result) => (
              <PredictionResultItem key={`${result.college.id}-${result.course.name}`} result={result} />
            ))}
          </div>
        </section>
      )}

      {/* Reach Options */}
      {reachMatches.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Reach Options ({reachMatches.length})
            </h3>
            <span className="text-[11px] text-slate-500 font-normal">
              — Historical cutoffs were slightly above your rank; requires round shifts
            </span>
          </div>

          <div className="space-y-3">
            {reachMatches.map((result) => (
              <PredictionResultItem key={`${result.college.id}-${result.course.name}`} result={result} />
            ))}
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <div className="p-4 border border-slate-200 bg-slate-50 rounded-lg text-[11px] text-slate-500 space-y-1">
        <p className="font-semibold text-slate-700">Evaluation Methodology & Counseling Disclaimer</p>
        <p>
          Calculations compare the submitted rank against documented closing cutoffs in our historical dataset. Cutoff trends fluctuate each academic cycle based on candidate pool density, exam normalization, and reservation policies. This tool provides an informational guide and does not constitute guaranteed admission or seat allocation.
        </p>
      </div>
    </div>
  );
}

function PredictionResultItem({ result }: { result: PredictionResult }) {
  const tierBadge: Record<MatchTier, { label: string; className: string }> = {
    STRONG: { label: "Strong Match", className: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    POSSIBLE: { label: "Possible Match", className: "bg-slate-100 text-slate-800 border-slate-300" },
    REACH: { label: "Reach Option", className: "bg-slate-50 text-slate-600 border-slate-200" },
  };

  const badge = tierBadge[result.matchTier];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3 hover:border-slate-300 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded border ${badge.className}`}>
              {badge.label}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">
              {result.college.location}
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 mt-1">
            <Link href={`/colleges/${result.college.id}`} className="hover:underline">
              {result.college.name}
            </Link>
          </h4>
          <p className="text-xs font-semibold text-slate-700 mt-0.5">
            {result.course.name}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs self-start sm:self-auto">
          <span className="font-mono text-slate-700 font-medium">★ {result.college.rating.toFixed(1)}</span>
          <Link
            href={`/colleges/${result.college.id}`}
            className="text-xs font-medium text-slate-900 hover:text-slate-700 underline underline-offset-2"
          >
            View profile →
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="pt-2 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div>
          <span className="text-slate-400 block text-[11px]">Opening Rank</span>
          <span className="font-mono font-medium text-slate-800">{formatRank(result.cutoff.openingRank)}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Closing Rank</span>
          <span className="font-mono font-semibold text-slate-900">{formatRank(result.cutoff.closingRank)}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Annual Tuition</span>
          <span className="font-mono font-medium text-slate-800">{formatCurrency(result.course.fees || result.college.totalFees)}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Rank Margin</span>
          <span className={`font-mono font-semibold ${result.rankDifference >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
            {result.rankDifference >= 0 ? `+${formatRank(result.rankDifference)}` : `-${formatRank(Math.abs(result.rankDifference))}`}
          </span>
        </div>
      </div>

      {/* Deterministic Explanation */}
      <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 leading-relaxed font-sans">
        <span className="font-semibold text-slate-700">Rationale: </span>
        {result.reason}
      </div>
    </div>
  );
}
