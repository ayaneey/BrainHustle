"use client";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function LoginPage() {
	return (
		<div className="flex flex-col sm:flex-row">
			{/* Left content */}
			<div className="flex-1 sm:min-h-full flex-col justify-center px-4 py-8 sm:py-12 lg:px-8 lg:py-16">
				<div className="ml-4 xl:ml-32 sm:ml-10">
					<h1 className="text-lg sm:text-lg sm:mb-4 lg:text-2xl mb-2 lg:mb-3">
						Welcome to
					</h1>
					<h1 className="text-2xl sm:text-4xl lg:text-4xl xl:text-5xl">
						Brain Hustle
					</h1>
					<p className="text-xs sm:text-xs mt-4 md:text-sm md:leading-9 sm:mt-6 lg:mt-8 leading-7 sm:leading-9 lg:leading-10 lg:max-w-md">
						Discover academic excellence at BrainHustle! Our modern and
						user-friendly platform is dedicated to providing you with the best
						study experience. Join us today to unlock your full potential!
					</p>
					<div className="sm:mr-8">
						<Image
							src="/images/login-page.svg"
							alt="Login Image"
							width={400}
							height={400}
							className="mt-8 sm:mt-12 lg:mt-20"
						/>
					</div>
				</div>
			</div>

			{/* Right: Clerk SignIn form with custom appearance */}
			<div className="flex-1 sm:flex-1 lg:flex-1 flex justify-center items-center p-10">
				<SignIn
					path="/sign-in"
					routing="path"
					redirectUrl="/dashboard"
					afterSignInUrl="/dashboard"
					appearance={{
						variables: {
							colorBackground: "#F1F7F6", // soft page background
							colorPrimary: "#95d5b2", // green accent
							colorText: "#23242A", // base black
							colorInputBackground: "#ffffff", // clean white input
							colorInputText: "#23242A",
							colorTextOnPrimaryBackground: "#ffffff",
							colorAlphaShade: "#d3d3d3", // subtle borders
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
					}}
				/>
			</div>
		</div>
	);
}
