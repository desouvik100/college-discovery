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
  { value: "", label: "All Types" },
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
    <div className="surface p-6 space-y-5">
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <h2 className="label-text">
            Filters
          </h2>
          {activeFilters.length > 0 && (
            <span className="badge badge-neutral">
              {activeFilters.length}
            </span>
          )}
        </div>
        {activeFilters.length > 0 && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="body-small text-stone-500 hover:text-stone-900 underline underline-offset-2 transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="field-label">
            State / Territory
          </label>
          <Select
            value={searchParams.get("state") || ""}
            onChange={(e) => handleFilterChange("state", e.target.value)}
          >
            {STATES.map((st) => (
              <option key={st} value={st === "All States" ? "" : st}>
                {st}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="field-label">
            College Type
          </label>
          <Select
            value={searchParams.get("collegeType") || ""}
            onChange={(e) => handleFilterChange("collegeType", e.target.value)}
          >
            {COLLEGE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="field-label">
            Minimum Rating
          </label>
          <Select
            value={searchParams.get("minRating") || ""}
            onChange={(e) => handleFilterChange("minRating", e.target.value)}
          >
            <option value="">Any Rating</option>
            <option value="4.7">4.7+ (Premier)</option>
            <option value="4.4">4.4+ (Excellent)</option>
            <option value="4.0">4.0+ (Very Good)</option>
            <option value="3.5">3.5+ (Good)</option>
          </Select>
        </div>

        <div>
          <label className="field-label">
            Maximum Annual Fees
          </label>
          <Select
            value={searchParams.get("maxFees") || ""}
            onChange={(e) => handleFilterChange("maxFees", e.target.value)}
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
