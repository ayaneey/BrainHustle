"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

function Success() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 200);

		return () => clearTimeout(timer);
	}, []);

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
						box-shadow: 0 10px 40px rgba(59, 130, 246, 0.1);
					}
					50% {
						box-shadow: 0 20px 60px rgba(59, 130, 246, 0.2);
					}
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

				.section-bg {
					background: linear-gradient(
						135deg,
						#1e293b 0%,
						#334155 50%,
						#475569 100%
					);
					position: relative;
					overflow: hidden;
				}

				.section-bg::before {
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
						repeat;
				}

				.success-card {
					background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
					position: relative;
					overflow: hidden;
					transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
					animation: pulse-glow 4s ease-in-out infinite;
				}

				.success-card::before {
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

				.success-card:hover::before {
					left: 100%;
				}

				.success-card:hover {
					transform: translateY(-8px);
					box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
				}

				.floating-image {
					animation: float 6s ease-in-out infinite;
					transition: all 0.3s ease;
				}

				.success-card:hover .floating-image {
					transform: scale(1.05);
					animation-duration: 3s;
				}

				.gradient-text {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
				}

				.content-slide {
					transition: transform 0.4s ease;
				}

				.success-card:hover .content-slide {
					transform: translateX(8px);
				}

				.stats-highlight {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
					font-weight: 800;
				}

				/* Decorative elements */
				.success-card::after {
					content: "";
					position: absolute;
					top: -50%;
					right: -50%;
					width: 100%;
					height: 100%;
					background: radial-gradient(
						circle,
						rgba(59, 130, 246, 0.1) 0%,
						transparent 70%
					);
					pointer-events: none;
					transition: all 0.4s ease;
				}

				.success-card:hover::after {
					top: -30%;
					right: -30%;
				}
			`}</style>

			<div className="section-bg py-8 sm-phone:py-12 md-phone:py-16 lg-phone:py-16 xl-phone:py-20 2xl-phone:py-20 sm-tablet:py-16 md-tablet:py-20 lg-tablet:py-16 xl-tablet:py-20 2xl-tablet:py-24 md-laptop:py-28 relative z-10">
				<div className="max-w-7xl mx-auto px-4 sm-phone:px-6 lg-tablet:px-8">
					{/* Section Header */}
					<div
						className={`text-center mb-8 sm-phone:mb-12 md-phone:mb-16 lg-phone:mb-16 xl-phone:mb-20 sm-tablet:mb-12 md-tablet:mb-16 lg-tablet:mb-12 xl-tablet:mb-16 2xl-tablet:mb-20 md-laptop:mb-24 ${
							isVisible ? "animate-fade-in-up" : "opacity-0"
						}`}
					>
						<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-6xl font-extrabold text-white mb-6 text-center leading-tight">
							Unmatched Success Rates for Our Students
						</h1>

						<p className="text-base sm-phone:text-lg md-phone:text-xl lg-phone:text-xl xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-lg md-tablet:text-xl lg-tablet:text-base xl-tablet:text-lg 2xl-tablet:text-xl md-laptop:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
							Discover how BrainHustle transforms academic journeys with proven
							results.
						</p>
					</div>

					{/* Main Success Card */}
					<div
						className={`flex justify-center ${
							isVisible ? "animate-fade-in-up" : "opacity-0"
						}`}
						style={{ animationDelay: "300ms" }}
					>
						<div className="success-card w-full max-w-6xl rounded-3xl p-6 sm-phone:p-8 md-phone:p-10 lg-phone:p-10 xl-phone:p-12 2xl-phone:p-12 sm-tablet:p-10 md-tablet:p-12 lg-tablet:p-10 xl-tablet:p-12 2xl-tablet:p-14 md-laptop:p-16 shadow-2xl border border-gray-100 relative z-10">
							{/* Content Layout */}
							<div className="flex flex-col lg-tablet:flex-row items-center gap-6 sm-phone:gap-8 md-phone:gap-10 lg-phone:gap-10 xl-phone:gap-12 2xl-phone:gap-12 sm-tablet:gap-10 md-tablet:gap-12 lg-tablet:gap-8 xl-tablet:gap-10 2xl-tablet:gap-12 md-laptop:gap-16">
								{/* Text Content */}
								<div
									className={`flex-1 content-slide text-center lg-tablet:text-left ${
										isVisible ? "animate-slide-in-left" : "opacity-0"
									}`}
									style={{ animationDelay: "500ms" }}
								>
									{/* Success Stats */}
									<div className="mb-6 sm-phone:mb-8 md-phone:mb-10">
										<div className="grid grid-cols-2 gap-4 sm-phone:gap-6 md-phone:gap-8 mb-6 sm-phone:mb-8">
											<div className="text-center lg-tablet:text-left">
												<div className="stats-highlight text-2xl sm-phone:text-3xl md-phone:text-4xl lg-phone:text-4xl xl-phone:text-5xl 2xl-phone:text-5xl sm-tablet:text-4xl md-tablet:text-5xl lg-tablet:text-3xl xl-tablet:text-4xl 2xl-tablet:text-5xl md-laptop:text-6xl font-bold">
													98%
												</div>
												<p className="text-xs sm-phone:text-sm md-phone:text-base lg-phone:text-base xl-phone:text-lg 2xl-phone:text-lg sm-tablet:text-base md-tablet:text-lg lg-tablet:text-sm xl-tablet:text-base 2xl-tablet:text-lg md-laptop:text-lg text-gray-600 font-medium">
													Success Rate
												</p>
											</div>
											<div className="text-center lg-tablet:text-left">
												<div className="stats-highlight text-2xl sm-phone:text-3xl md-phone:text-4xl lg-phone:text-4xl xl-phone:text-5xl 2xl-phone:text-5xl sm-tablet:text-4xl md-tablet:text-5xl lg-tablet:text-3xl xl-tablet:text-4xl 2xl-tablet:text-5xl md-laptop:text-6xl font-bold">
													10K+
												</div>
												<p className="text-xs sm-phone:text-sm md-phone:text-base lg-phone:text-base xl-phone:text-lg 2xl-phone:text-lg sm-tablet:text-base md-tablet:text-lg lg-tablet:text-sm xl-tablet:text-base 2xl-tablet:text-lg md-laptop:text-lg text-gray-600 font-medium">
													Students Helped
												</p>
											</div>
										</div>
									</div>
									{/* Main Description */}
									<p className="text-sm sm-phone:text-base md-phone:text-lg lg-phone:text-lg xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-lg md-tablet:text-xl lg-tablet:text-base xl-tablet:text-lg 2xl-tablet:text-xl md-laptop:text-xl text-gray-700 leading-relaxed sm-phone:leading-relaxed md-phone:leading-relaxed lg-phone:leading-relaxed xl-phone:leading-relaxed max-w-lg mx-auto lg-tablet:mx-0">
										At{" "}
										<span className="gradient-text font-bold">BrainHustle</span>
										, we take pride in our unmatched success rates in helping
										students excel in their exams. Our platform is designed to
										provide{" "}
										<span className="font-semibold text-gray-800">
											personalised learning experiences
										</span>
										, empowering students to grasp challenging concepts and
										excel academically.
									</p>
									{/* Additional Info */}
									<p className="text-xs sm-phone:text-sm md-phone:text-base lg-phone:text-base xl-phone:text-lg 2xl-phone:text-lg sm-tablet:text-base md-tablet:text-lg lg-tablet:text-sm xl-tablet:text-base 2xl-tablet:text-lg md-laptop:text-lg text-gray-600 leading-relaxed mt-4 sm-phone:mt-6 max-w-lg mx-auto lg-tablet:mx-0">
										The testimonials of many students reflect the
										behind-the-scenes efforts of our dedicated team and the
										effectiveness of the{" "}
										<span className="gradient-text font-semibold">
											BrainHustle approach
										</span>
										.
									</p>
									{/* CTA Button */}
									<div className="mt-6 sm-phone:mt-8 md-phone:mt-10">
										<Link
											href="/sign-up"
											className="inline-block px-6 py-3 sm-phone:px-8 sm-phone:py-4 md-phone:px-10 md-phone:py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-sm sm-phone:text-base md-phone:text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
										>
											Start Your Success Story
										</Link>
									</div>
								</div>

								{/* Image Section */}
								<div
									className={`flex-1 flex justify-center lg-tablet:justify-end ${
										isVisible ? "animate-slide-in-right" : "opacity-0"
									}`}
									style={{ animationDelay: "700ms" }}
								>
									<div className="relative">
										<img
											src="./images/successDay.svg"
											alt="students celebrating"
											className="floating-image w-full max-w-xs sm-phone:max-w-sm md-phone:max-w-md lg-phone:max-w-md xl-phone:max-w-lg 2xl-phone:max-w-lg sm-tablet:max-w-md md-tablet:max-w-lg lg-tablet:max-w-xs xl-tablet:max-w-sm 2xl-tablet:max-w-md md-laptop:max-w-lg h-auto filter drop-shadow-lg"
										/>

										{/* Floating decorative elements */}
										<div
											className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-70 animate-bounce"
											style={{ animationDelay: "2s" }}
										></div>
										<div
											className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full opacity-70 animate-bounce"
											style={{ animationDelay: "3s" }}
										></div>
										<div
											className="absolute top-1/2 -left-8 w-4 h-4 bg-pink-400 rounded-full opacity-70 animate-bounce"
											style={{ animationDelay: "4s" }}
										></div>
									</div>
								</div>
							</div>

							{/* Bottom highlight bar */}
							<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-3xl"></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Success;
