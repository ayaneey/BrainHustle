import React, { useState, useEffect } from "react";
import Link from "next/link";

const Sidebar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
	const handleDropdownToggle = (e) => {
		e.stopPropagation(); // Prevents closing the dropdown when clicking inside
		setIsDropdownOpen(!isDropdownOpen);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				!event.target.closest(".dropdown-menu") &&
				!event.target.closest(".dropdown-toggle")
			) {
				setIsDropdownOpen(false);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	return (
		<div>
			{/* Sidebar */}
			<aside
				className={` md:min-h-screen  text-white h-full p-4 lg:w-64 md:w-48 sm:w-36 flex flex-col ${
					isMenuOpen ? "block" : "hidden"
				} md:block`}
			>
				<div className="mb-8">
					<h2 className="text-2xl font-bold">Welcome User</h2>
				</div>
				<nav className="flex-1">
					<ul className="space-y-2">
						<li>
							<Link href="/" className="block p-2 rounded hover:bg-green-700">
								Home
							</Link>
						</li>
						<li>
							<Link
								href="/dashboard?section=journal"
								className="block p-2 rounded hover:bg-green-700"
							>
								Journal
							</Link>
						</li>
						<li>
							<Link
								href="/dashboard?section=calendar"
								className="block p-2 rounded hover:bg-green-700"
							>
								Calendar
							</Link>
						</li>
						<li>
							<Link
								href="/dashboard?section=settings"
								className="block p-2 rounded hover:bg-green-700"
							>
								Settings
							</Link>
						</li>
					</ul>
				</nav>
			</aside>
			{/* Mobile Menu Button */}
			<button
				className="md:hidden p-2 bg-gray-800 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-10 "
				onClick={handleMenuToggle}
			>
				<svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
					<path
						className={!isMenuOpen ? "block" : "hidden"}
						fillRule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
						clipRule="evenodd"
					></path>
					<path
						className={isMenuOpen ? "block" : "hidden"}
						fillRule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clipRule="evenodd"
					></path>
				</svg>
			</button>
		</div>
	);
};

export default Sidebar;
