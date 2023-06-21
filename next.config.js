/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  // Other Next.js configuration options...

  webpack: (config, { isServer }) => {
    // Add the CopyWebpackPlugin to the plugins array
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, "data"),
            to: path.join(__dirname, ".next/data"),
          },
        ],
      })
    );

    // Return the updated configuration
    return config;
  },
};

module.exports = nextConfig;
