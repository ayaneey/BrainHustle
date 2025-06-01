import React from "react";

function Button({ title, onClick }) {
	return (
		<button
			onClick={onClick}
			className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
		>
			{title}
		</button>
	);
}

export default Button;
