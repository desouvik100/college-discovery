"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Select from "@/components/ui/Select";

const STATES = [
  "All States",
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const COLLEGE_TYPES = [
  { value: "", label: "All Affiliations" },
  { value: "GOVERNMENT", label: "Government / Public" },
  { value: "PRIVATE", label: "Private" },
  { value: "DEEMED", label: "Deemed University" },
];

export default function FilterPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const targetPath = pathname === "/" ? "/explore" : pathname;

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== "All States" && value !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`${targetPath}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams();
    const search = searchParams.get("search");
    if (search) params.set("search", search);
    router.push(`${targetPath}?${params.toString()}`);
  };

  const activeFilters = [
    searchParams.get("state"),
    searchParams.get("collegeType"),
    searchParams.get("minRating"),
    searchParams.get("maxFees"),
  ].filter(Boolean);

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Filters
          </h2>
          {activeFilters.length > 0 && (
            <span className="text-[11px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded">
              {activeFilters.length}
            </span>
          )}
        </div>
        {activeFilters.length > 0 && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="text-xs text-slate-500 hover:text-slate-900 underline underline-offset-2"
          >
            Reset
          </button>
        )}
      </div>

      <div className="space-y-3.5">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            State / Territory
          </label>
          <Select
            value={searchParams.get("state") || ""}
            onChange={(e) => handleFilterChange("state", e.target.value)}
            className="text-xs h-8"
          >
            {STATES.map((st) => (
              <option key={st} value={st === "All States" ? "" : st}>
                {st}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Affiliation / Type
          </label>
          <Select
            value={searchParams.get("collegeType") || ""}
            onChange={(e) => handleFilterChange("collegeType", e.target.value)}
            className="text-xs h-8"
          >
            {COLLEGE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Minimum Rating
          </label>
          <Select
            value={searchParams.get("minRating") || ""}
            onChange={(e) => handleFilterChange("minRating", e.target.value)}
            className="text-xs h-8"
          >
            <option value="">Any Rating</option>
            <option value="4.7">4.7+ (Premier tier)</option>
            <option value="4.4">4.4+ (High tier)</option>
            <option value="4.0">4.0+ (Established)</option>
            <option value="3.5">3.5+ (Standard)</option>
          </Select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Max Annual Tuition (₹)
          </label>
          <Select
            value={searchParams.get("maxFees") || ""}
            onChange={(e) => handleFilterChange("maxFees", e.target.value)}
            className="text-xs h-8"
          >
            <option value="">No Maximum</option>
            <option value="100000">Under ₹1,00,000</option>
            <option value="400000">Under ₹4,00,000</option>
            <option value="800000">Under ₹8,00,000</option>
            <option value="1500000">Under ₹15,00,000</option>
            <option value="2500000">Under ₹25,00,000</option>
          </Select>
        </div>
      </div>
    </div>
  );
}
