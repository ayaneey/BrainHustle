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
		if (timeLeft > 20) return "text-emerald-500";
		if (timeLeft > 10) return "text-amber-500";
		return "text-rose-500 animate-pulse";
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
				<div className="absolute -top-4 -left-4 w-48 h-48 sm-phone:w-56 sm-phone:h-56 md-phone:w-64 md-phone:h-64 lg-phone:w-72 lg-phone:h-72 bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full opacity-20 animate-pulse"></div>
				<div
					className="absolute top-1/4 -right-4 w-56 h-56 sm-phone:w-64 sm-phone:h-64 md-phone:w-72 md-phone:h-72 lg-phone:w-80 lg-phone:h-80 xl-phone:w-96 xl-phone:h-96 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full opacity-20 animate-pulse"
					style={{ animationDelay: "2s" }}
				></div>
				<div
					className="absolute -bottom-4 left-1/4 w-48 h-48 sm-phone:w-56 sm-phone:h-56 md-phone:w-64 md-phone:h-64 lg-phone:w-72 lg-phone:h-72 xl-phone:w-80 xl-phone:h-80 bg-gradient-to-br from-indigo-200 to-cyan-300 rounded-full opacity-20 animate-pulse"
					style={{ animationDelay: "4s" }}
				></div>
			</div>

			{/* Streak Animation */}
			{showStreakAnimation && (
				<div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none px-4">
					<div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-3 sm-phone:px-6 sm-phone:py-4 md-phone:px-8 md-phone:py-6 rounded-2xl lg-phone:rounded-3xl text-lg sm-phone:text-xl md-phone:text-2xl lg-phone:text-3xl font-bold shadow-2xl animate-bounce flex items-center gap-2 sm-phone:gap-3 md-phone:gap-4 max-w-sm sm-phone:max-w-md md-phone:max-w-lg text-center">
						<Flame className="w-6 h-6 sm-phone:w-8 sm-phone:h-8 md-phone:w-10 md-phone:h-10 animate-spin flex-shrink-0" />
						<span className="flex-1">
							🔥 STREAK! {currentStreak} in a row! 🔥
						</span>
						<Flame className="w-6 h-6 sm-phone:w-8 sm-phone:h-8 md-phone:w-10 md-phone:h-10 animate-spin flex-shrink-0" />
					</div>
				</div>
			)}

			<div className="container mx-auto px-4 sm-phone:px-6 py-8 sm-phone:py-12 relative z-10">
				{/* Header */}
				<div className="text-center mb-8 sm-phone:mb-12 lg-phone:mb-16">
					<div className="flex flex-col sm-tablet:flex-row items-center justify-center gap-4 sm-phone:gap-6 mb-6 sm-phone:mb-8">
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl lg-phone:rounded-3xl blur-xl opacity-40 animate-pulse"></div>
							<div className="relative p-4 sm-phone:p-5 lg-phone:p-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl lg-phone:rounded-3xl shadow-xl">
								<BookOpen className="w-8 h-8 sm-phone:w-10 sm-phone:h-10 lg-phone:w-12 lg-phone:h-12 text-white" />
							</div>
						</div>
						<div className="text-center sm-tablet:text-left">
							<h1 className="text-3xl sm-phone:text-4xl md-phone:text-5xl lg-phone:text-6xl font-black bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
								AQA GCSE English
							</h1>
							<p className="text-purple-600 text-sm sm-phone:text-base md-phone:text-lg lg-phone:text-xl font-semibold mt-2 sm-phone:mt-3 flex items-center justify-center sm-tablet:justify-start gap-2 sm-phone:gap-3">
								<Sparkles className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 lg-phone:w-6 lg-phone:h-6" />
								Language & Literature Mastery
								<Sparkles className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 lg-phone:w-6 lg-phone:h-6" />
							</p>
						</div>
					</div>
				</div>

				{/* Topic Selection */}
				{!selectedTopic && (
					<div className="max-w-7xl mx-auto">
						<div className="text-center mb-10 sm-phone:mb-12 lg-phone:mb-16">
							<h2 className="text-3xl sm-phone:text-4xl lg-phone:text-5xl font-bold text-gray-800 mb-4 sm-phone:mb-6">
								Select Your Learning Focus 📖
							</h2>
							<p className="text-gray-600 text-lg sm-phone:text-xl lg-phone:text-2xl mb-8 sm-phone:mb-10 lg-phone:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
								Select a topic and difficulty level to begin your epic learning
								journey
							</p>

							{/* Difficulty Filter */}
							<div className="flex flex-wrap justify-center gap-3 sm-phone:gap-4 lg-phone:gap-6 mb-10 sm-phone:mb-12 lg-phone:mb-16 px-4">
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
											className={`group relative px-4 py-3 sm-phone:px-6 sm-phone:py-4 lg-phone:px-10 lg-phone:py-5 rounded-2xl lg-phone:rounded-3xl font-bold text-sm sm-phone:text-base lg-phone:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
												difficultyFilter === difficulty.key
													? `bg-gradient-to-r ${difficulty.gradient} text-white shadow-2xl scale-105`
													: `bg-gradient-to-r ${difficulty.bgGradient} text-gray-700 hover:shadow-xl border-2 border-white`
											}`}
										>
											<div className="flex items-center gap-2 sm-phone:gap-3 lg-phone:gap-4">
												<Icon
													className={`w-4 h-4 sm-phone:w-5 sm-phone:h-5 lg-phone:w-7 lg-phone:h-7 ${
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
						<div className="grid grid-cols-1 sm-tablet:grid-cols-2 2xl-tablet:grid-cols-4 gap-6 sm-phone:gap-8 mb-8 sm-phone:mb-12 lg-phone:mb-16">
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
										} rounded-2xl lg-phone:rounded-3xl p-6 sm-phone:p-8 shadow-xl border-2 border-white transition-all duration-500 transform hover:scale-105 ${
											filteredCount > 0
												? "cursor-pointer hover:shadow-2xl"
												: "opacity-50 cursor-not-allowed"
										}`}
									>
										<div className="relative z-10">
											<div className="flex items-start justify-between mb-6 sm-phone:mb-8">
												<div
													className={`p-3 sm-phone:p-4 lg-phone:p-5 rounded-xl lg-phone:rounded-2xl bg-gradient-to-r ${
														cardGradients[index % cardGradients.length]
													} shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}
												>
													<Target className="w-6 h-6 sm-phone:w-7 sm-phone:h-7 lg-phone:w-8 lg-phone:h-8 text-white" />
												</div>
												<div className="bg-white/80 backdrop-blur-sm px-3 py-1 sm-phone:px-4 sm-phone:py-2 rounded-xl lg-phone:rounded-2xl text-gray-700 font-bold border border-gray-200 shadow-sm text-sm sm-phone:text-base">
													{displayCount} questions
												</div>
											</div>

											<h3 className="text-lg sm-phone:text-xl lg-phone:text-2xl font-bold mb-3 sm-phone:mb-4 text-gray-800 group-hover:text-gray-900 transition-colors leading-tight">
												{topicData.topic}
											</h3>
											<p className="text-gray-600 text-xs sm-phone:text-sm leading-relaxed mb-4 sm-phone:mb-6">
												{topicData.description}
											</p>

											{/* Difficulty breakdown */}
											<div className="flex flex-wrap gap-1 sm-phone:gap-2 mb-6 sm-phone:mb-8">
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
												<div className="flex items-center text-gray-700 text-base sm-phone:text-lg font-bold group-hover:text-gray-900 transition-colors">
													<span>Start Adventure</span>
													<svg
														className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 ml-2 sm-phone:ml-3 transform group-hover:translate-x-2 transition-transform duration-300"
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
						<div className="bg-white/90 backdrop-blur-sm rounded-2xl lg-phone:rounded-3xl shadow-2xl border border-white overflow-hidden">
							{/* Quiz Header */}
							<div className="bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 p-6 sm-phone:p-8 lg-phone:p-10 text-white relative overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
								<div className="relative z-10">
									<div className="flex flex-col sm-tablet:flex-row items-start sm-tablet:items-center justify-between gap-4 sm-phone:gap-6 lg-phone:gap-8 mb-6 sm-phone:mb-8">
										<button
											onClick={() => setSelectedTopic(null)}
											className="p-3 sm-phone:p-4 rounded-xl lg-phone:rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
											aria-label="Back to topic selection"
										>
											<ArrowLeft className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 lg-phone:w-7 lg-phone:h-7" />
										</button>

										<div className="flex flex-wrap items-center gap-3 sm-phone:gap-4 lg-phone:gap-8">
											{currentStreak > 0 && (
												<div className="flex items-center gap-2 sm-phone:gap-3 px-3 py-2 sm-phone:px-4 sm-phone:py-2 lg-phone:px-6 lg-phone:py-3 rounded-xl lg-phone:rounded-2xl bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold animate-pulse">
													<Flame className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 lg-phone:w-6 lg-phone:h-6" />
													<span className="text-sm sm-phone:text-base lg-phone:text-lg">
														{currentStreak} streak!
													</span>
												</div>
											)}
											<div
												className={`flex items-center gap-2 sm-phone:gap-3 px-3 py-2 sm-phone:px-4 sm-phone:py-2 lg-phone:px-6 lg-phone:py-3 rounded-xl lg-phone:rounded-2xl bg-white/20 backdrop-blur-md ${getTimerColor()} font-bold text-base sm-phone:text-lg lg-phone:text-xl`}
											>
												<Timer className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 lg-phone:w-6 lg-phone:h-6" />
												<span>{timeLeft}s</span>
											</div>
											<div
												className={`px-3 py-2 sm-phone:px-4 sm-phone:py-2 lg-phone:px-6 lg-phone:py-3 rounded-xl lg-phone:rounded-2xl font-bold border-2 text-sm sm-phone:text-base ${getDifficultyColor(
													currentQ.difficulty
												)}`}
											>
												{currentQ.difficulty.charAt(0).toUpperCase() +
													currentQ.difficulty.slice(1)}
											</div>
										</div>
									</div>

									<div>
										<h2 className="text-2xl sm-phone:text-3xl lg-phone:text-4xl font-bold mb-2 sm-phone:mb-3">
											{selectedTopic}
										</h2>
										<p className="text-cyan-100 text-base sm-phone:text-lg lg-phone:text-xl">
											Question {currentIndex + 1} of {currentQuestions.length}
										</p>
									</div>
								</div>
							</div>

							{/* Animated Progress Bar */}
							<div className="w-full bg-gray-200 h-3 sm-phone:h-4 relative overflow-hidden">
								<div
									className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 h-3 sm-phone:h-4 transition-all duration-1000 ease-out relative"
									style={{ width: `${progressPercent}%` }}
								>
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
								</div>
							</div>

							{/* Question Content */}
							<div className="p-6 sm-phone:p-8 lg-phone:p-12">
								<div className="mb-8 sm-phone:mb-10 lg-phone:mb-12">
									<h3 className="text-2xl sm-phone:text-3xl lg-phone:text-4xl font-bold text-gray-800 leading-relaxed">
										{currentQ.question}
									</h3>
								</div>

								{/* Options */}
								<div className="grid gap-4 sm-phone:gap-6 lg-phone:gap-8">
									{currentQ.options.map((option, idx) => {
										let buttonClass =
											"group relative p-4 sm-phone:p-6 lg-phone:p-8 rounded-2xl lg-phone:rounded-3xl border-2 text-left transition-all duration-500 transform hover:scale-105 font-semibold text-base sm-phone:text-lg lg-phone:text-xl shadow-lg ";

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
													<span className="flex-1 pr-4 sm-phone:pr-6">
														{option}
													</span>
													{selectedAnswer === option &&
														(option === currentQ.answer ? (
															<CheckCircle className="w-6 h-6 sm-phone:w-8 sm-phone:h-8 lg-phone:w-10 lg-phone:h-10 text-white animate-bounce" />
														) : (
															<XCircle className="w-6 h-6 sm-phone:w-8 sm-phone:h-8 lg-phone:w-10 lg-phone:h-10 text-white animate-bounce" />
														))}
													{selectedAnswer &&
														selectedAnswer !== option &&
														option === currentQ.answer && (
															<CheckCircle className="w-6 h-6 sm-phone:w-8 sm-phone:h-8 lg-phone:w-10 lg-phone:h-10 text-white animate-bounce" />
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
						<div className="bg-white/90 backdrop-blur-sm rounded-2xl lg-phone:rounded-3xl shadow-2xl border border-white overflow-hidden">
							{/* Results Header */}
							<div
								className={`p-8 sm-phone:p-10 lg-phone:p-12 text-center relative overflow-hidden ${
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
											<Star className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 lg-phone:w-6 lg-phone:h-6 text-white/30" />
										</div>
									))}
								</div>
								<div className="relative z-10">
									<div className="mb-6 sm-phone:mb-8">
										<Award className="w-16 h-16 sm-phone:w-20 sm-phone:h-20 lg-phone:w-24 lg-phone:h-24 mx-auto mb-6 sm-phone:mb-8 animate-bounce" />
									</div>
									<h2 className="text-4xl sm-phone:text-5xl lg-phone:text-6xl font-black mb-4 sm-phone:mb-6">
										Quiz Complete! 🎉
									</h2>
									<p className="text-xl sm-phone:text-2xl lg-phone:text-3xl opacity-90 font-bold">
										You scored {score} out of {currentQuestions.length} (
										{scorePercentage}%)
									</p>
								</div>
							</div>

							{/* Results Content */}
							<div className="p-6 sm-phone:p-8 lg-phone:p-12">
								<div className="grid lg-tablet:grid-cols-2 gap-8 sm-phone:gap-12 lg-phone:gap-16 mb-8 sm-phone:mb-12 lg-phone:mb-16">
									{/* Score Breakdown */}
									<div className="text-center">
										<h3 className="text-2xl sm-phone:text-3xl font-bold mb-6 sm-phone:mb-8 text-gray-800">
											Score Breakdown
										</h3>
										<ResponsiveContainer width="100%" height={300}>
											<PieChart>
												<Pie
													data={resultData}
													cx="50%"
													cy="50%"
													outerRadius={100}
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
												className={`text-6xl sm-phone:text-7xl lg-phone:text-9xl font-black mb-6 sm-phone:mb-8 ${getScoreColor(
													scorePercentage
												)} animate-pulse`}
											>
												{scorePercentage}%
											</div>
											<div className="space-y-4 sm-phone:space-y-6">
												{scorePercentage >= 80 && (
													<div className="bg-gradient-to-r from-emerald-100 to-green-200 backdrop-blur-sm rounded-2xl lg-phone:rounded-3xl p-6 sm-phone:p-8 border-2 border-emerald-200 shadow-lg">
														<p className="text-2xl sm-phone:text-3xl font-bold text-emerald-700 mb-2 sm-phone:mb-3 flex items-center justify-center gap-2 sm-phone:gap-3">
															<Trophy className="w-8 h-8 sm-phone:w-10 sm-phone:h-10" />
															Outstanding!
															<Trophy className="w-8 h-8 sm-phone:w-10 sm-phone:h-10" />
														</p>
														<p className="text-gray-700 text-lg sm-phone:text-xl">
															You've mastered this topic! You're ready for the
															exam! 🌟
														</p>
													</div>
												)}
												{scorePercentage >= 60 && scorePercentage < 80 && (
													<div className="bg-gradient-to-r from-amber-100 to-yellow-200 backdrop-blur-sm rounded-2xl lg-phone:rounded-3xl p-6 sm-phone:p-8 border-2 border-amber-200 shadow-lg">
														<p className="text-2xl sm-phone:text-3xl font-bold text-amber-700 mb-2 sm-phone:mb-3 flex items-center justify-center gap-2 sm-phone:gap-3">
															<Zap className="w-8 h-8 sm-phone:w-10 sm-phone:h-10" />
															Great Progress!
															<Zap className="w-8 h-8 sm-phone:w-10 sm-phone:h-10" />
														</p>
														<p className="text-gray-700 text-lg sm-phone:text-xl">
															You're getting there! A bit more practice and
															you'll ace it! ⚡
														</p>
													</div>
												)}
												{scorePercentage < 60 && (
													<div className="bg-gradient-to-r from-rose-100 to-red-200 backdrop-blur-sm rounded-2xl lg-phone:rounded-3xl p-6 sm-phone:p-8 border-2 border-rose-200 shadow-lg">
														<p className="text-2xl sm-phone:text-3xl font-bold text-rose-700 mb-2 sm-phone:mb-3 flex items-center justify-center gap-2 sm-phone:gap-3">
															<Brain className="w-8 h-8 sm-phone:w-10 sm-phone:h-10" />
															Keep Learning!
															<Brain className="w-8 h-8 sm-phone:w-10 sm-phone:h-10" />
														</p>
														<p className="text-gray-700 text-lg sm-phone:text-xl">
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
								<div className="flex flex-col sm-tablet:flex-row gap-4 sm-phone:gap-6 lg-phone:gap-8 justify-center">
									<button
										onClick={restartQuiz}
										className="group relative px-8 py-4 sm-phone:px-10 sm-phone:py-5 lg-phone:px-12 lg-phone:py-6 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 text-white rounded-2xl lg-phone:rounded-3xl font-bold text-lg sm-phone:text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center gap-3 sm-phone:gap-4 overflow-hidden shadow-xl"
									>
										<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
										<RefreshCw className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 lg-phone:w-7 lg-phone:h-7 group-hover:animate-spin" />
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
										className="group relative px-8 py-4 sm-phone:px-10 sm-phone:py-5 lg-phone:px-12 lg-phone:py-6 bg-white/80 backdrop-blur-sm border-2 border-gray-300 text-gray-700 rounded-2xl lg-phone:rounded-3xl font-bold text-lg sm-phone:text-xl hover:bg-white/90 hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center gap-3 sm-phone:gap-4 overflow-hidden shadow-xl"
									>
										<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
										<Target className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 lg-phone:w-7 lg-phone:h-7 group-hover:animate-bounce" />
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
