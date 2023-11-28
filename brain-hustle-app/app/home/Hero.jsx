import React from "react";
import Homepage from "../../components/Homepage";
import Button from "../common/components/Button";

function Hero() {
	const title = "";

	const h1Styles = {
		lineHeight: "110%",
	};

	return (
		<div>
			<div className="w-full flex flex-col sm:flex-row p-5 mb-24">
				{/* Content Container */}
				<div className="sm:w-1/2 flex flex-col justify-center">
					<h1
						className="font-semibold font-raleway-700 text-base-black text-center leading-[1.5] tracking-[3.78px] sm:text-[35px] max-w-[674px] sm-phone:text-[35px] md-phone:text-[43px] lg-phone:text-[47px] xl-phone:text-[47px] md:text-4xl lg:text-5xl xl:text-[50px]"
						style={h1Styles}
					>
						<span>
							<span>Hustle Hard,</span>
							<br />
							<span>Excel Harder!</span>
						</span>
					</h1>
					<p className="text-base text-center custom-paragraph1 mt-2 md:mt-5 lg:mt-8 xl:mt-10 sm:text-[13px] xl:ml-28 xl:mr-40">
						Conquer GCSEs with Brain Hustle! Tailored Maths and English
						resources, interactive lessons, practice exams, and personalised
						study plans. Ace your exams - learn with success!
					</p>

					<div className="mt-5 md:mt-10 sm:mt-10 sm-phone:mt-10 xl:mr-16">
						<Button
							title="Get in Touch"
							smallOnMobile={true}
							mediumOnMobile={true}
						/>
					</div>
				</div>
				{/* Image Container */}
				<div className="sm:w-1/2 sm:ml-auto">
					<Homepage />
				</div>
			</div>
			{/* <Homepage /> */}
		</div>
	);
}

export default Hero;
