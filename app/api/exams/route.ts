import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const exams = await prisma.exam.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        description: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({ exams });
  } catch (error) {
    console.error("Error fetching exams:", error);
    return NextResponse.json(
      { error: "Failed to fetch exams" },
      { status: 500 }
    );
  }
}
