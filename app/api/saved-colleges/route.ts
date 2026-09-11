import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { saveCollegeSchema } from "@/lib/validation";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const savedRecords = await prisma.savedCollege.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
      include: {
        college: {
          include: {
            placementStats: {
              orderBy: { year: "desc" },
              take: 1,
            },
            _count: {
              select: {
                courses: true,
                reviews: true,
              },
            },
          },
        },
      },
    });

    const savedColleges = savedRecords.map((record) => {
      const { college } = record;
      const latestPlacement = college.placementStats?.[0];

      return {
        id: record.id,
        collegeId: record.collegeId,
        savedAt: record.createdAt.toISOString(),
        college: {
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
          coursesCount: college._count.courses,
          reviewsCount: college._count.reviews,
          latestPlacement: latestPlacement
            ? {
                highestPackage: latestPlacement.highestPackage,
                averagePackage: latestPlacement.averagePackage,
                placementRate: Number(latestPlacement.placementRate),
              }
            : null,
        },
      };
    });

    return NextResponse.json({ savedColleges });
  } catch (error) {
    console.error("Fetch saved colleges error:", error);
    return NextResponse.json(
      { error: "Unable to load saved colleges. Please try again." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Please sign in to save colleges" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const result = saveCollegeSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || "Invalid college identifier";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { collegeId } = result.data;

    const collegeExists = await prisma.college.findUnique({
      where: { id: collegeId },
      select: { id: true },
    });

    if (!collegeExists) {
      return NextResponse.json(
        { error: "College does not exist" },
        { status: 404 }
      );
    }

    const saved = await prisma.savedCollege.upsert({
      where: {
        userId_collegeId: {
          userId: session.userId,
          collegeId,
        },
      },
      update: {},
      create: {
        userId: session.userId,
        collegeId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        savedCollege: {
          id: saved.id,
          collegeId: saved.collegeId,
          savedAt: saved.createdAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Save college error:", error);
    return NextResponse.json(
      { error: "Unable to save college right now. Please try again." },
      { status: 500 }
    );
  }
}
