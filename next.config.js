/** @type {import('next').NextConfig} */

const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const nextConfig = {
  reactStrictMode: true,

  webpack: (config, { isServer }) => {
    // Add the CopyWebpackPlugin to the plugins array
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, "data"),
            to: path.join(__dirname, ".next/server/data"),
          },
        ],
      })
    );

    // Return the updated configuration
    return config;
  },

  // async headers() {
  //   return [
  //     {
  //       source: "/data/(.*)",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "public, max-age=3600",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

// webpack: (config, { isServer }) => {
//   // Add the CopyWebpackPlugin to the plugins array
//   config.plugins.push(
//     new CopyWebpackPlugin({
//       patterns: [
//         {
//           from: path.join(__dirname, "data"),
//           to: path.join(__dirname, ".next/data"),
//         },
//       ],
//     })
//   );

//   // Return the updated configuration
//   return config;
// },

module.exports = nextConfig;
