/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Optional: Add this if you haven't already
    // Other Next.js configurations...
    experimental: {
      missingSuspenseWithCSRBailout: false, // The option you want to add
    },
};

export default nextConfig;
