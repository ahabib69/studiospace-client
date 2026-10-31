const nextConfig = {
  poweredByHeader: false,
  async rewrites() {
    const target = process.env.API_PROXY_URL?.replace(/\/$/, "");
    return target
      ? [{ source: "/api/:path*", destination: `${target}/api/:path*` }]
      : [];
  },
};
export default nextConfig;
