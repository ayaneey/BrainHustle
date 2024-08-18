"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

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
					{/* Other Navbar content */}
					<div className="flex justify-center space-x-4">
						<Link href="/">
							<span className="text-secondTextColor hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
								Home
							</span>
						</Link>
						<Link href="/product">
							<span className="text-secondTextColor hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
								Product
							</span>
						</Link>
						<Link href="/contact">
							<span className="text-secondTextColor hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
								Contact
							</span>
						</Link>
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
											<div className="lg:ml-28 xl:ml-96">
												<div className="xl:space-x-8">
													<Link href="/login">
														<span className="text-secondTextColor rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white">
															Login
														</span>
													</Link>
													<Link href="/register">
														<button
															type="button"
															className="bg-box text-primaryColor hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
														>
															Become a member →
														</button>
													</Link>
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
		</nav>
	);
}

export default Navbar;
