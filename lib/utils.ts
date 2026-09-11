export function formatCurrency(amount: number, compact: boolean = false): string {
  if (compact) {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
    }
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatRank(rank: number): string {
  return rank.toLocaleString("en-IN");
}

export function formatPercentage(rate: number): string {
  return `${Number(rate).toFixed(1)}%`;
}

export function getInitials(name: string): string {
  if (!name) return "COL";

  if (name.includes("Indian Institute of Technology")) {
    const parts = name.split("Technology");
    const city = parts[1]?.trim().replace(/[()]/g, "").split(" ")[0] || "";
    return `IIT${city ? city[0] : ""}`.toUpperCase();
  }
  if (name.includes("National Institute of Technology")) {
    const parts = name.split("Technology");
    const city = parts[1]?.trim().replace(/[()]/g, "").split(" ")[0] || "";
    return `NIT${city ? city[0] : ""}`.toUpperCase();
  }
  if (name.includes("BITS Pilani")) {
    return "BITS";
  }
  if (name.includes("IIIT")) {
    return "IIIT";
  }
  if (name.includes("AIIMS")) {
    return "AIIMS";
  }

  const words = name
    .replace(/[(),]/g, "")
    .split(/\s+/)
    .filter((w) => !["of", "and", "&", "the", "in", "for"].includes(w.toLowerCase()));

  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  if (words.length === 2) return (words[0][0] + words[1][0]).toUpperCase();
  return words.slice(0, 3).map((w) => w[0]).join("").toUpperCase();
}
