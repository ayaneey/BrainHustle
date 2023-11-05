import React from "react";

function Button({ title }) {
	return (
		<div className="bg-box text-primaryColor hover:bg-gray-700 hover:text-white rounded-md p-2 inline-flex items-center">
			<button
				className="p-2"
				style={{
					width: "200px",
					borderRadius: "8px",
					gap: "10px",
					padding: "12px 30px",
				}}
			>
				{title} Get in Touch
			</button>
		</div>
	);
}

export default Button;
