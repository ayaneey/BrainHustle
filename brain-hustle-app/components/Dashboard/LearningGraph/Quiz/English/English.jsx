"use client";

import React, { useState, useEffect } from "react";
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
} from "recharts";
import {
	BookOpen,
	Award,
	Clock,
	Target,
	ArrowLeft,
	RefreshCw,
	TrendingUp,
	Brain,
	CheckCircle,
	XCircle,
	Timer,
} from "lucide-react";

// Import your JSON file here:
// import allEnglishQuestions from "./aqa-english-questions.json";

const English = () => {
	// For demo purposes, using a sample - replace with your imported JSON
	const allEnglishQuestions = [
		{
			topic: "Paper 1: Creative Reading & Writing",
			description:
				"Fiction texts, narrative writing, and descriptive techniques",
			questions: [
				{
					question:
						"What is the main purpose of the opening paragraph in a fictional text?",
					options: [
						"To establish setting and character",
						"To provide the conclusion",
						"To give historical context",
						"To summarize the plot",
					],
					answer: "To establish setting and character",
					difficulty: "easy",
				},
				{
					question: "How does temporal shift enhance narrative structure?",
					options: [
						"By confusing chronology",
						"By creating suspense and revealing character development",
						"By making stories longer",
						"By avoiding present tense",
					],
					answer: "By creating suspense and revealing character development",
					difficulty: "hard",
				},
			],
		},
		{
			topic: "Shakespeare: Macbeth",
			description: "Analysis of themes, characters, and language in Macbeth",
			questions: [
				{
					question: "What is Macbeth's tragic flaw?",
					options: ["Cowardice", "Ambition", "Stupidity", "Kindness"],
					answer: "Ambition",
					difficulty: "easy",
				},
				{
					question: "What is the dramatic effect of Macbeth's soliloquies?",
					options: [
						"They slow down the action",
						"They reveal his internal moral struggle",
						"They confuse the audience",
						"They provide facts",
					],
					answer: "They reveal his internal moral struggle",
					difficulty: "hard",
				},
			],
		},
	];

	const [selectedTopic, setSelectedTopic] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [score, setScore] = useState(0);
	const [showResults, setShowResults] = useState(false);
	const [timeLeft, setTimeLeft] = useState(30);
	const [isTimerActive, setIsTimerActive] = useState(false);
	const [difficultyFilter, setDifficultyFilter] = useState("all");
	const [scoreHistory, setScoreHistory] = useState([]);

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
			handleAnswer(null); // Auto-submit when time runs out
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
	};

	const getFilteredQuestions = () => {
		if (!selectedTopic) return [];
		const topicData = allEnglishQuestions.find(
			(t) => t.topic === selectedTopic
		);
		if (!topicData) return [];

		if (difficultyFilter === "all") return topicData.questions;
		return topicData.questions.filter((q) => q.difficulty === difficultyFilter);
	};

	const currentQuestions = getFilteredQuestions();
	const currentQ = currentQuestions?.[currentIndex];

	const handleAnswer = (option) => {
		if (selectedAnswer) return; // Prevent multiple selections

		setSelectedAnswer(option);
		setIsTimerActive(false);

		const isCorrect = option === currentQ?.answer;
		if (isCorrect) {
			setScore((prev) => prev + 1);
		}

		setTimeout(() => {
			if (currentIndex + 1 < currentQuestions.length) {
				setCurrentIndex((prev) => prev + 1);
				setSelectedAnswer(null);
				setTimeLeft(30);
				setIsTimerActive(true);
			} else {
				setShowResults(true);
				// Save to score history
				const newScore = {
					topic: selectedTopic,
					score: score + (isCorrect ? 1 : 0),
					total: currentQuestions.length,
					difficulty: difficultyFilter,
					date: new Date().toLocaleDateString(),
				};
				setScoreHistory((prev) => [...prev.slice(-4), newScore]);
			}
		}, 2000);
	};

	const restartQuiz = () => {
		setSelectedTopic(null);
		setDifficultyFilter("all");
		setTimeLeft(30);
		setIsTimerActive(false);
	};

	const getDifficultyColor = (difficulty) => {
		switch (difficulty) {
			case "easy":
				return "text-green-600 bg-green-100 border-green-200";
			case "medium":
				return "text-yellow-600 bg-yellow-100 border-yellow-200";
			case "hard":
				return "text-red-600 bg-red-100 border-red-200";
			default:
				return "text-gray-600 bg-gray-100 border-gray-200";
		}
	};

	const getScoreColor = (percentage) => {
		if (percentage >= 80) return "text-green-600";
		if (percentage >= 60) return "text-yellow-600";
		return "text-red-600";
	};

	const getTimerColor = () => {
		if (timeLeft > 20) return "text-green-600";
		if (timeLeft > 10) return "text-yellow-600";
		return "text-red-600";
	};

	const COLORS = ["#10b981", "#ef4444", "#6b7280"];

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
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="flex items-center justify-center gap-3 mb-4">
						<div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
							<BookOpen className="w-8 h-8 text-white" />
						</div>
						<div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								AQA GCSE English
							</h1>
							<p className="text-gray-600 text-sm">
								Language & Literature Mastery
							</p>
						</div>
					</div>
				</div>

				{/* Topic Selection */}
				{!selectedTopic && (
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-8">
							<h2 className="text-2xl font-bold text-gray-800 mb-2">
								Choose Your Focus Area
							</h2>
							<p className="text-gray-600 mb-6">
								Select a topic and difficulty level to begin your practice
							</p>

							{/* Difficulty Filter */}
							<div className="flex justify-center gap-3 mb-8">
								{["all", "easy", "medium", "hard"].map((difficulty) => (
									<button
										key={difficulty}
										onClick={() => setDifficultyFilter(difficulty)}
										className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
											difficultyFilter === difficulty
												? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
												: "bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-200"
										}`}
									>
										<div className="flex items-center gap-2">
											<Brain className="w-4 h-4" />
											{difficulty === "all"
												? "All Levels"
												: difficulty.charAt(0).toUpperCase() +
												  difficulty.slice(1)}
										</div>
									</button>
								))}
							</div>
						</div>

						{/* Topics Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
							{allEnglishQuestions.map((topicData) => {
								const filteredCount =
									difficultyFilter === "all"
										? topicData.questions.length
										: topicData.questions.filter(
												(q) => q.difficulty === difficultyFilter
										  ).length;

								return (
									<div
										key={topicData.topic}
										onClick={() =>
											filteredCount > 0 && handleTopicSelect(topicData.topic)
										}
										className={`group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 ${
											filteredCount > 0
												? "border-transparent hover:border-blue-200"
												: "border-gray-200 opacity-50 cursor-not-allowed"
										}`}
									>
										<div className="flex items-start justify-between mb-4">
											<div
												className={`p-3 rounded-xl ${
													filteredCount > 0
														? "bg-gradient-to-r from-blue-500 to-purple-500"
														: "bg-gray-300"
												}`}
											>
												<Target className="w-6 h-6 text-white" />
											</div>
											<div
												className={`px-3 py-1 rounded-full text-sm font-medium ${
													filteredCount > 0
														? "bg-blue-100 text-blue-800"
														: "bg-gray-100 text-gray-500"
												}`}
											>
												{filteredCount} questions
											</div>
										</div>

										<h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
											{topicData.topic}
										</h3>
										<p className="text-gray-600 text-sm leading-relaxed">
											{topicData.description}
										</p>

										{filteredCount > 0 && (
											<div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
												<span>Start Practice</span>
												<svg
													className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M9 5l7 7-7 7"
													/>
												</svg>
											</div>
										)}
									</div>
								);
							})}
						</div>

						{/* Score History */}
						{scoreHistory.length > 0 && (
							<div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
								<h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
									<TrendingUp className="w-5 h-5 text-blue-600" />
									Recent Performance
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-3">
										{scoreHistory.slice(-5).map((score, index) => (
											<div
												key={index}
												className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100"
											>
												<div>
													<div className="font-semibold text-sm text-gray-800">
														{score.topic}
													</div>
													<div className="text-xs text-gray-500 flex items-center gap-2">
														<span>{score.date}</span>
														<span
															className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(
																score.difficulty
															)}`}
														>
															{score.difficulty}
														</span>
													</div>
												</div>
												<div
													className={`font-bold text-lg ${getScoreColor(
														(score.score / score.total) * 100
													)}`}
												>
													{score.score}/{score.total}
												</div>
											</div>
										))}
									</div>
									{scoreHistory.length > 1 && (
										<div className="flex items-center justify-center">
											<ResponsiveContainer width="100%" height={200}>
												<BarChart data={scoreHistory.slice(-5)}>
													<XAxis dataKey="topic" hide />
													<YAxis domain={[0, "dataMax"]} />
													<Tooltip
														formatter={(value, name, props) => [
															`${value}/${props.payload.total}`,
															"Score",
														]}
														labelFormatter={() => ""}
													/>
													<Bar
														dataKey="score"
														fill="#3b82f6"
														radius={[4, 4, 0, 0]}
													/>
												</BarChart>
											</ResponsiveContainer>
										</div>
									)}
								</div>
							</div>
						)}
					</div>
				)}

				{/* Quiz Section */}
				{selectedTopic && !showResults && currentQ && (
					<div className="max-w-4xl mx-auto">
						<div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
							{/* Quiz Header */}
							<div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
								<div className="flex items-center justify-between mb-4">
									<button
										onClick={() => setSelectedTopic(null)}
										className="p-2 rounded-lg hover:bg-white/20 transition-colors"
										aria-label="Back to topic selection"
									>
										<ArrowLeft className="w-5 h-5" />
									</button>

									<div className="flex items-center gap-4">
										<div
											className={`flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 ${getTimerColor()}`}
										>
											<Timer className="w-4 h-4" />
											<span className="font-bold">{timeLeft}s</span>
										</div>
										<div
											className={`px-3 py-1 rounded-full border ${getDifficultyColor(
												currentQ.difficulty
											)}`}
										>
											{currentQ.difficulty.charAt(0).toUpperCase() +
												currentQ.difficulty.slice(1)}
										</div>
									</div>
								</div>

								<div>
									<h2 className="text-xl font-bold mb-1">{selectedTopic}</h2>
									<p className="text-blue-100">
										Question {currentIndex + 1} of {currentQuestions.length}
									</p>
								</div>
							</div>

							{/* Progress Bar */}
							<div className="w-full bg-gray-200 h-2">
								<div
									className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 transition-all duration-500 ease-out"
									style={{ width: `${progressPercent}%` }}
								></div>
							</div>

							{/* Question Content */}
							<div className="p-8">
								<div className="mb-8">
									<h3 className="text-xl font-semibold text-gray-800 leading-relaxed">
										{currentQ.question}
									</h3>
								</div>

								{/* Options */}
								<div className="grid gap-4">
									{currentQ.options.map((option, idx) => {
										let buttonClass =
											"p-4 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-102 ";

										if (selectedAnswer === option) {
											if (option === currentQ.answer) {
												buttonClass +=
													"bg-green-50 border-green-500 text-green-800 shadow-lg";
											} else {
												buttonClass +=
													"bg-red-50 border-red-500 text-red-800 shadow-lg";
											}
										} else if (selectedAnswer && option === currentQ.answer) {
											buttonClass +=
												"bg-green-50 border-green-500 text-green-800";
										} else {
											buttonClass +=
												"bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700";
										}

										return (
											<button
												key={idx}
												onClick={() => handleAnswer(option)}
												className={buttonClass}
												disabled={!!selectedAnswer}
											>
												<div className="flex items-center justify-between">
													<span className="font-medium">{option}</span>
													{selectedAnswer === option &&
														(option === currentQ.answer ? (
															<CheckCircle className="w-5 h-5 text-green-600" />
														) : (
															<XCircle className="w-5 h-5 text-red-600" />
														))}
													{selectedAnswer &&
														selectedAnswer !== option &&
														option === currentQ.answer && (
															<CheckCircle className="w-5 h-5 text-green-600" />
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
					<div className="max-w-4xl mx-auto">
						<div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
							{/* Results Header */}
							<div
								className={`p-8 text-center ${
									scorePercentage >= 80
										? "bg-gradient-to-r from-green-500 to-emerald-500"
										: scorePercentage >= 60
										? "bg-gradient-to-r from-yellow-500 to-orange-500"
										: "bg-gradient-to-r from-red-500 to-pink-500"
								} text-white`}
							>
								<div className="mb-4">
									<Award className="w-16 h-16 mx-auto mb-4" />
								</div>
								<h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
								<p className="text-lg opacity-90">
									You scored {score} out of {currentQuestions.length} (
									{scorePercentage}%)
								</p>
							</div>

							{/* Results Content */}
							<div className="p-8">
								<div className="grid md:grid-cols-2 gap-8 mb-8">
									{/* Score Breakdown */}
									<div className="text-center">
										<h3 className="text-xl font-semibold mb-4 text-gray-800">
											Score Breakdown
										</h3>
										<ResponsiveContainer width="100%" height={250}>
											<PieChart>
												<Pie
													data={resultData}
													cx="50%"
													cy="50%"
													outerRadius={80}
													dataKey="value"
													label={({ name, value }) => `${name}: ${value}`}
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
												className={`text-6xl font-bold mb-4 ${getScoreColor(
													scorePercentage
												)}`}
											>
												{scorePercentage}%
											</div>
											<div className="space-y-2">
												{scorePercentage >= 80 && (
													<div>
														<p className="text-lg font-semibold text-green-600">
															Excellent!
														</p>
														<p className="text-gray-600">
															You have a strong understanding of this topic.
														</p>
													</div>
												)}
												{scorePercentage >= 60 && scorePercentage < 80 && (
													<div>
														<p className="text-lg font-semibold text-yellow-600">
															Good Work!
														</p>
														<p className="text-gray-600">
															You're on the right track. Keep practicing!
														</p>
													</div>
												)}
												{scorePercentage < 60 && (
													<div>
														<p className="text-lg font-semibold text-red-600">
															Keep Learning!
														</p>
														<p className="text-gray-600">
															Review the material and try again.
														</p>
													</div>
												)}
											</div>
										</div>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<button
										onClick={restartQuiz}
										className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
									>
										<RefreshCw className="w-5 h-5" />
										Try Another Topic
									</button>
									<button
										onClick={() => {
											setShowResults(false);
											setCurrentIndex(0);
											setScore(0);
											setSelectedAnswer(null);
											setTimeLeft(30);
											setIsTimerActive(true);
										}}
										className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
									>
										<Target className="w-5 h-5" />
										Retry This Topic
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
