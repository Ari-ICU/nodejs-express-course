import createMDX from "@next/mdx";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isGithubActions ? "/nodejs-express-course" : "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  // Allow .mdx files to be used as pages/imports in the App Router
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  // remark/rehype plugins: use string names only (Turbopack requirement)
  // Code syntax highlighting is handled client-side via Shiki in CodeBlock.
});

export default withMDX(nextConfig);
