/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
module.exports = {
  env: {
    apiHost: 'https://dailypost-backend-production.up.railway.app',
    publicAccessToken: "8defe4cbc082b18e691b01a032074456caae8b9dea8137e1b61c87d6a37b29aa44e462aa132c68ff05d50514c7d0e1a13389bd9580176f1e92dc1eb648f75509a3e1e13dd7381c0e827bb0c32ad491bd838d9c12d2ea518e838a28f35c52c3679042735e24d94a6816d695892328563ae6644803ac08fdc48a5301856e19be6c"
  },
  images: {
    domains: ['localhost']
  },
}
