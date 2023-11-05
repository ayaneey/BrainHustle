import React, { useState } from "react";

function useToggle(initialState = false) {
	const [isVisible, setIsVisible] = useState(initialState);

	const toggle = () => {
		setIsVisible((prevVisible) => !prevVisible);
	};

	const show = () => {
		setIsVisible(true);
	};

	const hide = () => {
		setIsVisible(false);
	};

	return {
		isVisible,
		toggle,
		show,
		hide,
	};
}

export default useToggle;
