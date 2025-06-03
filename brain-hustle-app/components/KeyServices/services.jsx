"use client";

import React from "react";
import Card from "./Card";
import Link from "next/link";
import { keyServicesCardData } from "./Card";

export default function services() {
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

				.animate-fade-in-up {
					animation: fade-in-up 0.8s ease-out forwards;
				}

				.section-bg {
					background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
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
					background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
						repeat;
				}
			`}</style>

			<div className="section-bg py-12 sm-phone:py-16 md-phone:py-20 lg-phone:py-20 xl-phone:py-24 sm-tablet:py-16 md-tablet:py-20 lg-tablet:py-16 xl-tablet:py-20 2xl-tablet:py-24 md-laptop:py-28">
				<div className="max-w-7xl mx-auto px-4 sm-phone:px-6 lg-tablet:px-8 relative z-10">
					{/* Section Header */}
					<div className="text-center mb-10 sm-phone:mb-12 md-phone:mb-16 lg-phone:mb-16 xl-phone:mb-20 sm-tablet:mb-12 md-tablet:mb-16 lg-tablet:mb-12 xl-tablet:mb-16 2xl-tablet:mb-20 md-laptop:mb-24">
						<h2 className="text-2xl sm-phone:text-3xl md-phone:text-4xl lg-phone:text-4xl xl-phone:text-5xl 2xl-phone:text-5xl sm-tablet:text-4xl md-tablet:text-5xl lg-tablet:text-3xl xl-tablet:text-4xl 2xl-tablet:text-5xl md-laptop:text-6xl font-bold text-gray-900 mb-4 sm-phone:mb-6 animate-fade-in-up">
							Your journey to success begins with us.
						</h2>
						<p
							className="text-base sm-phone:text-lg md-phone:text-xl lg-phone:text-xl xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-lg md-tablet:text-xl lg-tablet:text-base xl-tablet:text-lg 2xl-tablet:text-xl md-laptop:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
							style={{ animationDelay: "200ms" }}
						>
							Discover powerful features designed to accelerate your learning
							journey and academic success.
						</p>
					</div>

					{/* Cards Container - Enhanced version of your original structure */}
					<div className="w-full flex justify-center">
						<div className="w-full max-w-7xl flex flex-wrap justify-center gap-4 sm-phone:gap-5 md-phone:gap-6 lg-phone:gap-6 xl-phone:gap-8 2xl-phone:gap-8 sm-tablet:gap-6 md-tablet:gap-6 lg-tablet:gap-6 xl-tablet:gap-8 2xl-tablet:gap-10 md-laptop:gap-12 p-2 sm-phone:p-3 md-phone:p-4 lg-phone:p-4 xl-phone:p-6 2xl-phone:p-6 sm-tablet:p-4 md-tablet:p-4 lg-tablet:p-4 xl-tablet:p-6 2xl-tablet:p-8 md-laptop:p-8">
							{keyServicesCardData.map((service, index) => (
								<Card
									key={service.id}
									title={service.title}
									description={service.description}
									imgSrc={service.imgSrc}
									index={index}
								/>
							))}
						</div>
					</div>

					{/* CTA Button */}

					<div className="text-center mt-10 sm-phone:mt-12 md-phone:mt-16 lg-phone:mt-16 xl-phone:mt-20 sm-tablet:mt-12 md-tablet:mt-16 lg-tablet:mt-12 xl-tablet:mt-16 2xl-tablet:mt-20 md-laptop:mt-24">
						<Link
							href="/sign-in"
							className="inline-block px-6 py-3 sm-phone:px-8 sm-phone:py-4 md-phone:px-10 md-phone:py-5 bg-blue-600 text-white rounded-full font-semibold text-sm sm-phone:text-base md-phone:text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-fade-in-up"
							style={{ animationDelay: "800ms" }}
						>
							Try for yourself
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
