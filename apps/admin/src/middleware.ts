import { NextRequest, NextResponse } from "next/server";

export const privateRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const isPrivateRoute = privateRoutes.includes(request.nextUrl.pathname);

  if (isPrivateRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }

    const resp = await fetch(`${process.env.BACKEND_URL}/auth/admin`, {
      headers: { Cookie: `session=${session.value}` },
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
