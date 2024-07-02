const { withConfig } = require('next/config');

const nextConfig = {
    reactStrictMode: true, // Optional: Add this if you haven't already
    // Other Next.js configurations...
    experimental: {
      missingSuspenseWithCSRBailout: false, // The option you want to add
    },
  };

module.exports = withConfig(nextConfig);