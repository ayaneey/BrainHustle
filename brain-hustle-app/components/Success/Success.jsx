import React from "react";

function Success() {
	return (
		<div className="flex flex-col items-center">
			<h1 className="sm:text-[29px] md:text-[30px] xl:text-[35px] xl:mr-14 mb-12 font-bold font-raleway-700 text-base-black">
				Unmatched Success Rates for our Students
			</h1>
			<div className="flex-1 flex">
				<div className="flex-1 text-center">
					<p className="mb-4 text-lg font-raleway-400 max-w-[400px] mx-auto">
						At BrainHustle, we take pride in our unmatched success rates in
						helping students excel in their exams. Our platform is designed to
						provide personalized learning experiences, empowering students to
						grasp challenging concepts and excel academically. The testimonials
						of many students reflect the behind-the-scenes efforts of our
						dedicated team and the effectiveness of the BrainHustle approach.
					</p>
				</div>
				<div className="flex-1">
					<img
						src="./images/successDay.svg"
						alt="students celebrating"
						className="mx-auto max-w-[auto]"
					/>
				</div>
			</div>
		</div>
	);
}

export default Success;
