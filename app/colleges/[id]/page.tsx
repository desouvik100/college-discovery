import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCollegeById } from "@/services/collegeService";
import { formatCurrency, formatRank } from "@/lib/utils";
import SaveCollegeButton from "@/components/colleges/SaveCollegeButton";

export default async function CollegeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const college = await getCollegeById(params.id);

  if (!college) {
    notFound();
  }

  const latestPlacement = college.placementStats?.[0];
  const typeLabel: Record<string, string> = {
    GOVERNMENT: "Government / Public Institution",
    PRIVATE: "Private Institution",
    DEEMED: "Deemed University",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <nav className="flex items-center space-x-2 text-xs text-slate-500">
        <Link href="/explore" className="hover:text-slate-900 transition-colors">
          Explore
        </Link>
        <span>/</span>
        <span className="text-slate-400">{college.state}</span>
        <span>/</span>
        <span className="text-slate-800 font-medium truncate max-w-xs">{college.name}</span>
      </nav>

      <div className="pb-8 border-b border-slate-200 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium uppercase tracking-wide">
              <span>{typeLabel[college.collegeType] || college.collegeType}</span>
              <span>•</span>
              <span>Est. {college.establishedYear}</span>
              {college.websiteUrl && (
                <>
                  <span>•</span>
                  <a
                    href={college.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-900 underline font-normal lowercase"
                  >
                    Official Portal ↗
                  </a>
                </>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              {college.name}
            </h1>
            <p className="text-sm text-slate-600">
              {college.city}, {college.state}, India
            </p>
          </div>

          <div className="flex sm:flex-col items-end gap-3 flex-shrink-0">
            <div className="flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1.5 rounded text-sm font-semibold">
              <span className="text-amber-400">★</span>
              <span>{Number(college.rating).toFixed(1)}</span>
              <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
            </div>
            <div className="flex items-center gap-2">
              <SaveCollegeButton
                collegeId={college.id}
                collegeName={college.name}
                variant="detail"
              />
              <Link
                href={`/compare?ids=${college.id}`}
                className="inline-flex items-center justify-center text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded transition-colors"
              >
                Add to Compare +
              </Link>
            </div>
          </div>
        </div>

        {college.imageUrl && (
          <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50 shadow-sm mt-4">
            <div className="relative aspect-[21/9] sm:aspect-[2.8/1] w-full bg-slate-100">
              <Image
                src={college.imageUrl}
                alt={college.imageAlt || `${college.name} Campus`}
                fill
                priority
                unoptimized
                referrerPolicy="no-referrer"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 960px"
              />
            </div>
            <div className="px-3.5 py-2 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium text-slate-700 truncate">
                {college.imageAlt || `${college.name} Campus`}
              </span>
              {college.imageSourceUrl && (
                <a
                  href={college.imageSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-700 underline shrink-0 ml-3"
                >
                  Source / Attribution ↗
                </a>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
          <div>
            <span className="text-slate-400 font-medium block mb-0.5">Annual Tuition</span>
            <span className="text-base font-semibold font-mono text-slate-900">
              {formatCurrency(college.totalFees)}
            </span>
          </div>

          <div>
            <span className="text-slate-400 font-medium block mb-0.5">Average Placement</span>
            <span className="text-base font-semibold font-mono text-slate-900">
              {latestPlacement ? `${(latestPlacement.averagePackage / 100000).toFixed(1)} LPA` : "N/A"}
            </span>
          </div>

          <div>
            <span className="text-slate-400 font-medium block mb-0.5">Highest Package</span>
            <span className="text-base font-semibold font-mono text-slate-900">
              {latestPlacement ? `${(latestPlacement.highestPackage / 100000).toFixed(1)} LPA` : "N/A"}
            </span>
          </div>

          <div>
            <span className="text-slate-400 font-medium block mb-0.5">Placement Rate</span>
            <span className="text-base font-semibold font-mono text-slate-900">
              {latestPlacement ? `${latestPlacement.placementRate}%` : "N/A"}
            </span>
          </div>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Institutional Overview
        </h2>
        <div className="text-sm text-slate-600 leading-relaxed space-y-3">
          <p>
            {college.name} is a premier {typeLabel[college.collegeType]?.toLowerCase()} established in{" "}
            {college.establishedYear} located in {college.city}, {college.state}. Recognized for academic rigor
            and robust campus infrastructure, the institution provides structured degree programs supported by active industry linkages and technical research departments.
          </p>
          <p>
            Students have access to comprehensive departmental laboratories, specialized computing centers, central library facilities, and competitive student-led professional societies.
          </p>
        </div>
      </section>

      <hr className="border-slate-200" />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Academic Programs Offered
          </h2>
          <span className="text-xs text-slate-500">{college.courses.length} Approved Programs</span>
        </div>

        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="p-3">Program Name</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Annual Fees</th>
                  <th className="p-3">Seat Intake</th>
                  <th className="p-3">Eligibility Requirement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {college.courses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50/75 transition-colors">
                    <td className="p-3 font-semibold text-slate-900">{course.name}</td>
                    <td className="p-3 text-slate-600">{course.duration} Years</td>
                    <td className="p-3 font-mono font-medium text-slate-900">
                      {formatCurrency(course.fees)}
                    </td>
                    <td className="p-3 text-slate-600 font-mono">{course.seats}</td>
                    <td className="p-3 text-slate-500 max-w-xs">{course.eligibility}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <hr className="border-slate-200" />

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Placement Performance & Trends
        </h2>

        {college.placementStats.length > 0 ? (
          <div className="space-y-4">
            <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="p-3">Graduation Year</th>
                      <th className="p-3">Highest Package</th>
                      <th className="p-3">Average Package</th>
                      <th className="p-3">Median Package</th>
                      <th className="p-3">Placement Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {college.placementStats.map((stat) => (
                      <tr key={stat.id} className="hover:bg-slate-50/75 transition-colors">
                        <td className="p-3 font-semibold text-slate-900">{stat.year}</td>
                        <td className="p-3 font-mono font-medium text-slate-900">
                          ₹{(stat.highestPackage / 100000).toFixed(1)} LPA
                        </td>
                        <td className="p-3 font-mono font-medium text-slate-900">
                          ₹{(stat.averagePackage / 100000).toFixed(1)} LPA
                        </td>
                        <td className="p-3 font-mono text-slate-600">
                          ₹{(stat.medianPackage / 100000).toFixed(1)} LPA
                        </td>
                        <td className="p-3 font-mono font-medium text-slate-900">
                          {stat.placementRate}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {latestPlacement?.topRecruiters?.length > 0 && (
              <div className="pt-2">
                <p className="text-xs font-medium text-slate-500 mb-2">Prominent Recruiting Partners</p>
                <div className="flex flex-wrap gap-1.5">
                  {latestPlacement.topRecruiters.map((recruiter: string) => (
                    <span
                      key={recruiter}
                      className="text-xs px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded"
                    >
                      {recruiter}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">No historical placement data recorded.</p>
        )}
      </section>

      {college.admissionCutoffs && college.admissionCutoffs.length > 0 && (
        <>
          <hr className="border-slate-200" />
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Historical Admission Cutoffs
              </h2>
              <span className="text-[11px] text-slate-400 font-mono">Reference historical dataset</span>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="p-3">Examination</th>
                      <th className="p-3">Program</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Opening Rank</th>
                      <th className="p-3">Closing Rank</th>
                      <th className="p-3">Year</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {college.admissionCutoffs.slice(0, 10).map((cutoff: any) => (
                      <tr key={cutoff.id} className="hover:bg-slate-50/75 transition-colors">
                        <td className="p-3 font-semibold text-slate-900">{cutoff.exam?.name || "Entrance Exam"}</td>
                        <td className="p-3 text-slate-700">{cutoff.course?.name || "Undergraduate"}</td>
                        <td className="p-3 font-mono text-slate-600">{cutoff.category}</td>
                        <td className="p-3 font-mono font-medium text-slate-900">
                          {formatRank(cutoff.openingRank)}
                        </td>
                        <td className="p-3 font-mono font-medium text-slate-900">
                          {formatRank(cutoff.closingRank)}
                        </td>
                        <td className="p-3 text-slate-500">{cutoff.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Cutoffs vary each admission cycle based on candidate volume, exam difficulty, and institutional seat matrix.
            </p>
          </section>
        </>
      )}

      <hr className="border-slate-200" />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Student Feedback & Experiences
          </h2>
          <span className="text-xs text-slate-500">{college.reviews.length} Verified Entries</span>
        </div>

        {college.reviews.length > 0 ? (
          <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
            {college.reviews.map((review) => (
              <div key={review.id} className="py-4 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {review.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {review.author} • {review.courseStudied} • Class of {review.graduationYear}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded flex-shrink-0">
                    <span className="text-amber-500">★</span>
                    <span>{review.rating} / 5</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">No student reviews recorded yet.</p>
        )}
      </section>
    </div>
  );
}
