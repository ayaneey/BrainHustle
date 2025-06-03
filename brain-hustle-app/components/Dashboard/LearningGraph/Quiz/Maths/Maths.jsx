"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
	Calculator,
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
	TrendingUp,
	BookOpen,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";

// Mock data for demonstration - replace with your actual questions.json import
const allTopics = [
	{
		topic: "Number & Calculations",
		questions: [
			{
				question: "What is 15% of 240?",
				options: ["36", "38", "40", "42"],
				answer: "36",
			},
			{
				question: "Calculate 7.5 × 4.2",
				options: ["31.5", "32.5", "30.5", "29.5"],
				answer: "31.5",
			},
		],
	},
	{
		topic: "Fractions & Decimals",
		questions: [
			{
				question: "Convert 3/8 to a decimal",
				options: ["0.375", "0.325", "0.425", "0.350"],
				answer: "0.375",
			},
		],
	},
	{
		topic: "Basic Algebra",
		questions: [
			{
				question: "Solve for x: 2x + 5 = 17",
				options: ["x = 6", "x = 7", "x = 8", "x = 9"],
				answer: "x = 6",
			},
		],
	},
	{
		topic: "Geometry Basics",
		questions: [
			{
				question:
					"What is the area of a rectangle with length 8cm and width 5cm?",
				options: ["40 cm²", "35 cm²", "45 cm²", "30 cm²"],
				answer: "40 cm²",
			},
		],
	},
	{
		topic: "Advanced Algebra",
		questions: [
			{
				question: "Expand (x + 3)(x - 2)",
				options: ["x² + x - 6", "x² - x + 6", "x² + x + 6", "x² - x - 6"],
				answer: "x² + x - 6",
			},
		],
	},
	{
		topic: "Quadratics & Functions",
		questions: [
			{
				question: "Find the roots of x² - 5x + 6 = 0",
				options: ["x = 2, 3", "x = 1, 6", "x = -2, -3", "x = 2, -3"],
				answer: "x = 2, 3",
			},
		],
	},
	{
		topic: "Trigonometry",
		questions: [
			{
				question: "What is sin(30°)?",
				options: ["1/2", "√3/2", "√2/2", "1"],
				answer: "1/2",
			},
		],
	},
	{
		topic: "Probability & Statistics",
		questions: [
			{
				question:
					"A fair coin is flipped twice. What's the probability of getting two heads?",
				options: ["1/4", "1/2", "1/3", "2/3"],
				answer: "1/4",
			},
		],
	},
];

const Maths = () => {
	const { user } = useUser();
	const userId = user?.id;

	const [selectedTier, setSelectedTier] = useState(null);
	const [selectedTopic, setSelectedTopic] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [score, setScore] = useState(0);
	const [showResults, setShowResults] = useState(false);
	const [shuffledQuestions, setShuffledQuestions] = useState([]);
	const [currentStreak, setCurrentStreak] = useState(0);
	const [showStreakAnimation, setShowStreakAnimation] = useState(false);
	const [timeLeft, setTimeLeft] = useState(45); // Longer time for math problems
	const [isTimerActive, setIsTimerActive] = useState(false);

	// Tier definitions for AQA GCSE
	const tiers = [
		{
			name: "Foundation",
			description: "Grades 1-5 • Essential Skills",
			icon: "📚",
			gradient: "from-emerald-500 to-teal-600",
			bgGradient: "from-emerald-50 to-teal-100",
		},
		{
			name: "Higher",
			description: "Grades 4-9 • Advanced Topics",
			icon: "🎯",
			gradient: "from-indigo-500 to-purple-600",
			bgGradient: "from-indigo-50 to-purple-100",
		},
	];

	// Topics organized by tier
	const topicsByTier = {
		Foundation: [
			"Number & Calculations",
			"Fractions & Decimals",
			"Percentages",
			"Basic Algebra",
			"Geometry Basics",
		],
		Higher: [
			"Advanced Algebra",
			"Quadratics & Functions",
			"Trigonometry",
			"Calculus Basics",
			"Probability & Statistics",
		],
	};

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

	// Function to shuffle array (Fisher-Yates algorithm)
	const shuffleArray = (array) => {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	};

	// Function to shuffle question options
	const shuffleQuestionOptions = (question) => {
		const correctAnswer = question.answer;
		const shuffledOptions = shuffleArray(question.options);
		return {
			...question,
			options: shuffledOptions,
			answer: correctAnswer,
		};
	};

	const handleTierSelect = (tier) => {
		setSelectedTier(tier);
		setSelectedTopic(null);
		setCurrentIndex(0);
		setSelectedAnswer(null);
		setScore(0);
		setShowResults(false);
		setCurrentStreak(0);
		setTimeLeft(45);
		setIsTimerActive(false);
	};

	const handleTopicSelect = (topic) => {
		setSelectedTopic(topic);
		setCurrentIndex(0);
		setSelectedAnswer(null);
		setScore(0);
		setShowResults(false);
		setCurrentStreak(0);
		setTimeLeft(45);
		setIsTimerActive(true);

		// Find and shuffle questions for the selected topic
		const topicData = allTopics.find((topicData) => topicData.topic === topic);
		if (topicData && topicData.questions) {
			const shuffled = shuffleArray(topicData.questions).map(
				shuffleQuestionOptions
			);
			setShuffledQuestions(shuffled);
		}
	};

	const currentQ = shuffledQuestions?.[currentIndex];

	const saveScoreToDB = async () => {
		if (!userId) return;
		try {
			await fetch("/api/quizResults", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: userId,
					subject: `${selectedTier} - ${selectedTopic}`,
					score: score,
					totalQuestions: shuffledQuestions.length,
					tier: selectedTier,
					date: new Date(),
				}),
			});
		} catch (error) {
			console.error("Error saving score:", error);
		}
	};

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
			if (currentIndex + 1 < shuffledQuestions.length) {
				setCurrentIndex((prev) => prev + 1);
				setSelectedAnswer(null);
				setTimeLeft(45);
				setIsTimerActive(true);
			} else {
				saveScoreToDB();
				setShowResults(true);
			}
		}, 2000);
	};

	const restartQuiz = () => {
		setSelectedTier(null);
		setSelectedTopic(null);
		setShuffledQuestions([]);
		setCurrentStreak(0);
		setTimeLeft(45);
		setIsTimerActive(false);
	};

	const goBackToTopics = () => {
		setSelectedTopic(null);
		setShuffledQuestions([]);
		setCurrentStreak(0);
		setTimeLeft(45);
		setIsTimerActive(false);
	};

	const getScoreColor = (percentage) => {
		if (percentage >= 80) return "text-emerald-600";
		if (percentage >= 60) return "text-amber-600";
		return "text-rose-600";
	};

	const getTimerColor = () => {
		if (timeLeft > 30) return "text-emerald-500";
		if (timeLeft > 15) return "text-amber-500";
		return "text-rose-500 animate-pulse";
	};

	// Return actual quiz count of 20 for display, but use demo data for actual quiz
	const getQuestionCountForDisplay = (tier, topic) => {
		return 20; // Show 20 questions for the actual quiz display
	};

	const resultData = shuffledQuestions.length
		? [
				{ name: "Correct", value: score, color: "#10b981" },
				{
					name: "Incorrect",
					value: shuffledQuestions.length - score,
					color: "#ef4444",
				},
		  ]
		: [];

	const progressPercent = shuffledQuestions.length
		? Math.round(
				((currentIndex + (showResults ? 1 : 0)) / shuffledQuestions.length) *
					100
		  )
		: 0;

	const scorePercentage = shuffledQuestions.length
		? Math.round((score / shuffledQuestions.length) * 100)
		: 0;

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
			{/* Decorative Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-4 -left-4 w-48 h-48 sm-phone:w-56 sm-phone:h-56 md-phone:w-64 md-phone:h-64 lg-phone:w-72 lg-phone:h-72 bg-gradient-to-br from-orange-200 to-amber-300 rounded-full opacity-20 animate-pulse"></div>
				<div
					className="absolute top-1/4 -right-4 w-56 h-56 sm-phone:w-64 sm-phone:h-64 md-phone:w-72 md-phone:h-72 lg-phone:w-80 lg-phone:h-80 xl-phone:w-96 xl-phone:h-96 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full opacity-20 animate-pulse"
					style={{ animationDelay: "2s" }}
				></div>
				<div
					className="absolute -bottom-4 left-1/4 w-48 h-48 sm-phone:w-56 sm-phone:h-56 md-phone:w-64 md-phone:h-64 lg-phone:w-72 lg-phone:h-72 xl-phone:w-80 xl-phone:h-80 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-full opacity-20 animate-pulse"
					style={{ animationDelay: "4s" }}
				></div>
			</div>

			{/* Streak Animation */}
			{showStreakAnimation && (
				<div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none px-4">
					<div className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-4 py-3 sm-phone:px-6 sm-phone:py-4 md-phone:px-8 md-phone:py-6 rounded-2xl lg-phone:rounded-3xl text-lg sm-phone:text-xl md-phone:text-2xl lg-phone:text-3xl font-bold shadow-2xl animate-bounce flex items-center gap-2 sm-phone:gap-3 md-phone:gap-4 max-w-sm sm-phone:max-w-md md-phone:max-w-lg text-center">
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
							<div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-2xl lg-phone:rounded-3xl blur-xl opacity-40 animate-pulse"></div>
							<div className="relative p-4 sm-phone:p-5 lg-phone:p-6 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-2xl lg-phone:rounded-3xl shadow-xl">
								<Calculator className="w-8 h-8 sm-phone:w-10 sm-phone:h-10 lg-phone:w-12 lg-phone:h-12 text-white" />
							</div>
						</div>
						<div className="text-center sm-tablet:text-left">
							<h1 className="text-3xl sm-phone:text-4xl md-phone:text-5xl lg-phone:text-6xl font-black bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
								AQA GCSE Maths
							</h1>
							<p className="text-amber-600 text-sm sm-phone:text-base md-phone:text-lg lg-phone:text-xl font-semibold mt-2 sm-phone:mt-3 flex items-center justify-center sm-tablet:justify-start gap-2 sm-phone:gap-3">
								<Sparkles className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 lg-phone:w-6 lg-phone:h-6" />
								Foundation & Higher Mastery
								<Sparkles className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 lg-phone:w-6 lg-phone:h-6" />
							</p>
						</div>
					</div>
				</div>

				{/* Tier Selection */}
				{!selectedTier && (
					<div className="max-w-5xl mx-auto">
						<div className="text-center mb-10 sm-phone:mb-12 lg-phone:mb-16">
							<h2 className="text-3xl sm-phone:text-4xl lg-phone:text-5xl font-bold text-gray-800 mb-4 sm-phone:mb-6">
								Choose Your GCSE Tier 🎯
							</h2>
							<p className="text-gray-600 text-lg sm-phone:text-xl lg-phone:text-2xl mb-8 sm-phone:mb-10 lg-phone:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
								Select the tier that matches your target grade and skill level
							</p>

							{/* Tier Cards */}
							<div className="grid grid-cols-1 sm-tablet:grid-cols-2 gap-8 sm-phone:gap-10 lg-phone:gap-12 max-w-4xl mx-auto">
								{tiers.map((tier, index) => (
									<div
										key={tier.name}
										onClick={() => handleTierSelect(tier.name)}
										className={`group relative bg-gradient-to-br ${tier.bgGradient} rounded-3xl p-8 sm-phone:p-10 lg-phone:p-12 shadow-xl border-2 border-white transition-all duration-500 transform hover:scale-105 cursor-pointer hover:shadow-2xl`}
									>
										<div className="relative z-10">
											<div className="flex items-center justify-between mb-8">
												<div
													className={`p-6 sm-phone:p-8 rounded-2xl bg-gradient-to-r ${tier.gradient} shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}
												>
													<div className="text-4xl sm-phone:text-5xl lg-phone:text-6xl">
														{tier.icon}
													</div>
												</div>
												<div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl text-gray-700 font-bold border border-gray-200 shadow-sm text-sm sm-phone:text-base">
													{getQuestionCountForDisplay(tier.name, "all")}{" "}
													questions
												</div>
											</div>

											<h3 className="text-3xl sm-phone:text-4xl lg-phone:text-5xl font-bold mb-4 text-gray-800 group-hover:text-gray-900 transition-colors">
												{tier.name}
											</h3>
											<p className="text-gray-600 text-lg sm-phone:text-xl leading-relaxed mb-8">
												{tier.description}
											</p>

											<div className="flex items-center text-gray-700 text-xl sm-phone:text-2xl font-bold group-hover:text-gray-900 transition-colors">
												<span>Start Journey</span>
												<svg
													className="w-7 h-7 sm-phone:w-8 sm-phone:h-8 ml-3 transform group-hover:translate-x-2 transition-transform duration-300"
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
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Topic Selection */}
				{selectedTier && !selectedTopic && (
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-10 sm-phone:mb-12 lg-phone:mb-16">
							<div className="flex flex-col sm-tablet:flex-row items-center justify-between mb-6 sm-phone:mb-8">
								<div className="flex items-center gap-4 mb-4 sm-tablet:mb-0">
									<div className="text-lg sm-phone:text-xl text-gray-600">
										<span className="font-semibold text-gray-800">
											{selectedTier} Tier
										</span>
									</div>
								</div>
								<button
									onClick={() => setSelectedTier(null)}
									className="p-3 sm-phone:p-4 rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
									aria-label="Back to tier selection"
								>
									<ArrowLeft className="w-6 h-6 sm-phone:w-7 sm-phone:h-7 text-gray-600" />
								</button>
							</div>

							<h2 className="text-3xl sm-phone:text-4xl lg-phone:text-5xl font-bold text-gray-800 mb-4 sm-phone:mb-6">
								Select Your Topic 📚
							</h2>
							<p className="text-gray-600 text-lg sm-phone:text-xl lg-phone:text-2xl mb-8 sm-phone:mb-10 lg-phone:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
								Choose a mathematics topic to practice and master
							</p>

							{/* Topics Grid */}
							<div className="grid grid-cols-1 sm-tablet:grid-cols-2 xl-tablet:grid-cols-3 gap-6 sm-phone:gap-8">
								{topicsByTier[selectedTier]?.map((topic, index) => {
									const topicGradients = [
										"from-orange-500 to-red-600",
										"from-amber-500 to-orange-600",
										"from-yellow-500 to-amber-600",
										"from-lime-500 to-green-600",
										"from-emerald-500 to-teal-600",
									];

									const bgGradients = [
										"from-orange-50 to-red-100",
										"from-amber-50 to-orange-100",
										"from-yellow-50 to-amber-100",
										"from-lime-50 to-green-100",
										"from-emerald-50 to-teal-100",
									];

									return (
										<div
											key={topic}
											onClick={() => handleTopicSelect(topic)}
											className={`group relative bg-gradient-to-br ${
												bgGradients[index % bgGradients.length]
											} rounded-2xl lg-phone:rounded-3xl p-6 sm-phone:p-8 shadow-xl border-2 border-white transition-all duration-500 transform hover:scale-105 cursor-pointer hover:shadow-2xl`}
										>
											<div className="relative z-10">
												<div className="flex items-start justify-between mb-6 sm-phone:mb-8">
													<div
														className={`p-4 sm-phone:p-5 rounded-xl lg-phone:rounded-2xl bg-gradient-to-r ${
															topicGradients[index % topicGradients.length]
														} shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}
													>
														<Target className="w-6 h-6 sm-phone:w-7 sm-phone:h-7 lg-phone:w-8 lg-phone:h-8 text-white" />
													</div>
													<div className="bg-white/80 backdrop-blur-sm px-3 py-1 sm-phone:px-4 sm-phone:py-2 rounded-xl lg-phone:rounded-2xl text-gray-700 font-bold border border-gray-200 shadow-sm text-sm sm-phone:text-base">
														{getQuestionCountForDisplay(selectedTier, topic)}{" "}
														questions
													</div>
												</div>

												<h3 className="text-lg sm-phone:text-xl lg-phone:text-2xl font-bold mb-3 sm-phone:mb-4 text-gray-800 group-hover:text-gray-900 transition-colors leading-tight">
													{topic}
												</h3>

												<div className="flex items-center text-gray-700 text-base sm-phone:text-lg font-bold group-hover:text-gray-900 transition-colors">
													<span>Start Practice</span>
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
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				)}

				{/* Quiz Section */}
				{selectedTopic && !showResults && currentQ && (
					<div className="max-w-5xl mx-auto">
						<div className="bg-white/90 backdrop-blur-sm rounded-2xl lg-phone:rounded-3xl shadow-2xl border border-white overflow-hidden">
							{/* Quiz Header */}
							<div className="bg-gradient-to-r from-orange-500 via-amber-600 to-yellow-600 p-6 sm-phone:p-8 lg-phone:p-10 text-white relative overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
								<div className="relative z-10">
									<div className="flex flex-col sm-tablet:flex-row items-start sm-tablet:items-center justify-between gap-4 sm-phone:gap-6 lg-phone:gap-8 mb-6 sm-phone:mb-8">
										<button
											onClick={goBackToTopics}
											className="p-3 sm-phone:p-4 rounded-xl lg-phone:rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
											aria-label="Back to topic selection"
										>
											<ArrowLeft className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 lg-phone:w-7 lg-phone:h-7" />
										</button>

										<div className="flex flex-wrap items-center gap-3 sm-phone:gap-4 lg-phone:gap-8">
											{currentStreak > 0 && (
												<div className="flex items-center gap-2 sm-phone:gap-3 px-3 py-2 sm-phone:px-4 sm-phone:py-2 lg-phone:px-6 lg-phone:py-3 rounded-xl lg-phone:rounded-2xl bg-gradient-to-r from-orange-400 to-yellow-500 text-white font-bold animate-pulse">
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
											<div className="px-3 py-2 sm-phone:px-4 sm-phone:py-2 lg-phone:px-6 lg-phone:py-3 rounded-xl lg-phone:rounded-2xl font-bold border-2 bg-white/80 text-gray-700 text-sm sm-phone:text-base">
												{selectedTier}
											</div>
										</div>
									</div>

									<div>
										<h2 className="text-2xl sm-phone:text-3xl lg-phone:text-4xl font-bold mb-2 sm-phone:mb-3">
											{selectedTopic}
										</h2>
										<p className="text-orange-100 text-base sm-phone:text-lg lg-phone:text-xl">
											Question {currentIndex + 1} of {shuffledQuestions.length}
										</p>
									</div>
								</div>
							</div>

							{/* Animated Progress Bar */}
							<div className="w-full bg-gray-200 h-3 sm-phone:h-4 relative overflow-hidden">
								<div
									className="bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 h-3 sm-phone:h-4 transition-all duration-1000 ease-out relative"
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
												"bg-white/80 backdrop-blur-sm border-gray-200 hover:border-orange-400 hover:bg-white/90 text-gray-800 hover:shadow-2xl";
										}

										return (
											<button
												key={idx}
												onClick={() => handleAnswer(option)}
												className={buttonClass}
												disabled={!!selectedAnswer}
											>
												<div className="flex items-center justify-between">
													<span className="flex-1 pr-4 sm-phone:pr-6 font-mono">
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
				{showResults && shuffledQuestions.length > 0 && (
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
										You scored {score} out of {shuffledQuestions.length} (
										{scorePercentage}%)
									</p>
									<p className="text-lg sm-phone:text-xl opacity-80 mt-2 sm-phone:mt-4">
										{selectedTier} Tier • {selectedTopic}
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
															Excellent! 🏆
															<Trophy className="w-8 h-8 sm-phone:w-10 sm-phone:h-10" />
														</p>
														<p className="text-gray-700 text-lg sm-phone:text-xl">
															Mathematical mastery achieved! You're exam ready!
															🌟
														</p>
													</div>
												)}
												{scorePercentage >= 60 && scorePercentage < 80 && (
													<div className="bg-gradient-to-r from-amber-100 to-yellow-200 backdrop-blur-sm rounded-2xl lg-phone:rounded-3xl p-6 sm-phone:p-8 border-2 border-amber-200 shadow-lg">
														<p className="text-2xl sm-phone:text-3xl font-bold text-amber-700 mb-2 sm-phone:mb-3 flex items-center justify-center gap-2 sm-phone:gap-3">
															<Zap className="w-8 h-8 sm-phone:w-10 sm-phone:h-10" />
															Well Done! ⚡
															<Zap className="w-8 h-8 sm-phone:w-10 sm-phone:h-10" />
														</p>
														<p className="text-gray-700 text-lg sm-phone:text-xl">
															Great progress! Keep practicing to reach mastery!
															📈
														</p>
													</div>
												)}
												{scorePercentage < 60 && (
													<div className="bg-gradient-to-r from-rose-100 to-red-200 backdrop-blur-sm rounded-2xl lg-phone:rounded-3xl p-6 sm-phone:p-8 border-2 border-rose-200 shadow-lg">
														<p className="text-2xl sm-phone:text-3xl font-bold text-rose-700 mb-2 sm-phone:mb-3 flex items-center justify-center gap-2 sm-phone:gap-3">
															<Brain className="w-8 h-8 sm-phone:w-10 sm-phone:h-10" />
															Keep Going! 💪
															<Brain className="w-8 h-8 sm-phone:w-10 sm-phone:h-10" />
														</p>
														<p className="text-gray-700 text-lg sm-phone:text-xl">
															Practice makes perfect! Review and try again! 📚
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
										onClick={goBackToTopics}
										className="group relative px-8 py-4 sm-phone:px-10 sm-phone:py-5 lg-phone:px-12 lg-phone:py-6 bg-gradient-to-r from-orange-500 via-amber-600 to-yellow-600 text-white rounded-2xl lg-phone:rounded-3xl font-bold text-lg sm-phone:text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center gap-3 sm-phone:gap-4 overflow-hidden shadow-xl"
									>
										<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
										<Target className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 lg-phone:w-7 lg-phone:h-7 group-hover:animate-bounce" />
										<span className="relative z-10">Try Another Topic</span>
									</button>
									<button
										onClick={restartQuiz}
										className="group relative px-8 py-4 sm-phone:px-10 sm-phone:py-5 lg-phone:px-12 lg-phone:py-6 bg-white/80 backdrop-blur-sm border-2 border-gray-300 text-gray-700 rounded-2xl lg-phone:rounded-3xl font-bold text-lg sm-phone:text-xl hover:bg-white/90 hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center gap-3 sm-phone:gap-4 overflow-hidden shadow-xl"
									>
										<div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
										<RefreshCw className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 lg-phone:w-7 lg-phone:h-7 group-hover:animate-spin" />
										<span className="relative z-10">Change Tier</span>
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

export default Maths;
