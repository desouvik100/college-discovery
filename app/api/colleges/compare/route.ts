import { NextRequest, NextResponse } from "next/server";
import { collegeCompareSchema } from "@/lib/validation";
import { compareColleges } from "@/services/collegeService";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const ids = searchParams.get("ids");

    if (!ids) {
      return NextResponse.json(
        { error: "College IDs are required" },
        { status: 400 }
      );
    }

    const { ids: collegeIds } = collegeCompareSchema.parse({ ids });
    const colleges = await compareColleges(collegeIds);

    if (colleges.length === 0) {
      return NextResponse.json(
        { error: "No colleges found with the provided IDs" },
        { status: 404 }
      );
    }

    return NextResponse.json({ colleges });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid college IDs. Please provide 2-3 valid UUIDs separated by commas." },
        { status: 400 }
      );
    }

    console.error("Error comparing colleges:", error);
    return NextResponse.json(
      { error: "Failed to compare colleges" },
      { status: 500 }
    );
  }
}
