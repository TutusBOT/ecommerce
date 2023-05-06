/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: ["mongoose", "bcrypt"],
	},
	webpack: (config) => ({
		...config,
		experiments: { ...config.experiments, topLevelAwait: true },
	}),
};
