"use client";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignUpPage() {
	return (
		<div className="flex flex-col sm:flex-row">
			{/* Left side with welcome text */}
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

			{/* Right side with Clerk SignUp form */}
			<div className="flex-1 sm:flex-1 lg:flex-1 flex justify-center items-center p-10">
				<SignUp
					path="/sign-up"
					routing="path"
					redirectUrl="/dashboard"
					afterSignUpUrl="/dashboard"
				/>
			</div>
		</div>
	);
}
