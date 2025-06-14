import React, { useState, useEffect } from "react";
import {
	FaPlay,
	FaUsers,
	FaTrophy,
	FaGraduationCap,
	FaStar,
	FaTimes,
} from "react-icons/fa";

function Hero() {
	const [isVisible, setIsVisible] = useState(false);
	const [showVideo, setShowVideo] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	const stats = [
		{ number: "10K+", label: "Students", icon: FaUsers },
		{ number: "95%", label: "Success Rate", icon: FaTrophy },
		{ number: "10+", label: "Subjects", icon: FaGraduationCap },
		{ number: "4.9/5", label: "Rating", icon: FaStar },
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
						box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
					}
					50% {
						box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
					}
				}

				.animate-fade-in-up {
					animation: fade-in-up 0.8s ease-out forwards;
				}

				.animate-float {
					animation: float 3s ease-in-out infinite;
				}

				.animate-pulse-glow {
					animation: pulse-glow 2s ease-in-out infinite;
				}

				.gradient-text {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
				}

				.hero-bg {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
					background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
						repeat;
				}
			`}</style>

			<div className="hero-bg text-white py-16 px-4 sm-phone:px-6 lg-tablet:px-8 mt-16">
				<div className="max-w-7xl mx-auto">
					<div className="flex flex-col lg-tablet:flex-row items-center gap-8 lg-tablet:gap-12">
						{/* Content Container */}
						<div
							className={`flex-1 text-center lg-tablet:text-left ${
								isVisible ? "animate-fade-in-up" : "opacity-0"
							}`}
						>
							<h1 className="text-2xl sm-phone:text-3xl md-phone:text-4xl lg-phone:text-4xl xl-phone:text-5xl 2xl-phone:text-5xl sm-tablet:text-6xl md-tablet:text-6xl lg-tablet:text-5xl xl-tablet:text-6xl 2xl-tablet:text-7xl md-laptop:text-7xl font-bold leading-tight mb-4 sm-phone:mb-6">
								<span className="block mb-1 sm-phone:mb-2">Hustle Hard,</span>
								<span className="block">Excel Harder!</span>
							</h1>

							<p className="text-sm sm-phone:text-base md-phone:text-lg lg-phone:text-lg xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-xl md-tablet:text-xl lg-tablet:text-lg xl-tablet:text-xl 2xl-tablet:text-xl text-blue-100 mb-6 sm-phone:mb-8 max-w-2xl mx-auto lg-tablet:mx-0 leading-relaxed">
								Conquer GCSEs with Brain Hustle! Tailored Maths and English
								resources, interactive lessons, practice exams, and personalised
								study plans. Ace your exams - learn with success!
							</p>

							<div className="flex flex-col sm-tablet:flex-row gap-3 sm-phone:gap-4 justify-center lg-tablet:justify-start">
								<button className="px-4 py-2 sm-phone:px-6 sm-phone:py-3 md-phone:px-8 md-phone:py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-xl animate-pulse-glow text-xs sm-phone:text-sm md-phone:text-base">
									Get in Touch
								</button>
								<button
									className="px-4 py-2 sm-phone:px-6 sm-phone:py-3 md-phone:px-8 md-phone:py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm-phone:text-sm md-phone:text-base"
									onClick={() => setShowVideo(true)}
								>
									<FaPlay className="text-xs sm-phone:text-sm" />
									Watch Demo
								</button>
							</div>
						</div>

						{/* Enhanced 3D Character Illustration */}
						<div
							className={`flex-1 relative ${
								isVisible ? "animate-fade-in-up" : "opacity-0"
							}`}
							style={{ animationDelay: "300ms" }}
						>
							<div className="relative animate-float">
								<div className="w-48 h-48 sm-phone:w-56 sm-phone:h-56 md-phone:w-64 md-phone:h-64 lg-phone:w-72 lg-phone:h-72 xl-phone:w-80 xl-phone:h-80 2xl-phone:w-80 2xl-phone:h-80 sm-tablet:w-96 sm-tablet:h-96 md-tablet:w-96 md-tablet:h-96 lg-tablet:w-72 lg-tablet:h-72 xl-tablet:w-96 xl-tablet:h-96 mx-auto relative">
									{/* Main Character Circle */}
									<div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full animate-pulse"></div>

									{/* Desk */}
									<div className="absolute bottom-12 sm-phone:bottom-16 lg-phone:bottom-20 left-1/2 transform -translate-x-1/2 w-24 h-12 sm-phone:w-32 sm-phone:h-16 lg-phone:w-40 lg-phone:h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg shadow-xl"></div>

									{/* Laptop */}
									<div className="absolute bottom-14 sm-phone:bottom-18 lg-phone:bottom-24 left-1/2 transform -translate-x-1/2 w-16 h-10 sm-phone:w-20 sm-phone:h-12 lg-phone:w-24 lg-phone:h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg">
										<div className="w-12 h-7 sm-phone:w-16 sm-phone:h-9 lg-phone:w-20 lg-phone:h-12 bg-blue-400 rounded-sm mt-1 sm-phone:mt-1.5 lg-phone:mt-2 mx-auto"></div>
									</div>

									{/* Student Character */}
									<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
										<div className="w-16 h-16 sm-phone:w-20 sm-phone:h-20 md-phone:w-24 md-phone:h-24 lg-phone:w-24 lg-phone:h-24 xl-phone:w-32 xl-phone:h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-lg sm-phone:text-xl md-phone:text-2xl lg-phone:text-2xl xl-phone:text-4xl shadow-xl">
											👨‍💻
										</div>
									</div>

									{/* Floating Elements */}
									<div
										className="absolute top-2 sm-phone:top-4 right-2 sm-phone:right-4 w-8 h-8 sm-phone:w-12 sm-phone:h-12 lg-phone:w-16 lg-phone:h-16 bg-white rounded-lg shadow-lg flex items-center justify-center animate-float text-sm sm-phone:text-lg lg-phone:text-2xl"
										style={{ animationDelay: "0.5s" }}
									>
										📚
									</div>
									<div
										className="absolute bottom-4 sm-phone:bottom-8 left-2 sm-phone:left-4 w-6 h-6 sm-phone:w-10 sm-phone:h-10 lg-phone:w-12 lg-phone:h-12 bg-green-500 rounded-full shadow-lg flex items-center justify-center animate-float text-white text-xs sm-phone:text-sm lg-phone:text-base"
										style={{ animationDelay: "1s" }}
									>
										✓
									</div>
									<div
										className="absolute top-8 sm-phone:top-16 left-4 sm-phone:left-8 w-8 h-8 sm-phone:w-12 sm-phone:h-12 lg-phone:w-14 lg-phone:h-14 bg-purple-500 rounded-lg shadow-lg flex items-center justify-center animate-float text-sm sm-phone:text-lg lg-phone:text-xl"
										style={{ animationDelay: "1.5s" }}
									>
										🎯
									</div>
									<div
										className="absolute top-16 sm-phone:top-32 right-6 sm-phone:right-12 w-6 h-6 sm-phone:w-10 sm-phone:h-10 lg-phone:w-12 lg-phone:h-12 bg-pink-500 rounded-full shadow-lg flex items-center justify-center animate-float text-xs sm-phone:text-sm lg-phone:text-base"
										style={{ animationDelay: "2s" }}
									>
										💡
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Stats Section */}
					<div
						className={`grid grid-cols-2 md-tablet:grid-cols-4 gap-3 sm-phone:gap-4 md-phone:gap-6 sm-tablet:gap-8 mt-8 sm-phone:mt-12 md-phone:mt-16 ${
							isVisible ? "animate-fade-in-up" : "opacity-0"
						}`}
						style={{ animationDelay: "600ms" }}
					>
						{stats.map((stat, index) => (
							<div
								key={index}
								className="text-center group cursor-pointer"
								style={{ animationDelay: `${800 + index * 100}ms` }}
							>
								<div className="flex justify-center mb-1 sm-phone:mb-2">
									<stat.icon className="text-sm sm-phone:text-lg md-phone:text-xl sm-tablet:text-2xl text-blue-200 group-hover:text-white transition-colors duration-300" />
								</div>
								<div className="text-lg sm-phone:text-xl md-phone:text-2xl sm-tablet:text-3xl font-bold mb-0.5 sm-phone:mb-1 group-hover:scale-110 transition-transform duration-300">
									{stat.number}
								</div>
								<div className="text-blue-200 text-xs sm-phone:text-sm group-hover:text-white transition-colors duration-300">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Video Modal */}
			{showVideo && (
				<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
					<div className="bg-white p-4 rounded-lg max-w-4xl w-full mx-4">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-bold text-gray-800">Demo Video</h2>
							<button
								onClick={() => setShowVideo(false)}
								className="text-gray-500 hover:text-gray-700 text-2xl"
							>
								✕
							</button>
						</div>
						<video controls className="w-full">
							<source src="/videos/Brain-Hustle.mp4" type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					</div>
				</div>
			)}
		</>
	);
}

export default Hero;
