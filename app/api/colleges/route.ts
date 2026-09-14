import { NextRequest, NextResponse } from "next/server";
import { collegeQuerySchema } from "@/lib/validation";
import { getColleges } from "@/services/collegeService";
import { ZodError } from "zod";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const params = Object.fromEntries(searchParams.entries());

    const query = collegeQuerySchema.parse(params);
    const result = await getColleges(query);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error fetching colleges:", error);
    return NextResponse.json(
      { error: "Failed to fetch colleges" },
      { status: 500 }
    );
  }
}
