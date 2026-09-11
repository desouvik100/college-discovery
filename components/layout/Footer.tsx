import Link from "next/link";

export default function Footer() {
  return (
    <footer className="surface-primary border-t border-stone-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <h3 className="section-title text-stone-900">College Discovery Platform</h3>
            <p className="body-text text-stone-600 max-w-md leading-relaxed">
              An engineering-focused discovery tool to research Indian institutions, explore historical placement trends, and estimate admission fit by entrance examination cutoffs.
            </p>
            <p className="small-text text-stone-500 leading-relaxed">
              <span className="font-medium">Disclaimer:</span> Data presented is for educational demonstration based on published historical cutoffs. Not affiliated with JoSAA, CSAB, MCC, or any institutional admission authority.
            </p>
          </div>

          <div>
            <h4 className="body-text font-medium text-stone-900 mb-4">Sections</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/explore" className="small-text text-stone-600 hover:text-stone-900 transition-colors">
                  Explore Colleges
                </Link>
              </li>
              <li>
                <Link href="/compare" className="small-text text-stone-600 hover:text-stone-900 transition-colors">
                  Compare Institutions
                </Link>
              </li>
              <li>
                <Link href="/predictor" className="small-text text-stone-600 hover:text-stone-900 transition-colors">
                  Rank Predictor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="body-text font-medium text-stone-900 mb-4">Examinations Covered</h4>
            <ul className="space-y-2 small-text text-stone-600">
              <li>JEE Main (NITs, IIITs, CFTIs)</li>
              <li>JEE Advanced (IITs)</li>
              <li>BITSAT (BITS Campuses)</li>
              <li>NEET-UG (Medical Colleges)</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="small-text text-stone-500">
            © {new Date().getFullYear()} College Discovery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
