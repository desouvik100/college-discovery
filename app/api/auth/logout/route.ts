import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";

export async function POST() {
  clearSessionCookie();
  const response = NextResponse.json({ success: true });
  response.cookies.set("cd_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}

