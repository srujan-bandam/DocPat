require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  HTTPS_KEY: process.env.HTTPS_KEY || './certificates/server.key',
  HTTPS_CERT: process.env.HTTPS_CERT || './certificates/server.cert',
};
