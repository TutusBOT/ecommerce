/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	// output: "standalone",
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: ["mongoose"],
	},
	webpack: (config) => {
		config.experiments = { ...config.experiments, topLevelAwait: true };
		return config;
	},
};
