import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "cd_session";
const SESSION_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

const AUTH_SECRET_STRING =
  process.env.AUTH_SECRET ||
  "development-fallback-secret-min-32-chars-college-discovery-2026";

const AUTH_SECRET_KEY = new TextEncoder().encode(AUTH_SECRET_STRING);

export interface SessionUser {
  userId: string;
  email: string;
  name: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({
    sub: user.userId,
    email: user.email,
    name: user.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(AUTH_SECRET_KEY);
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, AUTH_SECRET_KEY);
    if (!payload.sub || !payload.email || !payload.name) {
      return null;
    }
    return {
      userId: payload.sub as string,
      email: payload.email as string,
      name: payload.name as string,
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export function setSessionCookie(token: string): void {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export function clearSessionCookie(): void {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
