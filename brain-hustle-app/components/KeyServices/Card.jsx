"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Enhanced Card component with same props structure
function Card({ imgSrc, title, description, index = 0 }) {
	const [isVisible, setIsVisible] = useState(false);
	const [hasAnimated, setHasAnimated] = useState(false);

	useEffect(() => {
		// Small delay to prevent initial flicker
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 100 + index * 100);

		return () => clearTimeout(timer);
	}, [index]);

	useEffect(() => {
		if (isVisible) {
			const animationTimer = setTimeout(() => {
				setHasAnimated(true);
			}, 800 + index * 200);

			return () => clearTimeout(animationTimer);
		}
	}, [isVisible, index]);

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
						transform: translateY(-6px);
					}
				}

				.animate-fade-in-up {
					animation: fade-in-up 0.6s ease-out forwards;
				}

				.card-initial {
					opacity: 0.3;
					transform: translateY(20px);
				}

				.card-visible {
					opacity: 1;
					transform: translateY(0);
					transition: all 0.6s ease-out;
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
					transition: left 0.6s ease;
					z-index: 1;
				}

				.card-hover:hover::before {
					left: 100%;
				}

				.card-hover:hover {
					transform: translateY(-8px);
					box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15),
						0 0 0 1px rgba(59, 130, 246, 0.1);
				}

				.image-container {
					position: relative;
					overflow: hidden;
					border-radius: 16px;
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					padding: 12px;
					transition: all 0.3s ease;
				}

				.card-hover:hover .image-container {
					background: linear-gradient(135deg, #667eea 20%, #764ba2 80%);
					transform: scale(1.05);
				}

				.floating-icon {
					animation: float 3s ease-in-out infinite;
					filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
					transition: all 0.3s ease;
				}

				.card-hover:hover .floating-icon {
					animation-duration: 1.5s;
					transform: scale(1.1);
				}

				.gradient-text {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
				}

				.content-slide {
					transition: transform 0.4s ease, opacity 0.4s ease;
					position: relative;
					z-index: 2;
				}

				.card-hover:hover .content-slide {
					transform: translateX(8px);
				}

				.learn-more {
					opacity: 0;
					transform: translateY(20px);
					transition: all 0.4s ease;
				}

				.card-hover:hover .learn-more {
					opacity: 1;
					transform: translateY(0);
				}
			`}</style>

			<div
				id={`card-${index}`}
				className={`card-hover flex bg-white w-full sm-phone:w-full md-phone:w-full lg-phone:w-full xl-phone:w-full 2xl-phone:w-full sm-tablet:w-full md-tablet:w-[48%] lg-tablet:w-[48%] xl-tablet:w-[47%] 2xl-tablet:w-[47%] md-laptop:w-[45%] gap-3 sm-phone:gap-4 md-phone:gap-6 lg-phone:gap-6 xl-phone:gap-8 2xl-phone:gap-8 sm-tablet:gap-6 md-tablet:gap-6 lg-tablet:gap-6 xl-tablet:gap-8 2xl-tablet:gap-10 md-laptop:gap-10 p-4 sm-phone:p-6 md-phone:p-8 lg-phone:p-8 xl-phone:p-10 2xl-phone:p-10 sm-tablet:p-8 md-tablet:p-8 lg-tablet:p-6 xl-tablet:p-8 2xl-tablet:p-10 md-laptop:p-12 rounded-2xl border border-gray-100 shadow-lg group ${
					isVisible ? "card-visible" : "card-initial"
				}`}
				style={{
					transitionDelay: `${index * 150}ms`,
				}}
			>
				{/* Enhanced Image Container */}
				<div className="flex-shrink-0">
					<div className="image-container">
						<Image
							src={imgSrc}
							alt={title}
							width={100}
							height={100}
							className="floating-icon w-12 h-12 sm-phone:w-14 sm-phone:h-14 md-phone:w-16 md-phone:h-16 lg-phone:w-18 lg-phone:h-18 xl-phone:w-20 xl-phone:h-20 2xl-phone:w-22 2xl-phone:h-22 sm-tablet:w-18 sm-tablet:h-18 md-tablet:w-20 md-tablet:h-20 lg-tablet:w-16 lg-tablet:h-16 xl-tablet:w-18 xl-tablet:h-18 2xl-tablet:w-20 2xl-tablet:h-20 md-laptop:w-24 md-laptop:h-24 filter brightness-0 invert"
						/>

						{/* Floating decorative elements */}
						<div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"></div>
						<div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"></div>
					</div>
				</div>

				{/* Enhanced Content Container */}
				<div className="flex-1 content-slide">
					<h1 className="text-sm sm-phone:text-base md-phone:text-lg lg-phone:text-lg xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-lg md-tablet:text-lg lg-tablet:text-base xl-tablet:text-lg 2xl-tablet:text-xl md-laptop:text-xl font-bold text-gray-900 mb-2 sm-phone:mb-2 md-phone:mb-3 lg-phone:mb-3 xl-phone:mb-4 2xl-phone:mb-4 sm-tablet:mb-3 md-tablet:mb-3 lg-tablet:mb-2 xl-tablet:mb-3 2xl-tablet:mb-4 md-laptop:mb-4 group-hover:gradient-text transition-all duration-300">
						{title}
					</h1>

					<p className="text-black/70 text-xs sm-phone:text-sm md-phone:text-sm lg-phone:text-sm xl-phone:text-base 2xl-phone:text-base sm-tablet:text-sm md-tablet:text-sm lg-tablet:text-xs xl-tablet:text-sm 2xl-tablet:text-base md-laptop:text-base leading-relaxed mb-2 sm-phone:mb-3 md-phone:mb-3 lg-phone:mb-3 xl-phone:mb-4 2xl-phone:mb-4 sm-tablet:mb-3 md-tablet:mb-3 lg-tablet:mb-2 xl-tablet:mb-3 2xl-tablet:mb-4 md-laptop:mb-4 group-hover:text-black/80 transition-colors duration-300">
						{description}
					</p>

					{/* Learn More Button */}
					<div className="learn-more">
						<div className="inline-flex items-center text-blue-600 font-medium text-sm sm-phone:text-base group-hover:text-blue-700 transition-colors">
							<span>Explore feature</span>
							<svg
								className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 7l5 5m0 0l-5 5m5-5H6"
								/>
							</svg>
						</div>
					</div>
				</div>

				{/* Corner accent */}
				<div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-400/10 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
			</div>
		</>
	);
}

export default Card;

// Same keyServicesCardData array - unchanged
export const keyServicesCardData = [
	{
		id: 1,
		title: " Engaging Lessons",
		description:
			"Engaging lessons with animations, videos, and quizzes make learning fun!",
		imgSrc: "/images/lessons.svg",
	},
	{
		id: 2,
		title: " Personalised Study ",
		description:
			"Customised plans for your pace and style, paving your path to exam success",
		imgSrc: "/images/journey.svg",
	},
	{
		id: 3,
		title: "Targeted Focus",
		description:
			"Master your GCSE subjects with laser-focused resources tailored for exam success.",
		imgSrc: "/images/target.svg",
	},
	{
		id: 4,
		title: "Progress Tracking",
		description: "Track your journey, see strengths and areas to improve.",
		imgSrc: "/images/progress.svg",
	},
];
