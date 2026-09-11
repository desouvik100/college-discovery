import { College, Course, PlacementStats, Review, CollegeType } from "@prisma/client";

export type CollegeWithRelations = College & {
  courses: Course[];
  placementStats: PlacementStats[];
  reviews: Review[];
  admissionCutoffs?: any[];
};

export type CollegeListItem = {
  id: string;
  name: string;
  location: string;
  state: string;
  city: string;
  establishedYear: number;
  collegeType: CollegeType;
  rating: number;
  totalFees: number;
  imageUrl?: string | null;
  imageAlt?: string | null;
  imageSourceUrl?: string | null;
  websiteUrl?: string | null;
  latestPlacement?: {
    highestPackage: number;
    averagePackage: number;
    placementRate: number;
  } | null;
  coursesCount?: number;
  reviewsCount?: number;
};

export type PaginationData = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type CollegeListResponse = {
  colleges: CollegeListItem[];
  pagination: PaginationData;
  availableStates?: string[];
};

export type MatchTier = "STRONG" | "POSSIBLE" | "REACH";
export type ProbabilityCategory = MatchTier | "HIGH" | "MODERATE" | "LOW";

export type PredictionResult = {
  college: {
    id: string;
    name: string;
    location: string;
    state?: string;
    city?: string;
    rating: number;
    totalFees: number;
    collegeType?: string;
  };
  course: {
    name: string;
    fees: number;
    duration?: number;
  };
  cutoff: {
    openingRank: number;
    closingRank: number;
    year: number;
  };
  exam: {
    name: string;
    code: string;
  };
  probabilityCategory: ProbabilityCategory;
  matchTier: MatchTier;
  rankDifference: number;
  reason: string;
};

export type PredictionResponse = {
  predictions: PredictionResult[];
  userRank: number;
  examCode: string;
  category: string;
  summary: {
    strongCount: number;
    possibleCount: number;
    reachCount: number;
    totalMatches: number;
  };
};

export type UserPublicProfile = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export type SavedCollegeItem = {
  id: string;
  collegeId: string;
  savedAt: string;
  college: CollegeListItem;
};

export type SavedComparisonItem = {
  id: string;
  title?: string | null;
  savedAt: string;
  colleges: {
    id: string;
    collegeId: string;
    order: number;
    college: {
      id: string;
      name: string;
      city: string;
      state: string;
      rating: number;
      totalFees: number;
      imageUrl?: string | null;
      collegeType: string;
    };
  }[];
};

