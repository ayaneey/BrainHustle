"use client";

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useUser } from "@clerk/nextjs";
import scienceQuestions from "./science-questions.json";

const Science = () => {
	const { user } = useUser();
	const userId = user?.id;

	const [selectedTopic, setSelectedTopic] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [score, setScore] = useState(0);
	const [showResults, setShowResults] = useState(false);
	const [currentStreak, setCurrentStreak] = useState(0);
	const [showStreakAnimation, setShowStreakAnimation] = useState(false);
	const [timeLeft, setTimeLeft] = useState(40);
	const [isTimerActive, setIsTimerActive] = useState(false);

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
		setCurrentStreak(0);
		setTimeLeft(40);
		setIsTimerActive(true);
	};

	const currentQuestions = React.useMemo(() => {
		if (!selectedTopic) return [];
		const topicData = scienceQuestions?.find(
			(topicData) => topicData.topic === selectedTopic
		);
		return topicData?.questions || [];
	}, [selectedTopic]);

	const currentQ = currentQuestions?.[currentIndex];

	const saveScoreToDB = async () => {
		if (!userId) return;
		try {
			await fetch("/api/quizResults", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: userId,
					subject: selectedTopic,
					score: score,
					totalQuestions: currentQuestions.length,
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
			if (currentIndex + 1 < currentQuestions.length) {
				setCurrentIndex((prev) => prev + 1);
				setSelectedAnswer(null);
				setTimeLeft(40);
				setIsTimerActive(true);
			} else {
				saveScoreToDB();
				setShowResults(true);
			}
		}, 2000);
	};

	const restartQuiz = () => {
		setSelectedTopic(null);
		setCurrentStreak(0);
		setTimeLeft(40);
		setIsTimerActive(false);
	};

	const getScoreColor = (percentage) => {
		if (percentage >= 80) return "text-emerald-600";
		if (percentage >= 60) return "text-amber-600";
		return "text-rose-600";
	};

	const getTimerColor = () => {
		if (timeLeft > 25) return "text-white bg-emerald-500/90";
		if (timeLeft > 10) return "text-white bg-amber-500/90";
		return "text-white bg-rose-500/90 animate-pulse";
	};

	// Add safety check for scienceQuestions
	if (!scienceQuestions || !Array.isArray(scienceQuestions)) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 px-3 sm-phone:px-4">
				<div className="text-center p-4 md-phone:p-6 sm-tablet:p-8">
					<h2 className="text-lg sm-phone:text-xl md-phone:text-xl sm-tablet:text-2xl font-bold text-gray-800 mb-4">
						Loading Science Questions...
					</h2>
					<p className="text-gray-600 text-sm md-phone:text-sm sm-tablet:text-base">
						Please check that science-questions.json is properly formatted.
					</p>
				</div>
			</div>
		);
	}

	const resultData = currentQuestions.length
		? [
				{ name: "Correct", value: score, color: "#10b981" },
				{
					name: "Incorrect",
					value: currentQuestions.length - score,
					color: "#ef4444",
				},
		  ]
		: [];

	const progressPercent = currentQuestions.length
		? Math.round(
				((currentIndex + (showResults ? 1 : 0)) / currentQuestions.length) * 100
		  )
		: 0;

	const scorePercentage = currentQuestions.length
		? Math.round((score / currentQuestions.length) * 100)
		: 0;

	return (
		<div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden">
			{/* Responsive Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-4 -left-4 w-24 h-24 sm-phone:w-32 sm-phone:h-32 md-phone:w-36 md-phone:h-36 sm-tablet:w-48 sm-tablet:h-48 lg-tablet:w-72 lg-tablet:h-72 bg-gradient-to-br from-teal-200 to-cyan-300 rounded-full opacity-20 animate-pulse"></div>
				<div className="absolute top-1/4 -right-4 w-32 h-32 sm-phone:w-40 sm-phone:h-40 md-phone:w-48 md-phone:h-48 sm-tablet:w-64 sm-tablet:h-64 lg-tablet:w-96 lg-tablet:h-96 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-20 animate-pulse"></div>
				<div className="absolute -bottom-4 left-1/4 w-28 h-28 sm-phone:w-36 sm-phone:h-36 md-phone:w-44 md-phone:h-44 sm-tablet:w-56 sm-tablet:h-56 lg-tablet:w-80 lg-tablet:h-80 bg-gradient-to-br from-cyan-200 to-teal-300 rounded-full opacity-20 animate-pulse"></div>
			</div>

			{/* Streak Animation */}
			{showStreakAnimation && (
				<div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none px-3 sm-phone:px-4">
					<div className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-3 py-2 sm-phone:px-4 sm-phone:py-3 md-phone:px-5 md-phone:py-3 sm-tablet:px-8 sm-tablet:py-6 rounded-xl md-phone:rounded-2xl sm-tablet:rounded-3xl text-sm sm-phone:text-base md-phone:text-lg sm-tablet:text-2xl lg-tablet:text-3xl font-bold shadow-2xl animate-bounce text-center">
						🔥 STREAK! {currentStreak} in a row! 🔥
					</div>
				</div>
			)}

			<div className="container mx-auto px-3 sm-phone:px-4 md-phone:px-5 sm-tablet:px-6 py-4 sm-phone:py-6 md-phone:py-8 sm-tablet:py-10 lg-tablet:py-12 relative z-10">
				{/* Header */}
				<div className="text-center mb-6 sm-phone:mb-8 md-phone:mb-10 sm-tablet:mb-12 lg-tablet:mb-16">
					<div className="flex flex-col sm-tablet:flex-row items-center justify-center gap-3 sm-phone:gap-4 md-phone:gap-5 sm-tablet:gap-6 mb-4 sm-phone:mb-6 md-phone:mb-7 sm-tablet:mb-8">
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-xl sm-phone:rounded-2xl sm-tablet:rounded-3xl blur-xl opacity-40 animate-pulse"></div>
							<div className="relative p-2 sm-phone:p-3 md-phone:p-4 sm-tablet:p-5 lg-tablet:p-6 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl sm-phone:rounded-2xl sm-tablet:rounded-3xl shadow-xl">
								<span className="text-xl sm-phone:text-2xl md-phone:text-3xl sm-tablet:text-3xl lg-tablet:text-4xl">
									🧪
								</span>
							</div>
						</div>
						<div className="text-center sm-tablet:text-left">
							<h1 className="text-2xl sm-phone:text-3xl md-phone:text-4xl lg-phone:text-4xl xl-phone:text-5xl sm-tablet:text-5xl lg-tablet:text-6xl font-black bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent leading-tight">
								AQA GCSE Science
							</h1>
							<p className="text-cyan-600 text-xs sm-phone:text-sm md-phone:text-base sm-tablet:text-lg lg-tablet:text-xl font-semibold mt-1 sm-phone:mt-2 sm-tablet:mt-3">
								✨ Biology • Chemistry • Physics ✨
							</p>
						</div>
					</div>
				</div>

				{/* Topic Selection */}
				{!selectedTopic && (
					<div className="max-w-7xl mx-auto">
						<div className="text-center mb-6 sm-phone:mb-8 md-phone:mb-10 sm-tablet:mb-12 lg-tablet:mb-16">
							<h2 className="text-xl sm-phone:text-2xl md-phone:text-3xl lg-phone:text-3xl xl-phone:text-4xl sm-tablet:text-4xl lg-tablet:text-5xl font-bold text-gray-800 mb-3 sm-phone:mb-4 md-phone:mb-5 sm-tablet:mb-6 leading-tight">
								Discover the World of Science 🔬
							</h2>
							<p className="text-gray-600 text-sm sm-phone:text-sm md-phone:text-base lg-phone:text-base xl-phone:text-lg sm-tablet:text-lg lg-tablet:text-xl xl-tablet:text-2xl mb-6 sm-phone:mb-8 md-phone:mb-10 sm-tablet:mb-10 lg-tablet:mb-12 max-w-xs sm-phone:max-w-sm md-phone:max-w-md lg-phone:max-w-lg xl-phone:max-w-xl sm-tablet:max-w-2xl lg-tablet:max-w-3xl mx-auto leading-relaxed px-2">
								Dive deep into the fascinating world of science and test your
								knowledge
							</p>

							{/* Topics Grid - Fully Responsive */}
							<div className="grid grid-cols-1 sm-tablet:grid-cols-2 xl-tablet:grid-cols-3 gap-3 sm-phone:gap-4 md-phone:gap-5 sm-tablet:gap-6 lg-tablet:gap-8">
								{scienceQuestions.map((topicData, index) => {
									const bgGradients = [
										"from-green-50 to-emerald-100",
										"from-purple-50 to-violet-100",
										"from-blue-50 to-indigo-100",
										"from-amber-50 to-orange-100",
										"from-indigo-50 to-purple-100",
									];

									const icons = ["🧬", "⚗️", "⚛️", "🌍", "🔭"];

									return (
										<div
											key={topicData.topic}
											onClick={() => handleTopicSelect(topicData.topic)}
											className={`group relative bg-gradient-to-br ${
												bgGradients[index % bgGradients.length]
											} rounded-xl sm-phone:rounded-2xl sm-tablet:rounded-3xl p-3 sm-phone:p-4 md-phone:p-5 sm-tablet:p-6 lg-tablet:p-8 shadow-xl border-2 border-white transition-all duration-500 transform hover:scale-105 cursor-pointer hover:shadow-2xl`}
										>
											<div className="relative z-10">
												<div className="flex items-start justify-between mb-3 sm-phone:mb-4 md-phone:mb-5 sm-tablet:mb-6 lg-tablet:mb-8">
													<div className="text-2xl sm-phone:text-3xl md-phone:text-4xl sm-tablet:text-4xl lg-tablet:text-5xl xl-tablet:text-6xl">
														{icons[index % icons.length]}
													</div>
													<div className="bg-white/80 backdrop-blur-sm px-2 py-1 sm-phone:px-2 sm-phone:py-1 md-phone:px-3 md-phone:py-1 sm-tablet:px-3 sm-tablet:py-2 lg-tablet:px-4 lg-tablet:py-2 rounded-lg sm-phone:rounded-xl sm-tablet:rounded-2xl text-gray-700 font-bold border border-gray-200 shadow-sm text-xs sm-phone:text-xs md-phone:text-sm sm-tablet:text-sm">
														20 questions
													</div>
												</div>

												<h3 className="text-base sm-phone:text-lg md-phone:text-xl lg-phone:text-xl xl-phone:text-xl sm-tablet:text-xl lg-tablet:text-2xl font-bold mb-2 sm-phone:mb-3 sm-tablet:mb-4 text-gray-800 group-hover:text-gray-900 transition-colors leading-tight">
													{topicData.topic}
												</h3>

												<div className="flex items-center text-gray-700 text-xs sm-phone:text-sm md-phone:text-sm sm-tablet:text-base lg-tablet:text-lg font-bold group-hover:text-gray-900 transition-colors">
													<span>Start Discovery</span>
													<span className="ml-2 sm-tablet:ml-3">→</span>
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
						<div className="bg-white/90 backdrop-blur-sm rounded-xl sm-phone:rounded-2xl sm-tablet:rounded-3xl shadow-2xl border border-white overflow-hidden">
							{/* Quiz Header */}
							<div className="bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-600 p-3 sm-phone:p-4 md-phone:p-5 sm-tablet:p-6 lg-tablet:p-8 xl-tablet:p-10 text-white">
								<div className="flex items-center justify-between mb-3 sm-phone:mb-4 md-phone:mb-5 sm-tablet:mb-6 lg-tablet:mb-8">
									<button
										onClick={() => setSelectedTopic(null)}
										className="p-2 sm-phone:p-2 md-phone:p-3 sm-tablet:p-3 lg-tablet:p-4 rounded-lg sm-phone:rounded-xl sm-tablet:rounded-2xl hover:bg-white/20 transition-all duration-300 text-base sm-phone:text-lg md-phone:text-xl sm-tablet:text-xl lg-tablet:text-2xl"
									>
										←
									</button>

									<div className="flex flex-col sm-tablet:flex-row items-center gap-2 sm-phone:gap-2 md-phone:gap-3 sm-tablet:gap-4 lg-tablet:gap-8">
										{currentStreak > 0 && (
											<div className="px-2 py-1 sm-phone:px-3 sm-phone:py-2 md-phone:px-4 md-phone:py-2 sm-tablet:px-4 sm-tablet:py-2 lg-tablet:px-6 lg-tablet:py-3 rounded-lg sm-phone:rounded-xl sm-tablet:rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold text-xs sm-phone:text-sm md-phone:text-sm sm-tablet:text-base">
												🔥 {currentStreak} streak!
											</div>
										)}
										<div
											className={`px-2 py-1 sm-phone:px-3 sm-phone:py-2 md-phone:px-4 md-phone:py-2 sm-tablet:px-4 sm-tablet:py-2 lg-tablet:px-6 lg-tablet:py-3 rounded-lg sm-phone:rounded-xl sm-tablet:rounded-2xl ${getTimerColor()} font-bold text-sm sm-phone:text-base md-phone:text-base sm-tablet:text-lg lg-tablet:text-xl border-2 border-white/30 shadow-lg`}
										>
											⏰ {timeLeft}s
										</div>
									</div>
								</div>

								<div>
									<h2 className="text-lg sm-phone:text-xl md-phone:text-2xl lg-phone:text-2xl xl-phone:text-3xl sm-tablet:text-3xl lg-tablet:text-4xl font-bold mb-1 sm-phone:mb-2 sm-tablet:mb-3 leading-tight">
										{selectedTopic}
									</h2>
									<p className="text-teal-100 text-xs sm-phone:text-sm md-phone:text-sm sm-tablet:text-base lg-tablet:text-lg xl-tablet:text-xl">
										Question {currentIndex + 1} of {currentQuestions.length}
									</p>
								</div>
							</div>

							{/* Progress Bar */}
							<div className="w-full bg-gray-200 h-2 sm-tablet:h-3 lg-tablet:h-4">
								<div
									className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 h-2 sm-tablet:h-3 lg-tablet:h-4 transition-all duration-1000 ease-out"
									style={{ width: `${progressPercent}%` }}
								></div>
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
											"p-3 sm-phone:p-4 md-phone:p-4 sm-tablet:p-5 lg-tablet:p-6 xl-tablet:p-8 rounded-lg sm-phone:rounded-xl sm-tablet:rounded-2xl lg-tablet:rounded-3xl border-2 text-left transition-all duration-500 transform hover:scale-105 font-semibold text-xs sm-phone:text-sm md-phone:text-sm sm-tablet:text-base lg-tablet:text-lg xl-tablet:text-xl shadow-lg ";

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
												"bg-white/80 backdrop-blur-sm border-gray-200 hover:border-teal-400 hover:bg-white/90 text-gray-800 hover:shadow-2xl";
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
													{selectedAnswer === option && (
														<span className="text-base sm-phone:text-lg sm-tablet:text-xl lg-tablet:text-2xl flex-shrink-0">
															{option === currentQ.answer ? "✅" : "❌"}
														</span>
													)}
													{selectedAnswer &&
														selectedAnswer !== option &&
														option === currentQ.answer && (
															<span className="text-base sm-phone:text-lg sm-tablet:text-xl lg-tablet:text-2xl flex-shrink-0">
																✅
															</span>
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
				{showResults && currentQuestions.length > 0 && (
					<div className="max-w-5xl mx-auto">
						<div className="bg-white/90 backdrop-blur-sm rounded-xl sm-phone:rounded-2xl sm-tablet:rounded-3xl shadow-2xl border border-white overflow-hidden">
							{/* Results Header */}
							<div
								className={`p-4 sm-phone:p-5 md-phone:p-6 sm-tablet:p-8 lg-tablet:p-10 xl-tablet:p-12 text-center ${
									scorePercentage >= 80
										? "bg-gradient-to-r from-emerald-400 via-green-500 to-teal-600"
										: scorePercentage >= 60
										? "bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-600"
										: "bg-gradient-to-r from-rose-400 via-red-500 to-pink-600"
								} text-white`}
							>
								<div className="mb-3 sm-phone:mb-4 md-phone:mb-5 sm-tablet:mb-6 lg-tablet:mb-8">
									<div className="text-3xl sm-phone:text-4xl md-phone:text-5xl sm-tablet:text-6xl lg-tablet:text-7xl xl-tablet:text-8xl mb-3 sm-phone:mb-4 md-phone:mb-5 sm-tablet:mb-6 lg-tablet:mb-8">
										🏆
									</div>
								</div>
								<h2 className="text-xl sm-phone:text-2xl md-phone:text-3xl lg-phone:text-3xl xl-phone:text-4xl sm-tablet:text-4xl lg-tablet:text-5xl xl-tablet:text-6xl font-black mb-2 sm-phone:mb-3 md-phone:mb-4 sm-tablet:mb-4 lg-tablet:mb-6 leading-tight">
									Experiment Complete! 🧪
								</h2>
								<p className="text-base sm-phone:text-lg md-phone:text-xl lg-phone:text-xl xl-phone:text-2xl sm-tablet:text-xl lg-tablet:text-2xl xl-tablet:text-3xl opacity-90 font-bold leading-relaxed">
									You scored {score} out of {currentQuestions.length} (
									{scorePercentage}%)
								</p>
								<p className="text-sm sm-phone:text-sm md-phone:text-base sm-tablet:text-base lg-tablet:text-lg xl-tablet:text-xl opacity-80 mt-1 sm-phone:mt-2 sm-tablet:mt-3 lg-tablet:mt-4">
									{selectedTopic}
								</p>
							</div>

							{/* Results Content */}
							<div className="p-3 sm-phone:p-4 md-phone:p-5 sm-tablet:p-6 lg-tablet:p-8 xl-tablet:p-12">
								<div className="grid lg-tablet:grid-cols-2 gap-6 sm-phone:gap-8 md-phone:gap-10 sm-tablet:gap-12 lg-tablet:gap-16 mb-6 sm-phone:mb-8 md-phone:mb-10 sm-tablet:mb-12 lg-tablet:mb-16">
									{/* Score Chart */}
									<div className="text-center">
										<h3 className="text-lg sm-phone:text-xl md-phone:text-2xl sm-tablet:text-2xl lg-tablet:text-3xl font-bold mb-3 sm-phone:mb-4 md-phone:mb-5 sm-tablet:mb-6 lg-tablet:mb-8 text-gray-800">
											Results Analysis
										</h3>
										<ResponsiveContainer
											width="100%"
											height={200}
											className="sm-phone:!h-[220px] md-phone:!h-[250px] sm-tablet:!h-[300px] lg-tablet:!h-[350px]"
										>
											<PieChart>
												<Pie
													data={resultData}
													cx="50%"
													cy="50%"
													outerRadius={60}
													className="sm-phone:!r-[70px] md-phone:!r-[80px] sm-tablet:!r-[100px] lg-tablet:!r-[120px]"
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
													<div className="bg-gradient-to-r from-emerald-100 to-green-200 rounded-xl sm-phone:rounded-2xl sm-tablet:rounded-3xl p-3 sm-phone:p-4 md-phone:p-5 sm-tablet:p-6 lg-tablet:p-8 border-2 border-emerald-200 shadow-lg">
														<p className="text-base sm-phone:text-lg md-phone:text-xl sm-tablet:text-2xl lg-tablet:text-3xl font-bold text-emerald-700 mb-1 sm-phone:mb-2 sm-tablet:mb-3">
															🏆 Scientific Genius! 🏆
														</p>
														<p className="text-gray-700 text-xs sm-phone:text-sm md-phone:text-sm sm-tablet:text-base lg-tablet:text-lg xl-tablet:text-xl leading-relaxed">
															Outstanding scientific knowledge! You're ready for
															advanced studies! 🌟
														</p>
													</div>
												)}
												{scorePercentage >= 60 && scorePercentage < 80 && (
													<div className="bg-gradient-to-r from-amber-100 to-yellow-200 rounded-xl sm-phone:rounded-2xl sm-tablet:rounded-3xl p-3 sm-phone:p-4 md-phone:p-5 sm-tablet:p-6 lg-tablet:p-8 border-2 border-amber-200 shadow-lg">
														<p className="text-base sm-phone:text-lg md-phone:text-xl sm-tablet:text-2xl lg-tablet:text-3xl font-bold text-amber-700 mb-1 sm-phone:mb-2 sm-tablet:mb-3">
															⚡ Great Discovery! ⚡
														</p>
														<p className="text-gray-700 text-xs sm-phone:text-sm md-phone:text-sm sm-tablet:text-base lg-tablet:text-lg xl-tablet:text-xl leading-relaxed">
															Solid scientific foundation! Continue exploring to
															reach mastery! 🔬
														</p>
													</div>
												)}
												{scorePercentage < 60 && (
													<div className="bg-gradient-to-r from-rose-100 to-red-200 rounded-xl sm-phone:rounded-2xl sm-tablet:rounded-3xl p-3 sm-phone:p-4 md-phone:p-5 sm-tablet:p-6 lg-tablet:p-8 border-2 border-rose-200 shadow-lg">
														<p className="text-base sm-phone:text-lg md-phone:text-xl sm-tablet:text-2xl lg-tablet:text-3xl font-bold text-rose-700 mb-1 sm-phone:mb-2 sm-tablet:mb-3">
															💪 Keep Exploring! 💪
														</p>
														<p className="text-gray-700 text-xs sm-phone:text-sm md-phone:text-sm sm-tablet:text-base lg-tablet:text-lg xl-tablet:text-xl leading-relaxed">
															Science is all about discovery! Keep experimenting
															and learning! 🧪
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
										className="px-4 py-3 sm-phone:px-5 sm-phone:py-4 md-phone:px-6 md-phone:py-4 sm-tablet:px-8 sm-tablet:py-5 lg-tablet:px-10 lg-tablet:py-6 xl-tablet:px-12 xl-tablet:py-6 bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-600 text-white rounded-xl sm-phone:rounded-2xl sm-tablet:rounded-3xl font-bold text-sm sm-phone:text-base md-phone:text-base sm-tablet:text-lg lg-tablet:text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 shadow-xl"
									>
										🧪 New Experiment
									</button>
									<button
										onClick={() => {
											setShowResults(false);
											setCurrentIndex(0);
											setScore(0);
											setSelectedAnswer(null);
											setTimeLeft(40);
											setIsTimerActive(true);
											setCurrentStreak(0);
										}}
										className="px-4 py-3 sm-phone:px-5 sm-phone:py-4 md-phone:px-6 md-phone:py-4 sm-tablet:px-8 sm-tablet:py-5 lg-tablet:px-10 lg-tablet:py-6 xl-tablet:px-12 xl-tablet:py-6 bg-white/80 backdrop-blur-sm border-2 border-gray-300 text-gray-700 rounded-xl sm-phone:rounded-2xl sm-tablet:rounded-3xl font-bold text-sm sm-phone:text-base md-phone:text-base sm-tablet:text-lg lg-tablet:text-xl hover:bg-white/90 hover:shadow-2xl transition-all duration-300 transform hover:scale-110 shadow-xl"
									>
										🔄 Retry Topic
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

export default Science;
