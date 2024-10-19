import React from "react";
import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";

const CalendarComponent = () => {
	return (
		<Calendar
			aria-label="Date (Min Date Value)"
			defaultValue={today(getLocalTimeZone())}
			minValue={today(getLocalTimeZone())}
		/>
	);
};

export default CalendarComponent;
