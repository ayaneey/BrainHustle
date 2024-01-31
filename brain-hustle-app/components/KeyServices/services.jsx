import React from "react";
import Card from "./Card";
import { keyServicesCardData } from "./Card";

export default function services() {
	return (
		<div>
			<div className=" w-full flex justify-center   ">
				<div className=" md:w-10/12  flex  flex-wrap  md:justify-center md:flex-row flex-col    p-10  gap-8 ">
					{keyServicesCardData.map((service) => (
						<Card
							key={service.id}
							title={service.title}
							description={service.description}
							imgSrc={service.imgSrc}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
