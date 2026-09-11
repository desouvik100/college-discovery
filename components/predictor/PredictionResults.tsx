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
      <div className="surface-primary p-8 text-center space-y-4">
        <h3 className="section-title text-stone-900">
          No Historical Matches Found
        </h3>
        <p className="body-text text-stone-600 max-w-lg mx-auto">
          Rank {formatRank(userRank)} exceeded historical closing rank windows for {examCode} ({category}) in this dataset. Consider exploring different entrance examinations or state-level quota opportunities.
        </p>
      </div>
    );
  }

  const strongMatches = predictions.predictions.filter((p) => p.matchTier === "STRONG");
  const possibleMatches = predictions.predictions.filter((p) => p.matchTier === "POSSIBLE");
  const reachMatches = predictions.predictions.filter((p) => p.matchTier === "REACH");

  return (
    <div className="space-y-8">
      <div className="surface-primary p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <h3 className="section-title">
            Historical Cutoff Analysis
          </h3>
          <p className="body-text text-stone-600">
            Rank {formatRank(userRank)} ({examCode} • {category}) classified by distance to historical closing ranks
          </p>
        </div>

        <div className="flex items-center gap-4 text-stone-700">
          <div className="text-center">
            <div className="body-text font-semibold text-emerald-700">{summary.strongCount}</div>
            <div className="small-text text-stone-600">Strong</div>
          </div>
          <div className="w-px h-8 bg-stone-300"></div>
          <div className="text-center">
            <div className="body-text font-semibold text-stone-900">{summary.possibleCount}</div>
            <div className="small-text text-stone-600">Possible</div>
          </div>
          <div className="w-px h-8 bg-stone-300"></div>
          <div className="text-center">
            <div className="body-text font-semibold text-stone-600">{summary.reachCount}</div>
            <div className="small-text text-stone-600">Reach</div>
          </div>
        </div>
      </div>

      {strongMatches.length > 0 && (
        <section className="space-y-4">
          <header className="pb-3 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <h3 className="section-title text-emerald-800">
                Strong Matches ({strongMatches.length})
              </h3>
              <span className="small-text text-stone-600">
                Your rank is comfortably within historical closing cutoffs
              </span>
            </div>
          </header>

          <div className="space-y-4">
            {strongMatches.map((result) => (
              <PredictionResultItem key={`${result.college.id}-${result.course.name}`} result={result} />
            ))}
          </div>
        </section>
      )}

      {possibleMatches.length > 0 && (
        <section className="space-y-4">
          <header className="pb-3 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <h3 className="section-title text-stone-800">
                Possible Matches ({possibleMatches.length})
              </h3>
              <span className="small-text text-stone-600">
                Your rank falls near historical closing ranges (competitive)
              </span>
            </div>
          </header>

          <div className="space-y-4">
            {possibleMatches.map((result) => (
              <PredictionResultItem key={`${result.college.id}-${result.course.name}`} result={result} />
            ))}
          </div>
        </section>
      )}

      {reachMatches.length > 0 && (
        <section className="space-y-4">
          <header className="pb-3 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <h3 className="section-title text-stone-700">
                Reach Options ({reachMatches.length})
              </h3>
              <span className="small-text text-stone-600">
                Historical cutoffs were above your rank; requires favorable conditions
              </span>
            </div>
          </header>

          <div className="space-y-4">
            {reachMatches.map((result) => (
              <PredictionResultItem key={`${result.college.id}-${result.course.name}`} result={result} />
            ))}
          </div>
        </section>
      )}

      <footer className="p-6 border border-stone-200 bg-stone-50 rounded-lg">
        <h4 className="body-text font-medium text-stone-900 mb-2">Methodology & Disclaimer</h4>
        <p className="small-text text-stone-700 leading-relaxed">
          Calculations compare submitted ranks against documented closing cutoffs in our historical dataset. Cutoff trends fluctuate each academic cycle based on candidate pool density, exam normalization, and reservation policies. This analysis provides informational guidance and does not constitute guaranteed admission or seat allocation.
        </p>
      </footer>
    </div>
  );
}

function PredictionResultItem({ result }: { result: PredictionResult }) {
  const tierBadge: Record<MatchTier, { label: string; className: string }> = {
    STRONG: { label: "Strong Match", className: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    POSSIBLE: { label: "Possible Match", className: "bg-stone-100 text-stone-800 border-stone-300" },
    REACH: { label: "Reach Option", className: "bg-stone-50 text-stone-600 border-stone-200" },
  };

  const badge = tierBadge[result.matchTier];

  return (
    <div className="surface-primary border border-stone-200 p-6 space-y-4 hover:border-stone-300 transition-colors">
      <header className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className={`small-text font-medium px-3 py-1 rounded border ${badge.className}`}>
              {badge.label}
            </span>
            <span className="small-text text-stone-500">
              {result.college.location}
            </span>
          </div>
          
          <div>
            <h4 className="section-title mb-1">
              <Link href={`/colleges/${result.college.id}`} className="hover:text-stone-700 transition-colors">
                {result.college.name}
              </Link>
            </h4>
            <p className="body-text font-medium text-stone-700">
              {result.course.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 self-start lg:self-auto">
          <div className="text-center">
            <div className="small-text text-stone-600">Rating</div>
            <div className="body-text font-medium text-stone-900">★ {result.college.rating.toFixed(1)}</div>
          </div>
          <Link
            href={`/colleges/${result.college.id}`}
            className="btn btn-ghost inline-flex items-center gap-2"
          >
            View profile
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" />
            </svg>
          </Link>
        </div>
      </header>

      <div className="pt-4 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <div className="small-text text-stone-500 mb-1">Opening Rank</div>
          <div className="body-text font-mono font-medium text-stone-800">{formatRank(result.cutoff.openingRank)}</div>
        </div>
        <div>
          <div className="small-text text-stone-500 mb-1">Closing Rank</div>
          <div className="body-text font-mono font-semibold text-stone-900">{formatRank(result.cutoff.closingRank)}</div>
        </div>
        <div>
          <div className="small-text text-stone-500 mb-1">Annual Tuition</div>
          <div className="body-text font-mono font-medium text-stone-800">{formatCurrency(result.course.fees || result.college.totalFees)}</div>
        </div>
        <div>
          <div className="small-text text-stone-500 mb-1">Rank Margin</div>
          <div className={`body-text font-mono font-semibold ${result.rankDifference >= 0 ? "text-emerald-700" : "text-red-700"}`}>
            {result.rankDifference >= 0 ? `+${formatRank(result.rankDifference)}` : `-${formatRank(Math.abs(result.rankDifference))}`}
          </div>
        </div>
      </div>

      <div className="p-4 surface-secondary border border-stone-200 rounded-lg">
        <p className="small-text text-stone-700 leading-relaxed">
          <span className="font-medium">Analysis: </span>
          {result.reason}
        </p>
      </div>
    </div>
  );
}
