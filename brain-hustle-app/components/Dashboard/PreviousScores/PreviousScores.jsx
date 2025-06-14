"use client";

import React, { useEffect, useState } from "react";
import {
	TrendingUp,
	Calendar,
	Award,
	BookOpen,
	BarChart3,
	ChevronDown,
	Trash2,
	X,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";

const PreviousScores = () => {
	const { user } = useUser();
	const userId = user?.id;
	const [scores, setScores] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedScore, setSelectedScore] = useState(null);
	const [showAll, setShowAll] = useState(false);
	const [deletingId, setDeletingId] = useState(null);

	useEffect(() => {
		const fetchScores = async () => {
			if (!userId) return;
			try {
				const res = await fetch(`/api/quizResults?userId=${userId}`);
				const data = await res.json();
				// Ensure we always have an array
				setScores(Array.isArray(data) ? data : []);
			} catch (error) {
				console.error("Failed to fetch quiz scores:", error);
				// Set empty array on error to prevent crashes
				setScores([]);
			} finally {
				setLoading(false);
			}
		};

		fetchScores();
	}, [userId]);

	// Function to delete a quiz result
	const deleteQuizResult = async (scoreId) => {
		if (!userId || !scoreId) return;

		setDeletingId(scoreId);

		try {
			const response = await fetch("/api/quizResults", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: scoreId, userId }),
			});

			if (response.ok) {
				// Remove the deleted score from the local state
				setScores((prevScores) =>
					prevScores.filter((score) => score.id !== scoreId)
				);
				// Reset selected score if it was the deleted one
				if (selectedScore === scoreId) {
					setSelectedScore(null);
				}
			} else {
				console.error("Failed to delete quiz result");
				// You might want to show a user-friendly error message here
			}
		} catch (error) {
			console.error("Error deleting quiz result:", error);
			// You might want to show a user-friendly error message here
		} finally {
			setDeletingId(null);
		}
	};

	// Safety check to ensure scores is always an array
	const safeScores = Array.isArray(scores) ? scores : [];

	const getScoreColor = (score, maxScore) => {
		const percentage = (score / maxScore) * 100;
		if (percentage >= 90) return "text-green-600 bg-green-50 border-green-200";
		if (percentage >= 80) return "text-blue-600 bg-blue-50 border-blue-200";
		if (percentage >= 70)
			return "text-yellow-600 bg-yellow-50 border-yellow-200";
		return "text-red-600 bg-red-50 border-red-200";
	};

	const getScoreIcon = (score, maxScore) => {
		const percentage = (score / maxScore) * 100;
		if (percentage >= 90) return <Award className="w-3 h-3" />;
		if (percentage >= 80) return <TrendingUp className="w-3 h-3" />;
		return <BarChart3 className="w-3 h-3" />;
	};

	const getScoreGrade = (score, maxScore) => {
		const percentage = (score / maxScore) * 100;
		if (percentage >= 90) return "A";
		if (percentage >= 80) return "B";
		if (percentage >= 70) return "C";
		if (percentage >= 60) return "D";
		return "F";
	};

	const averageScore =
		safeScores.length > 0
			? Math.round(
					safeScores.reduce(
						(sum, s) =>
							sum +
							(s.maxScore
								? (s.score / s.maxScore) * 100
								: (s.score / 100) * 100),
						0
					) / safeScores.length
			  )
			: 0;

	// Show only first 3 scores by default, with option to show all
	const displayedScores = showAll ? safeScores : safeScores.slice(0, 3);
	const hasMoreScores = safeScores.length > 3;

	return (
		<div className="mt-6">
			{/* Compact Header */}
			<div className="flex items-center justify-between mb-3">
				<h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
					<BookOpen className="w-4 h-4 text-blue-600" />
					Quiz History
				</h3>
				{safeScores.length > 0 && (
					<div className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200">
						<BarChart3 className="w-3 h-3 text-blue-600" />
						<span className="text-xs font-medium text-blue-700">
							Avg: {isNaN(averageScore) ? 0 : averageScore}%
						</span>
					</div>
				)}
			</div>

			{loading ? (
				<p className="text-gray-500 text-sm">Loading...</p>
			) : safeScores.length === 0 ? (
				<div className="text-center py-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300">
					<BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
					<p className="text-gray-500 font-medium text-sm">
						No quiz scores yet
					</p>
					<p className="text-xs text-gray-400 mt-1">
						Complete your first quiz to see results here
					</p>
				</div>
			) : (
				<>
					{/* Scrollable container with max height */}
					<div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
						<div className="space-y-2 pr-2">
							{displayedScores.map((score) => {
								const maxScore = score.maxScore || 20;
								const percentage = Math.round((score.score / maxScore) * 100);
								const isSelected = selectedScore === score.id;
								const isDeleting = deletingId === score.id;

								return (
									<div
										key={score.id}
										className={`
                      group relative p-3 rounded-lg border transition-all duration-200 hover:shadow-md
                      ${getScoreColor(score.score, maxScore)}
                      ${
												isSelected
													? "ring-2 ring-blue-300 shadow-md"
													: "hover:border-opacity-70"
											}
											${isDeleting ? "opacity-50 pointer-events-none" : ""}
                    `}
									>
										<div className="flex items-center justify-between">
											<div
												className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer"
												onClick={() =>
													setSelectedScore(isSelected ? null : score.id)
												}
											>
												<div className="flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-sm flex-shrink-0">
													{getScoreIcon(score.score, maxScore)}
												</div>
												<div className="min-w-0 flex-1">
													<h4 className="font-medium text-sm truncate">
														{score.subject}
													</h4>
													<div className="flex items-center gap-1 text-xs opacity-75">
														<Calendar className="w-2 h-2 flex-shrink-0" />
														<span className="truncate">
															{new Date(score.date).toLocaleDateString(
																"en-US",
																{
																	month: "short",
																	day: "numeric",
																}
															)}
														</span>
													</div>
												</div>
											</div>

											<div className="flex items-center gap-2">
												<div
													className="text-right flex-shrink-0 cursor-pointer"
													onClick={() =>
														setSelectedScore(isSelected ? null : score.id)
													}
												>
													<div className="flex items-center gap-1">
														<span className="text-lg font-bold">
															{score.score}
														</span>
														<span className="text-xs opacity-75">
															/{maxScore}
														</span>
													</div>
													<div className="flex items-center gap-1 justify-end">
														<span className="text-sm font-bold">
															{getScoreGrade(score.score, maxScore)}
														</span>
														<span className="text-xs opacity-75">
															({percentage}%)
														</span>
													</div>
												</div>

												{/* Delete Button */}
												<button
													onClick={(e) => {
														e.stopPropagation();
														deleteQuizResult(score.id);
													}}
													disabled={isDeleting}
													className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-red-100 text-red-500 hover:text-red-700 transition-all duration-200 flex-shrink-0"
													title="Delete this result"
												>
													{isDeleting ? (
														<div className="w-3 h-3 animate-spin rounded-full border border-red-500 border-t-transparent"></div>
													) : (
														<Trash2 className="w-3 h-3" />
													)}
												</button>
											</div>
										</div>

										{/* Compact Progress Bar */}
										<div className="mt-2 bg-white bg-opacity-50 rounded-full h-1.5 overflow-hidden">
											<div
												className="h-full bg-current rounded-full transition-all duration-500 ease-out"
												style={{ width: `${percentage}%` }}
											/>
										</div>

										{/* Expanded Details (More Compact) */}
										{isSelected && (
											<div className="mt-2 pt-2 border-t border-current border-opacity-20 animate-in slide-in-from-top-1 duration-200">
												<div className="grid grid-cols-3 gap-2 text-xs">
													<div className="text-center">
														<div className="font-medium">Score</div>
														<div className="opacity-75">{score.score}</div>
													</div>
													<div className="text-center">
														<div className="font-medium">Percent</div>
														<div className="opacity-75">{percentage}%</div>
													</div>
													<div className="text-center">
														<div className="font-medium">Grade</div>
														<div className="opacity-75">
															{getScoreGrade(score.score, maxScore)}
														</div>
													</div>
												</div>
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>

					{/* Show More/Less Button */}
					{hasMoreScores && (
						<button
							onClick={() => setShowAll(!showAll)}
							className="w-full mt-3 py-2 px-3 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg border border-blue-200 transition-colors duration-200 flex items-center justify-center gap-1"
						>
							{showAll ? "Show Less" : `Show All (${safeScores.length})`}
							<ChevronDown
								className={`w-3 h-3 transition-transform duration-200 ${
									showAll ? "rotate-180" : ""
								}`}
							/>
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default PreviousScores;
