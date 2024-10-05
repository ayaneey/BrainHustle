"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import Home from "../page";
// Here components are imported from the components folder. They will be used to render the dashboard page through the Content variable.
import Journal from "../../components/Dashboard/Journal/Journal";
import Calendar from "../../components/Dashboard/Sidebar/Calendar";
import Settings from "../../components/Dashboard/Sidebar/Settings";

function page() {
	const searchParams = useSearchParams(); // This line creates a variable searchParams that holds all the search parameters from the URL.
	const section = searchParams.get("section"); // This is the section of the dashboard that the user is currently viewing. This line extracts the value of the section parameter from the URL.
	// For example, if the URL is /dashboard?section=calendar, section will re-render to the "calendar" component

	let Content; // This line declares a variable 'Content' which basically will be used to hold the component you want to display (from above).

	switch (
		section //This switch statement helps decide which dashboard component to show based on what the user selected. For instance, if the user clicks the "Calendar" link on the sidebar, the Content will be set to Calendar
	) {
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
			Content = "Null";
			break;
	}

	return (
		<div className="flex justify-center items-center min-h-screen p-4">
			<div className="flex flex-col sm:flex-row w-full max-w-6xl p-6 sm:p-10 rounded-lg overflow-hidden bg-dashboardDrop shadow-lg min-h-screen lg-phone:justify-center lg-phone:items-center xl-phone:justify-center xl-phone:items-center sm-tablet:justify-center sm-tablet:items-center">
				<div className="w-full sm:w-1/4">
					<Sidebar selectedSection={section} />
					{/* Sidebar navigation */}
				</div>
				<div className="flex-1 sm:ml-5 text-white text-lg lg:text-2xl lg:text-center lg-phone:w-3/4">
					<Content />
					{/* Content that re-renders based on what user selects */}
				</div>
			</div>
		</div>
	);
}

export default page;
