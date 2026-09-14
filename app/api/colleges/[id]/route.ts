import { NextRequest, NextResponse } from "next/server";
import { getCollegeById } from "@/services/collegeService";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const college = await getCollegeById(params.id);

    if (!college) {
      return NextResponse.json(
        { error: "College not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(college);
  } catch (error) {
    console.error("Error fetching college:", error);
    return NextResponse.json(
      { error: "Failed to fetch college details" },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
