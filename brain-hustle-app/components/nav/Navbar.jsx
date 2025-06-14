"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/nextjs";

// Custom Clerk appearance matching your Tailwind theme
const clerkAppearance = {
	variables: {
		colorBackground: "#F1F7F8",
		colorPrimary: "#95d5b2",
		colorText: "#23242A",
		colorInputBackground: "#ffffff",
		colorInputText: "#23242A",
		colorTextOnPrimaryBackground: "#ffffff",
		colorAlphaShade: "#d3d3d3",
	},
	elements: {
		card: "rounded-2xl shadow-md border border-[#d3d3d3] px-6 py-8",
		headerTitle: "text-2xl font-semibold text-baseBlack mb-2",
		headerSubtitle: "text-sm text-secondTextColor mb-6",
		formButtonPrimary:
			"bg-dashboard hover:bg-dashboardDrop transition-colors duration-200 text-white font-medium py-2 rounded-lg w-full",
		formFieldInput:
			"border border-greyShade rounded-md px-3 py-2 text-base text-baseBlack",
		formFieldLabel: "text-sm text-baseBlack mb-1",
		footerActionText: "text-sm text-secondTextColor",
		socialButtonsBlockButton:
			"bg-white border border-greyShade text-baseBlack hover:bg-[#eeeeee] transition-all rounded-md py-2 text-sm font-medium",
	},
};

function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			<style jsx>{`
				@keyframes slide-down {
					from {
						opacity: 0;
						transform: translateY(-10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes slide-up {
					from {
						opacity: 0;
						transform: translateY(10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				.nav-link {
					position: relative;
					transition: all 0.3s ease;
				}

				.nav-link::before {
					content: "";
					position: absolute;
					bottom: -4px;
					left: 50%;
					width: 0;
					height: 2px;
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					transition: all 0.3s ease;
					transform: translateX(-50%);
				}

				.nav-link:hover::before {
					width: 100%;
				}

				.nav-link:hover {
					transform: translateY(-2px);
				}

				.mobile-menu-enter {
					animation: slide-down 0.3s ease-out forwards;
				}

				.auth-button {
					position: relative;
					overflow: hidden;
					transition: all 0.3s ease;
				}

				.auth-button::before {
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
				}

				.auth-button:hover::before {
					left: 100%;
				}

				.auth-button:hover {
					transform: translateY(-2px);
					box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
				}

				.logo-text {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
					font-weight: 800;
				}

				.navbar-blur {
					backdrop-filter: blur(12px);
					background: rgba(255, 255, 255, 0.95);
					border-bottom: 1px solid rgba(255, 255, 255, 0.2);
				}

				.mobile-menu-bg {
					background: rgba(255, 255, 255, 0.98);
					backdrop-filter: blur(12px);
					border: 1px solid rgba(255, 255, 255, 0.2);
				}
			`}</style>

			<nav
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					isScrolled ? "navbar-blur shadow-lg" : "bg-transparent"
				}`}
			>
				<div className="mx-auto max-w-7xl px-4 sm-phone:px-6 lg-tablet:px-8">
					<div className="flex h-16 sm-phone:h-18 md-phone:h-20 lg-phone:h-20 xl-phone:h-22 2xl-phone:h-24 sm-tablet:h-18 md-tablet:h-20 lg-tablet:h-16 xl-tablet:h-18 2xl-tablet:h-20 md-laptop:h-24 items-center justify-between">
						{/* Logo */}
						<Link href="/" className="flex items-center">
							<div className="logo-text text-lg sm-phone:text-xl md-phone:text-2xl lg-phone:text-2xl xl-phone:text-3xl 2xl-phone:text-3xl sm-tablet:text-2xl md-tablet:text-3xl lg-tablet:text-xl xl-tablet:text-2xl 2xl-tablet:text-3xl md-laptop:text-4xl font-bold hover:scale-105 transition-transform duration-300">
								BrainHustle
							</div>
						</Link>

						{/* Desktop Navigation */}
						<div className="hidden lg-tablet:flex space-x-2 xl-tablet:space-x-4 2xl-tablet:space-x-6 md-laptop:space-x-8">
							<Link href="/">
								<span className="nav-link text-gray-700 hover:text-gray-900 block rounded-lg px-3 py-2 xl-tablet:px-4 xl-tablet:py-3 text-sm xl-tablet:text-base 2xl-tablet:text-lg md-laptop:text-lg font-medium cursor-pointer">
									Home
								</span>
							</Link>
							<Link href="/product">
								<span className="nav-link text-gray-700 hover:text-gray-900 block rounded-lg px-3 py-2 xl-tablet:px-4 xl-tablet:py-3 text-sm xl-tablet:text-base 2xl-tablet:text-lg md-laptop:text-lg font-medium cursor-pointer">
									Product
								</span>
							</Link>
							<Link href="/about">
								<span className="nav-link text-gray-700 hover:text-gray-900 block rounded-lg px-3 py-2 xl-tablet:px-4 xl-tablet:py-3 text-sm xl-tablet:text-base 2xl-tablet:text-lg md-laptop:text-lg font-medium cursor-pointer">
									About
								</span>
							</Link>
							<Link href="/contact">
								<span className="nav-link text-gray-700 hover:text-gray-900 block rounded-lg px-3 py-2 xl-tablet:px-4 xl-tablet:py-3 text-sm xl-tablet:text-base 2xl-tablet:text-lg md-laptop:text-lg font-medium cursor-pointer">
									Contact
								</span>
							</Link>
						</div>

						{/* Desktop Auth Buttons */}
						<div className="hidden lg-tablet:flex items-center space-x-3 xl-tablet:space-x-4">
							<SignedOut>
								<SignInButton mode="modal" appearance={clerkAppearance}>
									<button className="auth-button bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg px-4 py-2 xl-tablet:px-6 xl-tablet:py-3 text-sm xl-tablet:text-base font-medium shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
										Sign in
									</button>
								</SignInButton>
								<SignUpButton mode="modal" appearance={clerkAppearance}>
									<button className="auth-button bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg px-4 py-2 xl-tablet:px-6 xl-tablet:py-3 text-sm xl-tablet:text-base font-medium shadow-md hover:from-purple-600 hover:to-purple-700 transition-all duration-300">
										Sign up
									</button>
								</SignUpButton>
							</SignedOut>

							<SignedIn>
								<div className="transform hover:scale-105 transition-transform duration-300">
									<UserButton afterSignOutUrl="/" />
								</div>
							</SignedIn>
						</div>

						{/* Mobile Menu Button */}
						<div className="lg-tablet:hidden">
							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="auth-button bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg p-2 sm-phone:p-3 hover:from-gray-200 hover:to-gray-300 transition-all duration-300"
							>
								<svg
									className={`w-5 h-5 sm-phone:w-6 sm-phone:h-6 transition-transform duration-300 ${
										isMobileMenuOpen ? "rotate-90" : ""
									}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									{isMobileMenuOpen ? (
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									) : (
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 6h16M4 12h16M4 18h16"
										/>
									)}
								</svg>
							</button>
						</div>
					</div>

					{/* Mobile Menu */}
					{isMobileMenuOpen && (
						<div className="mobile-menu-enter lg-tablet:hidden absolute top-full left-0 right-0 mobile-menu-bg rounded-b-2xl shadow-xl mx-4 sm-phone:mx-6 mt-2 border border-gray-200/50">
							<div className="px-4 sm-phone:px-6 py-4 sm-phone:py-6 space-y-3 sm-phone:space-y-4">
								{/* Mobile Navigation Links */}
								<div className="space-y-2 sm-phone:space-y-3">
									<Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
										<span className="nav-link text-gray-700 hover:text-gray-900 block rounded-lg px-4 py-3 text-base sm-phone:text-lg font-medium cursor-pointer">
											Home
										</span>
									</Link>
									<Link
										href="/product"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										<span className="nav-link text-gray-700 hover:text-gray-900 block rounded-lg px-4 py-3 text-base sm-phone:text-lg font-medium cursor-pointer">
											Product
										</span>
									</Link>
									<Link
										href="/about"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										<span className="nav-link text-gray-700 hover:text-gray-900 block rounded-lg px-4 py-3 text-base sm-phone:text-lg font-medium cursor-pointer">
											About
										</span>
									</Link>
									<Link
										href="/contact"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										<span className="nav-link text-gray-700 hover:text-gray-900 block rounded-lg px-4 py-3 text-base sm-phone:text-lg font-medium cursor-pointer">
											Contact
										</span>
									</Link>
								</div>

								{/* Mobile Auth Section */}
								<div className="border-t border-gray-200 pt-4 sm-phone:pt-6">
									<SignedOut>
										<div className="space-y-3 sm-phone:space-y-4">
											<SignInButton mode="modal" appearance={clerkAppearance}>
												<button
													className="auth-button w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg px-4 py-3 sm-phone:py-4 text-base sm-phone:text-lg font-medium shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
													onClick={() => setIsMobileMenuOpen(false)}
												>
													Sign in
												</button>
											</SignInButton>
											<SignUpButton mode="modal" appearance={clerkAppearance}>
												<button
													className="auth-button w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg px-4 py-3 sm-phone:py-4 text-base sm-phone:text-lg font-medium shadow-md hover:from-purple-600 hover:to-purple-700 transition-all duration-300"
													onClick={() => setIsMobileMenuOpen(false)}
												>
													Sign up
												</button>
											</SignUpButton>
										</div>
									</SignedOut>

									<SignedIn>
										<div className="flex justify-center py-2">
											<div className="transform hover:scale-105 transition-transform duration-300">
												<UserButton afterSignOutUrl="/" />
											</div>
										</div>
									</SignedIn>
								</div>
							</div>
						</div>
					)}
				</div>
			</nav>

			{/* Spacer to prevent content overlap */}
			<div className="h-16 sm-phone:h-18 md-phone:h-20 lg-phone:h-20 xl-phone:h-22 2xl-phone:h-24 sm-tablet:h-18 md-tablet:h-20 lg-tablet:h-16 xl-tablet:h-18 2xl-tablet:h-20 md-laptop:h-24"></div>
		</>
	);
}

export default Navbar;
