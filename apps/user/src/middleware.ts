import { NextRequest, NextResponse } from "next/server";

export const privateRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const isPrivateRoute = privateRoutes.includes(request.nextUrl.pathname);

  if (isPrivateRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }

    try {
      const resp = await fetch(`${process.env.BACKEND_URL}/auth/user`, {
        headers: {
          Cookie: `session=${session.value}`,
          Origin: process.env.ORIGIN!,
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
