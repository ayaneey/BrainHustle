import React from "react";
import ToDoList from "./ToDoList/ToDoList";
import CalendarComponent from "../Sidebar/CalendarComponent";
import Today from "../TodayCourse/Today";

const Journal = () => {
	return (
		<div className="min-h-screen bg-white/10">
			{/* Title at the top */}
			<div className="w-full text-center py-6">
				<h1 className="text-3xl font-bold">Daily Diary</h1>
			</div>
			<div className="w-full lg:mx-24 lg:mt-3 lg:mb-6">
				<Today />
			</div>
			<div className="flex flex-col items-center p-4 space-y-8">
				{/* First component: ToDoList */}
				<div className="w-full max-w-4xl">
					<ToDoList />
				</div>
			</div>
		</div>
	);
};

export default Journal;
