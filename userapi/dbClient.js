const Redis = require('ioredis');
const configure = require('./configure');
const dotenv = require('dotenv');
dotenv.config();
const config = configure({
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    url: process.env.REDIS_ENDPOINT_URL,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  },
});

const db = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
  retry_strategy: () => {
    return new Error('Retry time exhausted');
  },
});

process.on('SIGINT', function () {
  db.quit();
  process.exit(0);
});
module.exports = db;
