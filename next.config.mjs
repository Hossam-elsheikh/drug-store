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
        ]
    }
};

export default withNextIntl(nextConfig);