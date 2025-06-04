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
		serverActions: {
			allowedOrigins: ["localhost:3000"],
		},
	},
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
