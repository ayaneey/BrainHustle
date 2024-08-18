"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import Home from "../page";
// Here components are imported from the components folder. They will be used to render the dashboard page through the Content variable.
import Journal from "../../components/Dashboard/Sidebar/Journal";
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
			Content = Home;
			break;
	}

	return (
		<div className="flex justify-center items-start min-h-screen p-4 ">
			<div className="flex flex-col sm:flex-row w-full max-w-6xl p-14 rounded-lg overflow-hidden bg-dashboardDrop shadow-lg min-h-screen">
				<div className="w-full sm:w-1/4 ">
					<Sidebar /> {/* The sidebar component holds the navigational menu */}
				</div>
				<div className="flex-1 bg-white/60 text-white lg:text-3xl lg:text-center md-phone:p-10 md-phone:ml-10 md-phone:pt-12 md-phone:pr-12 md-phone:pb-12 md-phone:pl-12 md-phone:text-center">
					<Content />{" "}
					{/* This is Content that re-renders based on what user selects onto the dashboard */}
				</div>
			</div>
		</div>
	);
}

export default page;
