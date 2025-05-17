import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const middleware = clerkMiddleware((auth, req) => {
	return NextResponse.next();
});

export default middleware;

export const config = {
	matcher: [
		"/dashboard(.*)",
		"/account(.*)",
		"/benefits(.*)",
		"/api/todos(.*)",
		"/api/thoughts(.*)",
	],
};
