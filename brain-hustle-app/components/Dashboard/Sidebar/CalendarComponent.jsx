import React, { useState, useRef } from "react";
import {
	Calendar as CalendarIcon,
	ChevronLeft,
	ChevronRight,
	Plus,
	X,
	Clock,
	Save,
	Trash2,
	RotateCcw,
} from "lucide-react";

const CalendarComponent = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(null);
	const [showEventModal, setShowEventModal] = useState(false);
	const [showYearPicker, setShowYearPicker] = useState(false);
	const [events, setEvents] = useState({});
	const [eventForm, setEventForm] = useState({
		title: "",
		time: "",
		description: "",
	});
	const [editingEventId, setEditingEventId] = useState(null);

	const touchStartX = useRef(0);
	const touchEndX = useRef(0);

	const today = new Date();
	const currentMonth = currentDate.getMonth();
	const currentYear = currentDate.getFullYear();

	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	// Generate year options (current year ± 5 years)
	const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

	const getDaysInMonth = (date) => {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	};

	const getFirstDayOfMonth = (date) => {
		return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	};

	const navigateMonth = (direction) => {
		const newDate = new Date(currentDate);
		newDate.setMonth(currentDate.getMonth() + direction);
		setCurrentDate(newDate);
	};

	const changeYear = (year) => {
		const newDate = new Date(currentDate);
		newDate.setFullYear(year);
		setCurrentDate(newDate);
		setShowYearPicker(false);
	};

	// Jump to today function
	const jumpToToday = () => {
		setCurrentDate(new Date());
		setShowYearPicker(false);
	};

	// Check if current view is showing today's month
	const isCurrentMonth = () => {
		return (
			currentMonth === today.getMonth() && currentYear === today.getFullYear()
		);
	};

	// Touch/Swipe handlers
	const handleTouchStart = (e) => {
		touchStartX.current = e.targetTouches[0].clientX;
	};

	const handleTouchMove = (e) => {
		touchEndX.current = e.targetTouches[0].clientX;
	};

	const handleTouchEnd = () => {
		const diffX = touchStartX.current - touchEndX.current;
		const threshold = 50;

		if (Math.abs(diffX) > threshold) {
			if (diffX > 0) {
				navigateMonth(1);
			} else {
				navigateMonth(-1);
			}
		}
	};

	// Event management
	const getDateKey = (date) => {
		return date.toISOString().split("T")[0];
	};

	const hasEvents = (date) => {
		const key = getDateKey(date);
		return events[key] && events[key].length > 0;
	};

	const openEventModal = (date) => {
		setSelectedDate(date);
		setShowEventModal(true);
		setEventForm({ title: "", time: "", description: "" });
		setEditingEventId(null);
	};

	const closeEventModal = () => {
		setShowEventModal(false);
		setEventForm({ title: "", time: "", description: "" });
		setEditingEventId(null);
	};

	const saveEvent = () => {
		if (!eventForm.title.trim()) return;

		const dateKey = getDateKey(selectedDate);
		const newEvent = {
			id: editingEventId || Date.now(),
			title: eventForm.title,
			time: eventForm.time,
			description: eventForm.description,
		};

		setEvents((prev) => {
			const dateEvents = prev[dateKey] || [];
			if (editingEventId) {
				const updatedEvents = dateEvents.map((event) =>
					event.id === editingEventId ? newEvent : event
				);
				return { ...prev, [dateKey]: updatedEvents };
			} else {
				return { ...prev, [dateKey]: [...dateEvents, newEvent] };
			}
		});

		closeEventModal();
	};

	const deleteEvent = (eventId) => {
		const dateKey = getDateKey(selectedDate);
		setEvents((prev) => ({
			...prev,
			[dateKey]: prev[dateKey].filter((event) => event.id !== eventId),
		}));
	};

	const editEvent = (event) => {
		setEventForm({
			title: event.title,
			time: event.time,
			description: event.description,
		});
		setEditingEventId(event.id);
	};

	const renderCalendarDays = () => {
		const daysInMonth = getDaysInMonth(currentDate);
		const firstDay = getFirstDayOfMonth(currentDate);
		const days = [];

		// Previous month's trailing days
		const prevMonth = new Date(currentYear, currentMonth - 1, 0);
		const prevMonthDays = prevMonth.getDate();

		for (let i = firstDay - 1; i >= 0; i--) {
			const day = prevMonthDays - i;
			days.push(
				<div
					key={`prev-${day}`}
					className="w-7 h-7 sm-phone:w-8 sm-phone:h-8 flex items-center justify-center text-gray-300 text-xs"
				>
					{day}
				</div>
			);
		}

		// Current month days
		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(currentYear, currentMonth, day);
			const isToday =
				day === today.getDate() &&
				currentMonth === today.getMonth() &&
				currentYear === today.getFullYear();
			const dateHasEvents = hasEvents(date);

			days.push(
				<button
					key={day}
					onClick={() => openEventModal(date)}
					className={`w-7 h-7 sm-phone:w-8 sm-phone:h-8 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center relative ${
						isToday
							? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
							: "hover:bg-blue-50 text-gray-700 hover:text-blue-600"
					}`}
				>
					{day}
					{dateHasEvents && (
						<div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
					)}
				</button>
			);
		}

		// Next month's leading days
		const totalCells = 42;
		const remainingCells = totalCells - days.length;

		for (let day = 1; day <= remainingCells; day++) {
			days.push(
				<div
					key={`next-${day}`}
					className="w-7 h-7 sm-phone:w-8 sm-phone:h-8 flex items-center justify-center text-gray-300 text-xs"
				>
					{day}
				</div>
			);
		}

		return days;
	};

	return (
		<>
			<div className="bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm border border-white/20 rounded-xl sm-phone:rounded-2xl p-3 sm-phone:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
				{/* Clean Header - Icon only */}
				<div className="flex items-center justify-between mb-3">
					<div className="w-6 h-6 sm-phone:w-8 sm-phone:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
						<CalendarIcon className="w-3 h-3 sm-phone:w-4 sm-phone:h-4 text-white" />
					</div>

					{/* Go to Today Button - Only show if not viewing current month */}
					{!isCurrentMonth() && (
						<button
							onClick={jumpToToday}
							className="px-2 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-all duration-200 flex items-center gap-1 text-xs font-medium"
						>
							<RotateCcw className="w-3 h-3" />
							Today
						</button>
					)}
				</div>

				{/* Compact Year Selector */}
				<div className="relative mb-3">
					<button
						onClick={() => setShowYearPicker(!showYearPicker)}
						className="w-full px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded-lg transition-all duration-200 text-blue-700 font-medium text-sm"
					>
						{currentYear}
					</button>

					{/* Compact Year Picker */}
					{showYearPicker && (
						<div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg max-h-32 overflow-y-auto mt-1">
							{yearOptions.map((year) => (
								<button
									key={year}
									onClick={() => changeYear(year)}
									className={`w-full px-3 py-1.5 text-left hover:bg-blue-50 text-sm ${
										year === currentYear
											? "bg-blue-100 text-blue-700"
											: "text-gray-700"
									}`}
								>
									{year}
								</button>
							))}
						</div>
					)}
				</div>

				{/* Compact Month Navigation */}
				<div
					className="touch-pan-x"
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
				>
					<div className="flex items-center justify-between mb-3">
						<button
							onClick={() => navigateMonth(-1)}
							className="p-1.5 hover:bg-blue-100 rounded-lg transition-all duration-200"
						>
							<ChevronLeft className="w-4 h-4 text-gray-600" />
						</button>

						<h4 className="text-sm font-semibold text-gray-800">
							{monthNames[currentMonth]}
						</h4>

						<button
							onClick={() => navigateMonth(1)}
							className="p-1.5 hover:bg-blue-100 rounded-lg transition-all duration-200"
						>
							<ChevronRight className="w-4 h-4 text-gray-600" />
						</button>
					</div>

					{/* Compact Days Header */}
					<div className="grid grid-cols-7 gap-1 mb-2">
						{["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
							<div
								key={index}
								className="text-center text-xs font-medium text-gray-500 py-1"
							>
								{day}
							</div>
						))}
					</div>

					{/* Compact Calendar Grid */}
					<div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
				</div>
			</div>

			{/* Event Modal (unchanged) */}
			{showEventModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-xl max-w-md w-full max-h-96 overflow-y-auto">
						<div className="flex items-center justify-between p-4 border-b">
							<h3 className="text-lg font-semibold text-gray-800">
								{selectedDate?.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								})}
							</h3>
							<button
								onClick={closeEventModal}
								className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
							>
								<X className="w-5 h-5 text-gray-500" />
							</button>
						</div>

						<div className="p-4">
							{/* Existing Events */}
							{selectedDate && events[getDateKey(selectedDate)]?.length > 0 && (
								<div className="mb-4">
									<h4 className="font-medium text-gray-800 mb-2 text-sm">
										Events
									</h4>
									<div className="space-y-2">
										{events[getDateKey(selectedDate)].map((event) => (
											<div
												key={event.id}
												className="p-2 bg-gray-50 rounded-lg border text-sm"
											>
												<div className="flex items-start justify-between">
													<div className="flex-1">
														<h5 className="font-medium text-gray-800">
															{event.title}
														</h5>
														{event.time && (
															<p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
																<Clock className="w-3 h-3" />
																{event.time}
															</p>
														)}
													</div>
													<div className="flex gap-1 ml-2">
														<button
															onClick={() => editEvent(event)}
															className="p-1 hover:bg-blue-100 rounded text-blue-600"
														>
															<Plus className="w-3 h-3" />
														</button>
														<button
															onClick={() => deleteEvent(event.id)}
															className="p-1 hover:bg-red-100 rounded text-red-600"
														>
															<Trash2 className="w-3 h-3" />
														</button>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Compact Event Form */}
							<div className="space-y-3">
								<h4 className="font-medium text-gray-800 text-sm">
									{editingEventId ? "Edit Event" : "Add Event"}
								</h4>

								<input
									type="text"
									value={eventForm.title}
									onChange={(e) =>
										setEventForm((prev) => ({ ...prev, title: e.target.value }))
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
									placeholder="Event title"
								/>

								<input
									type="time"
									value={eventForm.time}
									onChange={(e) =>
										setEventForm((prev) => ({ ...prev, time: e.target.value }))
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
								/>

								<div className="flex gap-2 pt-2">
									<button
										onClick={saveEvent}
										disabled={!eventForm.title.trim()}
										className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-1 disabled:bg-gray-400 text-sm"
									>
										<Save className="w-3 h-3" />
										Save
									</button>
									<button
										onClick={closeEventModal}
										className="px-3 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors text-sm"
									>
										Cancel
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CalendarComponent;
