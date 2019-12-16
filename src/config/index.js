const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const result = dotenv.config();
if (!result) {
  throw new Error("Couldn't find .env file");
}

const config = {
  debug: process.env.NODE_ENV !== 'production',
  port: parseInt(process.env.PORT || '5000', 10),
  api: {
    prefix: '/api/v1',
  },
  mongodb: {
    url: process.env.MONGO_URL,
  },
  jwt: {
    salt: 13,
    secret: process.env.JWT_SECRET,
  },
  allowedOrigins: (process.env.ALLOWED_ORIGINS || '').split(','),
};

module.exports = config;