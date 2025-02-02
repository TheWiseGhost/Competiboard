import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/api(.*)",
  "/live(.*)",
  "/sitemap.txt",
  "/terms",
  "/privacy",
]);

export default clerkMiddleware(async (auth, request) => {
  const { nextUrl, headers } = request;

  // Allow requests to /live/* and /api/*
  if (
    nextUrl.pathname.startsWith("/live/") ||
    nextUrl.pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  // Redirect to sign-in if the route is protected and user is not authenticated
  if (!isPublicRoute(request)) {
    await auth.protect();
    return NextResponse.next();
  }
});
