"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";

const Sidebar = ({ selectedSection }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { user } = useUser();

	const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

	const activeKey = selectedSection?.toLowerCase();

	return (
		<div>
			<aside
				className={`md:min-h-screen bg-dashboardDrop text-white p-6 flex flex-col rounded-lg ${
					isMenuOpen ? "block" : "hidden"
				} md:block`}
			>
				<div className="mb-8">
					<h2 className="text-2xl font-bold">
						Welcome,{" "}
						<span className="text-greenShade">
							{user?.firstName || "User"} 👋
						</span>
					</h2>
				</div>

				<nav className="flex-1">
					<ul className="space-y-3 text-base">
						{["Dashboard", "Maths", "English", "Science", "Settings"].map(
							(label) => {
								const key = label.toLowerCase();
								const href =
									label === "Dashboard"
										? "/dashboard"
										: `/dashboard?section=${key}`;
								const isActive = activeKey === key;

								return (
									<li key={key}>
										<Link
											href={href}
											className={`block px-4 py-2 rounded-md transition duration-200 ${
												isActive
													? "bg-greenShade text-baseBlack font-medium"
													: "hover:bg-greyShade"
											}`}
										>
											{label}
										</Link>
									</li>
								);
							}
						)}
						<li>
							<SignOutButton>
								<button className="block w-full text-left px-4 py-2 rounded-md hover:bg-greyShade transition duration-200">
									Logout
								</button>
							</SignOutButton>
						</li>
					</ul>
				</nav>
			</aside>

			{/* Mobile Toggle Button */}
			<button
				className="md:hidden mt-4 p-2 bg-box text-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
				onClick={handleMenuToggle}
			>
				<svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
					<path
						className={!isMenuOpen ? "block" : "hidden"}
						fillRule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
						clipRule="evenodd"
					/>
					<path
						className={isMenuOpen ? "block" : "hidden"}
						fillRule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
		</div>
	);
};

export default Sidebar;
