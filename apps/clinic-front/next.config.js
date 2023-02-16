const nextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    async redirects() {
        return [
            {
                source: "/specializations",
                destination: "/specializations/adult",
                permanent: true,
            },
        ];
    },
    images: {
        domains: [
            "lucem.fra1.cdn.digitaloceanspaces.com",
            "tube-can.fra1.cdn.digitaloceanspaces.com",
            "lucem-clinic.fra1.digitaloceanspaces.com",
            "94.247.128.224",
            "pulse-backup-kyrg.s3.eu-central-1.amazonaws.com",
        ],
    },
    webpack: (config) => {
        config.module.rules.push(
            {
                test: /\.svg$/,
                issuer: {
                    // test: /\.(js|ts)x?$/,
                    // for webpack 5 use
                    and: [/\.(js|ts)x?$/],
                },

                use: ["@svgr/webpack"],
            },
            {
                test: /\.(png|jpe?g|gif|jp2|webp)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                },
            },
        );

        return config;
    },
};

module.exports = nextConfig;
