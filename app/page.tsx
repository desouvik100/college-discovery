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
      <section className="relative border-b border-stone-200 overflow-hidden bg-stone-100">
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
          <div className="max-w-3xl space-y-7">
            <div className="space-y-3.5">
              <div className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                JoSAA • NEET • BITSAT • NIRF Institutional Data
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 leading-[1.18]">
                College admissions, cutoffs, and placement data.
              </h1>
              <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
                Direct access to verified closing ranks, official tuition fee schedules, and audited placement packages across accredited Indian universities.
              </p>
            </div>

            <form action="/explore" method="GET" className="max-w-2xl">
              <div className="flex items-center gap-2 p-2 surface-primary border border-stone-300 rounded-lg shadow-sm focus-within:border-stone-600 focus-within:ring-2 focus-within:ring-stone-600/20">
                <div className="pl-2 text-stone-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  placeholder="Search by college name, city, or state (e.g. IIT Bombay, Delhi, BITS)..."
                  className="w-full body-text text-stone-900 placeholder:text-stone-400 focus:outline-none bg-transparent"
                />
                <button
                  type="submit"
                  className="btn btn-primary whitespace-nowrap px-4 py-2"
                >
                  Search
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2.5 text-xs text-stone-500">
                <span className="font-medium text-stone-600 shrink-0">Popular:</span>
                <div className="flex flex-wrap gap-1.5">
                  <Link href="/explore?search=IIT+Bombay" className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors">
                    IIT Bombay
                  </Link>
                  <Link href="/explore?search=BITS+Pilani" className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors">
                    BITS Pilani
                  </Link>
                  <Link href="/explore?search=NIT+Trichy" className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors">
                    NIT Trichy
                  </Link>
                  <Link href="/explore?search=AIIMS" className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors">
                    AIIMS Delhi
                  </Link>
                </div>
              </div>
            </form>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/explore"
                className="btn btn-primary inline-flex items-center gap-2"
              >
                <span>Browse All Colleges</span>
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" />
                </svg>
              </Link>
              <Link
                href="/predictor"
                className="btn btn-secondary inline-flex items-center gap-2"
              >
                <span>Cutoff Predictor</span>
              </Link>
              <Link
                href="/compare"
                className="btn btn-ghost inline-flex items-center gap-2"
              >
                <span>Compare Matrix</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="border-b border-stone-200 pb-5 mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-stone-900 mb-1">
            How College Discovery Works
          </h2>
          <p className="text-sm text-stone-600">
            Three focused tools engineered to cut through marketing noise and clarify university choices.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="surface-primary p-7 border border-stone-200 rounded-lg space-y-4">
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                01 • Discovery
              </div>
              <h3 className="text-lg font-semibold text-stone-900 tracking-tight">
                Institutional Directory & Filtering
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Filter accredited engineering and medical colleges by state, government vs private ownership, total program fees, and verified rating benchmarks.
              </p>
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors"
            >
              <span>Search directory</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" />
              </svg>
            </Link>
          </div>

          <div className="surface-primary p-7 border border-stone-200 rounded-lg space-y-4">
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                02 • Contrast
              </div>
              <h3 className="text-lg font-semibold text-stone-900 tracking-tight">
                Side-by-Side Matrix Comparison
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Directly compare up to 3 shortlisted institutions across tuition costs, average compensation packages, placement ratios, and accredited branch offerings.
              </p>
            </div>
            <Link
              href="/compare"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors"
            >
              <span>Compare colleges</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" />
              </svg>
            </Link>
          </div>

          <div className="surface-primary p-7 border border-stone-200 rounded-lg space-y-4">
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                03 • Prediction
              </div>
              <h3 className="text-lg font-semibold text-stone-900 tracking-tight">
                Rank Cutoff Predictor
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Input your entrance examination score across JEE Main, JEE Advanced, NEET, or BITSAT to calculate admission likelihood across categories.
              </p>
            </div>
            <Link
              href="/predictor"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors"
            >
              <span>Calculate eligibility</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-200 pb-5 mb-8 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-stone-900">
              Featured Institutions
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Accredited universities with comprehensive academic, fee, and placement records.
            </p>
          </div>
          <Link
            href="/explore"
            className="text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>View all colleges</span>
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" />
            </svg>
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredColleges.map((college) => (
            <div
              key={college.id}
              className="surface-primary border border-stone-200 rounded-lg p-5 hover:border-stone-300 transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-3.5">
                <div className="flex items-start gap-3.5">
                  <CollegeImage
                    imageUrl={college.imageUrl}
                    imageAlt={college.imageAlt || college.name}
                    name={college.name}
                    className="w-12 h-12 rounded-lg border border-stone-200 object-cover shrink-0 mt-0.5"
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                        {TYPE_LABELS[college.collegeType] || college.collegeType}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-stone-800 bg-stone-100 border border-stone-200/80 px-1.5 py-0.5 rounded">
                        <span className="text-amber-500">★</span> {college.rating.toFixed(1)}
                      </span>
                    </div>
                    <Link
                      href={`/colleges/${college.id}`}
                      className="text-base font-semibold text-stone-900 group-hover:text-stone-700 transition-colors leading-snug line-clamp-2 block"
                    >
                      {college.name}
                    </Link>
                    <p className="text-xs text-stone-500 truncate">
                      {college.city}, {college.state} • Est. {college.establishedYear || "—"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-stone-100">
                  <div>
                    <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider mb-0.5">Avg Package</div>
                    <div className="text-sm font-semibold text-stone-900 font-mono">
                      {college.latestPlacement
                        ? formatCurrency(college.latestPlacement.averagePackage)
                        : "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider mb-0.5">Total Tuition</div>
                    <div className="text-sm font-semibold text-stone-900 font-mono">
                      {college.totalFees ? formatCurrency(college.totalFees) : "—"}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-medium">
                    {college.latestPlacement ? `${college.latestPlacement.placementRate.toFixed(0)}% placed` : "Admissions open"}
                  </span>
                  <Link
                    href={`/colleges/${college.id}`}
                    className="text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors inline-flex items-center gap-1 group-hover:translate-x-0.5 duration-150"
                  >
                    <span>Profile</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" />
                    </svg>
                  </Link>
                </div>
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
