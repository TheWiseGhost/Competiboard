import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
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
  "/sitemap.txt",
  "/terms",
  "/privacy",
]);

export default clerkMiddleware((auth, request) => {
  const { nextUrl, headers } = request;
  const host = headers.get("host"); // Get the domain name from the request headers

  // If the request is for any /live/* path, allow it to proceed
  if (nextUrl.pathname.startsWith("/live/")) {
    return NextResponse.next();
  }

  if (nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next(); // Allow the webhook to proceed
  }

  // Apply Clerk authentication protection for non-public routes on any domain
  if (!isPublicRoute(request)) {
    auth().protect();
    return NextResponse.next(); // Allow the protected route to proceed
  }

  // If the request is for any path other than /live/*, ensure it's from your main domain
  if (host === "localhost:3000") {
    return NextResponse.next(); // Allow access for your main domain
  } else {
    // Redirect to your main domain if the request is not for /live/*
    return NextResponse.redirect(new URL("http://localhost:3000", request.url));
  }
});
