"use client";

import { useState } from "react";
import allTopics from "./questions.json";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useUser } from "@clerk/nextjs";

const Maths = () => {
	const { user } = useUser();
	const userId = user?.id;

	const [selectedTopic, setSelectedTopic] = useState(null); // starts at 'null' since no topic is picked yet
	const [currentIndex, setCurrentIndex] = useState(0); // currentIndex: The index (number) of the current question the user is on. Starts at 0 because we start at the first question.
	const [selectedAnswer, setSelectedAnswer] = useState(null); // again, starts at 'null' since user hasn't picked anything yet
	const [score, setScore] = useState(0); // this reflects the user's score, and starts at zero
	const [showResults, setShowResults] = useState(false); // starts at 'false'... no results to show yet

	const topicsInOrder = [
		// A list of topic names for the buttons at the start (this will display a menu for the user to select from).
		"Fractions & Decimals",
		"Percentages",
		"Algebra",
		"Geometry",
		"Probability & Statistics",
	];

	const handleTopicSelect = (topic) => {
		// 'handleTopicSelect' is a function that runs when user clicks a topic button
		setSelectedTopic(topic);
		setCurrentIndex(0);
		setSelectedAnswer(null);
		setScore(0);
		setShowResults(false);
	};

	const currentQuestions =
		selectedTopic &&
		allTopics.find((topicData) => topicData.topic === selectedTopic)?.questions;

	const currentQ = currentQuestions?.[currentIndex];

	const saveScoreToDB = async () => {
		await fetch("/api/quizResults", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId: userId,
				subject: selectedTopic,
				score: score,
				date: new Date(),
			}),
		});
	};

	const handleAnswer = (option) => {
		setSelectedAnswer(option);

		if (option === currentQ.answer) {
			setScore((prev) => prev + 1);
		}

		setTimeout(() => {
			if (currentIndex + 1 < currentQuestions.length) {
				setCurrentIndex((prev) => prev + 1);
				setSelectedAnswer(null);
			} else {
				saveScoreToDB();
				setShowResults(true);
			}
		}, 1000);
	};

	const restartQuiz = () => {
		setSelectedTopic(null);
	};

	const COLORS = ["#95d5b2", "#adb5bd"];

	const resultData = [
		{ name: "Correct", value: score },
		{
			name: "Incorrect",
			value: currentQuestions?.length - score,
		},
	];

	const progressPercent = currentQuestions
		? Math.round(
				((currentIndex + (showResults ? 1 : 0)) / currentQuestions.length) * 100
		  )
		: 0;

	return (
		<div className="min-h-screen flex items-center justify-center bg-BackgroundAccent px-4 py-10">
			<div className="bg-white p-8 sm:p-10 rounded-xl shadow-xl w-full max-w-3xl">
				<h2 className="text-2xl sm:text-3xl font-bold mb-6 text-box text-center">
					🧮 Maths Quiz
				</h2>

				{/* Topic Selection */}
				{!selectedTopic && (
					<div className="space-y-5 text-center">
						<p className="text-lg font-medium">Select a topic to begin:</p>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{topicsInOrder.map((topic) => (
								<button
									key={topic}
									onClick={() => handleTopicSelect(topic)}
									className="bg-greenShade text-baseBlack px-6 py-3 rounded-lg text-lg shadow hover:shadow-md transition duration-300 transform hover:scale-105"
								>
									{topic}
								</button>
							))}
						</div>
					</div>
				)}

				{/* Quiz Section */}
				{selectedTopic && !showResults && currentQ && (
					<div className="space-y-6">
						<div className="flex items-center justify-between mb-4">
							<p className="text-sm text-secondTextColor">
								Topic: <span className="font-medium">{selectedTopic}</span>
							</p>
							<button
								onClick={() => setSelectedTopic(null)}
								className="p-2 rounded-full hover:bg-greyShade transition duration-300"
								aria-label="Back to topic selection"
							>
								<svg
									className="w-5 h-5 text-greenShade hover:text-baseBlack transition"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>
						</div>

						{/* Progress Bar */}
						<div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
							<div
								className="bg-greenShade h-2.5 rounded-full transition-all"
								style={{ width: `${progressPercent}%` }}
							></div>
						</div>

						{/* Question */}
						<div className="text-box text-lg sm:text-xl font-medium">
							Q{currentIndex + 1}: {currentQ.question}
						</div>

						{/* Options with flip-style feedback */}
						<div className="grid gap-4">
							{currentQ.options.map((option, idx) => (
								<button
									key={idx}
									onClick={() => handleAnswer(option)}
									className={`px-5 py-3 rounded-md border text-base sm:text-lg transition-transform duration-300 transform ${
										selectedAnswer === option
											? option === currentQ.answer
												? "bg-green-100 border-green-400 scale-105"
												: "bg-red-100 border-red-400 scale-105"
											: "hover:bg-gray-100"
									}`}
									disabled={!!selectedAnswer}
								>
									{option}
								</button>
							))}
						</div>
					</div>
				)}

				{/* Results Section */}
				{showResults && currentQuestions && (
					<div className="text-center mt-6 space-y-6">
						<p className="text-xl font-semibold text-green-600">
							You scored {score} out of {currentQuestions.length}
						</p>

						{/* Score Chart */}
						<ResponsiveContainer width="100%" height={220}>
							<PieChart>
								<Pie
									data={resultData}
									cx="50%"
									cy="50%"
									labelLine={false}
									outerRadius={80}
									dataKey="value"
								>
									{resultData.map((_, index) => (
										<Cell key={`cell-${index}`} fill={COLORS[index]} />
									))}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>

						<button
							onClick={restartQuiz}
							className="bg-greenShade px-6 py-3 rounded-md text-baseBlack font-medium hover:shadow-md transition text-lg"
						>
							Try Another Topic
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Maths;
