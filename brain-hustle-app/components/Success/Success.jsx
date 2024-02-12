import React from "react";

function Success() {
	return (
		<div className="bg-gray-800 bg-opacity-25 py-6 xl:mt-16">
			<div className="flex flex-col items-center">
				{/* <h1 className="sm:text-[29px] md:text-[30px] xl:text-[35px] xl:mr-14 mb-12 font-bold font-raleway-700 text-gray-100">
					Unmatched Success Rates for our Students
				</h1> */}
				<div className="flex-1 flex bg-white p-6 rounded-md shadow-md mt-5 mb-5">
					<div className="flex-1">
						<p className=" text-black/50 text-base max-w-[400px] mx-auto leading-9">
							At BrainHustle, we take pride in our unmatched success rates in
							helping students excel in their exams. Our platform is designed to
							provide personalized learning experiences, empowering students to
							grasp challenging concepts and excel academically. The
							testimonials of many students reflect the behind-the-scenes
							efforts of our dedicated team and the effectiveness of the
							BrainHustle approach.
						</p>
					</div>
					<div className="flex-1">
						<img
							src="./images/successDay.svg"
							alt="students celebrating"
							className="mx-auto max-w-[80%] mt-4"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Success;
