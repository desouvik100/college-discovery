import Link from "next/link";
import { CollegeListItem } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import CollegeImage from "@/components/ui/CollegeImage";

const TYPE_LABELS: Record<string, string> = {
  GOVERNMENT: "Government",
  PRIVATE: "Private",
  DEEMED: "Deemed University",
};

interface CollegeCardProps {
  college: CollegeListItem;
}

export default function CollegeCard({ college }: CollegeCardProps) {
  const placement = college.latestPlacement;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 hover:border-slate-400 transition-colors flex flex-col justify-between group">
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <CollegeImage
            imageUrl={college.imageUrl}
            imageAlt={college.imageAlt || college.name}
            name={college.name}
            className="w-12 h-12 rounded border border-slate-200 object-cover shrink-0 mt-0.5"
          />
          <div className="space-y-0.5 flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-slate-950 transition-colors leading-snug line-clamp-1">
                <Link href={`/colleges/${college.id}`}>
                  {college.name}
                </Link>
              </h3>
              <div className="flex-shrink-0 flex items-center gap-1 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded text-xs font-semibold text-slate-800">
                <span className="text-amber-500">★</span>
                <span>{Number(college.rating).toFixed(1)}</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 truncate">
              {college.city}, {college.state} • {TYPE_LABELS[college.collegeType] || college.collegeType} • Est. {college.establishedYear || "—"}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Annual Tuition</span>
            <span className="font-semibold text-slate-900 font-mono text-sm">
              {formatCurrency(college.totalFees)}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Placement Track</span>
            {placement ? (
              <div className="space-y-0.5 font-mono text-xs">
                <p className="font-semibold text-slate-900">
                  ₹{(placement.averagePackage / 100000).toFixed(1)}L <span className="font-normal text-slate-400 text-[11px]">avg</span>
                </p>
                <p className="text-[11px] text-slate-500">
                  {(placement.highestPackage / 100000).toFixed(0)}L max • {placement.placementRate}% rate
                </p>
              </div>
            ) : (
              <p className="text-slate-400 italic">Data not reported</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-400 text-[11px]">
          {college.coursesCount ? `${college.coursesCount} Programs` : "Undergraduate"}
        </span>

        <div className="flex items-center gap-3">
          <Link
            href={`/compare?ids=${college.id}`}
            className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 px-2 py-1 rounded transition-colors text-[11px] font-medium"
          >
            + Compare
          </Link>
          <Link
            href={`/colleges/${college.id}`}
            className="font-semibold text-slate-900 hover:text-slate-700 underline underline-offset-2 flex items-center gap-1"
          >
            View details <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
