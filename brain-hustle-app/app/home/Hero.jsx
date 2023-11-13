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
			<div className="w-full flex flex-col md:flex-row p-5">
				<div className="md:w-1/2 flex flex-col justify-center">
					<h1
						className="font-semibold font-raleway-700 text-base-black text-center leading-[1.5] tracking-[3.78px] max-w-[674px] sm-phone:text-[35px] md-phone:text-[43px] lg-phone:text-[47px] xl-phone:text-[47px] md:text-5xl lg:text-6xl"
						style={h1Styles}
					>
						<span>
							<span>Hustle Hard,</span>
							<br />
							<span>Excel Harder!</span>
						</span>
					</h1>
					<p className="text-base custom-paragraph1 mt-2 md:mt-5 lg:mt-8">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi
						earum consectetur saepe! Assumenda quidem nobis ea, cupiditate
						aliquid a quam consectetur porro asperiores aspernatur. Accusantium
						excepturi ducimus vel eius aliquam.
					</p>
					<div className="mt-5 md:mt-10">
						<Button title={title} smallOnMobile={true} mediumOnMobile={true} />
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
