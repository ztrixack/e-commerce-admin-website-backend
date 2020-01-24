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
  database: {
    connector: process.env.DATABASE_CONNECTOR,
    url: process.env.DATABASE_URL,
    sql: process.env.DATABASE_CONNECTOR === 'postgresdb',
  },
  jwt: {
    salt: 13,
    accessToken: {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expire: process.env.JWT_ACCESS_TOKEN_EXPIRE,
      algorithm: process.env.JWT_ACCESS_TOKEN_ALGORITHM,
    },
    refreshToken: {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expire: process.env.JWT_REFRESH_TOKEN_EXPIRE,
      algorithm: process.env.JWT_REFRESH_TOKEN_ALGORITHM,
    },
  },
  allowedOrigins: (process.env.ALLOWED_ORIGINS || '').split(','),
};

console.log('config: ' + JSON.stringify(config));

module.exports = config;
