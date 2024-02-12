import React from "react";

function Button({ title, smallOnMobile, mediumOnMobile }) {
	let buttonStyle = {
		width: "200px",
		borderRadius: "5px",
		gap: "10px",
		padding: "16px 40px",
	};

	if (smallOnMobile || mediumOnMobile) {
		buttonStyle.width = "150px";
		buttonStyle.padding = "12px 20px";
	}

	return (
		<div className="flex justify-center">
			<div className="text-center">
				<button
					className="bg-box text-primaryColor hover:bg-gray-700 hover:text-white rounded-md p-2 inline-flex items-center"
					style={buttonStyle}
				>
					<span className="mx-auto">{title}</span>
				</button>
			</div>
		</div>
	);
}

export default Button;
