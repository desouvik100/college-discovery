import Link from "next/link";
import Image from "next/image";
import { getFeaturedColleges } from "@/services/collegeService";
import CollegeImage from "@/components/ui/CollegeImage";
import { formatCurrency } from "@/lib/utils";

export const metadata = {
  title: "College Discovery | Engineering & Medical College Search & Cutoff Predictor",
  description:
    "Find the right college with verified admission cutoffs, fee structures, placement records, and side-by-side comparison across premier Indian institutions.",
};

const TYPE_LABELS: Record<string, string> = {
  GOVERNMENT: "Govt / CFTI",
  PRIVATE: "Private",
  DEEMED: "Deemed University",
  AUTONOMOUS: "Autonomous",
};

export default async function HomePage() {
  const featuredColleges = await getFeaturedColleges();

  return (
    <div className="space-y-16 pb-16">
      <section className="relative border-b border-slate-200 overflow-hidden bg-slate-100">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=85"
            alt="Collegiate University Campus Architecture"
            fill
            priority
            unoptimized
            referrerPolicy="no-referrer"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-45% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-20 sm:pb-28">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-medium text-slate-600 bg-white/90 border border-slate-200 rounded backdrop-blur-sm shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
              Academic Admissions & Placement Intelligence
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                Find the right college with better information.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Accurate admission cutoffs, verified placement packages, fee schedules, and objective side-by-side comparison across accredited institutions in India.
              </p>
            </div>

            <form action="/explore" method="GET" className="max-w-xl">
              <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-300 rounded-md shadow-sm focus-within:border-slate-600 focus-within:ring-1 focus-within:ring-slate-600">
                <div className="pl-2.5 text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  placeholder="Search by college name, city, or state (e.g. IIT Bombay, Delhi, Vellore)..."
                  className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
                />
                <button
                  type="submit"
                  className="shrink-0 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors shadow-sm"
              >
                <span>Explore Directory</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/predictor"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded transition-colors shadow-sm"
              >
                <span>Evaluate Rank Match</span>
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded transition-colors shadow-sm"
              >
                <span>Compare Colleges</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-4 mb-8">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            How College Discovery Works
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Three focused tools engineered to cut through marketing noise and clarify university choices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                01 • Discovery
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                Institutional Directory & Filtering
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Filter accredited engineering and medical colleges by state, government vs private ownership, total program fees, and verified rating benchmarks.
              </p>
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-slate-600 pt-2"
            >
              <span>Search directory</span>
              <span>→</span>
            </Link>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                02 • Contrast
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                Side-by-Side Matrix Comparison
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Directly compare up to 4 shortlisted institutions across tuition costs, average compensation packages, placement ratios, and accredited branch offerings.
              </p>
            </div>
            <Link
              href="/compare"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-slate-600 pt-2"
            >
              <span>Compare colleges</span>
              <span>→</span>
            </Link>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                03 • Prediction
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                Rank Cutoff Predictor
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Input your entrance examination score across JEE Main, JEE Advanced, NEET, or BITSAT to calculate admission likelihood across categories.
              </p>
            </div>
            <Link
              href="/predictor"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-slate-600 pt-2"
            >
              <span>Calculate eligibility</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-4 mb-6 gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Featured Institutions
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Accredited universities with comprehensive academic, fee, and placement records.
            </p>
          </div>
          <Link
            href="/explore"
            className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-slate-600 whitespace-nowrap inline-flex items-center gap-1"
          >
            <span>View all colleges</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredColleges.map((college) => (
            <div
              key={college.id}
              className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:border-slate-300 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CollegeImage
                    imageUrl={college.imageUrl}
                    imageAlt={college.imageAlt || college.name}
                    name={college.name}
                    className="w-14 h-14 rounded border border-slate-200 object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
                        {TYPE_LABELS[college.collegeType] || college.collegeType}
                      </span>
                      <span className="inline-flex items-center text-xs font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                        ★ {college.rating.toFixed(1)}
                      </span>
                    </div>
                    <Link
                      href={`/colleges/${college.id}`}
                      className="text-sm font-semibold text-slate-900 hover:underline line-clamp-1 block mt-0.5"
                    >
                      {college.name}
                    </Link>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {college.city}, {college.state} • Est. {college.establishedYear || "—"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div>
                    <div className="text-[10px] uppercase text-slate-400 font-medium">Avg Package</div>
                    <div className="font-semibold text-slate-900">
                      {college.latestPlacement
                        ? formatCurrency(college.latestPlacement.averagePackage)
                        : "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-slate-400 font-medium">Total Tuition</div>
                    <div className="font-semibold text-slate-900">
                      {college.totalFees ? formatCurrency(college.totalFees) : "—"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  {college.latestPlacement ? `${college.latestPlacement.placementRate.toFixed(0)}% placed` : "Admissions open"}
                </span>
                <Link
                  href={`/colleges/${college.id}`}
                  className="font-medium text-slate-900 hover:text-slate-600 inline-flex items-center gap-1"
                >
                  <span>Profile</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              Explore the full directory of accredited colleges
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Apply detailed filters across states, tuition budgets, entrance exam cutoffs, and campus placements.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/explore"
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded transition-colors shadow-sm"
            >
              Browse Directory →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
