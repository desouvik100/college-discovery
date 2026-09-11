import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const comparison = await prisma.savedComparison.findFirst({
      where: {
        id: params.id,
        userId: session.userId,
      },
      include: {
        colleges: {
          orderBy: { order: "asc" },
          include: {
            college: true,
          },
        },
      },
    });

    if (!comparison) {
      return NextResponse.json(
        { error: "Saved comparison not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ comparison });
  } catch (error) {
    console.error("Get saved comparison error:", error);
    return NextResponse.json(
      { error: "Unable to retrieve comparison. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { count } = await prisma.savedComparison.deleteMany({
      where: {
        id: params.id,
        userId: session.userId,
      },
    });

    if (count === 0) {
      return NextResponse.json(
        { error: "Comparison not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete saved comparison error:", error);
    return NextResponse.json(
      { error: "Unable to delete saved comparison. Please try again." },
      { status: 500 }
    );
  }
}
