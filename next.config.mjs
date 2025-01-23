/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['res.cloudinary.com'], // Allow Cloudinary domain
    },
    // Uncomment if you need to export static HTML
    // output: "export",
    trailingSlash: true,
  };
  
  export default nextConfig;
  