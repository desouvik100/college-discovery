import { prisma } from "@/lib/db";
import { CollegeQuery } from "@/lib/validation";
import { Prisma } from "@prisma/client";

export async function getColleges(query: CollegeQuery) {
  const {
    search,
    state,
    minFees,
    maxFees,
    minRating,
    collegeType,
    page = 1,
    limit = 12,
    sortBy = "rating",
    sortOrder = "desc",
  } = query;

  const where: Prisma.CollegeWhereInput = {
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
        { city: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
        { state: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
        { location: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
      ],
    }),
    ...(state && { state }),
    ...(minFees !== undefined && { totalFees: { gte: minFees } }),
    ...(maxFees !== undefined && { totalFees: { lte: maxFees } }),
    ...(minRating !== undefined && { rating: { gte: minRating } }),
    ...(collegeType && { collegeType }),
  };

  let orderBy: Prisma.CollegeOrderByWithRelationInput = {};
  if (sortBy === "rating") {
    orderBy = { rating: sortOrder };
  } else if (sortBy === "fees") {
    orderBy = { totalFees: sortOrder };
  } else if (sortBy === "name") {
    orderBy = { name: sortOrder };
  } else {
    orderBy = { rating: "desc" };
  }

  const skip = (page - 1) * limit;

  const [colleges, total] = await Promise.all([
    prisma.college.findMany({
      where,
      select: {
        id: true,
        name: true,
        location: true,
        state: true,
        city: true,
        rating: true,
        totalFees: true,
        collegeType: true,
        establishedYear: true,
        imageUrl: true,
        imageAlt: true,
        imageSourceUrl: true,
        websiteUrl: true,
        placementStats: {
          orderBy: { year: "desc" },
          take: 1,
          select: {
            highestPackage: true,
            averagePackage: true,
            medianPackage: true,
            placementRate: true,
          },
        },
        _count: {
          select: {
            courses: true,
            reviews: true,
          },
        },
      },
      orderBy,
      skip,
      take: limit,
    }),
    prisma.college.count({ where }),
  ]);

  return {
    colleges: colleges.map((college) => ({
      id: college.id,
      name: college.name,
      location: college.location,
      state: college.state,
      city: college.city,
      establishedYear: college.establishedYear,
      collegeType: college.collegeType,
      rating: Number(college.rating),
      totalFees: college.totalFees,
      imageUrl: college.imageUrl,
      imageAlt: college.imageAlt,
      imageSourceUrl: college.imageSourceUrl,
      websiteUrl: college.websiteUrl,
      latestPlacement: college.placementStats[0]
        ? {
            highestPackage: college.placementStats[0].highestPackage,
            averagePackage: college.placementStats[0].averagePackage,
            placementRate: Number(college.placementStats[0].placementRate),
          }
        : null,
      coursesCount: college._count.courses,
      reviewsCount: college._count.reviews,
    })),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getCollegeById(id: string) {
  const college = await prisma.college.findUnique({
    where: { id },
    include: {
      courses: {
        orderBy: { name: "asc" },
      },
      placementStats: {
        orderBy: { year: "desc" },
        take: 3,
      },
      reviews: {
        orderBy: { createdAt: "desc" },
        take: 12,
      },
      admissionCutoffs: {
        include: {
          exam: true,
          course: true,
        },
        orderBy: { closingRank: "asc" },
        take: 20,
      },
    },
  });

  if (!college) {
    return null;
  }

  return {
    ...college,
    rating: Number(college.rating),
    placementStats: college.placementStats.map((stat) => ({
      ...stat,
      placementRate: Number(stat.placementRate),
    })),
  };
}

export async function compareColleges(ids: string[]) {
  const colleges = await prisma.college.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    include: {
      placementStats: {
        orderBy: { year: "desc" },
        take: 1,
      },
      courses: {
        take: 5,
        orderBy: { name: "asc" },
      },
      _count: {
        select: {
          courses: true,
          reviews: true,
        },
      },
    },
  });

  return colleges.map((college) => ({
    id: college.id,
    name: college.name,
    location: college.location,
    state: college.state,
    city: college.city,
    rating: Number(college.rating),
    totalFees: college.totalFees,
    collegeType: college.collegeType,
    establishedYear: college.establishedYear,
    imageUrl: college.imageUrl,
    imageAlt: college.imageAlt,
    coursesCount: college._count.courses,
    reviewsCount: college._count.reviews,
    courses: college.courses.map((c) => c.name),
    placementStats: college.placementStats[0]
      ? {
          averagePackage: college.placementStats[0].averagePackage,
          highestPackage: college.placementStats[0].highestPackage,
          medianPackage: college.placementStats[0].medianPackage,
          placementRate: Number(college.placementStats[0].placementRate),
          topRecruiters: college.placementStats[0].topRecruiters,
        }
      : null,
  }));
}

export async function getFeaturedColleges() {
  let colleges = await prisma.college.findMany({
    where: {
      imageUrl: { not: null },
    },
    take: 6,
    orderBy: [
      { rating: "desc" },
      { establishedYear: "asc" },
    ],
    select: {
      id: true,
      name: true,
      location: true,
      state: true,
      city: true,
      rating: true,
      totalFees: true,
      collegeType: true,
      establishedYear: true,
      imageUrl: true,
      imageAlt: true,
      imageSourceUrl: true,
      placementStats: {
        orderBy: { year: "desc" },
        take: 1,
        select: {
          highestPackage: true,
          averagePackage: true,
          placementRate: true,
        },
      },
    },
  });

  if (colleges.length === 0) {
    colleges = await prisma.college.findMany({
      take: 6,
      orderBy: [{ rating: "desc" }],
      select: {
        id: true,
        name: true,
        location: true,
        state: true,
        city: true,
        rating: true,
        totalFees: true,
        collegeType: true,
        establishedYear: true,
        imageUrl: true,
        imageAlt: true,
        imageSourceUrl: true,
        placementStats: {
          orderBy: { year: "desc" },
          take: 1,
          select: {
            highestPackage: true,
            averagePackage: true,
            placementRate: true,
          },
        },
      },
    });
  }

  return colleges.map((c) => ({
    ...c,
    rating: Number(c.rating),
    latestPlacement: c.placementStats[0]
      ? {
          highestPackage: c.placementStats[0].highestPackage,
          averagePackage: c.placementStats[0].averagePackage,
          placementRate: Number(c.placementStats[0].placementRate),
        }
      : null,
  }));
}
