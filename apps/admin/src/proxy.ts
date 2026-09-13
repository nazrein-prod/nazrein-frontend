import { NextRequest, NextResponse } from "next/server";

import { serverApi } from "@/lib/api";

export const privateRoutes = ["/dashboard"];

/**
 * Renamed from `middleware` in Next 16, which deprecated the middleware file
 * convention in favour of `proxy`. Note this runs on the Node runtime, not Edge.
 */
export async function proxy(request: NextRequest) {
  if (!isPrivateRoute(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const session = request.cookies.get("nazrein_admin_session");
  if (!session) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  try {
    const { error } = await serverApi({
      Cookie: `nazrein_admin_session=${session.value}`,
    }).GET("/auth/admin", {});

    if (error !== undefined) {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }
  } catch (error) {
    // Fail closed: if we cannot confirm the session, treat it as signed out.
    console.error("Error checking admin session:", error);
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  return NextResponse.next();
}

/**
 * Matches nested paths too — an exact-equality check left `/dashboard/settings`
 * and anything else below a private route unprotected.
 */
function isPrivateRoute(pathname: string) {
  return privateRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export const config = {
  matcher: "/((?!_next|_vercel|monitoring|.*\\..*).*)",
};
