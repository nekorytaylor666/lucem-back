const withTM = require("next-transpile-modules")([
    "@fullcalendar/common",
    "@fullcalendar/daygrid",
    "@fullcalendar/react",
    "@fullcalendar/timegrid",
    "@lucem/ui",
    "@lucem/shared-gql",
]);

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
    experimental: {
        externalDir: true, // This allows importing TS/TSX from outside of the current Next.js project root directory. See: https://github.com/vercel/next.js/pull/22867
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
    env: {
        backendUrl: "http://94.247.128.224:5000",
    },
    webpack: (config) => {
        config.module.rules.push(
            {
                test: /\.svg$/,
                issuer: {
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

module.exports = withTM(nextConfig);
