"use client";

import React from "react";
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
	return (
		<nav className="bg-background">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					{/* Left side navigation */}
					<div className="flex space-x-4">
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
					</div>

					{/* Right side auth buttons */}
					<div className="flex items-center space-x-4">
						<SignedOut>
							<SignInButton mode="modal" appearance={clerkAppearance}>
								<button className="bg-blue-500 text-white rounded-md px-3 py-2 text-sm font-medium">
									Sign in
								</button>
							</SignInButton>
							<SignUpButton mode="modal" appearance={clerkAppearance}>
								<button className="bg-box text-primaryColor hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
									Sign up
								</button>
							</SignUpButton>
						</SignedOut>

						<SignedIn>
							<UserButton afterSignOutUrl="/" />
						</SignedIn>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
