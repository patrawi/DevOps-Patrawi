const redis = require('redis');
const configure = require('./configure');

const config = configure();
const dotenv = require('dotenv');
dotenv.config();

const redisConfig = {
  password: process.env.REDIS_PASSWORD || 'password',
  uri:
    `redis://${process.env.REDIS_ENDPOINT_URL}` ||
    `redis://${config.redis.host}:${config.redis.port}`,
};

const db = redis.createClient({
  url: redisConfig.uri,
  username: 'default',
  password: redisConfig.password,
  retry_strategy: () => {
    return new Error('Retry time exhausted');
  },
});
async function createConnection() {
  await db.connect();

  return db;
}
createConnection();
module.exports = db;
