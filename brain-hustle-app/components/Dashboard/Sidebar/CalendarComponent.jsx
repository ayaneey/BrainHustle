import React, { useState } from "react";

const CalendarComponent = () => {
	const hours = Array.from({ length: 24 }, (_, i) => i);
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const currentDate = new Date();
	const [currentHour] = useState(currentDate.getHours());

	// Get the dates for the current week
	const getDatesForWeek = () => {
		const dates = [];
		const today = new Date();
		const first = today.getDate() - today.getDay();

		for (let i = 0; i < 7; i++) {
			const date = new Date(today.setDate(first + i));
			dates.push(date.getDate());
		}
		return dates;
	};

	// Get all dates for the current month view
	const getDatesForMonth = () => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		const firstDay = new Date(year, month, 1).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const daysInPrevMonth = new Date(year, month, 0).getDate();

		const dates = [];

		// Previous month's dates
		for (let i = firstDay - 1; i >= 0; i--) {
			dates.push({
				date: daysInPrevMonth - i,
				isCurrentMonth: false,
			});
		}

		// Current month's dates
		for (let i = 1; i <= daysInMonth; i++) {
			dates.push({
				date: i,
				isCurrentMonth: true,
				isToday:
					i === currentDate.getDate() && month === currentDate.getMonth(),
			});
		}

		// Next month's dates
		const remainingDays = 42 - dates.length; // 6 rows * 7 days = 42
		for (let i = 1; i <= remainingDays; i++) {
			dates.push({
				date: i,
				isCurrentMonth: false,
			});
		}

		return dates;
	};

	const weekDates = getDatesForWeek();
	const monthDates = getDatesForMonth();

	// Mini Calendar for small screens
	const MiniCalendar = () => (
		<div className="bg-white rounded-lg shadow-lg p-4 max-w-sm mx-auto">
			<div className="mb-4">
				<div className="text-xl font-semibold text-center">
					{months[currentDate.getMonth()]} {currentDate.getFullYear()}
				</div>
			</div>
			<div className="grid grid-cols-7 gap-1 mb-2">
				{days.map((day) => (
					<div key={day} className="text-center text-sm text-gray-500">
						{day.slice(0, 1)}
					</div>
				))}
			</div>
			<div className="grid grid-cols-7 gap-1">
				{monthDates.map((date, index) => (
					<div
						key={index}
						className={`
              text-center py-2 text-sm rounded-full
              ${date.isCurrentMonth ? "text-gray-900" : "text-gray-400"}
              ${date.isToday ? "bg-blue-500 text-white" : ""}
              ${!date.isToday && date.isCurrentMonth ? "hover:bg-gray-100" : ""}
            `}
					>
						{date.date}
					</div>
				))}
			</div>
		</div>
	);

	// Week View Calendar (original)
	const WeekCalendar = () => (
		<div className="w-full h-screen max-h-[800px] bg-white rounded-lg shadow-lg overflow-hidden">
			{/* Header */}
			<div className="border-b">
				<div className="flex">
					<div className="w-16 border-r bg-gray-50" />
					<div className="flex-1">
						<div className="grid grid-cols-7">
							{days.map((day, index) => (
								<div
									key={day}
									className={`text-center py-4 border-r last:border-r-0 ${
										index === currentDate.getDay() ? "bg-blue-50" : ""
									}`}
								>
									<div className="text-sm text-gray-500">{day}</div>
									<div
										className={`text-2xl mt-1 ${
											index === currentDate.getDay()
												? "text-blue-600 font-semibold"
												: ""
										}`}
									>
										{weekDates[index]}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Calendar Grid */}
			<div className="flex h-full overflow-y-auto">
				{/* Time Column */}
				<div className="w-16 flex-shrink-0 border-r bg-gray-50">
					{hours.map((hour) => (
						<div
							key={hour}
							className="h-20 border-b text-xs text-gray-500 text-right pr-2 pt-1"
						>
							{hour === 0
								? "12 AM"
								: hour < 12
								? `${hour} AM`
								: hour === 12
								? "12 PM"
								: `${hour - 12} PM`}
						</div>
					))}
				</div>

				{/* Days Grid */}
				<div className="flex-1 relative">
					<div className="grid grid-cols-7 h-full">
						{days.map((day, dayIndex) => (
							<div key={day} className="border-r last:border-r-0">
								{hours.map((hour) => (
									<div key={hour} className="h-20 border-b relative">
										{/* Current time indicator */}
										{dayIndex === currentDate.getDay() &&
											hour === currentHour && (
												<div className="absolute w-full h-0.5 bg-red-500 z-10">
													<div className="absolute -left-1 -top-1 w-3 h-3 rounded-full bg-red-500" />
												</div>
											)}
									</div>
								))}
							</div>
						))}
					</div>

					{/* Current time line */}
					{currentDate.getDay() === new Date().getDay() && (
						<div
							className="absolute left-0 right-0 h-0.5 bg-red-500 z-10"
							style={{
								top: `${(currentHour + currentDate.getMinutes() / 60) * 5}rem`,
							}}
						>
							<div className="absolute -left-1 -top-1 w-3 h-3 rounded-full bg-red-500" />
						</div>
					)}
				</div>
			</div>
		</div>
	);

	return (
		<>
			{/* Show mini calendar on small screens, week view on md and up */}
			<div className="block md:hidden">
				<MiniCalendar />
			</div>
			<div className="hidden md:block">
				<WeekCalendar />
			</div>
		</>
	);
};

export default CalendarComponent;
