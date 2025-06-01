import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Add this import
import {
	BookOpen,
	Clock,
	ChevronRight,
	Calendar,
	Award,
	TrendingUp,
} from "lucide-react";

const quizzes = [
	{
		title: "Maths Quiz: Algebra",
		due: "May 19, 2025",
		difficulty: "Medium",
		progress: 0,
		color: "from-blue-500 to-blue-600",
		subject: "Mathematics",
		icon: "📊",
		route: "/dashboard?section=maths", // Add route for navigation
		quizType: "algebra", // Optional: specific quiz type
	},
	{
		title: "Biology Test: Cells",
		due: "May 22, 2025",
		difficulty: "Hard",
		progress: 25,
		color: "from-green-500 to-green-600",
		subject: "Biology",
		icon: "🧬",
		route: "/dashboard?section=science", // Navigate to science section
		quizType: "biology",
	},
	{
		title: "English Quiz: Language Analysis",
		due: "May 25, 2025",
		difficulty: "Easy",
		progress: 60,
		color: "from-purple-500 to-purple-600",
		subject: "English",
		icon: "📚",
		route: "/dashboard?section=english", // Or create a history section
		quizType: "english",
	},
];

const UpcomingQuizzes = () => {
	const [expandedQuiz, setExpandedQuiz] = useState(null);
	const router = useRouter(); // Add router hook

	const getDaysUntil = (dateString) => {
		const dueDate = new Date(dateString);
		const today = new Date();
		const diffTime = dueDate - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};

	const getDifficultyColor = (difficulty) => {
		switch (difficulty) {
			case "Easy":
				return "bg-green-100 text-green-700 border-green-200";
			case "Medium":
				return "bg-yellow-100 text-yellow-700 border-yellow-200";
			case "Hard":
				return "bg-red-100 text-red-700 border-red-200";
			default:
				return "bg-gray-100 text-gray-700 border-gray-200";
		}
	};

	const toggleExpanded = (index) => {
		setExpandedQuiz(expandedQuiz === index ? null : index);
	};

	// Add navigation function
	const handleStartQuiz = (quiz, event) => {
		event.stopPropagation(); // Prevent card expansion when clicking button

		// Navigate to the quiz route
		router.push(quiz.route);

		// Optional: You can also pass quiz data via URL params
		// router.push(`${quiz.route}&quiz=${quiz.quizType}&difficulty=${quiz.difficulty}`);
	};

	const handleReview = (quiz, event) => {
		event.stopPropagation(); // Prevent card expansion

		// Navigate to review mode or show review modal
		console.log("Review quiz:", quiz.title);
		// You can implement review functionality here
	};

	return (
		<div className="bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm border border-white/20 rounded-xl sm-phone:rounded-2xl p-4 sm-phone:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
			{/* Enhanced Header */}
			<div className="flex items-center justify-between mb-4 sm-phone:mb-6">
				<div className="flex items-center gap-2 sm-phone:gap-3">
					<div className="w-8 h-8 sm-phone:w-10 sm-phone:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm-phone:rounded-xl flex items-center justify-center">
						<BookOpen className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 text-white" />
					</div>
					<div>
						<h2 className="text-lg sm-phone:text-xl font-bold text-baseBlack">
							📌 Upcoming Quizzes
						</h2>
						<p className="text-xs sm-phone:text-sm text-secondTextColor">
							{quizzes.length} quizzes scheduled
						</p>
					</div>
				</div>

				{/* Quick Stats */}
				<div className="hidden sm-phone:flex items-center gap-2">
					<div className="flex items-center gap-1 px-2 py-1 bg-purple-100 rounded-full">
						<TrendingUp className="w-3 h-3 text-purple-600" />
						<span className="text-xs font-medium text-purple-700">
							{Math.round(
								quizzes.reduce((acc, quiz) => acc + quiz.progress, 0) /
									quizzes.length
							)}
							% avg
						</span>
					</div>
				</div>
			</div>

			{/* Enhanced Quiz List */}
			<div className="space-y-3 sm-phone:space-y-4">
				{quizzes.map((quiz, index) => {
					const daysUntil = getDaysUntil(quiz.due);
					const isExpanded = expandedQuiz === index;
					const isOverdue = daysUntil < 0;
					const isDueToday = daysUntil === 0;

					return (
						<div
							key={index}
							className={`group bg-white/70 backdrop-blur-sm rounded-xl sm-phone:rounded-2xl border border-white/40 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden ${
								isOverdue
									? "ring-2 ring-red-200"
									: isDueToday
									? "ring-2 ring-orange-200"
									: ""
							}`}
							onClick={() => toggleExpanded(index)}
						>
							{/* Main Quiz Info */}
							<div className="p-3 sm-phone:p-4">
								<div className="flex items-start justify-between mb-2 sm-phone:mb-3">
									<div className="flex items-start gap-2 sm-phone:gap-3 flex-1 min-w-0">
										{/* Subject Icon */}
										<div className="text-lg sm-phone:text-xl flex-shrink-0">
											{quiz.icon}
										</div>

										<div className="flex-1 min-w-0">
											<h3 className="font-semibold text-sm sm-phone:text-base text-baseBlack group-hover:text-purple-600 transition-colors truncate">
												{quiz.title}
											</h3>
											<p className="text-xs sm-phone:text-sm text-secondTextColor mb-2">
												{quiz.subject}
											</p>

											{/* Due Date & Status */}
											<div className="flex items-center gap-2 sm-phone:gap-3 flex-wrap">
												<div className="flex items-center gap-1">
													<Calendar className="w-3 h-3 text-gray-500" />
													<span
														className={`text-xs font-medium ${
															isOverdue
																? "text-red-600"
																: isDueToday
																? "text-orange-600"
																: "text-gray-600"
														}`}
													>
														{isOverdue
															? `${Math.abs(daysUntil)} days overdue`
															: isDueToday
															? "Due today"
															: `${daysUntil} days left`}
													</span>
												</div>

												<span
													className={`text-xs px-2 py-0.5 sm-phone:py-1 rounded-full border font-medium ${getDifficultyColor(
														quiz.difficulty
													)}`}
												>
													{quiz.difficulty}
												</span>
											</div>
										</div>
									</div>

									<div className="flex items-center gap-1 sm-phone:gap-2 flex-shrink-0">
										{quiz.progress > 0 && (
											<div className="flex items-center gap-1">
												<Award className="w-3 h-3 text-green-600" />
												<span className="text-xs font-medium text-green-600">
													{quiz.progress}%
												</span>
											</div>
										)}
										<ChevronRight
											className={`w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-all duration-200 ${
												isExpanded ? "rotate-90" : ""
											}`}
										/>
									</div>
								</div>

								{/* Progress Bar */}
								{quiz.progress > 0 && (
									<div className="space-y-1 sm-phone:space-y-2">
										<div className="flex justify-between text-xs">
											<span className="text-gray-500">Progress</span>
											<span className="font-medium text-gray-700">
												{quiz.progress}% complete
											</span>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-1.5 sm-phone:h-2">
											<div
												className={`bg-gradient-to-r ${quiz.color} h-1.5 sm-phone:h-2 rounded-full transition-all duration-700 ease-out`}
												style={{ width: `${quiz.progress}%` }}
											></div>
										</div>
									</div>
								)}
							</div>

							{/* Expanded Content */}
							{isExpanded && (
								<div className="px-3 pb-3 sm-phone:px-4 sm-phone:pb-4 border-t border-gray-100 bg-gray-50/50">
									<div className="pt-3 space-y-2">
										<div className="flex items-center justify-between text-sm">
											<span className="text-gray-600">Due Date:</span>
											<span className="font-medium text-gray-800">
												{quiz.due}
											</span>
										</div>
										<div className="flex items-center justify-between text-sm">
											<span className="text-gray-600">Subject:</span>
											<span className="font-medium text-gray-800">
												{quiz.subject}
											</span>
										</div>
										<div className="flex items-center justify-between text-sm">
											<span className="text-gray-600">Difficulty:</span>
											<span
												className={`font-medium px-2 py-1 rounded-full text-xs ${getDifficultyColor(
													quiz.difficulty
												)}`}
											>
												{quiz.difficulty}
											</span>
										</div>

										{/* Action Buttons */}
										<div className="flex gap-2 pt-2">
											<button
												onClick={(e) => handleStartQuiz(quiz, e)}
												className="flex-1 bg-purple-500 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-purple-600 transition-colors"
											>
												Start Quiz
											</button>
											<button
												onClick={(e) => handleReview(quiz, e)}
												className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors"
											>
												Review
											</button>
										</div>
									</div>
								</div>
							)}
						</div>
					);
				})}
			</div>

			{/* Footer Stats */}
			<div className="mt-4 sm-phone:mt-6 pt-4 border-t border-gray-200/50">
				<div className="flex items-center justify-between text-xs sm-phone:text-sm">
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-1">
							<div className="w-2 h-2 bg-green-500 rounded-full"></div>
							<span className="text-gray-600">
								{quizzes.filter((q) => q.progress > 0).length} Started
							</span>
						</div>
						<div className="flex items-center gap-1">
							<div className="w-2 h-2 bg-orange-500 rounded-full"></div>
							<span className="text-gray-600">
								{quizzes.filter((q) => getDaysUntil(q.due) <= 3).length} Due
								Soon
							</span>
						</div>
					</div>
					<button className="text-purple-600 hover:text-purple-700 font-medium">
						View All →
					</button>
				</div>
			</div>
		</div>
	);
};

export default UpcomingQuizzes;
