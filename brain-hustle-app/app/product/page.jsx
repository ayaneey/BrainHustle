"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

function Product() {
	const [isVisible, setIsVisible] = useState(false);
	const [activeTab, setActiveTab] = useState("overview");
	const [activePlan, setActivePlan] = useState("standard");

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 200);
		return () => clearTimeout(timer);
	}, []);

	const features = [
		{
			icon: "/images/lessons.svg",
			title: "AI-Powered Learning",
			description:
				"Adaptive algorithms that adjust to your learning style and pace",
			details: [
				"Smart content recommendations",
				"Difficulty auto-adjustment",
				"Learning pattern analysis",
			],
		},
		{
			icon: "/images/target.svg",
			title: "Real-Time Analytics",
			description: "Detailed insights into your performance and progress",
			details: [
				"Performance dashboards",
				"Weakness identification",
				"Progress forecasting",
			],
		},
		{
			icon: "/images/progress.svg",
			title: "Expert-Crafted Content",
			description:
				"Curriculum designed by GCSE specialists and exam board veterans",
			details: ["Exam board aligned", "Updated annually", "Expert reviewed"],
		},
		{
			icon: "/images/journey.svg",
			title: "24/7 Study Support",
			description: "Round-the-clock access to tutors and study resources",
			details: ["Live chat support", "Video consultations", "Study groups"],
		},
	];

	const pricingPlans = [
		{
			name: "Starter",
			price: "£9.99",
			period: "/month",
			features: [
				"Access to 3 GCSE subjects",
				"Basic progress tracking",
				"Standard video lessons",
				"Email support",
				"Mobile app access",
			],
			popular: false,
		},
		{
			name: "Standard",
			price: "£19.99",
			period: "/month",
			features: [
				"Access to ALL GCSE subjects",
				"Advanced progress analytics",
				"Interactive video lessons",
				"Priority chat support",
				"Downloadable resources",
				"Mock exam simulator",
				"Study planner",
			],
			popular: true,
		},
		{
			name: "Premium",
			price: "£34.99",
			period: "/month",
			features: [
				"Everything in Standard",
				"1-on-1 tutor sessions (2/month)",
				"Personalised study plans",
				"Live group study sessions",
				"Parent progress reports",
				"Priority exam prep",
				"University guidance",
			],
			popular: false,
		},
	];

	const subjects = [
		"Mathematics",
		"English Language",
		"English Literature",
		"Sciences (Biology, Chemistry, Physics)",
		"History",
		"Geography",
		"French",
		"Spanish",
		"Art & Design",
		"Computer Science",
		"Business Studies",
		"Psychology",
		"Drama",
		"Music",
		"Religious Studies",
	];

	const studyTools = [
		{
			title: "Smart Flashcards",
			description: "AI-generated flashcards that adapt to your memory patterns",
			icon: "🧠",
		},
		{
			title: "Exam Simulator",
			description: "Practice with real exam conditions and instant feedback",
			icon: "📝",
		},
		{
			title: "Study Planner",
			description:
				"Automatically schedules your study sessions for optimal learning",
			icon: "📅",
		},
		{
			title: "Progress Insights",
			description:
				"Detailed analytics showing your strengths and areas for improvement",
			icon: "📊",
		},
		{
			title: "Video Lessons",
			description: "High-quality video content from expert GCSE teachers",
			icon: "🎥",
		},
		{
			title: "Practice Tests",
			description: "Unlimited practice with past papers and mock exams",
			icon: "✅",
		},
	];

	return (
		<>
			<style jsx>{`
				@keyframes fade-in-up {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes float {
					0%,
					100% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-10px);
					}
				}

				@keyframes pulse-glow {
					0%,
					100% {
						box-shadow: 0 0 20px rgba(169, 222, 249, 0.3);
					}
					50% {
						box-shadow: 0 0 40px rgba(169, 222, 249, 0.5);
					}
				}

				.animate-fade-in-up {
					animation: fade-in-up 0.8s ease-out forwards;
				}

				.feature-card {
					background: linear-gradient(
						135deg,
						#ffffff 0%,
						#f8fafc 50%,
						rgba(169, 222, 249, 0.1) 100%
					);
					transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
					position: relative;
					overflow: hidden;
				}

				.feature-card::before {
					content: "";
					position: absolute;
					top: 0;
					left: -100%;
					width: 100%;
					height: 100%;
					background: linear-gradient(
						90deg,
						transparent,
						rgba(255, 255, 255, 0.3),
						transparent
					);
					transition: left 0.6s ease;
				}

				.feature-card:hover::before {
					left: 100%;
				}

				.feature-card:hover {
					transform: translateY(-8px);
					animation: pulse-glow 2s ease-in-out infinite;
				}

				.pricing-card {
					background: linear-gradient(
						135deg,
						#ffffff 0%,
						#f8fafc 50%,
						rgba(229, 217, 242, 0.1) 100%
					);
					transition: all 0.4s ease;
					position: relative;
					overflow: hidden;
				}

				.pricing-card.popular {
					background: linear-gradient(
						135deg,
						#a9def9 0%,
						#e5d9f2 50%,
						#cdc1ff 100%
					);
					color: #1f2937;
					transform: scale(1.05);
				}

				.pricing-card.popular::before {
					content: "MOST POPULAR";
					position: absolute;
					top: 20px;
					right: -30px;
					background: #ffa69e;
					color: #1f2937;
					padding: 8px 40px;
					font-size: 12px;
					font-weight: bold;
					transform: rotate(45deg);
				}

				.pricing-card:hover {
					transform: translateY(-8px);
					box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
				}

				.pricing-card.popular:hover {
					transform: scale(1.05) translateY(-8px);
				}

				.gradient-text {
					background: linear-gradient(135deg, #a9def9 0%, #64b5f6 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
				}

				.floating-icon {
					animation: float 3s ease-in-out infinite;
				}

				.tab-button {
					transition: all 0.3s ease;
					position: relative;
				}

				.tab-button.active {
					background: linear-gradient(135deg, #a9def9 0%, #e5d9f2 100%);
					color: #1f2937;
				}

				.tab-button.active::before {
					content: "";
					position: absolute;
					bottom: -2px;
					left: 0;
					right: 0;
					height: 2px;
					background: linear-gradient(135deg, #a9def9 0%, #64b5f6 100%);
				}

				.hero-bg {
					background: linear-gradient(
						135deg,
						#a9def9 0%,
						#64b5f6 50%,
						#e5d9f2 100%
					);
					position: relative;
					overflow: hidden;
				}

				.hero-bg::before {
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
						repeat;
				}
			`}</style>

			<main className="bg-white text-gray-800 overflow-hidden">
				{/* Hero Section */}
				<section className="hero-bg text-white py-16 sm-phone:py-20 md-phone:py-24 lg-phone:py-24 xl-phone:py-28 2xl-phone:py-28 sm-tablet:py-20 md-tablet:py-24 lg-tablet:py-20 xl-tablet:py-24 2xl-tablet:py-28 md-laptop:py-32 px-4 sm-phone:px-6 lg-tablet:px-8 relative z-10">
					<div className="max-w-6xl mx-auto text-center">
						<div
							className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
						>
							<h1 className="text-3xl sm-phone:text-4xl md-phone:text-5xl lg-phone:text-5xl xl-phone:text-6xl 2xl-phone:text-6xl sm-tablet:text-5xl md-tablet:text-6xl lg-tablet:text-4xl xl-tablet:text-5xl 2xl-tablet:text-6xl md-laptop:text-7xl font-bold mb-6 sm-phone:mb-8">
								The Complete GCSE Study Platform
							</h1>
							<p className="max-w-3xl mx-auto text-lg sm-phone:text-xl md-phone:text-2xl lg-phone:text-2xl xl-phone:text-2xl opacity-90 mb-8 sm-phone:mb-12 leading-relaxed">
								Everything you need to excel in your GCSEs - from AI-powered
								lessons to expert tutoring, all in one platform.
							</p>
							<div className="flex flex-col sm-tablet:flex-row gap-4 justify-center items-center">
								<Link
									href="/demo"
									className="inline-block bg-white text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
								>
									Start Free Trial
								</Link>
								<button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-800 transition-all">
									Watch Demo
								</button>
							</div>
						</div>
					</div>
				</section>

				{/* Product Overview Tabs */}
				<section className="py-12 sm-phone:py-16 md-phone:py-20 px-4 sm-phone:px-6 lg-tablet:px-8">
					<div className="max-w-6xl mx-auto">
						<div
							className={`text-center mb-12 ${
								isVisible ? "animate-fade-in-up" : "opacity-0"
							}`}
							style={{ animationDelay: "200ms" }}
						>
							<h2 className="text-3xl sm-phone:text-4xl md-phone:text-5xl font-bold text-gray-900 mb-6">
								Explore Brain Hustle
							</h2>

							{/* Tab Navigation */}
							<div className="flex flex-wrap justify-center gap-2 sm-phone:gap-4 mb-8">
								{["overview", "features", "subjects", "tools"].map((tab) => (
									<button
										key={tab}
										onClick={() => setActiveTab(tab)}
										className={`tab-button px-6 py-3 rounded-full font-medium text-sm sm-phone:text-base capitalize ${
											activeTab === tab
												? "active"
												: "bg-gray-100 text-gray-700 hover:bg-gray-200"
										}`}
									>
										{tab === "tools" ? "Study Tools" : tab}
									</button>
								))}
							</div>
						</div>

						{/* Tab Content */}
						<div className="tab-content">
							{activeTab === "overview" && (
								<div className="grid lg-tablet:grid-cols-2 gap-8 sm-phone:gap-12 items-center">
									<div className="space-y-6">
										<h3 className="text-2xl sm-phone:text-3xl font-bold gradient-text">
											Your Path to GCSE Success
										</h3>
										<p className="text-gray-600 text-lg leading-relaxed">
											Brain Hustle combines cutting-edge AI technology with
											expert educational content to create a personalized
											learning experience that adapts to your unique needs and
											goals.
										</p>
										<div className="space-y-4">
											<div className="flex items-center gap-4">
												<div
													className="w-2 h-2 rounded-full"
													style={{ backgroundColor: "#a9def9" }}
												></div>
												<span className="text-gray-700">
													Personalized learning paths for every student
												</span>
											</div>
											<div className="flex items-center gap-4">
												<div
													className="w-2 h-2 rounded-full"
													style={{ backgroundColor: "#ffa69e" }}
												></div>
												<span className="text-gray-700">
													Real-time progress tracking and analytics
												</span>
											</div>
											<div className="flex items-center gap-4">
												<div
													className="w-2 h-2 rounded-full"
													style={{ backgroundColor: "#64b5f6" }}
												></div>
												<span className="text-gray-700">
													Expert tutors available 24/7
												</span>
											</div>
										</div>
									</div>
									<div className="relative">
										<img
											src="/images/successDay.svg"
											alt="Students learning"
											className="floating-icon w-full max-w-lg mx-auto"
										/>
									</div>
								</div>
							)}

							{activeTab === "features" && (
								<div className="grid md-tablet:grid-cols-2 gap-6 sm-phone:gap-8">
									{features.map((feature, index) => (
										<div
											key={index}
											className="feature-card p-6 sm-phone:p-8 rounded-2xl border border-gray-100 shadow-lg"
											style={{ animationDelay: `${index * 100}ms` }}
										>
											<div className="flex items-start gap-4 sm-phone:gap-6">
												<div
													className="w-12 h-12 sm-phone:w-16 sm-phone:h-16 rounded-xl flex items-center justify-center flex-shrink-0"
													style={{
														background:
															"linear-gradient(135deg, #a9def9 0%, #cdc1ff 100%)",
													}}
												>
													<img
														src={feature.icon}
														alt={feature.title}
														className="w-6 h-6 sm-phone:w-8 sm-phone:h-8 filter brightness-0 invert"
													/>
												</div>
												<div className="flex-1">
													<h4 className="text-xl font-bold text-gray-900 mb-2">
														{feature.title}
													</h4>
													<p className="text-gray-600 mb-4">
														{feature.description}
													</p>
													<ul className="space-y-2">
														{feature.details.map((detail, i) => (
															<li
																key={i}
																className="text-sm text-gray-500 flex items-center gap-2"
															>
																<span
																	className="w-1.5 h-1.5 rounded-full"
																	style={{ backgroundColor: "#64b5f6" }}
																></span>
																{detail}
															</li>
														))}
													</ul>
												</div>
											</div>
										</div>
									))}
								</div>
							)}

							{activeTab === "subjects" && (
								<div className="text-center">
									<h3 className="text-2xl sm-phone:text-3xl font-bold gradient-text mb-8">
										Complete GCSE Subject Coverage
									</h3>
									<div className="grid grid-cols-2 md-phone:grid-cols-3 lg-tablet:grid-cols-4 gap-4 sm-phone:gap-6 max-w-4xl mx-auto">
										{subjects.map((subject, index) => (
											<div
												key={index}
												className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm-phone:p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all hover:scale-105"
												style={{
													background: `linear-gradient(135deg, ${
														[
															"#a9def9",
															"#ffa69e",
															"#64b5f6",
															"#e5d9f2",
															"#cdc1ff",
														][index % 5]
													}20, ${
														[
															"#a9def9",
															"#ffa69e",
															"#64b5f6",
															"#e5d9f2",
															"#cdc1ff",
														][index % 5]
													}40)`,
												}}
											>
												<span className="text-sm sm-phone:text-base font-medium text-gray-700 block text-center">
													{subject}
												</span>
											</div>
										))}
									</div>
									<p className="text-gray-600 mt-8 text-lg max-w-2xl mx-auto">
										Access comprehensive study materials, practice tests, and
										expert guidance for all major GCSE subjects.
									</p>
								</div>
							)}

							{activeTab === "tools" && (
								<div className="grid md-phone:grid-cols-2 lg-tablet:grid-cols-3 gap-6 sm-phone:gap-8">
									{studyTools.map((tool, index) => (
										<div
											key={index}
											className="feature-card p-6 sm-phone:p-8 rounded-2xl border border-gray-100 shadow-lg text-center"
											style={{ animationDelay: `${index * 100}ms` }}
										>
											<div className="text-4xl sm-phone:text-5xl mb-4">
												{tool.icon}
											</div>
											<h4 className="text-xl font-bold text-gray-900 mb-3">
												{tool.title}
											</h4>
											<p className="text-gray-600">{tool.description}</p>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</section>

				{/* Pricing Section */}
				<section className="bg-gray-50 py-16 sm-phone:py-20 md-phone:py-24 px-4 sm-phone:px-6 lg-tablet:px-8">
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-12 sm-phone:mb-16">
							<h2 className="text-3xl sm-phone:text-4xl md-phone:text-5xl font-bold text-gray-900 mb-6">
								Choose Your Plan
							</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								Select the perfect plan for your GCSE journey. Upgrade or
								downgrade anytime.
							</p>
						</div>

						<div className="grid lg-tablet:grid-cols-3 gap-6 sm-phone:gap-8">
							{pricingPlans.map((plan, index) => (
								<div
									key={index}
									className={`pricing-card p-8 sm-phone:p-10 rounded-3xl border shadow-lg relative ${
										plan.popular ? "popular border-blue-200" : "border-gray-200"
									}`}
								>
									<div className="text-center mb-8">
										<h3
											className={`text-2xl font-bold mb-2 ${
												plan.popular ? "text-gray-800" : "text-gray-900"
											}`}
										>
											{plan.name}
										</h3>
										<div className="flex items-baseline justify-center gap-1">
											<span
												className={`text-4xl sm-phone:text-5xl font-bold ${
													plan.popular ? "text-gray-800" : "text-gray-900"
												}`}
											>
												{plan.price}
											</span>
											<span
												className={`text-lg ${
													plan.popular ? "text-gray-600" : "text-gray-500"
												}`}
											>
												{plan.period}
											</span>
										</div>
									</div>

									<ul className="space-y-4 mb-8">
										{plan.features.map((feature, i) => (
											<li
												key={i}
												className={`flex items-center gap-3 ${
													plan.popular ? "text-gray-700" : "text-gray-700"
												}`}
											>
												<svg
													className={`w-5 h-5 ${
														plan.popular ? "text-gray-600" : "text-green-500"
													}`}
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fillRule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clipRule="evenodd"
													/>
												</svg>
												{feature}
											</li>
										))}
									</ul>

									<button
										className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
											plan.popular
												? "bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300"
												: "text-white hover:opacity-90"
										}`}
										style={{
											background: plan.popular
												? "white"
												: "linear-gradient(135deg, #64b5f6 0%, #cdc1ff 100%)",
										}}
									>
										{plan.popular ? "Start Free Trial" : "Choose Plan"}
									</button>
								</div>
							))}
						</div>

						<div className="text-center mt-12">
							<p className="text-gray-600 mb-4">
								All plans include a 14-day free trial. No credit card required.
							</p>
							<p className="text-sm text-gray-500">
								Need help choosing?{" "}
								<Link href="/contact">
									<span
										className="font-medium cursor-pointer hover:underline"
										style={{ color: "#64b5f6" }}
									>
										Contact our team
									</span>
								</Link>
							</p>
						</div>
					</div>
				</section>

				{/* Success Stats */}
				<section className="py-16 sm-phone:py-20 md-phone:py-24 px-4 sm-phone:px-6 lg-tablet:px-8">
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-12 sm-phone:mb-16">
							<h2 className="text-3xl sm-phone:text-4xl md-phone:text-5xl font-bold text-gray-900 mb-6">
								Proven Results
							</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								Our students consistently achieve better grades and feel more
								confident about their exams.
							</p>
						</div>

						<div className="grid grid-cols-2 lg-tablet:grid-cols-4 gap-6 sm-phone:gap-8">
							{[
								{
									stat: "98%",
									label: "Pass Rate",
									description: "Students achieve their target grades",
									color: "#a9def9",
								},
								{
									stat: "2.3x",
									label: "Faster Learning",
									description: "Compared to traditional methods",
									color: "#ffa69e",
								},
								{
									stat: "50K+",
									label: "Success Stories",
									description: "Students who've improved their grades",
									color: "#64b5f6",
								},
								{
									stat: "4.9/5",
									label: "Student Rating",
									description: "Average satisfaction score",
									color: "#e5d9f2",
								},
							].map((item, index) => (
								<div
									key={index}
									className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
									style={{
										background: `linear-gradient(135deg, white 0%, ${item.color}20 100%)`,
									}}
								>
									<div
										className="text-3xl sm-phone:text-4xl font-bold mb-2"
										style={{ color: item.color }}
									>
										{item.stat}
									</div>
									<div className="text-lg font-semibold text-gray-900 mb-1">
										{item.label}
									</div>
									<div className="text-sm text-gray-600">
										{item.description}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Call to Action */}
				<section className="hero-bg text-white py-16 sm-phone:py-20 md-phone:py-24 px-4 sm-phone:px-6 lg-tablet:px-8 text-center relative z-10">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl sm-phone:text-4xl md-phone:text-5xl font-bold mb-6">
							Ready to Transform Your GCSE Results?
						</h2>
						<p className="text-xl opacity-90 mb-8 sm-phone:mb-12 leading-relaxed">
							Join thousands of students who've already improved their grades
							with Brain Hustle. Start your free trial today.
						</p>
						<div className="flex flex-col sm-tablet:flex-row gap-4 justify-center items-center">
							<button className="bg-white text-gray-800 px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
								Start 14-Day Free Trial
							</button>
							<button className="text-white underline text-lg hover:no-underline transition-all">
								Schedule a Demo Call
							</button>
						</div>
						<p className="text-sm opacity-80 mt-6">
							No credit card required • Cancel anytime • 24/7 support
						</p>
					</div>
				</section>
			</main>
		</>
	);
}

export default Product;
