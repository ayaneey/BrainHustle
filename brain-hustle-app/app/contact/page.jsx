"use client";

import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import Link from "next/link";

export default function ContactPage() {
	const [isVisible, setIsVisible] = useState(false);
	const [state, handleSubmit] = useForm("xkgbgnzp");

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 200);
		return () => clearTimeout(timer);
	}, []);

	// Show success message if form was submitted successfully
	if (state.succeeded) {
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

					.success-bg {
						background: linear-gradient(
							135deg,
							#f0f9ff 0%,
							#e0e7ff 20%,
							#ddd6fe 40%,
							#e0e7ff 60%,
							#f0f9ff 100%
						);
					}

					.success-card {
						background: linear-gradient(
							135deg,
							#ffffff 0%,
							rgba(255, 255, 255, 0.95) 30%,
							rgba(248, 250, 252, 0.98) 70%,
							#ffffff 100%
						);
						border: 2px solid rgba(139, 92, 246, 0.2);
						box-shadow: 0 25px 50px rgba(139, 92, 246, 0.1);
					}

					.gradient-text {
						background: linear-gradient(
							135deg,
							#7c3aed 0%,
							#8b5cf6 50%,
							#a855f7 100%
						);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
						background-clip: text;
					}
				`}</style>

				<main className="bg-white text-gray-800 min-h-screen flex items-center justify-center">
					<div className="success-bg w-full min-h-screen flex items-center justify-center px-4">
						<div className="success-card p-8 rounded-3xl shadow-2xl max-w-md mx-auto text-center animate-fade-in-up">
							<div className="text-6xl mb-6">🎉</div>
							<h1 className="text-3xl font-bold gradient-text mb-4">
								Thank You!
							</h1>
							<p className="text-lg text-gray-600 mb-6">
								Your message has been sent successfully. We'll get back to you
								within 24 hours!
							</p>
							<Link href="/contact" passHref>
								<button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
									Send Another Message
								</button>
							</Link>
						</div>
					</div>
				</main>
			</>
		);
	}

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
						box-shadow: 0 0 20px rgba(205, 193, 255, 0.3);
					}
					50% {
						box-shadow: 0 0 40px rgba(205, 193, 255, 0.5);
					}
				}

				@keyframes gradient-shift {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				}

				.animate-fade-in-up {
					animation: fade-in-up 0.8s ease-out forwards;
				}

				.contact-form {
					background: linear-gradient(
						135deg,
						#ffffff 0%,
						rgba(205, 193, 255, 0.05) 30%,
						rgba(172, 209, 218, 0.08) 70%,
						#ffffff 100%
					);
					transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
					position: relative;
					overflow: hidden;
					border: 2px solid rgba(205, 193, 255, 0.1);
				}

				.contact-form::before {
					content: "";
					position: absolute;
					top: 0;
					left: -100%;
					width: 100%;
					height: 100%;
					background: linear-gradient(
						90deg,
						transparent,
						rgba(205, 193, 255, 0.1),
						transparent
					);
					transition: left 0.8s ease;
				}

				.contact-form:hover::before {
					left: 100%;
				}

				.contact-form:hover {
					transform: translateY(-6px);
					box-shadow: 0 25px 50px rgba(129, 85, 155, 0.15);
					border-color: rgba(205, 193, 255, 0.3);
				}

				.form-input {
					border: 2px solid rgba(172, 209, 218, 0.3);
					transition: all 0.3s ease;
					position: relative;
					background: rgba(255, 255, 255, 0.8);
				}

				.form-input:focus {
					border-color: #cdc1ff;
					box-shadow: 0 0 0 4px rgba(205, 193, 255, 0.1);
					outline: none;
					background: #ffffff;
				}

				.form-input:hover {
					border-color: rgba(129, 85, 155, 0.4);
				}

				.form-input.error {
					border-color: #ef4444;
					box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
				}

				.submit-button {
					background: linear-gradient(
						135deg,
						#cdc1ff 0%,
						#81559b 50%,
						#acd1da 100%
					);
					background-size: 200% 200%;
					animation: gradient-shift 6s ease infinite;
					transition: all 0.3s ease;
					position: relative;
					overflow: hidden;
				}

				.submit-button::before {
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

				.submit-button:hover::before {
					left: 100%;
				}

				.submit-button:hover {
					transform: translateY(-3px);
					box-shadow: 0 15px 35px rgba(129, 85, 155, 0.25);
				}

				.submit-button:disabled {
					opacity: 0.7;
					cursor: not-allowed;
					transform: none;
				}

				.gradient-text {
					background: linear-gradient(
						135deg,
						#81559b 0%,
						#cdc1ff 50%,
						#acd1da 100%
					);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
					background-size: 200% 200%;
					animation: gradient-shift 8s ease infinite;
				}

				.contact-info-card {
					background: linear-gradient(
						135deg,
						#ffffff 0%,
						rgba(172, 209, 218, 0.1) 50%,
						rgba(205, 193, 255, 0.05) 100%
					);
					border: 2px solid rgba(172, 209, 218, 0.2);
					transition: all 0.3s ease;
				}

				.contact-info-card:hover {
					transform: translateY(-6px);
					box-shadow: 0 20px 40px rgba(129, 85, 155, 0.12);
					border-color: rgba(205, 193, 255, 0.3);
					animation: pulse-glow 2s ease-in-out infinite;
				}

				.floating-icon {
					animation: float 4s ease-in-out infinite;
				}

				.hero-bg {
					background: linear-gradient(
						135deg,
						#acd1da 0%,
						#cdc1ff 30%,
						#81559b 70%,
						#5a4570 100%
					);
					background-size: 400% 400%;
					animation: gradient-shift 12s ease infinite;
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

				.loading-spinner {
					animation: spin 1s linear infinite;
				}

				@keyframes spin {
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(360deg);
					}
				}

				.faq-section {
					background: linear-gradient(
						135deg,
						rgba(172, 209, 218, 0.08) 0%,
						rgba(205, 193, 255, 0.05) 50%,
						rgba(172, 209, 218, 0.08) 100%
					);
				}

				.icon-purple {
					background-color: rgba(205, 193, 255, 0.2);
				}
				.icon-teal {
					background-color: rgba(172, 209, 218, 0.2);
				}
				.icon-dark {
					background-color: rgba(129, 85, 155, 0.2);
				}
				.icon-light {
					background-color: rgba(205, 193, 255, 0.15);
				}

				.error-message {
					color: #ef4444;
					font-size: 0.875rem;
					margin-top: 0.25rem;
				}
			`}</style>

			<main className="bg-white text-gray-800 overflow-hidden">
				{/* Hero Section */}
				<section className="hero-bg text-white py-8 sm-phone:py-10 md-phone:py-12 lg-phone:py-14 xl-phone:py-16 2xl-phone:py-18 sm-tablet:py-20 md-tablet:py-22 lg-tablet:py-24 xl-tablet:py-26 2xl-tablet:py-28 md-laptop:py-32 px-4 sm-phone:px-5 md-phone:px-6 lg-phone:px-7 xl-phone:px-8 2xl-phone:px-8 sm-tablet:px-8 md-tablet:px-8 lg-tablet:px-10 xl-tablet:px-12 2xl-tablet:px-14 md-laptop:px-16 relative z-10">
					<div className="max-w-4xl mx-auto text-center">
						<div
							className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
						>
							<h1 className="text-2xl sm-phone:text-3xl md-phone:text-4xl lg-phone:text-4xl xl-phone:text-5xl 2xl-phone:text-5xl sm-tablet:text-6xl md-tablet:text-6xl lg-tablet:text-5xl xl-tablet:text-6xl 2xl-tablet:text-7xl md-laptop:text-8xl font-bold mb-4 sm-phone:mb-5 md-phone:mb-6 lg-phone:mb-6 xl-phone:mb-7 2xl-phone:mb-8 sm-tablet:mb-8 md-tablet:mb-10 lg-tablet:mb-8 xl-tablet:mb-10 2xl-tablet:mb-12 md-laptop:mb-14 drop-shadow-lg">
								Get in Touch with Us
							</h1>
							<p className="text-base sm-phone:text-lg md-phone:text-xl lg-phone:text-xl xl-phone:text-xl 2xl-phone:text-2xl sm-tablet:text-2xl md-tablet:text-2xl lg-tablet:text-xl xl-tablet:text-2xl 2xl-tablet:text-3xl md-laptop:text-3xl opacity-95 mb-6 sm-phone:mb-7 md-phone:mb-8 lg-phone:mb-9 xl-phone:mb-10 2xl-phone:mb-11 sm-tablet:mb-12 md-tablet:mb-14 lg-tablet:mb-10 xl-tablet:mb-12 2xl-tablet:mb-16 md-laptop:mb-18 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
								Have questions about Brain Hustle? Need support with your
								studies? We're here to help you succeed.
							</p>
						</div>
					</div>
				</section>

				{/* Main Contact Section */}
				<section className="py-8 sm-phone:py-10 md-phone:py-12 lg-phone:py-14 xl-phone:py-16 2xl-phone:py-18 sm-tablet:py-20 md-tablet:py-22 lg-tablet:py-24 xl-tablet:py-26 2xl-tablet:py-28 md-laptop:py-32 px-4 sm-phone:px-5 md-phone:px-6 lg-phone:px-7 xl-phone:px-8 2xl-phone:px-8 sm-tablet:px-8 md-tablet:px-8 lg-tablet:px-10 xl-tablet:px-12 2xl-tablet:px-14 md-laptop:px-16">
					<div className="max-w-6xl mx-auto">
						<div className="grid lg-tablet:grid-cols-2 gap-6 sm-phone:gap-7 md-phone:gap-8 lg-phone:gap-9 xl-phone:gap-10 2xl-phone:gap-11 sm-tablet:gap-12 md-tablet:gap-14 lg-tablet:gap-16 xl-tablet:gap-18 2xl-tablet:gap-20 md-laptop:gap-24">
							{/* Contact Form */}
							<div
								className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
								style={{ animationDelay: "200ms" }}
							>
								<div className="contact-form p-4 sm-phone:p-5 md-phone:p-6 lg-phone:p-7 xl-phone:p-8 2xl-phone:p-9 sm-tablet:p-10 md-tablet:p-11 lg-tablet:p-8 xl-tablet:p-10 2xl-tablet:p-12 md-laptop:p-14 rounded-2xl sm-phone:rounded-2xl md-phone:rounded-3xl lg-phone:rounded-3xl xl-phone:rounded-3xl 2xl-phone:rounded-3xl sm-tablet:rounded-3xl md-tablet:rounded-3xl lg-tablet:rounded-3xl xl-tablet:rounded-3xl 2xl-tablet:rounded-3xl md-laptop:rounded-3xl shadow-2xl relative z-10">
									<h2 className="text-xl sm-phone:text-2xl md-phone:text-2xl lg-phone:text-3xl xl-phone:text-3xl 2xl-phone:text-3xl sm-tablet:text-4xl md-tablet:text-4xl lg-tablet:text-3xl xl-tablet:text-4xl 2xl-tablet:text-4xl md-laptop:text-5xl font-bold gradient-text mb-4 sm-phone:mb-5 md-phone:mb-6 lg-phone:mb-6 xl-phone:mb-7 2xl-phone:mb-8 sm-tablet:mb-8 md-tablet:mb-10 lg-tablet:mb-6 xl-tablet:mb-8 2xl-tablet:mb-10 md-laptop:mb-12">
										Send us a Message
									</h2>

									<form
										onSubmit={handleSubmit}
										className="space-y-4 sm-phone:space-y-5 md-phone:space-y-6 lg-phone:space-y-6 xl-phone:space-y-7 2xl-phone:space-y-8 sm-tablet:space-y-8 md-tablet:space-y-8 lg-tablet:space-y-6 xl-tablet:space-y-8 2xl-tablet:space-y-8 md-laptop:space-y-10"
									>
										<div className="grid md-phone:grid-cols-2 gap-3 sm-phone:gap-4 md-phone:gap-5 lg-phone:gap-5 xl-phone:gap-6 2xl-phone:gap-6 sm-tablet:gap-6 md-tablet:gap-6 lg-tablet:gap-4 xl-tablet:gap-6 2xl-tablet:gap-6 md-laptop:gap-8">
											<div>
												<label
													htmlFor="name"
													className="block text-gray-700 font-semibold mb-1 sm-phone:mb-2 text-sm sm-phone:text-sm md-phone:text-base lg-phone:text-base xl-phone:text-base 2xl-phone:text-base sm-tablet:text-base md-tablet:text-base lg-tablet:text-sm xl-tablet:text-base 2xl-tablet:text-base md-laptop:text-lg"
												>
													Name *
												</label>
												<input
													type="text"
													id="name"
													name="name"
													className="form-input w-full rounded-xl px-3 py-2 sm-phone:px-4 sm-phone:py-3 md-phone:px-4 md-phone:py-3 lg-phone:px-5 lg-phone:py-4 xl-phone:px-5 xl-phone:py-4 2xl-phone:px-5 2xl-phone:py-4 sm-tablet:px-5 sm-tablet:py-4 md-tablet:px-5 md-tablet:py-4 lg-tablet:px-4 lg-tablet:py-3 xl-tablet:px-5 xl-tablet:py-4 2xl-tablet:px-6 2xl-tablet:py-5 md-laptop:px-6 md-laptop:py-5 text-gray-800 placeholder-gray-400 text-sm sm-phone:text-sm md-phone:text-base lg-phone:text-base xl-phone:text-base 2xl-phone:text-base sm-tablet:text-base md-tablet:text-base lg-tablet:text-sm xl-tablet:text-base 2xl-tablet:text-base md-laptop:text-lg"
													placeholder="Your full name"
													required
												/>
												<ValidationError
													prefix="Name"
													field="name"
													errors={state.errors}
													className="error-message"
												/>
											</div>
											<div>
												<label
													htmlFor="email"
													className="block text-gray-700 font-semibold mb-1 sm-phone:mb-2 text-sm sm-phone:text-sm md-phone:text-base lg-phone:text-base xl-phone:text-base 2xl-phone:text-base sm-tablet:text-base md-tablet:text-base lg-tablet:text-sm xl-tablet:text-base 2xl-tablet:text-base md-laptop:text-lg"
												>
													Email *
												</label>
												<input
													type="email"
													id="email"
													name="email"
													className={`form-input w-full rounded-xl px-3 py-2 sm-phone:px-4 sm-phone:py-3 md-phone:px-4 md-phone:py-3 lg-phone:px-5 lg-phone:py-4 xl-phone:px-5 xl-phone:py-4 2xl-phone:px-5 2xl-phone:py-4 sm-tablet:px-5 sm-tablet:py-4 md-tablet:px-5 md-tablet:py-4 lg-tablet:px-4 lg-tablet:py-3 xl-tablet:px-5 xl-tablet:py-4 2xl-tablet:px-6 2xl-tablet:py-5 md-laptop:px-6 md-laptop:py-5 text-gray-800 placeholder-gray-400 text-sm sm-phone:text-sm md-phone:text-base lg-phone:text-base xl-phone:text-base 2xl-phone:text-base sm-tablet:text-base md-tablet:text-base lg-tablet:text-sm xl-tablet:text-base 2xl-tablet:text-base md-laptop:text-lg ${
														state.errors?.find(
															(error) => error.field === "email"
														)
															? "error"
															: ""
													}`}
													placeholder="you@example.com"
													required
												/>

												<ValidationError
													prefix="Email"
													field="email"
													errors={state.errors}
													className="error-message"
												/>
											</div>
										</div>

										<div>
											<label
												htmlFor="subject"
												className="block text-gray-700 font-semibold mb-1 sm-phone:mb-2 text-sm sm-phone:text-sm md-phone:text-base lg-phone:text-base xl-phone:text-base 2xl-phone:text-base sm-tablet:text-base md-tablet:text-base lg-tablet:text-sm xl-tablet:text-base 2xl-tablet:text-base md-laptop:text-lg"
											>
												Subject *
											</label>
											<select
												id="subject"
												name="subject"
												className="form-input w-full rounded-xl px-3 py-2 sm-phone:px-4 sm-phone:py-3 md-phone:px-4 md-phone:py-3 lg-phone:px-5 lg-phone:py-4 xl-phone:px-5 xl-phone:py-4 2xl-phone:px-5 2xl-phone:py-4 sm-tablet:px-5 sm-tablet:py-4 md-tablet:px-5 md-tablet:py-4 lg-tablet:px-4 lg-tablet:py-3 xl-tablet:px-5 xl-tablet:py-4 2xl-tablet:px-6 2xl-tablet:py-5 md-laptop:px-6 md-laptop:py-5 text-gray-800 text-sm sm-phone:text-sm md-phone:text-base lg-phone:text-base xl-phone:text-base 2xl-phone:text-base sm-tablet:text-base md-tablet:text-base lg-tablet:text-sm xl-tablet:text-base 2xl-tablet:text-base md-laptop:text-lg"
												required
											>
												<option value="">Select a topic</option>
												<option value="general">General Inquiry</option>
												<option value="support">Technical Support</option>
												<option value="billing">Billing Question</option>
												<option value="feature">Feature Request</option>
												<option value="partnership">Partnership</option>
												<option value="feedback">Feedback</option>
											</select>
											<ValidationError
												prefix="Subject"
												field="subject"
												errors={state.errors}
												className="error-message"
											/>
										</div>

										<div>
											<label
												htmlFor="message"
												className="block text-gray-700 font-semibold mb-1 sm-phone:mb-2 text-sm sm-phone:text-sm md-phone:text-base lg-phone:text-base xl-phone:text-base 2xl-phone:text-base sm-tablet:text-base md-tablet:text-base lg-tablet:text-sm xl-tablet:text-base 2xl-tablet:text-base md-laptop:text-lg"
											>
												Message *
											</label>
											<textarea
												id="message"
												name="message"
												className="form-input w-full rounded-xl px-3 py-2 sm-phone:px-4 sm-phone:py-3 md-phone:px-4 md-phone:py-3 lg-phone:px-5 lg-phone:py-4 xl-phone:px-5 xl-phone:py-4 2xl-phone:px-5 2xl-phone:py-4 sm-tablet:px-5 sm-tablet:py-4 md-tablet:px-5 md-tablet:py-4 lg-tablet:px-4 lg-tablet:py-3 xl-tablet:px-5 xl-tablet:py-4 2xl-tablet:px-6 2xl-tablet:py-5 md-laptop:px-6 md-laptop:py-5 text-gray-800 placeholder-gray-400 text-sm sm-phone:text-sm md-phone:text-base lg-phone:text-base xl-phone:text-base 2xl-phone:text-base sm-tablet:text-base md-tablet:text-base lg-tablet:text-sm xl-tablet:text-base 2xl-tablet:text-base md-laptop:text-lg resize-none"
												placeholder="Tell us how we can help you..."
												rows="6"
												required
											></textarea>
											<ValidationError
												prefix="Message"
												field="message"
												errors={state.errors}
												className="error-message"
											/>
										</div>

										<button
											type="submit"
											disabled={state.submitting}
											className="submit-button w-full py-3 sm-phone:py-4 md-phone:py-4 lg-phone:py-5 xl-phone:py-5 2xl-phone:py-5 sm-tablet:py-5 md-tablet:py-5 lg-tablet:py-4 xl-tablet:py-5 2xl-tablet:py-6 md-laptop:py-6 rounded-xl font-semibold text-base sm-phone:text-lg md-phone:text-lg lg-phone:text-xl xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-xl md-tablet:text-xl lg-tablet:text-lg xl-tablet:text-xl 2xl-tablet:text-xl md-laptop:text-2xl text-white shadow-lg relative z-10"
										>
											{state.submitting ? (
												<div className="flex items-center justify-center gap-2 sm-phone:gap-3">
													<div className="loading-spinner w-4 h-4 sm-phone:w-5 sm-phone:h-5 border-2 border-white border-t-transparent rounded-full"></div>
													Sending...
												</div>
											) : (
												"Send Message"
											)}
										</button>
									</form>
								</div>
							</div>

							{/* Contact Information */}
							<div
								className={`space-y-4 sm-phone:space-y-5 md-phone:space-y-6 lg-phone:space-y-7 xl-phone:space-y-8 2xl-phone:space-y-8 sm-tablet:space-y-8 md-tablet:space-y-10 lg-tablet:space-y-6 xl-tablet:space-y-8 2xl-tablet:space-y-10 md-laptop:space-y-12 ${
									isVisible ? "animate-fade-in-up" : "opacity-0"
								}`}
								style={{ animationDelay: "400ms" }}
							>
								<div>
									<h2 className="text-xl sm-phone:text-2xl md-phone:text-2xl lg-phone:text-3xl xl-phone:text-3xl 2xl-phone:text-3xl sm-tablet:text-4xl md-tablet:text-4xl lg-tablet:text-3xl xl-tablet:text-4xl 2xl-tablet:text-4xl md-laptop:text-5xl font-bold text-gray-900 mb-4 sm-phone:mb-5 md-phone:mb-6 lg-phone:mb-6 xl-phone:mb-7 2xl-phone:mb-8 sm-tablet:mb-8 md-tablet:mb-10 lg-tablet:mb-6 xl-tablet:mb-8 2xl-tablet:mb-10 md-laptop:mb-12">
										Other Ways to Reach Us
									</h2>
									<p className="text-gray-600 text-base sm-phone:text-lg md-phone:text-lg lg-phone:text-xl xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-xl md-tablet:text-xl lg-tablet:text-lg xl-tablet:text-xl 2xl-tablet:text-xl md-laptop:text-2xl leading-relaxed mb-6 sm-phone:mb-7 md-phone:mb-8 lg-phone:mb-8 xl-phone:mb-9 2xl-phone:mb-10 sm-tablet:mb-10 md-tablet:mb-12 lg-tablet:mb-8 xl-tablet:mb-10 2xl-tablet:mb-12 md-laptop:mb-14">
										Choose the method that works best for you. We're committed
										to responding quickly and helping you succeed.
									</p>
								</div>

								{/* Contact Cards */}
								<div className="space-y-3 sm-phone:space-y-4 md-phone:space-y-5 lg-phone:space-y-5 xl-phone:space-y-6 2xl-phone:space-y-6 sm-tablet:space-y-6 md-tablet:space-y-7 lg-tablet:space-y-4 xl-tablet:space-y-6 2xl-tablet:space-y-7 md-laptop:space-y-8">
									{[
										{
											icon: "📧",
											title: "Email Support",
											info: "contact@brainhustle.com",
											description: "Get detailed responses within 24 hours",
											colorClass: "icon-purple",
										},
										{
											icon: "💬",
											title: "Live Chat",
											info: "Available 9 AM - 6 PM GMT",
											description: "Instant help with quick questions",
											colorClass: "icon-teal",
										},
										{
											icon: "📞",
											title: "Phone Support",
											info: "+44 20 1234 5678",
											description: "Speak directly with our team",
											colorClass: "icon-dark",
										},
										{
											icon: "🎓",
											title: "Student Portal",
											info: "help.brainhustle.com",
											description: "Access FAQs and study guides",
											colorClass: "icon-light",
										},
									].map((contact, index) => (
										<div
											key={index}
											className="contact-info-card p-4 sm-phone:p-5 md-phone:p-6 lg-phone:p-7 xl-phone:p-8 2xl-phone:p-8 sm-tablet:p-8 md-tablet:p-9 lg-tablet:p-6 xl-tablet:p-8 2xl-tablet:p-9 md-laptop:p-10 rounded-xl sm-phone:rounded-xl md-phone:rounded-2xl lg-phone:rounded-2xl xl-phone:rounded-2xl 2xl-phone:rounded-2xl sm-tablet:rounded-2xl md-tablet:rounded-2xl lg-tablet:rounded-2xl xl-tablet:rounded-2xl 2xl-tablet:rounded-2xl md-laptop:rounded-2xl"
											style={{ animationDelay: `${600 + index * 100}ms` }}
										>
											<div className="flex items-start gap-3 sm-phone:gap-4 md-phone:gap-5 lg-phone:gap-5 xl-phone:gap-6 2xl-phone:gap-6 sm-tablet:gap-6 md-tablet:gap-6 lg-tablet:gap-4 xl-tablet:gap-6 2xl-tablet:gap-6 md-laptop:gap-8">
												<div
													className={`${contact.colorClass} w-10 h-10 sm-phone:w-12 sm-phone:h-12 md-phone:w-14 md-phone:h-14 lg-phone:w-16 lg-phone:h-16 xl-phone:w-16 xl-phone:h-16 2xl-phone:w-18 2xl-phone:h-18 sm-tablet:w-18 sm-tablet:h-18 md-tablet:w-20 md-tablet:h-20 lg-tablet:w-14 lg-tablet:h-14 xl-tablet:w-16 xl-tablet:h-16 2xl-tablet:w-18 2xl-tablet:h-18 md-laptop:w-20 md-laptop:h-20 rounded-lg sm-phone:rounded-xl md-phone:rounded-xl lg-phone:rounded-xl xl-phone:rounded-xl 2xl-phone:rounded-xl sm-tablet:rounded-xl md-tablet:rounded-xl lg-tablet:rounded-xl xl-tablet:rounded-xl 2xl-tablet:rounded-xl md-laptop:rounded-xl flex items-center justify-center text-lg sm-phone:text-xl md-phone:text-2xl lg-phone:text-2xl xl-phone:text-3xl 2xl-phone:text-3xl sm-tablet:text-3xl md-tablet:text-3xl lg-tablet:text-2xl xl-tablet:text-3xl 2xl-tablet:text-3xl md-laptop:text-4xl floating-icon flex-shrink-0`}
													style={{
														animationDelay: `${index * 0.5}s`,
													}}
												>
													{contact.icon}
												</div>
												<div className="flex-1">
													<h3 className="text-lg sm-phone:text-xl md-phone:text-xl lg-phone:text-2xl xl-phone:text-2xl 2xl-phone:text-2xl sm-tablet:text-2xl md-tablet:text-2xl lg-tablet:text-xl xl-tablet:text-2xl 2xl-tablet:text-2xl md-laptop:text-3xl font-bold text-gray-900 mb-1 sm-phone:mb-2 md-phone:mb-2 lg-phone:mb-2 xl-phone:mb-2 2xl-phone:mb-2 sm-tablet:mb-2 md-tablet:mb-2 lg-tablet:mb-2 xl-tablet:mb-2 2xl-tablet:mb-3 md-laptop:mb-3">
														{contact.title}
													</h3>
													<p className="text-base sm-phone:text-lg md-phone:text-lg lg-phone:text-xl xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-xl md-tablet:text-xl lg-tablet:text-lg xl-tablet:text-xl 2xl-tablet:text-xl md-laptop:text-2xl font-semibold mb-1 sm-phone:mb-1 md-phone:mb-1 lg-phone:mb-1 xl-phone:mb-1 2xl-phone:mb-1 sm-tablet:mb-1 md-tablet:mb-2 lg-tablet:mb-1 xl-tablet:mb-1 2xl-tablet:mb-2 md-laptop:mb-2 text-purple-700">
														{contact.info}
													</p>
													<p className="text-gray-600 text-sm sm-phone:text-base md-phone:text-base lg-phone:text-base xl-phone:text-base 2xl-phone:text-base sm-tablet:text-base md-tablet:text-base lg-tablet:text-sm xl-tablet:text-base 2xl-tablet:text-base md-laptop:text-lg">
														{contact.description}
													</p>
												</div>
											</div>
										</div>
									))}
								</div>

								{/* Office Hours */}
								<div className="contact-info-card p-4 sm-phone:p-5 md-phone:p-6 lg-phone:p-7 xl-phone:p-8 2xl-phone:p-8 sm-tablet:p-8 md-tablet:p-9 lg-tablet:p-6 xl-tablet:p-8 2xl-tablet:p-9 md-laptop:p-10 rounded-xl sm-phone:rounded-xl md-phone:rounded-2xl lg-phone:rounded-2xl xl-phone:rounded-2xl 2xl-phone:rounded-2xl sm-tablet:rounded-2xl md-tablet:rounded-2xl lg-tablet:rounded-2xl xl-tablet:rounded-2xl 2xl-tablet:rounded-2xl md-laptop:rounded-2xl">
									<h3 className="text-lg sm-phone:text-xl md-phone:text-xl lg-phone:text-2xl xl-phone:text-2xl 2xl-phone:text-2xl sm-tablet:text-2xl md-tablet:text-2xl lg-tablet:text-xl xl-tablet:text-2xl 2xl-tablet:text-2xl md-laptop:text-3xl font-bold text-gray-900 mb-3 sm-phone:mb-4 md-phone:mb-4 lg-phone:mb-4 xl-phone:mb-4 2xl-phone:mb-4 sm-tablet:mb-4 md-tablet:mb-5 lg-tablet:mb-4 xl-tablet:mb-4 2xl-tablet:mb-5 md-laptop:mb-6">
										Office Hours
									</h3>
									<div className="space-y-1 sm-phone:space-y-2 md-phone:space-y-2 lg-phone:space-y-2 xl-phone:space-y-2 2xl-phone:space-y-2 sm-tablet:space-y-2 md-tablet:space-y-2 lg-tablet:space-y-2 xl-tablet:space-y-2 2xl-tablet:space-y-2 md-laptop:space-y-3 text-gray-600">
										<div className="flex justify-between text-sm sm-phone:text-base md-phone:text-base lg-phone:text-base xl-phone:text-base 2xl-phone:text-base sm-tablet:text-base md-tablet:text-base lg-tablet:text-sm xl-tablet:text-base 2xl-tablet:text-base md-laptop:text-lg">
											<span>Monday - Friday</span>
											<span className="font-semibold text-purple-700">
												9:00 AM - 6:00 PM GMT
											</span>
										</div>
										<div className="flex justify-between text-sm sm-phone:text-base md-phone:text-base lg-phone:text-base xl-phone:text-base 2xl-phone:text-base sm-tablet:text-base md-tablet:text-base lg-tablet:text-sm xl-tablet:text-base 2xl-tablet:text-base md-laptop:text-lg">
											<span>Saturday</span>
											<span className="font-semibold text-purple-700">
												10:00 AM - 4:00 PM GMT
											</span>
										</div>
										<div className="flex justify-between text-sm sm-phone:text-base md-phone:text-base lg-phone:text-base xl-phone:text-base 2xl-phone:text-base sm-tablet:text-base md-tablet:text-base lg-tablet:text-sm xl-tablet:text-base 2xl-tablet:text-base md-laptop:text-lg">
											<span>Sunday</span>
											<span className="font-semibold text-purple-700">
												Closed
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* FAQ Section */}
				<section className="faq-section py-8 sm-phone:py-10 md-phone:py-12 lg-phone:py-14 xl-phone:py-16 2xl-phone:py-18 sm-tablet:py-20 md-tablet:py-22 lg-tablet:py-24 xl-tablet:py-26 2xl-tablet:py-28 md-laptop:py-32 px-4 sm-phone:px-5 md-phone:px-6 lg-phone:px-7 xl-phone:px-8 2xl-phone:px-8 sm-tablet:px-8 md-tablet:px-8 lg-tablet:px-10 xl-tablet:px-12 2xl-tablet:px-14 md-laptop:px-16">
					<div className="max-w-4xl mx-auto">
						<div className="text-center mb-8 sm-phone:mb-10 md-phone:mb-12 lg-phone:mb-14 xl-phone:mb-16 2xl-phone:mb-16 sm-tablet:mb-18 md-tablet:mb-20 lg-tablet:mb-16 xl-tablet:mb-18 2xl-tablet:mb-20 md-laptop:mb-24">
							<h2 className="text-2xl sm-phone:text-3xl md-phone:text-4xl lg-phone:text-4xl xl-phone:text-5xl 2xl-phone:text-5xl sm-tablet:text-5xl md-tablet:text-6xl lg-tablet:text-4xl xl-tablet:text-5xl 2xl-tablet:text-6xl md-laptop:text-7xl font-bold gradient-text mb-4 sm-phone:mb-5 md-phone:mb-6 lg-phone:mb-6 xl-phone:mb-7 2xl-phone:mb-8 sm-tablet:mb-8 md-tablet:mb-10 lg-tablet:mb-6 xl-tablet:mb-8 2xl-tablet:mb-10 md-laptop:mb-12">
								Frequently Asked Questions
							</h2>
							<p className="text-lg sm-phone:text-xl md-phone:text-xl lg-phone:text-xl xl-phone:text-2xl 2xl-phone:text-2xl sm-tablet:text-2xl md-tablet:text-2xl lg-tablet:text-xl xl-tablet:text-2xl 2xl-tablet:text-2xl md-laptop:text-3xl text-gray-600">
								Quick answers to common questions about Brain Hustle.
							</p>
						</div>

						<div className="grid md-tablet:grid-cols-2 gap-4 sm-phone:gap-5 md-phone:gap-6 lg-phone:gap-7 xl-phone:gap-8 2xl-phone:gap-8 sm-tablet:gap-8 md-tablet:gap-10 lg-tablet:gap-6 xl-tablet:gap-8 2xl-tablet:gap-10 md-laptop:gap-12">
							{[
								{
									question: "How do I get started?",
									answer:
										"Simply sign up for a free account and start exploring our GCSE resources immediately.",
								},
								{
									question: "What subjects do you cover?",
									answer:
										"We cover all major GCSE subjects including Maths, English, Sciences, and many more.",
								},
								{
									question: "Can I cancel anytime?",
									answer:
										"Yes, you can cancel your subscription at any time with no questions asked.",
								},
								{
									question: "Do you offer student discounts?",
									answer:
										"Yes, we offer special pricing for students. Contact us to learn more about our discounts.",
								},
							].map((faq, index) => (
								<div
									key={index}
									className="contact-info-card p-4 sm-phone:p-5 md-phone:p-6 lg-phone:p-7 xl-phone:p-8 2xl-phone:p-8 sm-tablet:p-8 md-tablet:p-9 lg-tablet:p-6 xl-tablet:p-8 2xl-tablet:p-9 md-laptop:p-10 rounded-xl sm-phone:rounded-xl md-phone:rounded-2xl lg-phone:rounded-2xl xl-phone:rounded-2xl 2xl-phone:rounded-2xl sm-tablet:rounded-2xl md-tablet:rounded-2xl lg-tablet:rounded-2xl xl-tablet:rounded-2xl 2xl-tablet:rounded-2xl md-laptop:rounded-2xl"
								>
									<h4 className="text-base sm-phone:text-lg md-phone:text-lg lg-phone:text-xl xl-phone:text-xl 2xl-phone:text-xl sm-tablet:text-xl md-tablet:text-xl lg-tablet:text-lg xl-tablet:text-xl 2xl-tablet:text-xl md-laptop:text-2xl font-bold text-gray-900 mb-2 sm-phone:mb-3 md-phone:mb-3 lg-phone:mb-3 xl-phone:mb-3 2xl-phone:mb-3 sm-tablet:mb-3 md-tablet:mb-4 lg-tablet:mb-3 xl-tablet:mb-3 2xl-tablet:mb-4 md-laptop:mb-4">
										{faq.question}
									</h4>
									<p className="text-gray-600 text-sm sm-phone:text-base md-phone:text-base lg-phone:text-base xl-phone:text-base 2xl-phone:text-base sm-tablet:text-base md-tablet:text-base lg-tablet:text-sm xl-tablet:text-base 2xl-tablet:text-base md-laptop:text-lg">
										{faq.answer}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
