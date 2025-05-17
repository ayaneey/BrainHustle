import React from "react";
import ToDoList from "./ToDoList/ToDoList";
import Thoughts from "../Notepad/Thoughts";
import LearningChart from "../LearningGraph/LearningChart";

const Journal = () => {
	return (
		<div className="min-h-screen bg-MiddleSection2 px-4 py-6">
			{/* Page Title */}
			<div className="text-center mb-8">
				<h1 className="text-3xl sm:text-4xl font-bold text-box">Dashboard</h1>
			</div>

			{/* Two-column layout on larger screens, stacked on small screens */}
			<div className="flex flex-col lg:flex-row justify-center gap-8 items-start w-full max-w-6xl mx-auto">
				{/* Notepad on the left */}
				<div className="w-full lg:w-1/2">
					<Thoughts />
				</div>

				{/* ToDoList on the right */}
				<div className="w-full lg:w-1/2">
					<ToDoList />
				</div>
			</div>
			<div className="mt-10">
				<LearningChart />
			</div>
		</div>
	);
};

export default Journal;
