import { NextRequest, NextResponse } from "next/server";

export const privateRoutes = ["/dashboard"];

const BACKEND_URL = "http://server:8080";
const ORIGIN = "http://localhost:3000";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("nazrein_session");
  const isPrivateRoute = privateRoutes.includes(request.nextUrl.pathname);

  if (isPrivateRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }

    try {
      const resp = await fetch(`${BACKEND_URL}/auth/user`, {
        headers: {
          Cookie: `nazrein_session=${session.value}`,
          Origin: ORIGIN,
        },
      });
      if (!resp.ok) {
        console.error("resp.ok is false");
        return NextResponse.redirect(new URL("/", request.nextUrl.origin));
      }
    } catch (error) {
      console.error("Error checking user session:", error);
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next|_vercel|monitoring|.*\\..*).*)",
};
