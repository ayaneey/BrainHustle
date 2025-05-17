/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
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
				dashboard: "#84a98c",
				dashboardDrop: "#52796f",
				secondBg: "#cfe1b9",
				greenShade: "#95d5b2",
				greyShade: "#adb5bd",
				lightTeal: "#75b9be",
				lightGrey2: "#b0d0d3",
				MiddleSection: "#FAF9F6",
				MiddleSection2: "#F8F4EC",
				BackgroundAccent: "#fec3a6",
				PrimaryBtns: "#5C6AC4",
				textCustom: "#333333",
				lightOrange: "#f7a072",
				dashboardBg: "#d8d8d8",
			},
		},
	},
	darkMode: "class",
	plugins: [nextui()],
};
