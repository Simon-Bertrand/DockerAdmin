
/** @type {import('next').NextConfig} */


const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    appDir: true,
    serverActions : true,
    serverComponentsExternalPackages: ['@tremor/react']
  },
  env : {
    SIO_LOGIN : process.env.SIO_LOGIN,
    SIO_SECRET : process.env.SIO_SECRET,
    API_PORT : process.env.API_PORT
  },
  reactStrictMode:false,
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