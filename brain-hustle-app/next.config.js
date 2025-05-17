/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "unsplash.com", // remove https://
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.google.co.uk", // remove https://
				port: "",
				pathname: "/**",
			},
		],
	},
	experimental: {
		serverActions: true,
	},
};

module.exports = nextConfig;
