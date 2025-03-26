import { NextResponse } from "next/server";

export function middleware(req) {
  // Check if user is logged in (replace this with your actual auth logic)
  const isAuthenticated = req.cookies.get("token"); // Assuming token is stored in cookies

  const { pathname } = req.nextUrl;

  // Define protected routes
  const protectedRoutes = [
    "/",
    "/dashboard",
    "/products",
    "/catergories",
    "/settings",
  ];

  // Check if the requested path is a protected route
  if (
    !isAuthenticated &&
    protectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/products/:path*",
    "/settings",
    "/catergories",
    "/settings/:path*",
  ], // Protecting these routes
};
