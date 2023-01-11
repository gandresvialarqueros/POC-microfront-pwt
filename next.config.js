/** @type {import('next').NextConfig} */

const NextFederationPlugin = require('@module-federation/nextjs-mf');

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    const { webpack } = options;
    Object.assign(config.experiments, { topLevelAwait: true });
    if (!options.isServer) {
      //config.cache=false
      config.plugins.push(
        new NextFederationPlugin({
          name: "pwt",
          remotes: {
            home: `home@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
          },
          filename: "static/chunks/remoteEntry.js",
          exposes: {
            "./pwt": "./pages/pwt",
            "./pages-map": "./pages-map.js",
          },
          shared: {},
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;
