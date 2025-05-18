"use client";

import { useState } from "react";
import allTopics from "./questions.json";

const Maths = () => {
	const [selectedTopic, setSelectedTopic] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [score, setScore] = useState(0);
	const [showResults, setShowResults] = useState(false);

	const topicsInOrder = [
		"Fractions & Decimals",
		"Percentages",
		"Algebra",
		"Geometry",
		"Probability & Statistics",
	];

	const handleTopicSelect = (topic) => {
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

	const handleAnswer = (option) => {
		setSelectedAnswer(option);

		if (option === currentQ.answer) {
			setScore(score + 1);
		}

		setTimeout(() => {
			if (currentIndex + 1 < currentQuestions.length) {
				setCurrentIndex(currentIndex + 1);
				setSelectedAnswer(null);
			} else {
				setShowResults(true);
			}
		}, 1000);
	};

	const restartQuiz = () => {
		setSelectedTopic(null);
	};

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
						<div className="flex items-center justify-between mb-2">
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

						<p className="text-lg sm:text-xl text-box font-semibold">
							Q{currentIndex + 1}: {currentQ.question}
						</p>

						<div className="grid gap-4">
							{currentQ.options.map((option, idx) => (
								<button
									key={idx}
									onClick={() => handleAnswer(option)}
									className={`px-5 py-3 rounded-md border text-base sm:text-lg transition ${
										selectedAnswer === option
											? option === currentQ.answer
												? "bg-green-100 border-green-400"
												: "bg-red-100 border-red-400"
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
					<div className="text-center mt-6">
						<p className="text-xl font-semibold text-green-600 mb-4">
							You scored {score} out of {currentQuestions.length}
						</p>
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
