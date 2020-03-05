const withImages = require('next-images');
const dotEnv = require('dotenv');

const prod = process.env.NODE_ENV === 'production';

if (!prod) {
  dotEnv.config();
}

module.exports = withImages({
  env: {
    MONGO_DB: process.env.MONGO_DB,
    JWT_SECRET: process.env.JWT_SECRET,
  },
});

module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  }
}
