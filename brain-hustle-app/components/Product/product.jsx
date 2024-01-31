"use client";
import React from "react";
import Button from "../../app/common/components/Button";
import { Card, CardFooter, Image } from "@nextui-org/react";

function Product() {
	const list = [
		{
			svg: "images/book2.svg",
			title: "Interactive Learning",
			text: "Dive into engaging lessons and interactive quizzes",
		},
		{
			svg: "images/expert.svg",
			title: "Exam Mastery",
			text: "Ace your exams with our comprehensive exam prep",
		},
		{
			svg: "images/handshake.svg",
			title: "Community Support",
			text: "Join a vibrant community of students and teachers",
		},
	];
	return (
		<div className="flex flex-col justify-center items-center xl:ml-72">
			<div className="w-3/4 flex-1 sm:w-full sm:flex justify-center xl:mr-60 xl:mb-12">
				<h1 className="sm:text-[29px] md:text-[30px] xl:text-[35px] xl:mr-14 mb-12 font-semibold font-raleway-700 text-base-black">
					Your journey to success begins with us
				</h1>
			</div>
			<div className="flex justify-center mb-24">
				<div className="gap-4 sm:gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:ml-4 lg:ml-4 ">
					{list.map((item, index) => (
						<Card
							shadow="sm"
							key={index}
							isPressable
							onPress={() => console.log("item pressed")}
							className={
								index === 2
									? "md:col-span-1 xl:col-span-1 md:mr-4 lg:mr-4 xl:mr-4 mb-4 sm:col-span-2 sm:mx-auto sm:mb-0 lg:mb-0"
									: "mb-4 sm:mb-0"
							}
						>
							<CardFooter className="text-small justify-between flex items-center">
								<img
									src={item.svg}
									className="block h-20 sm:w-16 mr-4 md:w-16 xl:w-20"
									alt="Product icon"
								/>
								<div>
									<h1 className="text-[14px] font-bold mb-6 sm:mb-4">
										{item.title}
									</h1>
									<p className="text-default-500">{item.text}</p>
								</div>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
			<div className="xl:align-middle xl:mr-60 xl:mb-16">
				<Button title="Try for yourself" />
			</div>
		</div>
	);
}

export default Product;
