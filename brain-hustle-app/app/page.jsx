import React from "react";
import Homepage from "../components/Homepage";
import Hero from "./home/Hero";
import Button from "./common/components/Button";
import Product from "../components/Product/product";

function Home() {
	const title = "";
	return (
		<div className="">
			<Hero />
			{/* <Button title={title} /> */}
			<Product />
		</div>
	);
}

export default Home;
