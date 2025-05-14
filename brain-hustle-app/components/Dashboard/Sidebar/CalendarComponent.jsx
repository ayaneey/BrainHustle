import React, { useState, useCallback } from "react";

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
	const [events, setEvents] = useState([]);
	const [selectedSlot, setSelectedSlot] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [modalMode, setModalMode] = useState("new");

	const handleSlotClick = (dayIndex, hour, existingEvents) => {
		setSelectedSlot({ dayIndex, hour });
		setModalMode(existingEvents.length > 0 ? "view" : "new");
		setShowModal(true);
	};

	const handleAddNewInTimeSlot = () => {
		setModalMode("new");
	};

	const handleDeleteEvent = useCallback((eventId) => {
		setEvents((prevEvents) =>
			prevEvents.filter((event) => event.id !== eventId)
		);
	}, []);

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

	const weekDates = getDatesForWeek();

	const getDatesForMonth = () => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		const firstDay = new Date(year, month, 1).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const daysInPrevMonth = new Date(year, month, 0).getDate();
		const dates = [];

		for (let i = firstDay - 1; i >= 0; i--) {
			dates.push({ date: daysInPrevMonth - i, isCurrentMonth: false });
		}

		for (let i = 1; i <= daysInMonth; i++) {
			dates.push({
				date: i,
				isCurrentMonth: true,
				isToday:
					i === currentDate.getDate() && month === currentDate.getMonth(),
			});
		}

		const remainingDays = 42 - dates.length;
		for (let i = 1; i <= remainingDays; i++) {
			dates.push({ date: i, isCurrentMonth: false });
		}

		return dates;
	};

	const monthDates = getDatesForMonth();

	const EventModal = () => {
		const [localEvent, setLocalEvent] = useState({
			title: "",
			description: "",
		});

		const handleInputChange = (e) => {
			const { name, value } = e.target;
			setLocalEvent((prev) => ({ ...prev, [name]: value }));
		};

		const handleEventSubmit = (e) => {
			e.preventDefault();
			if (localEvent.title.trim()) {
				setEvents((prevEvents) => [
					...prevEvents,
					{
						id: Date.now(),
						...localEvent,
						day: selectedSlot.dayIndex,
						hour: selectedSlot.hour,
					},
				]);
				setShowModal(false);
			}
		};

		const slotEvents = events.filter(
			(event) =>
				event.day === selectedSlot.dayIndex && event.hour === selectedSlot.hour
		);

		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
				<div className="bg-white/70 rounded-lg p-6 w-full max-w-md">
					{modalMode === "view" ? (
						<>
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-semibold">
									Events for {days[selectedSlot.dayIndex]} at{" "}
									{selectedSlot.hour}
								</h2>
								<button
									onClick={handleAddNewInTimeSlot}
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								>
									Add New
								</button>
							</div>
							<div className="space-y-4 max-h-96 overflow-y-auto">
								{slotEvents.map((event) => (
									<div key={event.id} className="border rounded p-4">
										<h3 className="font-semibold text-black">{event.title}</h3>
										<p className="text-gray-600 mt-2">{event.description}</p>
										<button
											onClick={() => handleDeleteEvent(event.id)}
											className="mt-2 text-red-500 hover:text-red-700"
										>
											Delete
										</button>
									</div>
								))}
							</div>
							<div className="mt-4 flex justify-end">
								<button
									onClick={() => setShowModal(false)}
									className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
								>
									Close
								</button>
							</div>
						</>
					) : (
						<>
							<h2 className="text-xl text-black font-semibold mb-4">
								Add Event for {days[selectedSlot.dayIndex]} at{" "}
								{selectedSlot.hour}
							</h2>
							<form onSubmit={handleEventSubmit}>
								<div className="mb-4">
									<label className="block text-gray-700 text-sm font-bold mb-2">
										Title
									</label>
									<input
										type="text"
										name="title"
										value={localEvent.title}
										onChange={handleInputChange}
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										placeholder="Event title"
									/>
								</div>
								<div className="mb-4">
									<label className="block text-gray-700 text-sm font-bold mb-2">
										Description
									</label>
									<textarea
										name="description"
										value={localEvent.description}
										onChange={handleInputChange}
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										placeholder="Event description"
										rows="3"
									/>
								</div>
								<div className="flex justify-end space-x-2">
									<button
										type="button"
										onClick={() => setShowModal(false)}
										className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
									>
										Cancel
									</button>
									<button
										type="submit"
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
									>
										Save Event
									</button>
								</div>
							</form>
						</>
					)}
				</div>
			</div>
		);
	};

	const Event = ({ event }) => (
		<div
			className="absolute bg-blue-100 border-l-4 border-blue-500 p-1 text-xs left-0 right-0 overflow-hidden"
			style={{ zIndex: 20 }}
		>
			<div className="font-semibold truncate">{event.title}</div>
		</div>
	);

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
							text-center py-2 text-sm rounded-full cursor-pointer
							${date.isCurrentMonth ? "text-gray-900" : "text-gray-400"}
							${date.isToday ? "bg-blue-500 text-white" : ""}
							${!date.isToday && date.isCurrentMonth ? "hover:bg-gray-100" : ""}
						`}
						onClick={() => {
							if (date.isCurrentMonth) {
								const selectedDayIndex = new Date(
									currentDate.getFullYear(),
									currentDate.getMonth(),
									date.date
								).getDay();
								// Filter events for the selected day across any hour
								const dayEvents = events.filter(
									(event) => event.day === selectedDayIndex
								);

								// Trigger handleSlotClick with filtered events for the selected day
								handleSlotClick(selectedDayIndex, 0, dayEvents);
							}
						}}
					>
						{date.date}
					</div>
				))}
			</div>
		</div>
	);

	const WeekCalendar = () => (
		<div className="w-full h-screen max-h-[800px] bg-white rounded-lg shadow-lg overflow-hidden">
			<div className="flex flex-col h-full">
				{/* Header */}
				<div className="border-b flex-none">
					<div className="flex">
						<div className="w-16 border-r border-b bg-gray-50" />
						<div className="flex-1">
							<div className="grid grid-cols-7">
								{days.map((day, index) => (
									<div
										key={day}
										className={`text-center py-4 border-r border-b last:border-r-0 ${
											index === currentDate.getDay() ? "bg-blue-50" : ""
										}`}
									>
										<div className="text-sm text-gray-500">{day}</div>
										<div
											className={`text-2xl text-green-900 mt-1 ${
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
				<div className="flex flex-1 overflow-y-auto">
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
					<div className="flex-1 relative">
						<div className="grid grid-cols-7 h-full">
							{days.map((day, dayIndex) => (
								<div key={day} className="border-r last:border-r-0">
									{hours.map((hour) => {
										const slotEvents = events.filter(
											(event) => event.day === dayIndex && event.hour === hour
										);
										return (
											<div
												key={hour}
												className="h-20 border-b relative hover:bg-gray-50 cursor-pointer"
												onClick={() =>
													handleSlotClick(dayIndex, hour, slotEvents)
												}
											>
												{slotEvents.map((event) => (
													<Event key={event.id} event={event} />
												))}
											</div>
										);
									})}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<div className="p-4">
			<div className="block md:hidden">
				<MiniCalendar />
			</div>
			<div className="hidden md:block">
				<WeekCalendar />
			</div>
			{showModal && <EventModal />}
		</div>
	);
};

export default CalendarComponent;
