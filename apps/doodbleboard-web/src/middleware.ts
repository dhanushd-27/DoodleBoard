import { Verify } from "@/utils/auth/isAuthenticated";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/canvas/", "/dashboard"]; // Use startsWith instead of wildcard

export async function middleware(req: NextRequest) {
  try {
    const isValid = await Verify(); // Ensure Verify() is properly handled

    // Redirect if not authenticated and accessing a protected route
    if (!isValid && protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next(); // Proceed if authorized
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", req.url)); // Fail-safe redirect
  }
}

export const config = {
  matcher: ['/canvas/:path*', "/dashboard"],
}