"use client";

import React, { useState, useEffect } from "react";

function Navbar() {
	const [isSmallOrMediumScreen, setIsSmallOrMediumScreen] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsSmallOrMediumScreen(window.innerWidth <= 1023);
		};

		// Listen for window resize events
		window.addEventListener("resize", handleResize);

		// Initial check on component mount
		handleResize();

		// Remove event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<nav className="bg-background">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						{/* ... (Mobile menu button) */}
					</div>
					<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
						<div className="flex flex-shrink-0 items-center">
							<img
								className="h-8 w-auto"
								src="./images/brain-hustle.svg"
								alt="Your Company"
							/>
						</div>
						<div className="hidden sm:ml-32 sm:block md:ml-52 lg:ml-40 xl:ml-56 flex-grow">
							<div className="flex justify-center space-x-4">
								<a
									href="/"
									className="text-secondTextColor hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
									aria-current="page"
								>
									Home
								</a>
								<a
									href="#"
									className="text-secondTextColor hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
								>
									Product
								</a>
								<a
									href="#"
									className="text-secondTextColor hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
								>
									Contact
								</a>
								{isSmallOrMediumScreen ? (
									<>
										<button
											type="button"
											className="bg-blue-500 text-white rounded-md px-3 py-2 text-sm font-medium"
										>
											Login
										</button>
									</>
								) : (
									<>
										<div className="hidden lg:flex space-x-12 xl:flex ">
											{isSmallOrMediumScreen ? (
												<>
													<button
														type="button"
														className="bg-blue-500 text-white rounded-md px-3 py-2 text-sm font-medium"
													>
														Login
													</button>
												</>
											) : (
												<>
													<div className="lg:ml-28 xl:ml-72 ">
														<div className="space-x-8">
															<button
																type="button"
																className=" text-secondTextColor rounded-md px-3 py-2  text-base font-medium hover:bg-gray-700 hover:text-white"
															>
																Login
															</button>
															<button
																type="button"
																className="bg-box text-primaryColor hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
															>
																Become a member →
															</button>
														</div>
													</div>
												</>
											)}
										</div>
									</>
								)}
							</div>
						</div>
					</div>
					<div className="sm:hidden">
						<button
							type="button"
							className="bg-blue-500 text-white rounded-md px-3 py-2 text-sm font-medium"
						>
							Become a member
						</button>
					</div>
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
				</div>
			</div>
			{/* Mobile Menu */}
			<div className="sm:hidden" id="mobile-menu">
				<div className="space-y-1 px-2 pb-3 pt-2">
					<a
						href="/"
						className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
						aria-current="page"
					>
						Home
					</a>
					<a
						href="#"
						className="text-secondTextColor hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
					>
						Product
					</a>
					<a
						href="#"
						className="text-secondTextColor hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
					>
						Contact
					</a>
					<a
						href="#"
						className="text-secondTextColor hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
					>
						My Account
					</a>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
