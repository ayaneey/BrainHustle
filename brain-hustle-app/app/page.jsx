"use client";

import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
// import { NextUIProvider } from "@nextui-org/react";
import Homepage from "../components/Homepage";
import Hero from "../components/Hero";
import Button from "./common/components/Button";
import Product from "../components/Product/product";
import KeyServices from "../components/KeyServices/services";
import Testimonials from "../components/Testimonials/Testimonials";
import Success from "../components/Success/Success";
import Footer from "../components/Footer/Footer";

function Home() {
	const { isSignedIn, isLoaded } = useUser();
	const router = useRouter();

	// Debug logs
	console.log("Debug - isLoaded:", isLoaded);
	console.log("Debug - isSignedIn:", isSignedIn);

	// Redirect to dashboard if user is signed in
	useEffect(() => {
		console.log(
			"Debug - useEffect running. isLoaded:",
			isLoaded,
			"isSignedIn:",
			isSignedIn
		);
		if (isLoaded && isSignedIn) {
			console.log("Debug - About to redirect to dashboard");
			router.push("/dashboard");
		}
	}, [isLoaded, isSignedIn, router]);

	// Show loading while checking auth status
	if (!isLoaded) {
		console.log("Debug - Showing loading");
		return (
			<div className="flex items-center justify-center min-h-screen">
				Loading...
			</div>
		);
	}

	console.log("Debug - Rendering main page");
	const title = "";
	return (
		<div className="">
			<Hero />
			{/* <Button title={title} /> */}
			<Product />
			<KeyServices />
			<Testimonials />
			<Success />
			<Footer />
		</div>
	);
}

export default Home;
