import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ user: null, savedCollegeIds: [] });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        savedColleges: {
          select: {
            collegeId: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ user: null, savedCollegeIds: [] });
    }

    const savedCollegeIds = user.savedColleges.map((s) => s.collegeId);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt.toISOString(),
      },
      savedCollegeIds,
    });
  } catch (error) {
    console.error("Auth session check error:", error);
    return NextResponse.json({ user: null, savedCollegeIds: [] });
  }
}
