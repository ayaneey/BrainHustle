// app/dashboard/page.jsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient"; // Don't forget this!

export default async function DashboardPage({ searchParams }) {
	const { userId } = await auth();

	if (!userId) {
		redirect("/sign-in");
	}

	return <DashboardClient searchParams={searchParams} />;
}
