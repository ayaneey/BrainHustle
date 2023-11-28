import React from "react";

function Homepage() {
	return (
		<div className="">
			<div className="flex flex-col items-center">
				{/* Image Container */}
				<div className="sm-phone:w-[250px] sm:w-[260px] md:w-[320px] sm-phone:mt-10 lg-phone:w-[300px] lg:w-[400px] xl:w-[450px]">
					<img
						src="./images/pupil.svg"
						alt="Home"
						className="w-full max-w-full"
					/>
				</div>
				{/* Button Container */}
				{/* <div className="w-full max-w-full sm:w-full sm:mt-4 md:w-1/2 md:text-center xl-phone:w-1/2 xl-phone:mt-8 2xl-phone:w-1/2 2xl-phone:mt-4 2xl-tablet:justify-end">
					<button className="bg-gray-500/100 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded w-full mt-2 lg-tablet:mx-auto text-center xl-phone:text-sm lg-phone:p-4 xl-phone:p-4 xl-phone:mt-2 xl-phone:-ml-3.5 2xl-phone:text-md 2xl-phone:p-4 2xl-phone:mb-4 2xl-phone:-ml-3.5 sm-tablet:p-4 md-tablet:ml-24 md-tablet:mt-4 md-tablet:p-6 lg:mt-4 lg-phone:w-56 lg-phone:ml-20 md-phone:ml-20 md-phone:p-4  xl-phone:w-52 xl:mt-6 xl:text-white xl:text-center xl:font-raleway xl-text-30 xl:font-normal xl:leading-120 xl:tracking-wide sm-tablet:mt-0 xl-tablet:mt-0 sm-phone:w-1/2 sm-phone:ml-20 md-phone:w-1/2 sm-phone:p-4  lg-phone:w-1/2 mx-auto">
						Get In Touch
					</button>
				</div> */}
			</div>
		</div>
	);
}

export default Homepage;
