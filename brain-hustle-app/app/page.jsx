import React from "react";
// import { NextUIProvider } from "@nextui-org/react";
import Homepage from "../components/Homepage";
import Hero from "./home/Hero";
import Button from "./common/components/Button";
import Product from "../components/Product/product";
import KeyServices from "../components/KeyServices/services";
import Testimonials from "../components/Testimonials/Testimonials";

function Home() {
	const title = "";
	return (
		<div className="">
			<Hero />
			{/* <Button title={title} /> */}
			<Product />
			<KeyServices />
			<Testimonials />
		</div>
	);
}

export default Home;
