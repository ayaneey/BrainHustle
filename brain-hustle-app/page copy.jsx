import React from "react";
import Homepage from "../components/Homepage";

function Home() {
	return (
		<div className="mt-4 flex flex-col xl:flex-row xl:ml-8 ">
			<div></div>
			<div className="xl:w-1/2 bg-blue-400">
				<h1 className="custom-h1 text-2xl sm:text-5xl sm:ml-5 md:text-4xl lg:text-4xl xl:text-7xl sm-phone:text-4xl sm-phone:text-center md-phone:text-5xl sm-tablet:text-5xl font-semibold font-raleway-700 text-base-black leading-[1.5] xl:leading-[1.2] tracking-[3.78px] max-w-[674px] xl:mt-12 xl:flex xl:flex-col ">
					<span className="xl:mb-4">Hustle Hard, </span>
					<span>Excel Harder!</span>
				</h1>
				<p className="text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg mt-4 xl:mt-14 sm-phone:text-sm custom-paragraph1 md-tablet:p-9">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi
					earum consectetur saepe! Assumenda quidem nobis ea, cupiditate aliquid
					a quam consectetur porro asperiores aspernatur. Accusantium excepturi
					ducimus vel eius aliquam.
				</p>
			</div>

			<div className="w-full max-w-full md:w-1/2 lg-phone:ml-12 md:text-center xl-phone:w-1/2 xl-phone:mt-8 xl-phone:ml-14 2xl-phone:w-1/2 2xl-phone:ml-40 2xl-phone:mt-12 2xl-tablet:justify-end">
				{/* <button className="bg-gray-500/100 md-tablet:w-2/5 md-tablet:px-3 md-tablet:py-2 md-tablet:text-sm hover:bg-gray-400 text-white font-bold border-b-4 border-gray-700 hover:border-gray-500 rounded w-full mt-2 lg-tablet:mx-auto text-center xl-phone:text-sm lg-phone:p-5 xl-phone:p-5 xl-phone:mt-2 2xl-phone:ml-2 2xl-phone:text-md 2xl-phone:p-5 2xl-phone:mb-4 sm-tablet:p-5 sm-tablet:ml-9 lg:mt-4 md-phone:ml-20 md-phone:p-5 xl-phone:w-52 xl:mt-12 xl:text-white xl:text-center xl:font-raleway xl-text-30 xl:font-normal xl:leading-120 xl:tracking-wide sm-tablet:mt-0 xl-tablet:mt-0 sm-phone:w-1/2 sm-phone:ml-20 sm-phone:mt-12 md-phone:w-1/2 md-phone:mt-16 sm-phone:p-4 lg-phone:ml-14 lg-phone:w-1/2 mx-auto md-laptop:-ml-96">
					Get In Touch
				</button> */}
			</div>
			<div className="xl:w-1/2 flex flex-col items-center xl:items-start 2xl-phone:w-1/8 md-tablet:-ml-44">
				<div>
					{" "}
					<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded md-tablet:ml-96">
						Button
					</button>{" "}
				</div>
				<Homepage />
			</div>
		</div>
	);
}

export default Home;
