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
		if (timeLeft > 25) return "text-emerald-500";
		if (timeLeft > 10) return "text-amber-500";
		return "text-rose-500 animate-pulse";
	};

	// Add safety check for scienceQuestions
	if (!scienceQuestions || !Array.isArray(scienceQuestions)) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
				<div className="text-center p-8">
					<h2 className="text-2xl font-bold text-gray-800 mb-4">
						Loading Science Questions...
					</h2>
					<p className="text-gray-600">
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
			{/* Simplified Background */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-br from-teal-200 to-cyan-300 rounded-full opacity-20 animate-pulse"></div>
				<div className="absolute top-1/4 -right-4 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-20 animate-pulse"></div>
				<div className="absolute -bottom-4 left-1/4 w-80 h-80 bg-gradient-to-br from-cyan-200 to-teal-300 rounded-full opacity-20 animate-pulse"></div>
			</div>

			{/* Streak Animation */}
			{showStreakAnimation && (
				<div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none px-4">
					<div className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-8 py-6 rounded-3xl text-3xl font-bold shadow-2xl animate-bounce">
						🔥 STREAK! {currentStreak} in a row! 🔥
					</div>
				</div>
			)}

			<div className="container mx-auto px-6 py-12 relative z-10">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="flex items-center justify-center gap-6 mb-8">
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-3xl blur-xl opacity-40 animate-pulse"></div>
							<div className="relative p-6 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl shadow-xl">
								<span className="text-4xl">🧪</span>
							</div>
						</div>
						<div>
							<h1 className="text-6xl font-black bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
								AQA GCSE Science
							</h1>
							<p className="text-cyan-600 text-xl font-semibold mt-3">
								✨ Biology • Chemistry • Physics ✨
							</p>
						</div>
					</div>
				</div>

				{/* Topic Selection */}
				{!selectedTopic && (
					<div className="max-w-7xl mx-auto">
						<div className="text-center mb-16">
							<h2 className="text-5xl font-bold text-gray-800 mb-6">
								Discover the World of Science 🔬
							</h2>
							<p className="text-gray-600 text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
								Dive deep into the fascinating world of science and test your
								knowledge
							</p>

							{/* Topics Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
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
											} rounded-3xl p-8 shadow-xl border-2 border-white transition-all duration-500 transform hover:scale-105 cursor-pointer hover:shadow-2xl`}
										>
											<div className="relative z-10">
												<div className="flex items-start justify-between mb-8">
													<div className="text-6xl">
														{icons[index % icons.length]}
													</div>
													<div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl text-gray-700 font-bold border border-gray-200 shadow-sm">
														20 questions
													</div>
												</div>

												<h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-gray-900 transition-colors leading-tight">
													{topicData.topic}
												</h3>

												<div className="flex items-center text-gray-700 text-lg font-bold group-hover:text-gray-900 transition-colors">
													<span>Start Discovery</span>
													<span className="ml-3">→</span>
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
						<div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white overflow-hidden">
							{/* Quiz Header */}
							<div className="bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-600 p-10 text-white">
								<div className="flex items-center justify-between mb-8">
									<button
										onClick={() => setSelectedTopic(null)}
										className="p-4 rounded-2xl hover:bg-white/20 transition-all duration-300"
									>
										←
									</button>

									<div className="flex items-center gap-8">
										{currentStreak > 0 && (
											<div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold">
												🔥 {currentStreak} streak!
											</div>
										)}
										<div
											className={`px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-md ${getTimerColor()} font-bold text-xl`}
										>
											⏰ {timeLeft}s
										</div>
									</div>
								</div>

								<div>
									<h2 className="text-4xl font-bold mb-3">{selectedTopic}</h2>
									<p className="text-teal-100 text-xl">
										Question {currentIndex + 1} of {currentQuestions.length}
									</p>
								</div>
							</div>

							{/* Progress Bar */}
							<div className="w-full bg-gray-200 h-4">
								<div
									className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 h-4 transition-all duration-1000 ease-out"
									style={{ width: `${progressPercent}%` }}
								></div>
							</div>

							{/* Question Content */}
							<div className="p-12">
								<div className="mb-12">
									<h3 className="text-4xl font-bold text-gray-800 leading-relaxed">
										{currentQ.question}
									</h3>
								</div>

								{/* Options */}
								<div className="grid gap-8">
									{currentQ.options.map((option, idx) => {
										let buttonClass =
											"p-8 rounded-3xl border-2 text-left transition-all duration-500 transform hover:scale-105 font-semibold text-xl shadow-lg ";

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
													<span className="flex-1 pr-6">{option}</span>
													{selectedAnswer === option && (
														<span className="text-2xl">
															{option === currentQ.answer ? "✅" : "❌"}
														</span>
													)}
													{selectedAnswer &&
														selectedAnswer !== option &&
														option === currentQ.answer && (
															<span className="text-2xl">✅</span>
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
						<div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white overflow-hidden">
							{/* Results Header */}
							<div
								className={`p-12 text-center ${
									scorePercentage >= 80
										? "bg-gradient-to-r from-emerald-400 via-green-500 to-teal-600"
										: scorePercentage >= 60
										? "bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-600"
										: "bg-gradient-to-r from-rose-400 via-red-500 to-pink-600"
								} text-white`}
							>
								<div className="mb-8">
									<div className="text-8xl mb-8">🏆</div>
								</div>
								<h2 className="text-6xl font-black mb-6">
									Experiment Complete! 🧪
								</h2>
								<p className="text-3xl opacity-90 font-bold">
									You scored {score} out of {currentQuestions.length} (
									{scorePercentage}%)
								</p>
								<p className="text-xl opacity-80 mt-4">{selectedTopic}</p>
							</div>

							{/* Results Content */}
							<div className="p-12">
								<div className="grid lg:grid-cols-2 gap-16 mb-16">
									{/* Score Chart */}
									<div className="text-center">
										<h3 className="text-3xl font-bold mb-8 text-gray-800">
											Results Analysis
										</h3>
										<ResponsiveContainer width="100%" height={350}>
											<PieChart>
												<Pie
													data={resultData}
													cx="50%"
													cy="50%"
													outerRadius={120}
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
												className={`text-9xl font-black mb-8 ${getScoreColor(
													scorePercentage
												)} animate-pulse`}
											>
												{scorePercentage}%
											</div>
											<div className="space-y-6">
												{scorePercentage >= 80 && (
													<div className="bg-gradient-to-r from-emerald-100 to-green-200 rounded-3xl p-8 border-2 border-emerald-200 shadow-lg">
														<p className="text-3xl font-bold text-emerald-700 mb-3">
															🏆 Scientific Genius! 🏆
														</p>
														<p className="text-gray-700 text-xl">
															Outstanding scientific knowledge! You're ready for
															advanced studies! 🌟
														</p>
													</div>
												)}
												{scorePercentage >= 60 && scorePercentage < 80 && (
													<div className="bg-gradient-to-r from-amber-100 to-yellow-200 rounded-3xl p-8 border-2 border-amber-200 shadow-lg">
														<p className="text-3xl font-bold text-amber-700 mb-3">
															⚡ Great Discovery! ⚡
														</p>
														<p className="text-gray-700 text-xl">
															Solid scientific foundation! Continue exploring to
															reach mastery! 🔬
														</p>
													</div>
												)}
												{scorePercentage < 60 && (
													<div className="bg-gradient-to-r from-rose-100 to-red-200 rounded-3xl p-8 border-2 border-rose-200 shadow-lg">
														<p className="text-3xl font-bold text-rose-700 mb-3">
															💪 Keep Exploring! 💪
														</p>
														<p className="text-gray-700 text-xl">
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
								<div className="flex flex-col sm:flex-row gap-8 justify-center">
									<button
										onClick={restartQuiz}
										className="px-12 py-6 bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-600 text-white rounded-3xl font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 shadow-xl"
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
										className="px-12 py-6 bg-white/80 backdrop-blur-sm border-2 border-gray-300 text-gray-700 rounded-3xl font-bold text-xl hover:bg-white/90 hover:shadow-2xl transition-all duration-300 transform hover:scale-110 shadow-xl"
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
