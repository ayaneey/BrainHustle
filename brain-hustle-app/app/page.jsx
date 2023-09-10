import React from "react";
import Homepage from "../components/Homepage";

function Home() {
	return (
		<div className="mt-4 flex flex-col lg:flex-row xl:ml-8">
			<div className="lg:w-1/2">
				<h1 className="custom-h1 text-2xl sm:text-5xl sm:ml-5 md:text-4xl lg:text-4xl xl:text-7xl sm-phone:text-4xl sm-phone:text-center md-phone:text-5xl sm-tablet:text-5xl font-semibold font-raleway-700 text-base-black leading-[1.5] xl:leading-[1.2] tracking-[3.78px] max-w-[674px] xl:mt-12 xl:flex xl:flex-col ">
					<span className="xl:mb-4">Hustle Hard, </span>
					<span>Excel Harder!</span>
				</h1>

				<p className="text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg mt-4 xl:mt-14 sm-phone:text-sm custom-paragraph1">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi
					earum consectetur saepe! Assumenda quidem nobis ea, cupiditate aliquid
					a quam consectetur porro asperiores aspernatur. Accusantium excepturi
					ducimus vel eius aliquam.
				</p>
				<button className="custom-button mt-4 sm:mt-20 md:mt-28 lg:mt-6 xl:mt-12 xl:text-white xl:text-center xl:font-raleway xl:text-30 xl:font-normal xl:leading-120 xl:tracking-wide">
					Get In Touch
				</button>
			</div>
			<div className="lg:w-1/2 md:w-full">
				{" "}
				{/* Adjust width for md */}
				<Homepage />
			</div>
		</div>
	);
}

export default Home;
