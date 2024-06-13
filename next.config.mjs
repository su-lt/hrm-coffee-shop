/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {},
    webpack(config) {
        config.experiments = { ...config.experiments, topLevelAwait: true }
        return config
    },
}

export default nextConfig
