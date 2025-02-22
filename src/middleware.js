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
  const host = headers.get("host");

  if (!isProtectedRoute(request)) {
    return NextResponse.next();
  }

  auth().protect();

  if (
    host === "localhost:3000" ||
    host === "competiboard.vercel.app" ||
    host === "competiboard.com"
  ) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(
      new URL("https://competiboard.com", request.url)
    );
  }
});
