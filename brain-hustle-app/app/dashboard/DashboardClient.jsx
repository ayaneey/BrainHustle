"use client"; // Mark this component as client-side

import { useEffect } from "react";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import { useRouter } from "next/navigation"; // For client-side navigation
import Journal from "../../components/Dashboard/Journal/Journal";
import Calendar from "../../components/Dashboard/Sidebar/Calendar";
import Settings from "../../components/Dashboard/Sidebar/Settings";

export default function DashboardClient({ searchParams }) {
	const router = useRouter(); // For client-side redirects

	// // Client-side session check
	// useEffect(() => {
	// 	const isLoggedIn = document.cookie.includes("session="); // Check if session exists
	// 	if (!isLoggedIn) {
	// 		router.push("/login"); // Redirect to login if no session found
	// 	}
	// }, [router]);

	const section = searchParams.section;

	let Content;
	switch (section) {
		case "journal":
			Content = Journal;
			break;
		case "calendar":
			Content = Calendar;
			break;
		case "settings":
			Content = Settings;
			break;
		default:
			Content = Journal;
			break;
	}

	return (
		<div className="flex justify-center items-center min-h-screen p-4">
			<div className="flex flex-col sm:flex-row w-full max-w-6xl p-6 sm:p-10 rounded-lg overflow-hidden bg-dashboardDrop shadow-lg min-h-screen lg-phone:justify-center lg-phone:items-center xl-phone:justify-center xl-phone:items-center sm-tablet:justify-center sm-tablet:items-center">
				<div className="w-full sm:w-1/4">
					<Sidebar selectedSection={section} />
				</div>
				<div className="flex-1 sm:ml-5 text-white text-lg lg:text-2xl lg:text-center lg-phone:w-3/4">
					<Content />
				</div>
			</div>
		</div>
	);
}
