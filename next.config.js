/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
module.exports = {
  env: {
    apiHost: 'https://dailypost-backend-production.up.railway.app',
    publicAccessToken: "e2f7501cc2375ccab2ce1cf698cb24a6ada4576a6e5ad0eab89c24f279d4b5f468aec0ce96ac3881f1bdddefe76d89a45df3d9216b07bf0466d8dc6b2cff3a7a54cf1ff3f8acdd0ef98fbd2e4706b9bf179ba340899586ae648d2dcf2512851bbc6ba7b2488e71b68c1f041e7659ea334daf8d602c1c06c9ecdf7f7bce0c3a44"
  },
  images: {
    domains: ['dailypost-backend-production.up.railway.app']
  },
}
