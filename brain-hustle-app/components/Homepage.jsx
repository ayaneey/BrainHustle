import React from "react";

function Homepage() {
	return (
		<div className="sm:w-full max-w-xs sm:max-w-sm lg:max-w-lg xl:max-w-4xl mx-auto custom-image-class sm-phone:max-w-xs md-phone:max-w-xs lg-phone:max-w-xs xl-phone:max-w-1 sm-tablet:max-w-xs lg-tablet:max-w-sm xl-tablet:max-lg sm:order-first md:max-h-60 md:mr-8 sm-tablet:ml-5 xl-phone:mt-9">
			<div className="flex flex-col items-center bg-green-600 xl:w-full sm-tablet:flex-col sm-tablet:ml-38">
				{/* Image Container */}
				<div className="w-full max-w-full md:w-3/4 md-tablet:w-4/5 lg:w-4/5 xl:w-4/5 2xl:w-4/5 ">
					<img
						src="./images/pupil.svg"
						alt="Home"
						className="w-full max-w-full"
					/>
				</div>
				{/* Button Container */}
				<div className="w-full max-w-full sm:w-full sm:mt-4 md:w-1/2 md:text-center xl-phone:w-1/2 xl-phone:mt-8 2xl-phone:w-1/2 2xl-phone:mt-4">
					<button className="custom-button text-center mt-2 md:ml-8 md:text-center md-tablet:text-center md:text-red-800 xl-phone:text-sm xl-phone:p-4 xl-phone:mt-2 xl-phone:-ml-3.5 2xl-phone:text-md 2xl-phone:p-4 2xl-phone:mb-4 2xl-phone:-ml-3.5 sm-tablet:p-4 md-tablet:ml-24 md-tablet:mt-4 md-tablet:p-6 lg:mt-4 lg-phone:w-56 lg-phone:ml-12 md-phone:ml-16 xl-phone:w-52 xl:mt-6 xl:text-white xl:text-center xl:font-raleway xl:text-30 xl:font-normal xl:leading-120 xl:tracking-wide sm-tablet:mt-0 xl-tablet:mt-0">
						Get In Touch
					</button>
				</div>
			</div>
		</div>
	);
}

export default Homepage;
