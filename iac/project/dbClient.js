const redis = require('redis');
const configure = require('./configure');

const config = configure();
const db = redis.createClient({
  url: 'redis://redis:6379',

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
