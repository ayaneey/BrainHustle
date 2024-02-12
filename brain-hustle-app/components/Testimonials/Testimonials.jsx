"use client";

import { FaStar, FaRegStar } from "react-icons/fa";

import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Testimonials() {
	const testimonialData = [
		{
			id: 1,
			text: "The engaging lessons with animations, videos, and quizzes made studying enjoyable! It's a fantastic way to learn complex topics. Highly recommended!",
			author: "Emily Ewing",
			role: "High School Student",
			image: "./images/coverstudent1.svg",
			rating: 5,
		},
		{
			id: 2,
			text: "The personalized study plans allowed me to learn at my own pace. The customized approach and tailored resources were key to my exam success.",
			author: "James Powell",
			role: "College Student",
			image: "./images/student2.svg",
			rating: 4,
		},
		{
			id: 3,
			text: "The targeted focus on GCSE subjects provided exactly what I needed to excel in my exams. The resources were comprehensive, and the progress tracking feature kept me on the right path.",
			author: "Olivia Gribben",
			role: "High School Student",
			image: "./images/student3.svg",
			rating: 5,
		},
	];

	useEffect(() => {
		// Preload images
		testimonialData.forEach((testimonial) => {
			const img = new Image();
			img.src = testimonial.image;
		});
	}, []);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2500,
	};

	return (
		<div className="max-w-screen-lg mx-auto my-8 xl:mt-16">
			<h1 className="text-center text-4xl font-bold xl:mb-11">
				Hear it from our students.
			</h1>
			<Slider {...settings}>
				{testimonialData.map((testimonial) => (
					<div key={testimonial.id} className="px-4">
						<div className="bg-gray-300/30 rounded p-5 lg:p-8 lg:flex lg:flex-col col-span-12 lg:col-span-4">
							<svg
								className="icon inline-block text-inherit fill-current leading-none shrink-0 w-[64px] h-[64px] text-gray-400 mb-1.5 lg:mb-2"
								aria-hidden="true"
								width="64"
								height="64"
								viewBox="0 0 64 64"
							>
								<polygon points="2 36 17 2 26 2 15 36 26 36 26 62 2 62 2 36" />
								<polygon points="38 36 53 2 62 2 51 36 62 36 62 62 38 62 38 36" />
							</svg>

							<blockquote className="leading-relaxed mt-8 lg:mb-8 select-none testimonial-text text-black-500 text-lg">
								<p className="mb-4">{testimonial.text}</p>
								<div className="flex items-center">
									{/* Render star ratings */}
									{Array.from({ length: 5 }).map((_, index) => (
										<span
											key={index}
											className={
												index < testimonial.rating
													? "text-yellow-500"
													: "text-gray-300"
											}
										>
											{index < testimonial.rating ? <FaStar /> : <FaRegStar />}
										</span>
									))}
								</div>
							</blockquote>

							<footer className="flex flex-wrap items-center lg:mt-auto">
								<figure className="shrink-0 mr-1.5 lg:mr-2" aria-hidden="true">
									<img
										className="block w-12 h-12 rounded-full border-2 border-white object-cover focus:outline-none"
										src={testimonial.image}
										alt={testimonial.author}
									/>
								</figure>

								<cite className="text-sm lg:text-base leading-tight lg:leading-tight">
									<strong className="not-italic">{testimonial.author}</strong>
									<span className="block text-gray-500 mt-0.5 lg:mt-1 not-italic">
										{testimonial.role}
									</span>
								</cite>
							</footer>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
}

export default Testimonials;
