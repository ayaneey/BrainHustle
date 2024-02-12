import React from "react";
import Image from "next/image";

function Card({ imgSrc, title, description }) {
	return (
		<div className=" flex bg-white  md:w-[47%] lg:w-[47%] xl:w-[40%] md:gap-5 sm:gap-10 lg:gap-10 xl:gap-10  p-10 rounded-md ">
			<div>
				<Image
					src={imgSrc}
					width={100}
					height={100}
					className="md:w-44 md:h-44 lg:w-40 h-40"
				/>
			</div>
			<div>
				<h1 className=" sm:text-3xl md:text-2xl lg:text-3xl  md:mb-5">
					{title}
				</h1>
				<p className=" text-black/50 text-base">{description}</p>
			</div>
		</div>
	);
}

export default Card;

export const keyServicesCardData = [
	{
		id: 1,
		title: " Engaging Lessons",
		description:
			"Engaging lessons with animations, videos, and quizzes make learning fun!",
		imgSrc: "/images/lessons.svg",
	},
	{
		id: 2,
		title: " Personalised Study ",
		description:
			"Customised plans for your pace and style, paving your path to exam success",
		imgSrc: "/images/journey.svg",
	},
	{
		id: 3,
		title: "Targeted Focus",
		description:
			"Master your GCSE subjects with laser-focused resources tailored for exam success.",
		imgSrc: "/images/target.svg",
	},
	{
		id: 4,
		title: "Progress Tracking",
		description: "Track your journey, see strengths and areas to improve.",
		imgSrc: "/images/progress.svg",
	},
];
