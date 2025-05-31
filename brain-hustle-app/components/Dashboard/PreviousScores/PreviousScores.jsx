"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp, Calendar, Award, BookOpen, BarChart3 } from "lucide-react";
import { useUser } from "@clerk/nextjs";

const PreviousScores = () => {
	const { user } = useUser();
	const userId = user?.id;
	const [scores, setScores] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedScore, setSelectedScore] = useState(null);

	useEffect(() => {
		const fetchScores = async () => {
			if (!userId) return;
			try {
				const res = await fetch(`/api/quizResults?userId=${userId}`);
				const data = await res.json();
				setScores(data);
			} catch (error) {
				console.error("Failed to fetch quiz scores:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchScores();
	}, [userId]);

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
		if (percentage >= 90) return <Award className="w-4 h-4" />;
		if (percentage >= 80) return <TrendingUp className="w-4 h-4" />;
		return <BarChart3 className="w-4 h-4" />;
	};

	const getScoreGrade = (score, maxScore) => {
		const percentage = (score / maxScore) * 100;
		if (percentage >= 90) return "A";
		if (percentage >= 80) return "B";
		if (percentage >= 70) return "C";
		if (percentage >= 60) return "D";
		return "F";
	};

	// 🔧 Fix the average percentage calculation
	const averageScore =
		scores.length > 0
			? Math.round(
					scores.reduce(
						(sum, s) =>
							sum +
							(s.maxScore
								? (s.score / s.maxScore) * 100
								: (s.score / 100) * 100),
						0
					) / scores.length
			  )
			: 0;

	return (
		<div className="mt-6">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
					<BookOpen className="w-5 h-5 text-blue-600" />
					Quiz Performance History
				</h3>
				{scores.length > 0 && (
					<div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200">
						<BarChart3 className="w-4 h-4 text-blue-600" />
						<span className="text-sm font-medium text-blue-700">
							Avg: {isNaN(averageScore) ? 0 : averageScore}%
						</span>
					</div>
				)}
			</div>

			{loading ? (
				<p className="text-gray-500 text-sm">Loading...</p>
			) : scores.length === 0 ? (
				<div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
					<BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
					<p className="text-gray-500 font-medium">No quiz scores yet</p>
					<p className="text-sm text-gray-400 mt-1">
						Complete your first quiz to see results here
					</p>
				</div>
			) : (
				<div className="space-y-3">
					{scores.map((score) => {
						const maxScore = score.maxScore || 20; // default to 20 if missing
						const percentage = Math.round((score.score / maxScore) * 100);
						const isSelected = selectedScore === score.id;

						return (
							<div
								key={score.id}
								onClick={() => setSelectedScore(isSelected ? null : score.id)}
								className={`
                  group relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg
                  ${getScoreColor(score.score, maxScore)}
                  ${
										isSelected
											? "ring-4 ring-blue-200 shadow-lg scale-[1.02]"
											: "hover:border-opacity-50"
									}
                `}
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm">
											{getScoreIcon(score.score, maxScore)}
										</div>
										<div>
											<h4 className="font-semibold text-lg">{score.subject}</h4>
											<div className="flex items-center gap-2 text-sm opacity-75">
												<Calendar className="w-3 h-3" />
												{new Date(score.date).toLocaleDateString("en-US", {
													month: "short",
													day: "numeric",
													year: "numeric",
												})}
											</div>
										</div>
									</div>
									<div className="text-right">
										<div className="flex items-center gap-2">
											<span className="text-2xl font-bold">{score.score}</span>
											<span className="text-sm opacity-75">/{maxScore}</span>
										</div>
										<div className="flex items-center gap-2 justify-end">
											<span className="text-lg font-bold">
												{getScoreGrade(score.score, maxScore)}
											</span>
											<span className="text-sm opacity-75">
												({percentage}%)
											</span>
										</div>
									</div>
								</div>

								{/* Progress Bar */}
								<div className="mt-3 bg-white bg-opacity-50 rounded-full h-2 overflow-hidden">
									<div
										className="h-full bg-current rounded-full transition-all duration-700 ease-out"
										style={{ width: `${percentage}%` }}
									/>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default PreviousScores;
