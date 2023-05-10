
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh']
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  experimental: {
    appDir: true,
    serverActions : true,
    serverComponentsExternalPackages: ['@tremor/react']
  },
  reactStrictMode:false,
  async rewrites() {
    return [
      {
        source: "/back/:path*",
        destination: "http://localhost:5000/:path*",
      },
    ]
  },
  webpack: ( config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack } ) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
     if (isServer) { config.externals.push({ bufferutil: "bufferutil", "utf-8-validate": "utf-8-validate", }); } 
     
     return config; 
  }, 
};

module.exports = nextConfig;