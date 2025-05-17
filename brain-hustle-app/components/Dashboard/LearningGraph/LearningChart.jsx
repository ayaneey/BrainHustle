"use client";

import React, { useEffect, useState } from "react";
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
import { useUser } from "@clerk/nextjs";

const LearningChart = () => {
	const { user } = useUser();
	const [data, setData] = useState([]);

	useEffect(() => {
		if (!user) return;

		const fetchResults = async () => {
			const res = await fetch(`/api/quizResults/${user.id}`);
			const raw = await res.json();

			// Convert raw quiz results to chart format
			const grouped = raw.reduce((acc, curr) => {
				const month = new Date(curr.date).toLocaleString("default", {
					month: "short",
				});

				if (!acc[month]) acc[month] = {};
				if (!acc[month][curr.subject]) acc[month][curr.subject] = [];

				acc[month][curr.subject].push(curr.score);
				return acc;
			}, {});

			const formatted = Object.entries(grouped).map(([month, subjects]) => {
				const entry = { month };
				Object.entries(subjects).forEach(([subject, scores]) => {
					const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
					entry[subject] = Math.round(avg);
				});
				return entry;
			});

			// Sort by month (optional)
			const monthOrder = [
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
			formatted.sort(
				(a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
			);

			setData(formatted);
		};

		fetchResults();
	}, [user]);

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
