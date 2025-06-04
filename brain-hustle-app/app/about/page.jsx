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
			bio: "PhD in Educational Psychology, specialised in cognitive learning techniques.",
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
			`}</style>

			<main className="bg-white text-gray-800 overflow-hidden">
				{/* Hero Section */}
				<section className="hero-bg text-white py-12 md-phone:py-16 lg-tablet:py-20 md-laptop:py-32 px-4 md-phone:px-6 lg-tablet:px-8 md-laptop:px-16 relative z-10">
					<div className="max-w-6xl mx-auto">
						<div className="grid lg-tablet:grid-cols-2 gap-8 lg-tablet:gap-16 items-center">
							<div
								className={`${
									isVisible ? "animate-slide-in-left" : "opacity-0"
								}`}
							>
								<h1 className="text-3xl md-phone:text-4xl lg-tablet:text-5xl md-laptop:text-7xl font-bold mb-6 lg-tablet:mb-8">
									About Brain Hustle
								</h1>
								<p className="text-lg md-phone:text-xl lg-tablet:text-xl md-laptop:text-2xl opacity-90 leading-relaxed">
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
								<div className="relative text-center">
									<div className="floating-icon text-8xl md-phone:text-9xl opacity-90">
										🎓
									</div>
									<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md-phone:w-56 md-phone:h-56 lg-tablet:w-64 lg-tablet:h-64 border-4 border-white rounded-full opacity-20 animate-pulse"></div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Our Story Section */}
				<section className="py-12 md-phone:py-16 lg-tablet:py-20 md-laptop:py-32 px-4 md-phone:px-6 lg-tablet:px-8 md-laptop:px-16">
					<div className="max-w-4xl mx-auto">
						<div
							className={`bg-gradient-to-br from-white to-gray-50 p-8 md-phone:p-10 lg-tablet:p-12 md-laptop:p-16 rounded-3xl shadow-xl border border-gray-100 ${
								isVisible ? "animate-fade-in-up" : "opacity-0"
							}`}
							style={{ animationDelay: "400ms" }}
						>
							<h2 className="text-3xl md-phone:text-4xl lg-tablet:text-5xl md-laptop:text-6xl font-bold gradient-text mb-8 lg-tablet:mb-10 text-center">
								Our Story
							</h2>

							<div className="space-y-6 lg-tablet:space-y-8">
								<p className="text-lg md-phone:text-xl lg-tablet:text-xl md-laptop:text-2xl leading-relaxed text-gray-700">
									At Brain Hustle, we&apos;re on a mission to transform the way
									students learn, grow, and succeed. We believe education should
									be engaging, empowering, and accessible — not overwhelming or
									one-size-fits-all.
								</p>

								<p className="text-lg md-phone:text-xl lg-tablet:text-xl md-laptop:text-2xl leading-relaxed text-gray-700">
									Our platform was built with one goal: to help students prepare
									for their GCSEs with confidence and clarity. Whether
									you&apos;re reviewing Maths topics, refining your English
									writing, or just trying to stay organised, Brain Hustle is
									designed to support you every step of the way.
								</p>

								<p className="text-lg md-phone:text-xl lg-tablet:text-xl md-laptop:text-2xl leading-relaxed text-gray-700">
									We blend expert content with thoughtful design — ensuring that
									learning feels less like a chore and more like a journey. With
									features like tailored lessons, revision tools, and personal
									study tracking, we&apos;re not just another study app.
									We&apos;re your partner in academic growth.
								</p>

								<p className="text-lg md-phone:text-xl lg-tablet:text-xl md-laptop:text-2xl leading-relaxed text-gray-700">
									Our team is made up of educators, designers, and developers
									who care deeply about the student experience. We listen, we
									adapt, and we constantly improve — because we know that
									learning never stops.
								</p>

								<blockquote className="text-lg md-phone:text-xl lg-tablet:text-xl md-laptop:text-2xl italic text-gray-600 border-l-4 border-gray-300 pl-6 lg-tablet:pl-8 font-medium">
									&quot;Whether you&apos;re chasing top grades or just trying to
									stay afloat — we&apos;re here to help you hustle smart.&quot;
								</blockquote>
							</div>
						</div>
					</div>
				</section>

				{/* Values Section */}
				<section className="py-12 md-phone:py-16 lg-tablet:py-20 md-laptop:py-32 px-4 md-phone:px-6 lg-tablet:px-8 md-laptop:px-16 bg-gray-50">
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-12 lg-tablet:mb-16">
							<h2 className="text-3xl md-phone:text-4xl lg-tablet:text-5xl md-laptop:text-6xl font-bold text-gray-900 mb-6">
								Our Values
							</h2>
							<p className="text-xl md-phone:text-xl lg-tablet:text-2xl md-laptop:text-2xl text-gray-600">
								The principles that guide everything we do.
							</p>
						</div>

						<div className="grid gap-6 lg-tablet:grid-cols-2 lg-tablet:gap-8">
							{values.map((value, index) => (
								<div
									key={index}
									className={`bg-gradient-to-br from-white to-gray-50 card-hover p-6 lg-tablet:p-8 rounded-3xl border border-gray-100 shadow-lg ${
										isVisible ? "animate-fade-in-up" : "opacity-0"
									}`}
									style={{ animationDelay: `${600 + index * 100}ms` }}
								>
									<div className="text-center mb-6">
										<div
											className="w-16 h-16 lg-tablet:w-20 lg-tablet:h-20 rounded-xl flex items-center justify-center text-3xl lg-tablet:text-4xl floating-icon mx-auto mb-4"
											style={{
												backgroundColor: value.color + "40",
												animationDelay: `${index * 0.5}s`,
											}}
										>
											{value.icon}
										</div>
										<h3 className="text-lg md-phone:text-xl lg-tablet:text-2xl md-laptop:text-2xl font-bold text-gray-900 leading-tight">
											{value.title}
										</h3>
									</div>
									<p className="text-sm md-phone:text-base lg-tablet:text-lg md-laptop:text-lg text-gray-600 leading-relaxed text-center">
										{value.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Timeline Section */}
				<section className="py-12 md-phone:py-16 lg-tablet:py-20 md-laptop:py-32 px-4 md-phone:px-6 lg-tablet:px-8 md-laptop:px-16">
					<div className="max-w-4xl mx-auto">
						<div className="text-center mb-12 lg-tablet:mb-16">
							<h2 className="text-3xl md-phone:text-4xl lg-tablet:text-5xl md-laptop:text-6xl font-bold text-gray-900 mb-6">
								Our Journey
							</h2>
							<p className="text-xl md-phone:text-xl lg-tablet:text-2xl md-laptop:text-2xl text-gray-600">
								Key milestones in our mission to transform education.
							</p>
						</div>

						<div className="relative">
							<div className="timeline-line absolute left-6 lg-tablet:left-8 top-0 w-1 h-full"></div>

							<div className="space-y-8 lg-tablet:space-y-12">
								{milestones.map((milestone, index) => (
									<div
										key={index}
										className={`relative flex items-start gap-6 lg-tablet:gap-8 ${
											isVisible ? "animate-fade-in-up" : "opacity-0"
										}`}
										style={{ animationDelay: `${1000 + index * 200}ms` }}
									>
										<div className="w-12 h-12 lg-tablet:w-16 lg-tablet:h-16 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center font-bold text-sm lg-tablet:text-base text-gray-700 flex-shrink-0 z-10 relative">
											{milestone.year}
										</div>
										<div className="flex-1">
											<h3 className="text-xl md-phone:text-2xl lg-tablet:text-2xl md-laptop:text-3xl font-bold text-gray-900 mb-3">
												{milestone.title}
											</h3>
											<p className="text-base md-phone:text-lg lg-tablet:text-lg md-laptop:text-xl text-gray-600 leading-relaxed">
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
					className="py-12 md-phone:py-16 lg-tablet:py-20 md-laptop:py-32 px-4 md-phone:px-6 lg-tablet:px-8 md-laptop:px-16 bg-gray-50"
				>
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-12 lg-tablet:mb-16">
							<h2
								className={`text-3xl md-phone:text-4xl lg-tablet:text-5xl md-laptop:text-6xl font-bold text-gray-900 mb-6 lg-tablet:mb-8 ${getTypingClass()}`}
							>
								Meet Our Team
							</h2>

							<p
								className={`text-lg md-phone:text-xl lg-tablet:text-xl md-laptop:text-2xl text-gray-600 ${
									isTeamSectionVisible && typingPhase >= 1
										? "animate-fade-in-up"
										: "opacity-0"
								}`}
								style={{ animationDelay: typingPhase >= 1 ? "1000ms" : "0ms" }}
							>
								The passionate minds behind Brain Hustle&apos;s success.
							</p>
						</div>

						<div className="grid gap-6 lg-tablet:grid-cols-2 lg-tablet:gap-8">
							{team.map((member, index) => (
								<div
									key={index}
									className={`bg-gradient-to-br from-white to-gray-50 card-hover p-6 md-phone:p-8 lg-tablet:p-10 rounded-3xl border border-gray-100 shadow-lg text-center ${
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
										className="w-20 h-20 md-phone:w-24 md-phone:h-24 lg-tablet:w-28 lg-tablet:h-28 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl md-phone:text-6xl lg-tablet:text-7xl floating-icon"
										style={{
											backgroundColor: member.color + "40",
											animationDelay: `${index * 0.5}s`,
										}}
									>
										{member.image}
									</div>
									<h3 className="text-xl md-phone:text-2xl lg-tablet:text-2xl md-laptop:text-3xl font-bold text-gray-900 mb-3">
										{member.name}
									</h3>
									<p
										className="text-base md-phone:text-lg lg-tablet:text-lg md-laptop:text-xl font-semibold mb-4"
										style={{ color: member.color }}
									>
										{member.role}
									</p>
									<p className="text-base md-phone:text-lg lg-tablet:text-lg text-gray-600 leading-relaxed">
										{member.bio}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Call to Action Section */}
				<section className="py-12 md-phone:py-16 lg-tablet:py-20 md-laptop:py-32 px-4 md-phone:px-6 lg-tablet:px-8 md-laptop:px-16">
					<div className="max-w-4xl mx-auto text-center">
						<div
							className={`bg-gradient-to-br from-white to-gray-50 p-8 md-phone:p-10 lg-tablet:p-12 md-laptop:p-16 rounded-3xl shadow-xl border border-gray-100 ${
								isVisible ? "animate-fade-in-up" : "opacity-0"
							}`}
							style={{ animationDelay: "1600ms" }}
						>
							<h2 className="text-3xl md-phone:text-4xl lg-tablet:text-5xl md-laptop:text-6xl font-bold text-gray-900 mb-6 lg-tablet:mb-8">
								Ready to Start Your Journey?
							</h2>
							<p className="text-lg md-phone:text-xl lg-tablet:text-xl md-laptop:text-2xl text-gray-600 mb-8 lg-tablet:mb-12 leading-relaxed">
								Join thousands of students who are already transforming their
								GCSE preparation with Brain Hustle. Start your free trial today
								and experience the difference.
							</p>
							<div className="flex flex-col sm-tablet:flex-row justify-center gap-4 lg-tablet:gap-6">
								<Link
									href="/sign-up"
									className="inline-block bg-gradient-to-r from-pink-200 to-blue-400 text-white px-8 py-4 md-phone:px-10 md-phone:py-5 rounded-xl font-semibold text-lg md-phone:text-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
								>
									Start Free Trial
								</Link>
								<Link
									href="/contact"
									className="inline-block border-2 border-gray-300 text-gray-700 px-8 py-4 md-phone:px-10 md-phone:py-5 rounded-xl font-semibold text-lg md-phone:text-xl hover:bg-gray-50 transition-all duration-300"
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
