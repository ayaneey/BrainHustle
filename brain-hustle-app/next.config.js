/** @type {import('next').NextConfig} */

module.exports = {
	images: {
		remotePatterns: [
			{
				// use this to allow images from a domain, it saves time and effort
				protocol: "https",
				hostname: "https://unsplash.com/",
				port: "",
				pathname: "/***",
			},
			{
				// use this to allow images from a domain, it saves time and effort
				protocol: "https",
				hostname: "https://images.google.co.uk/",
				port: "",
				pathname: "/***",
			},
		],
	},
};
