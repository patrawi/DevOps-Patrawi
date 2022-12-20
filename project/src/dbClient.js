const redis = require('redis');
const configure = require('./configure');

const config = configure();

const db = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  legacyMode: true,
  retry_strategy: () => {
    return new Error('Retry time exhausted');
  },
});

async function connect() {
  await db.connect();
}
connect();
process.on('SIGINT', function () {
  db.quit();
});

module.exports = db;
