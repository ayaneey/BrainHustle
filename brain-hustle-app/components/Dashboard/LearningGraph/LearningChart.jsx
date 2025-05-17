"use client";

import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";

const data = [
	{ month: "Jan", Maths: 60, Science: 70, English: 65 },
	{ month: "Feb", Maths: 68, Science: 72, English: 67 },
	{ month: "Mar", Maths: 75, Science: 80, English: 72 },
	{ month: "Apr", Maths: 78, Science: 83, English: 75 },
	{ month: "May", Maths: 82, Science: 85, English: 78 },
];

const LearningChart = () => {
	return (
		<div className="bg-white p-6 rounded-xl shadow-md w-full">
			<h2 className="text-lg font-bold mb-4 text-box">📚 Learning Progress</h2>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="month" />
					<YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
					<Tooltip formatter={(value) => `${value}%`} />
					<Legend />
					<Line
						type="monotone"
						dataKey="Maths"
						stroke="#5C6AC4"
						strokeWidth={2}
						dot={{ r: 4 }}
					/>
					<Line
						type="monotone"
						dataKey="Science"
						stroke="#95d5b2"
						strokeWidth={2}
						dot={{ r: 4 }}
					/>
					<Line
						type="monotone"
						dataKey="English"
						stroke="#f7a072"
						strokeWidth={2}
						dot={{ r: 4 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default LearningChart;
