/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			screens: {
				"sm-phone": "320px", // Common small phone
				"md-phone": "375px", // Common medium phone
				"lg-phone": "414px", // Common large phone
				"xl-phone": "480px", // Common extra-large phone
				"2xl-phone": "500px", // Common double extra-large phone
				"sm-tablet": "601px", // Small tablets
				"md-tablet": "640px", // Medium tablets
				"lg-tablet": "768px", // Large tablets
				"xl-tablet": "840px", // Extra large tablets
				"2xl-tablet": "1023px", // Double extra large tablets
				"md-laptop": "1280px", // Medium laptops
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			fontFamily: {
				raleway: ["Raleway", "sans"],
			},
			colors: {
				background: "#F1F7F6",
				box: "#8E9399",
				primaryColor: "#F5F5F5",
				secondTextColor: "#737373",
				baseBlack: "#23242A",
			},
		},
	},
	plugins: [require("daisyui")],
};
