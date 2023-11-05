import React from "react";
import Homepage from "../../components/Homepage";
import Button from "../common/components/Button";
function Hero() {
	const title = "";
	return (
		<div>
			<div className="w-full flex md:flex-row flex-col">
				<div className="md:w-1/2 p-5">
					<h1 className="custom-h1 md:text-[84px] sm:text-[40px]  font-semibold font-raleway-700 text-base-black leading-[1.5] tracking-[3.78px] max-w-[674px]  flex  flex-col ">
						<span className="">Hustle Hard, </span>
						<span>Excel Harder!</span>
					</h1>
					<p className="text-base custom-paragraph1">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi
						earum consectetur saepe! Assumenda quidem nobis ea, cupiditate
						aliquid a quam consectetur porro asperiores aspernatur. Accusantium
						excepturi ducimus vel eius aliquam.
					</p>
					<div className=" mt-10">
						<Button title={title} />
					</div>
				</div>
				<div className="w-1/2">
					<Homepage />
				</div>
			</div>
		</div>
	);
}

export default Hero;
