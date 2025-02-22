import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/data(.*)",
  "/display(.*)",
  "/live(.*)",
  "/board(.*)",
  "/checkout(.*)",
  "/settings(.*)",
]);

export default clerkMiddleware((auth, request) => {
  const { nextUrl, headers } = request;
  const host = headers.get("host"); // Get the domain name from the request headers

  if (!isProtectedRoute(request)) {
    return NextResponse.next(); // Allow access to public routes
  }

  auth().protect(); // Protect specified routes

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
