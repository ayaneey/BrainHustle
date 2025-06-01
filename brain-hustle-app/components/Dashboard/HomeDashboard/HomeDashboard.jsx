"use client";

import React, { useState, useEffect } from "react";
import {
	Calendar,
	Star,
	BookOpen,
	Clock,
	TrendingUp,
	Award,
	ChevronRight,
} from "lucide-react";
import CalendarComponent from "../Sidebar/CalendarComponent";
import AffirmationQuote from "../Sidebar/Affirmations";
// import UpcomingQuizzes from "../UpcomingQuizzes/UpcomingQuizzes";

const HomeDashboard = () => {
	const [stats] = useState({
		totalQuizzes: 24,
		averageScore: 87,
		streak: 12,
		improvement: 15,
	});

	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	return (
		<div
			className={`min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-3 sm-phone:p-4 md-phone:p-6 transition-all duration-1000 ${
				isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
			}`}
		>
			<div className="max-w-7xl mx-auto space-y-4 sm-phone:space-y-6 md-phone:space-y-8">
				{/* Enhanced Dashboard Overview */}
				<div
					className="animate-fade-in-up bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl sm-phone:rounded-2xl p-6 sm-phone:p-8 shadow-2xl text-white relative overflow-hidden"
					style={{ animationDelay: "0.1s" }}
				>
					{/* Background decoration */}
					<div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
					<div className="absolute top-4 right-4 w-24 h-24 sm-phone:w-32 sm-phone:h-32 bg-white/5 rounded-full blur-2xl"></div>
					<div className="absolute bottom-4 left-4 w-16 h-16 sm-phone:w-24 sm-phone:h-24 bg-white/5 rounded-full blur-xl"></div>

					<div className="relative z-10">
						<div className="flex items-center justify-between mb-4 sm-phone:mb-6">
							<div>
								<h2 className="text-xl sm-phone:text-2xl md-phone:text-3xl font-bold mb-1 sm-phone:mb-2">
									Dashboard Overview
								</h2>
								<p className="text-xs sm-phone:text-sm md-phone:text-base text-blue-100">
									Your daily dashboard is ready. Stay consistent, stay sharp!
								</p>
							</div>
							<div className="w-12 h-12 sm-phone:w-16 sm-phone:h-16 bg-white/20 backdrop-blur-sm rounded-xl sm-phone:rounded-2xl flex items-center justify-center">
								<TrendingUp className="w-6 h-6 sm-phone:w-8 sm-phone:h-8 text-white" />
							</div>
						</div>

						<div className="grid grid-cols-2 sm-tablet:grid-cols-4 gap-3 sm-phone:gap-4">
							<div className="bg-white/10 backdrop-blur-sm rounded-lg sm-phone:rounded-xl p-3 sm-phone:p-4 hover:bg-white/20 transition-all duration-200 hover:scale-105">
								<div className="flex items-center gap-2 sm-phone:gap-3">
									<BookOpen className="w-6 h-6 sm-phone:w-8 sm-phone:h-8 text-blue-200" />
									<div>
										<p className="text-lg sm-phone:text-xl md-phone:text-2xl font-bold">
											{stats.totalQuizzes}
										</p>
										<p className="text-xs sm-phone:text-sm text-blue-200">
											Total Quizzes
										</p>
									</div>
								</div>
							</div>

							<div className="bg-white/10 backdrop-blur-sm rounded-lg sm-phone:rounded-xl p-3 sm-phone:p-4 hover:bg-white/20 transition-all duration-200 hover:scale-105">
								<div className="flex items-center gap-2 sm-phone:gap-3">
									<Award className="w-6 h-6 sm-phone:w-8 sm-phone:h-8 text-yellow-300" />
									<div>
										<p className="text-lg sm-phone:text-xl md-phone:text-2xl font-bold">
											{stats.averageScore}%
										</p>
										<p className="text-xs sm-phone:text-sm text-blue-200">
											Avg Score
										</p>
									</div>
								</div>
							</div>

							<div className="bg-white/10 backdrop-blur-sm rounded-lg sm-phone:rounded-xl p-3 sm-phone:p-4 hover:bg-white/20 transition-all duration-200 hover:scale-105">
								<div className="flex items-center gap-2 sm-phone:gap-3">
									<Star className="w-6 h-6 sm-phone:w-8 sm-phone:h-8 text-green-300" />
									<div>
										<p className="text-lg sm-phone:text-xl md-phone:text-2xl font-bold">
											{stats.streak}
										</p>
										<p className="text-xs sm-phone:text-sm text-blue-200">
											Day Streak
										</p>
									</div>
								</div>
							</div>

							<div className="bg-white/10 backdrop-blur-sm rounded-lg sm-phone:rounded-xl p-3 sm-phone:p-4 hover:bg-white/20 transition-all duration-200 hover:scale-105">
								<div className="flex items-center gap-2 sm-phone:gap-3">
									<TrendingUp className="w-6 h-6 sm-phone:w-8 sm-phone:h-8 text-pink-300" />
									<div>
										<p className="text-lg sm-phone:text-xl md-phone:text-2xl font-bold">
											+{stats.improvement}%
										</p>
										<p className="text-xs sm-phone:text-sm text-blue-200">
											Improvement
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Widgets Grid */}
				<div className="grid grid-cols-1 sm-tablet:grid-cols-2 2xl-tablet:grid-cols-3 gap-4 sm-phone:gap-6 md-phone:gap-8">
					<div
						className="animate-fade-in-up"
						style={{ animationDelay: "0.2s" }}
					>
						<CalendarComponent />
					</div>

					<div
						className="animate-fade-in-up"
						style={{ animationDelay: "0.3s" }}
					>
						<AffirmationQuote />
					</div>
				</div>
			</div>

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
					animation: fade-in-up 0.6s ease-out forwards;
					opacity: 0;
				}
			`}</style>
		</div>
	);
};

export default HomeDashboard;
