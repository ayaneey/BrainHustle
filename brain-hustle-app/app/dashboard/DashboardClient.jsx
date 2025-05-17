"use client";

import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import Journal from "../../components/Dashboard/Journal/Journal";
import Settings from "../../components/Dashboard/Sidebar/Settings";
import AffirmationQuote from "../../components/Dashboard/Sidebar/Affirmations";
import CalendarComponent from "../../components/Dashboard/Sidebar/CalendarComponent";
import UpcomingQuizzes from "../../components/Dashboard/UpcomingQuizzes/UpcomingQuizzes";

export default function DashboardClient({ searchParams }) {
	const section = searchParams.section;

	let Content;
	switch (section) {
		case "journal":
			Content = Journal;
			break;
		case "settings":
			Content = Settings;
			break;
		default:
			Content = Journal;
			break;
	}

	return (
		<div className="flex justify-center items-start min-h-screen p-2 sm-tablet:p-4 bg-dashboardBg">
			<div
				className="
          w-full max-w-7xl
          p-3 sm-tablet:p-6
          rounded-lg shadow-lg
          bg-BackgroundAccent
        "
			>
				{/* Mobile & Small Tablet Layout (up to 767px) */}
				<div className="flex flex-col gap-4 lg-tablet:hidden">
					<div className="w-full">
						<Sidebar selectedSection={section} />
					</div>
					<div className="w-full">
						<Content />
					</div>
					<div className="w-full">
						<CalendarComponent />
					</div>
					<div className="w-full">
						<AffirmationQuote />
					</div>
					<div className="w-full">
						<UpcomingQuizzes />
					</div>
				</div>

				{/* Medium Tablet Layout (768px to 1023px) */}
				<div className="hidden lg-tablet:flex 2xl-tablet:hidden flex-col gap-5">
					<div className="flex gap-5">
						<div className="w-1/3">
							<Sidebar selectedSection={section} />
						</div>
						<div className="w-2/3">
							<Content />
						</div>
					</div>
					<div className="flex gap-5 mt-5">
						<div className="w-1/2">
							<CalendarComponent />
						</div>
						<div className="w-1/2">
							<AffirmationQuote />
						</div>
						<div className="w-1/2">
							<UpcomingQuizzes />
						</div>
					</div>
				</div>

				{/* Desktop Layout (1024px and above) */}
				<div className="hidden 2xl-tablet:flex gap-6">
					<div className="w-1/5 min-w-[220px]">
						<Sidebar selectedSection={section} />
					</div>
					<div className="flex-1">
						<Content />
					</div>
					<div className="w-1/4 min-w-[280px] flex flex-col gap-6">
						<CalendarComponent />
						<AffirmationQuote />
						<UpcomingQuizzes />
					</div>
				</div>
			</div>
		</div>
	);
}
