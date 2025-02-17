import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
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

export default clerkMiddleware((auth, request) => {
  const { nextUrl, headers } = request;
  const host = headers.get("host"); // Get the domain name from the request headers

  if (
    nextUrl.pathname.startsWith("/live/") ||
    nextUrl.pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  if (!isPublicRoute(request)) {
    // Add await here
    auth().protect();
    return NextResponse.next();
  }

  if (
    host === "localhost:3000" ||
    host === "competiboard.vercel.app" ||
    host === "competiboard.com"
  ) {
    return NextResponse.next(); // Allow access for your main domain
  } else {
    // Redirect to your main domain if the request is not for /live/*
    return NextResponse.redirect(
      new URL("https://competiboard.com", request.url)
    );
  }
});
