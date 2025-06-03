"use client";
import React, { useState, useEffect } from "react";
import Button from "../../app/common/components/Button";
import { Card, CardFooter, Image } from "@nextui-org/react";

function Product() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsVisible(true);
					}
				});
			},
			{ threshold: 0.1 }
		);

		const element = document.getElementById("product-section");
		if (element) {
			observer.observe(element);
		}

		return () => observer.disconnect();
	}, []);

	const list = [
		{
			svg: "images/book2.svg",
			title: "Interactive Learning",
			text: "Dive into engaging lessons and interactive quizzes",
		},
		{
			svg: "images/expert.svg",
			title: "Exam Mastery",
			text: "Ace your exams with our comprehensive exam prep",
		},
		{
			svg: "images/handshake.svg",
			title: "Community Support",
			text: "Join a vibrant community of students and teachers",
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

				@keyframes card-hover {
					0%,
					100% {
						transform: translateY(0px);
						box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
					}
					50% {
						transform: translateY(-8px);
						box-shadow: 0 15px 30px rgba(59, 130, 246, 0.15);
					}
				}

				.animate-fade-in-up {
					animation: fade-in-up 0.8s ease-out forwards;
				}

				.product-card {
					transition: transform 0.3s ease, box-shadow 0.3s ease;
					cursor: pointer;
				}

				.product-card:hover {
					transform: translateY(-8px);
					box-shadow: 0 15px 30px rgba(59, 130, 246, 0.15);
				}

				.section-bg {
					background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
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
					background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.03'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
						repeat;
				}

				.icon-glow {
					transition: transform 0.3s ease, filter 0.3s ease;
				}

				.product-card:hover .icon-glow {
					transform: scale(1.05);
					filter: drop-shadow(0 8px 20px rgba(59, 130, 246, 0.3));
				}

				.gradient-border {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					padding: 2px;
					border-radius: 16px;
				}

				.card-inner {
					background: white;
					border-radius: 14px;
					height: 100%;
				}
			`}</style>

			<div
				id="product-section"
				className="section-bg py-12 sm-phone:py-16 md-phone:py-20 lg-phone:py-20 xl-phone:py-24 sm-tablet:py-16 md-tablet:py-20 lg-tablet:py-16 xl-tablet:py-20 2xl-tablet:py-24 md-laptop:py-28"
			>
				<div className="max-w-7xl mx-auto px-4 sm-phone:px-6 lg-tablet:px-8 relative z-10">
					{/* Section Header */}
					<div
						className={`text-center mb-10 sm-phone:mb-12 md-phone:mb-16 lg-phone:mb-16 xl-phone:mb-20 sm-tablet:mb-12 md-tablet:mb-16 lg-tablet:mb-12 xl-tablet:mb-16 2xl-tablet:mb-20 md-laptop:mb-24 ${
							isVisible ? "animate-fade-in-up" : "opacity-0"
						}`}
					>
						<h1 className="text-2xl sm-phone:text-3xl md-phone:text-4xl lg-phone:text-4xl xl-phone:text-5xl 2xl-phone:text-5xl sm-tablet:text-4xl md-tablet:text-5xl lg-tablet:text-3xl xl-tablet:text-4xl 2xl-tablet:text-5xl md-laptop:text-6xl font-bold text-gray-900 mb-4 sm-phone:mb-6">
							Your journey to success begins with us.
						</h1>
						<p className="text-base sm-phone:text-lg md-phone:text-xl lg-phone:text-xl xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-lg md-tablet:text-xl lg-tablet:text-base xl-tablet:text-lg 2xl-tablet:text-xl md-laptop:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Experience our comprehensive learning platform designed for your
							academic excellence.
						</p>
					</div>

					{/* Cards Grid */}
					<div
						className={`flex justify-center mb-12 sm-phone:mb-16 md-phone:mb-20 lg-phone:mb-20 xl-phone:mb-24 sm-tablet:mb-16 md-tablet:mb-20 lg-tablet:mb-16 xl-tablet:mb-20 2xl-tablet:mb-24 md-laptop:mb-28 ${
							isVisible ? "animate-fade-in-up" : "opacity-0"
						}`}
						style={{ animationDelay: "300ms" }}
					>
						<div className="gap-6 sm-phone:gap-8 md-phone:gap-10 lg-phone:gap-10 xl-phone:gap-12 sm-tablet:gap-8 md-tablet:gap-10 lg-tablet:gap-8 xl-tablet:gap-10 2xl-tablet:gap-12 md-laptop:gap-12 grid grid-cols-1 sm-tablet:grid-cols-2 lg-tablet:grid-cols-3 max-w-6xl">
							{list.map((item, index) => (
								<div
									key={index}
									className={`gradient-border product-card ${
										isVisible ? "animate-fade-in-up" : "opacity-0"
									}`}
									style={{ animationDelay: `${400 + index * 200}ms` }}
									onClick={() => console.log("item pressed")}
								>
									<div className="card-inner">
										<Card
											shadow="none"
											isPressable={false}
											className="border-none bg-transparent h-full"
										>
											<CardFooter className="p-6 sm-phone:p-8 md-phone:p-10 lg-phone:p-10 xl-phone:p-12 sm-tablet:p-8 md-tablet:p-10 lg-tablet:p-8 xl-tablet:p-10 2xl-tablet:p-12 md-laptop:p-12 flex-col items-center text-center space-y-4 sm-phone:space-y-6 group">
												{/* Icon */}
												<div className="relative">
													<img
														src={item.svg}
														className="icon-glow block w-12 h-12 sm-phone:w-16 sm-phone:h-16 md-phone:w-20 md-phone:h-20 lg-phone:w-24 lg-phone:h-24 xl-phone:w-28 xl-phone:h-28 2xl-phone:w-32 2xl-phone:h-32 sm-tablet:w-20 sm-tablet:h-20 md-tablet:w-24 md-tablet:h-24 lg-tablet:w-20 lg-tablet:h-20 xl-tablet:w-24 xl-tablet:h-24 2xl-tablet:w-28 2xl-tablet:h-28 md-laptop:w-32 md-laptop:h-32 mx-auto"
														alt="Product icon"
													/>
												</div>

												{/* Content */}
												<div className="space-y-2 sm-phone:space-y-3 md-phone:space-y-4">
													<h1 className="text-base sm-phone:text-lg md-phone:text-xl lg-phone:text-xl xl-phone:text-2xl 2xl-phone:text-2xl sm-tablet:text-lg md-tablet:text-xl lg-tablet:text-base xl-tablet:text-lg 2xl-tablet:text-2xl md-laptop:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
														{item.title}
													</h1>
													<p className="text-xs sm-phone:text-sm md-phone:text-base lg-phone:text-base xl-phone:text-lg 2xl-phone:text-lg sm-tablet:text-sm md-tablet:text-base lg-tablet:text-sm xl-tablet:text-base 2xl-tablet:text-lg md-laptop:text-lg text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
														{item.text}
													</p>
												</div>

												{/* Hover Effect */}
												<div className="opacity-0 group-hover:opacity-100 transition-all duration-300 pt-2">
													<div className="flex items-center justify-center text-blue-600 font-medium text-sm sm-phone:text-base">
														<span>Learn more</span>
														<svg
															className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M9 5l7 7-7 7"
															/>
														</svg>
													</div>
												</div>
											</CardFooter>
										</Card>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* CTA Button */}
					{/* <div
						className={`text-center ${
							isVisible ? "animate-fade-in-up" : "opacity-0"
						}`}
						style={{ animationDelay: "1000ms" }}
					>
						<Button title="Try for yourself" />
					</div> */}
				</div>
			</div>
		</>
	);
}

export default Product;
