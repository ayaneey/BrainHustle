"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function DemoPage() {
	const [currentStep, setCurrentStep] = useState(0);
	const [selectedSubject, setSelectedSubject] = useState(null);
	const [quizStarted, setQuizStarted] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [showResult, setShowResult] = useState(false);
	const [score, setScore] = useState(0);
	const [demoComplete, setDemoComplete] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	const demoSteps = [
		"Choose Your Subject",
		"Select Quiz Type",
		"Take Demo Quiz",
		"View Results",
	];

	const subjects = [
		{
			id: "maths",
			name: "Mathematics",
			icon: "📐",
			color: "#cdc1ff",
			description: "Algebra, Geometry, Statistics",
		},
		{
			id: "english",
			name: "English",
			icon: "📚",
			color: "#acd1da",
			description: "Literature, Grammar, Writing",
		},
		{
			id: "science",
			name: "Science",
			icon: "🔬",
			color: "#81559b",
			description: "Biology, Chemistry, Physics",
		},
	];

	const demoQuestions = {
		maths: [
			{
				question: "What is 15% of 80?",
				options: ["10", "12", "15", "20"],
				correct: 1,
				explanation: "15% of 80 = 0.15 × 80 = 12",
			},
			{
				question: "Solve: 2x + 6 = 14",
				options: ["x = 2", "x = 4", "x = 6", "x = 8"],
				correct: 1,
				explanation: "2x = 14 - 6 = 8, so x = 4",
			},
		],
		english: [
			{
				question: "Which is the correct use of 'their'?",
				options: [
					"Their going to the store",
					"They're going to the store",
					"There going to the store",
					"The dog wagged their tail",
				],
				correct: 3,
				explanation:
					"'Their' shows possession - the dog's tail belongs to the dog",
			},
			{
				question: "What is a metaphor?",
				options: [
					"A direct comparison using 'like' or 'as'",
					"A direct comparison without 'like' or 'as'",
					"An exaggeration for effect",
					"Giving human qualities to objects",
				],
				correct: 1,
				explanation:
					"A metaphor is a direct comparison without using 'like' or 'as'",
			},
		],
		science: [
			{
				question: "What is the chemical symbol for water?",
				options: ["H2O", "CO2", "NaCl", "O2"],
				correct: 0,
				explanation: "Water is H2O - two hydrogen atoms and one oxygen atom",
			},
			{
				question: "Which organ pumps blood around the body?",
				options: ["Brain", "Lungs", "Heart", "Liver"],
				correct: 2,
				explanation:
					"The heart is a muscular organ that pumps blood throughout the body",
			},
		],
	};

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 200);
		return () => clearTimeout(timer);
	}, []);

	const handleSubjectSelect = (subject) => {
		setSelectedSubject(subject);
		setCurrentStep(1);
	};

	const startQuiz = () => {
		setQuizStarted(true);
		setCurrentStep(2);
		setCurrentQuestion(0);
		setScore(0);
	};

	const handleAnswerSelect = (answerIndex) => {
		setSelectedAnswer(answerIndex);
	};

	const submitAnswer = () => {
		const questions = demoQuestions[selectedSubject.id];
		const isCorrect = selectedAnswer === questions[currentQuestion].correct;

		if (isCorrect) {
			setScore(score + 1);
		}

		setShowResult(true);

		setTimeout(() => {
			if (currentQuestion < questions.length - 1) {
				setCurrentQuestion(currentQuestion + 1);
				setSelectedAnswer(null);
				setShowResult(false);
			} else {
				setCurrentStep(3);
				setDemoComplete(true);
			}
		}, 2000);
	};

	const resetDemo = () => {
		setCurrentStep(0);
		setSelectedSubject(null);
		setQuizStarted(false);
		setCurrentQuestion(0);
		setSelectedAnswer(null);
		setShowResult(false);
		setScore(0);
		setDemoComplete(false);
	};

	return (
		<>
			<style jsx>{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes pulse {
					0%,
					100% {
						transform: scale(1);
					}
					50% {
						transform: scale(1.05);
					}
				}

				@keyframes celebration {
					0% {
						transform: scale(1) rotate(0deg);
					}
					25% {
						transform: scale(1.1) rotate(5deg);
					}
					75% {
						transform: scale(1.1) rotate(-5deg);
					}
					100% {
						transform: scale(1) rotate(0deg);
					}
				}

				.animate-fade-in-up {
					animation: fadeInUp 0.6s ease-out forwards;
				}

				.demo-hero {
					background: linear-gradient(
						135deg,
						#acd1da 0%,
						#cdc1ff 50%,
						#81559b 100%
					);
					position: relative;
					overflow: hidden;
				}

				.demo-hero::before {
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
						repeat;
				}

				.step-indicator {
					background: linear-gradient(135deg, #cdc1ff 0%, #81559b 100%);
				}

				.step-indicator.active {
					animation: pulse 2s ease-in-out infinite;
				}

				.subject-card {
					transition: all 0.3s ease;
					border: 2px solid transparent;
					background: linear-gradient(
						135deg,
						#ffffff 0%,
						rgba(205, 193, 255, 0.05) 100%
					);
				}

				.subject-card:hover {
					transform: translateY(-8px);
					box-shadow: 0 20px 40px rgba(129, 85, 155, 0.15);
					border-color: rgba(205, 193, 255, 0.3);
				}

				.quiz-card {
					background: linear-gradient(
						135deg,
						#ffffff 0%,
						rgba(172, 209, 218, 0.05) 100%
					);
					border: 2px solid rgba(172, 209, 218, 0.2);
					transition: all 0.3s ease;
				}

				.answer-option {
					border: 2px solid #e5e7eb;
					transition: all 0.3s ease;
					cursor: pointer;
				}

				.answer-option:hover {
					border-color: #cdc1ff;
					background-color: rgba(205, 193, 255, 0.1);
				}

				.answer-option.selected {
					border-color: #81559b;
					background-color: rgba(129, 85, 155, 0.1);
				}

				.answer-option.correct {
					border-color: #10b981;
					background-color: rgba(16, 185, 129, 0.1);
				}

				.answer-option.incorrect {
					border-color: #ef4444;
					background-color: rgba(239, 68, 68, 0.1);
				}

				.submit-btn {
					background: linear-gradient(135deg, #cdc1ff 0%, #81559b 100%);
					transition: all 0.3s ease;
				}

				.submit-btn:hover:not(:disabled) {
					transform: translateY(-2px);
					box-shadow: 0 10px 25px rgba(129, 85, 155, 0.25);
				}

				.submit-btn:disabled {
					opacity: 0.5;
					cursor: not-allowed;
				}

				.celebration {
					animation: celebration 0.6s ease-in-out;
				}

				.progress-bar {
					background: linear-gradient(
						90deg,
						#acd1da 0%,
						#cdc1ff 50%,
						#81559b 100%
					);
					transition: width 0.5s ease;
				}
			`}</style>

			<main className="bg-white min-h-screen">
				{/* Hero Section */}
				<section className="demo-hero text-white py-16 px-4 relative z-10">
					<div className="max-w-4xl mx-auto text-center">
						<div
							className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
						>
							<h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
								Try Brain Hustle Free
							</h1>
							<p className="text-xl md:text-2xl opacity-95 mb-8 leading-relaxed">
								Experience our interactive learning platform with this demo quiz
							</p>

							{/* Step Indicator */}
							<div className="flex justify-center items-center gap-4 mb-8">
								{demoSteps.map((step, index) => (
									<div key={index} className="flex items-center">
										<div
											className={`step-indicator w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
												index <= currentStep ? "active" : "opacity-50"
											}`}
										>
											{index + 1}
										</div>
										{index < demoSteps.length - 1 && (
											<div
												className={`w-8 h-0.5 bg-white mx-2 ${
													index < currentStep ? "opacity-100" : "opacity-30"
												}`}
											></div>
										)}
									</div>
								))}
							</div>

							<p className="text-lg opacity-80">
								Current Step: {demoSteps[currentStep]}
							</p>
						</div>
					</div>
				</section>

				{/* Demo Content */}
				<section className="py-16 px-4">
					<div className="max-w-4xl mx-auto">
						{/* Step 1: Choose Subject */}
						{currentStep === 0 && (
							<div className="animate-fade-in-up">
								<h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
									Choose Your Subject
								</h2>
								<div className="grid md:grid-cols-3 gap-8">
									{subjects.map((subject) => (
										<div
											key={subject.id}
											onClick={() => handleSubjectSelect(subject)}
											className="subject-card p-8 rounded-2xl cursor-pointer text-center"
										>
											<div
												className="text-6xl mb-4 w-20 h-20 rounded-full flex items-center justify-center mx-auto"
												style={{ backgroundColor: subject.color + "20" }}
											>
												{subject.icon}
											</div>
											<h3 className="text-2xl font-bold mb-2 text-gray-900">
												{subject.name}
											</h3>
											<p className="text-gray-600">{subject.description}</p>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Step 2: Quiz Type Selection */}
						{currentStep === 1 && selectedSubject && (
							<div className="animate-fade-in-up">
								<h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
									{selectedSubject.name} Demo Quiz
								</h2>
								<p className="text-xl text-center text-gray-600 mb-12">
									Ready to test your knowledge? This demo includes 2 sample
									questions.
								</p>

								<div className="quiz-card max-w-2xl mx-auto p-8 rounded-2xl text-center">
									<div
										className="text-8xl mb-6 w-24 h-24 rounded-full flex items-center justify-center mx-auto"
										style={{ backgroundColor: selectedSubject.color + "20" }}
									>
										{selectedSubject.icon}
									</div>
									<h3 className="text-3xl font-bold mb-4 text-gray-900">
										Demo Quiz: {selectedSubject.name}
									</h3>
									<div className="space-y-4 mb-8">
										<div className="flex justify-between text-gray-600">
											<span>📝 Questions:</span>
											<span className="font-semibold">2 Sample Questions</span>
										</div>
										<div className="flex justify-between text-gray-600">
											<span>⏱️ Time:</span>
											<span className="font-semibold">No Time Limit</span>
										</div>
										<div className="flex justify-between text-gray-600">
											<span>🎯 Difficulty:</span>
											<span className="font-semibold">GCSE Level</span>
										</div>
									</div>
									<button
										onClick={startQuiz}
										className="submit-btn px-8 py-4 rounded-xl text-white font-semibold text-lg"
									>
										Start Demo Quiz
									</button>
								</div>
							</div>
						)}

						{/* Step 3: Quiz Questions */}
						{currentStep === 2 && quizStarted && selectedSubject && (
							<div className="animate-fade-in-up">
								<div className="max-w-3xl mx-auto">
									{/* Progress Bar */}
									<div className="mb-8">
										<div className="flex justify-between text-sm text-gray-600 mb-2">
											<span>
												Question {currentQuestion + 1} of{" "}
												{demoQuestions[selectedSubject.id].length}
											</span>
											<span>
												{Math.round(
													((currentQuestion + 1) /
														demoQuestions[selectedSubject.id].length) *
														100
												)}
												% Complete
											</span>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-3">
											<div
												className="progress-bar h-3 rounded-full"
												style={{
													width: `${
														((currentQuestion + 1) /
															demoQuestions[selectedSubject.id].length) *
														100
													}%`,
												}}
											></div>
										</div>
									</div>

									{/* Question Card */}
									<div className="quiz-card p-8 rounded-2xl">
										<h3 className="text-2xl font-bold mb-8 text-gray-900">
											{
												demoQuestions[selectedSubject.id][currentQuestion]
													.question
											}
										</h3>

										<div className="space-y-4 mb-8">
											{demoQuestions[selectedSubject.id][
												currentQuestion
											].options.map((option, index) => (
												<div
													key={index}
													onClick={() =>
														!showResult && handleAnswerSelect(index)
													}
													className={`answer-option p-4 rounded-xl ${
														showResult
															? index ===
															  demoQuestions[selectedSubject.id][
																	currentQuestion
															  ].correct
																? "correct"
																: selectedAnswer === index
																? "incorrect"
																: ""
															: selectedAnswer === index
															? "selected"
															: ""
													} ${
														!showResult ? "cursor-pointer" : "cursor-default"
													}`}
												>
													<div className="flex items-center">
														<div className="w-6 h-6 rounded-full border-2 border-current mr-4 flex items-center justify-center text-sm font-bold">
															{String.fromCharCode(65 + index)}
														</div>
														<span className="text-lg">{option}</span>
													</div>
												</div>
											))}
										</div>

										{/* Answer Explanation */}
										{showResult && (
											<div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
												<h4 className="font-bold text-blue-900 mb-2">
													Explanation:
												</h4>
												<p className="text-blue-800">
													{
														demoQuestions[selectedSubject.id][currentQuestion]
															.explanation
													}
												</p>
											</div>
										)}

										{/* Submit Button */}
										{!showResult && (
											<button
												onClick={submitAnswer}
												disabled={selectedAnswer === null}
												className="submit-btn px-8 py-3 rounded-xl text-white font-semibold disabled:opacity-50"
											>
												{currentQuestion ===
												demoQuestions[selectedSubject.id].length - 1
													? "Finish Quiz"
													: "Next Question"}
											</button>
										)}

										{/* Next Question Indicator */}
										{showResult &&
											currentQuestion <
												demoQuestions[selectedSubject.id].length - 1 && (
												<div className="text-center text-gray-600">
													<div className="animate-pulse">
														Next question in 2 seconds...
													</div>
												</div>
											)}
									</div>
								</div>
							</div>
						)}

						{/* Step 4: Results */}
						{currentStep === 3 && demoComplete && (
							<div className="animate-fade-in-up">
								<div className="max-w-2xl mx-auto text-center">
									<div
										className={`celebration mb-8 ${
											score === demoQuestions[selectedSubject.id].length
												? "text-6xl"
												: "text-5xl"
										}`}
									>
										{score === demoQuestions[selectedSubject.id].length
											? "🎉"
											: score > 0
											? "👍"
											: "💪"}
									</div>

									<h2 className="text-4xl font-bold mb-4 text-gray-900">
										Demo Complete!
									</h2>

									<div className="quiz-card p-8 rounded-2xl mb-8">
										<div
											className="text-6xl font-bold mb-4"
											style={{ color: selectedSubject.color }}
										>
											{score}/{demoQuestions[selectedSubject.id].length}
										</div>
										<p className="text-xl text-gray-600 mb-6">
											You scored{" "}
											{Math.round(
												(score / demoQuestions[selectedSubject.id].length) * 100
											)}
											% on this {selectedSubject.name} demo quiz
										</p>

										<div className="grid grid-cols-2 gap-4 text-center">
											<div>
												<div className="text-2xl font-bold text-green-600">
													{score}
												</div>
												<div className="text-gray-600">Correct</div>
											</div>
											<div>
												<div className="text-2xl font-bold text-gray-400">
													{demoQuestions[selectedSubject.id].length - score}
												</div>
												<div className="text-gray-600">Incorrect</div>
											</div>
										</div>
									</div>

									<div className="space-y-4">
										<p className="text-lg text-gray-600 mb-6">
											Ready to unlock hundreds more questions and track your
											progress?
										</p>

										<div className="flex flex-col sm:flex-row gap-4 justify-center">
											<button
												onClick={resetDemo}
												className="px-6 py-3 border-2 border-purple-300 text-purple-700 rounded-xl font-semibold hover:bg-purple-50 transition-all"
											>
												Try Another Subject
											</button>

											<Link
												href="/sign-up"
												className="inline-block px-6 py-3 border-2 border-purple-300 text-purple-700 rounded-xl font-semibold hover:bg-purple-50 transition-all"
											>
												Sign Up Free
											</Link>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</section>
			</main>
		</>
	);
}
