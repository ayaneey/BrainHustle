"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SignUpModal() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				alert("Sign up successful!");
				// Redirect to a new page or perform any other action upon successful sign-up
			} else {
				const data = await response.json();
				alert(data.message || "Sign up failed.");
			}
		} catch (error) {
			console.error("Sign up failed:", error);
			alert("Sign up failed. Please try again later.");
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
		<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<form className="space-y-6" onSubmit={handleSubmit}>
				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Name
					</label>
					<div className="mt-2">
						<input
							id="name"
							name="name"
							type="text"
							value={formData.name}
							onChange={handleChange}
							autoComplete="name"
							required
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-left pl-3"
						/>
					</div>
				</div>
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
							value={formData.email}
							onChange={handleChange}
							autoComplete="email"
							required
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-left pl-3"
						/>
					</div>
				</div>
				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Password
					</label>
					<div className="mt-2">
						<input
							id="password"
							name="password"
							type="password"
							value={formData.password}
							onChange={handleChange}
							autoComplete="new-password"
							required
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-left pl-3"
						/>
					</div>
				</div>
				<div>
					<button
						type="submit"
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Sign Up
					</button>
				</div>
			</form>
			<p className="mt-10 text-center text-sm text-gray-500">
				Already have an account?{" "}
				<Link
					href="/login"
					className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
				>
					Log in here
				</Link>
			</p>
		</div>
	);
}
