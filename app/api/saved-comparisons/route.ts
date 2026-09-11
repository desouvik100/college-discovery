import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { saveComparisonSchema } from "@/lib/validation";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const comparisons = await prisma.savedComparison.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
      include: {
        colleges: {
          orderBy: { order: "asc" },
          include: {
            college: {
              select: {
                id: true,
                name: true,
                city: true,
                state: true,
                rating: true,
                totalFees: true,
                imageUrl: true,
                collegeType: true,
              },
            },
          },
        },
      },
    });

    const formatted = comparisons.map((c) => ({
      id: c.id,
      title: c.title,
      savedAt: c.createdAt.toISOString(),
      colleges: c.colleges.map((item) => ({
        id: item.id,
        collegeId: item.collegeId,
        order: item.order,
        college: {
          id: item.college.id,
          name: item.college.name,
          city: item.college.city,
          state: item.college.state,
          rating: Number(item.college.rating),
          totalFees: item.college.totalFees,
          imageUrl: item.college.imageUrl,
          collegeType: item.college.collegeType,
        },
      })),
    }));

    return NextResponse.json({ savedComparisons: formatted });
  } catch (error) {
    console.error("Fetch saved comparisons error:", error);
    return NextResponse.json(
      { error: "Unable to load saved comparisons. Please try again." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Please sign in to save comparisons" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const result = saveComparisonSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || "Invalid comparison data";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { collegeIds, title } = result.data;

    const colleges = await prisma.college.findMany({
      where: { id: { in: collegeIds } },
      select: { id: true, name: true },
    });

    if (colleges.length !== collegeIds.length) {
      return NextResponse.json(
        { error: "One or more selected colleges were not found" },
        { status: 400 }
      );
    }

    const collegeNameMap = new Map(colleges.map((c) => [c.id, c.name]));
    const defaultTitle =
      title ||
      collegeIds
        .map((id) => collegeNameMap.get(id))
        .filter(Boolean)
        .join(" vs ");

    const savedComparison = await prisma.$transaction(async (tx) => {
      const comparison = await tx.savedComparison.create({
        data: {
          userId: session.userId,
          title: defaultTitle,
        },
      });

      await tx.savedComparisonCollege.createMany({
        data: collegeIds.map((collegeId, index) => ({
          comparisonId: comparison.id,
          collegeId,
          order: index,
        })),
      });

      return comparison;
    });

    return NextResponse.json(
      {
        success: true,
        comparison: {
          id: savedComparison.id,
          title: savedComparison.title,
          collegeIds,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Save comparison error:", error);
    return NextResponse.json(
      { error: "Unable to save comparison right now. Please try again." },
      { status: 500 }
    );
  }
}
