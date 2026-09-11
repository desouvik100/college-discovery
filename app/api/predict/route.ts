import { NextRequest, NextResponse } from "next/server";
import { predictRequestSchema } from "@/lib/validation";
import { predictColleges } from "@/services/predictorService";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const predictRequest = predictRequestSchema.parse(body);
    const result = await predictColleges(predictRequest);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === "Invalid exam code") {
      return NextResponse.json(
        { error: "Invalid exam code" },
        { status: 400 }
      );
    }

    console.error("Error predicting colleges:", error);
    return NextResponse.json(
      { error: "Failed to predict colleges" },
      { status: 500 }
    );
  }
}
