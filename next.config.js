// next.config.js
module.exports = {
  images: {
    domains: ['images.unsplash.com', 'ipfs.io/ipfs/'],
  },
  env: {
    APPLICATION_SECRET: process.env.APPLICATION_SECRET,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    SECRET : process.env.SECRET,
    NEXT_PUBLIC_MORALIS_APP_ID: process.env.NEXT_PUBLIC_MORALIS_APP_ID,
    NEXT_PUBLIC_MORALIS_SERVER_URL: process.env.NEXT_PUBLIC_MORALIS_SERVER_URL
  }
}