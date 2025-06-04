import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define which routes should be protected
const isProtectedRoute = createRouteMatcher([
	"/dashboard(.*)",
	"/account(.*)",
	"/benefits(.*)",
	"/api/todos(.*)",
	"/api/thoughts(.*)",
]);

const middleware = clerkMiddleware((auth, req) => {
	// Protect the routes that require authentication
	if (isProtectedRoute(req)) {
		auth.protect(); // Changed from auth().protect() to auth.protect()
	}

	return NextResponse.next();
});

export default middleware;

export const config = {
	matcher: [
		// Match all paths except static files and _next
		"/((?!.*\\..*|_next).*)",
		"/",
		"/(api|trpc)(.*)",
	],
};
