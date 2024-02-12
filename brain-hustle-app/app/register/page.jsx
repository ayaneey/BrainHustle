import React from "react";
import Link from "next/link";
import SignUpModal from "./components/SignUpModal";

function page() {
	return (
		<div className="flex flex-col sm:flex-row">
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
					<button className="mt-6 sm:mt-8 lg:mt-12 text-sm sm:text-base text-blue-600">
						Join Now!
					</button>
					<div className="sm:mr-8 ">
						<img
							src="/images/login-page.svg"
							alt="Login Image"
							className="mt-8 sm:mt-12 lg:mt-20"
							width={400}
						/>
					</div>
				</div>
			</div>
			<div className="flex-1 sm:flex-1 lg:flex-1">
				<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<img
							className="mx-auto h-10 w-auto"
							src="/images/brain-hustle.svg"
							alt="Brain Hustle Logo"
						/>
						<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
							Create an Account
						</h2>
						<SignUpModal />
					</div>
				</div>
			</div>
		</div>
	);
}

export default page;
