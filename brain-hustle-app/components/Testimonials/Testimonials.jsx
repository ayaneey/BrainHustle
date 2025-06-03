"use client";

import { FaStar, FaRegStar } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Testimonials() {
	const [isVisible, setIsVisible] = useState(false);

	const testimonialData = [
		{
			id: 1,
			text: "The engaging lessons with animations, videos, and quizzes made studying enjoyable! It's a fantastic way to learn complex topics. Highly recommended!",
			author: "Emily Ewing",
			role: "High School Student",
			image: "./images/coverstudent1.svg",
			rating: 5,
		},
		{
			id: 2,
			text: "The personalised study plans allowed me to learn at my own pace. The customized approach and tailored resources were key to my exam success.",
			author: "James Powell",
			role: "College Student",
			image: "./images/student2.svg",
			rating: 4,
		},
		{
			id: 3,
			text: "The targeted focus on GCSE subjects provided exactly what I needed to excel in my exams. The resources were comprehensive, and the progress tracking feature kept me on the right path.",
			author: "Olivia Gribben",
			role: "High School Student",
			image: "./images/student3.svg",
			rating: 5,
		},
	];

	useEffect(() => {
		// Preload images
		testimonialData.forEach((testimonial) => {
			const img = new Image();
			img.src = testimonial.image;
		});

		// Trigger visibility animation
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 200);

		return () => clearTimeout(timer);
	}, []);

	const settings = {
		dots: true,
		infinite: true,
		speed: 600,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
		pauseOnHover: true,
		cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
		customPaging: function (i) {
			return (
				<div className="custom-dot w-3 h-3 rounded-full bg-gray-300 hover:bg-blue-500 transition-all duration-300"></div>
			);
		},
		dotsClass: "slick-dots custom-dots",
	};

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

				@keyframes pulse-glow {
					0%,
					100% {
						box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
					}
					50% {
						box-shadow: 0 0 40px rgba(59, 130, 246, 0.2);
					}
				}

				@keyframes float {
					0%,
					100% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-8px);
					}
				}

				.animate-fade-in-up {
					animation: fade-in-up 0.8s ease-out forwards;
				}

				.testimonial-card {
					background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
					position: relative;
					overflow: hidden;
					transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
				}

				.testimonial-card::before {
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
						repeat;
				}

				.testimonial-card:hover {
					transform: translateY(-8px);
					animation: pulse-glow 2s ease-in-out infinite;
				}

				.quote-icon {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
					animation: float 4s ease-in-out infinite;
				}

				.profile-image {
					transition: all 0.3s ease;
					position: relative;
				}

				.profile-image::before {
					content: "";
					position: absolute;
					inset: -2px;
					background: linear-gradient(135deg, #667eea, #764ba2);
					border-radius: 50%;
					z-index: -1;
					opacity: 0;
					transition: opacity 0.3s ease;
				}

				.testimonial-card:hover .profile-image::before {
					opacity: 1;
				}

				.testimonial-card:hover .profile-image {
					transform: scale(1.1);
				}

				.star-rating {
					filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
				}

				.gradient-text {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
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
					background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.03'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
						repeat;
				}

				/* Custom Slider Dots */
				.custom-dots {
					bottom: -50px !important;
					display: flex !important;
					justify-content: center;
					gap: 12px;
				}

				.custom-dots li {
					margin: 0 !important;
				}

				.custom-dots li.slick-active .custom-dot {
					background: #3b82f6 !important;
					transform: scale(1.2);
				}

				.custom-dot {
					cursor: pointer;
					transition: all 0.3s ease;
				}

				/* Hide default slider arrows */
				.slick-prev,
				.slick-next {
					display: none !important;
				}
			`}</style>

			<div className="section-bg py-12 sm-phone:py-16 md-phone:py-20 lg-phone:py-20 xl-phone:py-24 sm-tablet:py-16 md-tablet:py-20 lg-tablet:py-16 xl-tablet:py-20 2xl-tablet:py-24 md-laptop:py-28">
				<div className="max-w-7xl mx-auto px-4 sm-phone:px-6 lg-tablet:px-8 relative z-10">
					{/* Section Header */}
					<div
						className={`text-center mb-12 sm-phone:mb-16 md-phone:mb-20 lg-phone:mb-20 xl-phone:mb-24 sm-tablet:mb-16 md-tablet:mb-20 lg-tablet:mb-16 xl-tablet:mb-20 2xl-tablet:mb-24 md-laptop:mb-28 ${
							isVisible ? "animate-fade-in-up" : "opacity-0"
						}`}
					>
						<h1 className="text-2xl sm-phone:text-3xl md-phone:text-4xl lg-phone:text-4xl xl-phone:text-5xl 2xl-phone:text-5xl sm-tablet:text-4xl md-tablet:text-5xl lg-tablet:text-3xl xl-tablet:text-4xl 2xl-tablet:text-5xl md-laptop:text-6xl font-bold text-gray-900 mb-4 sm-phone:mb-6">
							Hear it from our students.
						</h1>
						<p className="text-base sm-phone:text-lg md-phone:text-xl lg-phone:text-xl xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-lg md-tablet:text-xl lg-tablet:text-base xl-tablet:text-lg 2xl-tablet:text-xl md-laptop:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Real stories from students who transformed their learning journey
							with Brain Hustle.
						</p>
					</div>

					{/* Testimonials Slider */}
					<div
						className={`max-w-4xl mx-auto ${
							isVisible ? "animate-fade-in-up" : "opacity-0"
						}`}
						style={{ animationDelay: "300ms" }}
					>
						<Slider {...settings}>
							{testimonialData.map((testimonial, index) => (
								<div
									key={testimonial.id}
									className="px-2 sm-phone:px-4 md-phone:px-6"
								>
									<div className="testimonial-card rounded-3xl p-6 sm-phone:p-8 md-phone:p-10 lg-phone:p-10 xl-phone:p-12 2xl-phone:p-12 sm-tablet:p-10 md-tablet:p-12 lg-tablet:p-10 xl-tablet:p-12 2xl-tablet:p-14 md-laptop:p-16 shadow-xl border border-gray-100 relative z-10">
										{/* Quote Icon */}
										<svg
											className="quote-icon w-12 h-12 sm-phone:w-14 sm-phone:h-14 md-phone:w-16 md-phone:h-16 lg-phone:w-16 lg-phone:h-16 xl-phone:w-18 xl-phone:h-18 2xl-phone:w-20 2xl-phone:h-20 sm-tablet:w-16 sm-tablet:h-16 md-tablet:w-18 md-tablet:h-18 lg-tablet:w-14 lg-tablet:h-14 xl-tablet:w-16 xl-tablet:h-16 2xl-tablet:w-18 2xl-tablet:h-18 md-laptop:w-20 md-laptop:h-20 mb-4 sm-phone:mb-6 md-phone:mb-8"
											viewBox="0 0 64 64"
											fill="currentColor"
										>
											<polygon points="2 36 17 2 26 2 15 36 26 36 26 62 2 62 2 36" />
											<polygon points="38 36 53 2 62 2 51 36 62 36 62 62 38 62 38 36" />
										</svg>

										{/* Testimonial Content */}
										<blockquote className="mb-6 sm-phone:mb-8 md-phone:mb-10 lg-phone:mb-10 xl-phone:mb-12">
											<p className="text-base sm-phone:text-lg md-phone:text-xl lg-phone:text-xl xl-phone:text-2xl 2xl-phone:text-2xl sm-tablet:text-lg md-tablet:text-xl lg-tablet:text-lg xl-tablet:text-xl 2xl-tablet:text-2xl md-laptop:text-2xl text-gray-700 leading-relaxed sm-phone:leading-relaxed md-phone:leading-relaxed lg-phone:leading-relaxed xl-phone:leading-relaxed font-medium mb-6 sm-phone:mb-8">
												"{testimonial.text}"
											</p>

											{/* Star Rating */}
											<div className="flex justify-center sm-tablet:justify-start mb-6 sm-phone:mb-8 star-rating">
												{Array.from({ length: 5 }).map((_, starIndex) => (
													<span
														key={starIndex}
														className={`text-lg sm-phone:text-xl md-phone:text-2xl lg-phone:text-2xl xl-phone:text-2xl transition-all duration-300 ${
															starIndex < testimonial.rating
																? "text-yellow-400"
																: "text-gray-300"
														}`}
														style={{ animationDelay: `${starIndex * 100}ms` }}
													>
														{starIndex < testimonial.rating ? (
															<FaStar />
														) : (
															<FaRegStar />
														)}
													</span>
												))}
											</div>
										</blockquote>

										{/* Author Information */}
										<footer className="flex flex-col sm-tablet:flex-row items-center sm-tablet:items-center justify-center sm-tablet:justify-start gap-4 sm-phone:gap-6">
											<figure className="profile-image" aria-hidden="true">
												<img
													className="w-16 h-16 sm-phone:w-18 sm-phone:h-18 md-phone:w-20 md-phone:h-20 lg-phone:w-20 lg-phone:h-20 xl-phone:w-22 xl-phone:h-22 2xl-phone:w-24 2xl-phone:h-24 sm-tablet:w-18 sm-tablet:h-18 md-tablet:w-20 md-tablet:h-20 lg-tablet:w-16 lg-tablet:h-16 xl-tablet:w-18 xl-tablet:h-18 2xl-tablet:w-20 2xl-tablet:h-20 md-laptop:w-24 md-laptop:h-24 rounded-full object-cover border-4 border-white shadow-lg"
													src={testimonial.image}
													alt={testimonial.author}
												/>
											</figure>

											<cite className="text-center sm-tablet:text-left">
												<strong className="block text-lg sm-phone:text-xl md-phone:text-2xl lg-phone:text-2xl xl-phone:text-2xl 2xl-phone:text-2xl sm-tablet:text-xl md-tablet:text-2xl lg-tablet:text-lg xl-tablet:text-xl 2xl-tablet:text-2xl md-laptop:text-2xl font-bold gradient-text not-italic">
													{testimonial.author}
												</strong>
												<span className="block text-sm sm-phone:text-base md-phone:text-lg lg-phone:text-lg xl-phone:text-lg 2xl-phone:text-lg sm-tablet:text-base md-tablet:text-lg lg-tablet:text-sm xl-tablet:text-base 2xl-tablet:text-lg md-laptop:text-lg text-gray-500 mt-1 sm-phone:mt-2 not-italic">
													{testimonial.role}
												</span>
											</cite>
										</footer>

										{/* Decorative Elements */}
										<div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-50"></div>
										<div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-50"></div>
									</div>
								</div>
							))}
						</Slider>
					</div>
				</div>
			</div>
		</>
	);
}

export default Testimonials;
