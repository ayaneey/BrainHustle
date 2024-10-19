// In /app/api/logout/route.js (or wherever your API routes are)
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
	const cookieStore = cookies();

	// Clear the token from cookies by setting it with an expired date
	cookieStore.set("token", "", {
		expires: new Date(0), // Expire the cookie
		path: "/", // Make sure it applies to the whole domain
	});

	return NextResponse.json(
		{ message: "Logged out successfully" },
		{ status: 200 }
	);
}
