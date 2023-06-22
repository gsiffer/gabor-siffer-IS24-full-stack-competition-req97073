/** @type {import('next').NextConfig} */

const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: "/data/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
