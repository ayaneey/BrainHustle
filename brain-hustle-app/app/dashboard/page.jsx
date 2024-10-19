import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient"; // Client-side dashboard logic

export default function Page({ searchParams }) {
	const cookieStore = cookies(); // Get cookies on the server-side
	const token = cookieStore.get("token"); // Retrieve the token from cookies
	console.log(token, "this is my token"); // For debugging purposes

	// If no session exists, redirect to login
	if (!token) {
		redirect("/login");
	}

	// If session exists, render the client-side dashboard
	return <DashboardClient searchParams={searchParams} />;
}
