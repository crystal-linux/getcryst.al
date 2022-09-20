// next.config.mjs
import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";
// import { i18n } from "./next-i18next.config"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    config.experiments.topLevelAwait = true;

    return config;
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  experimental: { images: { allowFutureImage: true } },
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/crystal-linux/getting-started",
        permanent: true,
      },
      {
        source: "/discord",
        destination: "https://discord.com/invite/76RR4VC45V",
        permanent: true,
      },
    ];
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
});

export default withMDX(nextConfig);
