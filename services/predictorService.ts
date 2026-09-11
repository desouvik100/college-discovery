import { prisma } from "@/lib/db";
import { PredictRequest } from "@/lib/validation";
import { PredictionResponse, PredictionResult, MatchTier } from "@/lib/types";

export async function predictColleges(request: PredictRequest): Promise<PredictionResponse> {
  const { examCode, rank, category } = request;

  const exam = await prisma.exam.findUnique({
    where: { code: examCode },
  });

  if (!exam) {
    throw new Error("Invalid exam code");
  }

  const cutoffs = await prisma.admissionCutoff.findMany({
    where: {
      examId: exam.id,
      category: category,
    },
    include: {
      college: true,
      course: true,
      exam: true,
    },
    orderBy: {
      closingRank: "asc",
    },
  });

  const predictions: PredictionResult[] = [];

  for (const cutoff of cutoffs) {
    let matchTier: MatchTier;
    let reason: string;

    const closingRank = cutoff.closingRank;
    const rankDifference = closingRank - rank;

    if (rank <= closingRank) {
      const ratio = rank / closingRank;
      if (ratio <= 0.80) {
        matchTier = "STRONG";
        reason = `Rank ${rank.toLocaleString("en-IN")} is comfortably within historical closing rank ${closingRank.toLocaleString("en-IN")} (buffer: +${rankDifference.toLocaleString("en-IN")}).`;
      } else {
        matchTier = "POSSIBLE";
        reason = `Rank ${rank.toLocaleString("en-IN")} is within competitive range of historical cutoff ${closingRank.toLocaleString("en-IN")} (margin: +${rankDifference.toLocaleString("en-IN")}).`;
      }
    } else if (rank <= Math.round(closingRank * 1.15)) {
      matchTier = "REACH";
      reason = `Rank ${rank.toLocaleString("en-IN")} is ${Math.abs(rankDifference).toLocaleString("en-IN")} ranks beyond the ${cutoff.year} closing rank (${closingRank.toLocaleString("en-IN")}). Possible in subsequent counseling rounds.`;
    } else {
      continue;
    }

    predictions.push({
      college: {
        id: cutoff.college.id,
        name: cutoff.college.name,
        location: cutoff.college.location,
        state: cutoff.college.state,
        city: cutoff.college.city,
        rating: Number(cutoff.college.rating),
        totalFees: cutoff.college.totalFees,
        collegeType: cutoff.college.collegeType,
      },
      course: {
        name: cutoff.course.name,
        fees: cutoff.course.fees,
        duration: cutoff.course.duration,
      },
      cutoff: {
        openingRank: cutoff.openingRank,
        closingRank: cutoff.closingRank,
        year: cutoff.year,
      },
      exam: {
        name: cutoff.exam.name,
        code: cutoff.exam.code,
      },
      probabilityCategory: matchTier,
      matchTier,
      rankDifference,
      reason,
    });
  }

  const tierOrder: Record<MatchTier, number> = {
    STRONG: 0,
    POSSIBLE: 1,
    REACH: 2,
  };

  predictions.sort((a, b) => {
    const tierDiff = tierOrder[a.matchTier] - tierOrder[b.matchTier];
    if (tierDiff !== 0) return tierDiff;
    if (b.rankDifference !== a.rankDifference) {
      return b.rankDifference - a.rankDifference;
    }
    return b.college.rating - a.college.rating;
  });

  const strongCount = predictions.filter((p) => p.matchTier === "STRONG").length;
  const possibleCount = predictions.filter((p) => p.matchTier === "POSSIBLE").length;
  const reachCount = predictions.filter((p) => p.matchTier === "REACH").length;

  return {
    predictions: predictions.slice(0, 30),
    userRank: rank,
    examCode,
    category,
    summary: {
      strongCount,
      possibleCount,
      reachCount,
      totalMatches: predictions.length,
    },
  };
}
