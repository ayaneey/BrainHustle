"use client";

import React, { useEffect, useState } from "react";

function Button({ title, smallOnMobile, mediumOnMobile }) {
	const buttonStyle = {
		width: "200px",
		borderRadius: "8px",
		gap: "10px",
		padding: "12px 30px",
	};

	if (smallOnMobile) {
		// Styling smaller buttons on smaller screens
		buttonStyle.width = "130px";
		buttonStyle.padding = "6px 8px";
	}

	if (mediumOnMobile) {
		// Styling smaller buttons on medium screens
		buttonStyle.width = "130px";
		buttonStyle.padding = "6px 8px";
	}

	const [marginLeft, setMarginLeft] = useState("70px");

	useEffect(() => {
		const handleResize = () => {
			const screenWidth = window.innerWidth;

			if (screenWidth >= 320 && screenWidth < 350) {
				setMarginLeft("70px");
			} else if (screenWidth >= 350 && screenWidth <= 444) {
				setMarginLeft("100px");
			} else if (screenWidth >= 445 && screenWidth <= 600) {
				setMarginLeft("90px");
			} else {
				setMarginLeft("70px"); // Default marginLeft
			}
		};

		// Add event listener for window resize
		window.addEventListener("resize", handleResize);

		// Initial call to set the margin based on the current window width
		handleResize();

		// Remove the event listener when the component unmounts
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div
			className="bg-box text-primaryColor hover.bg-gray-700 hover:text-white rounded-md p-2 inline-flex items-center"
			style={{ marginLeft, textAlign: "center" }}
		>
			<button className="p-2" style={buttonStyle}>
				{title} Get in Touch
			</button>
		</div>
	);
}

export default Button;
