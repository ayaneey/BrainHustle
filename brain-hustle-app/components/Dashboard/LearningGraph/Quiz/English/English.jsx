import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
	BookOpen,
	Award,
	Target,
	ArrowLeft,
	RefreshCw,
	CheckCircle,
	XCircle,
	Timer,
	Play,
} from "lucide-react";
import questionsData from "./english-questions.json";
import { useUser } from "@clerk/nextjs";

// Custom SVG Icon Components
const ChristmasCarolIcon = ({ className = "w-6 h-6" }) => (
	<img
		src="/images/english-quiz/a-christmas-carol.svg"
		alt="Christmas Carol"
		className={className}
	/>
);

const MacbethIcon = ({ className = "w-6 h-6" }) => (
	<img
		src="/images/english-quiz/macbeth.svg"
		alt="Macbeth"
		className={className}
	/>
);

const InspectorCallsIcon = ({ className = "w-6 h-6" }) => (
	<img
		src="/images/english-quiz/an-inspector-calls.svg"
		alt="An Inspector Calls"
		className={className}
	/>
);

const LanguagePaperIcon = ({ className = "w-6 h-6" }) => (
	<img
		src="/images/english-quiz/language-paper-1.svg"
		alt="Language Paper 1"
		className={className}
	/>
);

const English = () => {
	const { user, isLoaded } = useUser();
	const [selectedTopic, setSelectedTopic] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [score, setScore] = useState(0);
	const [showResults, setShowResults] = useState(false);
	const [shuffledQuestions, setShuffledQuestions] = useState([]);
	const [timeLeft, setTimeLeft] = useState(30);
	const [isTimerActive, setIsTimerActive] = useState(false);

	// Function to save quiz results to database
	const saveQuizResult = async (topic, finalScore, totalQuestions) => {
		// Only save if user is loaded and authenticated
		if (!isLoaded || !user?.id) {
			console.log("User not authenticated, skipping save");
			return;
		}

		try {
			const response = await fetch("/api/quizResults", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: user.id,
					subject: `English - ${topic}`,
					score: finalScore,
					totalQuestions: totalQuestions,
					date: new Date().toISOString(),
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to save quiz result");
			}

			console.log("Quiz result saved successfully");
		} catch (error) {
			console.error("Failed to save quiz result:", error);
		}
	};

	// Function to assign colors to topics
	const getTopicColor = (topic) => {
		switch (topic) {
			case "Paper 1: Creative Reading & Writing":
				return "from-[#c46faa] to-[#ffc2d1]";
			case "Shakespeare: Macbeth":
				return "from-[#89b0ae] to-[#84c6ec]";
			case "A Christmas Carol":
				return "from-[#51a376] to-[#dfedbf]";
			case "An Inspector Calls":
				return "from-[#9ccfc4] to-[#fec3a6]";
			default:
				return "from-[#adb5bd] to-[#F8F4EC]";
		}
	};

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

	// Add colors to each topic
	const englishQuestions = questionsData.map((topic) => ({
		...topic,
		color: getTopicColor(topic.topic),
	}));

	const currentQ = shuffledQuestions?.[currentIndex];

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

		// Find and shuffle questions for the selected topic
		const topicData = questionsData.find(
			(topicData) => topicData.topic === topic
		);
		if (topicData && topicData.questions) {
			const shuffled = shuffleArray(topicData.questions).map(
				shuffleQuestionOptions
			);
			setShuffledQuestions(shuffled);
		}
	};

	const handleAnswer = (option) => {
		if (selectedAnswer) return;

		setSelectedAnswer(option);
		setIsTimerActive(false);

		const isCorrect = option === currentQ?.answer;
		if (isCorrect) {
			setScore((prev) => prev + 1);
		}

		setTimeout(() => {
			if (currentIndex + 1 < shuffledQuestions.length) {
				setCurrentIndex((prev) => prev + 1);
				setSelectedAnswer(null);
				setTimeLeft(30);
				setIsTimerActive(true);
			} else {
				setShowResults(true);
				saveQuizResult(selectedTopic, score, shuffledQuestions.length);
			}
		}, 2000);
	};

	const restartQuiz = () => {
		setSelectedTopic(null);
		setShuffledQuestions([]);
		setTimeLeft(30);
		setIsTimerActive(false);
	};

	const goBackToTopics = () => {
		setSelectedTopic(null);
		setShuffledQuestions([]);
		setTimeLeft(30);
		setIsTimerActive(false);
	};

	const resultData = shuffledQuestions.length
		? [
				{ name: "Correct", value: score, color: "#22c55e" },
				{
					name: "Incorrect",
					value: shuffledQuestions.length - score,
					color: "#ef4444",
				},
		  ]
		: [];

	const scorePercentage = shuffledQuestions.length
		? Math.round((score / shuffledQuestions.length) * 100)
		: 0;

	const progressPercent = shuffledQuestions.length
		? Math.round(
				((currentIndex + (showResults ? 1 : 0)) / shuffledQuestions.length) *
					100
		  )
		: 0;

	// Function to get the appropriate icon for each topic
	const getTopicIcon = (topic) => {
		switch (topic) {
			case "A Christmas Carol":
				return <ChristmasCarolIcon className="w-8 h-8" />;
			case "Shakespeare: Macbeth":
				return <MacbethIcon className="w-8 h-8" />;
			case "An Inspector Calls":
				return <InspectorCallsIcon className="w-8 h-8" />;
			case "Paper 1: Creative Reading & Writing":
				return <LanguagePaperIcon className="w-8 h-8" />;
			default:
				return <Target className="w-8 h-8 text-white" />;
		}
	};

	// Get actual question count from the data
	const getQuestionCountForDisplay = (topic) => {
		if (!questionsData || !Array.isArray(questionsData)) return 20;
		const topicData = questionsData.find((t) => t.topic === topic);
		return topicData?.questions?.length || 20;
	};

	const getCurrentTopicData = () => {
		return englishQuestions.find((t) => t.topic === selectedTopic);
	};

	const currentTopicData = getCurrentTopicData();

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

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#dae2e3] via-[#bcdbe9] to-[#87cfbf] py-8 px-4 relative overflow-hidden">
			{/* Decorative Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-4 -left-4 w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-48 lg:h-48 xl:w-72 xl:h-72 bg-gradient-to-br from-purple-200 to-blue-300 rounded-full opacity-20 animate-pulse"></div>
				<div
					className="absolute top-1/4 -right-4 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 bg-gradient-to-br from-cyan-200 to-teal-300 rounded-full opacity-20 animate-pulse"
					style={{ animationDelay: "2s" }}
				></div>
				<div
					className="absolute -bottom-4 left-1/4 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-56 lg:h-56 xl:w-80 xl:h-80 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full opacity-20 animate-pulse"
					style={{ animationDelay: "4s" }}
				></div>
			</div>

			<div className="max-w-6xl mx-auto relative z-10">
				{/* Compact Header */}
				<div className="text-center mb-8">
					<div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-xl blur-xl opacity-40 animate-pulse"></div>
							<div className="relative p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl shadow-xl">
								<BookOpen className="w-6 h-6 text-white" />
							</div>
						</div>
						<div className="text-center sm:text-left">
							<h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
								AQA GCSE English
							</h1>
							<p className="text-blue-600 text-sm sm:text-base lg:text-lg font-semibold mt-1 flex items-center justify-center sm:justify-start gap-2">
								<span className="text-lg">✨</span>
								Language & Literature Excellence
								<span className="text-lg">✨</span>
							</p>
						</div>
					</div>
				</div>

				{/* Topic Selection */}
				{!selectedTopic && (
					<div>
						<div className="text-center mb-8">
							<h2 className="text-2xl sm:text-3xl xl-tablet:text-4xl font-bold text-gray-800 mb-4">
								Choose Your Topic! 🚀
							</h2>
							<p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
								Select a topic and begin your journey to GCSE excellence
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
							{englishQuestions.map((topicData, index) => (
								<div
									key={topicData.topic}
									onClick={() => handleTopicSelect(topicData.topic)}
									className="group relative overflow-hidden bg-white/95 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/60 hover:bg-white hover:shadow-2xl hover:border-purple-300 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2"
								>
									<div
										className={`absolute inset-0 bg-gradient-to-r ${topicData.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
									></div>

									<div className="relative z-10">
										<div className="flex items-start justify-between mb-6">
											<div className="p-5 bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-xl border-2 border-gray-100 group-hover:shadow-2xl transition-all duration-300">
												{getTopicIcon(topicData.topic)}
											</div>
											<span className="text-sm font-semibold text-gray-500 bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 rounded-full border border-gray-200 shadow-sm">
												{getQuestionCountForDisplay(topicData.topic)} questions
											</span>
										</div>

										<h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors leading-tight">
											{topicData.topic}
										</h3>
										<p className="text-gray-600 text-base mb-8 leading-relaxed">
											{topicData.description}
										</p>

										<div className="flex items-center text-purple-600 font-bold text-lg group-hover:text-cyan-600 transition-colors">
											<Play className="w-6 h-6 mr-3 group-hover:animate-pulse" />
											Start Practice
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Quiz Section */}
				{selectedTopic && !showResults && currentQ && (
					<div className="max-w-5xl mx-auto">
						<div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/40 overflow-hidden">
							{/* Quiz Header */}
							<div
								className={`bg-gradient-to-r ${currentTopicData?.color} p-6`}
							>
								<div className="flex items-center justify-between mb-4">
									<button
										onClick={goBackToTopics}
										className="p-3 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm"
									>
										<ArrowLeft className="w-6 h-6 text-white" />
									</button>

									<div className="flex items-center gap-4">
										<div
											className={`flex items-center gap-3 ${getTimerColor()} px-4 py-2 rounded-xl border border-white/30 font-bold text-lg`}
										>
											<Timer className="w-5 h-5" />
											<span>{timeLeft}s</span>
										</div>
									</div>
								</div>

								<div>
									<h2 className="text-2xl font-bold mb-2 text-white">
										{selectedTopic}
									</h2>
									<p className="text-white/80 text-lg">
										Question {currentIndex + 1} of {shuffledQuestions.length}
									</p>
								</div>
							</div>

							{/* Progress Bar */}
							<div className="w-full bg-gray-200 h-3">
								<div
									className={`bg-gradient-to-r ${currentTopicData?.color} h-3 transition-all duration-500 shadow-lg`}
									style={{ width: `${progressPercent}%` }}
								></div>
							</div>

							{/* Question Content */}
							<div className="p-8 bg-white/50 backdrop-blur-sm">
								<div className="mb-8">
									<h3 className="text-2xl font-bold text-gray-800 leading-relaxed mb-4">
										{currentQ.question}
									</h3>
								</div>

								{/* Options */}
								<div className="space-y-4">
									{currentQ.options.map((option, idx) => {
										let buttonClass =
											"w-full p-5 text-left border-2 rounded-xl transition-all font-semibold text-lg ";

										if (selectedAnswer === option) {
											if (option === currentQ.answer) {
												buttonClass +=
													"bg-gradient-to-r from-green-400 to-emerald-500 border-green-400 text-white shadow-lg transform scale-105";
											} else {
												buttonClass +=
													"bg-gradient-to-r from-red-400 to-pink-500 border-red-400 text-white shadow-lg";
											}
										} else if (selectedAnswer && option === currentQ.answer) {
											buttonClass +=
												"bg-gradient-to-r from-green-400 to-emerald-500 border-green-400 text-white shadow-lg transform scale-105";
										} else {
											buttonClass +=
												"bg-white/70 backdrop-blur-sm border-gray-300 hover:bg-white/90 hover:border-purple-500 text-gray-800 hover:scale-105 hover:shadow-xl";
										}

										return (
											<button
												key={idx}
												onClick={() => handleAnswer(option)}
												className={buttonClass}
												disabled={!!selectedAnswer}
											>
												<div className="flex items-center justify-between">
													<span>{option}</span>
													{selectedAnswer === option &&
														(option === currentQ.answer ? (
															<CheckCircle className="w-6 h-6 text-white" />
														) : (
															<XCircle className="w-6 h-6 text-white" />
														))}
													{selectedAnswer &&
														selectedAnswer !== option &&
														option === currentQ.answer && (
															<CheckCircle className="w-6 h-6 text-white" />
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
				{selectedTopic && showResults && shuffledQuestions.length > 0 && (
					<div className="max-w-5xl mx-auto">
						<div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/40 overflow-hidden">
							{/* Results Header */}
							<div
								className={`p-10 text-center ${
									scorePercentage >= 80
										? "bg-gradient-to-r from-emerald-400 via-green-500 to-teal-600"
										: scorePercentage >= 60
										? "bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-600"
										: "bg-gradient-to-r from-rose-400 via-red-500 to-pink-600"
								} text-white`}
							>
								<Award className="w-20 h-20 mx-auto mb-6 text-white animate-bounce" />
								<h2 className="text-4xl font-bold mb-4 text-white">
									Quiz Complete! 🎉
								</h2>
								<p className="text-2xl text-white font-semibold">
									You scored {score} out of {shuffledQuestions.length} (
									{scorePercentage}%)
								</p>
								<p className="text-lg opacity-80 mt-2">{selectedTopic}</p>
							</div>

							{/* Results Content */}
							<div className="p-10 bg-white/70 backdrop-blur-sm">
								<div className="grid lg:grid-cols-2 gap-12 mb-12">
									{/* Score Breakdown */}
									<div className="text-center">
										<h3 className="text-2xl font-bold mb-6 text-gray-800">
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
												className={`text-8xl font-bold ${getScoreColor(
													scorePercentage
												)} mb-6 animate-pulse`}
											>
												{scorePercentage}%
											</div>
											<div className="space-y-4">
												{scorePercentage >= 80 && (
													<div className="bg-gradient-to-r from-emerald-100 to-green-200 backdrop-blur-sm rounded-2xl p-6 border-2 border-emerald-200 shadow-lg">
														<p className="text-2xl font-bold text-emerald-700 mb-2">
															🌟 Excellent! 🌟
														</p>
														<p className="text-emerald-700 text-lg">
															You've absolutely mastered this topic!
														</p>
													</div>
												)}
												{scorePercentage >= 60 && scorePercentage < 80 && (
													<div className="bg-gradient-to-r from-amber-100 to-yellow-200 backdrop-blur-sm rounded-2xl p-6 border-2 border-amber-200 shadow-lg">
														<p className="text-2xl font-bold text-amber-700 mb-2">
															⚡ Good Work! ⚡
														</p>
														<p className="text-amber-700 text-lg">
															Keep practising to reach excellence!
														</p>
													</div>
												)}
												{scorePercentage < 60 && (
													<div className="bg-gradient-to-r from-rose-100 to-red-200 backdrop-blur-sm rounded-2xl p-6 border-2 border-rose-200 shadow-lg">
														<p className="text-2xl font-bold text-rose-700 mb-2">
															💪 Keep Learning! 💪
														</p>
														<p className="text-rose-700 text-lg">
															Practice makes perfect - you've got this!
														</p>
													</div>
												)}
											</div>
										</div>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex flex-col sm:flex-row gap-6 justify-center">
									<button
										onClick={goBackToTopics}
										className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center gap-3 shadow-lg"
									>
										<Target className="w-6 h-6" />
										Try Another Topic
									</button>
									<button
										onClick={restartQuiz}
										className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-white/90 hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center gap-3 shadow-lg"
									>
										<RefreshCw className="w-6 h-6" />
										Change Topic
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
