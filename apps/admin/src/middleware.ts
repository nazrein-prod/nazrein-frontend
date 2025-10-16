import { env } from "next-runtime-env";
import { NextRequest, NextResponse } from "next/server";

export const privateRoutes = ["/dashboard"];

// const BACKEND_URL = "http://server:8080";
// const ORIGIN = "http://localhost:3001";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("nazrein_admin_session");
  const isPrivateRoute = privateRoutes.includes(request.nextUrl.pathname);

  if (isPrivateRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }

    const resp = await fetch(`${env("NEXT_PUBLIC_BACKEND_URL")}/auth/admin`, {
      headers: {
        Cookie: `nazrein_admin_session=${session.value}`,
        Origin: env("NEXT_PUBLIC_ORIGIN")!,
      },
    });

    if (!resp.ok) {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next|_vercel|monitoring|.*\\..*).*)",
};
