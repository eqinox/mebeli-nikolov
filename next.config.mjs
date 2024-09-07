/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '1337', // For development purposes
                // You can specify pathname if you want to limit it to specific paths
            },
            {
                protocol: 'https',
                hostname: 'mebeli-nikolov.s3.eu-north-1.amazonaws.com',
                // No port needed for standard https requests
                // Optionally, you can specify pathname to limit to specific image paths
            }
        ],
    }
};

export default nextConfig;
