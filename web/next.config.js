module.exports = {
  images: {
    domains: ["cdn.sanity.io"],
  },
  async redirects() {
    return [
      {
        source: '/category',
        destination: '/categories',
        permanent: true,
      },
    ]
  },
}