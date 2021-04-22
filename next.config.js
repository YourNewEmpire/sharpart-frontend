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
  }
}