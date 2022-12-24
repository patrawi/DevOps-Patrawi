const redis = require('redis');
const configure = require('./configure');

const config = configure();
const db = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,

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
