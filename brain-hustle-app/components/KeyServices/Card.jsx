"use client";

import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function servicecards() {
	const list = [
		{
			title: "Orange",
			img: "https://images.unsplash.com/photo-1700771266232-7a31af68eb31?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
			price: "$5.50",
		},
		{
			title: "Tangerine",
			img: "/images/fruit-2.jpeg",
			price: "$3.00",
		},
		{
			title: "Raspberry",
			img: "/images/fruit-3.jpeg",
			price: "$10.00",
		},
		{
			title: "Raspberry",
			img: "/images/fruit-3.jpeg",
			price: "$10.00",
		},
	];

	return (
		<div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
			{list.map((item, index) => (
				<Card
					shadow="sm"
					key={index}
					isPressable
					onPress={() => console.log("item pressed")}
				>
					<CardBody className="overflow-visible p-0">
						<Image
							shadow="sm"
							radius="lg"
							width="100%"
							alt={item.title}
							className="w-full object-cover h-[140px]"
							src={item.img}
						/>
					</CardBody>
					<CardFooter className="text-small justify-between">
						<b>{item.title}</b>
						<p className="text-default-500">{item.price}</p>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
