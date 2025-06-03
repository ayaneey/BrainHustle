"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function AboutPage() {
	const [isVisible, setIsVisible] = useState(false);
	const [isTeamSectionVisible, setIsTeamSectionVisible] = useState(false);
	const [typingPhase, setTypingPhase] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 200);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsTeamSectionVisible(true);
						// Start typing animation immediately when section is visible
						setTypingPhase(1);
					}
				});
			},
			{ threshold: 0.3 }
		);

		const teamSection = document.getElementById("team-section");
		if (teamSection) {
			observer.observe(teamSection);
		}

		return () => {
			if (teamSection) {
				observer.unobserve(teamSection);
			}
		};
	}, []);

	const getTypingClass = () => {
		if (!isTeamSectionVisible) return "opacity-0";
		if (typingPhase === 1) return "typing-text phase-1";
		return "typing-text";
	};

	const team = [
		{
			name: "Sarah Johnson",
			role: "Founder & CEO",
			bio: "Former education consultant with 15+ years experience transforming how students learn.",
			image: "👩‍💼",
			color: "#f7d6e0",
		},
		{
			name: "Dr. Michael Chen",
			role: "Head of Curriculum",
			bio: "PhD in Educational Psychology, specialized in cognitive learning techniques.",
			image: "👨‍🏫",
			color: "#dde5b6",
		},
		{
			name: "Emma Thompson",
			role: "UX Design Lead",
			bio: "Award-winning designer focused on creating intuitive learning experiences.",
			image: "👩‍🎨",
			color: "#ced4da",
		},
		{
			name: "James Wilson",
			role: "CTO",
			bio: "Tech innovator building scalable platforms that empower student success.",
			image: "👨‍💻",
			color: "#8da9c4",
		},
	];

	const values = [
		{
			title: "Student-First Approach",
			description:
				"Every decision we make prioritizes student success and learning outcomes.",
			icon: "🎯",
			color: "#f7d6e0",
		},
		{
			title: "Innovation in Education",
			description:
				"We leverage cutting-edge technology to revolutionize traditional learning methods.",
			icon: "🚀",
			color: "#dde5b6",
		},
		{
			title: "Accessibility for All",
			description:
				"Quality education should be accessible to every student, regardless of background.",
			icon: "🌍",
			color: "#ced4da",
		},
		{
			title: "Continuous Improvement",
			description:
				"We constantly evolve our platform based on student feedback and educational research.",
			icon: "⚡",
			color: "#8da9c4",
		},
	];

	const milestones = [
		{
			year: "2020",
			title: "Founded Brain Hustle",
			description:
				"Started with a vision to transform GCSE preparation through technology.",
		},
		{
			year: "2021",
			title: "First 1,000 Students",
			description:
				"Reached our first milestone with students across the UK achieving better grades.",
		},
		{
			year: "2022",
			title: "AI-Powered Learning",
			description:
				"Launched personalized AI tutoring system tailored to individual learning styles.",
		},
		{
			year: "2023",
			title: "Partnership Program",
			description:
				"Collaborated with leading schools to integrate our platform into their curriculum.",
		},
		{
			year: "2024",
			title: "Expanding Horizons",
			description:
				"Celebrating our impact on student success across multiple subjects and regions.",
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
						box-shadow: 0 0 20px rgba(247, 214, 224, 0.3);
					}
					50% {
						box-shadow: 0 0 40px rgba(247, 214, 224, 0.5);
					}
				}

				@keyframes slide-in-left {
					from {
						opacity: 0;
						transform: translateX(-50px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}

				@keyframes slide-in-right {
					from {
						opacity: 0;
						transform: translateX(50px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}

				@keyframes typing-loop {
					0% {
						width: 0;
					}
					12% {
						width: 100%;
					}
					35% {
						width: 100%;
					}
					47% {
						width: 0;
					}
					65% {
						width: 0;
					}
					77% {
						width: 100%;
					}
					100% {
						width: 100%;
					}
				}

				@keyframes blink-caret {
					from,
					to {
						border-color: transparent;
					}
					50% {
						border-color: #f7d6e0;
					}
				}

				.typing-text {
					overflow: hidden;
					border-right: 3px solid #f7d6e0;
					white-space: nowrap;
					margin: 0 auto;
					width: 0;
				}

				.typing-text.phase-1 {
					animation: typing-loop 12s ease-in-out infinite,
						blink-caret 1s infinite;
				}

				.typing-text.typing-complete {
					border-right: none;
					animation: none;
					width: 100%;
				}

				.animate-fade-in-up {
					animation: fade-in-up 0.8s ease-out forwards;
				}

				.animate-slide-in-left {
					animation: slide-in-left 0.8s ease-out forwards;
				}

				.animate-slide-in-right {
					animation: slide-in-right 0.8s ease-out forwards;
				}

				.hero-bg {
					background: linear-gradient(
						135deg,
						#dde5b6 0%,
						#ced4da 50%,
						#8da9c4 100%
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

				.gradient-text {
					background: linear-gradient(135deg, #f7d6e0 0%, #8da9c4 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
				}

				.card-hover {
					transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
					position: relative;
					overflow: hidden;
				}

				.card-hover::before {
					content: "";
					position: absolute;
					top: 0;
					left: -100%;
					width: 100%;
					height: 100%;
					background: linear-gradient(
						90deg,
						transparent,
						rgba(255, 255, 255, 0.2),
						transparent
					);
					transition: left 0.8s ease;
				}

				.card-hover:hover::before {
					left: 100%;
				}

				.card-hover:hover {
					transform: translateY(-8px);
					box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
				}

				.floating-icon {
					animation: float 4s ease-in-out infinite;
				}

				.timeline-line {
					background: linear-gradient(to bottom, #f7d6e0, #8da9c4);
				}

				.team-card {
					background: linear-gradient(
						135deg,
						#ffffff 0%,
						rgba(221, 229, 182, 0.1) 100%
					);
				}

				.value-card {
					background: linear-gradient(
						135deg,
						#ffffff 0%,
						rgba(205, 212, 218, 0.1) 100%
					);
				}

				.story-card {
					background: linear-gradient(
						135deg,
						#ffffff 0%,
						rgba(247, 214, 224, 0.05) 100%
					);
				}
			`}</style>

			<main className="bg-white text-gray-800 overflow-hidden">
				{/* Hero Section */}
				<section className="hero-bg text-white py-8 sm-phone:py-10 md-phone:py-12 lg-phone:py-14 xl-phone:py-16 2xl-phone:py-18 sm-tablet:py-20 md-tablet:py-22 lg-tablet:py-24 xl-tablet:py-26 2xl-tablet:py-28 md-laptop:py-32 px-4 sm-phone:px-5 md-phone:px-6 lg-phone:px-7 xl-phone:px-8 2xl-phone:px-8 sm-tablet:px-8 md-tablet:px-8 lg-tablet:px-10 xl-tablet:px-12 2xl-tablet:px-14 md-laptop:px-16 relative z-10">
					<div className="max-w-6xl mx-auto">
						<div className="grid lg-tablet:grid-cols-2 gap-8 sm-phone:gap-10 md-phone:gap-12 lg-phone:gap-14 xl-phone:gap-16 2xl-phone:gap-16 sm-tablet:gap-16 md-tablet:gap-18 lg-tablet:gap-20 xl-tablet:gap-22 2xl-tablet:gap-24 md-laptop:gap-28 items-center">
							<div
								className={`${
									isVisible ? "animate-slide-in-left" : "opacity-0"
								}`}
							>
								<h1 className="text-2xl sm-phone:text-3xl md-phone:text-4xl lg-phone:text-4xl xl-phone:text-5xl 2xl-phone:text-5xl sm-tablet:text-6xl md-tablet:text-6xl lg-tablet:text-5xl xl-tablet:text-6xl 2xl-tablet:text-7xl md-laptop:text-8xl font-bold mb-4 sm-phone:mb-5 md-phone:mb-6 lg-phone:mb-6 xl-phone:mb-7 2xl-phone:mb-8 sm-tablet:mb-8 md-tablet:mb-10 lg-tablet:mb-8 xl-tablet:mb-10 2xl-tablet:mb-12 md-laptop:mb-14">
									About Brain Hustle
								</h1>
								<p className="text-base sm-phone:text-lg md-phone:text-xl lg-phone:text-xl xl-phone:text-xl 2xl-phone:text-2xl sm-tablet:text-2xl md-tablet:text-2xl lg-tablet:text-xl xl-tablet:text-2xl 2xl-tablet:text-3xl md-laptop:text-3xl opacity-90 leading-relaxed">
									Transforming the way students learn, grow, and succeed through
									innovative education technology.
								</p>
							</div>
							<div
								className={`${
									isVisible ? "animate-slide-in-right" : "opacity-0"
								}`}
								style={{ animationDelay: "200ms" }}
							>
								<div className="relative">
									<div className="floating-icon text-6xl sm-phone:text-7xl md-phone:text-8xl lg-phone:text-9xl xl-phone:text-9xl 2xl-phone:text-9xl sm-tablet:text-9xl md-tablet:text-9xl lg-tablet:text-8xl xl-tablet:text-9xl 2xl-tablet:text-9xl md-laptop:text-9xl text-center opacity-90">
										🎓
									</div>
									<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm-phone:w-40 sm-phone:h-40 md-phone:w-48 md-phone:h-48 lg-phone:w-52 lg-phone:h-52 xl-phone:w-56 xl-phone:h-56 2xl-phone:w-60 2xl-phone:h-60 sm-tablet:w-64 sm-tablet:h-64 md-tablet:w-72 md-tablet:h-72 lg-tablet:w-56 lg-tablet:h-56 xl-tablet:w-64 xl-tablet:h-64 2xl-tablet:w-72 2xl-tablet:h-72 md-laptop:w-80 md-laptop:h-80 border-4 border-white rounded-full opacity-20 animate-pulse"></div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Our Story Section */}
				<section className="py-8 sm-phone:py-10 md-phone:py-12 lg-phone:py-14 xl-phone:py-16 2xl-phone:py-18 sm-tablet:py-20 md-tablet:py-22 lg-tablet:py-24 xl-tablet:py-26 2xl-tablet:py-28 md-laptop:py-32 px-4 sm-phone:px-5 md-phone:px-6 lg-phone:px-7 xl-phone:px-8 2xl-phone:px-8 sm-tablet:px-8 md-tablet:px-8 lg-tablet:px-10 xl-tablet:px-12 2xl-tablet:px-14 md-laptop:px-16">
					<div className="max-w-4xl mx-auto">
						<div
							className={`story-card p-6 sm-phone:p-7 md-phone:p-8 lg-phone:p-9 xl-phone:p-10 2xl-phone:p-11 sm-tablet:p-12 md-tablet:p-14 lg-tablet:p-10 xl-tablet:p-12 2xl-tablet:p-16 md-laptop:p-20 rounded-2xl sm-phone:rounded-2xl md-phone:rounded-3xl lg-phone:rounded-3xl xl-phone:rounded-3xl 2xl-phone:rounded-3xl sm-tablet:rounded-3xl md-tablet:rounded-3xl lg-tablet:rounded-3xl xl-tablet:rounded-3xl 2xl-tablet:rounded-3xl md-laptop:rounded-3xl shadow-xl border border-gray-100 ${
								isVisible ? "animate-fade-in-up" : "opacity-0"
							}`}
							style={{ animationDelay: "400ms" }}
						>
							<h2 className="text-2xl sm-phone:text-3xl md-phone:text-4xl lg-phone:text-4xl xl-phone:text-5xl 2xl-phone:text-5xl sm-tablet:text-5xl md-tablet:text-6xl lg-tablet:text-4xl xl-tablet:text-5xl 2xl-tablet:text-6xl md-laptop:text-7xl font-bold gradient-text mb-6 sm-phone:mb-7 md-phone:mb-8 lg-phone:mb-9 xl-phone:mb-10 2xl-phone:mb-11 sm-tablet:mb-12 md-tablet:mb-14 lg-tablet:mb-10 xl-tablet:mb-12 2xl-tablet:mb-16 md-laptop:mb-20 text-center">
								Our Story
							</h2>

							<div className="space-y-4 sm-phone:space-y-5 md-phone:space-y-6 lg-phone:space-y-7 xl-phone:space-y-8 2xl-phone:space-y-8 sm-tablet:space-y-8 md-tablet:space-y-10 lg-tablet:space-y-6 xl-tablet:space-y-8 2xl-tablet:space-y-10 md-laptop:space-y-12">
								<p className="text-base sm-phone:text-lg md-phone:text-xl lg-phone:text-xl xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-xl md-tablet:text-2xl lg-tablet:text-lg xl-tablet:text-xl 2xl-tablet:text-2xl md-laptop:text-2xl leading-relaxed text-gray-700">
									At Brain Hustle, we're on a mission to transform the way
									students learn, grow, and succeed. We believe education should
									be engaging, empowering, and accessible — not overwhelming or
									one-size-fits-all.
								</p>

								<p className="text-base sm-phone:text-lg md-phone:text-xl lg-phone:text-xl xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-xl md-tablet:text-2xl lg-tablet:text-lg xl-tablet:text-xl 2xl-tablet:text-2xl md-laptop:text-2xl leading-relaxed text-gray-700">
									Our platform was built with one goal: to help students prepare
									for their GCSEs with confidence and clarity. Whether you're
									reviewing Maths topics, refining your English writing, or just
									trying to stay organised, Brain Hustle is designed to support
									you every step of the way.
								</p>

								<p className="text-base sm-phone:text-lg md-phone:text-xl lg-phone:text-xl xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-xl md-tablet:text-2xl lg-tablet:text-lg xl-tablet:text-xl 2xl-tablet:text-2xl md-laptop:text-2xl leading-relaxed text-gray-700">
									We blend expert content with thoughtful design — ensuring that
									learning feels less like a chore and more like a journey. With
									features like tailored lessons, revision tools, and personal
									study tracking, we're not just another study app. We're your
									partner in academic growth.
								</p>

								<p className="text-base sm-phone:text-lg md-phone:text-xl lg-phone:text-xl xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-xl md-tablet:text-2xl lg-tablet:text-lg xl-tablet:text-xl 2xl-tablet:text-2xl md-laptop:text-2xl leading-relaxed text-gray-700">
									Our team is made up of educators, designers, and developers
									who care deeply about the student experience. We listen, we
									adapt, and we constantly improve — because we know that
									learning never stops.
								</p>

								<blockquote className="text-base sm-phone:text-lg md-phone:text-xl lg-phone:text-xl xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-xl md-tablet:text-2xl lg-tablet:text-lg xl-tablet:text-xl 2xl-tablet:text-2xl md-laptop:text-2xl italic text-gray-600 border-l-4 border-gray-300 pl-4 sm-phone:pl-5 md-phone:pl-6 lg-phone:pl-6 xl-phone:pl-7 2xl-phone:pl-8 sm-tablet:pl-8 md-tablet:pl-8 lg-tablet:pl-6 xl-tablet:pl-8 2xl-tablet:pl-8 md-laptop:pl-10 font-medium">
									"Whether you're chasing top grades or just trying to stay
									afloat — we're here to help you hustle smart."
								</blockquote>
							</div>
						</div>
					</div>
				</section>

				{/* Values Section */}
				<section className="py-8 sm-phone:py-10 md-phone:py-12 lg-phone:py-14 xl-phone:py-16 2xl-phone:py-18 sm-tablet:py-20 md-tablet:py-22 lg-tablet:py-24 xl-tablet:py-26 2xl-tablet:py-28 md-laptop:py-32 px-4 sm-phone:px-5 md-phone:px-6 lg-phone:px-7 xl-phone:px-8 2xl-phone:px-8 sm-tablet:px-8 md-tablet:px-8 lg-tablet:px-10 xl-tablet:px-12 2xl-tablet:px-14 md-laptop:px-16 bg-gray-50">
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-8 sm-phone:mb-10 md-phone:mb-12 lg-phone:mb-14 xl-phone:mb-16 2xl-phone:mb-16 sm-tablet:mb-18 md-tablet:mb-20 lg-tablet:mb-16 xl-tablet:mb-18 2xl-tablet:mb-20 md-laptop:mb-24">
							<h2 className="text-2xl sm-phone:text-3xl md-phone:text-4xl lg-phone:text-4xl xl-phone:text-5xl 2xl-phone:text-5xl sm-tablet:text-5xl md-tablet:text-6xl lg-tablet:text-4xl xl-tablet:text-5xl 2xl-tablet:text-6xl md-laptop:text-7xl font-bold text-gray-900 mb-4 sm-phone:mb-5 md-phone:mb-6 lg-phone:mb-6 xl-phone:mb-7 2xl-phone:mb-8 sm-tablet:mb-8 md-tablet:mb-10 lg-tablet:mb-6 xl-tablet:mb-8 2xl-tablet:mb-10 md-laptop:mb-12">
								Our Values
							</h2>
							<p className="text-lg sm-phone:text-xl md-phone:text-xl lg-phone:text-xl xl-phone:text-2xl 2xl-phone:text-2xl sm-tablet:text-2xl md-tablet:text-2xl lg-tablet:text-xl xl-tablet:text-2xl 2xl-tablet:text-2xl md-laptop:text-3xl text-gray-600">
								The principles that guide everything we do.
							</p>
						</div>

						<div className="grid md-phone:grid-cols-2 gap-6 sm-phone:gap-7 md-phone:gap-8 lg-phone:gap-9 xl-phone:gap-10 2xl-phone:gap-11 sm-tablet:gap-12 md-tablet:gap-14 lg-tablet:gap-8 xl-tablet:gap-10 2xl-tablet:gap-12 md-laptop:gap-16">
							{values.map((value, index) => (
								<div
									key={index}
									className={`value-card card-hover p-6 sm-phone:p-7 md-phone:p-8 lg-phone:p-9 xl-phone:p-10 2xl-phone:p-10 sm-tablet:p-10 md-tablet:p-12 lg-tablet:p-8 xl-tablet:p-10 2xl-tablet:p-12 md-laptop:p-14 rounded-2xl sm-phone:rounded-2xl md-phone:rounded-3xl lg-phone:rounded-3xl xl-phone:rounded-3xl 2xl-phone:rounded-3xl sm-tablet:rounded-3xl md-tablet:rounded-3xl lg-tablet:rounded-3xl xl-tablet:rounded-3xl 2xl-tablet:rounded-3xl md-laptop:rounded-3xl border border-gray-100 shadow-lg ${
										isVisible ? "animate-fade-in-up" : "opacity-0"
									}`}
									style={{ animationDelay: `${600 + index * 100}ms` }}
								>
									<div className="flex items-center gap-4 sm-phone:gap-5 md-phone:gap-6 lg-phone:gap-6 xl-phone:gap-7 2xl-phone:gap-8 sm-tablet:gap-8 md-tablet:gap-8 lg-tablet:gap-6 xl-tablet:gap-8 2xl-tablet:gap-8 md-laptop:gap-10 mb-4 sm-phone:mb-5 md-phone:mb-6 lg-phone:mb-6 xl-phone:mb-7 2xl-phone:mb-8 sm-tablet:mb-8 md-tablet:mb-8 lg-tablet:mb-6 xl-tablet:mb-8 2xl-tablet:mb-8 md-laptop:mb-10">
										<div
											className="w-12 h-12 sm-phone:w-14 sm-phone:h-14 md-phone:w-16 md-phone:h-16 lg-phone:w-18 lg-phone:h-18 xl-phone:w-20 xl-phone:h-20 2xl-phone:w-20 2xl-phone:h-20 sm-tablet:w-20 sm-tablet:h-20 md-tablet:w-22 md-tablet:h-22 lg-tablet:w-16 lg-tablet:h-16 xl-tablet:w-20 xl-tablet:h-20 2xl-tablet:w-22 2xl-tablet:h-22 md-laptop:w-24 md-laptop:h-24 rounded-xl flex items-center justify-center text-2xl sm-phone:text-3xl md-phone:text-4xl lg-phone:text-4xl xl-phone:text-5xl 2xl-phone:text-5xl sm-tablet:text-5xl md-tablet:text-5xl lg-tablet:text-4xl xl-tablet:text-5xl 2xl-tablet:text-5xl md-laptop:text-6xl floating-icon flex-shrink-0"
											style={{
												backgroundColor: value.color + "40",
												animationDelay: `${index * 0.5}s`,
											}}
										>
											{value.icon}
										</div>
										<h3 className="text-lg sm-phone:text-xl md-phone:text-2xl lg-phone:text-2xl xl-phone:text-3xl 2xl-phone:text-3xl sm-tablet:text-3xl md-tablet:text-3xl lg-tablet:text-2xl xl-tablet:text-3xl 2xl-tablet:text-3xl md-laptop:text-4xl font-bold text-gray-900">
											{value.title}
										</h3>
									</div>
									<p className="text-sm sm-phone:text-base md-phone:text-lg lg-phone:text-lg xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-xl md-tablet:text-xl lg-tablet:text-lg xl-tablet:text-xl 2xl-tablet:text-xl md-laptop:text-2xl text-gray-600 leading-relaxed">
										{value.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Timeline Section */}
				<section className="py-8 sm-phone:py-10 md-phone:py-12 lg-phone:py-14 xl-phone:py-16 2xl-phone:py-18 sm-tablet:py-20 md-tablet:py-22 lg-tablet:py-24 xl-tablet:py-26 2xl-tablet:py-28 md-laptop:py-32 px-4 sm-phone:px-5 md-phone:px-6 lg-phone:px-7 xl-phone:px-8 2xl-phone:px-8 sm-tablet:px-8 md-tablet:px-8 lg-tablet:px-10 xl-tablet:px-12 2xl-tablet:px-14 md-laptop:px-16">
					<div className="max-w-4xl mx-auto">
						<div className="text-center mb-8 sm-phone:mb-10 md-phone:mb-12 lg-phone:mb-14 xl-phone:mb-16 2xl-phone:mb-16 sm-tablet:mb-18 md-tablet:mb-20 lg-tablet:mb-16 xl-tablet:mb-18 2xl-tablet:mb-20 md-laptop:mb-24">
							<h2 className="text-2xl sm-phone:text-3xl md-phone:text-4xl lg-phone:text-4xl xl-phone:text-5xl 2xl-phone:text-5xl sm-tablet:text-5xl md-tablet:text-6xl lg-tablet:text-4xl xl-tablet:text-5xl 2xl-tablet:text-6xl md-laptop:text-7xl font-bold text-gray-900 mb-4 sm-phone:mb-5 md-phone:mb-6 lg-phone:mb-6 xl-phone:mb-7 2xl-phone:mb-8 sm-tablet:mb-8 md-tablet:mb-10 lg-tablet:mb-6 xl-tablet:mb-8 2xl-tablet:mb-10 md-laptop:mb-12">
								Our Journey
							</h2>
							<p className="text-lg sm-phone:text-xl md-phone:text-xl lg-phone:text-xl xl-phone:text-2xl 2xl-phone:text-2xl sm-tablet:text-2xl md-tablet:text-2xl lg-tablet:text-xl xl-tablet:text-2xl 2xl-tablet:text-2xl md-laptop:text-3xl text-gray-600">
								Key milestones in our mission to transform education.
							</p>
						</div>

						<div className="relative">
							<div className="timeline-line absolute left-4 sm-phone:left-5 md-phone:left-6 lg-phone:left-6 xl-phone:left-7 2xl-phone:left-8 sm-tablet:left-8 md-tablet:left-8 lg-tablet:left-6 xl-tablet:left-8 2xl-tablet:left-8 md-laptop:left-10 top-0 w-1 h-full"></div>

							<div className="space-y-6 sm-phone:space-y-7 md-phone:space-y-8 lg-phone:space-y-9 xl-phone:space-y-10 2xl-phone:space-y-11 sm-tablet:space-y-12 md-tablet:space-y-14 lg-tablet:space-y-10 xl-tablet:space-y-12 2xl-tablet:space-y-14 md-laptop:space-y-16">
								{milestones.map((milestone, index) => (
									<div
										key={index}
										className={`relative flex items-start gap-4 sm-phone:gap-5 md-phone:gap-6 lg-phone:gap-7 xl-phone:gap-8 2xl-phone:gap-8 sm-tablet:gap-8 md-tablet:gap-10 lg-tablet:gap-6 xl-tablet:gap-8 2xl-tablet:gap-10 md-laptop:gap-12 ${
											isVisible ? "animate-fade-in-up" : "opacity-0"
										}`}
										style={{ animationDelay: `${1000 + index * 200}ms` }}
									>
										<div className="w-8 h-8 sm-phone:w-10 sm-phone:h-10 md-phone:w-12 md-phone:h-12 lg-phone:w-12 lg-phone:h-12 xl-phone:w-14 xl-phone:h-14 2xl-phone:w-16 2xl-phone:h-16 sm-tablet:w-16 sm-tablet:h-16 md-tablet:w-18 md-tablet:h-18 lg-tablet:w-12 lg-tablet:h-12 xl-tablet:w-16 xl-tablet:h-16 2xl-tablet:w-18 2xl-tablet:h-18 md-laptop:w-20 md-laptop:h-20 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center font-bold text-xs sm-phone:text-sm md-phone:text-base lg-phone:text-base xl-phone:text-lg 2xl-phone:text-xl sm-tablet:text-xl md-tablet:text-xl lg-tablet:text-base xl-tablet:text-xl 2xl-tablet:text-xl md-laptop:text-2xl text-gray-700 flex-shrink-0 z-10 relative">
											{milestone.year}
										</div>
										<div className="flex-1">
											<h3 className="text-lg sm-phone:text-xl md-phone:text-2xl lg-phone:text-2xl xl-phone:text-3xl 2xl-phone:text-3xl sm-tablet:text-3xl md-tablet:text-3xl lg-tablet:text-2xl xl-tablet:text-3xl 2xl-tablet:text-3xl md-laptop:text-4xl font-bold text-gray-900 mb-2 sm-phone:mb-3 md-phone:mb-3 lg-phone:mb-3 xl-phone:mb-4 2xl-phone:mb-4 sm-tablet:mb-4 md-tablet:mb-4 lg-tablet:mb-3 xl-tablet:mb-4 2xl-tablet:mb-4 md-laptop:mb-5">
												{milestone.title}
											</h3>
											<p className="text-sm sm-phone:text-base md-phone:text-lg lg-phone:text-lg xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-xl md-tablet:text-xl lg-tablet:text-lg xl-tablet:text-xl 2xl-tablet:text-xl md-laptop:text-2xl text-gray-600 leading-relaxed">
												{milestone.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Team Section */}
				<section
					id="team-section"
					className="py-8 sm-phone:py-10 md-phone:py-12 lg-phone:py-14 xl-phone:py-16 2xl-phone:py-18 sm-tablet:py-20 md-tablet:py-22 lg-tablet:py-24 xl-tablet:py-26 2xl-tablet:py-28 md-laptop:py-32 px-4 sm-phone:px-5 md-phone:px-6 lg-phone:px-7 xl-phone:px-8 2xl-phone:px-8 sm-tablet:px-8 md-tablet:px-8 lg-tablet:px-10 xl-tablet:px-12 2xl-tablet:px-14 md-laptop:px-16 bg-gray-50"
				>
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-8 sm-phone:mb-10 md-phone:mb-12 lg-phone:mb-14 xl-phone:mb-16 2xl-phone:mb-16 sm-tablet:mb-18 md-tablet:mb-20 lg-tablet:mb-16 xl-tablet:mb-18 2xl-tablet:mb-20 md-laptop:mb-24">
							<h2
								className={`text-2xl sm-phone:text-3xl md-phone:text-4xl lg-phone:text-4xl xl-phone:text-5xl 2xl-phone:text-5xl sm-tablet:text-5xl md-tablet:text-6xl lg-tablet:text-4xl xl-tablet:text-5xl 2xl-tablet:text-6xl md-laptop:text-7xl font-bold text-gray-900 mb-4 sm-phone:mb-6 md-phone:mb-8 lg-phone:mb-8 xl-phone:mb-10 2xl-phone:mb-10 sm-tablet:mb-10 md-tablet:mb-12 lg-tablet:mb-10 xl-tablet:mb-12 2xl-tablet:mb-14 md-laptop:mb-16 ${getTypingClass()}`}
							>
								Meet Our Team
							</h2>

							<p
								className={`mt-6 text-base sm-phone:text-lg md-phone:text-lg lg-phone:text-lg xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-xl md-tablet:text-xl lg-tablet:text-base xl-tablet:text-lg 2xl-tablet:text-xl md-laptop:text-2xl text-gray-600 ${
									isTeamSectionVisible && typingPhase >= 1
										? "animate-fade-in-up"
										: "opacity-0"
								}`}
								style={{ animationDelay: typingPhase >= 1 ? "1000ms" : "0ms" }}
							>
								The passionate minds behind Brain Hustle's success.
							</p>
						</div>

						<div className="grid md-phone:grid-cols-2 gap-6 sm-phone:gap-7 md-phone:gap-8 lg-phone:gap-9 xl-phone:gap-10 2xl-phone:gap-11 sm-tablet:gap-12 md-tablet:gap-14 lg-tablet:gap-8 xl-tablet:gap-10 2xl-tablet:gap-12 md-laptop:gap-16">
							{team.map((member, index) => (
								<div
									key={index}
									className={`team-card card-hover p-6 sm-phone:p-7 md-phone:p-8 lg-phone:p-9 xl-phone:p-10 2xl-phone:p-10 sm-tablet:p-10 md-tablet:p-12 lg-tablet:p-8 xl-tablet:p-10 2xl-tablet:p-12 md-laptop:p-14 rounded-2xl sm-phone:rounded-2xl md-phone:rounded-3xl lg-phone:rounded-3xl xl-phone:rounded-3xl 2xl-phone:rounded-3xl sm-tablet:rounded-3xl md-tablet:rounded-3xl lg-tablet:rounded-3xl xl-tablet:rounded-3xl 2xl-tablet:rounded-3xl md-laptop:rounded-3xl border border-gray-100 shadow-lg text-center ${
										isTeamSectionVisible && typingPhase >= 1
											? "animate-fade-in-up"
											: "opacity-0"
									}`}
									style={{
										animationDelay:
											typingPhase >= 1 ? `${1500 + index * 100}ms` : "0ms",
									}}
								>
									<div
										className="w-16 h-16 sm-phone:w-20 sm-phone:h-20 md-phone:w-24 md-phone:h-24 lg-phone:w-28 lg-phone:h-28 xl-phone:w-32 xl-phone:h-32 2xl-phone:w-32 2xl-phone:h-32 sm-tablet:w-32 sm-tablet:h-32 md-tablet:w-36 md-tablet:h-36 lg-tablet:w-28 lg-tablet:h-28 xl-tablet:w-32 xl-tablet:h-32 2xl-tablet:w-36 2xl-tablet:h-36 md-laptop:w-40 md-laptop:h-40 rounded-full mx-auto mb-4 sm-phone:mb-5 md-phone:mb-6 lg-phone:mb-6 xl-phone:mb-7 2xl-phone:mb-8 sm-tablet:mb-8 md-tablet:mb-8 lg-tablet:mb-6 xl-tablet:mb-8 2xl-tablet:mb-8 md-laptop:mb-10 flex items-center justify-center text-3xl sm-phone:text-4xl md-phone:text-5xl lg-phone:text-6xl xl-phone:text-7xl 2xl-phone:text-7xl sm-tablet:text-7xl md-tablet:text-7xl lg-tablet:text-6xl xl-tablet:text-7xl 2xl-tablet:text-7xl md-laptop:text-8xl floating-icon"
										style={{
											backgroundColor: member.color + "40",
											animationDelay: `${index * 0.5}s`,
										}}
									>
										{member.image}
									</div>
									<h3 className="text-lg sm-phone:text-xl md-phone:text-2xl lg-phone:text-2xl xl-phone:text-3xl 2xl-phone:text-3xl sm-tablet:text-3xl md-tablet:text-3xl lg-tablet:text-2xl xl-tablet:text-3xl 2xl-tablet:text-3xl md-laptop:text-4xl font-bold text-gray-900 mb-2 sm-phone:mb-3 md-phone:mb-3 lg-phone:mb-3 xl-phone:mb-4 2xl-phone:mb-4 sm-tablet:mb-4 md-tablet:mb-4 lg-tablet:mb-3 xl-tablet:mb-4 2xl-tablet:mb-4 md-laptop:mb-5">
										{member.name}
									</h3>
									<p
										className="text-sm sm-phone:text-base md-phone:text-lg lg-phone:text-lg xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-xl md-tablet:text-xl lg-tablet:text-lg xl-tablet:text-xl 2xl-tablet:text-xl md-laptop:text-2xl font-semibold mb-2 sm-phone:mb-3 md-phone:mb-3 lg-phone:mb-3 xl-phone:mb-4 2xl-phone:mb-4 sm-tablet:mb-4 md-tablet:mb-4 lg-tablet:mb-3 xl-tablet:mb-4 2xl-tablet:mb-4 md-laptop:mb-5"
										style={{ color: member.color }}
									>
										{member.role}
									</p>
									<p className="text-sm sm-phone:text-base md-phone:text-lg lg-phone:text-lg xl-phone:text-lg 2xl-phone:text-xl sm-tablet:text-xl md-tablet:text-xl lg-tablet:text-base xl-tablet:text-lg 2xl-tablet:text-xl md-laptop:text-xl text-gray-600 leading-relaxed">
										{member.bio}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Call to Action Section */}
				<section className="py-8 sm-phone:py-10 md-phone:py-12 lg-phone:py-14 xl-phone:py-16 2xl-phone:py-18 sm-tablet:py-20 md-tablet:py-22 lg-tablet:py-24 xl-tablet:py-26 2xl-tablet:py-28 md-laptop:py-32 px-4 sm-phone:px-5 md-phone:px-6 lg-phone:px-7 xl-phone:px-8 2xl-phone:px-8 sm-tablet:px-8 md-tablet:px-8 lg-tablet:px-10 xl-tablet:px-12 2xl-tablet:px-14 md-laptop:px-16">
					<div className="max-w-4xl mx-auto text-center">
						<div
							className={`story-card p-6 sm-phone:p-7 md-phone:p-8 lg-phone:p-9 xl-phone:p-10 2xl-phone:p-11 sm-tablet:p-12 md-tablet:p-14 lg-tablet:p-10 xl-tablet:p-12 2xl-tablet:p-16 md-laptop:p-20 rounded-2xl sm-phone:rounded-2xl md-phone:rounded-3xl lg-phone:rounded-3xl xl-phone:rounded-3xl 2xl-phone:rounded-3xl sm-tablet:rounded-3xl md-tablet:rounded-3xl lg-tablet:rounded-3xl xl-tablet:rounded-3xl 2xl-tablet:rounded-3xl md-laptop:rounded-3xl shadow-xl border border-gray-100 ${
								isVisible ? "animate-fade-in-up" : "opacity-0"
							}`}
							style={{ animationDelay: "1600ms" }}
						>
							<h2 className="text-2xl sm-phone:text-3xl md-phone:text-4xl lg-phone:text-4xl xl-phone:text-5xl 2xl-phone:text-5xl sm-tablet:text-5xl md-tablet:text-6xl lg-tablet:text-4xl xl-tablet:text-5xl 2xl-tablet:text-6xl md-laptop:text-7xl font-bold text-gray-900 mb-4 sm-phone:mb-5 md-phone:mb-6 lg-phone:mb-6 xl-phone:mb-7 2xl-phone:mb-8 sm-tablet:mb-8 md-tablet:mb-10 lg-tablet:mb-6 xl-tablet:mb-8 2xl-tablet:mb-10 md-laptop:mb-12">
								Ready to Start Your Journey?
							</h2>
							<p className="text-base sm-phone:text-lg md-phone:text-xl lg-phone:text-xl xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-xl md-tablet:text-2xl lg-tablet:text-lg xl-tablet:text-xl 2xl-tablet:text-2xl md-laptop:text-2xl text-gray-600 mb-6 sm-phone:mb-7 md-phone:mb-8 lg-phone:mb-9 xl-phone:mb-10 2xl-phone:mb-11 sm-tablet:mb-12 md-tablet:mb-14 lg-tablet:mb-10 xl-tablet:mb-12 2xl-tablet:mb-16 md-laptop:mb-20 leading-relaxed">
								Join thousands of students who are already transforming their
								GCSE preparation with Brain Hustle. Start your free trial today
								and experience the difference.
							</p>
							<div className="flex flex-col sm-tablet:flex-row justify-center gap-4 sm-phone:gap-5 md-phone:gap-6 lg-phone:gap-6 xl-phone:gap-7 2xl-phone:gap-8 sm-tablet:gap-6 md-tablet:gap-8 lg-tablet:gap-6 xl-tablet:gap-8 2xl-tablet:gap-8 md-laptop:gap-10">
								<Link
									href="/sign-up"
									className="inline-block bg-gradient-to-r from-pink-200 to-blue-400 text-white px-6 py-3 sm-phone:px-7 sm-phone:py-4 md-phone:px-8 md-phone:py-4 lg-phone:px-9 lg-phone:py-5 xl-phone:px-10 xl-phone:py-5 2xl-phone:px-10 2xl-phone:py-5 sm-tablet:px-10 sm-tablet:py-5 md-tablet:px-12 md-tablet:py-6 lg-tablet:px-8 lg-tablet:py-4 xl-tablet:px-10 xl-tablet:py-5 2xl-tablet:px-12 2xl-tablet:py-6 md-laptop:px-14 md-laptop:py-7 rounded-xl font-semibold text-sm sm-phone:text-base md-phone:text-lg lg-phone:text-lg xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-xl md-tablet:text-xl lg-tablet:text-lg xl-tablet:text-xl 2xl-tablet:text-xl md-laptop:text-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
								>
									Start Free Trial
								</Link>
								<Link
									href="/contact"
									className="inline-block border-2 border-gray-300 text-gray-700 px-6 py-3 sm-phone:px-7 sm-phone:py-4 md-phone:px-8 md-phone:py-4 lg-phone:px-9 lg-phone:py-5 xl-phone:px-10 xl-phone:py-5 2xl-phone:px-10 2xl-phone:py-5 sm-tablet:px-10 sm-tablet:py-5 md-tablet:px-12 md-tablet:py-6 lg-tablet:px-8 lg-tablet:py-4 xl-tablet:px-10 xl-tablet:py-5 2xl-tablet:px-12 2xl-tablet:py-6 md-laptop:px-14 md-laptop:py-7 rounded-xl font-semibold text-sm sm-phone:text-base md-phone:text-lg lg-phone:text-lg xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-xl md-tablet:text-xl lg-tablet:text-lg xl-tablet:text-xl 2xl-tablet:text-xl md-laptop:text-2xl hover:bg-gray-50 transition-all duration-300"
								>
									Contact Us
								</Link>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
