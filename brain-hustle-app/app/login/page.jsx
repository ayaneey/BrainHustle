"use client";

import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Page() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { email, password } = formData;
			const response = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (response.ok) {
				console.log("Login successful, redirecting...");
				console.log("Session cookie:", document.cookie); // Check if session cookie exists
				router.push("/dashboard"); // Redirect to dashboard after success
			} else {
				const data = await response.json();
				console.error("Login failed:", data.message);
				setError(data.message || "Login failed.");
			}
		} catch (error) {
			console.error("Login failed:", error);
			setError("Login failed. Please try again later.");
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

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
					<Link href="/register">
						<button className="mt-6 sm:mt-8 lg:mt-12 text-sm sm:text-base text-blue-600">
							Join Now!
						</button>
					</Link>
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
							Sign in to your account
						</h2>
					</div>
					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<form className="space-y-6" onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Email address
								</label>
								<div className="mt-2">
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										value={formData.email}
										onChange={handleChange}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-left pl-3"
									/>
								</div>
							</div>
							<div>
								<div className="flex items-center justify-between">
									<label
										htmlFor="password"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Password
									</label>
									<div className="text-sm">
										<a
											href="#"
											className="font-semibold text-indigo-600 hover:text-indigo-500"
										>
											Forgot password?
										</a>
									</div>
								</div>
								<div className="mt-2">
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										required
										value={formData.password}
										onChange={handleChange}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-left pl-3"
									/>
								</div>
							</div>
							{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
							<div>
								<button
									type="submit"
									className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									Sign in
								</button>
							</div>
						</form>
						<div className="flex justify-center mt-8 space-x-6">
							<button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
								<FaGoogle className="h-6 w-6 mr-2" />
								<span>Continue with Google</span>
							</button>
							<button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
								<svg
									className="h-6 w-6 mr-2"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="-1.5 0 20 20"
									version="1.1"
								>
									{/* Apple icon SVG path */}
								</svg>
								<span>Continue with Apple</span>
							</button>
						</div>
						<p className="mt-10 text-center text-sm text-gray-500">
							Not a member?{" "}
							<Link
								href="/register"
								className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
							>
								Sign up here
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Page;
