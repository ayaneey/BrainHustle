import React from "react";
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
