import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-2">
            <p className="font-semibold text-slate-800 text-sm">College Discovery Platform</p>
            <p className="text-slate-500 max-w-md leading-relaxed">
              An engineering-focused discovery tool to research Indian institutions, explore historical placement trends, and estimate admission fit by entrance examination cutoffs.
            </p>
            <p className="text-[11px] text-slate-400">
              Disclaimer: Data presented is for educational demonstration based on published historical cutoffs. Not affiliated with JoSAA, CSAB, MCC, or any institutional admission authority.
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-800 mb-2.5">Sections</p>
            <ul className="space-y-1.5">
              <li>
                <Link href="/explore" className="hover:text-slate-900 transition-colors">
                  Explore Colleges
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-slate-900 transition-colors">
                  Compare Institutions
                </Link>
              </li>
              <li>
                <Link href="/predictor" className="hover:text-slate-900 transition-colors">
                  Rank Predictor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-slate-800 mb-2.5">Examinations Covered</p>
            <ul className="space-y-1.5 text-slate-500">
              <li>JEE Main (NITs, IIITs, CFTIs)</li>
              <li>JEE Advanced (IITs)</li>
              <li>BITSAT (BITS Campuses)</li>
              <li>NEET-UG (Medical Colleges)</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} College Discovery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
