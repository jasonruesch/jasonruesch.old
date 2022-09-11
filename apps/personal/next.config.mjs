import nextMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypePrism from '@mapbox/rehype-prism';
import { withNx } from '@nrwl/next/plugins/with-nx.js';

/** @type {import('@nrwl/next/plugins/with-nx').WithNxOptions} */
const nxConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['jsx', 'tsx', 'mdx'],
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
    images: {
      allowFutureImage: true,
      // unoptimized: true,
    },
  },
  ...nxConfig,
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
});

export default withNx(withMDX(nextConfig));
