const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src'); // Adjust the path as needed
    return config;
  }
};

module.exports = nextConfig;
