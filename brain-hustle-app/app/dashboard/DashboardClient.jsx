"use client";

import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import Settings from "../../components/Dashboard/Sidebar/Settings";
import AffirmationQuote from "../../components/Dashboard/Sidebar/Affirmations";
import CalendarComponent from "../../components/Dashboard/Sidebar/CalendarComponent";
import UpcomingQuizzes from "../../components/Dashboard/UpcomingQuizzes/UpcomingQuizzes";
import Maths from "../../components/Dashboard/LearningGraph/Quiz/Maths/Maths";
import English from "../../components/Dashboard/LearningGraph/Quiz/English/English";
import Science from "../../components/Dashboard/LearningGraph/Quiz/Science/Science";
import PreviousScores from "../../components/Dashboard/PreviousScores/PreviousScores";

export default function DashboardClient({ searchParams }) {
	const section = searchParams?.section;
	const isSubjectView = ["maths", "english", "science"].includes(section);
	const isSettingsView = section === "settings";

	const Content = (() => {
		switch (section) {
			case "maths":
				return <Maths />;
			case "english":
				return <English />;
			case "science":
				return <Science />;
			case "settings":
				return <Settings />;
			default:
				return (
					<div className="flex flex-col gap-4 w-full">
						{/* Overview Card */}
						<div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
							<h2 className="text-lg sm:text-xl font-semibold text-box mb-2">
								Dashboard Overview
							</h2>
							<p className="text-secondTextColor text-sm sm:text-base">
								Your daily dashboard is ready. Stay consistent, stay sharp!
							</p>
						</div>

						{/* Previous Scores Card */}
						{!isSubjectView && (
							<div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full">
								<PreviousScores />
							</div>
						)}
						<div
							className="animate-fade-in-up sm-tablet:col-span-2 2xl-tablet:col-span-1"
							style={{ animationDelay: "0.4s" }}
						>
							<UpcomingQuizzes />
						</div>
					</div>
				);
		}
	})();

	return (
		<div className="flex flex-col justify-start items-center min-h-screen p-2 sm-tablet:p-4 bg-dashboardBg gap-4">
			<div className="w-full max-w-7xl p-3 sm-tablet:p-6 rounded-lg shadow-lg bg-BackgroundAccent">
				{/* Mobile & Small Tablet Layout */}
				<div className="flex flex-col gap-4 lg-tablet:hidden">
					<div className="w-full">
						<Sidebar selectedSection={section} />
					</div>
					<div className="w-full">{Content}</div>

					{/* Only show these extra components if not in subject or settings view */}
					{!isSubjectView && !isSettingsView && (
						<>
							<div className="w-full">
								<CalendarComponent />
							</div>
							<div className="w-full">
								<AffirmationQuote />
							</div>
						</>
					)}
				</div>

				{/* Medium Tablet Layout */}
				<div className="hidden lg-tablet:flex 2xl-tablet:hidden flex-col gap-5">
					<div className="flex gap-5">
						<div className="w-1/3">
							<Sidebar selectedSection={section} />
						</div>
						<div className="w-2/3">{Content}</div>
					</div>

					{!isSubjectView && !isSettingsView && (
						<div className="flex gap-5 mt-5">
							<div className="w-1/2">
								<CalendarComponent />
							</div>
							<div className="w-1/2">
								<AffirmationQuote />
							</div>
						</div>
					)}
				</div>

				{/* Desktop Layout */}
				<div className="hidden 2xl-tablet:flex gap-6">
					<div className="w-1/5 min-w-[220px]">
						<Sidebar selectedSection={section} />
					</div>
					<div className="flex-1">{Content}</div>

					{!isSubjectView && !isSettingsView && (
						<div className="w-1/4 min-w-[280px] flex flex-col gap-6">
							<CalendarComponent />
							<AffirmationQuote />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
