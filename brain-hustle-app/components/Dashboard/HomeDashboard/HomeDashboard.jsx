"use client";

import React from "react";
import CalendarComponent from "../Sidebar/CalendarComponent";
import AffirmationQuote from "../Sidebar/Affirmations";
import UpcomingQuizzes from "../UpcomingQuizzes/UpcomingQuizzes";

const HomeDashboard = () => {
	return (
		<div className="flex flex-col gap-6">
			<div className="bg-white p-6 rounded-lg shadow text-box">
				<h2 className="text-xl font-bold mb-2"> Dashboard Overview </h2>
				<p className="text-secondTextColor text-base">
					Your daily dashboard is ready. Stay consistent, stay sharp!
				</p>
			</div>
			<CalendarComponent />
			<AffirmationQuote />
			<UpcomingQuizzes />
		</div>
	);
};

export default HomeDashboard;
