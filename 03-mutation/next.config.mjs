/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [50, 75],
    remotePatterns: [{ hostname: "res.cloudinary.com" }],
  },
};

export default nextConfig;
