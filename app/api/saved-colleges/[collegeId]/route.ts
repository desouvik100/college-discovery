import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { collegeId: string } }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { collegeId } = params;

    if (!collegeId) {
      return NextResponse.json(
        { error: "College identifier is required" },
        { status: 400 }
      );
    }

    await prisma.savedCollege.deleteMany({
      where: {
        userId: session.userId,
        collegeId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Remove saved college error:", error);
    return NextResponse.json(
      { error: "Unable to remove saved college. Please try again." },
      { status: 500 }
    );
  }
}
