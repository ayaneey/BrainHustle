import React, { useState, useRef, useEffect } from "react";
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
import { useUser } from "@clerk/nextjs";

const CalendarComponent = () => {
	const { user } = useUser();
	const userId = user?.id;

	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(null);
	const [showEventModal, setShowEventModal] = useState(false);
	const [showYearPicker, setShowYearPicker] = useState(false);
	const [events, setEvents] = useState({});
	const [eventForm, setEventForm] = useState({
		title: "",
		time: "",
	});
	const [editingEventId, setEditingEventId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);

	const touchStartX = useRef(0);
	const touchEndX = useRef(0);
	const isSwiping = useRef(false);

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

	// Fetch events from database when component loads
	useEffect(() => {
		const fetchEvents = async () => {
			if (!userId) return;

			console.log("Fetching events for userId:", userId);
			setLoading(true);

			try {
				const response = await fetch(`/api/calendarEvents?userId=${userId}`);
				console.log("Fetch response status:", response.status);

				if (!response.ok) throw new Error("Failed to fetch events");

				const eventsData = await response.json();
				console.log("Fetched events data:", eventsData);

				// Convert array to date-keyed object for easier lookup
				const eventsObject = {};
				eventsData.forEach((event) => {
					const dateKey = new Date(event.date).toISOString().split("T")[0];
					if (!eventsObject[dateKey]) {
						eventsObject[dateKey] = [];
					}
					eventsObject[dateKey].push({
						id: event.id,
						title: event.title,
						time: event.time,
					});
				});

				setEvents(eventsObject);
				console.log("Processed events object:", eventsObject);
			} catch (error) {
				console.error("Failed to fetch calendar events:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, [userId]);

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

	const jumpToToday = () => {
		setCurrentDate(new Date());
		setShowYearPicker(false);
	};

	const isCurrentMonth = () => {
		return (
			currentMonth === today.getMonth() && currentYear === today.getFullYear()
		);
	};

	// Touch/Swipe handlers
	const handleTouchStart = (e) => {
		touchStartX.current = e.targetTouches[0].clientX;
		isSwiping.current = false;
	};

	const handleTouchMove = (e) => {
		touchEndX.current = e.targetTouches[0].clientX;
		const diffX = Math.abs(touchStartX.current - touchEndX.current);

		if (diffX > 10) {
			isSwiping.current = true;
		}
	};

	const handleTouchEnd = () => {
		if (!isSwiping.current) return;

		const diffX = touchStartX.current - touchEndX.current;
		const threshold = 50;

		if (Math.abs(diffX) > threshold) {
			if (diffX > 0) {
				navigateMonth(1);
			} else {
				navigateMonth(-1);
			}
		}

		isSwiping.current = false;
	};

	// Event management
	const getDateKey = (date) => {
		return date.toISOString().split("T")[0];
	};

	const hasEvents = (date) => {
		const key = getDateKey(date);
		return events[key] && events[key].length > 0;
	};

	const openEventModal = (date, e) => {
		if (isSwiping.current) {
			e.preventDefault();
			return;
		}

		setSelectedDate(date);
		setShowEventModal(true);
		setEventForm({ title: "", time: "" });
		setEditingEventId(null);
		document.body.style.overflow = "hidden";
	};

	const closeEventModal = () => {
		setShowEventModal(false);
		setEventForm({ title: "", time: "" });
		setEditingEventId(null);
		document.body.style.overflow = "unset";
	};

	const saveEvent = async () => {
		console.log("saveEvent called");
		console.log("userId:", userId);
		console.log("eventForm:", eventForm);
		console.log("selectedDate:", selectedDate);

		if (!eventForm.title.trim() || !userId) {
			console.log("Missing title or userId");
			return;
		}

		setSaving(true);
		try {
			const eventData = {
				userId,
				title: eventForm.title,
				time: eventForm.time,
				date: selectedDate.toISOString(),
			};

			console.log("Sending event data:", eventData);

			let response;
			if (editingEventId) {
				// Update existing event
				response = await fetch("/api/calendarEvents", {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						id: editingEventId,
						...eventData,
					}),
				});
			} else {
				// Create new event
				response = await fetch("/api/calendarEvents", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(eventData),
				});
			}

			console.log("Response status:", response.status);

			if (!response.ok) {
				const errorData = await response.json();
				console.error("Error response:", errorData);
				throw new Error("Failed to save event");
			}

			const savedEvent = await response.json();
			console.log("Saved event:", savedEvent);

			// Update local state
			const dateKey = getDateKey(selectedDate);
			const newEvent = {
				id: savedEvent.id,
				title: eventForm.title,
				time: eventForm.time,
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
		} catch (error) {
			console.error("Failed to save event:", error);
			alert("Failed to save event. Please try again.");
		} finally {
			setSaving(false);
		}
	};

	const deleteEvent = async (eventId) => {
		if (!userId) return;

		try {
			const response = await fetch("/api/calendarEvents", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: eventId, userId }),
			});

			if (!response.ok) throw new Error("Failed to delete event");

			// Update local state
			const dateKey = getDateKey(selectedDate);
			setEvents((prev) => ({
				...prev,
				[dateKey]: prev[dateKey].filter((event) => event.id !== eventId),
			}));
		} catch (error) {
			console.error("Failed to delete event:", error);
			alert("Failed to delete event. Please try again.");
		}
	};

	const editEvent = (event) => {
		setEventForm({
			title: event.title,
			time: event.time,
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
					className="w-7 h-7 sm-phone:w-8 sm-phone:h-8 md-phone:w-9 md-phone:h-9 flex items-center justify-center text-gray-300 text-xs sm-phone:text-sm"
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
					onClick={(e) => openEventModal(date, e)}
					className={`w-7 h-7 sm-phone:w-8 sm-phone:h-8 md-phone:w-9 md-phone:h-9 rounded-lg text-xs sm-phone:text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center relative touch-manipulation ${
						isToday
							? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
							: "hover:bg-blue-50 active:bg-blue-100 text-gray-700 hover:text-blue-600"
					}`}
					style={{ WebkitTapHighlightColor: "transparent" }}
				>
					{day}
					{dateHasEvents && (
						<div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm-phone:w-2 sm-phone:h-2 bg-red-500 rounded-full"></div>
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
					className="w-7 h-7 sm-phone:w-8 sm-phone:h-8 md-phone:w-9 md-phone:h-9 flex items-center justify-center text-gray-300 text-xs sm-phone:text-sm"
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
				{/* Header with loading indicator */}
				<div className="flex items-center justify-between mb-3">
					<div className="w-6 h-6 sm-phone:w-8 sm-phone:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center relative">
						<CalendarIcon className="w-3 h-3 sm-phone:w-4 sm-phone:h-4 text-white" />
						{loading && (
							<div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
						)}
					</div>

					{!isCurrentMonth() && (
						<button
							onClick={jumpToToday}
							className="px-2 py-1 sm-phone:px-3 sm-phone:py-1.5 bg-green-100 hover:bg-green-200 active:bg-green-300 text-green-700 rounded-lg transition-all duration-200 flex items-center gap-1 text-xs sm-phone:text-sm font-medium touch-manipulation"
							style={{ WebkitTapHighlightColor: "transparent" }}
						>
							<RotateCcw className="w-3 h-3 sm-phone:w-4 sm-phone:h-4" />
							Today
						</button>
					)}
				</div>

				{/* Year Selector */}
				<div className="relative mb-3">
					<button
						onClick={() => setShowYearPicker(!showYearPicker)}
						className="w-full px-3 py-1.5 sm-phone:py-2 bg-blue-100 hover:bg-blue-200 active:bg-blue-300 rounded-lg transition-all duration-200 text-blue-700 font-medium text-sm sm-phone:text-base touch-manipulation"
						style={{ WebkitTapHighlightColor: "transparent" }}
					>
						{currentYear}
					</button>

					{showYearPicker && (
						<div className="absolute top-full left-0 right-0 z-20 bg-white border border-gray-200 rounded-lg shadow-lg max-h-32 sm-phone:max-h-40 overflow-y-auto mt-1">
							{yearOptions.map((year) => (
								<button
									key={year}
									onClick={() => changeYear(year)}
									className={`w-full px-3 py-1.5 sm-phone:py-2 text-left hover:bg-blue-50 active:bg-blue-100 text-sm sm-phone:text-base touch-manipulation ${
										year === currentYear
											? "bg-blue-100 text-blue-700"
											: "text-gray-700"
									}`}
									style={{ WebkitTapHighlightColor: "transparent" }}
								>
									{year}
								</button>
							))}
						</div>
					)}
				</div>

				{/* Month Navigation */}
				<div
					className="touch-pan-x select-none"
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
				>
					<div className="flex items-center justify-between mb-3">
						<button
							onClick={() => navigateMonth(-1)}
							className="p-1.5 sm-phone:p-2 hover:bg-blue-100 active:bg-blue-200 rounded-lg transition-all duration-200 touch-manipulation"
							style={{ WebkitTapHighlightColor: "transparent" }}
						>
							<ChevronLeft className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 text-gray-600" />
						</button>

						<h4 className="text-sm sm-phone:text-base font-semibold text-gray-800">
							{monthNames[currentMonth]}
						</h4>

						<button
							onClick={() => navigateMonth(1)}
							className="p-1.5 sm-phone:p-2 hover:bg-blue-100 active:bg-blue-200 rounded-lg transition-all duration-200 touch-manipulation"
							style={{ WebkitTapHighlightColor: "transparent" }}
						>
							<ChevronRight className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 text-gray-600" />
						</button>
					</div>

					{/* Days Header */}
					<div className="grid grid-cols-7 gap-1 mb-2">
						{["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
							<div
								key={index}
								className="text-center text-xs sm-phone:text-sm font-medium text-gray-500 py-1"
							>
								{day}
							</div>
						))}
					</div>

					{/* Calendar Grid */}
					<div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
				</div>
			</div>

			{/* Event Modal */}
			{showEventModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm-phone:items-center justify-center z-50 p-0 sm-phone:p-4">
					<div className="bg-white rounded-t-xl sm-phone:rounded-xl w-full sm-phone:max-w-md sm-phone:w-full max-h-[90vh] sm-phone:max-h-96 overflow-y-auto animate-in slide-in-from-bottom duration-300 sm-phone:animate-in sm-phone:fade-in">
						<div className="flex items-center justify-between p-4 border-b">
							<h3 className="text-lg font-semibold text-gray-800">
								{selectedDate?.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								})}
							</h3>
							<button
								onClick={closeEventModal}
								className="p-1 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors touch-manipulation"
								style={{ WebkitTapHighlightColor: "transparent" }}
							>
								<X className="w-5 h-5 text-gray-500" />
							</button>
						</div>

						<div className="p-4 pb-6">
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
												className="p-3 bg-gray-50 rounded-lg border text-sm"
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
															className="p-2 hover:bg-blue-100 active:bg-blue-200 rounded text-blue-600 touch-manipulation"
															style={{ WebkitTapHighlightColor: "transparent" }}
														>
															<Plus className="w-4 h-4" />
														</button>
														<button
															onClick={() => deleteEvent(event.id)}
															className="p-2 hover:bg-red-100 active:bg-red-200 rounded text-red-600 touch-manipulation"
															style={{ WebkitTapHighlightColor: "transparent" }}
														>
															<Trash2 className="w-4 h-4" />
														</button>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Event Form */}
							<div className="space-y-4">
								<h4 className="font-medium text-gray-800 text-sm">
									{editingEventId ? "Edit Event" : "Add Event"}
								</h4>

								<input
									type="text"
									value={eventForm.title}
									onChange={(e) =>
										setEventForm((prev) => ({ ...prev, title: e.target.value }))
									}
									className="w-full px-3 py-3 sm-phone:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm-phone:text-base"
									placeholder="Event title"
									style={{ fontSize: "16px" }}
								/>

								<input
									type="time"
									value={eventForm.time}
									onChange={(e) =>
										setEventForm((prev) => ({ ...prev, time: e.target.value }))
									}
									className="w-full px-3 py-3 sm-phone:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm-phone:text-base"
									style={{ fontSize: "16px" }}
								/>

								<div className="flex flex-col sm-phone:flex-row gap-2 pt-2">
									<button
										onClick={saveEvent}
										disabled={!eventForm.title.trim() || saving}
										className="flex-1 bg-blue-500 text-white px-4 py-3 sm-phone:py-2 rounded-lg font-medium hover:bg-blue-600 active:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 text-sm sm-phone:text-base touch-manipulation"
										style={{ WebkitTapHighlightColor: "transparent" }}
									>
										{saving ? (
											<div className="w-4 h-4 animate-spin rounded-full border border-white border-t-transparent"></div>
										) : (
											<Save className="w-4 h-4" />
										)}
										{saving ? "Saving..." : "Save"}
									</button>
									<button
										onClick={closeEventModal}
										className="px-4 py-3 sm-phone:py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors text-sm sm-phone:text-base touch-manipulation"
										style={{ WebkitTapHighlightColor: "transparent" }}
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
