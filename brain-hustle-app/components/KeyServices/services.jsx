import React from "react";
import Card from "./Card";
import { keyServicesCardData } from "./Card";

export default function services() {
	return (
		<div>
			<div className=" w-full flex justify-center bg-gray-800 bg-opacity-25   ">
				<div className=" md:w-10/12  flex  flex-wrap  md:justify-center md:flex-row flex-col    p-10  gap-8 ">
					{keyServicesCardData.map((service) => (
						<Card
							key={service.id} // This is a unique key for each card in the list of cards that we are rendering
							title={service.title} // This is the title of the card
							description={service.description} // This is the description of the card
							imgSrc={service.imgSrc} // This is the image source of the card
						/>
					))}
				</div>
			</div>
		</div>
	);
}
