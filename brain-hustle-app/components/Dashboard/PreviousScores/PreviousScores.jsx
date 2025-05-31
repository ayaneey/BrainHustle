"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function PreviousScores() {
	const { user } = useUser();
	const userId = user?.id;
	const [previousScores, setPreviousScores] = useState([]);

	useEffect(() => {
		const fetchScores = async () => {
			if (!userId) {
				console.log("User ID not yet available. Skipping fetch.");
				return;
			}

			try {
				console.log("Fetching scores for user ID:", userId);
				const response = await fetch(`/api/quizResults?userId=${userId}`);
				if (!response.ok) throw new Error("Failed to fetch scores!");

				const text = await response.text();
				const data = text ? JSON.parse(text) : [];
				console.log("Fetched data:", data);
				setPreviousScores(data);
			} catch (error) {
				console.error("Error fetching previous scores:", error);
			}
		};

		fetchScores();
	}, [userId]);

	return (
		<div className="mt-4">
			<h3 className="text-lg font-semibold text-secondTextColor mb-2">
				Previous Quiz Scores
			</h3>
			{previousScores.length === 0 ? (
				<p className="text-sm text-gray-500">No previous quiz scores yet.</p>
			) : (
				<ul className="space-y-2">
					{previousScores.map((score) => (
						<li
							key={score.id}
							className="p-3 rounded bg-white shadow text-secondTextColor text-sm"
						>
							{score.subject} - {score.score} points (
							{new Date(score.date).toLocaleDateString()})
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
