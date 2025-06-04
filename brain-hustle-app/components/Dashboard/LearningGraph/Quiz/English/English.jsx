"use client";

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
	BookOpen,
	Award,
	Target,
	ArrowLeft,
	RefreshCw,
	Brain,
	CheckCircle,
	XCircle,
	Timer,
	Zap,
	Star,
	Trophy,
	Sparkles,
	Flame,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";

// Mock data for demonstration
const englishQuestions = [
	{
		topic: "Paper 1: Creative Reading & Writing",
		description: "Fiction texts, narrative writing, and descriptive techniques",
		questions: [
			{
				question:
					"What is the main purpose of using metaphors in creative writing?",
				options: [
					"To confuse the reader",
					"To create vivid imagery",
					"To fill space",
					"To sound smart",
				],
				answer: "To create vivid imagery",
				difficulty: "easy",
			},
			{
				question:
					"Which technique is most effective for creating tension in a narrative?",
				options: [
					"Long descriptions",
					"Short, sharp sentences",
					"Complex vocabulary",
					"Formal language",
				],
				answer: "Short, sharp sentences",
				difficulty: "medium",
			},
		],
	},
	{
		topic: "Shakespeare: Macbeth",
		description: "Analysis of themes, characters, and language in Macbeth",
		questions: [
			{
				question: "What does the dagger represent in Macbeth's soliloquy?",
				options: ["His ambition", "His guilt", "His power", "His fear"],
				answer: "His guilt",
				difficulty: "medium",
			},
		],
	},
	{
		topic: "A Christmas Carol",
		description:
			"Analysis of themes, characters, and Dickens' social commentary",
		questions: [
			{
				question: "What does Scrooge represent at the beginning of the novel?",
				options: [
					"Generosity",
					"Social inequality",
					"Christmas spirit",
					"Family values",
				],
				answer: "Social inequality",
				difficulty: "easy",
			},
		],
	},
	{
		topic: "An Inspector Calls",
		description:
			"Analysis of themes, characters, and Priestley's social and political message",
		questions: [
			{
				question: "What does the Inspector represent in the play?",
				options: ["The law", "Social conscience", "The government", "The past"],
				answer: "Social conscience",
				difficulty: "medium",
			},
		],
	},
];

const English = () => {
	const { user } = useUser();
	const userId = user?.id;

	const [selectedTopic, setSelectedTopic] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [score, setScore] = useState(0);
	const [showResults, setShowResults] = useState(false);
	const [timeLeft, setTimeLeft] = useState(30);
	const [isTimerActive, setIsTimerActive] = useState(false);
	const [difficultyFilter, setDifficultyFilter] = useState("all");
	const [currentStreak, setCurrentStreak] = useState(0);
	const [showStreakAnimation, setShowStreakAnimation] = useState(false);

	// Timer effect
	useEffect(() => {
		let interval = null;
		if (
			isTimerActive &&
			timeLeft > 0 &&
			!showResults &&
			selectedAnswer === null
		) {
			interval = setInterval(() => {
				setTimeLeft((timeLeft) => timeLeft - 1);
			}, 1000);
		} else if (timeLeft === 0 && !selectedAnswer) {
			handleAnswer(null);
		}
		return () => clearInterval(interval);
	}, [isTimerActive, timeLeft, showResults, selectedAnswer]);

	const handleTopicSelect = (topic) => {
		setSelectedTopic(topic);
		setCurrentIndex(0);
		setSelectedAnswer(null);
		setScore(0);
		setShowResults(false);
		setTimeLeft(30);
		setIsTimerActive(true);
		setCurrentStreak(0);
	};

	const saveScoreToDB = async () => {
		if (!userId) return;
		try {
			await fetch("/api/quizResults", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: userId,
					subject: `English - ${selectedTopic}`,
					score: score,
					totalQuestions: currentQuestions.length,
					difficulty: difficultyFilter,
					date: new Date(),
				}),
			});
		} catch (error) {
			console.error("Error saving score:", error);
		}
	};

	const getFilteredQuestions = () => {
		if (!selectedTopic) return [];
		const topicData = englishQuestions.find((t) => t.topic === selectedTopic);
		if (!topicData) return [];

		if (difficultyFilter === "all") return topicData.questions;
		return topicData.questions.filter((q) => q.difficulty === difficultyFilter);
	};

	const currentQuestions = getFilteredQuestions();
	const currentQ = currentQuestions?.[currentIndex];

	const handleAnswer = (option) => {
		if (selectedAnswer) return;

		setSelectedAnswer(option);
		setIsTimerActive(false);

		const isCorrect = option === currentQ?.answer;
		if (isCorrect) {
			setScore((prev) => prev + 1);
			setCurrentStreak((prev) => prev + 1);
			if (currentStreak + 1 >= 3) {
				setShowStreakAnimation(true);
				setTimeout(() => setShowStreakAnimation(false), 2000);
			}
		} else {
			setCurrentStreak(0);
		}

		setTimeout(() => {
			if (currentIndex + 1 < currentQuestions.length) {
				setCurrentIndex((prev) => prev + 1);
				setSelectedAnswer(null);
				setTimeLeft(30);
				setIsTimerActive(true);
			} else {
				saveScoreToDB();
				setShowResults(true);
			}
		}, 2000);
	};

	const restartQuiz = () => {
		setSelectedTopic(null);
		setDifficultyFilter("all");
		setTimeLeft(30);
		setIsTimerActive(false);
		setCurrentStreak(0);
	};

	const getDifficultyColor = (difficulty) => {
		switch (difficulty) {
			case "easy":
				return "text-emerald-600 bg-emerald-100 border-emerald-200";
			case "medium":
				return "text-amber-600 bg-amber-100 border-amber-200";
			case "hard":
				return "text-rose-600 bg-rose-100 border-rose-200";
			default:
				return "text-slate-600 bg-slate-100 border-slate-200";
		}
	};

	const getScoreColor = (percentage) => {
		if (percentage >= 80) return "text-emerald-600";
		if (percentage >= 60) return "text-amber-600";
		return "text-rose-600";
	};

	const getTimerColor = () => {
		if (timeLeft > 20) return "text-white bg-emerald-500/90";
		if (timeLeft > 10) return "text-white bg-amber-500/90";
		return "text-white bg-rose-500/90 animate-pulse";
	};

	// Return actual quiz count of 20 for display, but use demo data for actual quiz
	const getQuestionCountForDisplay = (topicData, difficulty) => {
		// Show 20 questions for the actual quiz display
		if (difficulty === "all") return 20;
		// Show typical distribution for different difficulties
		if (difficulty === "easy") return 6;
		if (difficulty === "medium") return 10;
		if (difficulty === "hard") return 4;
		return 20;
	};

	const getQuestionCountByDifficulty = (topicData, difficulty) => {
		// For the actual demo functionality, use the real question count
		if (difficulty === "all") return topicData.questions.length;
		return topicData.questions.filter((q) => q.difficulty === difficulty)
			.length;
	};

	const resultData = currentQuestions
		? [
				{ name: "Correct", value: score, color: "#10b981" },
				{
					name: "Incorrect",
					value: currentQuestions.length - score,
					color: "#ef4444",
				},
		  ]
		: [];

	const progressPercent = currentQuestions?.length
		? Math.round(
				((currentIndex + (showResults ? 1 : 0)) / currentQuestions.length) * 100
		  )
		: 0;

	const scorePercentage = currentQuestions?.length
		? Math.round((score / currentQuestions.length) * 100)
		: 0;

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
			{/* Decorative Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-4 -left-4 w-24 h-24 sm-phone:w-32 sm-phone:h-32 md-phone:w-36 md-phone:h-36 sm-tablet:w-48 sm-tablet:h-48 lg-tablet:w-72 lg-tablet:h-72 bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full opacity-20 animate-pulse"></div>
				<div
					className="absolute top-1/4 -right-4 w-32 h-32 sm-phone:w-40 sm-phone:h-40 md-phone:w-48 md-phone:h-48 sm-tablet:w-64 sm-tablet:h-64 lg-tablet:w-96 lg-tablet:h-96 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full opacity-20 animate-pulse"
					style={{ animationDelay: "2s" }}
				></div>
				<div
					className="absolute -bottom-4 left-1/4 w-28 h-28 sm-phone:w-36 sm-phone:h-36 md-phone:w-44 md-phone:h-44 sm-tablet:w-56 sm-tablet:h-56 lg-tablet:w-80 lg-tablet:h-80 bg-gradient-to-br from-indigo-200 to-cyan-300 rounded-full opacity-20 animate-pulse"
					style={{ animationDelay: "4s" }}
				></div>
			</div>

			{/* Streak Animation */}
			{showStreakAnimation && (
				<div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none px-3 sm-phone:px-4">
					<div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-2 sm-phone:px-4 sm-phone:py-3 md-phone:px-5 md-phone:py-3 sm-tablet:px-8 sm-tablet:py-6 rounded-xl md-phone:rounded-2xl sm-tablet:rounded-3xl text-sm sm-phone:text-base md-phone:text-lg sm-tablet:text-2xl lg-tablet:text-3xl font-bold shadow-2xl animate-bounce text-center flex items-center gap-2 max-w-sm sm-phone:max-w-md">
						<Flame className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 md-phone:w-6 md-phone:h-6 animate-spin flex-shrink-0" />
						<span className="flex-1">
							🔥 STREAK! {currentStreak} in a row! 🔥
						</span>
						<Flame className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 md-phone:w-6 md-phone:h-6 animate-spin flex-shrink-0" />
					</div>
				</div>
			)}

			<div className="container mx-auto px-3 sm-phone:px-4 md-phone:px-5 sm-tablet:px-6 py-4 sm-phone:py-6 md-phone:py-8 sm-tablet:py-10 lg-tablet:py-12 relative z-10">
				{/* Header */}
				<div className="text-center mb-6 sm-phone:mb-8 md-phone:mb-10 sm-tablet:mb-12 lg-tablet:mb-16">
					<div className="flex flex-col sm-tablet:flex-row items-center justify-center gap-3 sm-phone:gap-4 md-phone:gap-5 sm-tablet:gap-6 mb-4 sm-phone:mb-6 md-phone:mb-7 sm-tablet:mb-8">
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl sm-phone:rounded-2xl sm-tablet:rounded-3xl blur-xl opacity-40 animate-pulse"></div>
							<div className="relative p-2 sm-phone:p-3 md-phone:p-4 sm-tablet:p-5 lg-tablet:p-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl sm-phone:rounded-2xl sm-tablet:rounded-3xl shadow-xl">
								<BookOpen className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 md-phone:w-7 md-phone:h-7 sm-tablet:w-8 sm-tablet:h-8 lg-tablet:w-10 lg-tablet:h-10 text-white" />
							</div>
						</div>
						<div className="text-center sm-tablet:text-left">
							<h1 className="text-2xl sm-phone:text-3xl md-phone:text-4xl lg-phone:text-4xl xl-phone:text-5xl sm-tablet:text-5xl lg-tablet:text-6xl font-black bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
								AQA GCSE English
							</h1>
							<p className="text-purple-600 text-xs sm-phone:text-sm md-phone:text-base sm-tablet:text-lg lg-tablet:text-xl font-semibold mt-1 sm-phone:mt-2 sm-tablet:mt-3 flex items-center justify-center sm-tablet:justify-start gap-2">
								<Sparkles className="w-3 h-3 sm-phone:w-4 sm-phone:h-4 sm-tablet:w-5 sm-tablet:h-5 lg-tablet:w-6 lg-tablet:h-6" />
								Language & Literature Mastery
								<Sparkles className="w-3 h-3 sm-phone:w-4 sm-phone:h-4 sm-tablet:w-5 sm-tablet:h-5 lg-tablet:w-6 lg-tablet:h-6" />
							</p>
						</div>
					</div>
				</div>

				{/* Topic Selection */}
				{!selectedTopic && (
					<div className="max-w-7xl mx-auto">
						<div className="text-center mb-6 sm-phone:mb-8 md-phone:mb-10 sm-tablet:mb-12 lg-tablet:mb-16">
							<h2 className="text-xl sm-phone:text-2xl md-phone:text-3xl lg-phone:text-3xl xl-phone:text-4xl sm-tablet:text-4xl lg-tablet:text-5xl font-bold text-gray-800 mb-3 sm-phone:mb-4 md-phone:mb-5 sm-tablet:mb-6">
								Select Your Learning Focus 📖
							</h2>
							<p className="text-gray-600 text-sm sm-phone:text-sm md-phone:text-base lg-phone:text-base xl-phone:text-lg sm-tablet:text-lg lg-tablet:text-xl xl-tablet:text-2xl mb-6 sm-phone:mb-8 md-phone:mb-10 sm-tablet:mb-10 lg-tablet:mb-12 max-w-xs sm-phone:max-w-sm md-phone:max-w-md lg-phone:max-w-lg xl-phone:max-w-xl sm-tablet:max-w-2xl lg-tablet:max-w-3xl mx-auto leading-relaxed px-2">
								Select a topic and difficulty level to begin your epic learning
								journey
							</p>

							{/* Difficulty Filter */}
							<div className="flex flex-wrap justify-center gap-2 sm-phone:gap-3 md-phone:gap-4 lg-tablet:gap-6 mb-6 sm-phone:mb-8 md-phone:mb-10 sm-tablet:mb-12 lg-tablet:mb-16 px-2">
								{[
									{
										key: "all",
										label: "All Levels",
										icon: Brain,
										gradient: "from-slate-500 to-slate-600",
										bgGradient: "from-slate-100 to-slate-200",
									},
									{
										key: "easy",
										label: "Easy",
										icon: Star,
										gradient: "from-emerald-500 to-green-600",
										bgGradient: "from-emerald-100 to-green-200",
									},
									{
										key: "medium",
										label: "Medium",
										icon: Zap,
										gradient: "from-amber-500 to-orange-600",
										bgGradient: "from-amber-100 to-orange-200",
									},
									{
										key: "hard",
										label: "Hard",
										icon: Flame,
										gradient: "from-rose-500 to-red-600",
										bgGradient: "from-rose-100 to-red-200",
									},
								].map((difficulty) => {
									const Icon = difficulty.icon;
									return (
										<button
											key={difficulty.key}
											onClick={() => setDifficultyFilter(difficulty.key)}
											className={`group relative px-3 py-2 sm-phone:px-4 sm-phone:py-3 md-phone:px-5 md-phone:py-3 sm-tablet:px-6 sm-tablet:py-4 lg-tablet:px-10 lg-tablet:py-5 rounded-xl sm-phone:rounded-2xl lg-tablet:rounded-3xl font-bold text-xs sm-phone:text-sm md-phone:text-base lg-tablet:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
												difficultyFilter === difficulty.key
													? `bg-gradient-to-r ${difficulty.gradient} text-white shadow-2xl scale-105`
													: `bg-gradient-to-r ${difficulty.bgGradient} text-gray-700 hover:shadow-xl border-2 border-white`
											}`}
										>
											<div className="flex items-center gap-1 sm-phone:gap-2 md-phone:gap-3 lg-tablet:gap-4">
												<Icon
													className={`w-3 h-3 sm-phone:w-4 sm-phone:h-4 md-phone:w-5 md-phone:h-5 lg-tablet:w-7 lg-tablet:h-7 ${
														difficultyFilter === difficulty.key
															? "animate-spin"
															: "group-hover:animate-bounce"
													}`}
												/>
												<span className="whitespace-nowrap">
													{difficulty.label}
												</span>
											</div>
										</button>
									);
								})}
							</div>
						</div>

						{/* Topics Grid */}
						<div className="grid grid-cols-1 sm-tablet:grid-cols-2 gap-3 sm-phone:gap-4 md-phone:gap-5 sm-tablet:gap-6 lg-tablet:gap-8 mb-6 sm-phone:mb-8 md-phone:mb-10 sm-tablet:mb-12 lg-tablet:mb-16 max-w-4xl mx-auto">
							{englishQuestions.map((topicData, index) => {
								const filteredCount = getQuestionCountByDifficulty(
									topicData,
									difficultyFilter
								);

								const displayCount = getQuestionCountForDisplay(
									topicData,
									difficultyFilter
								);

								const cardGradients = [
									"from-cyan-500 to-blue-600",
									"from-purple-500 to-pink-600",
									"from-emerald-500 to-teal-600",
									"from-orange-500 to-red-600",
								];

								const bgGradients = [
									"from-cyan-50 to-blue-100",
									"from-purple-50 to-pink-100",
									"from-emerald-50 to-teal-100",
									"from-orange-50 to-red-100",
								];

								return (
									<div
										key={topicData.topic}
										onClick={() =>
											filteredCount > 0 && handleTopicSelect(topicData.topic)
										}
										className={`group relative bg-gradient-to-br ${
											bgGradients[index % bgGradients.length]
										} rounded-xl sm-phone:rounded-2xl sm-tablet:rounded-3xl p-3 sm-phone:p-4 md-phone:p-5 sm-tablet:p-6 lg-tablet:p-8 shadow-xl border-2 border-white transition-all duration-500 transform hover:scale-105 ${
											filteredCount > 0
												? "cursor-pointer hover:shadow-2xl"
												: "opacity-50 cursor-not-allowed"
										}`}
									>
										<div className="relative z-10">
											<div className="flex items-start justify-between mb-3 sm-phone:mb-4 md-phone:mb-5 sm-tablet:mb-6 lg-tablet:mb-8">
												<div
													className={`p-2 sm-phone:p-3 md-phone:p-4 sm-tablet:p-4 lg-tablet:p-5 rounded-lg sm-phone:rounded-xl lg-tablet:rounded-2xl bg-gradient-to-r ${
														cardGradients[index % cardGradients.length]
													} shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}
												>
													<Target className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 md-phone:w-6 md-phone:h-6 sm-tablet:w-6 sm-tablet:h-6 lg-tablet:w-8 lg-tablet:h-8 text-white" />
												</div>
												<div className="bg-white/80 backdrop-blur-sm px-2 py-1 sm-phone:px-2 sm-phone:py-1 md-phone:px-3 md-phone:py-1 sm-tablet:px-3 sm-tablet:py-2 lg-tablet:px-4 lg-tablet:py-2 rounded-lg sm-phone:rounded-xl sm-tablet:rounded-2xl text-gray-700 font-bold border border-gray-200 shadow-sm text-xs sm-phone:text-xs md-phone:text-sm sm-tablet:text-sm">
													{displayCount} questions
												</div>
											</div>

											<h3 className="text-base sm-phone:text-lg md-phone:text-xl lg-phone:text-xl xl-phone:text-xl sm-tablet:text-xl lg-tablet:text-2xl font-bold mb-2 sm-phone:mb-3 sm-tablet:mb-4 text-gray-800 group-hover:text-gray-900 transition-colors leading-tight">
												{topicData.topic}
											</h3>
											<p className="text-gray-600 text-xs sm-phone:text-xs md-phone:text-sm leading-relaxed mb-3 sm-phone:mb-4 md-phone:mb-6">
												{topicData.description}
											</p>

											{/* Difficulty breakdown */}
											<div className="flex flex-wrap gap-1 sm-phone:gap-2 mb-4 sm-phone:mb-6 md-phone:mb-8">
												{["easy", "medium", "hard"].map((diff) => {
													const count = getQuestionCountByDifficulty(
														topicData,
														diff
													);
													if (count === 0) return null;
													return (
														<span
															key={diff}
															className={`px-2 py-1 sm-phone:px-3 sm-phone:py-1 text-xs font-bold rounded-full border ${getDifficultyColor(
																diff
															)}`}
														>
															{diff}: {count}
														</span>
													);
												})}
											</div>

											{filteredCount > 0 && (
												<div className="flex items-center text-gray-700 text-xs sm-phone:text-sm md-phone:text-sm sm-tablet:text-base lg-tablet:text-lg font-bold group-hover:text-gray-900 transition-colors">
													<span>Start Adventure</span>
													<svg
														className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 md-phone:w-5 md-phone:h-5 sm-tablet:w-6 sm-tablet:h-6 ml-2 sm-tablet:ml-3 transform group-hover:translate-x-2 transition-transform duration-300"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={3}
															d="M9 5l7 7-7 7"
														/>
													</svg>
												</div>
											)}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				)}

				{/* Quiz Section */}
				{selectedTopic && !showResults && currentQ && (
					<div className="max-w-5xl mx-auto">
						<div className="bg-white/90 backdrop-blur-sm rounded-xl sm-phone:rounded-2xl sm-tablet:rounded-3xl shadow-2xl border border-white overflow-hidden">
							{/* Quiz Header */}
							<div className="bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 p-3 sm-phone:p-4 md-phone:p-5 sm-tablet:p-6 lg-tablet:p-8 xl-tablet:p-10 text-white relative overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
								<div className="relative z-10">
									<div className="flex flex-col sm-tablet:flex-row items-start sm-tablet:items-center justify-between gap-3 sm-phone:gap-4 md-phone:gap-5 sm-tablet:gap-6 lg-tablet:gap-8 mb-4 sm-phone:mb-5 md-phone:mb-6 sm-tablet:mb-8">
										<button
											onClick={() => setSelectedTopic(null)}
											className="p-2 sm-phone:p-2 md-phone:p-3 sm-tablet:p-3 lg-tablet:p-4 rounded-lg sm-phone:rounded-xl sm-tablet:rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
											aria-label="Back to topic selection"
										>
											<ArrowLeft className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 md-phone:w-6 md-phone:h-6 sm-tablet:w-6 sm-tablet:h-6 lg-tablet:w-7 lg-tablet:h-7" />
										</button>

										<div className="flex flex-wrap items-center gap-2 sm-phone:gap-3 md-phone:gap-4 lg-tablet:gap-8">
											{currentStreak > 0 && (
												<div className="flex items-center gap-1 sm-phone:gap-2 px-2 py-1 sm-phone:px-3 sm-phone:py-2 md-phone:px-4 md-phone:py-2 sm-tablet:px-4 sm-tablet:py-2 lg-tablet:px-6 lg-tablet:py-3 rounded-lg sm-phone:rounded-xl sm-tablet:rounded-2xl bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold animate-pulse">
													<Flame className="w-3 h-3 sm-phone:w-4 sm-phone:h-4 md-phone:w-5 md-phone:h-5 lg-tablet:w-6 lg-tablet:h-6" />
													<span className="text-xs sm-phone:text-sm md-phone:text-sm sm-tablet:text-base lg-tablet:text-lg">
														{currentStreak} streak!
													</span>
												</div>
											)}
											<div
												className={`flex items-center gap-1 sm-phone:gap-2 px-2 py-1 sm-phone:px-3 sm-phone:py-2 md-phone:px-4 md-phone:py-2 sm-tablet:px-4 sm-tablet:py-2 lg-tablet:px-6 lg-tablet:py-3 rounded-lg sm-phone:rounded-xl sm-tablet:rounded-2xl ${getTimerColor()} font-bold text-sm sm-phone:text-base md-phone:text-base sm-tablet:text-lg lg-tablet:text-xl border-2 border-white/30 shadow-lg`}
											>
												<Timer className="w-3 h-3 sm-phone:w-4 sm-phone:h-4 md-phone:w-5 md-phone:h-5 lg-tablet:w-6 lg-tablet:h-6" />
												<span>{timeLeft}s</span>
											</div>
											<div
												className={`px-2 py-1 sm-phone:px-3 sm-phone:py-2 md-phone:px-4 md-phone:py-2 sm-tablet:px-4 sm-tablet:py-2 lg-tablet:px-6 lg-tablet:py-3 rounded-lg sm-phone:rounded-xl sm-tablet:rounded-2xl font-bold border-2 text-xs sm-phone:text-sm md-phone:text-sm sm-tablet:text-base ${getDifficultyColor(
													currentQ.difficulty
												)}`}
											>
												{currentQ.difficulty.charAt(0).toUpperCase() +
													currentQ.difficulty.slice(1)}
											</div>
										</div>
									</div>

									<div>
										<h2 className="text-lg sm-phone:text-xl md-phone:text-2xl lg-phone:text-2xl xl-phone:text-3xl sm-tablet:text-3xl lg-tablet:text-4xl font-bold mb-1 sm-phone:mb-2 sm-tablet:mb-3">
											{selectedTopic}
										</h2>
										<p className="text-cyan-100 text-xs sm-phone:text-sm md-phone:text-sm sm-tablet:text-base lg-tablet:text-lg xl-tablet:text-xl">
											Question {currentIndex + 1} of {currentQuestions.length}
										</p>
									</div>
								</div>
							</div>

							{/* Animated Progress Bar */}
							<div className="w-full bg-gray-200 h-2 sm-tablet:h-3 lg-tablet:h-4 relative overflow-hidden">
								<div
									className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 h-2 sm-tablet:h-3 lg-tablet:h-4 transition-all duration-1000 ease-out relative"
									style={{ width: `${progressPercent}%` }}
								>
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
								</div>
							</div>

							{/* Question Content */}
							<div className="p-3 sm-phone:p-4 md-phone:p-5 sm-tablet:p-6 lg-tablet:p-8 xl-tablet:p-12">
								<div className="mb-4 sm-phone:mb-5 md-phone:mb-6 sm-tablet:mb-8 lg-tablet:mb-12">
									<h3 className="text-sm sm-phone:text-base md-phone:text-lg lg-phone:text-lg xl-phone:text-xl sm-tablet:text-2xl lg-tablet:text-3xl xl-tablet:text-4xl font-bold text-gray-800 leading-relaxed">
										{currentQ.question}
									</h3>
								</div>

								{/* Options */}
								<div className="grid gap-2 sm-phone:gap-3 md-phone:gap-4 sm-tablet:gap-4 lg-tablet:gap-6 xl-tablet:gap-8">
									{currentQ.options.map((option, idx) => {
										let buttonClass =
											"group relative p-3 sm-phone:p-4 md-phone:p-4 sm-tablet:p-5 lg-tablet:p-6 xl-tablet:p-8 rounded-lg sm-phone:rounded-xl sm-tablet:rounded-2xl lg-tablet:rounded-3xl border-2 text-left transition-all duration-500 transform hover:scale-105 font-semibold text-xs sm-phone:text-sm md-phone:text-sm sm-tablet:text-base lg-tablet:text-lg xl-tablet:text-xl shadow-lg ";

										if (selectedAnswer === option) {
											if (option === currentQ.answer) {
												buttonClass +=
													"bg-gradient-to-r from-emerald-400 to-green-500 border-emerald-300 text-white shadow-2xl scale-105";
											} else {
												buttonClass +=
													"bg-gradient-to-r from-rose-400 to-red-500 border-rose-300 text-white shadow-2xl scale-105";
											}
										} else if (selectedAnswer && option === currentQ.answer) {
											buttonClass +=
												"bg-gradient-to-r from-emerald-400 to-green-500 border-emerald-300 text-white shadow-2xl";
										} else {
											buttonClass +=
												"bg-white/80 backdrop-blur-sm border-gray-200 hover:border-cyan-400 hover:bg-white/90 text-gray-800 hover:shadow-2xl";
										}

										return (
											<button
												key={idx}
												onClick={() => handleAnswer(option)}
												className={buttonClass}
												disabled={!!selectedAnswer}
											>
												<div className="flex items-center justify-between">
													<span className="flex-1 pr-2 sm-phone:pr-3 sm-tablet:pr-4 lg-tablet:pr-6 leading-relaxed">
														{option}
													</span>
													{selectedAnswer === option &&
														(option === currentQ.answer ? (
															<CheckCircle className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 sm-tablet:w-6 sm-tablet:h-6 lg-tablet:w-8 lg-tablet:h-8 text-white animate-bounce flex-shrink-0" />
														) : (
															<XCircle className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 sm-tablet:w-6 sm-tablet:h-6 lg-tablet:w-8 lg-tablet:h-8 text-white animate-bounce flex-shrink-0" />
														))}
													{selectedAnswer &&
														selectedAnswer !== option &&
														option === currentQ.answer && (
															<CheckCircle className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 sm-tablet:w-6 sm-tablet:h-6 lg-tablet:w-8 lg-tablet:h-8 text-white animate-bounce flex-shrink-0" />
														)}
												</div>
											</button>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Results Section */}
				{showResults && currentQuestions && (
					<div className="max-w-5xl mx-auto">
						<div className="bg-white/90 backdrop-blur-sm rounded-xl sm-phone:rounded-2xl sm-tablet:rounded-3xl shadow-2xl border border-white overflow-hidden">
							{/* Results Header */}
							<div
								className={`p-4 sm-phone:p-5 md-phone:p-6 sm-tablet:p-8 lg-tablet:p-10 xl-tablet:p-12 text-center relative overflow-hidden ${
									scorePercentage >= 80
										? "bg-gradient-to-r from-emerald-400 via-green-500 to-teal-600"
										: scorePercentage >= 60
										? "bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-600"
										: "bg-gradient-to-r from-rose-400 via-red-500 to-pink-600"
								} text-white`}
							>
								<div className="absolute inset-0">
									{[...Array(20)].map((_, i) => (
										<div
											key={i}
											className="absolute animate-pulse"
											style={{
												left: `${Math.random() * 100}%`,
												top: `${Math.random() * 100}%`,
												animationDelay: `${Math.random() * 3}s`,
											}}
										>
											<Star className="w-3 h-3 sm-phone:w-4 sm-phone:h-4 md-phone:w-5 md-phone:h-5 lg-tablet:w-6 lg-tablet:h-6 text-white/30" />
										</div>
									))}
								</div>
								<div className="relative z-10">
									<div className="mb-3 sm-phone:mb-4 md-phone:mb-5 sm-tablet:mb-6 lg-tablet:mb-8">
										<Award className="w-12 h-12 sm-phone:w-14 sm-phone:h-14 md-phone:w-16 md-phone:h-16 sm-tablet:w-20 sm-tablet:h-20 lg-tablet:w-24 lg-tablet:h-24 mx-auto mb-3 sm-phone:mb-4 md-phone:mb-5 sm-tablet:mb-6 lg-tablet:mb-8 animate-bounce" />
									</div>
									<h2 className="text-xl sm-phone:text-2xl md-phone:text-3xl lg-phone:text-3xl xl-phone:text-4xl sm-tablet:text-4xl lg-tablet:text-5xl xl-tablet:text-6xl font-black mb-2 sm-phone:mb-3 md-phone:mb-4 sm-tablet:mb-4 lg-tablet:mb-6">
										Quiz Complete! 🎉
									</h2>
									<p className="text-base sm-phone:text-lg md-phone:text-xl lg-phone:text-xl xl-phone:text-2xl sm-tablet:text-xl lg-tablet:text-2xl xl-tablet:text-3xl opacity-90 font-bold">
										You scored {score} out of {currentQuestions.length} (
										{scorePercentage}%)
									</p>
								</div>
							</div>

							{/* Results Content */}
							<div className="p-3 sm-phone:p-4 md-phone:p-5 sm-tablet:p-6 lg-tablet:p-8 xl-tablet:p-12">
								<div className="grid lg-tablet:grid-cols-2 gap-6 sm-phone:gap-8 md-phone:gap-10 sm-tablet:gap-12 lg-tablet:gap-16 mb-6 sm-phone:mb-8 md-phone:mb-10 sm-tablet:mb-12 lg-tablet:mb-16">
									{/* Score Breakdown */}
									<div className="text-center">
										<h3 className="text-lg sm-phone:text-xl md-phone:text-2xl sm-tablet:text-2xl lg-tablet:text-3xl font-bold mb-3 sm-phone:mb-4 md-phone:mb-5 sm-tablet:mb-6 lg-tablet:mb-8 text-gray-800">
											Score Breakdown
										</h3>
										<ResponsiveContainer
											width="100%"
											height={200}
											className="sm-phone:!h-[220px] md-phone:!h-[250px] sm-tablet:!h-[300px]"
										>
											<PieChart>
												<Pie
													data={resultData}
													cx="50%"
													cy="50%"
													outerRadius={60}
													className="sm-phone:!r-[70px] md-phone:!r-[80px] sm-tablet:!r-[100px]"
													dataKey="value"
													label={({ name, value }) => `${name}: ${value}`}
													labelLine={false}
												>
													{resultData.map((entry, index) => (
														<Cell key={`cell-${index}`} fill={entry.color} />
													))}
												</Pie>
												<Tooltip />
											</PieChart>
										</ResponsiveContainer>
									</div>

									{/* Performance Message */}
									<div className="flex items-center justify-center">
										<div className="text-center">
											<div
												className={`text-4xl sm-phone:text-5xl md-phone:text-6xl sm-tablet:text-7xl lg-tablet:text-8xl xl-tablet:text-9xl font-black mb-3 sm-phone:mb-4 md-phone:mb-5 sm-tablet:mb-6 lg-tablet:mb-8 ${getScoreColor(
													scorePercentage
												)} animate-pulse`}
											>
												{scorePercentage}%
											</div>
											<div className="space-y-3 sm-phone:space-y-4 md-phone:space-y-5 sm-tablet:space-y-6">
												{scorePercentage >= 80 && (
													<div className="bg-gradient-to-r from-emerald-100 to-green-200 backdrop-blur-sm rounded-xl sm-phone:rounded-2xl sm-tablet:rounded-3xl p-3 sm-phone:p-4 md-phone:p-5 sm-tablet:p-6 lg-tablet:p-8 border-2 border-emerald-200 shadow-lg">
														<p className="text-base sm-phone:text-lg md-phone:text-xl sm-tablet:text-2xl lg-tablet:text-3xl font-bold text-emerald-700 mb-1 sm-phone:mb-2 sm-tablet:mb-3 flex items-center justify-center gap-1 sm-phone:gap-2">
															<Trophy className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 md-phone:w-7 md-phone:h-7 sm-tablet:w-8 sm-tablet:h-8 lg-tablet:w-10 lg-tablet:h-10" />
															Outstanding!
														</p>
														<p className="text-gray-700 text-xs sm-phone:text-sm md-phone:text-sm sm-tablet:text-base lg-tablet:text-lg xl-tablet:text-xl leading-relaxed">
															You've mastered this topic! You're ready for the
															exam! 🌟
														</p>
													</div>
												)}
												{scorePercentage >= 60 && scorePercentage < 80 && (
													<div className="bg-gradient-to-r from-amber-100 to-yellow-200 backdrop-blur-sm rounded-xl sm-phone:rounded-2xl sm-tablet:rounded-3xl p-3 sm-phone:p-4 md-phone:p-5 sm-tablet:p-6 lg-tablet:p-8 border-2 border-amber-200 shadow-lg">
														<p className="text-base sm-phone:text-lg md-phone:text-xl sm-tablet:text-2xl lg-tablet:text-3xl font-bold text-amber-700 mb-1 sm-phone:mb-2 sm-tablet:mb-3 flex items-center justify-center gap-1 sm-phone:gap-2">
															<Zap className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 md-phone:w-7 md-phone:h-7 sm-tablet:w-8 sm-tablet:h-8 lg-tablet:w-10 lg-tablet:h-10" />
															Great Progress!
														</p>
														<p className="text-gray-700 text-xs sm-phone:text-sm md-phone:text-sm sm-tablet:text-base lg-tablet:text-lg xl-tablet:text-xl leading-relaxed">
															You're getting there! A bit more practice and
															you'll ace it! ⚡
														</p>
													</div>
												)}
												{scorePercentage < 60 && (
													<div className="bg-gradient-to-r from-rose-100 to-red-200 backdrop-blur-sm rounded-xl sm-phone:rounded-2xl sm-tablet:rounded-3xl p-3 sm-phone:p-4 md-phone:p-5 sm-tablet:p-6 lg-tablet:p-8 border-2 border-rose-200 shadow-lg">
														<p className="text-base sm-phone:text-lg md-phone:text-xl sm-tablet:text-2xl lg-tablet:text-3xl font-bold text-rose-700 mb-1 sm-phone:mb-2 sm-tablet:mb-3 flex items-center justify-center gap-1 sm-phone:gap-2">
															<Brain className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 md-phone:w-7 md-phone:h-7 sm-tablet:w-8 sm-tablet:h-8 lg-tablet:w-10 lg-tablet:h-10" />
															Keep Learning!
														</p>
														<p className="text-gray-700 text-xs sm-phone:text-sm md-phone:text-sm sm-tablet:text-base lg-tablet:text-lg xl-tablet:text-xl leading-relaxed">
															Don't give up! Every expert was once a beginner!
															💪
														</p>
													</div>
												)}
											</div>
										</div>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex flex-col sm-tablet:flex-row gap-3 sm-phone:gap-4 md-phone:gap-5 sm-tablet:gap-6 lg-tablet:gap-8 justify-center">
									<button
										onClick={restartQuiz}
										className="group relative px-4 py-3 sm-phone:px-5 sm-phone:py-4 md-phone:px-6 md-phone:py-4 sm-tablet:px-8 sm-tablet:py-5 lg-tablet:px-10 lg-tablet:py-6 xl-tablet:px-12 xl-tablet:py-6 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 text-white rounded-xl sm-phone:rounded-2xl sm-tablet:rounded-3xl font-bold text-sm sm-phone:text-base md-phone:text-base sm-tablet:text-lg lg-tablet:text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center gap-2 sm-phone:gap-3 overflow-hidden shadow-xl"
									>
										<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
										<RefreshCw className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 lg-tablet:w-6 lg-tablet:h-6 xl-tablet:w-7 xl-tablet:h-7 group-hover:animate-spin" />
										<span className="relative z-10">Try Another Adventure</span>
									</button>
									<button
										onClick={() => {
											setShowResults(false);
											setCurrentIndex(0);
											setScore(0);
											setSelectedAnswer(null);
											setTimeLeft(30);
											setIsTimerActive(true);
											setCurrentStreak(0);
										}}
										className="group relative px-4 py-3 sm-phone:px-5 sm-phone:py-4 md-phone:px-6 md-phone:py-4 sm-tablet:px-8 sm-tablet:py-5 lg-tablet:px-10 lg-tablet:py-6 xl-tablet:px-12 xl-tablet:py-6 bg-white/80 backdrop-blur-sm border-2 border-gray-300 text-gray-700 rounded-xl sm-phone:rounded-2xl sm-tablet:rounded-3xl font-bold text-sm sm-phone:text-base md-phone:text-base sm-tablet:text-lg lg-tablet:text-xl hover:bg-white/90 hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center gap-2 sm-phone:gap-3 overflow-hidden shadow-xl"
									>
										<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
										<Target className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 lg-tablet:w-6 lg-tablet:h-6 xl-tablet:w-7 xl-tablet:h-7 group-hover:animate-bounce" />
										<span className="relative z-10">Retry This Topic</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default English;
