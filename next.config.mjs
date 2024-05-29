/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {
        esmExternals: "loose", // <-- add this
        serverComponentsExternalPackages: ["mongoose"], // <-- and this
    },
}

export default nextConfig
