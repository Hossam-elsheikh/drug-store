import createNextIntlPlugin from 'next-intl/plugin';


const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "t3.ftcdn.net",
            },
            {
                protocol: "https",
                hostname: "pharmacypluskw.com",
            },
            {
                protocol: "https",
                hostname: "freepngimg.com",
            },
            {
                protocol: "https",
                hostname: "encrypted-tbn0.gstatic.com",
            },
            // Add these new patterns
            {
                protocol: "http",
                hostname: "localhost",
            },
            {
                protocol: "http",
                hostname: "127.0.0.1",
            },
            {
                protocol: "https",
                hostname: "demo.myfatoorah.com",
            },
        ],
        domains: ['localhost', '127.0.0.1'], // This is an alternative way to add local domains
    }
};

export default withNextIntl(nextConfig);